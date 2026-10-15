---
title: "`2534022` 오류를 이틀 동안 추적한 이야기"
title_en: "Two Days Chasing the `2534022` Error"
title_ja: "`2534022`エラーを2日間追いかけた話"
date: "2026-10-15"
description: "Instagram DM 브리징 플러그인을 만들며 만난 오류와 웹훅 설정 뒤에 동작을 확인한 과정을 기록합니다."
description_en: "A record of an error I encountered while building an Instagram DM bridge, and what happened after configuring a webhook."
description_ja: "Instagram DMブリッジの開発中に遭遇したエラーと、Webhook設定後に動作を確認できた経緯を記録します。"
---

<!-- lang:ko -->
## `2534022` 오류를 이틀 동안 추적한 이야기

새로운 브리징 플러그인을 만들고 있습니다. 인스타그램 DM을 다른 서비스에서 읽고, 그 서비스에서 답장도 보낼 수 있도록 연결하는 도구입니다. Meta for Developers에서 앱을 만들고 API를 붙이는 과정에서 다음 오류를 만났습니다.

```text
403 / IGApiException / 10 / 2534022
```

오류 메시지는 메시지 응답 가능 시간이 지났거나 허용된 범위를 벗어났다는 뜻으로 보였습니다. 저는 처음에 그 문구 그대로 시간을 의심했습니다. 서버의 OS 시간이 맞지 않는 건 아닐까, HTTPS 요청의 시간 정보가 어긋난 건 아닐까 생각했습니다. 오류를 직역하면 시간 문제처럼 느껴졌기 때문입니다.

하지만 시간 설정은 원인이 아니었습니다.

## 의심할 수 있는 원인은 많았다

문제를 해결하는 데 대략 이틀을 썼습니다. 공식 문서와 지원 센터를 살펴봤지만, 제 상황에 맞는 답을 찾기는 어려웠습니다. 비슷한 오류를 해결했다는 글도 몇 개 발견했지만, 상당수는 비공개 댓글이거나 “백엔드 문제를 수정했다”는 짧은 설명뿐이었습니다.

버그 트래킹 코드를 이용해 Meta에 제보하고 분석을 요청하려고도 했습니다. 하지만 이 문제에 대한 지원 상담이나 논의는 제공하지 않는다는 안내를 받았습니다. 문제를 좁힐 만한 정보가 부족한 상태에서 지원까지 막히니 답답했습니다. 프로젝트를 접어야 하는 건 아닌지, 앱 설정이나 권한이 잘못된 건 아닌지 하나씩 의심했습니다.

앱 모드도 확인했습니다. 앱은 라이브 상태였습니다. 권한 설정도 살펴봤지만 이상을 찾지 못했습니다. 마지막까지 가장 의심했던 건 앱 검수와 액세스 수준이었습니다.

Meta 앱을 실제 서비스에서 사용하려면 앱 검수가 필요할 수 있습니다. 그런데 검수와 비즈니스 인증 과정에서 요구하는 서류를 모두 준비하지 못해 신청을 마치지 못한 상태였습니다. 그래서 API 키의 권한이 부족한 것은 아닐까 고민했습니다. 서류를 발급받을 수 있는 방법까지 찾아봤지만, 제가 준비할 수 없는 자료가 있어 우선 그 가능성은 뒤로 미뤘습니다.

비즈니스 인증과 앱 검수에 필요한 조건은 계정과 사용 사례에 따라 달라질 수 있습니다. 제가 겪은 절차를 일반적인 안내처럼 설명하기는 어려워, 이 글에서는 그 과정을 자세히 다루지 않겠습니다. 관련 조건은 Meta의 최신 공식 안내를 확인하는 편이 좋습니다.

## 빠뜨린 것은 웹훅이었다

전환점은 웹훅을 설정한 뒤 찾아왔습니다.

웹훅 수신기를 만들어 공유 서버에 띄우고 테스트했더니 API가 실제로 동작하기 시작했습니다.

메시지를 보내고 읽는 데 웹훅이 반드시 필요하다고 생각하지 않았습니다. 제가 만들려던 기능은 다른 서비스에서 DM을 가져오고, 그 메시지에 답장하는 흐름이었습니다. 메시지 API는 이미 단순한 GET이나 POST 요청으로 사용할 수 있었기 때문입니다. 그래서 웹훅 설정을 문제 해결의 일부로 떠올리지 못했습니다.

다만 웹훅을 추가한 것이 왜 `2534022` 오류를 해결했는지는 아직 확실히 설명할 수 없습니다. 제가 확인한 공식 문서와 API 자료에서는 이 오류와 웹훅 사이의 직접적인 인과 관계를 찾지 못했습니다. 따라서 “웹훅이 이 오류의 원인이고, 설정하면 해결된다”고 단정할 수는 없습니다. 제가 확인한 사실은 웹훅 수신기를 설정하고 나서 테스트가 성공했다는 것입니다.

## 오류 메시지에만 매달리지 않기

이번 일을 통해 얻은 교훈은 오류 메시지를 무시하라는 뜻이 아닙니다. 메시지가 가리키는 원인만 유일한 가능성이라고 단정하지 말자는 것입니다.

저는 시간 설정에서 시작해 앱 권한, 앱 모드, 검수 상태, 액세스 수준을 차례로 의심했습니다. 하지만 실제로 해결의 실마리가 된 것은 웹훅이었습니다. API 요청 자체만 살펴보느라 메시지 수신 경로와 이벤트 전달 설정을 놓치고 있었던 셈입니다.

비슷한 오류를 만난 분에게 확실한 해결책을 제시할 수는 없습니다. 제 경우에는 웹훅을 구성한 뒤 동작했지만, 그 이유와 다른 환경에서도 같은 해결이 통할지는 검증하지 못했습니다. 그래도 오류 문구에만 매달려 있다면, API 호출 외에 메시지 이벤트를 받는 경로와 웹훅 설정도 점검해 볼 만합니다.

이틀 동안 원인을 찾으며 꽤 지쳤지만, 이제는 다음 작업을 이어갈 수 있게 됐습니다. 이 브리징 플러그인을 만들며 겪는 시행착오도 하나씩 기록해 보려고 합니다.

<!-- lang:en -->
## Two Days Chasing the `2534022` Error

I am building a new bridging plugin: a tool that connects Instagram DMs to another service, so messages can be read there and replied to from there. While creating an app in Meta for Developers and connecting the API, I ran into this error:

```text
403 / IGApiException / 10 / 2534022
```

The error message seemed to say that the allowed window for replying to a message had passed, or that the request was outside that window. I took the wording at face value and started looking for a time-related problem. Could the server's OS clock be wrong? Could the time information in the HTTPS request be out of sync? Read literally, the message sounded like a timing issue.

But the clock was not the cause.

## There were many possible causes

I spent roughly two days trying to solve it. I read the official documentation and searched the support center, but could not find an answer that fit my situation. I found a few reports from people who had seen similar errors, but many were private comments or brief notes saying only that they had fixed a backend issue.

I also tried to report the issue to Meta using the bug tracking code and request an investigation. I was told that support consultation or discussion was not available for this issue. With little information to narrow things down and no useful support channel, I felt stuck. Should I abandon the project? Was something wrong with my app settings or permissions? I considered one possibility after another.

I checked the app mode too. The app was live. I reviewed its permissions and did not find anything obviously wrong. The possibilities I suspected most were app review and access levels.

Using a Meta app in a real service may require app review. I had not completed the process because I could not gather all the documents requested for review and business verification. That made me wonder whether my API key lacked the necessary access. I looked into how to obtain the documents, but some were not available to me, so I set that possibility aside for the moment.

The requirements for business verification and app review can vary by account and use case. I cannot confidently present my experience as general guidance, so I will not go into that process here. It is best to check Meta's latest official information for the requirements that apply to your situation.

## The missing piece was a webhook

The turning point came after I configured a webhook.

I set up a webhook receiver on a shared server and tested it. After that, the API began working.

I had not thought a webhook was necessary to send and read messages. The feature I was building would retrieve DMs in another service and let me reply to them there. The messaging API seemed usable with straightforward GET and POST requests, so I did not think to include webhook configuration in my troubleshooting.

I still cannot explain with confidence why adding a webhook resolved the `2534022` error. I could not find official documentation or API material establishing a direct causal link between this error and webhooks. So I cannot claim that a webhook is the cause of the error or that setting one up will always fix it. What I can say is that my test succeeded after I configured the webhook receiver.

## Look beyond the error message

The lesson I took from this is not to ignore error messages. It is to avoid treating the cause suggested by a message as the only possibility.

I started with the clock, then checked app permissions, app mode, review status, and access levels. The clue that finally helped was the webhook. By focusing on the API request itself, I had overlooked the message delivery path and event configuration.

I cannot offer a guaranteed fix to anyone who encounters a similar error. In my case, things worked after I configured a webhook, but I have not verified why or whether the same approach works in other setups. Still, if the error text leads nowhere, it may be worth checking how message events are delivered and reviewing the webhook configuration alongside the API calls.

The search left me pretty worn out, but now I can continue with the next part of the project. I hope to keep writing down the lessons and setbacks I encounter while building this bridging plugin.

<!-- lang:ja -->
## `2534022`エラーを2日間追いかけた話

新しいブリッジプラグインを作っています。InstagramのDMを別のサービスで読み、そのサービスから返信できるようにつなぐツールです。Meta for Developersでアプリを作成し、APIを接続しているときに、次のエラーに遭遇しました。

```text
403 / IGApiException / 10 / 2534022
```

エラーメッセージは、メッセージに返信できる期間が過ぎた、または許可された期間を外れているという意味に見えました。私は最初、その文面どおりに時間の問題を疑いました。サーバーのOS時刻がずれているのか、HTTPSリクエストの時刻情報が一致していないのか、と考えました。文字どおりに読むと、時間に関するエラーに思えたからです。

しかし、時刻設定は原因ではありませんでした。

## 考えられる原因はいくつもあった

解決までに、およそ2日かかりました。公式ドキュメントやサポートセンターを調べましたが、自分の状況に当てはまる答えは見つかりませんでした。同じようなエラーを解決したという投稿もいくつか見つけましたが、多くは非公開コメントだったり、「バックエンドの問題を直した」とだけ書かれていたりしました。

バグトラッキングコードを使ってMetaに報告し、調査を依頼しようともしました。しかし、この問題についてサポートへの相談や議論は受け付けていないという案内がありました。原因を絞り込む情報が少ないうえ、頼れるサポート窓口もなく、行き詰まった気持ちになりました。プロジェクトをやめるべきなのか、アプリの設定や権限に問題があるのか、ひとつずつ考えました。

アプリモードも確認しました。アプリはライブ状態でした。権限も調べましたが、明らかな問題は見つかりませんでした。最後まで特に疑っていたのは、アプリレビューとアクセスレベルでした。

Metaアプリを実際のサービスで使うには、アプリレビューが必要になる場合があります。私はレビューやビジネス認証で求められる書類をすべて用意できず、手続きを完了できていませんでした。そのため、APIキーに必要なアクセス権がないのではないかと考えました。書類を取得する方法も調べましたが、用意できないものがあったため、ひとまずその可能性は脇に置きました。

ビジネス認証やアプリレビューの要件は、アカウントや利用目的によって異なることがあります。自分の経験を一般的な案内として説明するのは難しいため、ここでは手続きの詳細には触れません。該当する要件については、Metaの最新の公式情報を確認してください。

## 見落としていたのはWebhookだった

転機はWebhookを設定したあとに訪れました。

共有サーバーにWebhookの受信側を用意してテストしたところ、その後APIが実際に動き始めました。

メッセージの送受信にWebhookが必須だとは考えていませんでした。作ろうとしていたのは、別のサービスでDMを取得し、そこで返信できる仕組みです。メッセージAPIはシンプルなGETやPOSTリクエストで使えるように見えたため、Webhookの設定をトラブルシューティングの一部として考えていませんでした。

ただ、Webhookを追加したことでなぜ`2534022`エラーが解消したのかは、まだはっきり説明できません。確認した公式ドキュメントやAPI資料では、このエラーとWebhookの直接的な因果関係を見つけられませんでした。そのため、「Webhookがエラーの原因で、設定すれば解決する」と断言はできません。確認できたのは、Webhook受信側を設定したあとにテストが成功したことです。

## エラーメッセージだけにとらわれない

今回の経験から得た教訓は、エラーメッセージを無視することではありません。メッセージが示す原因だけが唯一の可能性だと決めつけないことです。

時刻設定から調べ始め、アプリの権限、モード、レビュー状況、アクセスレベルを順番に確認しました。最終的な手がかりになったのはWebhookでした。APIリクエストそのものに注目するあまり、メッセージの受信経路やイベントの設定を見落としていたのだと思います。

同じようなエラーに遭遇した方に、確実な解決策を提示することはできません。私の場合はWebhookを設定したあとに動きましたが、その理由や、ほかの環境でも同じ方法が有効かどうかは検証できていません。それでも、エラー文面だけでは手がかりが得られないときは、API呼び出しに加えて、メッセージイベントの受信方法やWebhookの設定も確認してみる価値がありそうです。

原因を探す間はかなり疲れましたが、これで次の作業に進めそうです。このブリッジプラグインを作る中で経験した試行錯誤も、少しずつ記録していきたいと思います。
