import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const REQUIRED_FIELDS = ["title", "title_en", "date", "description"];
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Generate Korean and English article pages from src/content/blog/YYYY/MM/slug.md.
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
  articles.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

  for (let index = 0; index < articles.length; index += 1) {
    const article = articles[index];
    const newer = index > 0 ? articles[index - 1] : null;
    const older = index + 1 < articles.length ? articles[index + 1] : null;
    const body = renderMarkdown(article.markdown);
    const toc = renderToc(article.headings);
    const datePath = `${article.date.slice(0, 4)}/${article.date.slice(5, 7)}`;
    const koRoute = `/ko/blog/${datePath}/${article.slug}/`;
    const enRoute = `/en/blog/${datePath}/${article.slug}/`;
    const koHtml = applySharedShell(renderKoreanPage({ article, body, toc, siteName, koRoute, enRoute, newer, older }), { locale: "ko", route: koRoute, alternateRoute: enRoute, siteName });
    const enHtml = applySharedShell(renderEnglishPage({ article, siteName, koRoute, enRoute, newer, older }), { locale: "en", route: enRoute, alternateRoute: koRoute, siteName });

    const koPath = path.join(outputDir, "ko", "blog", datePath, article.slug, "index.html");
    const enPath = path.join(outputDir, "en", "blog", datePath, article.slug, "index.html");
    await mkdir(path.dirname(koPath), { recursive: true });
    await mkdir(path.dirname(enPath), { recursive: true });
    await Promise.all([
      writeFile(koPath, koHtml, "utf8"),
      writeFile(enPath, enHtml, "utf8"),
    ]);
    article.koPath = koPath;
    article.enPath = enPath;
  }

  if (articles.length) {
    const pageCount = Math.ceil(articles.length / 20);
    for (const locale of ["ko", "en"]) {
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
    articles: articles.map(({ slug, date, koPath, enPath }) => ({ slug, date, koPath, enPath })),
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
  const isKo = locale === "ko";
  const title = isKo ? "블로그" : "Blog";
  const description = isKo ? "만들고 시도하면서 남겨 두고 싶은 것들을 기록합니다." : "Things I've written down along the way.";
  const start = (pageNumber - 1) * 20;
  const pageArticles = articles.slice(start, start + 20);
  const rows = pageArticles.map((article) => {
    const postRoute = `/${locale}/blog/${article.date.slice(0, 4)}/${article.date.slice(5, 7)}/${article.slug}/`;
    const label = locale === "ko" ? article.title : article.title_en;
    return `<li><a class="blog-list-row" href="${postRoute}" data-ui="post-${escapeAttribute(article.slug)}"><span>${escapeHtml(label)}</span><time datetime="${article.date}">${article.date}</time></a></li>`;
  }).join("\n");
  const pageLinks = Array.from({ length: pageCount }, (_value, index) => {
    const number = index + 1;
    const pageRoute = number === 1 ? `/${locale}/blog/` : `/${locale}/blog/page/${number}/`;
    return `<li><a href="${pageRoute}"${number === pageNumber ? ' aria-current="page"' : ""}>${number}</a></li>`;
  }).join("");
  const pagination = pageCount < 2 ? "" : `<nav class="blog-pagination" aria-label="${isKo ? "페이지 탐색" : "Pagination"}">${pageNumber > 1 ? `<a href="${pageNumber === 2 ? `/${locale}/blog/` : `/${locale}/blog/page/${pageNumber - 1}/`}" rel="prev">${isKo ? "이전" : "Previous"}</a>` : ""}<ol>${pageLinks}</ol>${pageNumber < pageCount ? `<a href="/${locale}/blog/page/${pageNumber + 1}/" rel="next">${isKo ? "다음" : "Next"}</a>` : ""}</nav>`;
  const main = `<main id="main-content" tabindex="-1" class="page-container content-page" data-ui="main-content"><header class="page-intro" data-ui="blog-intro"><span class="eyebrow">01 / ${isKo ? "블로그" : "BLOG"}</span><h1>${title}</h1><p>${description}</p></header><ol class="blog-list" aria-label="${isKo ? "게시물" : "Posts"}">${rows}</ol>${pagination}</main>`;
  return renderDocument({ locale, title: `${title} — ${siteName}`, description, route, main, siteName });
}

function renderDocument({ locale, title, description, route, main, siteName }) {
  const alternateRoute = route.replace(/^\/(?:ko|en)/, locale === "ko" ? "/en" : "/ko");
  return `<!doctype html>
<html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#090909"><meta name="description" content="${escapeAttribute(description)}"><title>${escapeHtml(title)}</title><script src="/assets/theme-init.js"></script><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"><link rel="stylesheet" href="/assets/site.css"></head><body>${renderSharedHeader({ locale, route, alternateRoute, siteName })}${main}${renderSharedFooter(locale)}<script src="/assets/site-interactions.js" defer></script><script src="/assets/scroll-reveal.js" defer></script></body></html>`;
}

function renderSharedHeader({ locale, route, alternateRoute, siteName }) {
  const isKo = locale === "ko";
  const labels = isKo ? ["홈", "블로그", "실험실", "소개"] : ["Home", "Blog", "Lab", "About"];
  const nav = [["home", `/${locale}/`], ["blog", `/${locale}/blog/`], ["lab", `/${locale}/lab/`], ["about", `/${locale}/about/`]]
    .map(([key, href], index) => `<a href="${href}" data-ui="nav-${key}"${key === "blog" ? ' aria-current="page"' : ""}>${labels[index]}</a>`).join("");
  const languageLabel = isKo ? "언어 선택" : "Choose language";
  const activeLanguage = isKo ? "ko" : "en";
  const languageOptions = [["en", "English", "en"], ["ko", "한국어", "ko"]]
    .map(([code, label, language]) => `<a role="menuitem" lang="${code}" hreflang="${code}" href="${language === activeLanguage ? route : alternateRoute}" data-language="${code}" data-ui="language-${code}"${language === activeLanguage ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  return `<header id="site-header" class="site-header" data-ui="site-header"><a class="skip-link" href="#main-content">${isKo ? "본문으로 건너뛰기" : "Skip to content"}</a><div class="header-inner page-container"><a class="wordmark" href="/${locale}/" aria-label="${escapeAttribute(siteName)}">${escapeHtml(siteName)}</a><nav id="primary-navigation" class="site-nav" aria-label="${isKo ? "주요 메뉴" : "Main navigation"}" data-ui="primary-navigation">${nav}</nav><div class="header-actions" data-ui="header-actions"><div class="language-switcher" data-ui="language-switcher"><button class="language-toggle" type="button" aria-label="${languageLabel}" aria-haspopup="menu" aria-expanded="false" aria-controls="language-menu" data-ui="language-toggle"><svg class="globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg><span>${activeLanguage.toUpperCase()}</span><span aria-hidden="true">⌄</span></button><div id="language-menu" class="language-menu" hidden role="menu" aria-label="${languageLabel}" data-ui="language-menu">${languageOptions}</div></div><button class="theme-toggle" type="button" aria-label="${isKo ? "테마 전환" : "Switch theme"}" aria-pressed="false" data-ui="theme-toggle">${isKo ? "다크" : "Dark"}</button><button class="menu-toggle" type="button" aria-label="${isKo ? "주요 메뉴 열기" : "Open main navigation"}" aria-controls="primary-navigation" aria-expanded="false" aria-haspopup="true" data-ui="menu-toggle"><span aria-hidden="true"></span><span aria-hidden="true"></span></button></div></div></header>`;
}

function renderSharedFooter(locale) {
  const isKo = locale === "ko";
  return `<footer id="site-footer" class="site-footer" data-ui="site-footer"><div class="page-container footer-inner"><span class="footer-copyright">© ${new Date().getUTCFullYear()} jyc8369</span><nav class="footer-links" aria-label="${isKo ? "연락처" : "Contact"}" data-ui="footer-links"><a href="https://github.com/jyc8369" data-ui="footer-github"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.27-1.24-1.6-1.24-1.6-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.24 4.08 2.36.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.02 0 4.3-2.61 5.24-5.1 5.52.4.34.75 1 .75 2.02v3c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg>GitHub</a><a href="mailto:owner@jyc8369.dev" data-ui="footer-email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m4 7 8 6 8-6"/></svg>${isKo ? "이메일" : "Email"}</a></nav></div></footer>`;
}

function applySharedShell(html, { locale, route, alternateRoute, siteName }) {
  html = html.replace(/<header id="site-header"[\s\S]*?<\/header>/, renderSharedHeader({ locale, route, alternateRoute, siteName }));
  html = html.replace(/<footer id="site-footer"[\s\S]*?<\/footer>/, renderSharedFooter(locale));
  html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">[\s\S]*?<link rel="stylesheet" href="\/assets\/site\.css">/, '<script src="/assets/theme-init.js"></script><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"><link rel="stylesheet" href="/assets/site.css">');
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
  if (!DATE_PATTERN.test(frontmatter.date) || !isRealDate(frontmatter.date)) {
    throw new Error("frontmatter date must be a real date in YYYY-MM-DD format");
  }
  if (frontmatter.date.slice(0, 4) !== relative[0] || frontmatter.date.slice(5, 7) !== relative[1]) {
    throw new Error(`folder date ${relative[0]}/${relative[1]} does not match frontmatter date ${frontmatter.date}`);
  }

  const markdown = match[2].trim();
  const headings = collectHeadings(markdown);
  return { filePath, slug, ...frontmatter, markdown, headings };
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
    return `<a href="${escapeAttribute(url)}"${titleAttr}>${label}</a>`;
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

function renderKoreanPage({ article, body, toc, siteName, koRoute, enRoute, newer, older }) {
  const title = escapeHtml(article.title);
  const description = escapeAttribute(article.description);
  const directions = renderNeighborLinks(newer, older, "ko");
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#090909"><meta name="description" content="${description}">
  <title>${title} — ${escapeHtml(siteName)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"><link rel="stylesheet" href="/assets/site.css">
</head>
<body>
<header id="site-header" class="site-header"><a class="skip-link" href="#main-content">본문으로 건너뛰기</a><div class="header-inner page-container"><a class="wordmark" href="/ko/" aria-label="${escapeAttribute(siteName)} 홈">${escapeHtml(siteName)}</a><nav class="site-nav" aria-label="주요 메뉴"><a href="/ko/blog/" aria-current="page">기록</a><a href="/ko/lab/">실험실</a><a href="/ko/about/">소개</a></nav><div class="header-actions"><div class="language-switcher"><button class="language-toggle" type="button" aria-label="언어 선택" aria-haspopup="menu" aria-expanded="false" aria-controls="language-menu">KO <span aria-hidden="true">⌄</span></button><div id="language-menu" class="language-menu" hidden role="menu" aria-label="언어 선택"><a role="menuitem" lang="en" hreflang="en" href="${enRoute}">English</a><a role="menuitem" lang="ko" hreflang="ko" href="${koRoute}" aria-current="page">한국어</a></div></div><button class="menu-toggle" type="button" aria-label="주요 메뉴" aria-controls="primary-navigation" aria-expanded="false"><span aria-hidden="true"></span><span aria-hidden="true"></span></button></div></div></header>
<main id="main-content" tabindex="-1" class="page-container content-page article-page" data-ui="main-content"><article data-ui="article"><header class="article-header" data-ui="article-header"><a class="back-link" href="/ko/blog/" data-ui="back-to-blog">← 블로그</a><div class="article-meta"><time datetime="${article.date}">${article.date}</time></div><h1>${title}</h1><p class="article-deck">${escapeHtml(article.description)}</p></header>${toc}<div class="article-body" data-ui="article-body">${body}</div><footer class="article-endnote" data-ui="article-endnote">${directions}<a lang="en" hreflang="en" href="${enRoute}">English notice <span aria-hidden="true">↗</span></a></footer></article></main>
<footer id="site-footer" class="site-footer"><div class="page-container footer-inner"><div class="footer-copy"><a class="footer-wordmark" href="/ko/">${escapeHtml(siteName)}</a><p>관심 있는 것을 기록하는 개인 공간입니다.</p><nav class="footer-links" aria-label="연락처"><a href="https://github.com/jyc8369">GitHub ↗</a><a href="mailto:owner@jyc8369.dev">이메일 ↗</a></nav></div><span class="footer-copyright">© ${new Date().getUTCFullYear()} jyc8369</span></div></footer><script src="/assets/site-interactions.js" defer></script><script src="/assets/scroll-reveal.js?v=2" defer></script>
</body></html>`;
}

function renderEnglishPage({ article, siteName, koRoute, enRoute, newer, older }) {
  const title = escapeHtml(article.title_en);
  const description = "An English translation is not available yet. Read the original Korean article.";
  const directions = renderNeighborLinks(newer, older, "en");
  // The English route intentionally contains no source-language article text.
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#090909"><meta name="description" content="${description}">
  <title>${title} — ${escapeHtml(siteName)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"><link rel="stylesheet" href="/assets/site.css">
</head>
<body>
<header id="site-header" class="site-header"><a class="skip-link" href="#main-content">Skip to content</a><div class="header-inner page-container"><a class="wordmark" href="/en/" aria-label="${escapeAttribute(siteName)} home">${escapeHtml(siteName)}</a><nav class="site-nav" aria-label="Main navigation"><a href="/en/blog/" aria-current="page">Blog</a><a href="/en/lab/">Lab</a><a href="/en/about/">About</a></nav><div class="header-actions"><div class="language-switcher"><button class="language-toggle" type="button" aria-label="Choose language" aria-haspopup="menu" aria-expanded="false" aria-controls="language-menu">EN <span aria-hidden="true">⌄</span></button><div id="language-menu" class="language-menu" hidden role="menu" aria-label="Choose language"><a role="menuitem" lang="en" hreflang="en" href="${enRoute}" aria-current="page">English</a><a role="menuitem" lang="ko" hreflang="ko" href="${koRoute}">한국어</a></div></div><button class="menu-toggle" type="button" aria-label="Main navigation" aria-controls="primary-navigation" aria-expanded="false"><span aria-hidden="true"></span><span aria-hidden="true"></span></button></div></div></header>
<main id="main-content" tabindex="-1" class="page-container content-page article-page" data-ui="main-content"><article data-ui="article"><header class="article-header" data-ui="article-header"><a class="back-link" href="/en/blog/" data-ui="back-to-blog">← Back to Blog</a><div class="article-meta"><time datetime="${article.date}">${article.date}</time></div><h1>${title}</h1></header><section class="article-body" aria-label="Translation status" data-ui="article-body"><h2>English translation coming later</h2><p>This post is currently available in Korean only. You can read the original article here:</p><p><a href="${koRoute}" lang="ko" hreflang="ko">Read the Korean original <span aria-hidden="true">↗</span></a></p></section><footer class="article-endnote" data-ui="article-endnote">${directions}<a lang="ko" hreflang="ko" href="${koRoute}">Korean original <span aria-hidden="true">↗</span></a></footer></article></main>
<footer id="site-footer" class="site-footer"><div class="page-container footer-inner"><div class="footer-copy"><a class="footer-wordmark" href="/en/">${escapeHtml(siteName)}</a><p>Just a personal space for things I find interesting.</p><nav class="footer-links" aria-label="Contact links"><a href="https://github.com/jyc8369">GitHub ↗</a><a href="mailto:owner@jyc8369.dev">Email ↗</a></nav></div><span class="footer-copyright">© ${new Date().getUTCFullYear()} jyc8369</span></div></footer><script src="/assets/site-interactions.js" defer></script><script src="/assets/scroll-reveal.js?v=2" defer></script>
</body></html>`;
}

function renderNeighborLinks(newer, older, locale) {
  const blogRoot = `/${locale}/blog/`;
  const routeFor = (article) => `${blogRoot}${article.date.slice(0, 4)}/${article.date.slice(5, 7)}/${article.slug}/`;
  const links = [];
  if (older) links.push(`<a rel="prev" href="${routeFor(older)}">← ${locale === "ko" ? "이전 글" : "Older"}: ${escapeHtml(locale === "ko" ? older.title : older.title_en)}</a>`);
  if (newer) links.push(`<a rel="next" href="${routeFor(newer)}">${locale === "ko" ? "다음 글" : "Newer"}: ${escapeHtml(locale === "ko" ? newer.title : newer.title_en)} →</a>`);
  return links.length ? links.join(" ") : `<a href="${blogRoot}">${locale === "ko" ? "기록 목록으로" : "All posts"} ↗</a>`;
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function escapeAttribute(value) { return escapeHtml(value).replaceAll("`", "&#96;"); }
