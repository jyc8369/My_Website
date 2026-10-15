import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

async function htmlFiles(dir) {
  const output = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) output.push(...await htmlFiles(target));
    else if (entry.isFile() && entry.name.endsWith(".html")) output.push(target);
  }
  return output;
}

for (const file of await htmlFiles("dist")) {
  let html = await readFile(file, "utf8");
  const relative = path.relative("dist", file).replaceAll("\\", "/");
  const match = relative.match(/^(ko|en|ja)\/(.*)$/);
  if (!match) continue;
  const [, locale, tail] = match;
  const route = `/${locale}/${tail.replace(/index\.html$/, "")}`;
  const localeLabels = ["한국어", "English", "日本語"];
  const links = ["ko", "en", "ja"].map((code, index) => {
    const href = tail.startsWith("privacy/") ? `/${code}/` : route.replace(/^\/(ko|en|ja)/, `/${code}`);
    return `<a role="menuitem" lang="${code}" hreflang="${code}" href="${href}" data-language="${code}" data-ui="language-${code}"${code === locale ? ' aria-current="page"' : ""}>${localeLabels[index]}</a>`;
  }).join("");
  html = html.replace(/(<div id="language-menu"[^>]*>)[\s\S]*?(<\/div>)/i, `$1${links}$2`);
  html = html.replace(/(<nav class="footer-links"[^>]*>)(?!<a href="\/en\/privacy\/">Privacy<\/a>)/i, '$1<a href="/en/privacy/">Privacy</a>');
  if (!html.includes('rel="canonical"')) {
    const alternates = tail.startsWith("privacy/") ? "" : ["ko", "en", "ja"].map((code) => `<link rel="alternate" hreflang="${code}" href="https://jyc8369.dev${route.replace(/^\/(ko|en|ja)/, `/${code}`)}">`).join("");
    html = html.replace("<meta name=\"theme-color\" content=\"#090909\">", `<meta name="theme-color" content="#090909"><link rel="canonical" href="https://jyc8369.dev${route}">${alternates}`);
  }
  if (/(?:blog|lab)\/index\.html$/.test(relative) && !/<meta name="robots" content="noindex">/.test(html)) {
    html = html.replace("<head>", '<head>\n  <meta name="robots" content="noindex">');
  }
  const pageTitle = ({
    "ko/index.html": "jyc8369.dev — Home", "en/index.html": "jyc8369.dev — Home",
    "ko/about/index.html": "jyc8369.dev — About", "en/about/index.html": "jyc8369.dev — About",
    "ko/blog/index.html": "jyc8369.dev — Blog", "en/blog/index.html": "jyc8369.dev — Blog",
    "ko/lab/index.html": "jyc8369.dev — Lab", "en/lab/index.html": "jyc8369.dev — Lab",
    "ja/index.html": "jyc8369.dev — Home", "ja/about/index.html": "jyc8369.dev — About",
    "ja/blog/index.html": "jyc8369.dev — Blog", "ja/lab/index.html": "jyc8369.dev — Lab",
    "en/privacy/index.html": "jyc8369.dev — Privacy",
  })[relative];
  if (pageTitle) html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${pageTitle}</title>`);
  if (!html.includes('property="og:title"')) {
    const ogTitle = pageTitle || "jyc8369.dev";
    const description = "A personal website about AI, software, servers, and hardware.";
    html = html.replace("</head>", `<meta property="og:type" content="website"><meta property="og:title" content="${ogTitle}"><meta property="og:description" content="${description}"><meta property="og:image" content="https://jyc8369.dev/assets/og.svg"></head>`);
  }
  if (relative === "ko/index.html" || relative === "en/index.html") {
    const ko = locale === "ko";
    const ai = ko
      ? '<article id="interest-ai" data-ui="interest-ai"><span class="interest-number">01</span><div><h3>AI</h3><p>AI로 새로운 것을 만들고, 할 수 있는 일을 직접 시험해 보는 것을 좋아합니다.</p></div></article>'
      : '<article id="interest-ai" data-ui="interest-ai"><span class="interest-number">01</span><div><h3>AI</h3><p>I enjoy using AI to build new things and explore what it can do.</p></div></article>';
    const current = ko
      ? '<article id="interest-software" data-ui="interest-software"><span class="interest-number">02</span><div><h3>소프트웨어 개발</h3><p>소프트웨어를 만들고 API를 다루며 보이지 않는 내부 동작을 알아가는 걸 좋아합니다.</p></div></article><article id="interest-self-hosting" data-ui="interest-self-hosting"><span class="interest-number">03</span><div><h3>서버와 셀프 호스팅</h3><p>서비스를 직접 운영하고 사용하는 시스템을 스스로 관리하는 걸 좋아합니다.</p></div></article><article id="interest-hardware" data-ui="interest-hardware"><span class="interest-number">04</span><div><h3>하드웨어와 전자기기</h3><p>PC를 조립하고 전자기기를 만지며 쓸모 있는 것을 만드는 걸 좋아합니다.</p></div></article>'
      : '<article id="interest-software" data-ui="interest-software"><span class="interest-number">02</span><div><h3>Software development</h3><p>I enjoy building software, working with APIs, and figuring out what happens behind the scenes.</p></div></article><article id="interest-self-hosting" data-ui="interest-self-hosting"><span class="interest-number">03</span><div><h3>Servers &amp; self-hosting</h3><p>I like running my own services and keeping control over the systems I use.</p></div></article><article id="interest-hardware" data-ui="interest-hardware"><span class="interest-number">04</span><div><h3>Hardware &amp; electronics</h3><p>I enjoy building PCs, tinkering with electronics, and making useful things.</p></div></article>';
    html = html.replace(/<div class="interest-editorial">[\s\S]*?<\/div>\s*<\/section>/, `<div class="interest-editorial">${ai}${current}</div></section>`);
    html = html.replace(
      ko ? "안녕하세요, jyc8369입니다. 소프트웨어를 만들고 서버를 직접 운영하거나 컴퓨터와 전자기기를 만지는 걸 좋아합니다." : "Hey, I&apos;m jyc8369. I enjoy writing software, running my own servers, and tinkering with computers and electronics.",
      ko ? "AI를 활용해 소프트웨어를 만들고, 서버를 직접 운영하며, 컴퓨터와 전자기기를 다루는 것을 좋아합니다." : "I enjoy using AI, building software, running my own servers, and tinkering with computers and electronics.",
    );
    if (ko) html = html.replace("<span class=\"explore-status\">Coming Soon</span>", "<span class=\"explore-status\">Coming Soon</span>");
  }
  if (relative === "ko/about/index.html" || relative === "en/about/index.html") {
    const ko = locale === "ko";
    const section = ko
      ? '<section id="about-ai-use" data-ui="about-ai-use"><h2>AI 활용</h2><p>대부분의 프로젝트에서 AI가 코드 생성을 돕습니다. 저는 방향을 정하고 결과를 검토하며 실제 운영에 참여합니다.</p><p>사용 도구 이름은 확인된 목록이 정리되면 추가할 수 있도록 남겨 두었습니다.</p></section>'
      : '<section id="about-ai-use" data-ui="about-ai-use"><h2>How I Use AI</h2><p>AI generates code for many of my projects. I set direction, review the results, and take part in operating what I build.</p><p>I will add the tool names once I have a confirmed list.</p></section>';
    html = html.replace(/(<section id="about-why-this-site-exists")/, `${section}$1`);
    const toc = ko
      ? '<nav class="about-toc" aria-label="목차"><details><summary>목차</summary><ol><li><a href="#about-things-i-enjoy">소개와 관심사</a></li><li><a href="#about-how-i-think">가치관</a></li><li><a href="#about-ai-use">AI 활용</a></li><li><a href="#about-why-this-site-exists">사이트 이야기</a></li><li><a href="#about-get-in-touch">연락처</a></li></ol></details></nav>'
      : '<nav class="about-toc" aria-label="Contents"><details><summary>Contents</summary><ol><li><a href="#about-things-i-enjoy">Introduction and interests</a></li><li><a href="#about-how-i-think">Values</a></li><li><a href="#about-ai-use">How I use AI</a></li><li><a href="#about-why-this-site-exists">About this site</a></li><li><a href="#about-get-in-touch">Contact</a></li></ol></details></nav>';
    html = html.replace('<div id="about-content" class="about-layout" data-ui="about-content">', `<div id="about-content" class="about-layout" data-ui="about-content">${toc}`);
  }
  html = html.replace(/<a\b[^>]*\bhref="https?:\/\/[^\"]*"[^>]*>/gi, (anchor) => {
    if (/\btarget\s*=/.test(anchor)) return anchor;
    return anchor.replace(/>$/, ' target="_blank" rel="noopener noreferrer">');
  });
  await writeFile(file, html, "utf8");
}
