export function secureExternalLinks(html) {
  return html.replace(/<a\b[^>]*\bhref="https?:\/\/[^\"]*"[^>]*>/gi, (anchor) => {
    let updated = anchor;
    if (!/\btarget\s*=/.test(updated)) updated = updated.replace(/>$/, ' target="_blank">');
    if (/\btarget="_blank"/i.test(updated) && !/\brel\s*=/.test(updated)) {
      updated = updated.replace(/>$/, ' rel="noopener noreferrer">');
    } else if (/\btarget="_blank"/i.test(updated)) {
      updated = updated.replace(/\brel="([^"]*)"/i, (_match, value) => {
        const tokens = new Set(value.split(/\s+/).filter(Boolean));
        tokens.add("noopener");
        tokens.add("noreferrer");
        return `rel="${[...tokens].join(" ")}"`;
      });
    }
    return updated;
  });
}
