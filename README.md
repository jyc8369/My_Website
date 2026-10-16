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

## License and personal content

The original website source code, including application code, HTML/CSS/JavaScript structure, build scripts, and deployment tooling, is licensed under the [MIT License](LICENSE).

**Not covered by the MIT License:** personal blog posts in `src/content/blog/`, their rendered or translated copies in `site/`, personal biographies and editorial writing anywhere in the site, and original branding/illustrations (including `site/assets/og.svg`). These personal materials are Copyright (c) 2026 jyc8369. All rights reserved unless a separate license is explicitly provided. MIT permission for the software does not authorize copying or republishing these materials. Third-party trademarks and other third-party materials remain subject to their owners' rights.
