---
title: "웹사이트를 셀프 호스팅하다가 옮긴 이유"
title_en: "Why I Moved My Website Away from Self-Hosting"
title_ja: "ウェブサイトの自宅運用をやめた理由"
published_at: "2026-10-15T04:57:50Z"
description: "집에서 웹사이트를 직접 운영하다가 네트워크 경로와 보안, 유지보수를 고민한 끝에 Cloudflare Workers Static Assets로 옮긴 이야기입니다."
description_en: "After running my website at home, I moved it to Cloudflare Workers Static Assets because of routing, security, and maintenance concerns."
description_ja: "自宅でウェブサイトを運用したあと、経路やセキュリティ、保守について考え、Cloudflare Workers Static Assetsへ移した話です。"
---

<!-- lang:ko -->
## 웹사이트를 셀프 호스팅하다가 옮긴 이유

처음에는 웹사이트도 집에 있는 서버에서 직접 운영하고 싶었습니다. 제가 만든 페이지가 제 서버에서 실제로 동작한다는 만족감이 컸기 때문입니다. 처음 올린 것은 내용도 없는 임시 페이지였지만, 셀프 호스팅을 시작했다는 것만으로도 재미있었습니다.

그런데 어느 순간 호스팅 방식을 바꾸게 됐습니다. 아주 특별한 사건 하나 때문이라기보다는, 네트워크 경로와 서버 운영에 관한 고민이 쌓인 결과였습니다.

## 라우팅 문제가 계속 마음에 걸렸다

제 도메인의 DNS는 Cloudflare에서 관리하고, 외부 트래픽은 VPS의 리버스 프록시를 거쳐 캐나다에 있는 서버로 전달하는 구조였습니다. 그 사이의 라우팅 경로에 해결하기 어려운 물리적 문제가 있었고, 연결 상태가 고르지 않거나 지연 시간이 튀는 일도 있었습니다.

단순히 NGINX 설정이나 Node.js 설정을 잘못한 문제라면 고쳐 볼 수 있었을 겁니다. 하지만 설정만 바꿔서 해결할 수 있는 문제가 아니라고 느꼈습니다. 구조를 계속 유지하는 것이 맞는지 고민하게 됐습니다.

보안도 고려했습니다. 리버스 프록시를 쓰면 내부 서버의 IP를 직접 공개하지 않을 수 있지만, 서비스가 늘어나면 관리해야 하는 경로와 설정도 늘어납니다. 웹 애플리케이션을 직접 운영한다면 취약점이나 잘못된 설정으로 원본 서버가 드러날 가능성도 생각해야 합니다. 데이터베이스를 쓰는 서비스라면 SQL 인젝션 같은 문제도 별도로 대비해야 하고요.

현재 웹사이트는 정적 사이트라 데이터베이스를 운영하지 않습니다. 그래도 공개 서비스를 직접 호스팅할 때 생기는 공격 표면과 유지보수 부담을 줄이고 싶었습니다.

## 도메인은 생각보다 비싸지 않았다

Cloudflare라는 서비스는 알고 있었지만, 도메인과 호스팅에 대해 자세히 알아본 적은 없었습니다. 도메인 비용이 꽤 비쌀 거라고 생각해서 처음에는 선택지로 두지 않았습니다.

주변에서 도메인 비용이 몇 달러라고 말하는 것을 보고, 저는 그 금액이 월별 비용인 줄 알았습니다. 나중에 확인해 보니 연간 비용이었습니다. 제 도메인은 첫해 프로모션으로 약 12,000원, 갱신 때는 1년에 약 14,000원입니다. 갱신 비용을 월별로 나누면 대략 1,200원 정도입니다. 제가 생각했던 것보다 훨씬 저렴했습니다.

그래서 조금 충동적으로 도메인을 샀습니다. 그리고 호스팅 방법을 알아보다가 GitHub Pages와 셀프 호스팅을 비교하게 됐습니다. GitHub Pages는 예전에 사용해 봤지만 당시 제 필요에는 아쉬운 점이 있었고, 웹사이트도 전체적으로 새로 정리하고 싶었습니다.

AI에게 제 상황을 설명하고 선택지를 물어봤더니 Cloudflare의 정적 사이트 배포 방식을 살펴보라는 답을 들었습니다. 더 알아본 뒤 현재는 Cloudflare Workers Static Assets를 사용하고 있습니다. 지금 구성에서는 Cloudflare 호스팅에 별도 비용을 내지 않고 있습니다.

## 저장소에 푸시하면 배포된다

웹사이트 코드는 GitHub 저장소에 공개되어 있습니다. `main` 브랜치에 변경 사항을 푸시하면 자동으로 빌드하고 배포하도록 설정했습니다. 직접 서버에 접속해 파일을 올리거나 프로세스를 재시작하지 않아도 됩니다.

호스팅을 옮기면서 제가 원했던 분리도 얻었습니다. 웹사이트 배포가 집에 있는 서버 상태에 의존하지 않습니다. 집의 네트워크나 서버에 문제가 생겨도 정적 사이트는 별도의 배포 환경에서 제공됩니다.

## 글은 Markdown으로 쓰고 HTML로 만든다

이 블로그의 글은 Markdown 파일로 작성합니다. Markdown이 제게 익숙하고, 원고를 읽고 고치기도 편하기 때문입니다. HTML로도 글을 쓸 수 있지만, 태그가 섞인 문서보다 Markdown이 내용을 한눈에 파악하기 쉽습니다.

빌드 과정에서 Markdown 원고를 읽어 한국어·영어·일본어 페이지를 만들도록 자동화해 두었습니다. 그래서 글을 쓸 때는 내용에 집중하고, 게시할 때는 저장소에 파일을 추가해 배포할 수 있습니다.

기술 스택이나 오류 해결 과정을 직접 참고하고 싶은 분은 공개된 GitHub 저장소의 Markdown 원고와 코드를 살펴보셔도 좋습니다. 저처럼 Markdown으로 글을 쓰고 정적 페이지로 만드는 방법에 관심이 있다면, 저장소가 작은 참고 자료가 되기를 바랍니다.

<!-- lang:en -->
## Why I Moved My Website Away from Self-Hosting

At first, I wanted to run my website on a server at home. I liked the feeling of a page I had made actually running on my own server. The first version was only a temporary page with no real content, but it was fun just to get self-hosting started.

At some point, though, I changed how I hosted it. There was no single dramatic event. It was the result of concerns that had built up around network routing and server operations.

## The routing issues kept bothering me

Cloudflare managed the DNS for my domain, and external traffic went through a reverse proxy on a VPS before reaching my server in Canada. There were hard-to-resolve physical issues along that route, and the connection could be inconsistent, with latency spikes from time to time.

If the problem had simply been a mistake in my NGINX or Node.js configuration, I could have tried to fix it. But it did not feel like something I could solve by changing settings alone. I began to question whether I should keep that setup.

Security was another consideration. A reverse proxy can keep an internal server's IP from being directly exposed, but adding services also means more routes and settings to manage. If I run a web application myself, I also have to consider vulnerabilities or misconfiguration that could expose the origin server. A service with a database would need separate protections against issues such as SQL injection.

My current website is static and does not use a database. Even so, I wanted to reduce the attack surface and maintenance burden that come with hosting a public service myself.

## Domains were less expensive than I thought

I knew about Cloudflare, but I had not looked closely into domains and hosting. I assumed a domain would be fairly expensive, so I did not consider one at first.

I had heard people mention domain prices in dollars and assumed they meant a monthly price. Later, I found out they were talking about the annual cost. My domain cost roughly $9 for the first year with a promotion, and renewal is about $10 per year. That works out to around $0.80 per month. It was much cheaper than I had imagined.

So I bought a domain somewhat impulsively. While figuring out how to host the site, I compared GitHub Pages with self-hosting. I had used GitHub Pages before, but it did not quite meet my needs at the time, and I also wanted to rebuild the website more generally.

I described my situation to an AI assistant and asked it to compare the options. It suggested looking into Cloudflare's static site hosting. After doing more research, I chose Cloudflare Workers Static Assets. With my current setup, I do not pay a separate hosting charge to Cloudflare.

## A push to the repository triggers deployment

The website code is public in a GitHub repository. I set it up so that pushing changes to the `main` branch automatically builds and deploys the site. I do not have to log into a server to upload files or restart a process.

Moving the hosting also gave me the separation I wanted. The website deployment no longer depends on the state of my home server. Even if my home network or server has a problem, the static site is served from a separate deployment environment.

## I write in Markdown and generate HTML

I write the blog posts as Markdown files. Markdown is familiar to me, and it is easier to read and edit a draft that way. I could write posts in HTML, but Markdown makes the content easier to scan without tags mixed in.

The build process reads the Markdown source and automatically creates Korean, English, and Japanese pages. That lets me focus on writing, then add a file to the repository when I am ready to publish.

If you want to look at the technology choices or how I solved a problem, feel free to explore the Markdown drafts and code in the public GitHub repository. I hope it can be a useful reference if you are interested in writing in Markdown and turning static pages into a website.

<!-- lang:ja -->
## ウェブサイトの自宅運用をやめた理由

最初は、ウェブサイトを自宅のサーバーで運用したいと思っていました。自分で作ったページが自分のサーバーで実際に動くことに、満足感があったからです。最初に置いたのは内容のない仮ページでしたが、自宅運用を始められただけでも楽しかったです。

ところが、ある時点でホスティング方法を変えました。何か大きな出来事がひとつあったわけではなく、ネットワーク経路やサーバー運用についての悩みが積み重なった結果です。

## ルーティングの問題が気になり続けた

ドメインのDNSはCloudflareで管理し、外部からのトラフィックはVPSのリバースプロキシを経由して、カナダにあるサーバーへ送る構成でした。その経路には解決しにくい物理的な問題があり、接続が不安定になったり、遅延が急に大きくなったりすることがありました。

NGINXやNode.jsの設定ミスだけが原因なら、修正を試せたと思います。でも、設定を変えるだけでは解決できない問題だと感じました。この構成を続けるべきなのか、考えるようになりました。

セキュリティも理由のひとつです。リバースプロキシを使えば内部サーバーのIPを直接公開せずに済みますが、サービスが増えれば管理する経路や設定も増えます。ウェブアプリケーションを自分で運用するなら、脆弱性や設定ミスによってオリジンサーバーが露出する可能性も考えなければなりません。データベースを使うサービスなら、SQLインジェクションのような問題への対策も別途必要です。

現在のウェブサイトは静的サイトで、データベースは使っていません。それでも、公開サービスを自分でホスティングすることで増える攻撃対象領域や保守の負担を減らしたいと思いました。

## ドメインは思ったより高くなかった

Cloudflareというサービスは知っていましたが、ドメインやホスティングについて詳しく調べたことはありませんでした。ドメインはかなり高いと思い、最初は選択肢に入れていませんでした。

周りの人がドメインの価格を数ドルと言っているのを聞いて、月額のことだと思っていました。あとから、それが年額だと分かりました。私のドメインは初年度のキャンペーンで約1,300円、更新後は年約1,500円です。月に換算すると約125円で、想像していたよりずっと安いものでした。

そこで、少し衝動的にドメインを買いました。ホスティング方法を調べる中で、GitHub Pagesと自宅運用を比べました。以前GitHub Pagesを使ったことはありましたが、当時の自分の用途では物足りない点があり、ウェブサイト全体を作り直したいとも思っていました。

自分の状況をAIアシスタントに説明して選択肢を尋ねると、Cloudflareの静的サイトホスティングを調べてみるよう勧められました。さらに調べた結果、現在はCloudflare Workers Static Assetsを使っています。今の構成では、Cloudflareのホスティングに別途料金を支払っていません。

## リポジトリにプッシュするとデプロイされる

ウェブサイトのコードはGitHubの公開リポジトリにあります。`main`ブランチに変更をプッシュすると、自動でビルドしてデプロイするよう設定しました。サーバーに直接ログインしてファイルをアップロードしたり、プロセスを再起動したりする必要はありません。

ホスティングを移したことで、望んでいた分離も実現できました。ウェブサイトのデプロイは自宅サーバーの状態に依存しません。自宅のネットワークやサーバーに問題が起きても、静的サイトは別のデプロイ環境から配信されます。

## Markdownで書き、HTMLを生成する

ブログ記事はMarkdownファイルで書いています。Markdownは自分にとって馴染みがあり、原稿を読んだり修正したりするのも簡単だからです。HTMLで記事を書くこともできますが、タグが混ざった文書より、Markdownのほうが内容をひと目で把握できます。

ビルド処理でMarkdownの原稿を読み込み、韓国語・英語・日本語のページを自動生成するようにしました。記事を書くときは内容に集中し、公開するときはファイルをリポジトリに追加すればデプロイできます。

技術スタックや問題の解決方法を参考にしたい方は、公開しているGitHubリポジトリのMarkdown原稿やコードを見てみてください。Markdownで記事を書き、静的ページからウェブサイトを作る方法に興味がある方にとって、小さな参考資料になればうれしいです。
