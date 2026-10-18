---
title: "내 블로그는 어떻게 만들어지고 배포될까?"
title_en: "How Is My Blog Built and Deployed?"
title_ja: "私のブログはどのように作られ、デプロイされているのか？"
published_at: "2026-10-15T02:06:12-06:00"
description: "Markdown 원고를 직접 검토하고 Node.js로 세 언어의 정적 페이지를 생성한 뒤 GitHub Actions와 Cloudflare Workers Static Assets로 배포하는 과정을 소개합니다."
description_en: "How I review Markdown drafts, generate a multilingual static blog with Node.js, and deploy it through GitHub Actions and Cloudflare Workers Static Assets."
description_ja: "Markdownの原稿を確認し、Node.jsで三言語の静的ページを生成してGitHub ActionsとCloudflare Workers Static Assetsで公開する流れを紹介します。"
---

<!-- lang:ko -->
## 내 블로그는 어떻게 만들어지고 배포될까?

이 블로그를 처음 만들었을 때는 단순히 제 글을 인터넷에 올릴 공간이 필요했습니다.

그런데 막상 블로그를 운영하다 보니 글을 작성하는 방법부터 HTML 페이지를 생성하는 과정, 서버에 배포하는 방식까지 여러 가지를 고민하게 됐습니다.

현재 제 블로그는 Markdown 파일로 글을 작성하고, Node.js 스크립트를 이용해 HTML로 변환한 뒤, GitHub Actions를 통해 Cloudflare에 자동 배포하는 구조입니다.

### 한눈에 보기

**Markdown 원고 → Node.js 생성기 → `dist/` 정적 페이지 → GitHub Actions → Cloudflare Workers Static Assets**

글은 Markdown으로 작성하고, Node.js 생성기가 메타데이터와 세 언어의 본문을 읽어 정적 HTML 페이지를 만듭니다. `main` 브랜치에 변경 사항을 푸시하면 GitHub Actions가 게시 규칙을 검사하고 사이트를 빌드한 뒤 Cloudflare에 배포합니다. 방문자는 서버에서 페이지를 실시간 생성하는 대신 배포된 정적 파일을 받습니다.

별도의 콘텐츠 관리 시스템(CMS)을 사용하지 않고, 데이터베이스도 두지 않았습니다.

그렇다고 대단히 특별한 기술을 사용한 것은 아닙니다. 이미 널리 사용되는 기술들을 제 목적에 맞게 조합한 것에 가깝습니다.

이번 글에서는 제가 이 블로그를 어떤 방식으로 만들었고, 왜 이런 구조를 선택했는지 이야기해 보려고 합니다.

호스팅 서비스를 변경하게 된 배경은 이전 글인 [「웹사이트를 셀프 호스팅하다가 옮긴 이유」](/ko/blog/2026/10/why-i-moved-my-website-hosting/)에서 설명했습니다. 이번에는 현재 운영 중인 블로그의 실제 구조에 집중하겠습니다.

## 1. 왜 Markdown을 선택했을까?

제가 블로그를 작성할 때 사용하는 파일 형식은 Markdown입니다.

Markdown은 일반적인 텍스트 파일에 간단한 기호를 사용해 제목, 문단, 목록, 링크 등을 표현하는 마크업 형식입니다.

HTML처럼 웹페이지의 내용을 구조화할 수 있지만, 상대적으로 문법이 단순해서 원본 파일을 그대로 읽기도 편합니다.

예를 들어 Markdown에서는 문장 앞에 `#`을 붙여 제목을 나타내거나, 글자를 `**`로 감싸 굵게 표시할 수 있습니다.

반면 HTML에서는 같은 작업을 수행하기 위해 별도의 태그를 작성해야 합니다.

물론 HTML이 나쁜 방식이라는 뜻은 아닙니다. HTML은 웹페이지를 표현하는 데 필요한 표준 언어이고, Markdown으로 작성한 내용도 결국 HTML로 변환되어 브라우저에 표시됩니다.

그렇다면 왜 처음부터 HTML로 글을 작성하지 않았을까요?

이유는 생각보다 단순합니다.

**제가 직접 읽고 검토하기 편하기 때문입니다.**

### AI가 작성하더라도 최종적으로 읽는 사람은 나다

저는 블로그 원고를 작성할 때 AI를 적극적으로 활용합니다.

처음부터 모든 문장을 키보드로 직접 작성하는 방식은 아닙니다.

때로는 생각나는 내용을 음성으로 말하고, 음성 전사를 통해 텍스트로 변환합니다.

그 과정에서는 문장이 중간에 끊기거나, 같은 말을 반복하거나, 이야기의 순서가 뒤섞이는 일이 있습니다.

그러면 AI에게 그 내용을 전달해 읽기 쉬운 원고로 정리하도록 합니다.

필요한 경우에는 이전에 작성했던 글을 참고하도록 하고, 기술적인 설명이 부족한 부분은 추가로 확인하기도 합니다.

하지만 AI가 정리한 원고를 그대로 게시하기만 하는 것은 아닙니다.

최종적으로는 제가 글을 읽고, 제 생각과 다르게 표현된 부분이 있는지 확인합니다. 사실과 다른 내용이 포함되어 있지는 않은지, 제가 원래 말하려던 의미가 제대로 전달되는지도 살펴봅니다.

이 과정에서 중요한 것은 원고를 쉽게 읽을 수 있어야 한다는 점입니다.

AI 입장에서는 Markdown보다 HTML로 문서를 생성하는 일이 더 편할 수도 있습니다. 하지만 저는 AI가 어떤 형식을 더 쉽게 작성하는지보다, 제가 결과물을 얼마나 편하게 검토할 수 있는지를 더 중요하게 생각합니다.

HTML 원본에는 다양한 태그와 속성이 들어갑니다.

단순히 글의 내용만 읽고 싶을 때도 문서 구조를 나타내는 코드가 함께 보입니다.

반면 Markdown에서는 제목과 본문을 일반적인 텍스트처럼 읽을 수 있습니다.

그래서 AI가 작성한 문장 중 어색한 부분을 찾거나, 특정 문단을 수정할 때도 상대적으로 편합니다.

제가 Markdown을 선택한 이유는 HTML보다 뛰어난 기술이라고 생각해서가 아닙니다.

**AI가 원고 작성을 도와주더라도, 최종적으로 사람이 내용을 이해하고 검토할 수 있어야 한다고 생각하기 때문입니다.**

## 2. 하나의 Markdown 파일로 세 가지 언어를 관리한다

현재 제 블로그는 한국어, 영어, 일본어를 지원합니다.

그렇다고 같은 글을 언어별로 세 개의 파일에 나누어 저장하는 것은 아닙니다.

하나의 Markdown 파일 안에 세 가지 언어의 본문을 함께 작성하는 구조입니다.

파일의 맨 위에는 Frontmatter라고 부르는 메타데이터 영역이 있습니다.

여기에는 한국어·영어·일본어 제목과 설명, 게시 날짜 등이 들어갑니다.

그 아래에는 각 언어의 본문이 이어집니다.

언어를 구분할 때는 다음과 같은 표시를 사용합니다.

- `<!-- lang:ko -->` — 한국어 본문
- `<!-- lang:en -->` — 영어 본문
- `<!-- lang:ja -->` — 일본어 본문

이 표시를 기준으로 블로그 생성기가 각 언어에 해당하는 내용을 분리합니다.

결과적으로 하나의 Markdown 파일을 작성하면 한국어, 영어, 일본어 페이지를 각각 생성할 수 있습니다.

예를 들어 `example-post.md`라는 글이 있다면, 생성기는 언어별 경로에 HTML 페이지를 만들게 됩니다.

한국어 페이지는 `/ko/blog/`, 영어 페이지는 `/en/blog/`, 일본어 페이지는 `/ja/blog/` 아래에 배치되는 방식입니다.

물론 실제 게시글 주소에는 연도와 월, 파일 이름을 바탕으로 만들어진 경로도 포함됩니다.

### 왜 언어별로 파일을 나누지 않았을까?

이 부분에도 거창한 이유가 있는 것은 아닙니다.

하나의 글을 관리할 때 관련된 내용이 한곳에 모여 있는 편이 좋다고 생각했습니다.

만약 같은 글을 한국어, 영어, 일본어로 나누어 별도의 파일에 저장한다면 글 하나를 수정할 때 여러 파일을 찾아야 합니다.

물론 언어별 파일을 분리하는 방식도 장점이 있습니다. 각 번역을 독립적으로 관리하거나 여러 번역자가 협업하기에는 오히려 더 편할 수도 있습니다.

하지만 현재는 제가 혼자 블로그를 운영하고 있습니다.

따라서 세 가지 언어를 하나의 파일에서 확인하는 방식이 제게는 더 간편합니다.

원고는 주로 한국어로 작성하고, 이후 영어와 일본어로 번역합니다.

이때도 AI의 도움을 받고 있습니다.

다만 언어가 세 개라고 해서 각각의 번역을 무조건 완벽하게 관리할 수 있다고 생각하지는 않습니다. 번역 과정에서 의미가 달라질 가능성도 있고, 원문을 수정하면 번역도 함께 확인해야 합니다.

그래도 지금의 운영 규모에서는 충분히 감당할 수 있는 방식이라고 생각합니다.

## 3. Markdown을 HTML로 변환하는 블로그 생성기

Markdown 파일을 작성했다고 해서 브라우저가 자동으로 완성된 블로그 페이지를 보여주는 것은 아닙니다.

Markdown 내용을 읽고 HTML로 변환하는 과정이 필요합니다.

저는 이 작업을 Node.js 스크립트로 자동화했습니다.

현재 저장소에는 `scripts/blog/generate.mjs`라는 블로그 생성기가 있습니다.

이 스크립트는 지정된 디렉터리에서 Markdown 파일을 찾아 읽고, 필요한 정보를 추출한 뒤 HTML 페이지를 생성합니다.

대략적인 처리 과정은 다음과 같습니다.

1. 블로그 게시글 디렉터리에서 Markdown 파일을 찾습니다.
2. 제목, 설명, 게시 날짜 등의 메타데이터를 확인합니다.
3. 한국어·영어·일본어 본문을 분리합니다.
4. Markdown 문법을 HTML로 변환합니다.
5. 각 언어에 맞는 페이지와 블로그 목록을 생성합니다.

이 과정은 모두 사이트를 빌드할 때 수행됩니다.

방문자가 블로그에 접속할 때마다 Markdown 파일을 읽고 HTML을 생성하는 구조는 아닙니다.

미리 생성된 HTML 파일을 제공하는 정적 사이트 방식입니다.

### 일부러 복잡한 기능을 넣지는 않았다

현재 생성기는 제목, 문단, 목록, 인용문, 코드 블록, 링크 등 제가 블로그를 작성하는 데 필요한 기본적인 Markdown 문법을 처리할 수 있습니다.

제목을 바탕으로 목차를 생성하는 기능도 있습니다.

또한 게시 날짜에 따라 글을 정렬하고, 언어별 블로그 목록을 만드는 작업도 수행합니다.

게시글이 많아질 경우를 고려해 목록을 페이지당 20개씩 나누도록 구성되어 있습니다.

반면 일반적인 Markdown 처리 도구에서 지원할 수 있는 모든 기능을 구현한 것은 아닙니다.

현재 블로그 작성 방식에 필요하지 않은 기능까지 전부 추가할 이유는 없다고 생각했습니다.

이러한 생각은 이전 글인 [「내가 프로그램을 설계할 때 중요하게 생각하는 6가지 원칙」](/ko/blog/2026/10/six-principles-of-software-design/)에서 설명한 개발 철학과도 연결됩니다.

물론 기능이 적은 것이 언제나 좋은 것은 아닙니다.

필요한 기능이 생기면 생성기를 수정해야 하고, 지원하지 않는 Markdown 문법을 사용하려면 별도의 처리가 필요할 수도 있습니다.

하지만 현재는 제가 필요한 기능을 직접 이해하고 관리할 수 있는 구성이 더 마음에 듭니다.

### 잘못된 게시글이 전체 빌드를 망치지 않도록

현재 블로그 생성기에는 게시글의 기본 형식을 검사하는 과정도 있습니다.

필수 메타데이터가 빠져 있거나 언어별 본문이 제대로 작성되지 않았다면 해당 파일을 정상적인 게시글로 처리하지 않습니다.

예를 들어 세 가지 언어 중 하나의 본문이 비어 있다면, 그 글은 게시 대상에서 제외됩니다.

대신 다른 정상적인 게시글까지 모두 게시하지 못하게 되는 것은 아닙니다.

문제가 있는 파일을 건너뛰고, 나머지 유효한 게시글은 계속 생성하도록 구성했습니다.

이런 규칙이 필요한 이유는 제가 항상 모든 파일을 완벽하게 작성한다고 보장할 수 없기 때문입니다.

특히 AI를 이용해 원고를 정리하고 번역하다 보면 형식이 잘못되거나 필요한 항목이 누락될 가능성도 있습니다.

따라서 단순히 글을 HTML로 변환하는 것뿐 아니라, 기본적인 형식 오류를 확인하는 작업도 자동화했습니다.

## 4. React를 사용하지 않는 이유와 Markdown의 역할

현재 제 웹사이트는 React 기반 프로젝트가 아닙니다.

기본적으로 HTML, CSS, JavaScript를 사용하는 정적 웹사이트입니다.

React 같은 프레임워크를 사용하면 컴포넌트를 만들어 여러 화면에서 재사용할 수 있습니다.

예를 들어 블로그 게시글의 제목, 본문, 목차 같은 요소를 컴포넌트로 만들고, 데이터만 바꿔서 반복적으로 렌더링하는 방식입니다.

하지만 제 현재 프로젝트에는 그런 프레임워크 기반 컴포넌트 시스템이 없습니다.

물론 그렇다고 코드를 전혀 재사용하지 못하는 것은 아닙니다.

현재 블로그 생성기 역시 공통 페이지 구조를 코드로 만들고, 여러 게시글에 반복해서 적용하는 방식을 사용합니다.

다만 각 글을 별도의 HTML 파일로 직접 작성해야 했다면 이야기가 달라졌을 것입니다.

게시글 하나를 추가할 때마다 제목과 본문뿐 아니라 HTML 문서 구조, 목차, 공통 레이아웃 등을 계속 작성해야 한다면 번거로웠을 것입니다.

문서의 형태가 비슷한데도 매번 같은 구조를 작성하는 일은 제가 원하는 방식이 아닙니다.

그래서 콘텐츠와 화면 구조를 분리했습니다.

글의 내용은 Markdown 파일에 두고, HTML 페이지를 만드는 일은 생성기에서 처리하도록 한 것입니다.

덕분에 새로운 글을 작성할 때는 페이지의 HTML 구조를 직접 신경 쓰지 않아도 됩니다.

저는 원고를 작성하고 검토하는 일에 집중하고, 생성기는 그 원고를 기존 블로그 디자인에 맞춰 HTML로 변환합니다.

제게 Markdown은 단순히 글을 작성하는 형식이 아니라, **콘텐츠와 웹페이지 구현을 분리하기 위한 중간 형식**이기도 합니다.

## 5. GitHub Actions로 자동 배포하기

글을 작성하고 HTML로 변환하는 작업까지 설명했으니, 이제 배포 과정도 이야기해 보겠습니다.

현재 제 웹사이트 코드는 GitHub 저장소에서 관리하고 있습니다.

배포 자동화에는 GitHub Actions를 사용합니다.

GitHub Actions는 저장소에서 특정 이벤트가 발생했을 때 미리 설정한 작업을 자동으로 실행할 수 있는 기능입니다.

제 웹사이트는 `main` 브랜치에 변경 사항을 푸시하면 배포 워크플로우가 실행되도록 구성되어 있습니다.

현재 워크플로우는 Node.js 24 환경을 준비한 뒤 다음 작업을 수행합니다.

1. GitHub 저장소의 코드를 가져옵니다.
2. `npm ci` 명령으로 필요한 의존성을 설치합니다.
3. `npm test` 명령으로 블로그 게시 규칙을 검사합니다.
4. Cloudflare 배포에 필요한 인증 정보가 설정되어 있는지 확인합니다.
5. `npm run build` 명령으로 정적 사이트를 빌드합니다.
6. `npx cf deploy` 명령으로 Cloudflare에 배포합니다.

실제 사이트를 만드는 중심 스크립트는 `scripts/build.mjs`입니다.

이 스크립트는 기존 정적 페이지와 CSS, JavaScript 등의 파일을 빌드 결과 디렉터리인 `dist`에 준비합니다.

그다음 필요한 언어별 페이지를 만들고, Markdown 블로그 생성기를 실행한 뒤, 생성된 HTML 파일에 추가 처리를 수행합니다.

최종적으로 `dist` 디렉터리에는 방문자에게 제공할 정적 사이트 파일들이 들어갑니다.

블로그 글이 추가되면 이 과정에서 해당 글의 한국어·영어·일본어 페이지도 함께 생성됩니다.

덕분에 새로운 글을 게시하기 위해 직접 웹 서버에 접속해서 파일을 복사하거나, 별도의 프로세스를 재시작할 필요가 없습니다.

Markdown 파일을 저장소에 추가하고 변경 사항을 푸시하면 됩니다.

물론 자동화된 배포라고 해서 모든 문제가 사라지는 것은 아닙니다.

테스트나 빌드 과정에서 오류가 발생하면 배포가 실패할 수 있습니다.

그래서 GitHub Actions의 실행 결과를 확인하는 과정도 중요합니다.

## 6. Cloudflare Workers Static Assets로 호스팅한다

이제 마지막 단계인 호스팅입니다.

현재 제 도메인의 DNS는 Cloudflare에서 관리하고 있으며, 실제 정적 사이트를 제공하는 데에는 Cloudflare Workers Static Assets를 사용하고 있습니다.

이름이 조금 길지만, 간단히 말하면 빌드된 HTML, CSS, JavaScript 같은 정적 파일을 Cloudflare를 통해 제공하는 방식입니다.

GitHub Actions에서 생성한 `dist` 디렉터리의 파일들을 Cloudflare에 배포하면 방문자는 해당 파일을 웹사이트에서 볼 수 있습니다.

여기서 한 가지 구분하고 싶은 부분이 있습니다.

저는 Node.js를 이용해 사이트를 빌드하지만, 방문자가 접속할 때마다 Node.js 웹 서버가 제 컴퓨터에서 실행되는 것은 아닙니다.

Node.js는 주로 빌드 과정에서 정적 파일을 생성하는 데 사용됩니다.

이후 실제 웹페이지는 Cloudflare에서 제공됩니다.

따라서 제 집에 있는 서버가 꺼지더라도 블로그의 정적 페이지를 제공하는 작업이 그 서버에 의존하지 않습니다.

이전에는 직접 호스팅하면서 네트워크 경로와 서버 관리에 관한 고민이 있었지만, 지금은 블로그를 운영하기 위해 집의 웹 서버 상태를 계속 신경 쓸 필요가 없어졌습니다.

물론 Cloudflare의 서비스 상태나 배포 설정에 따라 문제가 발생할 가능성은 있습니다.

그래도 제 목적에는 현재 방식이 잘 맞는다고 생각합니다.

## 7. 실제로 글을 하나 작성하면 어떻게 될까?

지금까지의 과정을 하나로 연결하면 현재 제 블로그 작성 방식은 다음과 같습니다.

먼저 새로운 글의 주제를 정합니다.

그리고 생각나는 내용을 직접 작성하거나, 음성으로 이야기한 뒤 전사된 텍스트를 준비합니다.

그 내용을 AI에 전달해 문장을 정리하고 원고 형태로 구성합니다.

여기서 저는 작성된 원고를 직접 읽어 봅니다.

제 의도와 다른 부분이 있으면 수정하고, 부족한 설명이 있으면 내용을 더 추가합니다.

원고가 만족스러운 상태가 되면 영어와 일본어로 번역합니다.

이후 세 가지 언어의 본문과 메타데이터를 하나의 Markdown 파일로 정리합니다.

파일을 GitHub 저장소에 추가하고 `main` 브랜치에 푸시하면 자동화된 배포가 시작됩니다.

GitHub Actions에서 테스트와 정적 사이트 빌드를 수행하고, 정상적으로 완료되면 Cloudflare에 파일을 배포합니다.

이렇게 하면 새로운 블로그 게시글이 사이트에 추가됩니다.

제 입장에서 글을 게시하는 전체 과정은 크게 복잡하지 않습니다.

예전처럼 HTML 파일을 하나씩 만들 필요도 없고, 서버에 직접 접속해서 배포할 필요도 없습니다.

무엇보다 제가 읽고 수정하기 쉬운 Markdown 원고를 중심으로 모든 작업을 진행할 수 있습니다.

## 8. 직접 구현하면서 느낀 장단점

현재까지 이 블로그 시스템을 사용하면서 가장 편리하다고 느낀 부분은 글의 내용과 웹페이지를 만드는 과정이 분리되어 있다는 점입니다.

저는 글을 작성할 때 HTML 태그를 신경 쓰지 않아도 됩니다.

Markdown 파일을 열면 원고의 내용이 대부분 그대로 보이고, 수정도 편리합니다.

블로그 생성기는 해당 Markdown 파일을 읽고 사이트의 디자인에 맞춰 HTML을 생성합니다.

또한 새로운 글을 추가할 때마다 기존 페이지의 HTML 구조를 복사하거나 다시 작성할 필요가 없습니다.

저는 React를 사용하지 않고 있지만, 블로그 생성기를 통해 반복적인 HTML 작성 작업을 상당 부분 자동화할 수 있었습니다.

이 점에서 Markdown과 생성기를 조합한 선택은 제게 잘 맞았습니다.

물론 직접 만든 생성기를 유지보수해야 한다는 점은 생각할 수 있습니다.

새로운 Markdown 기능을 지원하려면 생성기에도 해당 기능을 추가해야 할 수 있고, 사이트 디자인을 바꾸면 HTML을 생성하는 부분도 수정해야 할 수 있습니다.

하지만 이것을 지금 당장 큰 단점으로 느끼고 있지는 않습니다.

사실 현재까지는 특별히 불편한 점을 경험하지 못했습니다.

제가 필요한 기능을 제공하고 있고, 글을 작성하고 게시하는 과정도 만족스럽습니다.

앞으로 글이 더 많아지거나 새로운 기능이 필요해진다면 생각이 달라질 수도 있습니다.

그때 실제로 어떤 문제가 발생하는지 경험하게 된다면, 그것도 별도의 글로 남겨 보려고 합니다.

## 마치며

이번 글에서는 현재 제 블로그가 어떻게 만들어지고 배포되는지 설명했습니다.

Markdown으로 글을 작성하고, Node.js 스크립트로 HTML 페이지를 생성하며, GitHub Actions를 통해 Cloudflare Workers Static Assets에 자동으로 배포하는 구조입니다.

그런데 제가 이 구조를 선택한 가장 큰 이유는 특별한 기술을 사용하고 싶어서가 아니었습니다.

블로그를 운영하면서 반복되는 작업을 줄이고, 원고를 작성하고 검토하는 데 더 집중하고 싶었기 때문입니다.

특히 AI를 활용해 글을 작성하더라도 사람이 최종 결과물을 확인하는 과정은 중요하다고 생각합니다.

Markdown은 그 과정에서 제가 원고를 쉽게 읽고 수정할 수 있도록 해 주는 형식입니다.

저는 이런 방식이 제 블로그 운영 목적에 잘 맞는다고 생각합니다.

앞으로 블로그에 기능이 추가되거나 운영 방식이 달라질 수도 있겠지만, 현재로서는 지금의 구조에 만족하고 있습니다.

혹시 나중에 불편한 점이 생기거나 더 좋은 방향을 발견한다면 그때 다시 기록해 보겠습니다.

이 블로그 자체도 제가 만들고 운영하면서 경험을 쌓아 가는 하나의 프로젝트이기 때문입니다.

<!-- lang:en -->
## How Is My Blog Built and Deployed?

When I first built this blog, I simply wanted a place on the internet to publish my writing.

But once I started running it, I found myself thinking about how to write posts, generate HTML pages, and deploy the website.

Today, I write articles in Markdown, convert them to HTML with Node.js scripts, and automatically deploy the site to Cloudflare using GitHub Actions.

### The flow at a glance

**Markdown draft → Node.js generator → static pages in `dist/` → GitHub Actions → Cloudflare Workers Static Assets**

I write each post in Markdown, and a Node.js generator reads its metadata and three language versions to create static HTML pages. When I push a change to `main`, GitHub Actions checks the publishing rules, builds the site, and deploys it to Cloudflare. Visitors receive the deployed static files instead of having pages generated on demand.

There is no separate content management system (CMS) or database.

These are not especially unusual technologies. I have simply combined well-known tools in a way that fits my needs.

In this post, I want to explain how the blog works and why I designed it this way.

I covered my reasons for moving away from self-hosting in [“Why I Moved My Website Away from Self-Hosting”](/en/blog/2026/10/why-i-moved-my-website-hosting/). Here, I will focus on the blog's current implementation.

## 1. Why did I choose Markdown?

Markdown is the format I use to write blog posts.

It is a lightweight markup format that uses simple symbols in plain text to represent headings, paragraphs, lists, links, and more.

It expresses document structure much like HTML, but its simpler syntax makes the original file easier to read.

For example, I can prefix a line with `#` to create a heading or wrap a phrase in `**` to make it bold. In HTML, I would have to write the corresponding tags.

That does not mean HTML is a bad format. It is the standard language used to represent web pages, and my Markdown ultimately becomes HTML before a browser displays it.

So why not write HTML directly?

The reason is simple.

**Markdown is easier for me to read and review.**

### AI can prepare a draft, but I am still the one who reads it

I use AI extensively when preparing blog articles.

I do not always type out every sentence myself.

Sometimes I speak whatever comes to mind and use speech transcription to turn it into text. That transcript may contain interruptions, repetitions, and ideas presented out of order.

I give the transcript to AI and ask it to organize the material into a readable article. When needed, I ask it to refer to earlier posts or check technical explanations that need clarification.

But I do not publish the AI's output without reviewing it.

I read the draft myself, check whether it has changed what I meant, look for factual errors, and consider whether the final wording conveys my original point.

To do that, I need a format that is easy to read.

Perhaps AI finds HTML just as easy, or even easier, to generate than Markdown. That is not the criterion I care about. I care more about how easily I can inspect the result.

HTML source contains many tags and attributes. Even when I only want to read the words, the document structure is mixed into the text.

Markdown lets me read headings and paragraphs almost like ordinary prose. It is consequently easier to spot awkward wording or change a particular paragraph.

I did not choose Markdown because it is inherently superior to HTML.

I chose it because **even when AI helps produce the draft, a human should be able to understand and check the final content.**

## 2. Managing three languages in one Markdown file

My blog currently supports Korean, English, and Japanese.

I do not store each translation in a separate file. Instead, all three versions of an article are kept together in one Markdown file.

At the top is a metadata block called frontmatter. It records the title and description in each language, along with the publication date.

Below the metadata are three article bodies separated by these markers:

- `<!-- lang:ko -->` — Korean
- `<!-- lang:en -->` — English
- `<!-- lang:ja -->` — Japanese

The generator recognizes the markers and extracts the content for each language.

A single file can therefore produce three pages.

For example, given `example-post.md`, the generator creates separate HTML output under language paths such as `/ko/blog/`, `/en/blog/`, and `/ja/blog/`.

The full article URLs also contain the publication year, month, and filename-based slug.

### Why not separate the translations into individual files?

Again, there is no grand technical reason.

I like keeping related content together.

If I maintained three separate files, changing one post would mean finding and opening multiple files.

Separate files do have advantages. They can make independent translation workflows or collaboration between translators easier.

But I currently run this blog by myself.

Having all three versions visible in one file is simpler for me.

I usually write the original in Korean, then translate it to English and Japanese with AI assistance.

That does not guarantee the translations are perfect. Meaning can shift, and whenever I change the original I also need to check the translations.

At the scale of my current blog, though, this arrangement is manageable.

## 3. My Markdown-to-HTML blog generator

Writing Markdown alone does not automatically create a finished page in the visitor's browser.

The content must be converted to HTML.

I automated that work using Node.js.

My repository includes a script named `scripts/blog/generate.mjs`. It scans the designated content directory, reads Markdown files, extracts their information, and generates HTML pages.

The process is roughly as follows:

1. Find Markdown files in the blog directory.
2. Validate titles, descriptions, publication dates, and other metadata.
3. Separate the Korean, English, and Japanese sections.
4. Convert Markdown syntax into HTML.
5. Generate article pages and indexes for each language.

Everything happens during the site build.

The blog does not read Markdown or create HTML anew every time someone opens a page. Visitors receive static HTML files generated ahead of time.

### I deliberately avoided unnecessary complexity

The generator supports the Markdown features I need: headings, paragraphs, lists, blockquotes, fenced code, inline formatting, and links.

It also builds a table of contents from headings.

Posts are sorted by publication date, and each language has its own blog index. The index is set up to show 20 posts per page as the blog grows.

I have not attempted to implement every feature a general-purpose Markdown processor might offer.

I saw no reason to add capabilities that my writing process does not need.

This is related to the philosophy described in [“Six Principles That Guide How I Design Software”](/en/blog/2026/10/six-principles-of-software-design/).

Of course, fewer features are not always better. If I eventually need an unsupported feature, I may have to extend the generator.

For now, however, I like having a system I can understand and maintain myself.

### One invalid post should not break the entire blog

The generator validates the structure of each article.

If required metadata is missing or the language sections are incomplete, that file is not treated as a valid post.

For example, a post with an empty translation is excluded from publication.

But the problem does not prevent other valid posts from being generated.

The invalid file is skipped and processing continues.

I need these checks because I cannot guarantee that every file will always be formatted perfectly, especially when AI helps with drafting and translations.

The automation therefore covers basic validation as well as conversion to HTML.

## 4. Why I do not use React, and what Markdown does for me

My current website is not a React project.

It is a static website made with HTML, CSS, and JavaScript.

A framework such as React provides reusable components. For instance, a blog heading, body, and table of contents could be rendered repeatedly with different data.

My website does not have that framework-based component system.

That does not mean it has no code reuse. My generator already builds a common page structure and applies it to multiple posts.

Still, writing a separate HTML page manually for each article would be tedious.

I would have to repeat document structure, table of contents, and layout along with the new title and body every time.

That is not how I want to manage a blog.

Instead, I separated the content from its presentation.

The article itself lives in Markdown, and the generator creates the HTML.

When writing a new article, I can focus on the words rather than the structure of the resulting web page.

For me, Markdown is not only a writing format. It is **an intermediate format that separates content from implementation**.

## 5. Automatic deployment using GitHub Actions

The website's source code is managed in a GitHub repository.

For deployment automation, I use GitHub Actions.

GitHub Actions can execute predefined tasks when certain repository events occur. My workflow starts whenever a change is pushed to the `main` branch.

It sets up Node.js 24 and then:

1. Checks out the source code.
2. Installs dependencies with `npm ci`.
3. Runs `npm test` to check blog publishing rules.
4. Checks that Cloudflare deployment credentials are configured.
5. Builds the static site with `npm run build`.
6. Deploys it with `npx cf deploy`.

The main build script is `scripts/build.mjs`.

It prepares existing static pages, CSS, JavaScript, and other assets in the output directory named `dist`.

It then generates localized pages, runs the Markdown blog generator, and applies additional processing to the resulting HTML.

Finally, `dist` contains the static files visitors will receive.

When I add a post, the Korean, English, and Japanese pages are generated during the same build.

I do not have to log into a server, manually copy files, or restart a process whenever I publish.

Adding the Markdown file to GitHub and pushing it is enough to trigger the workflow.

Automation does not mean failures are impossible. A test or build error can prevent deployment, so checking the GitHub Actions results still matters.

## 6. Hosting with Cloudflare Workers Static Assets

The last part is hosting.

Cloudflare manages my domain's DNS, and I serve the static site using Cloudflare Workers Static Assets.

The name is a little long, but the idea is simple: Cloudflare delivers the built HTML, CSS, JavaScript, and other static files.

GitHub Actions deploys the contents of `dist` to Cloudflare, where visitors can request them through my website.

One distinction is important.

I use Node.js to build the site, but there is no Node.js server running on my personal computer for each incoming visitor.

Node.js runs mainly during the build process. After deployment, Cloudflare serves the generated pages.

This means the blog does not depend on my home server staying online to serve its static content.

When I self-hosted the site, I had to worry about network routes and maintaining the server. Now I do not need to monitor my own web server simply to keep the blog available.

Cloudflare or its deployment configuration could still have problems, of course.

Even so, this approach works well for my needs.

## 7. What actually happens when I publish a post?

Putting everything together, my current workflow goes like this.

First I choose a topic.

I then write my thoughts or speak them aloud and prepare a transcript.

I give that material to AI to turn it into a structured draft.

I read the draft and check it myself.

If something does not reflect what I intended, I revise it. If explanations are missing, I add details.

When I am satisfied, I translate the article into English and Japanese.

I put the three bodies and their metadata in one Markdown file.

Once I add the file to GitHub and push it to `main`, GitHub Actions runs the tests, builds the static site, and deploys to Cloudflare if everything succeeds.

That is how the new post appears on the blog.

From my perspective, publishing is not especially complicated anymore.

I do not need to write individual HTML files or connect to a server for deployment.

Most importantly, the whole process revolves around a Markdown draft that I can easily read and edit.

## 8. Advantages and disadvantages I have experienced

The biggest benefit so far is the separation of writing from page generation.

I do not have to think about HTML tags when composing an article.

I can open a Markdown file, read the content directly, and edit it comfortably.

The generator turns that file into HTML using the site's existing design.

I also do not need to copy the HTML structure of an earlier post when adding a new one.

Even without React, my generator automates much of the repetitive HTML work.

Combining Markdown with a custom generator has therefore worked well for me.

Of course, I am responsible for maintaining that generator. New Markdown features may require changes to the script, and redesigning the site may require changes to its HTML output.

But I do not currently see those possibilities as serious disadvantages.

So far I have not experienced any significant inconvenience.

The system provides the features I need, and I am satisfied with how writing and publishing work.

If the blog grows or I need more functionality, I may change my mind.

If that happens, I will probably write about it.

## Closing thoughts

My blog is built by writing Markdown, generating HTML with Node.js, and deploying the site to Cloudflare Workers Static Assets through GitHub Actions.

But I did not choose this setup just to use particular technologies.

I wanted to reduce repetitive work and spend more time writing and reviewing my articles.

Even with AI involved in drafting, I believe a human should check the final output.

Markdown makes that process easier for me.

For now, this setup suits how I want to run my blog.

The website and workflow may change as I add features, but I am satisfied with the current arrangement.

If I run into problems or discover a better approach, I want to record that too.

After all, the blog itself is another project through which I build, operate, and learn.

<!-- lang:ja -->
## 私のブログはどのように作られ、デプロイされているのか？

このブログを初めて作ったときは、自分の文章をインターネットに公開する場所が欲しかっただけでした。

しかし実際に運営し始めると、原稿の書き方、HTMLページの生成方法、サーバーへのデプロイ方法など、考えることが増えました。

現在はMarkdownファイルで記事を書き、Node.jsのスクリプトでHTMLに変換し、GitHub Actionsを使ってCloudflareへ自動デプロイしています。

### 全体の流れ

**Markdown原稿 → Node.jsジェネレーター → `dist/`の静的ページ → GitHub Actions → Cloudflare Workers Static Assets**

記事をMarkdownで書くと、Node.jsのジェネレーターがメタデータと三言語の本文を読み込み、静的なHTMLページを生成します。`main`ブランチに変更をプッシュすると、GitHub Actionsが公開ルールを確認してサイトをビルドし、Cloudflareへデプロイします。訪問者には、リクエストごとに生成したページではなく、デプロイ済みの静的ファイルが配信されます。

専用のコンテンツ管理システム（CMS）やデータベースは使用していません。

特別に珍しい技術を使っているわけではなく、一般的な道具を自分の目的に合うように組み合わせた構成です。

今回は、このブログがどのように動き、なぜこの方式を選んだのかを説明します。

セルフホスティングをやめた背景については、以前の記事[「ウェブサイトのセルフホスティングをやめて移行した理由」](/ja/blog/2026/10/why-i-moved-my-website-hosting/)で書きました。今回は現在の実装に集中します。

## 1. なぜMarkdownを選んだのか？

私が記事を書くときに使う形式はMarkdownです。

Markdownは、通常のテキストに簡単な記号を加え、見出しや段落、リスト、リンクなどを表現する軽量なマークアップ形式です。

HTMLのように文書の構造を記述できますが、比較的単純な文法なので、元のファイルをそのまま読むことも簡単です。

たとえば行の先頭に`#`を付けて見出しにしたり、文字を`**`で囲んで太字にしたりできます。HTMLなら対応するタグを書く必要があります。

もちろんHTMLが悪いわけではありません。HTMLはウェブページを表現する標準的な言語で、Markdownで書いた内容も最終的にはHTMLに変換されてブラウザーに表示されます。

では、最初からHTMLで書かない理由は何でしょうか。

答えは単純です。

**私自身が読みやすく、確認しやすいからです。**

### AIが下書きを書いても、最後に読むのは自分

私はブログの原稿を作るとき、AIを積極的に使っています。

最初からすべての文章をキーボードで入力するとは限りません。

思いついたことを音声で話し、文字起こししたテキストを使うこともあります。その結果、文章が途中で切れたり、同じ内容を繰り返したり、話の順番が前後したりします。

そこでAIにテキストを渡し、読みやすい原稿に整理してもらいます。必要であれば以前の記事を参考にしてもらったり、不足している技術的な説明を確認したりします。

ただし、AIが作った原稿をそのまま公開するわけではありません。

私が文章を読み、意図と違う表現になっていないか、事実と異なる内容がないか、伝えたかった意味が正しく残っているかを確認します。

そのためには、原稿を読みやすいことが大切です。

AIにとってはMarkdownよりHTMLのほうが書きやすい場合もあるかもしれません。しかし、私が重要視するのはAIの都合ではなく、自分がどれだけ簡単に結果を確認できるかです。

HTMLのソースにはタグや属性が多く、文章だけを読みたいときにも文書構造のコードが混ざります。

Markdownなら見出しも本文も普通のテキストに近い形で読めます。そのため、AIが書いた不自然な文章を見つけたり、特定の段落を直したりするのが楽です。

Markdownを選んだのは、HTMLより技術的に優れていると思うからではありません。

**AIが原稿作成を手伝っても、最終的には人間が内容を理解し確認できるべきだと思うからです。**

## 2. 一つのMarkdownファイルで三つの言語を管理する

私のブログは現在、韓国語、英語、日本語をサポートしています。

ただし、記事ごとに三つの別々のファイルを保存しているわけではありません。一つのMarkdownファイルに三言語の本文をまとめています。

ファイルの先頭にはFrontmatterというメタデータ領域があります。そこに各言語のタイトルと説明、公開日時を記載します。

その下に本文を置き、以下のマーカーで言語を区切ります。

- `<!-- lang:ko -->` — 韓国語の本文
- `<!-- lang:en -->` — 英語の本文
- `<!-- lang:ja -->` — 日本語の本文

ブログ生成スクリプトはマーカーを読み取り、各言語の文章を抽出します。

その結果、一つのMarkdownファイルから三言語のHTMLページを生成できます。

たとえば`example-post.md`の記事は、`/ko/blog/`、`/en/blog/`、`/ja/blog/`といった言語別のパスに配置されます。

実際の記事URLには、公開年、月、ファイル名に基づくパスも含まれます。

### なぜ言語ごとにファイルを分けないのか？

これにも大げさな理由はありません。

同じ記事に関係する内容は、一か所にまとまっているほうが好きだからです。

別々のファイルにすると、一つの記事を直すたびに複数のファイルを探さなければなりません。

もちろん、翻訳を独立して管理したり複数の翻訳者で共同作業をしたりする場合には、別のファイルに分けたほうが便利かもしれません。

しかし、現在ブログを運営しているのは私一人です。

三言語を一つのファイルで確認できるほうが簡単です。

通常は韓国語で原稿を書き、その後英語と日本語に翻訳します。翻訳にもAIを活用しています。

もちろん、すべての翻訳が常に完璧だとは思いません。翻訳時に意味が変わる可能性もあり、原文を修正したら他の言語も確認する必要があります。

それでも今の規模では管理できる方式だと思います。

## 3. MarkdownをHTMLに変換するブログ生成スクリプト

Markdownで記事を書くだけでは、ブラウザーに完成したページが自動的に表示されるわけではありません。

Markdownを読み取り、HTMLに変換する処理が必要です。

私はその処理をNode.jsで自動化しました。

リポジトリには`scripts/blog/generate.mjs`というスクリプトがあります。指定されたディレクトリからMarkdownファイルを探し、内容やメタデータを読み取ってHTMLを生成します。

おおまかな処理は次のとおりです。

1. ブログのディレクトリからMarkdownファイルを探します。
2. タイトル、説明、公開日時などのメタデータを検証します。
3. 韓国語・英語・日本語の本文を分離します。
4. Markdownの記法をHTMLに変換します。
5. 言語別の記事ページと一覧を生成します。

これらの処理はすべてビルド時に行います。

読者がアクセスするたびにMarkdownを読み、HTMLを作り直すわけではありません。

あらかじめ生成したHTMLを配信する静的サイトです。

### あえて複雑な機能は追加しない

この生成スクリプトは、見出し、段落、リスト、引用、コードブロック、リンクなど、私が記事を書くために必要な基本的なMarkdownの記法を処理できます。

見出しから目次を生成する機能もあります。

記事は公開日時で並べ替えられ、言語別の一覧ページも作成されます。記事が増えた場合に備え、一覧は1ページ20件に分けられるようにしています。

一方、一般的なMarkdown処理ツールの機能をすべて実装したわけではありません。

今の執筆方法で必要としていない機能まで追加する理由はないと思ったからです。

この考えは以前の記事[「私がソフトウェアを設計するときに大切にしている6つの原則」](/ja/blog/2026/10/six-principles-of-software-design/)で書いた開発哲学ともつながっています。

もちろん、機能が少なければ必ずよいというわけではありません。新しい機能が必要になったら生成スクリプトを修正する必要があるかもしれません。

しかし今のところ、自分で理解して管理できる構成のほうが気に入っています。

### 一つの不正な記事でブログ全体を止めない

生成スクリプトには記事の形式を検証する処理もあります。

必須のメタデータが欠けていたり、言語ごとの本文が正しく書かれていなかったりすると、そのファイルは有効な記事とは判断されません。

たとえば三言語のうち一つの本文が空なら、公開対象から除外されます。

ただし、それによってほかの正常な記事の生成まで止まるわけではありません。問題のあるファイルをスキップし、残りの記事の処理を続けます。

AIを使って原稿を整理したり翻訳したりすると、必要な項目が抜けたり、書式を間違えたりする可能性もあります。

だからこそ、HTML変換だけでなく、基本的な形式チェックも自動化しました。

## 4. Reactを使わない理由とMarkdownの役割

現在のウェブサイトはReactで作られていません。

基本的にはHTML、CSS、JavaScriptを使う静的サイトです。

Reactなどのフレームワークでは、共通のコンポーネントを作り、データだけを変えて複数のページに再利用できます。

たとえば記事のタイトル、本文、目次をそれぞれコンポーネントにできます。

私のサイトには、そのようなフレームワークベースのコンポーネントシステムがありません。

とはいえ、コードをまったく再利用できないわけではありません。

現在のブログ生成スクリプトも共通のページ構造をコードで作り、複数の記事に適用しています。

しかし記事ごとにHTMLファイルを手書きしなければならないとしたら、毎回文書構造、目次、共通レイアウトを繰り返し書くことになります。

それは私の望む方式ではありません。

そこで、記事の内容と画面構造を分けました。

コンテンツはMarkdownファイルに置き、HTMLページの生成はスクリプトに任せます。

これなら記事を書くときはHTMLの構造を気にせず、原稿の作成と確認に集中できます。

私にとってMarkdownは単なる執筆形式ではなく、**コンテンツとウェブページの実装を分離する中間形式**でもあります。

## 5. GitHub Actionsで自動デプロイする

ウェブサイトのソースコードはGitHubリポジトリで管理しています。

デプロイの自動化にはGitHub Actionsを使います。

GitHub Actionsは、リポジトリで特定のイベントが起こったときに、あらかじめ定義した作業を実行できる機能です。

私のサイトでは`main`ブランチへ変更をプッシュするとワークフローが始まります。

Node.js 24の環境を用意して、次の手順を実行します。

1. GitHubからソースコードを取得します。
2. `npm ci`で依存関係をインストールします。
3. `npm test`でブログの公開規則をテストします。
4. Cloudflareのデプロイに必要な認証情報が設定されているか確認します。
5. `npm run build`で静的サイトをビルドします。
6. `npx cf deploy`でCloudflareへデプロイします。

主なビルドスクリプトは`scripts/build.mjs`です。

既存の静的ページやCSS、JavaScriptなどを出力ディレクトリ`dist`に準備します。

次に必要な言語別ページを作り、Markdownブログ生成スクリプトを実行し、生成したHTMLに追加の処理を行います。

最終的には`dist`に訪問者に配信する静的ファイルがそろいます。

新しい記事が追加されると、その韓国語・英語・日本語のページも同時に生成されます。

記事の公開のためにサーバーへログインしてファイルをコピーしたり、プロセスを再起動したりする必要はありません。

Markdownをリポジトリに追加してプッシュするだけでワークフローが始まります。

もちろん、自動化しても失敗する可能性はあります。テストやビルドでエラーが出ればデプロイは失敗するため、GitHub Actionsの実行結果を確認することは重要です。

## 6. Cloudflare Workers Static Assetsでホスティングする

最後はホスティングです。

現在、ドメインのDNSはCloudflareで管理しており、静的サイトの配信にはCloudflare Workers Static Assetsを使っています。

長い名前ですが、要するにビルド済みのHTML、CSS、JavaScriptなどをCloudflare経由で配信する方式です。

GitHub Actionsで生成した`dist`のファイルをCloudflareにデプロイすると、訪問者がウェブサイトから閲覧できるようになります。

ここで区別しておきたいことがあります。

Node.jsはサイトのビルドに使用しますが、訪問者がアクセスするたびに私のパソコンでNode.jsサーバーが動くわけではありません。

Node.jsは主にビルド段階で静的ファイルを作成するために使います。その後の配信はCloudflareが担当します。

そのため、自宅のサーバーが停止しても、ブログの静的ページの配信は自宅サーバーに依存しません。

以前セルフホスティングしていたときは、ネットワーク経路やサーバー運用に悩むことがありました。今はブログを公開するためだけに自宅サーバーの状態を気にする必要はありません。

もちろんCloudflareの障害や設定上の問題が発生する可能性はあります。

それでも現在の方式は私の目的に合っています。

## 7. 実際に一つの記事を公開するとどうなるのか？

今までの説明をまとめると、現在の執筆と公開の流れは次のようになります。

まず記事のテーマを決めます。

思いついた内容を直接書くか、音声で話して文字起こししたテキストを準備します。

それをAIに渡して文章を整理し、原稿にしてもらいます。

完成した文章を自分で読みます。

意図と違う部分は修正し、説明が不足していれば追加します。

納得できる原稿になったら英語と日本語へ翻訳します。

三言語の本文とメタデータを一つのMarkdownファイルにまとめます。

それをGitHubの`main`ブランチにプッシュすると、GitHub Actionsがテスト、ビルド、Cloudflareへのデプロイを実行します。

すべて正常に完了すれば、記事がウェブサイトに追加されます。

私にとって、この公開手順はそれほど複雑ではありません。

HTMLを一つずつ手書きしたり、直接サーバーへ接続したりする必要もありません。

何より、自分で読みやすく修正しやすいMarkdown原稿を中心に作業できます。

## 8. 自分で実装して感じた長所と短所

現在までで一番便利だと感じたのは、文章の内容とページ生成処理を分離できたことです。

記事を書くときにHTMLタグを意識する必要がありません。

Markdownを開けば内容がほとんどそのまま見え、簡単に修正できます。

生成スクリプトはそれをサイトのデザインに合わせてHTMLにします。

新しい記事を追加するときに以前のHTMLページをコピーしたり、文書構造を書き直したりする必要もありません。

Reactは使用していませんが、ブログ生成スクリプトによって繰り返しのHTML作成をかなり自動化できました。

私にはMarkdownと独自の生成スクリプトの組み合わせが合っていました。

もちろん、自分で作った生成スクリプトを保守する必要はあります。新しいMarkdown機能を追加したり、サイトのデザインを変えたりすると、スクリプトの修正が必要になることもあるでしょう。

しかし今のところ、それを大きな欠点だとは感じていません。

実際、これまで特に不便なことはありませんでした。

必要な機能がそろっており、記事の執筆と公開にも満足しています。

今後、記事が増えたり新しい機能が必要になったりすれば、考えが変わるかもしれません。

そのような問題が起きたら、また記事にしてみたいです。

## おわりに

このブログは、Markdownで記事を書き、Node.jsでHTMLを生成し、GitHub ActionsからCloudflare Workers Static Assetsに自動デプロイする構成です。

ただし、この方式を選んだ主な理由は、特定の技術を使いたかったからではありません。

繰り返しの作業を減らし、文章を書くことと内容を確認することに集中したかったからです。

AIを使って原稿を作っても、人間が最終的な内容を確認するのは大切だと思います。

Markdownはその確認と修正を私にとって簡単にしてくれます。

今のところ、この仕組みは私のブログ運営に合っています。

将来、新しい機能が増えたり運営方法が変わったりするかもしれませんが、現在の構成には満足しています。

不便な点やよりよい方法を見つけたら、その経験も記録したいです。

このブログ自体も、私が作り、運用しながら学び続けるプロジェクトの一つだからです。
