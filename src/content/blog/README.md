# Writing a blog post

This folder contains the Korean source articles used by the static site build. Each valid Markdown file is included in the generated site, so do not put drafts or private notes here.

## 1. Create the file

Use this layout:

```text
src/content/blog/YYYY/MM/english-slug.md
```

For example, `src/content/blog/2026/10/setting-up-my-site.md` becomes:

- Korean article: `/ko/blog/2026/10/setting-up-my-site/`
- English notice: `/en/blog/2026/10/setting-up-my-site/`

The filename is the URL slug. Use lowercase English letters and numbers, with single hyphens between words. The year and month directories must match the article's `date`.

## 2. Add the required metadata

Every post needs these four single-line fields:

```yaml
---
title: "한국어 제목"
title_en: "English title for the blog list"
date: 2026-10-14
description: "글의 내용을 간단히 설명하는 문장"
---
```

- `title`: Korean article title.
- `title_en`: English title shown in the English blog list. Add a real translation; it is not generated automatically.
- `date`: A real calendar date in `YYYY-MM-DD` format. Its year and month must match the folders.
- `description`: A short Korean summary for the article page.

Use one line per field. Quote text values, especially when they contain a colon or `#`. Do not use YAML block strings (`|` or `>`), nested values, or duplicate fields; the lightweight parser does not support them.

## 3. Write the article

The post body supports headings (`#` through `###`), paragraphs, ordered and unordered lists, blockquotes, fenced code blocks, inline code, bold and italic text, and links. A table of contents is generated when the article has headings. Prefer `##` for main sections and `###` for subsections because the page already displays the post title as its main heading.

Example complete file:

````markdown
---
title: "나만의 웹사이트를 만들기로 한 이유"
title_en: "Why I Decided to Build My Own Website"
date: 2026-10-14
description: "도메인과 서버를 준비하고 개인 웹사이트를 만들기까지의 이야기입니다."
---

별다른 계획 없이 도메인과 VPS를 마련했습니다. 시간이 지나면서 그 공간에 제가 직접 관리할 웹사이트를 만들어 보기로 했습니다.

## 작은 시작

처음에는 배포와 파일 구조를 익히는 것이 목표였습니다. 완성된 서비스보다, 직접 바꾸고 운영 방식을 이해할 수 있는 작은 사이트부터 시작했습니다.

> 직접 관리하면 문제가 생겼을 때 원인을 찾아가는 과정도 배울 수 있습니다.

## 빌드 예시

```sh
npm run build
```

설정이나 코드 조각을 설명할 때는 언어 이름을 fenced code block에 붙이면 됩니다.

## 다음에 해볼 일

- 콘텐츠 구조를 단순하게 유지하기
- 읽기 편한 글 레이아웃 확인하기
- [프로젝트 저장소](https://github.com/jyc8369)에서 변경 사항 확인하기
````

Keep posts text-first. Images and downloadable attachments are outside the current publishing workflow. Raw HTML is escaped rather than rendered. Links may use `https:`, `http:`, `mailto:`, `tel:`, root-relative paths, or `#fragment` URLs.

## 4. English pages

The Korean page contains the Markdown article. The English blog list uses `title_en`; the English detail page shows an English-only notice linking to the Korean original. English article-body translations are not generated, so do not write Korean source text into English metadata fields.

## 5. Check before building

- [ ] The file is under the correct `YYYY/MM/` folder.
- [ ] Its filename is a lowercase English slug.
- [ ] All four metadata fields are present and non-empty.
- [ ] `date` is a real date and matches the folder.
- [ ] The English title is an intentional translation.
- [ ] The file is ready to appear in the build output; drafts are stored elsewhere.

Run `npm run build` from the project root. Invalid Markdown files are reported and skipped while other valid posts continue to build. The generator implementation and supported syntax are documented in [`scripts/blog/README.md`](../../../scripts/blog/README.md).
