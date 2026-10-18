import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { generateBlog } from "./generate.mjs";

const metadata = (slug, publishedAt = "2026-10-14T21:30:00-07:00") => ({
  slug,
  titles: { ko: "한국어 제목", en: "English title", ja: "日本語タイトル" },
  published_at: publishedAt,
  descriptions: { ko: "한국어 설명", en: "English description", ja: "日本語の説明" },
});
const bodies = {
  ko: '<h2 id="소제목">소제목</h2>\n<p>한국어 본문입니다.</p>',
  en: '<h2 id="heading">Heading</h2>\n<p>English body.</p>',
  ja: '<h2 id="見出し">見出し</h2>\n<p>日本語の本文です。</p>',
};

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "jyc8369-blog-"));
  const contentDir = path.join(root, "content");
  const outputDir = path.join(root, "dist");
  await mkdir(path.join(contentDir, "2026", "10"), { recursive: true });
  for (const locale of ["ko", "en", "ja"]) {
    await mkdir(path.join(outputDir, locale), { recursive: true });
    await writeFile(path.join(outputDir, locale, "index.html"), '<span class="explore-status">Coming Soon</span>');
  }
  t.after(() => rm(root, { recursive: true, force: true }));
  return { contentDir, outputDir };
}

async function writePost(contentDir, slug, meta = metadata(slug), localizedBodies = bodies) {
  const directory = path.join(contentDir, "2026", "10", slug);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "meta.json"), JSON.stringify(meta), "utf8");
  for (const [locale, body] of Object.entries(localizedBodies)) await writeFile(path.join(directory, `${locale}.html`), body, "utf8");
}

test("publishes localized HTML bodies with shared metadata and language routes", async (t) => {
  const { contentDir, outputDir } = await fixture(t);
  await writePost(contentDir, "sample-post");
  const result = await generateBlog({ contentDir, outputDir });
  assert.equal(result.generated, 1);
  for (const locale of ["ko", "en", "ja"]) {
    const html = await readFile(path.join(outputDir, locale, "blog", "2026", "10", "sample-post", "index.html"), "utf8");
    assert.match(html, new RegExp(`<html lang="${locale}">`));
    assert.match(html, /rel="alternate" hreflang="ja"/);
  }
  const article = await readFile(path.join(outputDir, "ja", "blog", "2026", "10", "sample-post", "index.html"), "utf8");
  assert.match(article, /日本語の本文です/);
  assert.match(article, /href="#見出し"/);
  assert.match(article, /<time datetime="2026-10-14T21:30:00-07:00">2026-10-14<\/time>/);
});

test("sorts posts by publication timestamp, then slug for exact ties", async (t) => {
  const { contentDir, outputDir } = await fixture(t);
  await writePost(contentDir, "same-day-early", metadata("same-day-early", "2026-10-14T09:00:00-07:00"));
  await writePost(contentDir, "same-day-late", metadata("same-day-late", "2026-10-14T18:00:00-07:00"));
  await writePost(contentDir, "same-day-tie-z", metadata("same-day-tie-z", "2026-10-14T18:00:00-07:00"));
  await writePost(contentDir, "older-day", metadata("older-day", "2026-10-13T23:00:00-07:00"));
  const result = await generateBlog({ contentDir, outputDir });
  assert.equal(result.generated, 4);
  const list = await readFile(path.join(outputDir, "en", "blog", "index.html"), "utf8");
  const position = (slug) => list.indexOf(`data-ui="post-${slug}"`);
  assert.ok(position("same-day-late") < position("same-day-tie-z"));
  assert.ok(position("same-day-tie-z") < position("same-day-early"));
  assert.ok(position("same-day-early") < position("older-day"));
});

test("requires an explicit timezone, matching month folder, and every language body", async (t) => {
  const { contentDir, outputDir } = await fixture(t);
  await writePost(contentDir, "missing-zone", metadata("missing-zone", "2026-10-14T21:30:00"));
  await writePost(contentDir, "wrong-folder-date", metadata("wrong-folder-date", "2026-11-14T21:30:00-07:00"));
  await writePost(contentDir, "missing-ja", metadata("missing-ja"), { ko: bodies.ko, en: bodies.en });
  const result = await generateBlog({ contentDir, outputDir });
  assert.equal(result.generated, 0);
  assert.equal(result.skipped, 3);
});

test("keeps source-provided markup, links, code, and headings intact", async (t) => {
  const { contentDir, outputDir } = await fixture(t);
  const html = '<h2 id="heading">Heading</h2>\n<p><a href="https://example.com" target="_blank" rel="noopener">link</a></p>\n<figure class="code-block"><pre><code>const x = 1 &lt; 2;</code></pre></figure>';
  await writePost(contentDir, "html-content", metadata("html-content"), { ...bodies, en: html });
  await generateBlog({ contentDir, outputDir });
  const article = await readFile(path.join(outputDir, "en", "blog", "2026", "10", "html-content", "index.html"), "utf8");
  assert.ok(article.includes(html));
  assert.match(article, /href="#heading"/);
});
