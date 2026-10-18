# Development guide

This guide documents the verified development and deployment workflow for the static jyc8369.dev website.

## Source layout

- `site/` contains the hand-maintained static HTML, CSS, JavaScript, and assets. Korean and English pages live under `site/ko/` and `site/en/`.
- `scripts/localize.mjs` generates Japanese pages during the build.
- `src/content/blog/YYYY/MM/` contains multilingual Markdown posts.
- `scripts/blog/generate.mjs` turns valid posts into pages for Korean, English, and Japanese.
- `scripts/build.mjs` copies the site into `dist/`, generates localized pages and blog posts, and applies static-page adjustments.
- `server.mjs` serves a selected directory locally; the default directory is `site/`.
- `wrangler.config.ts` points Cloudflare deployment at `dist/` as its static assets directory.

## Development environment

The GitHub Actions workflow uses Node.js 24 and `npm ci`. A separately supported local Node.js version or operating-system matrix is not specified in the repository; using Node.js 24 locally matches CI.

Install the locked project dependencies:

```sh
npm ci
```

## Local preview

Start a build and local server with:

```sh
npm run dev
```

This runs `npm run build` and serves `dist/` at `http://127.0.0.1:3000` by default. The server binds to `127.0.0.1` and port `3000` unless `HOST` or `PORT` is set. To serve an existing build without rebuilding, use:

```sh
npm start
```

`npm start` serves the existing `dist/` directory; build it first with `npm run build` if needed.

## Validation and build

Run the blog generator tests:

```sh
npm test
```

Build the static site into `dist/`:

```sh
npm run build
```

For blog metadata, Markdown syntax, translation requirements, generated behavior, and the existing content instructions, see [`src/content/blog/README.md`](../src/content/blog/README.md) and [`scripts/blog/README.md`](../scripts/blog/README.md).

## Deployment

`.github/workflows/deploy.yml` runs when changes are pushed to `main`, or when manually dispatched. It uses Node.js 24, runs `npm ci`, runs `npm test`, checks for the `CLOUDFLARE_API_TOKEN` secret in the `production` GitHub environment, builds with `npm run build`, then deploys with `npx cf deploy`. The workflow requires the token; do not commit credentials.

The deployment target is Cloudflare Workers Static Assets, configured to use `dist/`. No GitHub Release or downloadable website package is defined by this repository.

## Licensing

The software source is licensed under the [MIT License](../LICENSE). The root README documents the separate copyright status of personal writing, translated or rendered copies, and original branding and illustrations.
