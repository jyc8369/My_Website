import test from "node:test";
import assert from "node:assert/strict";
import { addPageMetadata } from "./metadata.mjs";
import { updatePageNavigation } from "./navigation.mjs";
import { secureExternalLinks } from "./external-links.mjs";

test("navigation links preserve the current route across all locales", () => {
  const html = '<div id="language-menu"><a>old item</a></div><nav data-ui="footer-links"><a href="https://github.com/jyc8369">GitHub</a></nav>';
  const result = updatePageNavigation(html, "ko/blog/index.html");

  assert.match(result, /href="\/ko\/blog\/"[^>]*data-ui="language-ko"[^>]*aria-current="page"/);
  assert.match(result, /href="\/en\/blog\/"/);
  assert.match(result, /href="\/ja\/blog\/"/);
  assert.match(result, /href="\/en\/privacy\/" data-ui="footer-privacy"/);
});

test("metadata adds canonical, locale alternates, noindex and social metadata", () => {
  const html = '<!doctype html><html><head><meta name="description" content="A lab page."><title>jyc8369.dev — Lab</title></head><body></body></html>';
  const result = addPageMetadata(html, "en/lab/index.html");

  assert.match(result, /rel="canonical" href="https:\/\/jyc8369\.dev\/en\/lab\/"/);
  assert.match(result, /hreflang="ko" href="https:\/\/jyc8369\.dev\/ko\/lab\/"/);
  assert.match(result, /name="robots" content="noindex"/);
  assert.match(result, /<title>jyc8369\.dev — Lab<\/title>/);
  assert.match(result, /property="og:title" content="jyc8369\.dev — Lab"/);
});

test("metadata is idempotent when canonical and social tags already exist", () => {
  const html = '<html><head><title>Original</title><link rel="canonical" href="https://example.test/"><meta property="og:title" content="Original"></head></html>';
  const once = addPageMetadata(html, "en/about/index.html");
  const twice = addPageMetadata(once, "en/about/index.html");

  assert.equal((twice.match(/rel="canonical"/g) ?? []).length, 1);
  assert.equal((twice.match(/property="og:title"/g) ?? []).length, 1);
});

test("external links get safe new-tab attributes while non-web links stay untouched", () => {
  const html = '<a href="https://example.test/">External</a><a href="https://other.test/" target="_blank" rel="nofollow">Other</a><a href="mailto:test@example.test">Email</a>';
  const result = secureExternalLinks(html);

  assert.match(result, /href="https:\/\/example\.test\/" target="_blank" rel="noopener noreferrer"/);
  assert.match(result, /target="_blank" rel="nofollow noopener noreferrer"/);
  assert.match(result, /<a href="mailto:test@example\.test">Email<\/a>/);
});
