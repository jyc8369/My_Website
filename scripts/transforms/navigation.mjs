const locales = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
];

function replaceElementContents(html, selector, replacement, label) {
  if (!selector.test(html)) throw new Error(`[static navigation] Could not find ${label}.`);
  return html.replace(selector, (_element, openingTag, closingTag) => `${openingTag}${replacement}${closingTag}`);
}

export function updatePageNavigation(html, relativePath) {
  const [locale, ...tailParts] = relativePath.split("/");
  const tail = tailParts.join("/");
  const route = `/${locale}/${tail.replace(/index\.html$/, "")}`;
  const menuItems = locales.map(({ code, label }) => {
    const href = tail.startsWith("privacy/") ? `/${code}/` : route.replace(/^\/(ko|en|ja)/, `/${code}`);
    const current = code === locale ? ' aria-current="page"' : "";
    return `<a role="menuitem" lang="${code}" hreflang="${code}" href="${href}" data-language="${code}" data-ui="language-${code}"${current}>${label}</a>`;
  }).join("");

  let updated = replaceElementContents(
    html,
    /(<div\b(?=[^>]*\bid="language-menu")[^>]*>)[\s\S]*?(<\/div>)/i,
    menuItems,
    "language menu",
  );

  updated = updated.replace(/(<nav\b(?=[^>]*\bdata-ui="footer-links")[^>]*>)([\s\S]*?)(<\/nav>)/i, (match, opening, contents, closing) => {
    const privacyLink = '<a href="/en/privacy/" data-ui="footer-privacy">Privacy</a>';
    return `${opening}${contents.includes('href="/en/privacy/"') ? contents : `${privacyLink}${contents}`}${closing}`;
  });

  return updated;
}
