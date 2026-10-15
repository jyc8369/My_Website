# jyc8369.dev

A bilingual, static personal website built with plain HTML, CSS, and JavaScript. The blog is authored in Markdown and converted to static pages during the build. No client framework, database, CMS, or server runtime is required to serve the finished site.

## Local development

```sh
npm run dev
```

This builds the site into `dist/` and serves it at `http://127.0.0.1:3000`. To rebuild after editing Markdown while the server is running, run `npm run build` again. `npm start` serves the existing build without rebuilding.

## Build output

```sh
npm run build
```

The build copies `site/` into `dist/`, validates and renders any blog Markdown under `src/content/blog/YYYY/MM/slug.md`, and writes static language-specific blog pages. A missing content folder or zero valid posts leaves Blog in its Coming Soon state. Invalid posts are logged and excluded without preventing other posts from building.

`dist/` is the static output directory for Cloudflare Workers Static Assets. GitHub Actions builds and deploys pushes to `main` through the `production` environment. Add `CLOUDFLARE_API_TOKEN` as an environment secret, scoped to this Cloudflare account with Workers Scripts edit permission. The token remains in GitHub Secrets and is never stored in the repository.

## Routes

- `/` — Selects a saved language preference or the browser language and opens `/en/` or `/ko/`.
- `/en/`, `/ko/` — Home, interests, and links to the other sections.
- `/en/blog/`, `/ko/blog/` — Coming Soon until a valid post exists; then a date-sorted list with 20 posts per page.
- `/en/blog/YYYY/MM/slug/`, `/ko/blog/YYYY/MM/slug/` — English translation notice and Korean Markdown article.
- `/en/lab/`, `/ko/lab/` — Coming Soon.
- `/en/about/`, `/ko/about/` — About and contact details.

## Blog authoring

Add a Markdown file at `src/content/blog/YYYY/MM/slug.md`. Required frontmatter fields are `title`, `title_en`, `date`, and `description`. The date must match the year and month folders; the lowercase English filename becomes the URL slug. See `scripts/blog/README.md` for the supported Markdown and metadata format.
