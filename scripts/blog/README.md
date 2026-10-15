# Static blog generator

The blog is authored as Korean Markdown and rendered to static HTML as part of the site build. No runtime framework or external package is required for article generation.

## Content format

Put each article at `src/content/blog/YYYY/MM/english-slug.md`. The date must be a real `YYYY-MM-DD` value and match the year/month folders. Filenames use lowercase English letters, numbers, and hyphens.

Required single-line frontmatter fields:

```yaml
---
title: "한국어 제목"
title_en: "English title"
date: 2026-10-14
description: "한국어 요약"
---
```

The English title is used in the English blog list. Korean Markdown is rendered on the Korean detail route; the English detail route contains an English notice linking to the original.

See [`src/content/blog/README.md`](../../src/content/blog/README.md) for the complete authoring guide and copyable post example.

## Generated pages

- Article: `/ko/blog/YYYY/MM/slug/`
- English notice: `/en/blog/YYYY/MM/slug/`
- Blog lists sorted by date, with 20 posts per page
- Home page `Coming Soon` label removed after at least one valid article is generated

Invalid articles are logged and skipped; valid articles continue to generate. The generator supports headings (`#` through `###`), paragraphs, lists, blockquotes, fenced code, inline code, emphasis, links, and image syntax. Raw HTML is escaped. Article content should remain text-first; images and downloadable attachments are not part of the current publishing workflow.

## Build integration

`scripts/build.mjs` copies `site/` to `dist/`, then runs `generateBlog`. From the repository root:

```sh
npm run build
```

For direct use, the module exports `generateBlog`:

```js
import { generateBlog } from "./blog/generate.mjs";

const result = await generateBlog({
  contentDir: "src/content/blog",
  outputDir: "dist",
});
console.log(`Generated ${result.generated}; skipped ${result.skipped}.`);
```

`contentDir`, `outputDir`, and `siteName` are optional. Defaults are `src/content/blog`, `dist`, and `jyc8369.dev`. The function returns the generated and skipped counts plus the article slug, date, and output paths.
