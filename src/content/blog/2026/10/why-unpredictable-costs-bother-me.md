---
title: "예측하기 어려운 비용이 싫은 이유"
title_en: "Why I Avoid Unpredictable Costs"
title_ja: "予測しにくい費用を避けたい理由"
published_at: "2026-10-15T03:51:06Z"
description: "셀프 호스팅과 클라우드, AI 구독을 고민하며 예상 밖의 비용을 피하고 싶은 이유를 적었습니다."
description_en: "My thoughts on self-hosting, cloud services, and AI subscriptions—and why I try to avoid surprise bills."
description_ja: "セルフホスティングやクラウド、AIのサブスクリプションを考えながら、予想外の請求を避けたい理由を書きました。"
---

<!-- lang:ko -->
## 예측하기 어려운 비용이 싫은 이유

저는 충동적으로 무언가를 사는 편입니다. 계획해서 소비하기보다 갑자기 “이걸 사야겠다”, “저것도 해 보고 싶다”는 생각이 들 때가 있습니다. 그래서 매달 사용량에 따라 청구액이 달라지는 호스팅 서비스는 신경이 쓰입니다. 얼마나 썼는지에 따라 비용이 달라지는 구조가 제게는 부담스럽습니다.

특히 서버를 공개하면 외부에서 접근할 수 있는 경로가 생깁니다. 악의적인 트래픽이나 갑작스러운 방문 증가가 발생했을 때, 서비스 설정에 따라 사용량과 비용이 크게 늘 수 있습니다. 한 달 청구서가 갑자기 수백, 혹은 천 달러 단위로 나오는 상황을 저는 감당하기 어렵습니다. 그런 금액을 낼 경제적 여력도 없고요.

## 셀프 호스팅이 편한 이유

그래서인지 저는 셀프 호스팅을 좋아하는 것 같습니다. 집에서 서버를 운영하면 비용은 주로 전기와 네트워크 사용에 들어갑니다. 저는 서버를 계속 모니터링할 수 있는 환경을 갖추고 있어서, 트래픽이 비정상적으로 늘거나 전력 사용량이 높아지면 알아차릴 수 있습니다. 문제가 생기면 접근을 차단하는 식으로 대응할 수도 있습니다.

물론 집에서 서버를 운영한다고 위험이 사라지는 것은 아닙니다. 외부 회선이나 네트워크 장비에 문제가 생길 수 있고, 공격 트래픽이 집까지 들어오는 상황도 고려해야 합니다. 그래도 사용량이 늘 때마다 청구액이 바로 커지는 구조보다는 제가 직접 상황을 살피고 통제할 수 있는 쪽이 마음 편합니다.

클라우드 서비스에 사용량 알림이나 지출 한도를 설정할 수 있다는 것도 알고 있습니다. 하지만 그런 기능이 있다는 걸 알면서도 선뜻 쓰고 싶지는 않았습니다. 정확한 이유를 설명하기는 어렵지만, 종량제 과금 자체가 제게 잘 맞지 않는 것 같습니다.

## 인기를 얻어도 비용이 걱정된다

웹 서비스를 배포할 때는 최악의 상황도 생각해야 한다고 배웠습니다. 예를 들어 제 프로젝트가 예상 밖으로 인기를 얻어 방문자가 급증하면, 그만큼 서버 비용도 크게 늘 수 있습니다.

프로젝트가 수익을 내고 있다면 늘어난 비용을 감당할 여지가 있을지도 모릅니다. 하지만 오픈 소스 프로젝트처럼 소스 코드를 공개하는 일이 목적이고 직접적인 수익은 없는 경우라면 어떨까요? 프로젝트의 인지도는 높아질 수 있지만, 방문자가 늘어난 만큼의 비용을 충당할 수익이 생기는 것은 아닙니다. 좋은 일이 생겨도 청구서가 걱정되는 상황을 피하고 싶습니다.

## 직접 소유하고 운영하는 즐거움

저는 컴퓨터 조립을 좋아합니다. 부품을 고르고 견적을 짜고 직접 조립합니다. 문제가 생기면 원인을 찾고 해결하는 것도 제 몫입니다. 제 판단이 잘못되어 성능이나 비용에 손실이 생겨도 책임은 제게 있습니다. 그런 과정을 좋아합니다.

제 앞에 여러 대의 컴퓨터와 서버가 있고, 제가 만든 시스템이 동작하고, 제 도메인과 메일 주소를 직접 관리한다는 감각도 좋습니다. 아마 제게는 소유하고 직접 운영하는 데서 오는 만족감이 큰 것 같습니다. 그걸 실현하려고 여러 가지를 시도하고 있지만, 아직 눈에 띄는 성과가 있다고 말하기는 어렵습니다.

그렇다고 클라우드 서비스를 전혀 쓰지 않는 건 아닙니다. 필요할 때는 VPS를 사용합니다. 지금은 리버스 프록시나 로드 밸런서 용도로 무료 플랜을 활용하고 있습니다. Oracle Cloud의 Always Free와 AWS 프리 티어 같은 공유 컴퓨팅 자원도 사용합니다. 현재는 무료 범위 안에서 사용하고 있어 직접 청구되는 비용은 없지만, 자원이나 성능에 제한이 있을 수 있습니다. 다른 사용자의 부하에 따라 성능이 달라질 수도 있고요.

제 용도에서는 리버스 프록시나 로드 밸런서에 1 vCPU와 메모리 1GB 구성을 우선 고려하고 있습니다. 하지만 이 사양이 충분한지, 동시 연결이나 요청을 어느 정도 처리할 수 있는지는 요청의 종류와 서버 설정, 네트워크 상태에 따라 달라집니다. 아직 실제 부하 테스트를 진행하지 않았으므로 처리 가능한 접속자 수를 구체적인 숫자로 제시하지 않겠습니다. 구체적인 운영 흐름은 나중에 따로 정리해 보겠습니다.

## AI도 종량제보다 정액제가 편하다

저는 AI를 많이 사용합니다. AI를 쓰는 방식이나 코드를 만드는 과정에 대해서는 나중에 따로 이야기해 보고 싶습니다. 여기서 말하고 싶은 건 비용을 고르는 기준입니다.

API 키를 발급받아 사용량에 따라 결제하는 방식은 선호하지 않습니다. 모델이 불필요한 반복을 하거나 긴 출력을 계속 생성하면 사용량이 예상보다 커질 수 있기 때문입니다. 그래서 저는 종량제보다는 매달 금액이 정해져 있는 구독형 서비스를 더 자주 이용합니다.

예전에는 AI 비용으로 한 달에 약 30만 원을 썼습니다. 지금은 많이 줄여서 월 3만 원 정도를 내고 있습니다. 앞으로 사용량이 다시 늘 수도 있겠지만, 적어도 현재는 매달 비용을 예측하기가 훨씬 쉬워졌습니다.

저는 이런 사람인 것 같습니다. 직접 만들고 소유하는 걸 좋아하지만, 예상하지 못한 청구서가 날아오는 것은 싫어합니다. 그래서 필요한 곳에는 클라우드를 쓰면서도, 비용이 어떻게 늘어날지 가늠할 수 있는 방식을 계속 찾고 있습니다.

관련 글: [메일 서버를 만들고 한 시간 만에 접은 이유](/ko/blog/2026/10/why-i-abandoned-my-mail-server/) · [캐나다의 서버와 따뜻한 방](/ko/blog/2026/10/my-infrastructure-in-canada/).

<!-- lang:en -->
## Why I Avoid Unpredictable Costs

I can be impulsive with purchases. Instead of planning what to buy, I sometimes suddenly think, “I should get this,” or “I want to try that too.” That is why hosting services with bills that change every month make me uneasy. A cost that depends on how much I use feels like a burden.

Making a server publicly accessible also creates a path for outside traffic. Depending on how a service is configured, malicious traffic or a sudden jump in visits can drive usage and costs up. I could not handle a bill that suddenly reached hundreds or even a thousand dollars in a month. I simply do not have the financial room for that.

## Why self-hosting feels comfortable

Maybe that is why I like self-hosting. When I run servers at home, the main costs are electricity and network usage. I can monitor my servers continuously, so I would notice an unusual rise in traffic or power use. If something went wrong, I could respond by blocking access.

Of course, running a server at home does not eliminate risk. The internet connection or network equipment could fail, and I also have to consider attack traffic reaching my home connection. Still, I feel more comfortable being able to watch and control the situation than having a bill grow directly with every increase in usage.

I know cloud services can send usage alerts or let you set spending limits. Even knowing those features exist, I have been reluctant to use them. I cannot quite explain why, but usage-based billing itself does not feel right for me.

## Popularity can mean higher costs

I learned that when deploying a web service, you should consider the worst case too. If one of my projects unexpectedly became popular and visits surged, the server costs could rise along with them.

If a project earns revenue, perhaps there is room to cover the extra costs. But what if it is an open-source project whose purpose is simply to share code, with no direct revenue? The project might gain recognition, but that does not mean it will earn enough to cover the added traffic. I would rather avoid a situation where even good news makes me worry about the bill.

## The pleasure of owning and running things

I like building computers. I pick the parts, plan the build, and put it together myself. If a problem comes up, finding and fixing it is my responsibility. If a bad decision costs me performance or money, that is on me. I enjoy that process.

I also like having several computers and servers around me, seeing systems I built run, and managing my own domain and email address. I think I get a lot of satisfaction from owning and operating things myself. I keep trying different ways to make that happen, though I cannot say I have much to show for it yet.

That does not mean I never use cloud services. I use a VPS when I need one. Right now, I use free plans for things like a reverse proxy or load balancer. I also use shared computing resources such as Oracle Cloud Always Free and the AWS Free Tier. I currently stay within the free allowances, so I do not have a direct bill for them, but the available resources and performance can be limited. Performance may also vary with the load from other users.

For my use case, I am considering a configuration with 1 vCPU and 1 GB of memory for a reverse proxy or load balancer. Whether that is sufficient, and how many concurrent connections or requests it can handle, depends on the workload, server settings, and network conditions. I have not performed a load test, so I will not give a specific number of users it can support. I will write up the actual workflow another time.

## I prefer subscriptions to usage-based AI billing

I use AI a lot. I may write separately about how I use it and how I build things with it. What I want to talk about here is how I choose to pay for it.

I do not prefer paying for AI usage through an API key. If a model repeats unnecessary steps or keeps generating long responses, usage can grow beyond what I expected. So I tend to use subscriptions with a fixed monthly price more often than pay-as-you-go plans.

I used to spend about $200 a month on AI. I have cut that down considerably and now spend around $20 per month. My usage could increase again, but at least for now, it is much easier to predict what I will pay each month.

I suppose I am someone who likes building and owning things but dislikes surprise bills. So I use cloud services where I need them while continuing to look for ways to keep costs predictable.

Related reading: [Why I Abandoned My Mail Server After an Hour](/en/blog/2026/10/why-i-abandoned-my-mail-server/) · [Servers and a Warm Room in Canada](/en/blog/2026/10/my-infrastructure-in-canada/).

<!-- lang:ja -->
## 予測しにくい費用を避けたい理由

私は衝動的に買い物をしてしまうことがあります。計画して買うというより、急に「これを買おう」「あれも試してみたい」と思うことがあります。だから、毎月の使用量によって請求額が変わるホスティングサービスは気になります。使った量に応じて費用が変わる仕組みは、私には負担に感じられます。

サーバーを公開すると、外部からアクセスできる経路ができます。サービスの設定によっては、悪意のあるトラフィックや急なアクセス増加で使用量と費用が大きくなることがあります。ひと月の請求が突然数百ドル、あるいは1,000ドルほどになっても、私には支払えません。そこまでの経済的な余裕はありません。

## セルフホスティングが気楽な理由

だから私はセルフホスティングが好きなのかもしれません。自宅でサーバーを運用する場合、主な費用は電気代とネットワークの使用料です。サーバーを常時監視できる環境があるので、トラフィックや電力使用量が異常に増えれば気づけます。問題が起きたら、アクセスを遮断するなどの対応もできます。

もちろん、自宅でサーバーを運用すればリスクがなくなるわけではありません。回線やネットワーク機器に問題が起きることもありますし、攻撃トラフィックが自宅の回線まで届く可能性も考える必要があります。それでも、使用量が増えるたび請求額が直接増える仕組みより、自分で状況を見て管理できるほうが安心です。

クラウドサービスには、使用量の通知や支出上限を設定できる機能があることも知っています。それでも、なかなか使う気になれませんでした。理由をうまく説明できませんが、従量課金そのものが自分には合わないようです。

## 人気が出ても費用が心配

ウェブサービスを公開するときは、最悪のケースも想定するべきだと学びました。たとえば、自分のプロジェクトが予想外に注目されてアクセスが急増すれば、サーバー費用も大きく増える可能性があります。

プロジェクトが収益を上げていれば、増えた費用をまかなえるかもしれません。でも、コードを公開することが目的のオープンソースプロジェクトで、直接の収益がなかったらどうでしょう。知名度は上がるかもしれませんが、アクセス増加分の費用を補う収入が得られるとは限りません。良いことが起きても請求額が心配になる状況は避けたいです。

## 所有して自分で運用する楽しさ

私はパソコンを組み立てるのが好きです。パーツを選び、構成を考え、自分で組み立てます。問題が起きたら原因を探して直すのも自分の役目です。判断を間違えて性能や費用に損失が出ても、自分の責任です。そうした過程が好きです。

自分の前に複数のパソコンやサーバーがあり、自分で作ったシステムが動いていて、自分のドメインやメールアドレスを管理している。その感覚も気に入っています。所有して自分で運用することに、大きな満足感を覚えるのだと思います。実現するためにいろいろ試していますが、まだ目立った成果があるとは言えません。

だからといって、クラウドサービスをまったく使わないわけではありません。必要なときはVPSを使います。今はリバースプロキシやロードバランサーに無料プランを利用しています。Oracle Cloud Always FreeやAWS無料利用枠のような共有コンピューティングリソースも使っています。現在は無料枠内で利用しているため直接の請求はありませんが、使えるリソースや性能には制限があります。他の利用者の負荷によって性能が変わることもあります。

私の用途では、リバースプロキシやロードバランサーに1 vCPUと1 GBのメモリを使う構成をまず検討しています。ただし、この仕様で十分かどうか、同時接続やリクエストをどの程度処理できるかは、負荷の種類、サーバー設定、ネットワーク状況によって変わります。実際の負荷テストはまだ行っていないため、対応可能な利用者数を具体的な数字では示しません。運用の詳しい流れは、また別の記事にまとめるつもりです。

## AIも従量課金より定額制が気楽

私はAIをよく使います。AIの使い方や、AIを使った開発については、また別の記事で書きたいと思います。ここで話したいのは、料金の選び方です。

APIキーを使って利用量に応じて支払う方法は、あまり好みません。モデルが不要な処理を繰り返したり、長い出力を続けたりすると、使用量が予想以上に増えることがあるからです。そのため、従量課金より月額料金が決まっているサブスクリプションをよく利用します。

以前はAIに月約3万円を使っていました。今はかなり減り、月約3,000円ほどです。今後また利用が増えるかもしれませんが、少なくとも現時点では毎月の費用をずっと予測しやすくなりました。

私は、何かを作って所有するのは好きだけれど、予想外の請求書は苦手な人なのだと思います。必要なところではクラウドを使いながら、費用の増え方を見通せる方法を探し続けています。

関連記事：[メールサーバーを作って1時間でやめた理由](/ja/blog/2026/10/why-i-abandoned-my-mail-server/)、[カナダのサーバーと暖かい部屋](/ja/blog/2026/10/my-infrastructure-in-canada/)。

