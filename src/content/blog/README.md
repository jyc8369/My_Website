# Writing a multilingual post

Every valid post folder in this directory is published. Do not store drafts or private notes here.

Create `src/content/blog/YYYY/MM/english-slug/` with `meta.json`, `ko.html`, `en.html`, and `ja.html`. Use a lowercase English slug with single hyphens. The date in `published_at` determines the visible date and must match the year and month folders. Include seconds and an explicit timezone offset.

Example `meta.json`:

```json
{
  "slug": "my-first-post",
  "titles": {
    "ko": "한국어 제목",
    "en": "English title",
    "ja": "日本語タイトル"
  },
  "published_at": "2026-10-14T21:30:00-07:00",
  "descriptions": {
    "ko": "한국어 소개",
    "en": "Short English introduction",
    "ja": "日本語の短い紹介"
  }
}
```

Each locale HTML file contains only the article body, for example:

```html
<h2 id="first-section">첫 번째 소제목</h2>
<p>글 본문입니다. <a href="https://example.com">링크</a>도 작성할 수 있습니다.</p>
<figure class="code-block">
  <pre tabindex="0"><code class="language-js">const answer = 42;</code></pre>
</figure>
```

Use semantic HTML and unique IDs for headings. Text and attribute values must be HTML-escaped. The shared template generates the page shell, language links, metadata, and previous/next navigation. The heading IDs are used to create the table of contents.

Run `npm test` and `npm run build` before pushing. See [`scripts/blog/README.md`](../../../scripts/blog/README.md) for generator behavior.
