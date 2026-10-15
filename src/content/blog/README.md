# Writing a multilingual post

Every valid Markdown file in this folder is published, so do not store drafts or private notes here. The author chooses the subject, title, and publication date.

Create `src/content/blog/YYYY/MM/english-slug.md`. The date must be a real `YYYY-MM-DD` value that matches the year and month folders. Use lowercase English letters, numbers, and single hyphens in the filename.

Required frontmatter fields are `title`, `title_en`, `title_ja`, `date`, `description`, `description_en`, and `description_ja`. Then write three non-empty bodies, each beginning with a standalone marker:

````markdown
---
title: "한국어 제목"
title_en: "English title"
title_ja: "日本語タイトル"
date: "2026-10-14"
description: "한국어 소개"
description_en: "Short English introduction"
description_ja: "日本語の短い紹介"
---

<!-- lang:ko -->
## 한국어 소제목
한국어 본문

<!-- lang:en -->
## English heading
English article body

<!-- lang:ja -->
## 日本語の見出し
日本語の本文
````

The markers must be alone on a line. Markers inside fenced code blocks are ordinary code. Text before the first marker, duplicate markers, missing sections, or empty sections invalidate the entire post. The build logs the file and reason, then continues with other articles.

The generator supports headings (`#` through `###`), paragraphs, lists, blockquotes, fenced code, inline code, emphasis, and safe links. Headings create a language-specific table of contents. Image and download attachments are not part of the initial workflow.

Run `npm test` and `npm run build` before pushing. The blog remains Coming Soon until at least one valid three-language post exists. See [`scripts/blog/README.md`](../../../scripts/blog/README.md) for generator details.
