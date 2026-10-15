---
title: "내가 AI를 쓰고 만드는 방식"
title_en: "How I Use and Build AI Tools"
title_ja: "私のAIツールの使い方と作り方"
published_at: "2026-10-15T05:19:23Z"
description: "ChatGPT와 로컬 모델, 개인용 에이전트와 MCP를 어떤 생각으로 사용하고 개발하는지 정리했습니다."
description_en: "How I think about using ChatGPT, local models, a personal agent, and MCP tools."
description_ja: "ChatGPTやローカルモデル、個人用エージェント、MCPをどのような考えで使い、開発しているかをまとめました。"
---

<!-- lang:ko -->
## 내가 AI를 쓰고 만드는 방식

제 일상에서 AI가 차지하는 비중은 꽤 큽니다. AI를 가장 좋아하고 많이 사용하는 사람 중 하나라고 해도 과언이 아닐 정도입니다. 어떤 서비스를 쓰고, 개인용 에이전트를 어떻게 만들고 있는지 정리해 보려고 합니다.

## ChatGPT와 로컬 AI

가장 자주 쓰는 서비스는 OpenAI의 ChatGPT입니다. 글을 쓰는 현재 ChatGPT Plus를 구독하고 있고, 제 청구 금액은 한 달에 약 27,000원입니다. 공식 가격표에서 본 금액과 실제 청구액이 조금 달라 정확한 이유는 모르겠습니다. 제 계정에는 원화로 청구됩니다.

로컬 AI도 사용합니다. Hugging Face에서 받은 커뮤니티 모델을 제 컴퓨터에서 실행하는 방식입니다. 로컬 모델은 사용량에 따라 API 요금이 붙지 않아, 눈에 보이는 직접 비용은 주로 전기 요금입니다. GPU와 다른 컴퓨터 부품의 수명에 미치는 영향도 있겠지만, 그 비용은 측정하기 어렵습니다. 제게는 사용량이 계속 늘어도 청구액이 함께 올라가지 않는다는 점이 큰 장점입니다.

## 개인용 AI 에이전트를 만드는 중

저는 지금 개인용 AI 에이전트 프로그램을 개발하고 있습니다. 아직 안정적이지 않아 실제 개발 작업에 바로 맡길 수준은 아닙니다. 주로 계속 수정하고 조정하는 중입니다.

기능 면에서는 한동안 주목받았던 OpenClaw와 비슷한 점이 있습니다. 처음에는 OpenClaw를 Rust로 포팅한 프로젝트인 ZeroClaw를 포크해 고쳐 보려고 했습니다. 하지만 제가 원하는 방향으로 최적화하기 어렵다고 판단해 포크한 버전은 접고, 처음부터 새로 만들고 있습니다. 막힐 때는 OpenClaw나 ZeroClaw의 소스 코드를 참고하기도 합니다.

제가 만들고 싶은 것은 오랫동안 혼자 작동하는 에이전트입니다. 다른 작업에 집중하는 동안에도 주어진 일을 이어갈 수 있도록, 도구 사용마다 승인을 기다리지 않는 구조를 실험하고 있습니다. 그래서 현재 제 개인용 MCP 도구에는 별도의 승인 절차를 넣지 않았습니다. 이 에이전트는 아직 개발 중이고, 안정성도 충분히 검증되지 않았습니다. 나중에 공개할 수 있는 상태가 되면 그때 더 자세히 이야기하고 싶습니다.

## ChatGPT와 Codex를 선호하는 이유

많은 분이 Anthropic의 Claude를 사용하시지만, 저는 현재 OpenAI의 ChatGPT와 Codex가 제 용도에 더 잘 맞는다고 느낍니다. 최근에는 GPT-6를 일반 채팅에서도 사용할 수 있게 되어 만족스럽게 쓰고 있습니다. Claude도 좋은 선택일 수 있지만, 이건 어디까지나 제가 직접 사용하며 느낀 개인적인 선호입니다.

Cursor는 아직 제게 꼭 필요한 도구라는 생각이 들지 않습니다. 제가 비교해 본 사용 방식에서는 모델 사용 비용이 API 단가에 따라 계산되는 것으로 이해했고, 구독형 서비스에서 같은 모델을 쓰는 것보다 비싸게 느껴졌습니다. 정확한 비용 차이를 수치로 검증한 것은 아닙니다. 실제 가격은 요금제와 사용량에 따라 달라질 수 있으니, 이 부분은 제 경험에 따른 판단으로 봐 주시면 좋겠습니다.

제가 ChatGPT와 Codex를 계속 쓰는 이유 중 하나는 사용량 한도가 초기화되는 혜택을 받은 경험입니다. 코덱스 작업에는 시간 단위와 주 단위 사용량 제한이 있고, 요금제에 따라 한도가 다르게 표시됩니다. 한도 전체가 어느 정도의 실제 작업량인지 정확히 알기는 어렵습니다. OpenAI가 특정 상황에서 사용량을 초기화해 준 적이 있었고, 저도 지금까지 대여섯 번 정도 그런 혜택을 받았습니다. 항상 제공되는 혜택이라고 생각하지는 않지만, 제게는 서비스 선택에 영향을 준 요소였습니다.

## 하네스와 MCP

저는 현재 별도의 하네스를 적극적으로 쓰고 있지는 않습니다. 제가 이해하는 하네스는 에이전트가 사용할 도구와 권한, 검증 절차를 정해 실행을 제어하는 구성입니다. 지금은 공개 서비스나 다루는 민감 정보가 많지 않고, 개인 데이터도 대부분 암호화된 저장소에 있습니다. 그래서 현재 작업에는 기본 설정만으로 충분하다고 보고 있습니다.

하지만 실제 공개 서비스를 운영하거나 민감한 데이터를 다루게 되면 생각이 달라질 겁니다. 그때는 정보가 외부로 나가거나 에이전트가 데이터를 잘못 변경하는 일을 막을 수 있도록 권한과 검토 체계를 더 갖춰야 한다고 생각합니다.

MCP는 주로 개발 작업에 사용합니다. 긴 작업을 맡겨 두고 다른 세션이나 일에 집중할 때, 도구가 매번 승인을 기다리면 흐름이 끊기는 경우가 있습니다. 그래서 제가 만드는 개인용 MCP에는 현재 승인 단계를 두지 않았습니다. Codex도 제 개인 환경에서는 제한을 낮춘 방식으로 사용하고 있습니다. 이런 선택은 제 환경과 목적에 맞춘 것이고, 모두에게 적합한 운영 방식이라고 말하려는 것은 아닙니다.

제가 만드는 에이전트도 장기적으로는 혼자 작업을 이어갈 수 있도록 설계하고 있습니다. 아직 완성되지 않았고 안전성과 안정성을 계속 점검해야 하는 단계입니다. 공개 서비스에 투입하거나 다른 사람에게 배포할 수 있는 상태는 아닙니다.

AI 도구와 에이전트는 제게 단순한 보조 기능을 넘어, 일하고 무언가를 만드는 방식의 일부가 됐습니다. 지금은 ChatGPT와 로컬 모델, Codex, 직접 개발 중인 에이전트를 각기 다른 용도로 사용하고 있습니다. 앞으로 에이전트가 더 안정되면 실제로 어떻게 쓰는지, 무엇이 잘되고 무엇이 어려운지도 따로 기록해 보겠습니다.

<!-- lang:en -->
## How I Use and Build AI Tools

AI plays a large part in my day-to-day life. It would not be an exaggeration to say I am among the people who like and use AI the most. I want to share which services I use and how I am building a personal agent.

## ChatGPT and local AI

The service I use most often is OpenAI's ChatGPT. At the time of writing, I subscribe to ChatGPT Plus, and I am charged about ₩27,000 per month (roughly $19). The amount on my bill is a little different from the price I saw on the official pricing page, and I do not know exactly why. My account is billed in Korean won.

I also use local AI. I run a community model from Hugging Face on my own computer. Since a local model does not charge an API fee based on usage, the direct cost I can see is mostly electricity. There may also be an effect on the lifespan of the GPU and other computer parts, but that is difficult to measure. A major benefit for me is that the bill does not rise every time I use the model more.

## Building a personal AI agent

I am currently developing a personal AI agent. It is not stable enough for me to rely on it for real development work yet; I am still revising and tuning it.

In terms of functionality, it has some similarities to OpenClaw, which attracted a lot of attention for a while. I initially tried to modify a fork of ZeroClaw, a Rust port of OpenClaw. But I decided it would be difficult to optimize the project in the direction I wanted, so I set that fork aside and started over. When I get stuck, I sometimes refer to the OpenClaw or ZeroClaw source code.

What I want to build is an agent that can keep working on its own for a long time. I am experimenting with a setup that does not pause for approval after every tool action, so it can continue a task while I focus on something else. For that reason, I have not added a separate approval step to my personal MCP tools. The agent is still in development, and its stability has not been thoroughly verified. If it reaches a state where I can share it, I would like to write more about it then.

## Why I prefer ChatGPT and Codex

Many people use Claude from Anthropic, but for my own needs, I currently find OpenAI's ChatGPT and Codex a better fit. GPT-6 recently became available in regular chat as well, and I have been enjoying using it. Claude may be a good choice too; this is simply my personal preference based on my experience.

Cursor does not feel essential to me at the moment. From the usage options I compared, I understood that model costs are calculated based on API rates, and it felt more expensive than using the same model through a subscription service. I have not verified the exact difference with a detailed cost comparison. Actual prices can vary by plan and usage, so please take this as my personal impression.

One reason I continue to use ChatGPT and Codex is that I have received usage-limit resets. Codex work has both time-based and weekly usage limits, and the allowance varies by plan. It is difficult to know exactly how much real work a displayed limit represents. OpenAI has reset usage in certain situations, and I have received that benefit around five or six times so far. I do not assume it will always be offered, but it has influenced my choice of service.

## Harnesses and MCP

I do not currently use a separate harness extensively. The way I understand a harness, it defines the tools and permissions an agent can use, along with checks that control how it runs. Right now, I do not have many sensitive details in a public service, and most of my personal data is in encrypted storage. For my current work, I feel the default setup is sufficient.

That may change if I operate a real public service or handle sensitive data. Then I would want stronger permission and review controls to prevent information from leaving the system or an agent from making damaging changes to data.

I mainly use MCP for development. When I leave a long task running and focus on another session or activity, having a tool pause for approval every time can interrupt the flow. That is why my personal MCP tools currently do not have approval steps. I also use Codex in my personal environment with fewer restrictions. These choices fit my environment and goals; I am not saying this is the right way for everyone to operate.

I am designing my agent to eventually continue working on its own for longer periods too. It is not finished, and I still need to check its safety and stability. It is not ready for a public service or for distribution to other people.

AI tools and agents have become more than simple assistants for me; they are part of how I work and make things. Right now, I use ChatGPT, local models, Codex, and the agent I am building for different purposes. When the agent becomes more stable, I hope to write separately about how I use it, what works, and what remains difficult.

<!-- lang:ja -->
## 私のAIツールの使い方と作り方

私の日常では、AIがかなり大きな割合を占めています。AIが好きで、よく使う人のひとりだと言っても大げさではありません。どのサービスを使い、個人用エージェントをどのように作っているのかを書いてみます。

## ChatGPTとローカルAI

最もよく使うサービスは、OpenAIのChatGPTです。この記事を書いている時点ではChatGPT Plusを契約していて、月額は約3,000円（およそ19ドル相当）です。公式の料金表で見た金額と実際の請求額が少し違うのですが、正確な理由は分かりません。私のアカウントには韓国ウォンで請求されています。

ローカルAIも使っています。Hugging Faceで入手したコミュニティモデルを、自分のコンピューター上で動かしています。ローカルモデルは使用量に応じたAPI料金がかからないため、目に見える直接的な費用は主に電気代です。GPUやほかのパーツの寿命への影響もあるでしょうが、金額に換算するのは難しいです。使う量が増えても請求額が連動して増えないことが、私にとって大きな利点です。

## 個人用AIエージェントを開発中

現在、個人用のAIエージェントを開発しています。まだ安定しておらず、実際の開発作業をすぐに任せられる状態ではありません。今は継続して修正や調整をしています。

機能面では、以前大きな注目を集めたOpenClawに似ているところがあります。最初は、OpenClawをRustに移植したプロジェクトであるZeroClawをフォークして、改造しようとしました。しかし、自分が望む方向に最適化するのは難しいと判断し、そのフォーク版をやめて最初から作り直しています。行き詰まったときには、OpenClawやZeroClawのソースコードを参考にすることもあります。

私が作りたいのは、長時間ひとりで動き続けられるエージェントです。私が別の作業に集中している間もタスクを続けられるよう、ツールを使うたびに承認を待たない構成を試しています。そのため、個人用のMCPツールには現在、別途承認の段階を設けていません。エージェントはまだ開発中で、安定性も十分に検証できていません。共有できる状態になったら、改めて詳しく書きたいと思います。

## ChatGPTとCodexを選ぶ理由

AnthropicのClaudeを使う人も多いですが、私の用途では今のところOpenAIのChatGPTとCodexのほうが合っていると感じます。最近はGPT-6が通常のチャットでも使えるようになり、満足して利用しています。Claudeも良い選択肢かもしれませんが、これはあくまで私が使ってみた上での個人的な好みです。

Cursorは今のところ、自分に必須のツールだとは感じていません。私が比較した利用方法では、モデルの利用料金がAPIの単価を基準に計算されると理解しており、同じモデルをサブスクリプションで使うより高く感じました。正確な差額を詳しく比較したわけではありません。実際の料金はプランや使用量によって変わるため、私個人の印象として読んでください。

ChatGPTとCodexを使い続けている理由のひとつは、利用上限のリセットを受けた経験です。Codexの作業には時間単位と週単位の利用上限があり、上限はプランによって異なります。画面に表示される制限が、実際にどれくらいの作業量に当たるのかは正確には分かりません。OpenAIが特定の状況で利用量をリセットしてくれたことがあり、私もこれまでに5〜6回ほどその恩恵を受けました。いつも提供されるものとは考えていませんが、サービスを選ぶ際の判断材料になっています。

## ハーネスとMCP

私は今のところ、独立したハーネスを積極的には使っていません。私の理解では、ハーネスとはエージェントが使えるツールや権限、実行を制御するチェック手順を定める仕組みです。現時点では公開サービスで扱う機密情報は多くなく、個人データの大半も暗号化されたストレージにあります。そのため、今の作業では標準の設定で十分だと考えています。

ただし、実際に公開サービスを運用したり、機密データを扱ったりすることになれば考えは変わるでしょう。情報の外部流出や、エージェントによるデータの誤変更を防ぐために、より強い権限管理とレビューの仕組みを整える必要があると思います。

MCPは主に開発作業で使っています。長いタスクを任せたまま、別のセッションや作業に集中しているとき、ツールが毎回承認を待つと流れが止まることがあります。そのため、自分用に作っているMCPには現在、承認段階を設けていません。Codexも個人環境では制限を少なくした形で使っています。これは自分の環境や目的に合わせた選択であり、誰にとっても適切な運用方法だと言いたいわけではありません。

自分のエージェントも、将来的にはひとりで長時間作業を続けられるよう設計しています。まだ完成しておらず、安全性と安定性を引き続き確認する必要があります。公開サービスに使ったり、ほかの人に配布したりできる状態ではありません。

AIツールやエージェントは、私にとって単なる補助機能ではなく、働き方やものづくりの一部になりました。今はChatGPT、ローカルモデル、Codex、自分で開発しているエージェントを、それぞれ違う用途で使っています。エージェントがもっと安定したら、実際の使い方やうまくいくこと、難しいことも別の記事に書きたいです。
