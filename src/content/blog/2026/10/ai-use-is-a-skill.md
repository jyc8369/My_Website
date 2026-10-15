---
title: "AI를 적극적으로 쓰되, 사용법도 배워야 한다"
title_en: "Use AI Actively, and Learn How to Use It Well"
title_ja: "AIを積極的に使い、使い方も学ぶ"
published_at: "2026-10-15T04:13:19Z"
description: "AI 코딩의 속도와 위험을 함께 바라보며, 프롬프트와 검토를 익히는 일이 왜 중요한지 이야기합니다."
description_en: "I consider both the speed and risks of AI-assisted coding, and why learning to prompt and review matters."
description_ja: "AIによるコーディングの速さとリスクの両方を考えながら、指示の出し方とレビューを学ぶ大切さについて書きます。"
---

<!-- lang:ko -->
## AI를 적극적으로 쓰되, 사용법도 배워야 한다

저는 AI를 적극적으로 사용하자는 쪽입니다. 그렇다고 AI가 만드는 문제를 모르는 것은 아닙니다. 유지보수가 어려운 코드, 보안 취약점, 놓친 예외, 검토 없이 쌓이는 코드가 생길 수 있다는 점을 알고 있습니다. AI를 자주 쓰는 사람으로서 이런 문제를 계속 마주치고, 배우고, 이야기하고 있습니다.

그래도 코드를 만드는 속도만큼은 AI가 사람보다 빠르다고 생각합니다. 물론 속도가 곧 품질을 뜻하지는 않습니다. AI는 잘못된 코드를 만들 수 있고, 보안 문제를 놓칠 수도 있습니다. 중요한 것은 그런 가능성을 인정하면서도 AI가 가진 속도의 이점을 어떻게 살릴지 고민하는 일이라고 봅니다.

## 결과는 모델만으로 정해지지 않는다

AI가 더 많은 연산 자원과 충분한 검토 단계를 거친다면 지금보다 안정적인 코드를 만들 수 있다고 저는 생각합니다. 여러 모델이 결과를 검토하거나, 테스트와 자동 검토를 연결하거나, 오케스트레이터가 작업을 나눠 맡기는 방법도 있습니다. 다만 비용과 자원이 제한된 현실에서는 모든 작업에 가장 비싼 모델과 긴 검토 과정을 적용하기 어렵습니다.

저는 이 한계를 단순히 AI가 코드를 못 쓰기 때문이라고 보지는 않습니다. 사용자가 감당할 수 있는 비용 안에서 어느 정도의 품질을 얻을지가 함께 걸린 문제라고 생각합니다. 추론에 더 많은 자원을 쓰고 입력과 출력 토큰을 늘리면 결과가 나아질 수 있겠지만, 그만큼의 비용을 누가 부담할지도 생각해야 합니다. 일반 사용자와 개발자가 매번 큰 비용을 지불하기는 어렵습니다.

제가 사용해 본 GPT-6 Astra 같은 고성능 추론 모델도 비용이 만만치 않았습니다. 더 많은 자원과 검토 단계를 제공하면 결과가 얼마나 좋아질지 궁금하지만, 실제로 계속 사용할 수 있는지는 별개의 문제였습니다.

## 프롬프트와 작업 방식이 결과를 바꾼다

저비용 모델은 부족한 점이 있습니다. 복잡한 맥락을 놓치거나, 요청을 잘못 이해하거나, 엉뚱한 코드를 만들 수 있습니다. 그렇다고 해서 생성 속도라는 장점을 포기하고 싶지는 않습니다. 저는 프롬프트를 구체적이고 모호하지 않게 작성하면 저비용 모델에서도 좋은 결과를 얻을 수 있다고 경험해 왔습니다. 물론 모든 일을 어떤 저비용 모델이든 잘할 수 있다는 뜻은 아닙니다. 작업의 난이도와 프롬프트, 검토 과정에 따라 결과는 크게 달라집니다.

“포트폴리오 사이트를 만들어 줘”처럼 짧게 요청하는 것과, 디자인 방향·기술 스택·필수 기능·허용 사항·금지 사항을 구체적으로 알려주는 것은 결과가 다를 수밖에 없습니다. 작업이 끝난 뒤 무엇을 확인할지, 어떤 자동화 과정을 둘지도 함께 전달하면 모델이 따라야 할 기준이 더 분명해집니다.

저도 이런 식으로 AI에게 요구사항과 제약을 자세히 전달하려고 합니다. 프롬프트를 잘 쓰는 것만으로 모든 오류가 사라지지는 않지만, 모델이 엉뚱한 방향으로 가는 일을 줄이는 데 도움이 됩니다. AI 결과물은 누가 어떤 방식으로 사용하느냐에 따라 달라질 수 있으니, 겉으로 보이는 모델 성능만으로 판단하지 않았으면 합니다.

## 제 웹사이트도 AI와 함께 만들었다

저는 백엔드 작업은 직접 할 수 있지만, 프론트엔드 디자인과 레이아웃은 여러 번 시도하면서 제 강점이 아니라는 걸 알게 됐습니다. 그래서 현재 웹사이트의 프론트엔드와 UI·UX 작업에는 AI를 많이 사용했습니다.

사이트를 한 번에 만든 것은 아닙니다. 여러 차례 수정했고, 아직 부족한 부분도 있을 수 있습니다. 저는 디자이너가 아니기 때문에 모든 선택이 누구에게나 마음에 들 거라고 생각하지 않습니다. 그래도 제가 원했던 방향과 모습에 가까워졌고, 지금 결과물에 만족하고 있습니다.

특히 이 사이트는 제가 생각하는 저비용 모델인 GPT-6 Luna의 중간 추론 설정을 주로 사용해 만들었습니다. 이전에는 AI 사용료로 한 달에 30만 원을 넘게 쓰기도 했고, 60만 원까지 지출한 적도 있습니다. 비용이 너무 커져서 사용량을 늘리는 대신 프롬프트와 작업 방식을 개선해 보기로 했습니다.

프롬프트 엔지니어링을 완벽하게 익혔다고 말할 수는 없습니다. 그래도 공부를 거치며 초보 단계를 조금씩 벗어나고 있다고 느낍니다. 그 과정에서 비교적 저렴한 모델을 사용해도 제가 원하는 결과물을 만들 수 있다는 걸 확인했습니다.

## AI를 쓴다는 사실만으로 평가하지 않았으면 한다

미래의 AI 모델이 어떤 모습으로 발전할지는 저도 모릅니다. 더 나은 모델과 도구를 연구하는 분들이 많은 문제를 해결해 나가겠지만, 비용과 검증, 유지보수 같은 고민도 계속 남아 있을 겁니다.

제가 하고 싶은 말은 단순합니다. AI를 사용한다고 해서 무조건 나쁜 것은 아닙니다. AI가 만든 결과물을 무조건 믿자는 뜻도 아닙니다. AI를 잘 활용하려면 문제를 이해하고, 요청을 구체적으로 작성하고, 결과를 검토하는 방법도 함께 배워야 합니다.

**한 줄 요약: AI를 쓴다는 이유만으로 나쁘다고 단정하지 말고, 어떻게 쓰고 검토하는지도 함께 봐 주세요.**

<!-- lang:en -->
## Use AI Actively, and Learn How to Use It Well

I am in favor of using AI actively. That does not mean I am unaware of the problems it can create. AI can produce code that is hard to maintain, introduce security vulnerabilities, miss edge cases, or add code without enough review. As someone who uses AI a lot, I keep running into these issues, learning about them, and talking about them.

Even so, I believe AI is faster than people at producing code. Speed, of course, does not equal quality. AI can generate incorrect code and miss security problems. The important thing is to acknowledge those risks while figuring out how to make use of AI's speed.

## The model alone does not determine the result

I believe AI can produce more reliable code if it has more compute and enough review steps. Multiple models can review a result; tests can be connected to automated review; or an orchestrator can split up the work. But in a world with limited budgets and resources, it is difficult to use the most expensive model and a lengthy review process for every task.

I do not see this limitation as simply AI being unable to code. The question is also how much quality people can get for a price they can afford. More reasoning resources and more input and output tokens may improve a result, but we also have to ask who will pay for them. Most users and developers cannot afford a large bill every time.

Even a powerful reasoning model like GPT-6 Astra, which I have tried, was expensive. I am curious how much better a result could get with more resources and review, but being able to keep using it in practice is a separate question.

## Prompts and workflow change the result

Lower-cost models have limitations. They may miss complex context, misunderstand a request, or produce irrelevant code. Still, I do not want to give up the advantage of fast generation. In my experience, a specific and unambiguous prompt can help a lower-cost model produce good results too. That does not mean every lower-cost model can handle every task well. Results vary greatly with the task, prompt, and review process.

A short request like “Build me a portfolio site” is bound to produce a different result from a detailed request that explains the design direction, technology stack, required features, what is allowed, and what is off limits. If you also explain what to check after the work is done and what automation to use, the model has clearer standards to follow.

I try to give AI detailed requirements and constraints in this way. A good prompt will not eliminate every error, but it can help keep the model from going in the wrong direction. AI output can vary depending on who uses it and how, so I hope people will not judge it only by a model's apparent capability.

## I built my website with AI too

I can handle backend work myself, but after several attempts I realized that frontend design and layout are not my strengths. So I have used AI extensively for the frontend and UI/UX work on my current website.

The site did not come together in one shot. I revised it many times, and there may still be rough edges. I am not a designer, and I do not expect every choice to work for everyone. Still, the result is close to what I had in mind, and I am happy with it.

I built this site mainly with GPT-6 Luna, a lower-cost model in my view, using its medium reasoning setting. In the past, I sometimes spent more than $200 a month on AI and once spent as much as about $400. The costs had become too high, so instead of increasing my usage allowance, I decided to improve my prompts and workflow.

I cannot say that I have mastered prompt engineering. But after studying it, I feel I am gradually moving beyond the beginner stage. Along the way, I found that I could get the results I wanted with a comparatively inexpensive model.

## I hope people will not judge AI use on its own

I do not know what future AI models will look like. Researchers working on better models and tools will solve many problems, but questions around cost, verification, and maintenance will remain too.

My point is simple: using AI is not automatically bad. That does not mean we should blindly trust what it produces. To use AI well, we also need to understand the problem, write specific requests, and learn how to review the results.

**In one line: Please do not assume using AI is bad; look at how it is used and reviewed.**

<!-- lang:ja -->
## AIを積極的に使い、使い方も学ぶ

私はAIを積極的に使おうという立場です。だからといって、AIが引き起こす問題を知らないわけではありません。保守しにくいコードやセキュリティ上の脆弱性、見落とされた例外、十分なレビューなしに増えていくコードが生まれることは理解しています。AIをよく使う一人として、そうした問題に何度も直面し、学び、話題にしています。

それでも、コードを作る速さではAIが人間より速いと思います。もちろん、速さがそのまま品質を意味するわけではありません。AIは誤ったコードを生成することも、セキュリティ上の問題を見落とすこともあります。大切なのは、そのリスクを認識しながら、AIの速さをどう活かすかを考えることです。

## 結果はモデルだけで決まらない

より多くの計算資源と十分なレビュー工程があれば、AIは今より信頼できるコードを作れると私は考えています。複数のモデルで結果を確認したり、テストと自動レビューをつないだり、オーケストレーターに作業を分担させたりする方法があります。ただし、予算と資源が限られる現実では、すべてのタスクに最も高価なモデルと長いレビュー工程を使うのは難しいです。

私はこの制約を、単にAIがコードを書けないからだとは考えていません。利用者が負担できる費用の範囲で、どれだけの品質を得られるかという問題でもあります。推論に使う資源や入出力トークンを増やせば結果が良くなる可能性はありますが、その費用を誰が負担するのかも考えなければなりません。一般の利用者や開発者が毎回大きな金額を支払うのは難しいでしょう。

私が試したGPT-6 Astraのような高性能な推論モデルも、費用はかなり高く感じました。より多くの資源やレビュー工程を使えばどれだけ結果が良くなるのか興味はありますが、実際に使い続けられるかどうかは別の問題です。

## プロンプトと作業方法で結果は変わる

低価格のモデルには限界があります。複雑な文脈を見落としたり、依頼を誤解したり、的外れなコードを生成したりすることがあります。それでも、生成速度という利点を手放したくはありません。私の経験では、具体的で曖昧さのないプロンプトを書けば、低価格のモデルでも良い結果を得られることがあります。もちろん、どんな低価格モデルでもあらゆるタスクをうまくこなせるという意味ではありません。タスクの難しさやプロンプト、レビューの工程によって結果は大きく変わります。

「ポートフォリオサイトを作って」という短い依頼と、デザインの方向性、技術スタック、必要な機能、許可すること、禁止することを具体的に伝える依頼では、結果が違って当然です。作業後に何を確認するか、どのような自動化を使うかまで伝えれば、モデルが従う基準もより明確になります。

私もこのように、AIに要件や制約を詳しく伝えるようにしています。良いプロンプトだけですべてのエラーがなくなるわけではありませんが、モデルが間違った方向へ進むのを減らす助けになります。AIの出力は、誰がどのように使うかによって変わることがあります。表面的なモデルの性能だけで判断しないでほしいと思います。

## 私のウェブサイトもAIと一緒に作った

バックエンドの作業は自分でもできますが、何度か試した結果、フロントエンドのデザインやレイアウトは自分の得意分野ではないと分かりました。そこで、現在のウェブサイトのフロントエンドやUI・UXにはAIを多く使っています。

サイトは一度で完成したわけではありません。何度も修正しましたし、まだ不十分なところもあるでしょう。私はデザイナーではないので、すべての選択が誰にとっても気に入るとは思っていません。それでも、自分が思い描いていた方向や見た目に近づき、今の仕上がりには満足しています。

このサイトは主に、私が低価格モデルだと考えているGPT-6 Lunaの中程度の推論設定を使って作りました。以前はAIに月約3万円を使うこともあり、一度は約6万円まで支出したことがあります。費用が大きくなりすぎたため、利用枠を増やすのではなく、プロンプトと作業方法を改善してみることにしました。

プロンプトエンジニアリングを完全に身につけたとは言えません。それでも学ぶうちに、少しずつ初心者の段階を抜けつつあると感じます。その過程で、比較的低価格のモデルでも自分の望む結果を作れることが分かりました。

## AIを使うという事実だけで評価しないでほしい

これからAIモデルがどう発展するのか、私には分かりません。より良いモデルやツールを研究する人たちが多くの問題を解決していくと思いますが、費用や検証、保守についての課題も残るでしょう。

私が伝えたいことはシンプルです。AIを使うことが、必ずしも悪いわけではありません。AIが作ったものを無条件に信じようという意味でもありません。AIをうまく活用するには、問題を理解し、依頼を具体的に書き、結果をレビューする方法も学ぶ必要があります。

**一言でまとめると、AIを使うという理由だけで悪いと決めつけず、どう使い、どう確認しているかも見てほしいです。**
