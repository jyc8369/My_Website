# Static blog generator

`generate.mjs` exports one async function for the static build:

```js
import { generateBlog } from "./blog/generate.mjs";

const result = await generateBlog({
  contentDir: "src/content/blog",
  outputDir: "dist",
});
console.log(`Generated ${result.generated} articles; skipped ${result.skipped}.`);
```

Call it after the build has copied the base `site/` tree into `dist/`. Paths are
relative to the process working directory by default. `contentDir`, `outputDir`,
and `siteName` are optional; the defaults are `src/content/blog`, `dist`, and
`jyc8369.dev`. The resolved result contains each article's slug, date, and the
two generated `index.html` file paths.

Put one Markdown file at `src/content/blog/YYYY/MM/slug.md`. The filename is a
lowercase English slug, and the year/month directory must match `date`.
Frontmatter uses the single-line scalar subset shown here:

```yaml
---
title: 한국어 제목
title_en: English title
date: 2026-10-14
description: 글을 요약하는 한국어 설명
---

본문은 일반 Markdown으로 작성합니다.
```

Invalid files and duplicate slugs are logged with their paths and omitted while
valid posts continue to generate. The Korean route contains the original
Markdown, a heading table of contents, date and reading-time metadata, and
adjacent-post links. The English route contains an English-only translation
notice with a link to the Korean original, plus the same date, original reading
time, and adjacent-post navigation.

The module uses only Node built-ins. Markdown rendering supports headings
(`##`/`###` and `#`), paragraphs, lists, blockquotes, fenced code, inline code,
emphasis, links, and images. Raw HTML is escaped, and links are limited to
HTTP(S), mailto, tel, root-relative, and fragment URLs.
