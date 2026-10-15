# Writing a multilingual post

Every valid Markdown file in this folder is published, so do not store drafts or private notes here. The author chooses the subject, title, and publication time.

Create `src/content/blog/YYYY/MM/english-slug.md`. `published_at` must be an ISO 8601 date-time with seconds and an explicit timezone offset. Its calendar date determines the visible date and must match the year and month folders. Use lowercase English letters, numbers, and single hyphens in the filename.

Required frontmatter fields are `title`, `title_en`, `title_ja`, `published_at`, `description`, `description_en`, and `description_ja`. Then write three non-empty bodies, each beginning with a standalone marker:

````markdown
---
title: "한국어 제목"
title_en: "English title"
title_ja: "日本語タイトル"
published_at: "2026-10-14T21:30:00-07:00"
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

The timestamp must include seconds and a timezone (`Z` or an offset such as `-07:00`). Same-day posts sort by the actual timestamp, newest first; identical timestamps use the English filename slug alphabetically as a stable tie-breaker. The markers must be alone on a line. Markers inside fenced code blocks are ordinary code. Text before the first marker, duplicate markers, missing sections, or empty sections invalidate the entire post. The build logs the file and reason, then continues with other articles.

The generator supports headings (`#` through `###`), paragraphs, lists, blockquotes, fenced code, inline code, emphasis, and safe links. Headings create a language-specific table of contents. Image and download attachments are not part of the initial workflow.

Run `npm test` and `npm run build` before pushing. The blog remains Coming Soon until at least one valid three-language post exists. See [`scripts/blog/README.md`](../../../scripts/blog/README.md) for generator details.
