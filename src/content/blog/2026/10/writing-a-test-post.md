---
title: "테스트 글은 어떻게 만들어질까"
title_en: "How a Test Post Comes Together"
title_ja: "テスト記事はどう作られるか"
date: "2026-10-15"
description: "세 언어로 작성한 테스트 글로 블로그 생성 과정을 살펴봅니다."
description_en: "A small three-language post that walks through the blog publishing workflow."
description_ja: "3言語の短い記事で、ブログの公開手順を紹介します。"
---

<!-- lang:ko -->
## 글 하나에서 세 페이지로

이 사이트의 블로그 글은 한국어, 영어, 일본어 본문을 한 Markdown 파일에 담습니다. 생성기는 각 언어를 읽어 서로 연결된 페이지로 만듭니다.

작성할 때 확인할 항목은 간단합니다.

- 파일 경로의 연도와 월이 게시 날짜와 일치하는지 확인합니다.
- 세 언어의 제목, 소개, 본문을 모두 작성합니다.
- 지원되는 문법만 사용하고 링크 주소를 확인합니다.

예를 들어 `npm run build`를 실행하면 글이 사이트 페이지로 만들어집니다. 문법과 언어 구성이 궁금하다면 [블로그 작성 가이드](../../../src/content/blog/README.md)를 참고하세요.

> 작은 초안도 세 언어의 독자가 같은 주제를 만나는 출발점이 될 수 있습니다.

<!-- lang:en -->
## One source, three pages

A post on this site keeps its Korean, English, and Japanese versions together in one Markdown file. The generator turns those sections into connected pages.

Before publishing, check a few things:

- Make sure the year and month in the path match the publication date.
- Fill in the title, description, and body for all three languages.
- Use supported Markdown and check each link.

Run `npm run build` to turn the post into site pages. See the [authoring guide](../../../src/content/blog/README.md) for the supported format.

> Even a small draft can give readers in three languages a shared starting point.

<!-- lang:ja -->
## ひとつの原稿から三つのページへ

このサイトの記事では、韓国語、英語、日本語の本文をひとつのMarkdownファイルにまとめます。生成ツールが各言語のセクションを読み取り、相互に移動できるページを作ります。

公開前には次の点を確認します。

- パスの年と月が公開日と一致していること。
- 三言語すべてのタイトル、紹介文、本文がそろっていること。
- 対応するMarkdown記法を使い、リンク先を確認していること。

`npm run build`を実行すると記事がサイトのページになります。書き方の詳細は[執筆ガイド](../../../src/content/blog/README.md)を参照してください。

> 小さな下書きも、三言語の読者が同じテーマに出会うきっかけになります。
