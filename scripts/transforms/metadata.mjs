const localePattern = /^(ko|en|ja)\/(.*)$/;

function addToHead(html, markup) {
  const updated = html.replace(/<\/head\s*>/i, `${markup}</head>`);
  if (updated === html) throw new Error("[static metadata] Could not find the document head.");
  return updated;
}

export function addPageMetadata(html, relativePath) {
  const match = relativePath.match(localePattern);
  if (!match) return html;
  const [, locale, tail] = match;
  const route = `/${locale}/${tail.replace(/index\.html$/, "")}`;

  let updated = html;
  if (!/\brel="canonical"/i.test(updated)) {
    const canonical = `<link rel="canonical" href="https://jyc8369.dev${route}">`;
    const alternates = tail.startsWith("privacy/") ? "" : ["ko", "en", "ja"]
      .map((code) => `<link rel="alternate" hreflang="${code}" href="https://jyc8369.dev${route.replace(/^\/(ko|en|ja)/, `/${code}`)}">`)
      .join("");
    updated = addToHead(updated, `${canonical}${alternates}`);
  }

  if (/(?:blog|lab)\/index\.html$/.test(relativePath) && !/\bname="robots"\s+content="noindex"/i.test(updated)) {
    updated = addToHead(updated, '<meta name="robots" content="noindex">');
  }

  if (!/\bproperty="og:title"/i.test(updated)) {
    const title = updated.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)?.[1];
    const description = updated.match(/<meta\b(?=[^>]*\bname="description")(?=[^>]*\bcontent="([^"]*)")[^>]*>/i)?.[1];
    if (!title || !description) throw new Error(`[static metadata] Missing title or description in ${relativePath}.`);
    updated = addToHead(updated, `<meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:image" content="https://jyc8369.dev/assets/og.svg">`);
  }

  return updated;
}
