import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { generateBlog } from "./generate.mjs";

const post = (sections = {}) => `---
title: "한국어 제목"
title_en: "English title"
title_ja: "日本語タイトル"
date: "2026-10-14"
description: "한국어 설명"
description_en: "English description"
description_ja: "日本語の説明"
---

<!-- lang:ko -->
${sections.ko ?? "## 소제목\n한국어 본문입니다."}

<!-- lang:en -->
${sections.en ?? "## Heading\nEnglish body."}

<!-- lang:ja -->
${sections.ja ?? "## 見出し\n日本語の本文です。"}
`;

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
  return { contentDir, outputDir, root };
}

test("publishes all three bodies and language routes for a valid post", async (t) => {
  const { contentDir, outputDir } = await fixture(t);
  await writeFile(path.join(contentDir, "2026", "10", "sample-post.md"), post());
  const result = await generateBlog({ contentDir, outputDir });
  assert.equal(result.generated, 1);
  for (const locale of ["ko", "en", "ja"]) {
    const html = await readFile(path.join(outputDir, locale, "blog", "2026", "10", "sample-post", "index.html"), "utf8");
    assert.match(html, new RegExp(`<html lang="${locale}">`));
    assert.match(html, /rel="alternate" hreflang="ja"/);
  }
  assert.match(await readFile(path.join(outputDir, "ja", "blog", "2026", "10", "sample-post", "index.html"), "utf8"), /日本語の本文です/);
});

test("rejects one incomplete post without stopping other valid posts", async (t) => {
  const { contentDir, outputDir } = await fixture(t);
  await writeFile(path.join(contentDir, "2026", "10", "good-post.md"), post());
  await writeFile(path.join(contentDir, "2026", "10", "incomplete-post.md"), post({ ja: "" }));
  const result = await generateBlog({ contentDir, outputDir });
  assert.equal(result.generated, 1);
  assert.equal(result.skipped, 1);
  await assert.rejects(readFile(path.join(outputDir, "ja", "blog", "2026", "10", "incomplete-post", "index.html")));
});

test("does not interpret locale markers inside fenced code blocks as section boundaries", async (t) => {
  const { contentDir, outputDir } = await fixture(t);
  const source = post({ ko: "```html\n<!-- lang:en -->\n```\n\n실제 한국어 본문" });
  await writeFile(path.join(contentDir, "2026", "10", "fenced-marker.md"), source);
  const result = await generateBlog({ contentDir, outputDir });
  assert.equal(result.generated, 1);
  const html = await readFile(path.join(outputDir, "ko", "blog", "2026", "10", "fenced-marker", "index.html"), "utf8");
  assert.match(html, /실제 한국어 본문/);
  assert.match(html, /&lt;!-- lang:en --&gt;/);
});
