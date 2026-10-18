import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const LOCALES = ["ko", "en", "ja"];
const REQUIRED_FIELDS = ["title", "title_en", "title_ja", "published_at", "description", "description_en", "description_ja"];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PUBLISHED_AT_PATTERN = /^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|[+-](?:(?:0\d|1[0-3]):[0-5]\d|14:00))$/;

/**
 * Generate Korean, English, and Japanese article pages from one multilingual Markdown file.
 *
 * @param {{contentDir?: string, outputDir?: string, siteName?: string}} options
 * @returns {Promise<{generated: number, skipped: number, articles: Array<{slug: string, date: string, koPath: string, enPath: string}>}>}
 */
export async function generateBlog({
  contentDir = "src/content/blog",
  outputDir = "dist",
  siteName = "jyc8369.dev",
} = {}) {
  const files = await collectMarkdownFiles(contentDir);
  const valid = [];
  const skippedFiles = new Set();

  for (const filePath of files) {
    try {
      const source = await readFile(filePath, "utf8");
      const article = parseArticle(source, filePath, contentDir);
      valid.push(article);
    } catch (error) {
      skippedFiles.add(filePath);
      console.error(`[blog] Skipping ${filePath}: ${error.message}`);
    }
  }

  // Reserve a full date+slug route in both locales so a collision cannot
  // overwrite either generated page.
  const routeGroups = new Map();
  for (const article of valid) {
    const routeKey = `${article.date.slice(0, 7).replace("-", "/")}/${article.slug}`.toLowerCase();
    const group = routeGroups.get(routeKey) ?? [];
    group.push(article);
    routeGroups.set(routeKey, group);
  }
  const articles = [];
  for (const [routeKey, group] of routeGroups) {
    if (group.length > 1) {
      for (const article of group) skippedFiles.add(article.filePath);
      console.error(`[blog] Skipping ${group.map((article) => article.filePath).join(", ")}: route collision for /ko/blog/${routeKey}/ and /en/blog/${routeKey}/`);
    } else {
      articles.push(group[0]);
    }
  }
  articles.sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at) || a.slug.localeCompare(b.slug));

  for (let index = 0; index < articles.length; index += 1) {
    const article = articles[index];
    const newer = index > 0 ? articles[index - 1] : null;
    const older = index + 1 < articles.length ? articles[index + 1] : null;
    const datePath = `${article.date.slice(0, 4)}/${article.date.slice(5, 7)}`;
    article.routes = Object.fromEntries(LOCALES.map((locale) => [locale, `/${locale}/blog/${datePath}/${article.slug}/`]));
    for (const locale of LOCALES) {
      article.translations[locale].headings = collectHeadings(article.translations[locale].markdown);
    }
    for (const locale of LOCALES) {
      const outputPath = path.join(outputDir, locale, "blog", datePath, article.slug, "index.html");
      const translation = article.translations[locale];
      const html = applySharedShell(renderArticlePage({ article, locale, translation, siteName, newer, older }), { locale, route: article.routes[locale], siteName });
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, html, "utf8");
      article[`${locale}Path`] = outputPath;
    }
  }

  if (articles.length) {
    const pageCount = Math.ceil(articles.length / 20);
    for (const locale of LOCALES) {
      for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
        const route = pageNumber === 1 ? `/${locale}/blog/` : `/${locale}/blog/page/${pageNumber}/`;
        const pagePath = pageNumber === 1
          ? path.join(outputDir, locale, "blog", "index.html")
          : path.join(outputDir, locale, "blog", "page", String(pageNumber), "index.html");
        const html = renderBlogIndex({ articles, locale, pageNumber, pageCount, route, siteName });
        await mkdir(path.dirname(pagePath), { recursive: true });
        await writeFile(pagePath, html, "utf8");
      }
      const homePath = path.join(outputDir, locale, "index.html");
      const homeHtml = await readFile(homePath, "utf8");
      await writeFile(homePath, homeHtml.replace(/<span\b[^>]*class="explore-status"[^>]*>[\s\S]*?<\/span>/gi, ""), "utf8");
    }
  }

  return {
    generated: articles.length,
    skipped: skippedFiles.size,
    articles: articles.map(({ slug, date, koPath, enPath, jaPath }) => ({ slug, date, koPath, enPath, jaPath })),
  };
}

async function collectMarkdownFiles(root) {
  const found = [];
  async function visit(directory) {
    let entries;
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch (error) {
      if (error.code === "ENOENT" && directory === root) return;
      throw error;
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) await visit(fullPath);
      else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md") && entry.name.toLowerCase() !== "readme.md") found.push(fullPath);
    }
  }
  await visit(root);
  return found;
}

function renderBlogIndex({ articles, locale, pageNumber, pageCount, route, siteName }) {
  const title = ({ ko: "블로그", en: "Blog", ja: "ブログ" })[locale];
  const description = ({ ko: "만들고 시도하면서 남겨 두고 싶은 것들을 기록합니다.", en: "Things I've written down along the way.", ja: "作り、試しながら記録しておきたいことを書いています。" })[locale];
  const start = (pageNumber - 1) * 20;
  const pageArticles = articles.slice(start, start + 20);
  const rows = pageArticles.map((article) => {
    const postRoute = article.routes[locale];
    const label = article.translations[locale].title;
    return `<li><a class="blog-list-row" href="${postRoute}" data-ui="post-${escapeAttribute(article.slug)}"><span>${escapeHtml(label)}</span><time datetime="${article.published_at}">${article.date}</time></a></li>`;
  }).join("\n");
  const pageLinks = Array.from({ length: pageCount }, (_value, index) => {
    const number = index + 1;
    const pageRoute = number === 1 ? `/${locale}/blog/` : `/${locale}/blog/page/${number}/`;
    return `<li><a href="${pageRoute}"${number === pageNumber ? ' aria-current="page"' : ""}>${number}</a></li>`;
  }).join("");
  const pagination = pageCount < 2 ? "" : `<nav class="blog-pagination" aria-label="${({ ko: "페이지 탐색", en: "Pagination", ja: "ページ移動" })[locale]}">${pageNumber > 1 ? `<a href="${pageNumber === 2 ? `/${locale}/blog/` : `/${locale}/blog/page/${pageNumber - 1}/`}" rel="prev">${({ ko: "이전", en: "Previous", ja: "前へ" })[locale]}</a>` : ""}<ol>${pageLinks}</ol>${pageNumber < pageCount ? `<a href="/${locale}/blog/page/${pageNumber + 1}/" rel="next">${({ ko: "다음", en: "Next", ja: "次へ" })[locale]}</a>` : ""}</nav>`;
  const main = `<main id="main-content" tabindex="-1" class="page-container content-page" data-ui="main-content"><header class="page-intro" data-ui="blog-intro"><span class="eyebrow">01 / ${locale === "ko" ? "블로그" : title.toUpperCase()}</span><h1>${title}</h1><p>${description}</p></header><ol class="blog-list" aria-label="${({ ko: "게시물", en: "Posts", ja: "記事" })[locale]}">${rows}</ol>${pagination}</main>`;
  return renderDocument({ locale, title: `${title} — ${siteName}`, description, route, main, siteName });
}

function renderDocument({ locale, title, description, route, main, siteName }) {
  return `<!doctype html>
<html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#090909"><meta name="description" content="${escapeAttribute(description)}"><title>jyc8369.dev — ${escapeHtml(({ ko: "블로그", en: "Blog", ja: "ブログ" })[locale])}</title><script src="/assets/js/theme-init.js"></script><link rel="stylesheet" href="/assets/css/site.css"></head><body>${renderSharedHeader({ locale, route, siteName })}${main}${renderSharedFooter(locale)}<script src="/assets/js/site-interactions.js" defer></script><script src="/assets/js/scroll-reveal.js" defer></script></body></html>`;
}

function renderSharedHeader({ locale, route = `/${locale}/blog/`, siteName }) {
  const labels = ({ ko: ["홈", "블로그", "실험실", "소개"], en: ["Home", "Blog", "Lab", "About"], ja: ["ホーム", "ブログ", "ラボ", "自己紹介"] })[locale];
  const nav = [["home", `/${locale}/`], ["blog", `/${locale}/blog/`], ["lab", `/${locale}/lab/`], ["about", `/${locale}/about/`]]
    .map(([key, href], index) => `<a href="${href}" data-ui="nav-${key}"${key === "blog" ? ' aria-current="page"' : ""}>${labels[index]}</a>`).join("");
  const labelsByLocale = { ko: ["한국어", "English", "日本語"], en: ["한국어", "English", "日本語"], ja: ["한국어", "English", "日本語"] };
  const languageLabel = ({ ko: "언어 선택", en: "Choose language", ja: "言語" })[locale];
  const languageOptions = ["ko", "en", "ja"].map((code, index) => {
    const translatedPath = route.replace(/^\/(?:ko|en|ja)/, `/${code}`);
    return `<a role="menuitem" lang="${code}" hreflang="${code}" href="${translatedPath}" data-language="${code}" data-ui="language-${code}"${locale === code ? ' aria-current="page"' : ""}>${labelsByLocale[locale][index]}</a>`;
  }).join("");
  const isKo = locale === "ko";
  const isJa = locale === "ja";
  return `<header id="site-header" class="site-header" data-ui="site-header"><a class="skip-link" href="#main-content">${isKo ? "본문으로 건너뛰기" : isJa ? "本文へスキップ" : "Skip to content"}</a><div class="header-inner page-container"><a class="wordmark" href="/${locale}/" aria-label="${escapeAttribute(siteName)}">${escapeHtml(siteName)}</a><nav id="primary-navigation" class="site-nav" aria-label="${isKo ? "주요 메뉴" : isJa ? "メインメニュー" : "Main navigation"}" data-ui="primary-navigation">${nav}</nav><div class="header-actions" data-ui="header-actions"><div class="language-switcher" data-ui="language-switcher"><button class="language-toggle" type="button" aria-label="${languageLabel}" aria-haspopup="menu" aria-expanded="false" aria-controls="language-menu" data-ui="language-toggle"><svg class="globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg><span>${locale.toUpperCase()}</span><span aria-hidden="true">⌄</span></button><div id="language-menu" class="language-menu" hidden role="menu" aria-label="${languageLabel}" data-ui="language-menu">${languageOptions}</div></div><button class="theme-toggle" type="button" aria-label="${isKo ? "테마 전환" : isJa ? "テーマ切替" : "Switch theme"}" aria-pressed="false" data-ui="theme-toggle">${isKo ? "다크" : isJa ? "ダーク" : "Dark"}</button><button class="menu-toggle" type="button" aria-label="${isKo ? "주요 메뉴 열기" : isJa ? "メニューを開く" : "Open main navigation"}" aria-controls="primary-navigation" aria-expanded="false" aria-haspopup="true" data-ui="menu-toggle"><span aria-hidden="true"></span><span aria-hidden="true"></span></button></div></div></header>`;
}

function renderSharedFooter(locale) {
  const contact = ({ ko: "연락처", en: "Contact", ja: "連絡先" })[locale];
  const email = ({ ko: "이메일", en: "Email", ja: "メール" })[locale];
  return `<footer id="site-footer" class="site-footer" data-ui="site-footer"><div class="page-container footer-inner"><span class="footer-copyright">© 2026 jyc8369</span><nav class="footer-links" aria-label="${contact}" data-ui="footer-links"><a href="/en/privacy/">Privacy</a><a href="https://github.com/jyc8369" data-ui="footer-github">GitHub</a><a href="mailto:owner@jyc8369.dev" data-ui="footer-email">${email}</a></nav></div></footer>`;
}

function applySharedShell(html, { locale, route, alternateRoute, siteName }) {
  html = html.replace(/<header id="site-header"[\s\S]*?<\/header>/, renderSharedHeader({ locale, route, alternateRoute, siteName }));
  html = html.replace(/<footer id="site-footer"[\s\S]*?<\/footer>/, renderSharedFooter(locale));
  html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">[\s\S]*?<link rel="stylesheet" href="\/assets\/site\.css">/, '<script src="/assets/js/theme-init.js"></script><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"><link rel="stylesheet" href="/assets/css/site.css">');
  return html;
}

function parseArticle(source, filePath, contentDir) {
  const relative = path.relative(contentDir, filePath).split(path.sep);
  if (relative.length !== 3 || !/^\d{4}$/.test(relative[0]) || !/^\d{2}$/.test(relative[1])) {
    throw new Error("expected path YYYY/MM/slug.md");
  }
  const filename = relative[2];
  const slug = filename.slice(0, -3);
  if (!SLUG_PATTERN.test(slug) || filename !== `${slug}.md`) {
    throw new Error("filename must be a lowercase English slug such as my-first-post.md");
  }

  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)([\s\S]*)$/);
  if (!match) throw new Error("missing YAML frontmatter delimited by ---");
  const frontmatter = parseSimpleYaml(match[1]);
  for (const field of REQUIRED_FIELDS) {
    if (typeof frontmatter[field] !== "string" || !frontmatter[field].trim()) {
      throw new Error(`frontmatter field '${field}' is required and must be a non-empty string`);
    }
  }
  if (!PUBLISHED_AT_PATTERN.test(frontmatter.published_at) || !Number.isFinite(Date.parse(frontmatter.published_at)) || !isRealDate(frontmatter.published_at.slice(0, 10))) {
    throw new Error("frontmatter published_at must be a valid ISO 8601 date-time with seconds and an explicit timezone");
  }
  const date = frontmatter.published_at.slice(0, 10);
  if (date.slice(0, 4) !== relative[0] || date.slice(5, 7) !== relative[1]) {
    throw new Error(`folder date ${relative[0]}/${relative[1]} does not match published_at date ${date}`);
  }

  const translations = parseLanguageSections(match[2]);
  for (const locale of LOCALES) {
    if (!translations[locale]?.trim()) throw new Error(`missing or empty ${locale.toUpperCase()} body section`);
  }
  return {
    filePath, slug, ...frontmatter, date,
    translations: {
      ko: { title: frontmatter.title, description: frontmatter.description, markdown: translations.ko.trim() },
      en: { title: frontmatter.title_en, description: frontmatter.description_en, markdown: translations.en.trim() },
      ja: { title: frontmatter.title_ja, description: frontmatter.description_ja, markdown: translations.ja.trim() },
    },
  };
}

// Body syntax: each locale starts at an HTML comment marker. Markers are
// recognized only as standalone lines outside fenced code blocks.
function parseLanguageSections(body) {
  const sections = Object.create(null);
  let current = null;
  let inFence = false;
  for (const line of body.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) { inFence = !inFence; if (current) sections[current].push(line); continue; }
    const marker = !inFence && line.match(/^\s*<!--\s*lang:(ko|en|ja)\s*-->\s*$/i);
    if (marker) {
      current = marker[1].toLowerCase();
      if (sections[current]) throw new Error(`duplicate ${current.toUpperCase()} body section`);
      sections[current] = [];
      continue;
    }
    if (current) sections[current].push(line);
    else if (line.trim()) throw new Error("body text before the first <!-- lang:ko --> section marker");
  }
  return Object.fromEntries(Object.entries(sections).map(([locale, lines]) => [locale, lines.join("\n")]));
}

// This project has no installed YAML dependency. Support the scalar subset used
// by article metadata, including quoted strings and comments outside quotes.
function parseSimpleYaml(text) {
  const values = Object.create(null);
  for (const [index, rawLine] of text.split(/\r?\n/).entries()) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf(":");
    if (separator < 1) throw new Error(`invalid YAML frontmatter at line ${index + 1}`);
    const key = line.slice(0, separator).trim();
    if (!/^[a-zA-Z_][\w-]*$/.test(key)) throw new Error(`invalid YAML key at line ${index + 1}`);
    if (Object.hasOwn(values, key)) throw new Error(`duplicate frontmatter field '${key}'`);
    values[key] = parseYamlScalar(stripYamlComment(line.slice(separator + 1).trim()), index + 1);
  }
  return values;
}

function stripYamlComment(value) {
  let quote = null;
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if ((character === "'" || character === '"') && value[index - 1] !== "\\") {
      if (quote === character) quote = null;
      else if (!quote) quote = character;
    }
    if (character === "#" && !quote && (index === 0 || /\s/.test(value[index - 1]))) return value.slice(0, index).trimEnd();
  }
  return value;
}

function parseYamlScalar(value, line) {
  if (!value) return "";
  if (value.startsWith('"')) {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed !== "string") throw new Error();
      return parsed;
    } catch {
      throw new Error(`invalid double-quoted scalar at YAML line ${line}`);
    }
  }
  if (value.startsWith("'")) {
    if (!/^'(?:[^']|'')*'$/.test(value)) throw new Error(`invalid single-quoted scalar at YAML line ${line}`);
    return value.slice(1, -1).replaceAll("''", "'");
  }
  if (/^[|>]/.test(value)) throw new Error(`use a single-line scalar for frontmatter at YAML line ${line}`);
  return value;
}

function isRealDate(value) {
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function collectHeadings(markdown) {
  const headings = [];
  const usedIds = new Set();
  let inFence = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = line.match(/^(#{1,3})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;
    const text = match[2].trim();
    const base = slugifyHeading(text) || `section-${headings.length + 1}`;
    let id = base;
    let suffix = 2;
    while (usedIds.has(id)) id = `${base}-${suffix++}`;
    usedIds.add(id);
    headings.push({ level: match[1].length, text, id });
  }
  return headings;
}

function slugifyHeading(text) {
  return text.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const headings = collectHeadings(markdown);
  let headingIndex = 0;
  let output = "";
  for (let index = 0; index < lines.length;) {
    const line = lines[index];
    if (!line.trim()) { index += 1; continue; }
    const fence = line.match(/^\s*```\s*([\w+-]*)\s*$/);
    if (fence) {
      const code = [];
      index += 1;
      while (index < lines.length && !/^\s*```/.test(lines[index])) code.push(lines[index++]);
      if (index < lines.length) index += 1;
      const language = fence[1] ? ` class="language-${escapeAttribute(fence[1])}"` : "";
      output += `<figure class="code-block"><pre tabindex="0"><code${language}>${escapeHtml(code.join("\n"))}</code></pre></figure>\n`;
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      const entry = headings[headingIndex++];
      const level = heading[1].length;
      output += `<h${level} id="${escapeAttribute(entry.id)}">${renderInline(heading[2].trim())}</h${level}>\n`;
      index += 1;
      continue;
    }
    if (/^\s*>/.test(line)) {
      const quote = [];
      while (index < lines.length && /^\s*>/.test(lines[index])) quote.push(lines[index++].replace(/^\s*>\s?/, ""));
      output += `<blockquote>${renderMarkdown(quote.join("\n"))}</blockquote>\n`;
      continue;
    }
    if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
      const ordered = /^\s*\d+[.)]\s+/.test(line);
      const items = [];
      const pattern = ordered ? /^\s*\d+[.)]\s+(.+)$/ : /^\s*[-*+]\s+(.+)$/;
      while (index < lines.length && pattern.test(lines[index])) items.push(lines[index++].match(pattern)[1]);
      const tag = ordered ? "ol" : "ul";
      output += `<${tag}>${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</${tag}>\n`;
      continue;
    }
    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{1,3})\s+/.test(lines[index]) && !/^\s*```/.test(lines[index]) && !/^\s*>/.test(lines[index]) && !/^\s*([-*+]\s+|\d+[.)]\s+)/.test(lines[index])) {
      paragraph.push(lines[index++].trim());
    }
    output += `<p>${renderInline(paragraph.join("\n"))}</p>\n`;
  }
  return output;
}

function renderInline(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+\"([^\"]*)\")?\)/g, (_match, alt, url, title) => {
    if (!isSafeUrl(url)) return escapeHtml(`![${alt}](${url})`);
    const titleAttr = title ? ` title="${escapeAttribute(title)}"` : "";
    return `<img src="${escapeAttribute(url)}" alt="${alt}"${titleAttr} loading="lazy">`;
  });
  html = html.replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+\"([^\"]*)\")?\)/g, (_match, label, url, title) => {
    if (!isSafeUrl(url)) return label;
    const titleAttr = title ? ` title="${escapeAttribute(title)}"` : "";
    const external = /^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${escapeAttribute(url)}"${titleAttr}${external}>${label}</a>`;
  });
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/__(.+?)__/g, "<strong>$1</strong>");
  html = html.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>").replace(/(^|[^_])_([^_\n]+)_(?!_)/g, "$1<em>$2</em>");
  return html.replaceAll("\n", "<br>\n");
}

function isSafeUrl(url) {
  return /^(?:https?:|mailto:|tel:|\/|#)/i.test(url) && !/^\/\//.test(url);
}

function renderToc(headings) {
  if (!headings.length) return "";
  return `<nav class="article-toc" aria-label="목차" data-ui="article-toc"><h2>목차</h2><ol>${headings.map(({ level, text, id }) => `<li class="toc-level-${level}"><a href="#${escapeAttribute(id)}">${escapeHtml(text)}</a></li>`).join("")}</ol></nav>`;
}

function renderArticlePage({ article, locale, translation, siteName, newer, older }) {
  const title = escapeHtml(translation.title);
  const description = escapeAttribute(translation.description);
  const route = article.routes[locale];
  const titleEn = escapeHtml(article.title_en);
  const descriptionEn = escapeAttribute(article.description_en);
  const body = renderMarkdown(translation.markdown);
  const toc = renderToc(translation.headings);
  const labels = {
    ko: { back: "← 블로그", toc: "목차", list: "블로그 목록", previous: "이전 글", next: "다음 글" },
    en: { back: "← Back to Blog", toc: "Contents", list: "All posts", previous: "Previous", next: "Next" },
    ja: { back: "← ブログ", toc: "目次", list: "記事一覧", previous: "前の記事", next: "次の記事" },
  }[locale];
  const navToc = toc.replace('aria-label="목차"', `aria-label="${labels.toc}"`).replace(">목차</h2>", `>${labels.toc}</h2>`);
  const directions = renderNeighborLinks(newer, older, locale);
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#090909"><meta name="description" content="${description}"><meta property="og:title" content="${titleEn} — jyc8369.dev"><meta property="og:description" content="${descriptionEn}"><meta property="og:image" content="https://jyc8369.dev/assets/images/og.svg"><meta property="og:type" content="article"><link rel="canonical" href="https://jyc8369.dev${route}">${LOCALES.map((code) => `<link rel="alternate" hreflang="${code}" href="https://jyc8369.dev${article.routes[code]}">`).join("")}<title>jyc8369.dev — ${titleEn}</title><script src="/assets/js/theme-init.js"></script><link rel="stylesheet" href="/assets/css/site.css"></head><body>${renderSharedHeader({ locale, route, siteName })}<main id="main-content" tabindex="-1" class="page-container content-page article-page" data-ui="main-content"><a class="back-link" href="/${locale}/blog/">${labels.back}</a><article class="article-layout"><div><header class="article-header"><time datetime="${article.published_at}">${article.date}</time><h1>${title}</h1><p class="article-deck">${escapeHtml(translation.description)}</p></header><div class="article-body">${body}</div></div>${navToc}</article><footer class="article-endnote">${directions}<a href="/${locale}/blog/">${labels.list}</a></footer></main>${renderSharedFooter(locale)}<script src="/assets/js/site-interactions.js" defer></script></body></html>`;
}

function renderNeighborLinks(newer, older, locale) {
  const blogRoot = `/${locale}/blog/`;
  const routeFor = (article) => `${blogRoot}${article.date.slice(0, 4)}/${article.date.slice(5, 7)}/${article.slug}/`;
  const links = [];
  const words = { ko: ["이전 글", "다음 글", "블로그 목록"], en: ["Previous", "Next", "All posts"], ja: ["前の記事", "次の記事", "記事一覧"] }[locale];
  if (older) links.push(`<a rel="prev" href="${routeFor(older)}">← ${words[0]}: ${escapeHtml(older.translations[locale].title)}</a>`);
  if (newer) links.push(`<a rel="next" href="${routeFor(newer)}">${words[1]}: ${escapeHtml(newer.translations[locale].title)} →</a>`);
  return links.length ? links.join(" ") : `<a href="${blogRoot}">${words[2]} ↗</a>`;
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function escapeAttribute(value) { return escapeHtml(value).replaceAll("`", "&#96;"); }
