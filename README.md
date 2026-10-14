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

The `site/` folder is the source of truth; `dist/` is generated.

## Cloudflare Workers Static Assets

The deployment target is `jyc8369-dev-static` on Cloudflare Workers Static Assets.
`cloudflare.config.ts` defines the account and Worker settings; `wrangler.config.ts`
selects `dist/` as the asset directory for the cf CLI's build tool.

```sh
npm ci
npx cf auth login
npm run deploy:check
npm run deploy
```

Both deployment commands rebuild the site first. `deploy:check` validates the
deployment without uploading it. Authentication stays outside the repository.
The Worker serves the HTML, CSS, and JavaScript assets directly, including the
custom 404 page and security headers in `site/_headers`.

The custom domain is `https://jyc8369.dev`. The default public URL
`https://jyc8369-dev-static.jyc8369.workers.dev` also remains available.
Automatic GitHub deployments are not configured.

## Pages

- `/` — Detects a saved language preference or browser language, then redirects to `/en/` or `/ko/`
- `/en/`, `/ko/` — Home, interests, and links to the other sections
- `/en/blog/`, `/ko/blog/` — Blog coming soon
- `/en/lab/`, `/ko/lab/` — Lab coming soon
- `/en/about/`, `/ko/about/` — About and contact details

The blog and lab do not show placeholder entries. There is no CMS, database, authentication, admin area, or live API.
