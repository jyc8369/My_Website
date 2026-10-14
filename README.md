# jyc8369.dev

A static personal site for development stories, notes, and experiments. Source files are plain HTML and CSS in `site/`; no frontend framework or third-party runtime package is required.

## Local preview

```sh
npm run dev
```

Then open `http://localhost:3000`. The preview server uses Node.js built-in modules only.

## Build

```sh
npm run build
npm start
```

`npm run build` copies the deployable static files into `dist/`. `npm start` serves that folder locally.

## Cloudflare Pages settings

- Framework preset: None
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

The `site/` folder is the source of truth; `dist/` is generated. Cloudflare Pages deployment is intentionally not configured or run yet.

## Pages

- `/` — Detects a saved language preference or browser language, then redirects to `/en/` or `/ko/`
- `/en/`, `/ko/` — Home, interests, and links to the other sections
- `/en/blog/`, `/ko/blog/` — Blog coming soon
- `/en/lab/`, `/ko/lab/` — Lab coming soon
- `/en/about/`, `/ko/about/` — About and contact details

The blog and lab do not show placeholder entries. There is no CMS, database, authentication, admin area, or live API. Cloudflare Pages deployment is intentionally not configured or run yet.
