# Static multilingual blog generator

Each post is a folder at `src/content/blog/YYYY/MM/english-slug/`. A post is generated only when shared metadata and all three localized HTML bodies are present and valid.

## Source structure

```text
src/content/blog/YYYY/MM/english-slug/
├── meta.json
├── ko.html
├── en.html
└── ja.html
```

`meta.json` contains shared post metadata. HTML files contain only the article body; the generator provides the document, site navigation, footer, SEO metadata, localized routes, and previous/next navigation.

```json
{
  "slug": "why-i-like-rust",
  "titles": {
    "ko": "내가 Rust를 좋아하는 이유",
    "en": "Why I Like Rust",
    "ja": "Rustが好きな理由"
  },
  "published_at": "2026-10-14T21:30:00-07:00",
  "descriptions": {
    "ko": "한국어 글 소개",
    "en": "Short English summary",
    "ja": "日本語の概要"
  }
}
```

Use semantic body markup such as `<h2 id="...">`, `<p>`, `<ul>`, `<blockquote>`, and `<figure class="code-block"><pre><code>...`. Keep heading IDs unique within each language. The table of contents is derived from `h1`–`h3` elements that have IDs. The generator embeds body HTML as-is, so escape text and attribute values when authoring markup.

## Generated behavior

- Routes remain `/ko/blog/YYYY/MM/slug/`, `/en/blog/YYYY/MM/slug/`, and `/ja/blog/YYYY/MM/slug/`.
- Lists sort by `published_at` newest first, 20 posts per page, and use localized titles. Displayed date and route year/month come from the timestamp's calendar date in its stated timezone. Identical timestamps use the English slug as a stable tie-breaker.
- Previous/next navigation follows the same timestamp ordering and route structure.
- A missing or invalid translation excludes that post in all languages; other valid posts continue building.
- `npm test` checks localized output, metadata validation, timestamp ordering, TOC extraction, and preservation of HTML links/code.
