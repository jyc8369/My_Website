# jyc8369.dev

A minimal, editorial personal website built with static HTML, CSS, and JavaScript. It supports Korean, English, and Japanese routes and builds multilingual Markdown posts into static pages for Cloudflare Workers Static Assets.

## Local preview and checks

```sh
npm run dev
npm test
npm run build
```

The local server listens on `http://127.0.0.1:3000`. Build output is written to `dist/`.

## Routes

- `/` selects a saved language or uses the browser language, falling back to English.
- `/ko/`, `/en/`, `/ja/` are localized home pages.
- `/{ko,en,ja}/about/`, `/{ko,en,ja}/blog/`, and `/{ko,en,ja}/lab/` are the localized sections.
- `/en/privacy/` is the English-only privacy notice.
- Blog posts use `/{locale}/blog/YYYY/MM/slug/` and require all three language bodies in one Markdown file.

## Publishing

Pushes to `main` run `.github/workflows/deploy.yml`, build the site, and deploy it with the configured Cloudflare CLI. The workflow uses the `production` GitHub environment and its `CLOUDFLARE_API_TOKEN` secret. Do not commit credentials. See [`src/content/blog/README.md`](src/content/blog/README.md) for the post format.
