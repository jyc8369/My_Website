---
title: "캐나다의 서버와 따뜻한 방"
title_en: "Servers and a Warm Room in Canada"
title_ja: "カナダのサーバーと暖かい部屋"
published_at: "2026-10-15T04:42:01Z"
description: "한국과 캐나다에 둔 서버, 외부 공개와 네트워크 분리, 그리고 난방까지 돕는 캐나다 서버 이야기를 적었습니다."
description_en: "A look at my servers in Korea and Canada, how I expose services and isolate networks, and how the Canadian servers also help heat my room."
description_ja: "韓国とカナダに置いたサーバー、サービス公開とネットワーク分離、そして部屋を暖めるカナダのサーバーについて書きました。"
---

<!-- lang:ko -->
## 캐나다의 서버와 따뜻한 방

인프라는 제가 가장 좋아하는 분야 중 하나입니다. 저는 한국에서 태어나 한국에 집이 있고, 유학을 와서 지금은 캐나다에서 지내고 있습니다. 자세한 지역이나 생활 정보는 공개하지 않으려 하지만, 서버 노드는 한국과 캐나다에 하나씩 두고 있습니다.

현재 제가 주로 사용하는 곳은 캐나다 노드입니다. 한국에 있는 노드는 문제가 생겨 원격으로 접속할 수 없는 상태입니다. 아직 원인을 확인하지 못해 일단 두고 있고, 나중에 복구할 방법을 마련해 다시 살펴볼 생각입니다. 데이터 저장용으로 쓰던 노드라서, 지금은 디스크에 문제가 생겼는지보다 운영체제나 부팅 쪽 문제인지부터 확인해야 합니다. 아직 데이터가 손상됐다고 확인된 것은 아닙니다.

## 중고 엔터프라이즈 서버로 꾸린 노드

캐나다 노드는 일반 데스크톱이 아니라 중고 엔터프라이즈 서버들로 구성했습니다. 데이터센터에서 사용되다가 세대가 바뀌며 중고 시장에 나온 장비를 저렴하게 구할 기회가 있었습니다. 저는 컴퓨터를 좋아하지만 쓸 수 있는 자원과 예산은 제한적이라, 가능한 범위 안에서 직접 구성해 보고 있습니다.

이 장비들은 제가 잠을 자고 많은 시간을 보내는 공간에 있습니다. 데이터센터 서버는 소음보다 안정성과 연산 성능에 초점을 맞춘 제품이라 상당히 시끄럽습니다. 한 대는 드라이어가 계속 켜져 있는 것처럼 느껴질 정도입니다. 그래도 생각보다 잘 자고 생활하고 있습니다. 다른 한 대는 상대적으로 조용한 편입니다.

서버를 용도별로 나눠 사용합니다. 외부에 공개할 서비스를 운영하는 서버가 두 대 있고, 개인 용도로 쓰는 장비도 두 대 있습니다. 개인용 장비는 외부에 공개하지 않을 생각입니다. 네트워크도 분리하고 VLAN을 따로 구성해 두었습니다.

## 포트 포워딩 없이 서비스를 공개하기

제 서버 운영 원칙 중 하나는 라우터에서 내부 서버로 포트 포워딩을 하지 않는 것입니다. 서버의 공인 IP가 외부에 직접 드러나면 공격 표면이 넓어질 수 있기 때문입니다. 특히 DDoS 공격을 걱정합니다.

그래서 외부 공개 서비스는 VPS를 앞단에 두고 운영합니다. VPS와 내부 서버 사이에는 암호화된 터널을 만들고, VPS의 리버스 프록시를 통해 안쪽 서비스로 트래픽을 전달합니다. 이렇게 하면 내부 서버의 IP를 직접 공개하지 않고도 서비스를 제공할 수 있습니다. 위험이 완전히 사라지는 것은 아니지만, 제 서버를 직접 외부에 노출하는 방식은 피하고 있습니다.

메일 서버와 자체 호스팅 웹 서버 이야기는 이전에도 조금씩 다뤘습니다. 웹 서버를 어떤 방식으로 구성했는지는 다음에 따로 풀어보겠습니다.

## 서버 CPU와 메모리

자세한 사양을 모두 공개하기는 아직 이릅니다. 업그레이드 계획이 남아 있고, 메모리도 추가로 구하고 있기 때문입니다. 여기서는 서버 두 대를 편의상 1번과 2번이라고 부르겠습니다.

1번에는 Intel Xeon E5-2698 v4가 들어 있습니다. 메모리는 현재 구성과 업그레이드 계획이 정리되지 않아 자세히 공개하지 않겠습니다.

2번에는 Intel Xeon Scalable Platinum 8160 두 개가 들어 있습니다. 더 많은 코어를 가진 상위 모델도 있지만, 중고 시장에서 구하기 어렵거나 가격이 높았습니다. 8160은 성능과 가격을 함께 고려했을 때 가장 현실적인 선택이라고 판단했습니다. 이 서버는 1U 크기의 2소켓 장비이고, 메모리는 현재 약 30GB입니다.

메모리를 더 늘리고 싶지만 서버용 규격을 확인해야 하고, 가능한 한 같은 제조사와 모델로 맞추고 싶습니다. 규격만 맞으면 혼용할 수 있다는 의견도 있지만, 저는 우선 호환성을 신경 써서 같은 종류로 구성하려고 합니다. 새 제품이나 해외 배송은 가격 부담이 커서, 지역 중고 시장에서 직거래 매물을 찾고 있습니다. 매일 아침 검색해 보지만 원하는 메모리는 쉽게 나오지 않네요.

## 연산에 집중하고 스토리지는 미루기

현재 캐나다 노드는 저장 공간보다 CPU 연산에 더 초점을 두고 있습니다. 사진이나 영상 백업 정도라면 개인용 장비의 저장 공간으로 당분간 버틸 수 있고, 별도의 스토리지 서버를 지금 운영해야 할 필요성을 크게 느끼지 못했습니다.

다만 이 계획은 바뀔 수도 있습니다. 저장 공간을 RAID로 구성하고 싶다는 생각이 들기 때문입니다. 특히 2번에는 RAID 컨트롤러가 있고 2.5인치 드라이브를 사용합니다. 1번에는 RAID 컨트롤러가 없지만 SATA 포트가 충분해, 운영체제 차원의 구성을 고려할 수 있습니다. 2번에 2.5인치 드라이브를 넣을지, 1번에 3.5인치 드라이브를 연결할지는 아직 고민 중입니다. RAID 구성도 어떤 방식으로 할지 결정하지 않았습니다.

한국 노드에 있는 스토리지 서버는 현재 접속할 수 없어 상태를 확인하지 못하고 있습니다. 운영체제나 부팅 장치에 문제가 생겼을 가능성도 있지만, 아직 진단하지 못했습니다. 나중에 원격 복구 방법을 찾거나 주변에 도움을 요청해 확인해 보려 합니다. 저장 디스크가 실제로 손상됐다는 증거는 아직 없습니다.

## 서버가 난방을 돕는다

캐나다의 겨울은 춥고, 따뜻한 계절을 빼면 난방이 필요한 기간이 깁니다. 제가 지내는 곳도 난방 없이 생활할 수 있는 시기가 1년에 대략 3~4개월 정도입니다.

컴퓨터가 전기를 쓰면 그 에너지 대부분은 결국 열로 방출됩니다. 현재 서버들이 시간당 약 700와트 정도를 사용하고 있어서, 단순하게 보면 방 안에 비슷한 규모의 열을 내는 난방기가 계속 돌아가는 것과 같습니다. 실제 난방 효과는 환경과 열이 빠져나가는 정도에 따라 다르지만, 체감상 꽤 따뜻합니다.

저는 기본 연산 작업을 돌리면서 이 열을 활용합니다. 자동화해 둔 작업은 서버 자원이 부족해지면 워크 스레드를 줄이고 서비스에 더 많은 자원을 배정합니다. 서버가 한가할 때는 기본 연산에 자원을 최대한 사용합니다. 예전에 웹 서버를 운영할 때는 접속해 보면 작업 스레드가 줄어든 것을 확인하기도 했습니다. 지금은 상시 운영 중인 서비스가 거의 없어 대부분의 자원을 연산에 쓰고 있습니다.

전기 요금은 솔직히 부담됩니다. 그래도 난방 비용의 일부라고 생각하면 조금 다르게 느껴집니다. 따뜻한 방에서 지낼 수 있고, 서버도 활용하고 있으니까요.

## 앞으로 해보고 싶은 것

먼저 메모리를 더 구하고 싶습니다. 예산은 마련해 두었지만, 원하는 사양의 지역 매물이 언제 나올지는 알 수 없습니다. 저장 장치와 RAID 구성도 검토하고 있습니다. 서버마다 드라이브 크기와 컨트롤러가 달라 어느 쪽에 어떤 디스크를 넣을지 결정해야 합니다.

인터넷 회선 이중화도 계획 중입니다. 현재는 광케이블 회선을 사용하고 있지만, 한 달에 한 번 정도 장애를 겪을 때가 있고 운이 나쁘면 몇 주 동안 연결이 불안정할 때도 있습니다. 나중에는 Starlink 같은 위성 인터넷을 보조 회선으로 추가할지, 그에 맞는 라우터를 살지 고민해 보려고 합니다. 비용이 더 들겠지만 연결이 끊겼을 때 대안이 생기는 장점이 있습니다.

그리고 언젠가는 중고 1U 서버를 하나 더 들일지도 모르겠습니다. 이미 방은 충분히 시끄럽고 따뜻하지만, 제 인프라를 어떻게 키워 갈지는 계속 고민하고 있습니다. 다음에는 메모리나 스토리지 구성에 변화가 생기면 다시 기록해 보겠습니다.

<!-- lang:en -->
## Servers and a Warm Room in Canada

Infrastructure is one of my favorite topics. I was born in Korea and have a home there, and I am now studying abroad in Canada. I will keep the specific location and personal details private, but I have one server node in Korea and another in Canada.

The Canadian node is the one I mainly use right now. The node in Korea has a problem and I cannot reach it remotely. I have not identified the cause, so it is sitting idle for now. I hope to work out a recovery method and investigate it later. Since it was used for storage, I will first need to determine whether the issue is with the operating system or boot process rather than the disks. I have not confirmed any data loss.

## A node built from used enterprise servers

The Canadian node is made up of used enterprise servers rather than ordinary desktop PCs. I had the chance to buy some equipment cheaply after it had been retired from data center use as newer generations came along. I enjoy computers, but my resources and budget are limited, so I am building things myself within those limits.

The equipment is in the place where I sleep and spend much of my time. Data center servers are designed with reliability and computing performance in mind, not noise, so they can be very loud. One sounds almost like a hair dryer running continuously. I have learned to sleep and live with it better than I expected. The other is relatively quiet.

I divide the machines by purpose. Two servers run services that I make available externally, and two other machines are for personal use. I do not plan to expose the personal machines to the internet. Their networks are separated, with a dedicated VLAN as well.

## Exposing services without port forwarding

One of my operating principles is not to port-forward from my router to internal servers. If a server's public IP is directly exposed, its attack surface can increase. DDoS attacks are a particular concern for me.

Instead, I put a VPS in front of externally available services. I create an encrypted tunnel between the VPS and the internal servers, then route traffic to the services behind it through a reverse proxy on the VPS. This lets me offer services without directly publishing the internal servers' IP addresses. It does not remove every risk, but it avoids exposing my servers directly to the internet.

I have touched on my mail server and self-hosted website in earlier posts. I will explain how I set up the web server in more detail another time.

## Server CPUs and memory

I am not ready to publish every hardware detail yet. I still have upgrades planned, and I am looking for additional memory. For convenience, I will call the two servers Server 1 and Server 2.

Server 1 has an Intel Xeon E5-2698 v4. I will keep its memory details private for now because the current setup and upgrade plan are still unsettled.

Server 2 has two Intel Xeon Scalable Platinum 8160 processors. There are higher-end models with more cores, but they are hard to find on the used market or cost more. Considering both performance and price, the 8160 seemed like the most practical choice. This is a 1U, dual-socket server, and it currently has about 30 GB of memory.

I would like to add more memory, but I need to confirm the server specifications and would prefer to match the manufacturer and model where possible. Some people say mixing modules is fine as long as the specifications match, but I would rather prioritize compatibility and use the same type. New parts and international shipping are expensive, so I am looking for local listings where I can buy in person. I search every morning, but the memory I want does not show up often.

## Focusing on compute and postponing storage

The Canadian node currently focuses more on CPU compute than storage. For my photo and video backups, I can get by for now with storage on my personal machines. I have not felt a strong need to run a separate storage server yet.

That plan may change, though. I have been thinking about putting storage into a RAID configuration. Server 2 has a RAID controller and uses 2.5-inch drives. Server 1 has no RAID controller, but it has enough SATA ports that I could consider configuring storage at the operating system level. I have not decided whether to put 2.5-inch drives in Server 2 or connect 3.5-inch drives to Server 1. I have not settled on a RAID configuration either.

I currently cannot access the storage server in Korea, so I do not know its condition. There could be a problem with the operating system or boot device, but I have not diagnosed it yet. I will look for a remote recovery method or ask someone nearby to help me check it later. I have no evidence that the storage disks themselves are damaged.

## The servers help heat the room

Canadian winters are cold, and heating is needed for much of the year outside the warmer season. Where I live, there are roughly three or four months when I can get by without heating.

Most of the electricity a computer uses eventually becomes heat. My servers currently draw about 700 watts, so in simple terms they are like a heater of a similar capacity running in the room. The actual heating effect depends on the environment and how much heat escapes, but I can feel the difference.

I use that heat while running basic compute workloads. An automated task reduces the worker threads and gives more resources to services when the servers are under pressure. When the servers are idle, it uses as many resources as possible for the compute work. When I used to run a web server, I would sometimes log in and see that the number of worker threads had gone down. Right now, there are few services running continuously, so most of the resources are being used for compute.

The electricity bill is honestly a burden. But it feels a little different when I think of it as partly paying for heat. The room is warm, and I am making use of the servers at the same time.

## What I might do next

First, I want to find more memory. I have set aside the budget, but I do not know when the right local listing will appear. I am also considering storage devices and a RAID setup. The servers have different drive sizes and controllers, so I need to decide which disks should go in which machine.

I am also considering internet redundancy. I currently use a fiber connection, but outages happen from time to time—sometimes about once a month, and occasionally the connection can be unstable for weeks. Later, I may add satellite internet such as Starlink as a backup and get a router that can use both connections. It will cost more, but it would give me an alternative when the main connection goes down.

Maybe I will eventually bring home another used 1U server. The room is already loud and warm enough, but I keep thinking about how to grow my infrastructure. I will write again when I have an update on the memory or storage setup.

<!-- lang:ja -->
## カナダのサーバーと暖かい部屋

インフラは私が特に好きな分野のひとつです。私は韓国で生まれ、韓国に家がありますが、留学して今はカナダで暮らしています。詳しい場所や個人的な情報は公開しませんが、サーバーノードを韓国とカナダにひとつずつ置いています。

現在、主に使っているのはカナダのノードです。韓国にあるノードには問題が起きていて、リモートから接続できません。原因はまだ分からないため、ひとまずそのままにしています。後日、復旧方法を用意して調べるつもりです。ストレージ用のノードだったので、データディスクよりも先に、OSや起動まわりの問題かどうかを確認する必要があります。データが失われたと確認されたわけではありません。

## 中古のエンタープライズサーバーで構成したノード

カナダのノードは一般的なデスクトップPCではなく、中古のエンタープライズサーバーで構成しています。データセンターで使われたあと、新しい世代に置き換えられて中古市場に出た機材を安く入手できる機会がありました。私はコンピューターが好きですが、使える資源や予算には限りがあるので、その範囲で自分なりに構成しています。

機材は、私が寝たり多くの時間を過ごしたりする場所にあります。データセンター向けサーバーは騒音よりも安定性や計算性能を重視して設計されているため、かなりうるさいです。1台はドライヤーがずっと動いているように感じるほどです。それでも、思ったより普通に眠り、生活できています。もう1台は比較的静かです。

機材は用途ごとに分けています。外部に公開するサービスを動かすサーバーが2台あり、個人用の機材も2台あります。個人用の機材はインターネットに公開する予定はありません。ネットワークも分けて、専用のVLANを設定しています。

## ポートフォワーディングを使わずにサービスを公開する

サーバー運用で決めていることのひとつは、ルーターから内部サーバーへのポートフォワーディングをしないことです。サーバーのパブリックIPが直接見えると、攻撃対象となる範囲が広がる可能性があるからです。特にDDoS攻撃を心配しています。

そのため、外部向けのサービスの前段にはVPSを置いています。VPSと内部サーバーの間に暗号化トンネルを作り、VPS上のリバースプロキシを通して内部のサービスへトラフィックを流します。これなら内部サーバーのIPアドレスを直接公開せずにサービスを提供できます。リスクがすべてなくなるわけではありませんが、サーバーをそのままインターネットにさらす方法は避けています。

メールサーバーや自宅サーバーで運営するウェブサイトについては、以前の記事でも少し触れました。ウェブサーバーをどう構成したかは、また別の記事で詳しく書くつもりです。

## サーバーのCPUとメモリ

詳しい仕様をすべて公開するのはまだ早いと思っています。アップグレードの予定が残っていて、メモリも追加で探しているところです。ここでは便宜上、2台をサーバー1、サーバー2と呼びます。

サーバー1にはIntel Xeon E5-2698 v4が搭載されています。現在の構成とアップグレード計画がまだ定まっていないため、メモリの詳細は公開しません。

サーバー2にはIntel Xeon Scalable Platinum 8160が2基搭載されています。さらにコア数の多い上位モデルもありますが、中古市場で見つけにくかったり、価格が高かったりします。性能と価格の両方を考え、8160が最も現実的な選択だと判断しました。このサーバーは1Uサイズの2ソケット機で、メモリは現在約30GBです。

メモリは増やしたいものの、サーバーの仕様を確認する必要があります。できれば同じメーカー、同じモデルでそろえたいと思っています。規格が合えば混在しても問題ないという意見もありますが、私はまず互換性を重視して同じ種類で構成したいです。新品や海外発送は高いため、地元の中古市場で手渡しできる出品を探しています。毎朝検索していますが、希望するメモリはなかなか見つかりません。

## 計算処理を優先し、ストレージは後回し

現在、カナダのノードはストレージよりCPU計算に重点を置いています。写真や動画のバックアップなら個人用の機材にある容量で当面は足りそうで、専用のストレージサーバーを今すぐ運用する必要性をあまり感じていません。

ただ、この計画は変わるかもしれません。ストレージをRAID構成にしたいと考え始めたからです。特にサーバー2にはRAIDコントローラーがあり、2.5インチドライブを使います。サーバー1にはRAIDコントローラーがありませんが、SATAポートは十分にあるので、OS側での構成を検討できます。サーバー2に2.5インチドライブを入れるか、サーバー1に3.5インチドライブを接続するかはまだ決めていません。RAIDの方式も未定です。

韓国にあるストレージサーバーには現在アクセスできず、状態を確認できていません。OSや起動デバイスに問題が起きた可能性もありますが、まだ診断できていません。後日、リモートで復旧する方法を探すか、近くにいる人に手伝ってもらって確認するつもりです。ストレージディスク自体が壊れたという証拠はまだありません。

## サーバーが部屋を暖めてくれる

カナダの冬は寒く、暖かい季節を除くと長い期間、暖房が必要です。私の住む地域では、暖房なしで過ごせるのは年間でおよそ3〜4か月です。

コンピューターが使う電力の大部分は、最終的に熱になります。現在、サーバーは合計で約700ワットを使っているので、単純に考えると部屋の中で同じくらいの出力の暖房器具を動かしているようなものです。実際の暖房効果は環境や熱の逃げ方によって異なりますが、体感できるほど暖かくなります。

私は基本的な計算処理を動かしながら、その熱を活用しています。サーバーの負荷が高くなると、自動化した処理がワーカースレッドを減らし、サービスにより多くのリソースを割り当てます。サーバーがアイドル状態なら、計算処理にできるだけ多くのリソースを使います。以前ウェブサーバーを運用していたときは、ログインしてワーカースレッドが減っているのを確認することがありました。今は常時稼働しているサービスがほとんどないため、大半のリソースを計算処理に使っています。

電気代は正直かなり負担です。それでも、暖房費の一部だと考えると少し受け止め方が変わります。部屋を暖かく保ちながら、サーバーも活用できているからです。

## これからやってみたいこと

まずはメモリを追加したいです。予算は確保していますが、希望する仕様の地元の中古品がいつ出るかは分かりません。ストレージとRAID構成も検討中です。サーバーごとにドライブのサイズやコントローラーが異なるため、どちらにどのディスクを入れるか決める必要があります。

インターネット回線の冗長化も考えています。現在は光回線を使っていますが、ときどき障害があり、月に一度ほど起きることもあります。運が悪いと、数週間にわたって接続が不安定になることもあります。将来的にはStarlinkのような衛星インターネットを予備回線として追加し、両方を使えるルーターを購入するかもしれません。費用は増えますが、主回線が切れたときの代替手段になります。

いつか中古の1Uサーバーをもう1台増やすかもしれません。部屋はすでに十分うるさく、暖かいですが、自分のインフラをどう拡張していくかは考え続けています。メモリやストレージ構成に進展があれば、また記録します。
