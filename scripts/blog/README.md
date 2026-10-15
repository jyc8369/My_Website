# Static multilingual blog generator

Each post is one Markdown file at `src/content/blog/YYYY/MM/english-slug.md`. A post is published only when all required metadata and all three language bodies are present. Invalid files are logged and skipped independently.

## Metadata and body format

```yaml
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
한국어 본문입니다.

<!-- lang:en -->
## English heading
The English article body goes here.

<!-- lang:ja -->
## 日本語の見出し
日本語の本文をここに書きます。
```

Each marker must be on its own line. Markers inside fenced code blocks are treated as code, not section boundaries. Do not put text before the first marker. Every section must contain actual content. The marker is removed during rendering. This syntax was selected as the implementation default because v4.1 left the exact delimiter syntax open.

Supported Markdown includes headings (`#` through `###`), paragraphs, lists, blockquotes, fenced code, inline code, emphasis, and safe links. A table of contents is generated independently for each language when headings exist. Images and downloadable attachments are outside the initial publishing workflow.

## Generated behavior

- Routes: `/ko/blog/YYYY/MM/slug/`, `/en/blog/YYYY/MM/slug/`, and `/ja/blog/YYYY/MM/slug/`.
- Lists are date-sorted, 20 posts per page, and use localized titles.
- With zero valid posts, Blog stays Coming Soon and is marked `noindex`; Lab is always Coming Soon and `noindex`.
- A post with a missing or invalid translation is excluded in all languages; other valid posts continue building.
- `npm test` checks three-language output, per-file rejection, and marker handling in code blocks.
