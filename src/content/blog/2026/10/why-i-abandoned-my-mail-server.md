---
title: "메일 서버를 만들고 한 시간 만에 접은 이유"
title_en: "Why I Abandoned My Mail Server After an Hour"
title_ja: "メールサーバーを作って1時間でやめた理由"
published_at: "2026-10-15T03:26:44Z"
description: "직접 메일 서버를 구축하고 수신까지 확인했지만, 가용성과 유지보수 부담을 고려해 관리형 서비스로 바꾼 이야기입니다."
description_en: "I built a mail server and confirmed it could receive messages, then chose a managed service because of availability and maintenance concerns."
description_ja: "メールサーバーを構築して受信まで確認したものの、可用性と保守の負担を考えてマネージドサービスに切り替えた話です。"
---

<!-- lang:ko -->
## 메일 서버를 만들고 한 시간 만에 접은 이유

도메인을 구매하자마자 가장 먼저 떠올린 건 메일 서버였습니다. Gmail 같은 상용 서비스를 쓰는 것이 일반적이고 편리하다는 건 알고 있었습니다. 그래도 저는 시스템을 직접 소유하고, 무언가를 만들어 운영해 보는 일을 좋아합니다. 제가 만든 것을 실제로 갖고 있다는 느낌이 좋기 때문입니다.

그래서 처음에는 메일 서버를 직접 호스팅해 보기로 했습니다. 집에는 국가가 서로 다른 두 대의 서버 노드가 있습니다. 어느 쪽에서 운영하더라도 물리적으로 떨어져 있다는 장점은 있지만, 직접 유지보수해야 한다는 점은 달라지지 않습니다.

## 메일은 계속 받을 수 있어야 한다

메일 서버를 구동하고 DNS 레코드를 설정한 뒤, 실제로 메일이 수신되는 것까지 확인했습니다. 구축에는 시행착오가 있었지만, 기본적인 동작은 확인할 수 있었습니다.

그런데 운영을 생각하자 걱정이 생겼습니다. 메일은 서버가 꺼져 있거나 네트워크가 끊기면 그 순간 바로 받을 수 없습니다. 발신 서버가 나중에 다시 전송을 시도하는 경우도 있지만, 재시도 정책과 보관 기간은 발신 서비스마다 다릅니다. 중요한 알림이나 업무 메일을 받아야 할 때 제 서버가 장애 상태라면 어떻게 될까요? 메일이 결국 전달될 수도 있겠지만, 그 과정을 제가 통제할 수는 없었습니다.

특히 새 도메인으로 만든 주소를 주 메일 주소처럼 쓰기 시작하면, 여러 서비스에 등록된 주소도 차례로 바뀌게 됩니다. 그렇게 주소를 바꾼 뒤 서버 장애 때문에 중요한 메일을 놓칠 가능성을 생각하니 망설여졌습니다.

## 집 인터넷 회선의 25번 포트 문제

구축 중에 예상하지 못한 제약도 만났습니다. 일반 가정용 ISP 회선에서 25번 포트가 차단되어 있었습니다. 이 때문에 메일 서버가 다른 서버와 직접 통신해 메일을 보내는 데 문제가 생길 수 있었습니다.

중간에 메일 릴레이를 두면 발송 문제는 해결할 수 있었습니다. 실제로 발송할 때만 중계 단계를 거치도록 구성해 동작을 확인했습니다. 기술적으로는 우회할 수 있었지만, 직접 운영해야 하는 구성 요소가 하나 더 늘었습니다.

## 장애를 대비하는 비용

서버 장애에 대비해 수신 경로를 여러 곳으로 나누는 방안도 생각해 봤습니다. 하지만 안정성을 높이려면 상시 동작하는 중계 서버와 복수의 메일 서버가 필요할 수 있습니다. 서버를 여러 대 두고 상태를 맞추는 일도 추가됩니다. VPS와 직접 관리하는 서버를 함께 쓰는 구성을 고려해도, 비용과 유지보수 부담이 만만치 않아 보였습니다.

저는 예측하기 어려운 비용이 늘어나는 것을 좋아하지 않습니다. 안정성을 높이려는 구성이 오히려 계속 신경 써야 할 서비스와 비용을 더하는 상황은 원하지 않았습니다. 비용을 들여도 장애 가능성을 완전히 없앨 수는 없다는 점도 고민이었습니다.

## 한 시간 만에 접고 관리형 서비스로

결국 약 한 시간 동안 구축하고 테스트한 뒤 자체 호스팅을 접었습니다. 서버를 켜고 DNS를 설정해 메일 수신까지 확인했지만, 실제로 계속 운영하는 데 필요한 가용성과 유지보수 부담을 감당하고 싶지는 않았습니다.

대신 검증된 메일 제공자에 제 도메인을 연결해 사용하기로 했습니다. 관리형 서비스를 선택한다고 장애 가능성이 사라지는 것은 아닙니다. 제공자나 네트워크에 문제가 생길 수도 있습니다. 그래도 제 집의 서버만으로 메일을 운영하는 것보다는 안정적으로 관리될 가능성이 높다고 판단했습니다.

제가 운영하던 서버에서 정전이나 인터넷 장애가 실제로 발생했던 것은 아닙니다. 아직 문제가 없더라도 중요한 서비스를 운영한다면 문제가 생기는 경우를 먼저 생각해야 한다고 봤습니다. 직접 운영하는 즐거움보다 메일을 안정적으로 받을 수 있다는 점을 우선하기로 한 것입니다.

도메인으로 메일 서버를 직접 만들어 본 경험은 짧았지만, 무엇을 직접 운영하고 무엇을 맡길지 생각해 볼 수 있었습니다. 예측하기 어려운 비용에 대한 제 생각은 다른 글에서 더 이야기해 보겠습니다.

관련 글: [아무 생각 없이 산 도메인](/ko/blog/2026/10/bought-a-domain-on-a-whim/) · [예측하기 어려운 비용이 싫은 이유](/ko/blog/2026/10/why-unpredictable-costs-bother-me/).

<!-- lang:en -->
## Why I Abandoned My Mail Server After an Hour

The first thing I thought of after buying my domain was a mail server. I knew that using a commercial service like Gmail is common and convenient. Still, I like owning systems and building and operating things myself. I enjoy the feeling of having something I made up and running.

So my first plan was to host a mail server myself. I have two server nodes at home, in different countries. Their physical separation could be an advantage, but it would not change the fact that I would have to maintain them myself.

## Email needs to keep arriving

I brought up the mail server, configured the DNS records, and confirmed that it could receive messages. There were some bumps along the way, but I got the basic setup working.

Then I started thinking about what it would take to operate it. If the server goes down or the network is interrupted, I cannot receive mail right away. Sending servers may retry later, but retry policies and retention periods vary. What if my server were down when an important security alert or work message arrived? The message might eventually get through, but I would not control that process.

This mattered even more because I planned to start using an address on my new domain as a primary email address. I would gradually have to update it across different services. The possibility of missing an important message during an outage made me hesitate.

## Port 25 on a home internet connection

I also ran into an unexpected limitation while setting things up: my residential ISP connection blocked port 25. That can make it difficult for a mail server to communicate directly with other servers to send email.

Adding a mail relay in the middle solved the sending problem. I configured messages to pass through that relay when they were sent and confirmed that it worked. The workaround was technically possible, but it added another component I would have to operate.

## The cost of preparing for outages

I also considered splitting the receiving path across multiple servers to prepare for outages. But improving availability could require an always-on relay and multiple mail servers. I would also need to keep the servers coordinated. Even a setup combining a VPS with a server I managed myself seemed likely to bring significant costs and maintenance work.

I do not like unpredictable expenses. I did not want an attempt to improve reliability to leave me with more services and costs to keep an eye on. I also had to consider that spending more would not eliminate the possibility of an outage entirely.

## I switched to a managed service after an hour

In the end, I spent about an hour building and testing the server, then abandoned self-hosting. I had started the server, configured DNS, and confirmed that it could receive email. But I did not want to take on the availability and maintenance work required to keep operating it.

Instead, I connected my domain to an established email provider. Choosing a managed service does not make outages impossible; the provider or its network could still have problems. Even so, I decided it was more likely to be managed reliably than email running only on my home servers.

My own servers have not actually had a power outage or internet failure. But when operating an important service, I think it is better to consider what could go wrong even before anything has. I chose reliable email delivery over the enjoyment of running every part of the system myself.

My experiment with hosting email on my domain was brief, but it helped me think about what I want to operate myself and what I would rather leave to a provider. I will write more about my feelings on unpredictable costs in another post.

Related reading: [The Domain I Bought on a Whim](/en/blog/2026/10/bought-a-domain-on-a-whim/) · [Why I Avoid Unpredictable Costs](/en/blog/2026/10/why-unpredictable-costs-bother-me/).

<!-- lang:ja -->
## メールサーバーを作って1時間でやめた理由

ドメインを買ってすぐに思い浮かんだのは、メールサーバーでした。Gmailのような商用サービスを使うのが一般的で便利だということは分かっていました。それでも私は、システムを自分で所有し、何かを作って運用するのが好きです。自分で作ったものが実際に動いている、という感覚が気に入っています。

そこで最初は、メールサーバーを自分でホスティングしてみることにしました。自宅には、国の異なる場所に2台のサーバーノードがあります。物理的に離れている利点はありますが、自分で保守しなければならないことに変わりはありません。

## メールはいつでも受信できる必要がある

メールサーバーを起動してDNSレコードを設定し、実際にメールを受信できるところまで確認しました。途中で試行錯誤はありましたが、基本的な動作は確認できました。

ところが、運用を考えると不安が出てきました。サーバーが停止したりネットワークが切れたりすれば、その間すぐにはメールを受信できません。送信側のサーバーがあとで再送することもありますが、再試行の方針や保管期間はサービスによって異なります。重要なセキュリティ通知や仕事のメールが届くときに、自分のサーバーが停止していたらどうなるでしょうか。最終的に届く可能性はありますが、その過程を自分で制御することはできません。

新しいドメインのアドレスをメインのメールアドレスとして使い始めると、さまざまなサービスに登録したアドレスも順番に変更することになります。変更後にサーバー障害が起きて、大切なメールを受け取れない可能性を考えると、迷いがありました。

## 自宅回線の25番ポート

構築中には、予想していなかった制約にも遭遇しました。自宅の一般向けISP回線では、25番ポートがブロックされていました。そのため、メールサーバーがほかのサーバーと直接通信してメールを送信するのが難しくなることがあります。

中継用のメールリレーを挟むことで、送信の問題は解決できました。メールを送るときだけリレーを経由するように設定し、動作も確認しました。技術的には回避できましたが、自分で運用する構成要素がもうひとつ増えました。

## 障害に備えるためのコスト

障害に備えて、受信経路を複数のサーバーに分散する案も考えました。しかし可用性を高めるには、常時稼働する中継サーバーや複数のメールサーバーが必要になるかもしれません。サーバー同士の状態を保つ作業も増えます。VPSと自分で管理するサーバーを組み合わせる構成でも、費用や保守の負担は小さくなさそうでした。

私は予測できない出費が増えるのが苦手です。信頼性を高めるための構成が、常に気にかけるサービスや費用を増やすのは避けたいと思いました。費用をかけても障害の可能性を完全になくせるわけではない、という点も考える必要がありました。

## 1時間で自前運用をやめ、マネージドサービスへ

結局、1時間ほど構築とテストをしたあと、自前での運用をやめました。サーバーを起動し、DNSを設定して、メールを受信できることも確認しました。それでも継続運用に必要な可用性と保守の負担を引き受けたくありませんでした。

代わりに、実績のあるメールサービスに自分のドメインを接続して使うことにしました。マネージドサービスを選んでも、障害が起きなくなるわけではありません。提供者やネットワークに問題が起きる可能性はあります。それでも、自宅のサーバーだけで運用するより、安定して管理される可能性が高いと判断しました。

自分のサーバーで停電やインターネット障害が実際に起きたことはありません。それでも、重要なサービスを運用するなら、問題が起きていないうちから障害時のことを考えておくべきだと思いました。すべてを自分で運用する楽しさより、メールを安定して受け取れることを優先しました。

ドメインのメールサーバーを自分で作った経験は短いものでしたが、何を自分で運用し、何をサービス提供者に任せるかを考えるきっかけになりました。予測しにくい費用については、また別の記事で書こうと思います。

関連記事：[何も決めずに買ったドメイン](/ja/blog/2026/10/bought-a-domain-on-a-whim/)、[予測しにくい費用を避けたい理由](/ja/blog/2026/10/why-unpredictable-costs-bother-me/)。

