---
title: "내가 프로그램을 설계할 때 중요하게 생각하는 6가지 원칙"
title_en: "Six Principles That Guide How I Design Software"
title_ja: "私がソフトウェアを設計するときに大切にしている6つの原則"
published_at: "2026-10-15T01:34:50-06:00"
description: "포터블 배포, 실행 효율과 메모리 절약, 기능의 단순함, 오픈 소스, 문제 해결 기록까지 제가 프로그램을 설계할 때 따르는 여섯 가지 기준을 소개합니다."
description_en: "Six personal software design principles: portable distribution, efficient runtime and memory usage, simplicity, open source, and documenting solutions."
description_ja: "ポータブルな配布、実行時の効率とメモリ節約、機能の単純さ、オープンソース、問題解決の記録という六つの開発原則を紹介します。"
---

<!-- lang:ko -->
## 내가 프로그램을 설계할 때 중요하게 생각하는 6가지 원칙

프로그램을 개발하다 보면 생각보다 많은 선택을 하게 됩니다.

어떤 프로그래밍 언어를 사용할지, 기능을 어디까지 구현할지, 사용자에게 어떤 방식으로 배포할지, 시스템 자원을 얼마나 사용하도록 설계할지 등 결정해야 할 것이 많습니다.

개발자마다 중요하게 생각하는 기준도 다릅니다. 어떤 개발자는 개발 속도를 중요하게 생각하고, 어떤 개발자는 기능의 다양성이나 사용자 경험을 더 중요하게 생각합니다.

저 역시 프로그램을 만들면서 나름의 기준이 생겼습니다.

물론 제가 중요하게 생각하는 원칙들이 모든 개발자에게 맞는다고 생각하지는 않습니다. 오히려 이번 글에서는 읽는 분들과 의견이 많이 갈릴 수도 있을 것 같습니다.

특히 기능의 다양성보다 단순함을 선택하거나, 일부 접근성 기능을 기본적으로 제공하지 않는다는 생각에는 동의하지 않는 분들도 있을 것입니다.

하지만 어디까지나 개인적인 개발 철학입니다. 정답을 제시하려는 것이 아니라, 제가 어떤 기준으로 프로그램을 설계하고 개발하는지 기록하려고 합니다.

현재 제가 중요하게 생각하는 원칙은 여섯 가지입니다.

## 1. 가능하면 포터블 프로그램으로 만든다

제가 프로그램을 만들 때 가장 먼저 생각하는 것은 포터블(Portable) 방식입니다.

포터블 프로그램은 일반적으로 별도의 설치 과정 없이 실행할 수 있도록 구성된 소프트웨어를 의미합니다.

예를 들어 Windows에서는 프로그램을 사용하기 위해 설치 프로그램을 실행하고, 설치 위치를 지정하고, 필요한 구성 요소를 시스템에 등록하는 경우가 많습니다.

반면 포터블 프로그램은 실행 파일을 다운로드하거나 압축을 해제한 뒤 바로 사용할 수 있는 경우가 많습니다.

물론 모든 포터블 프로그램이 완전히 독립적으로 동작하는 것은 아닙니다. 운영체제에 이미 설치된 구성 요소에 의존할 수도 있고, 사용자 설정이나 캐시를 별도의 위치에 저장할 수도 있습니다.

그래도 저는 가능하면 설치 과정이 필요 없는 방식을 선호합니다.

### 시스템에 불필요한 흔적을 남기고 싶지 않다

제가 포터블 방식을 좋아하는 가장 큰 이유는 시스템을 가능한 한 깔끔하게 유지하고 싶기 때문입니다.

새로운 프로그램을 사용해 보고 싶어서 설치했다가, 몇 번 사용하지 않고 삭제하는 경우가 있습니다.

그런데 일부 프로그램은 삭제하더라도 설정 파일이나 캐시, 레지스트리 항목 등이 남을 수 있습니다.

물론 이러한 파일이 반드시 문제가 되는 것은 아닙니다. 설정을 유지하거나 프로그램을 더 빠르게 실행하기 위한 정상적인 동작일 수도 있습니다.

하지만 저는 더 이상 사용하지 않는 프로그램이 시스템 곳곳에 흔적을 남기는 것을 별로 좋아하지 않습니다.

특히 일회성으로 사용하는 작은 유틸리티라면 더욱 그렇습니다.

파일 형식을 변환하거나 간단한 작업을 수행하기 위해 사용하는 프로그램에 별도의 설치 과정이 꼭 필요한가 하는 생각이 듭니다.

그래서 제가 만드는 프로그램은 가능하다면 실행 파일 하나로 배포하고 싶습니다.

Windows 프로그램이라면 단일 EXE 파일로 제공하는 것이 가장 이상적이라고 생각합니다.

추가적인 에셋이나 라이브러리, 런타임 파일이 필요하다면 실행 파일과 함께 ZIP으로 압축해 배포하는 방식도 선호합니다.

이렇게 하면 사용자는 압축을 해제하고 프로그램을 실행하면 됩니다.

더 이상 필요하지 않다면 해당 폴더를 삭제하는 것으로 대부분의 프로그램 파일을 정리할 수 있습니다.

물론 이 방식이 아무런 흔적도 남기지 않는다고 보장할 수는 없습니다. Windows의 실행 기록이나 임시 파일, 시스템 캐시 등이 남을 수 있기 때문입니다.

하지만 프로그램 자체가 별도의 전역 설정이나 시스템 등록을 요구하지 않도록 설계한다면, 일반적인 설치형 프로그램보다 제거 과정을 훨씬 단순하게 만들 수 있다고 생각합니다.

### 설치가 반드시 필요한 프로그램은 어떻게 할까?

그렇다고 모든 프로그램을 무조건 포터블 방식으로 만들겠다는 뜻은 아닙니다.

운영체제에 서비스를 등록해야 하거나 별도의 드라이버를 설치해야 하는 프로그램도 있습니다.

이런 경우에는 설치 과정을 피하기 어려울 수 있습니다.

저 역시 그런 프로그램까지 억지로 포터블로 만들 생각은 없습니다.

대신 설치가 필요하다면 제거 과정도 최대한 간편하게 제공하려고 합니다.

예를 들어 Windows에서 시스템 서비스나 드라이버를 설치해야 한다면, 가능할 경우 이를 제거하는 PowerShell 스크립트도 함께 제공하고 싶습니다.

사용자가 복잡한 명령어를 직접 찾아 실행하기보다는, 안내된 제거 스크립트로 관련 구성 요소를 정리할 수 있도록 만드는 것입니다.

물론 관리자 권한이나 재부팅이 필요할 수도 있고, 설치한 구성 요소에 따라 제거 절차가 달라질 수 있습니다.

그럼에도 설치할 때만 편리하고 제거할 때는 복잡한 프로그램은 만들고 싶지 않습니다.

제게 포터블 방식은 단순히 설치 프로그램이 없다는 의미를 넘어섭니다.

**사용자가 프로그램을 쉽게 시작하고, 더 이상 필요하지 않을 때도 쉽게 떠날 수 있도록 만드는 것**이 제가 가장 중요하게 생각하는 원칙입니다.

## 2. 개발할 때 더 많은 자원을 쓰더라도 사용자의 부담을 줄인다

두 번째 원칙은 개발 단계와 실행 단계에서 사용하는 컴퓨팅 자원에 관한 것입니다.

저는 프로그램을 빌드하거나 패키징하는 과정에서 더 많은 컴퓨팅 자원을 사용하는 것을 어느 정도 감수할 수 있습니다.

대신 완성된 프로그램을 사용하는 사람이 부담하는 자원은 가능하면 줄이고 싶습니다.

개발자가 프로그램을 빌드하는 과정은 제한된 횟수로 이루어질 수 있지만, 완성된 프로그램은 여러 사용자의 컴퓨터에서 반복해서 실행됩니다.

그렇다면 개발 단계에서 조금 더 많은 시간과 연산 자원을 사용하더라도, 사용자들이 실행하는 과정에서 자원을 절약할 수 있다면 의미 있는 선택이라고 생각합니다.

물론 모든 상황에서 이 원칙이 정답인 것은 아닙니다.

개발 비용이 지나치게 커지거나, 최적화를 위해 상당한 시간을 투자했지만 실제 사용자에게 돌아가는 이점이 거의 없다면 합리적인 선택이라고 보기 어렵습니다.

그래도 가능하다면 개발 과정에서 비용을 더 부담하는 쪽을 선호합니다.

### Rust를 선호하는 이유와도 연결된다

이러한 생각은 제가 Rust를 좋아하는 이유와도 연결됩니다.

저는 이전 글인 [「내가 Rust를 가장 좋아하는 이유」](/ko/blog/2026/10/why-i-like-rust/)에서 메모리 관리와 시스템 자원, 프로그램 배포에 관한 생각을 설명했습니다.

Rust는 소유권과 빌림 검사기를 통해 여러 메모리 안전성 문제를 컴파일 단계에서 발견할 수 있도록 설계된 언어입니다.

개발 과정에서 컴파일 시간이 길어지거나 더 많은 시스템 자원을 사용하는 경우도 있지만, 완성된 프로그램에서는 일반적인 추적형 가비지 컬렉터 없이 메모리를 관리할 수 있습니다.

제가 Rust를 선호하는 이유 중 하나입니다.

실제로 저는 간단한 API 서버나 백엔드 프로그램을 작성하면서 Python이나 Node.js로 만든 프로그램보다 Rust로 작성한 프로그램의 메모리 사용량이 상당히 적었던 경험이 있습니다.

물론 이는 제가 직접 개발했던 프로젝트에서 관찰한 결과입니다.

Rust로 작성했다고 무조건 다른 언어보다 빠르거나 메모리를 적게 사용하는 것은 아닙니다. 사용하는 라이브러리와 런타임, 데이터 구조, 구현 방식에 따라 결과는 얼마든지 달라질 수 있습니다.

Python이나 JavaScript가 개발 생산성이나 라이브러리 생태계에서 더 적합한 경우도 많습니다.

그럼에도 제가 자주 만드는 종류의 프로그램에서는 Rust의 특성이 잘 맞았습니다.

특히 작은 유틸리티나 백그라운드 프로그램을 개발할 때는 실행 과정에서 불필요한 자원 사용을 줄일 수 있다는 점을 높게 평가합니다.

저는 빌드 시간이 조금 더 길어지는 것보다, 완성된 프로그램이 사용자의 컴퓨터에서 어떻게 동작하는지가 더 중요하다고 생각합니다.

## 3. 메모리 사용량을 가능한 한 줄인다

세 번째 원칙은 메모리 사용량입니다.

저는 프로그램을 개발할 때 RAM을 얼마나 사용하는지 중요하게 생각합니다.

현재 제가 사용하는 메인 데스크톱 운영체제는 Windows입니다.

Windows를 사용하다 보면 작업 관리자에서 상당한 양의 메모리가 사용 중인 것으로 표시되는 경우가 있습니다.

여기에는 실행 중인 프로그램뿐 아니라 운영체제의 여러 서비스와 캐시도 영향을 줍니다.

Windows는 사용 가능한 메모리를 파일 캐시나 대기 메모리 등으로 활용할 수 있습니다. 이러한 메모리 중 일부는 다른 프로그램에서 필요로 할 때 다시 사용할 수 있습니다.

따라서 작업 관리자에 표시되는 메모리 사용량을 모두 회수할 수 없는 점유량으로 해석하는 것은 정확하지 않습니다.

반대로 표시되는 사용량이 전부 가짜라고 생각해서도 안 됩니다. 실행 중인 프로그램이 실제로 필요로 하는 메모리와 쉽게 회수할 수 없는 메모리도 있기 때문입니다.

중요한 것은 운영체제와 다른 프로그램들도 메모리를 사용한다는 사실입니다.

저는 제가 만든 프로그램이 가능한 한 이 자원을 적게 사용했으면 좋겠습니다.

### 8GB RAM 환경을 기준으로 생각한다

일반적인 데스크톱이나 노트북 중에는 8GB 또는 16GB RAM을 사용하는 컴퓨터도 있습니다.

물론 더 많은 메모리를 사용하는 컴퓨터도 있지만, 모든 사용자가 넉넉한 하드웨어 환경을 갖추고 있다고 가정하고 싶지는 않습니다.

그래서 비교적 가벼운 유틸리티 프로그램을 개발할 때는 8GB RAM 환경에서도 실행할 수 있도록 설계하려고 합니다.

여기서 말하는 것은 반드시 8GB RAM이 설치된 가상 머신을 만들어 장시간 테스트한다는 뜻은 아닙니다.

모든 프로그램을 다양한 하드웨어 환경에서 반복적으로 테스트하는 것은 개인 개발자인 제게 상당한 시간과 유지보수 비용을 요구합니다.

저는 그 정도의 검증까지 모든 프로젝트에서 수행할 계획은 없습니다.

대신 설계 단계에서부터 프로그램 자체가 사용하는 메모리의 양을 줄이려고 합니다.

예를 들어 파일 변환기나 간단한 이미지 처리 도구, 작은 시스템 유틸리티라면 일반적인 사용 환경에서 프로그램의 메모리 사용량을 가능하면 1GB 이하로 유지하는 것을 목표로 삼고 싶습니다.

이렇게 하면 8GB RAM을 가진 컴퓨터에서도 운영체제와 다른 프로그램을 위한 메모리 공간을 어느 정도 남겨둘 수 있습니다.

물론 이 수치는 절대적인 제한이 아닙니다.

처리하는 파일의 크기나 작업 방식에 따라 메모리가 일시적으로 더 필요할 수도 있습니다.

또한 프로그램의 종류에 따라 요구되는 자원은 완전히 달라집니다.

게임이나 대규모 데이터를 처리하는 프로그램까지 1GB 이하의 메모리로 제한하겠다는 것은 현실적이지 않습니다.

기능과 목적을 고려하지 않고 무조건 메모리 사용량만 줄이는 것도 좋은 설계라고 생각하지 않습니다.

제가 원하는 것은 적은 메모리를 사용하는 것 자체가 아니라, **프로그램이 제공하는 기능에 비해 불필요하게 많은 메모리를 사용하지 않도록 만드는 것**입니다.

1GB라는 수치 역시 이런 방향을 위한 개인적인 목표이지, 모든 프로그램에 적용하는 엄격한 규칙은 아닙니다.

## 4. 필요하지 않은 기능은 과감하게 제외한다

네 번째 원칙은 기능의 단순함입니다.

저는 프로그램을 만들 때 많은 기능을 제공하는 것보다, 정말 필요한 기능이 제대로 작동하는 것을 선호합니다.

기능이 하나 추가되면 단순히 버튼이나 메뉴 하나가 늘어나는 것으로 끝나지 않습니다.

해당 기능을 위한 코드와 의존성, 테스트할 항목, 사용자를 위한 설명, 앞으로 수정하고 유지보수해야 할 부분도 함께 늘어날 수 있습니다.

처음에는 작은 기능처럼 보이더라도 시간이 지나면서 프로젝트를 복잡하게 만들 수 있습니다.

그래서 기능을 추가하기 전에 정말 필요한지 생각하려고 합니다.

있으면 좋을 것 같은 기능과 실제로 필요한 기능은 다르다고 생각하기 때문입니다.

만약 기능의 목적이 애매하고, 사용자가 얻는 이점도 크지 않으며, 유지보수 비용만 증가시킨다면 차라리 제외하는 편을 선호합니다.

저는 모든 기능을 지원하는 프로그램보다, 정해진 목적을 단순하고 안정적으로 수행하는 프로그램을 만들고 싶습니다.

### 접근성 기능에 관한 개인적인 생각

이 원칙과 관련해 의견이 갈릴 수 있는 부분이 있습니다.

바로 접근성(Accessibility) 기능입니다.

접근성은 다양한 사용자가 프로그램을 이용할 수 있도록 만드는 중요한 요소입니다.

키보드만으로 프로그램을 조작하거나, 화면 읽기 프로그램을 지원하거나, 시각적 요소를 조정하는 기능 등이 여기에 포함될 수 있습니다.

저도 이러한 기능이 필요한 사용자들이 있다는 사실을 알고 있습니다.

다만 현재 제 개인 프로젝트에서는 일반 배포 버전에 심층적인 접근성 기능을 별도로 구현하고 유지할 계획이 없습니다.

이것은 접근성이 중요하지 않다고 생각해서가 아닙니다.

접근성을 폭넓게 지원하려면 다양한 사용 환경과 보조 기술을 고려해야 하고, 새로운 버전을 배포할 때마다 해당 기능들이 제대로 작동하는지도 확인해야 할 수 있습니다.

개인 개발자로서 모든 요구사항을 지원하고 지속적으로 관리하기에는 부담이 크다고 생각합니다.

물론 기본적인 키보드 조작처럼 프로그램의 일반적인 사용성을 높이는 부분은 구현할 수 있습니다.

하지만 화면 읽기 프로그램과의 세밀한 연동이나 특정 사용 환경에 맞춘 별도의 기능까지 일반 버전에서 제공할 계획은 현재로서는 없습니다.

대신 다른 방법을 생각하고 있습니다.

만약 제 프로그램을 사용하려는 분이 특정 접근성 기능을 필요로 한다면, 이메일 등을 통해 요청을 받을 수 있습니다.

요구사항을 확인한 뒤 제가 구현할 수 있는 범위라면, 기존 소스 코드를 별도의 브랜치나 포크로 분리하여 해당 기능을 추가하고 맞춤형 빌드를 제공하는 방식을 고려하고 있습니다.

이렇게 하면 일반 배포 버전에는 기능을 추가하지 않으면서도, 실제로 필요한 분에게는 별도로 대응할 수 있습니다.

물론 모든 요청을 수용하거나 반드시 별도 버전을 제공할 수 있다고 약속하는 것은 아닙니다. 요청된 기능의 구현 가능성과 작업량에 따라 달라질 것입니다.

또한 일반 버전과 접근성 지원 버전을 각각 만들어 모든 업데이트마다 동시에 유지할 계획도 없습니다.

필요한 요청이 들어왔을 때 해당 시점의 코드를 바탕으로 별도 버전을 만드는 방식에 가깝습니다.

이 방법이 모든 사용자에게 가장 좋은 선택이라고 생각하지는 않습니다.

일부 사용자는 별도로 연락하고 기다려야 한다는 점에서 접근성이 떨어질 수 있고, 맞춤형 빌드가 지속적으로 업데이트되지 않을 수도 있습니다.

이러한 한계가 있다는 점도 인정합니다.

그럼에도 현재 제 개발 규모와 유지보수 역량을 고려하면, 모든 기능을 기본적으로 제공하기보다는 필요한 경우에 한해 별도로 대응하는 것이 현실적인 선택이라고 생각합니다.

## 5. 가능하면 오픈 소스로 공개한다

다섯 번째 원칙은 오픈 소스입니다.

저는 가능하다면 제가 작성한 프로그램의 소스 코드를 공개하고 싶습니다.

가장 큰 이유는 저 역시 다른 개발자들이 공개한 소스 코드에서 많은 도움을 받았기 때문입니다.

프로그래밍을 공부하면서 문제가 생기면 공식 문서를 찾아보기도 했지만, 다른 사람들이 어떻게 문제를 해결했는지 살펴보는 일도 많았습니다.

특히 제가 구현하려는 기능과 비슷한 프로젝트를 발견했을 때는 해당 소스 코드를 읽으며 구조나 구현 방법을 참고하기도 했습니다.

단순히 코드를 복사해서 사용하는 것과는 다른 이야기입니다.

같은 문제를 해결하더라도 개발자마다 접근하는 방법이 다르고, 프로젝트의 구조나 사용하는 기술도 다릅니다.

저는 이러한 차이를 살펴보는 과정에서 많은 것을 배웠습니다.

혼자서는 생각하지 못했던 구현 방법을 발견하기도 했고, 제가 작성한 코드의 문제점을 돌아보는 계기가 되기도 했습니다.

그래서 저 역시 가능하다면 다른 개발자에게 참고 자료가 될 수 있는 코드를 남기고 싶습니다.

### MIT 라이선스를 선호한다

제가 주로 사용하고 싶은 라이선스는 MIT 라이선스입니다.

MIT 라이선스는 저작권 및 라이선스 고지 등의 조건을 지키는 범위에서 소프트웨어를 사용하고, 수정하고, 재배포할 수 있도록 허용하는 비교적 간단하고 허용적인 라이선스입니다.

저는 제가 공개한 코드를 다른 개발자가 참고하거나 자신의 프로젝트에 활용하는 것에 비교적 개방적인 편입니다.

물론 모든 프로젝트를 MIT 라이선스로 배포할 수 있는 것은 아닙니다. 사용한 외부 라이브러리나 코드의 라이선스 조건, 프로젝트의 목적에 따라 다른 선택이 필요할 수도 있습니다.

또한 현재 제 GitHub 저장소 중에는 아직 LICENSE 파일을 추가하지 않은 프로젝트도 있습니다.

이 부분은 앞으로 정리할 생각입니다.

소스 코드가 GitHub에 공개되어 있다는 사실만으로 다른 사람이 자유롭게 수정하거나 재배포할 수 있는 라이선스가 자동으로 부여되는 것은 아닙니다.

따라서 공개할 프로젝트에는 적절한 라이선스를 명시하는 것이 중요하다고 생각합니다.

앞으로는 이런 부분도 조금 더 신경 쓰려고 합니다.

### 모든 작은 프로젝트를 공개할 생각은 아니다

그렇다고 제가 작성하는 모든 프로그램을 현재의 GitHub 계정에 올리겠다는 뜻은 아닙니다.

제 메인 계정에는 어느 정도 규모가 있는 프로젝트나 계속 개발할 계획이 있는 프로젝트를 중심으로 정리하고 싶습니다.

작은 실험용 코드나 개인적인 목적만으로 만든 도구까지 모두 같은 곳에 올리면 저장소가 지나치게 많아지고, 제가 관리하고 싶은 프로젝트를 찾기 어려워질 수도 있다고 생각합니다.

물론 작은 라이브러리나 개인 프로젝트를 공개하는 것이 잘못됐다는 뜻은 아닙니다. 실제로 그런 프로젝트들이 다른 개발자에게 큰 도움이 되는 경우도 많습니다.

다만 저는 제 메인 계정의 저장소 구성을 조금 더 정돈된 상태로 유지하고 싶습니다.

앞으로 필요하다면 별도의 계정을 만들어 소규모 프로젝트나 개인용 도구를 관리할 수도 있을 것 같습니다.

아직 확정된 계획은 아니지만, 그런 방식도 고려하고 있습니다.

제가 지향하는 것은 무조건 많은 저장소를 공개하는 것이 아닙니다.

**공개할 가치가 있다고 판단한 코드를 적절한 형태로 공유하고, 다른 개발자에게 도움이 될 수 있도록 만드는 것**입니다.

## 6. 문제를 해결했다면 그 과정도 기록한다

여섯 번째 원칙은 문제 해결 과정의 기록입니다.

이 부분은 비교적 최근 경험을 통해 더 중요하게 생각하게 되었습니다.

저는 이전에 Instagram DM 브리징 플러그인을 개발하면서 Meta API와 관련된 오류를 만난 적이 있습니다.

당시에는 오류의 원인을 쉽게 찾지 못했고, 문제를 해결하기까지 상당한 시간을 사용했습니다.

자세한 내용은 이전 글인 [「`2534022` 오류를 이틀 동안 추적한 이야기」](/ko/blog/2026/10/tracking-instagram-dm-error/)에서 확인할 수 있습니다.

이번 글에서는 기술적인 세부 사항보다 그 경험을 통해 느낀 점을 이야기하려고 합니다.

### 해결 사례가 있어도 해결 방법을 알 수 없었다

당시 오류를 해결하기 위해 여러 자료를 검색했습니다.

비슷한 문제를 겪은 사람들은 있었지만, 제가 확인한 자료에서는 구체적인 해결 과정을 찾기 어려웠습니다.

어떤 글은 백엔드 소스 코드를 수정해서 해결했다는 설명만 남겨 두었고, 또 어떤 곳에서는 해결 방법이 공개되지 않은 답변이나 댓글로 전달된 듯한 흔적만 볼 수 있었습니다.

문제를 해결했다는 사실은 알 수 있는데, 정작 무엇을 어떻게 수정했는지는 알 수 없는 상황이었습니다.

저 역시 처음에는 어떤 방향으로 접근해야 할지 몰랐습니다.

오류 메시지를 살펴보고 여러 가능성을 확인했지만, 곧바로 원인을 특정할 수는 없었습니다.

결국 여러 시행착오 끝에 웹훅 설정과 관련된 부분을 확인하면서 문제를 해결할 수 있었습니다.

그 과정에서 생각한 것이 있습니다.

제가 이 문제를 해결하면서 겪었던 과정이 다른 사람에게도 도움이 될 수 있지 않을까 하는 것이었습니다.

물론 제가 겪은 오류와 다른 사람이 겪는 오류가 반드시 같은 원인에서 발생하는 것은 아닙니다.

같은 오류 코드가 표시되더라도 실제 원인은 다를 수 있습니다.

그렇기 때문에 더욱 문제를 겪었던 환경과 확인한 내용, 실제로 해결에 도움이 된 과정을 기록하는 것이 중요하다고 생각합니다.

### 성공한 방법뿐 아니라 실패한 시도도 남기고 싶다

저는 기술적인 문제를 해결한 결과뿐 아니라, 그 결과에 도달하기까지 어떤 과정을 거쳤는지도 남기고 싶습니다.

처음에는 무엇을 의심했는지, 어떤 방법을 시도했는지, 왜 그 방법이 효과가 없었는지 등을 기록하는 것입니다.

이런 정보는 정답만 적혀 있는 문서와는 다른 가치를 가질 수 있다고 생각합니다.

특정 방법으로 해결되지 않았다는 사실도 누군가에게는 도움이 될 수 있기 때문입니다.

물론 모든 오류와 시행착오를 기록할 수는 없을 것입니다.

아주 사소한 문제나 쉽게 해결할 수 있는 오류까지 전부 글로 남기면 기록 자체를 관리하는 데 더 많은 시간을 사용하게 될 수도 있습니다.

그래서 제가 오랫동안 해결하지 못했던 문제나, 검색해도 구체적인 해결 사례를 찾기 어려웠던 문제를 중심으로 기록하려고 합니다.

그 기록을 현재 블로그에 계속 작성할지, 별도의 문제 해결 카테고리로 분리할지, 아니면 GitHub의 이슈 트래커 등을 활용할지는 아직 정하지 않았습니다.

다만 앞으로도 문제 해결 경험을 가능한 한 공유하고 싶다는 생각은 변하지 않을 것 같습니다.

저 역시 다른 사람들이 남긴 기록 덕분에 문제를 해결한 경험이 많습니다.

이제는 제가 남긴 기록도 누군가에게 도움이 되었으면 좋겠습니다.

## 추가로 중요하게 생각하는 것: 문서는 영어를 우선한다

앞서 이야기한 여섯 가지 원칙 외에도 문서 작성에 관한 개인적인 기준이 있습니다.

가능하다면 프로젝트 문서는 영어를 우선적으로 작성하려고 합니다.

영어를 완벽하게 사용하기 때문은 아닙니다.

소프트웨어 개발 분야에서는 영어로 작성된 자료가 많고, 프로젝트를 공개했을 때 더 다양한 개발자가 문서를 읽을 수 있다는 점을 고려한 선택입니다.

제가 생각하는 문서 지원 언어의 우선순위는 영어, 한국어, 일본어 순서입니다.

한국어는 제가 가장 편하게 사용할 수 있는 언어이고, 일본어는 개인적으로 공부하고 있는 언어이기도 합니다.

그래서 현재 이 블로그도 세 가지 언어로 운영하고 있습니다.

다만 블로그와 소프트웨어 프로젝트 문서는 조금 다르게 생각하고 있습니다.

블로그는 글을 작성하고 번역하는 방식이지만, 소프트웨어 문서는 기능을 변경하거나 새 버전을 배포할 때마다 함께 수정해야 하는 경우가 많습니다.

특히 프로그램이 자주 업데이트된다면 여러 언어의 문서를 지속적으로 관리하는 것은 상당한 부담이 될 수 있습니다.

그래서 일반적인 프로젝트 문서는 영어와 한국어를 중심으로 제공할 가능성이 높습니다.

일본어 문서도 가능하다면 제공하고 싶지만, 모든 프로젝트에서 지원한다고 약속하기는 어렵습니다.

개인 개발자로서 감당할 수 있는 유지보수 범위 안에서 언어를 지원하려고 합니다.

## 원칙이 현실과 충돌한다면?

여기까지 제가 중요하게 생각하는 여섯 가지 원칙을 설명했습니다.

그렇다면 이러한 원칙들은 반드시 지켜야 하는 규칙일까요?

저는 그렇지 않다고 생각합니다.

포터블 방식을 선호하지만 설치가 필요한 프로그램도 있을 수 있습니다.

메모리 사용량을 줄이고 싶지만 프로그램의 목적에 따라 많은 자원이 필요할 수도 있습니다.

기능을 단순하게 유지하고 싶어도, 특정 사용자에게 반드시 필요한 기능이라면 별도의 구현을 고민해야 할 수도 있습니다.

오픈 소스를 선호하지만 모든 프로젝트를 공개할 수 있는 것도 아닙니다.

결국 프로그램을 개발하다 보면 자신의 기준과 현실적인 요구사항이 충돌하는 순간이 생깁니다.

저는 그때마다 원칙을 무조건 고집하기보다, 해당 프로그램의 목적과 제가 관리할 수 있는 범위를 함께 고려하려고 합니다.

그렇다고 처음 세운 기준을 쉽게 포기하겠다는 의미도 아닙니다.

어떤 선택을 해야 할지 고민될 때 돌아볼 기준이 있다는 것 자체가 중요하다고 생각합니다.

제가 여섯 가지 원칙을 정리한 이유도 여기에 있습니다.

## 마치며

이번 글에서는 제가 프로그램을 개발할 때 중요하게 생각하는 여섯 가지 원칙을 이야기했습니다.

포터블 방식으로 배포하고, 사용자의 컴퓨팅 자원을 아끼고, 메모리 사용량을 줄이고, 불필요한 기능을 제외하며, 가능하면 소스 코드를 공개하고 문제 해결 과정을 기록하는 것입니다.

서로 다른 원칙처럼 보이지만, 제게는 어느 정도 공통된 방향이 있습니다.

프로그램을 사용하는 사람에게 불필요한 부담을 주고 싶지 않고, 개발자인 제가 감당할 수 있는 범위 안에서 단순하고 효율적인 소프트웨어를 만들고 싶다는 것입니다.

물론 이런 생각에 동의하지 않는 개발자도 많을 것입니다.

누군가는 기능의 다양성을 더 중요하게 생각할 수 있고, 누군가는 접근성이나 여러 플랫폼에 대한 지원을 우선할 수 있습니다.

그것 역시 충분히 합리적인 선택이라고 생각합니다.

제가 정한 기준이 다른 방식보다 무조건 우월하다고 주장하고 싶지는 않습니다.

또한 저는 아직 많은 것을 배우는 단계입니다.

지금 중요하게 생각하는 원칙들이 앞으로도 모두 그대로 유지될지는 모르겠습니다.

새로운 프로젝트를 개발하면서 지금의 생각이 잘못됐다는 것을 깨달을 수도 있고, 이전에는 중요하게 생각하지 않았던 부분이 더 중요해질 수도 있습니다.

그런 경험이 생긴다면 제 개발 철학도 바뀔 수 있다고 생각합니다.

이 글은 완성된 규칙을 선언하는 글이 아니라, **현재 제가 어떤 생각으로 프로그램을 만들고 있는지 남기는 기록**에 가깝습니다.

앞으로 더 많은 프로그램을 만들면서 이 원칙들이 실제로 어떻게 적용되는지, 또 어떤 부분에서 바뀌게 되는지도 돌아보고 싶습니다.

<!-- lang:en -->
## Six Principles That Guide How I Design Software

Developing software involves more decisions than it might first appear.

Which programming language should I use? How many features should I implement? How should I distribute the program? How many system resources should it consume?

Different developers have different priorities. Some value development speed, while others emphasize the range of features or the user experience.

Over time, I have developed my own set of preferences too.

I do not think these principles will suit every developer. In fact, readers may disagree with several parts of this post.

Some may object to my preference for simplicity over a broad feature set, or to my decision not to include certain accessibility features in standard releases.

These are personal design preferences, not universal rules. I want to record the criteria I use when designing and building software rather than claim that my choices are the correct ones.

At the moment, six principles matter most to me.

## 1. Make software portable whenever possible

The first thing I consider when building a program is whether it can be portable.

Portable software generally refers to programs that can run without a separate installation process.

On Windows, for example, many applications use installers that let you choose an installation location and register various components with the operating system.

Portable applications, by contrast, can often be run immediately after downloading an executable or extracting an archive.

Of course, not every portable application is completely self-contained. Some depend on components already installed on the operating system, while others store settings or caches elsewhere.

Even so, I prefer avoiding installation whenever possible.

### I do not want unnecessary traces left on the system

My biggest reason for liking portable software is that I want to keep my system as tidy as possible.

Sometimes I install a new application just to try it, use it a few times, and then remove it.

Some programs leave configuration files, caches, or registry entries behind even after being uninstalled.

Those files are not necessarily harmful. They may be legitimate ways to preserve settings or improve startup performance.

Still, I do not particularly like having traces of software I no longer use scattered throughout the system.

This matters even more to me with small, single-purpose utilities.

Does a program that converts a file format or performs one simple task really need its own installer?

That is why I want to distribute my programs as a single executable whenever possible.

For Windows software, one EXE file is my ideal format.

If a program needs additional assets, libraries, or runtime files, I also like distributing them alongside the executable in a ZIP archive.

Users can extract the archive and run the program.

When they no longer need it, deleting the extracted folder removes most of the program's files.

I cannot guarantee that this leaves absolutely no trace. Windows may retain execution history, temporary files, or system caches.

But if the program is designed not to require global configuration or operating-system registration, I believe removing it can be much simpler than removing a typical installed application.

### What if installation is unavoidable?

This does not mean I intend to force every program into a portable format.

Some applications need to register operating-system services or install drivers.

For those programs, an installation process may be unavoidable.

I do not intend to make such software artificially portable at any cost.

Instead, if installation is necessary, I want removal to be as simple as possible too.

For example, when a Windows application must install a system service or driver, I would like to provide a PowerShell removal script where feasible.

Rather than having users search for complicated commands on their own, I want them to be able to follow instructions and run a script that cleans up the relevant components.

Administrator privileges or a restart may still be necessary, and the removal steps will depend on what was installed.

Even so, I do not want to build programs that are convenient to install but cumbersome to remove.

For me, portability means more than the absence of an installer.

**My most important principle is to make it easy for users to start using a program—and just as easy to leave it behind when they no longer need it.**

## 2. Spend more resources during development to reduce the user's burden

My second principle concerns computing resources during development and execution.

I am willing to accept higher resource consumption when building or packaging a program.

In exchange, I want the finished program to use as few resources as reasonably possible on the user's computer.

A developer may build a program a limited number of times, but the finished software can run repeatedly on many users' computers.

If spending a little more time and computing power during development saves resources whenever users run the program, I consider that a meaningful trade-off.

Of course, this is not always the best choice.

If development costs become excessive, or if substantial optimization work produces almost no practical benefit for users, that may not be a reasonable investment.

Nevertheless, where possible, I prefer bearing more of the cost during development.

### This is also connected to why I like Rust

This way of thinking is one reason I like Rust.

In my earlier post, [“Why Rust Is My Favorite Programming Language”](/en/blog/2026/10/why-i-like-rust/), I explained my views on memory management, system resources, and software distribution.

Rust uses ownership and borrowing checks to catch many memory-safety problems at compile time.

Compiling Rust code can take considerable time and computing resources, but finished programs can manage memory without a conventional tracing garbage collector.

That is one of the language's appealing qualities for me.

In some of my own projects, I have found that simple API servers and backend programs written in Rust used significantly less memory than versions I built with Python or Node.js.

That is an observation from my projects, not a universal benchmark.

A Rust program is not automatically faster or more memory-efficient than one written in another language. Libraries, runtimes, data structures, and implementation choices can all change the outcome.

Python and JavaScript may also be better choices for developer productivity or their library ecosystems.

Even so, Rust has been a good match for the kinds of programs I often build.

For small utilities and background processes in particular, I value the ability to limit unnecessary resource consumption at runtime.

To me, how a finished program behaves on the user's computer matters more than shaving a little time off the build process.

## 3. Keep memory usage as low as reasonably possible

My third principle is memory efficiency.

I pay close attention to how much RAM my programs use.

My main desktop operating system is currently Windows.

When using Windows, Task Manager can sometimes show a substantial amount of memory in use.

This reflects not only running applications but also operating-system services and caches.

Windows may use available RAM for file caches and standby memory. Some of that memory can be repurposed when other programs need it.

So it would be inaccurate to treat all memory reported as in use as permanently unavailable.

At the same time, it would also be wrong to dismiss all reported memory consumption as fake. Applications and the operating system genuinely need some memory, and not all allocations are readily reclaimable.

What matters to me is that the operating system and other applications need RAM too.

I would like my programs to consume as little of that shared resource as practical.

### I design with an 8 GB RAM environment in mind

Some ordinary desktops and laptops still have 8 GB or 16 GB of RAM.

Many machines have more, of course, but I do not want to assume every user has abundant hardware resources.

When I develop relatively lightweight utilities, I therefore try to design them so that they can run in an 8 GB RAM environment.

That does not mean I plan to create an 8 GB virtual machine and conduct long-running tests for every application.

Repeatedly testing every project across many hardware configurations would impose significant time and maintenance costs on me as an individual developer.

I do not intend to do that level of validation for every project.

Instead, I try to limit the program's own memory requirements from the design stage.

For example, with file converters, simple image-processing tools, or small system utilities, I would like to aim for a memory footprint of no more than about 1 GB under ordinary usage conditions.

That leaves some room for the operating system and other applications, even on an 8 GB computer.

Of course, this is not an absolute limit.

Some workloads or larger input files may temporarily require more memory.

Requirements also vary enormously by type of application.

It would be unrealistic to restrict games or large-scale data-processing software to 1 GB.

Reducing memory use at the expense of a program's actual purpose is not good design either.

What I want is not simply a low memory figure, but **to avoid consuming far more memory than the program's functionality reasonably requires**.

The 1 GB figure is a personal design target for certain kinds of utilities, not a strict rule for everything I build.

## 4. Be willing to remove features that are not necessary

My fourth principle is simplicity.

When I build software, I would rather have the features that truly matter work properly than offer a long list of features.

Adding a feature does not necessarily end with adding a button or menu item.

It may bring more code, dependencies, test cases, documentation, and maintenance work.

Something that initially looks small can gradually increase a project's complexity.

So before implementing a feature, I try to ask whether it is really necessary.

A feature that might be nice to have is not necessarily one that people need.

If its purpose is unclear, its benefit is limited, and it mainly adds maintenance work, I would rather leave it out.

I want to make programs that accomplish a clearly defined purpose simply and reliably, not programs that attempt to support everything.

### My personal approach to accessibility features

There is a part of this principle on which people may strongly disagree.

It concerns accessibility.

Accessibility helps people with different needs use software. It can include keyboard-only interaction, screen-reader support, and adjustments to visual presentation.

I recognize that some users depend on these capabilities.

However, for my personal projects, I currently do not plan to implement and continually maintain extensive accessibility features in the standard release.

This is not because I consider accessibility unimportant.

Supporting a broad range of accessibility requirements can involve different environments and assistive technologies. Every new version may also require checking that those features still work properly.

As an individual developer, I find the cost of implementing and maintaining every requirement difficult to take on.

I may, of course, implement basics such as keyboard interaction that improve a program's general usability.

But at present, I do not plan to include detailed screen-reader integration or specialized features for particular usage environments in the standard version.

I have considered an alternative approach.

If someone who wants to use my software needs a particular accessibility feature, they can contact me by email.

After understanding the request, I may be able to create a separate branch or fork of the source code, add the requested feature, and provide a customized build.

This would let me address an actual need without adding the feature to the standard distribution.

I cannot promise to accept every request or guarantee a customized version. Whether I can do it will depend on feasibility and the work involved.

I also do not intend to maintain two continuously updated editions—one standard and one accessibility-focused—for every release.

The idea is closer to building a separate version from the current source code when a specific request arises.

I do not believe this approach is ideal for every user.

Having to contact me and wait creates an additional barrier, and a customized build may not receive continuous updates.

I recognize those limitations.

Even so, given the scale of my projects and the amount of maintenance I can take on, responding to specific requests seems more realistic to me than promising all features in every standard release.

## 5. Release source code openly when possible

My fifth principle is open source.

Whenever practical, I would like to publish the source code of programs I write.

The biggest reason is that I have learned a great deal from code other developers have shared.

When I ran into problems while learning programming, I read official documentation, but I also frequently looked at how others had solved similar issues.

When I found a project implementing something close to what I wanted, reading its source code helped me understand its structure and approach.

This is different from simply copying code.

Developers can solve the same problem in different ways, using different architectures and technologies.

I learned a lot by examining those differences.

Sometimes I discovered techniques I would not have considered by myself. At other times, they made me reconsider problems with my own code.

I would like to leave behind code that might serve as a useful reference for someone else.

### I prefer the MIT License

The license I would generally like to use is the MIT License.

It is a relatively short, permissive software license that allows use, modification, and redistribution provided its copyright and permission notices are retained.

I am generally comfortable with other developers studying the code I share or using it in their own projects.

Of course, the MIT License will not necessarily be appropriate for every project. Third-party code, license compatibility, and the project's purpose can require different choices.

Some repositories on my GitHub account also do not yet contain a LICENSE file.

I plan to address that.

The fact that source code is visible on GitHub does not automatically mean that other people have permission to modify and redistribute it.

It is important to specify an appropriate license for projects intended to be reusable.

I want to pay more attention to that in future releases.

### I do not intend to publish every small project

This does not mean I want to upload every program I write to my current GitHub account.

I would prefer to keep my main account focused on larger projects or projects I intend to continue developing.

If I put every small experiment or personal utility in the same place, I worry that the list of repositories would become cluttered and make the projects I actively manage harder to find.

There is nothing wrong with publishing small libraries and personal projects. Many of them are genuinely useful to other developers.

I simply want my own main account to remain relatively organized.

In the future, I might create a separate account for small projects and personal tools.

That is only a possibility for now, not a definite plan.

My goal is not to maximize the number of public repositories.

It is **to share code I believe is worth publishing in a useful form, so that other developers may benefit from it**.

## 6. Record how problems were solved

My sixth principle is to document the process of solving problems.

A relatively recent experience made this especially important to me.

While developing an Instagram DM bridge plugin, I encountered an error related to the Meta API.

I could not identify the cause easily, and resolving the issue took considerable time.

I described the technical details in [“Two Days Chasing the `2534022` Error”](/en/blog/2026/10/tracking-instagram-dm-error/).

Here I want to focus on what I learned from that experience.

### I found reports of success, but not the solutions

I searched through many resources while trying to fix the error.

Other people had encountered similar problems, but I struggled to find a concrete explanation of how they had resolved them.

Some posts merely said that the author had modified backend source code. Elsewhere, I found traces of responses or comments whose actual solutions were not publicly visible.

I could see that someone had solved a problem, but not what they had changed or why it worked.

At first, I did not know how to approach my own issue either.

I examined the error messages and investigated several possibilities without immediately finding the cause.

Eventually, after numerous attempts, I identified a problem involving webhook configuration and got things working.

That made me wonder whether the process I went through might help someone else.

Of course, another person's error might have a different root cause even if the error code is identical.

That is precisely why I think it is important to record the environment, the things I checked, and the steps that actually helped.

### I want to record failed attempts, not just the successful fix

I want to document not only the result of resolving a technical issue but also the path I took to get there.

That includes what I first suspected, what I tried, and why certain attempts did not work.

Such information can be useful in a different way from documentation that provides only the final answer.

Learning that a certain approach failed may save someone else time.

I cannot record every error and every experiment, of course.

Documenting every trivial issue could take more time than solving the issues themselves.

So I want to focus on problems I spent a long time investigating, or those for which I could not find a clear solution despite searching.

I have not yet decided whether these records should remain regular blog posts, move into a dedicated troubleshooting category, or live in a GitHub issue tracker.

But I want to keep sharing what I learn from solving difficult problems.

Other people's records have helped me countless times.

I hope my own records can eventually help someone else too.

## Another preference: English comes first in project documentation

Beyond the six principles above, I also have a preference about documentation.

Where possible, I want to write project documentation in English first.

It is not because my English is perfect.

A great deal of software-development material is written in English, and using it can help more developers understand a public project.

My preferred language order for documentation is English, Korean, and Japanese.

Korean is the language I am most comfortable with, while Japanese is a language I am studying.

That is also why this blog currently supports all three.

However, I see blog posts and software documentation somewhat differently.

A blog post can be written and translated as a finished piece. Software documentation often needs to change whenever features are modified or new versions are released.

Keeping documentation up to date in several languages can become a considerable burden, particularly for frequently updated software.

That is why I expect most project documentation to be available primarily in English and Korean.

I would also like to provide Japanese documentation where possible, but I cannot promise it for every project.

I intend to support languages within the maintenance capacity I have as an individual developer.

## What happens when these principles conflict with reality?

So far, I have explained the six principles I care about.

But do I think they must be followed without exception?

No.

I prefer portable software, but some programs need installation.

I want low memory consumption, but a program's purpose may require substantial resources.

I value simplicity, but a feature that a particular user genuinely needs may be worth implementing separately.

I like open source, but I cannot publish every project.

While developing software, there will inevitably be moments when personal preferences and practical requirements conflict.

When that happens, I want to consider the program's purpose and the amount of work I can realistically maintain rather than cling rigidly to a principle.

That does not mean I plan to abandon my standards whenever things become inconvenient.

Having a set of criteria to return to when making difficult choices matters in itself.

That is why I wanted to write down these six principles.

## Closing thoughts

In this post, I have described six principles that matter to me when developing software.

I prefer portable distribution, reducing runtime costs for users, keeping memory usage modest, removing unnecessary features, publishing source code where possible, and recording the process of solving problems.

They may seem like separate concerns, but for me they point in a similar direction.

I want to avoid placing unnecessary burdens on the people who use my software, while building simple and efficient programs within the limits of what I can develop and maintain.

I know many developers will disagree with these choices.

Some may place more importance on a wide range of features. Others may prioritize accessibility or support for multiple platforms.

Those can be entirely reasonable decisions too.

I do not want to claim that my approach is inherently superior.

I am also still learning.

I do not know whether every principle I value today will remain unchanged.

A future project may show me that something I believed was mistaken, or that an issue I had overlooked is more important than I realized.

If that happens, I am willing to change my approach.

This post is not a declaration of permanent rules. It is **a record of how I currently think about building software**.

As I create more programs, I would like to look back at how these principles work in practice and how they may change.

<!-- lang:ja -->
## 私がソフトウェアを設計するときに大切にしている6つの原則

プログラムを開発していると、思っていた以上に多くのことを選択しなければなりません。

どのプログラミング言語を使うか、機能をどこまで実装するか、利用者にどう配布するか、どの程度のシステム資源を使うように設計するかなど、判断することはたくさんあります。

開発者によって重視する基準も違います。開発速度を優先する人もいれば、機能の豊富さやユーザー体験を重視する人もいます。

私にも、プログラムを作るうちに自分なりの基準ができました。

もちろん、私が重視する原則がすべての開発者に合うとは思いません。むしろ、この記事には意見が分かれる部分も多いと思います。

機能の多さより単純さを選ぶことや、一部のアクセシビリティ機能を標準版には実装しないという考えに、賛成できない人もいるでしょう。

ただし、これはあくまで個人的な開発哲学です。正解を示すのではなく、私がどのような基準でソフトウェアを設計し、開発しているかを記録したいと思います。

現在、私が大切にしている原則は六つあります。

## 1. できるだけポータブルなプログラムにする

私がプログラムを作るとき、最初に考えるのはポータブル（Portable）という方式です。

ポータブルソフトウェアとは、一般的に、別途インストール作業を行わずに実行できるよう構成されたソフトウェアを指します。

たとえばWindowsでは、インストーラーを起動し、保存先を指定して、必要な構成要素をOSに登録するアプリケーションが多くあります。

一方、ポータブルなプログラムは実行ファイルをダウンロードするか、圧縮ファイルを展開するだけですぐに使える場合が多いです。

もちろん、すべてのポータブルソフトウェアが完全に独立して動くわけではありません。OSにすでに導入されている構成要素に依存したり、設定やキャッシュを別の場所に保存したりすることもあります。

それでも、可能な限りインストールを必要としない方式を好みます。

### システムに不要な痕跡を残したくない

私がポータブル方式を好む一番の理由は、システムをできるだけ整理された状態に保ちたいからです。

新しいソフトウェアを試すためにインストールしたものの、数回しか使わずに削除することがあります。

しかし、アンインストールしても設定ファイルやキャッシュ、レジストリの項目などが残るプログラムもあります。

それらが必ずしも問題になるわけではありません。設定を保存したり、起動を速くしたりするための正常な動作である場合もあります。

それでも、もう使っていないソフトウェアの痕跡がシステムのあちこちに残るのは、あまり好きではありません。

一度きりの用途で使う小さなユーティリティなら、なおさらです。

ファイル形式を変換したり、単純な処理を一つ実行したりするだけのプログラムに、専用のインストール作業が本当に必要なのだろうかと思います。

だから、自分で作るプログラムは可能であれば実行ファイル一つで配布したいと考えています。

Windows向けなら、単一のEXEファイルで提供するのが理想です。

追加のアセットやライブラリ、ランタイムファイルが必要な場合は、実行ファイルと一緒にZIPにまとめて配布する方法も好みます。

そうすれば、利用者はZIPを展開してプログラムを実行するだけです。

不要になったら展開したフォルダーを削除することで、プログラムのファイルの大部分を片付けられます。

もちろん、何の痕跡も残らないとは保証できません。Windowsの実行履歴や一時ファイル、システムキャッシュなどが残る可能性があるためです。

それでも、プログラム自体がシステム全体の設定やOSへの登録を要求しないように設計すれば、一般的なインストール型ソフトウェアよりも削除をずっと簡単にできると思います。

### インストールがどうしても必要な場合は？

だからといって、すべてのプログラムを無理にポータブルにするつもりはありません。

OSにサービスを登録したり、別途ドライバーをインストールしたりする必要があるプログラムもあります。

そのような場合、インストール処理を避けることは難しいでしょう。

私も、それを無理やりポータブル化しようとは考えていません。

代わりに、インストールが必要なら削除もできるだけ簡単にしたいと思っています。

たとえばWindowsでシステムサービスやドライバーを導入する場合、可能ならそれらを削除するPowerShellスクリプトも一緒に提供したいです。

利用者が複雑なコマンドを自分で調べるのではなく、案内に従って削除スクリプトを実行すれば関連する構成要素を整理できる形にしたいのです。

もちろん、管理者権限や再起動が必要になることもありますし、削除手順はインストールしたものによって異なります。

それでも、インストールするときだけ便利で、削除するときには面倒なプログラムは作りたくありません。

私にとってポータブルという考え方は、単にインストーラーがないこと以上の意味を持ちます。

**利用者が簡単に使い始められ、不要になったときには簡単に使うのをやめられるようにすること**が、私の最も重要な原則です。

## 2. 開発時の負担が増えても利用者の負担を減らす

二つ目の原則は、開発段階と実行段階で使うコンピューティング資源についてです。

プログラムをビルドしたりパッケージ化したりするときに、より多くの計算資源を使うことはある程度受け入れられます。

その代わり、完成したプログラムを使う人が負担する資源は、できるだけ減らしたいと思っています。

開発者がプログラムをビルドする回数は限られていても、完成したプログラムは多くの利用者のパソコンで繰り返し実行されます。

であれば、開発段階で少し多くの時間や計算資源を使っても、実行時に資源を節約できるなら意味のある選択だと思います。

もちろん、いつでもこの考え方が正しいわけではありません。

開発コストが過大になったり、最適化に多くの時間をかけても利用者にほとんど利益がなかったりするなら、合理的とは言いにくいでしょう。

それでも可能であれば、開発側がより多くのコストを引き受けるほうを選びたいです。

### Rustを好む理由にもつながる

この考えは、私がRustを好む理由ともつながっています。

以前の記事[「私がRustを一番好きな理由」](/ja/blog/2026/10/why-i-like-rust/)では、メモリ管理、システム資源、ソフトウェアの配布について考えを書きました。

Rustは所有権と借用の検査によって、多くのメモリ安全性の問題をコンパイル時に発見できるよう設計された言語です。

開発時にはコンパイルが長くなったり、多くの資源を使ったりすることもありますが、完成したプログラムでは一般的なトレース型ガベージコレクタを使わずにメモリを管理できます。

これが私がRustを好む理由の一つです。

実際、自分で簡単なAPIサーバーやバックエンドを作った際、PythonやNode.jsで実装したものより、Rustで書いたもののメモリ使用量がかなり小さかった経験があります。

ただし、それはあくまで私自身のプロジェクトで観察した結果です。

Rustなら必ず他の言語より速く、メモリを節約できるわけではありません。ライブラリ、ランタイム、データ構造、実装方法によって結果は変わります。

開発効率やライブラリの充実度という面では、PythonやJavaScriptのほうが適している場合も多いでしょう。

それでも、私がよく作る種類のプログラムにはRustの性質が合っていました。

特に小さなユーティリティやバックグラウンドプログラムでは、実行中の無駄な資源消費を抑えられる点を高く評価しています。

ビルド時間が少し長くなることよりも、完成したプログラムが利用者のパソコンでどう動くかを重視しています。

## 3. メモリ使用量をできるだけ抑える

三つ目の原則はメモリ使用量です。

私はプログラムを開発するとき、RAMをどれくらい使うかを重要視しています。

現在、メインのデスクトップOSとして使っているのはWindowsです。

Windowsのタスクマネージャーでは、かなりの量のメモリが使用中と表示されることがあります。

これには実行中のアプリケーションだけでなく、OSの各種サービスやキャッシュも影響します。

Windowsは使用可能なRAMをファイルキャッシュやスタンバイメモリなどに利用できます。その一部は、別のプログラムが必要とするときに再利用できます。

したがって、タスクマネージャーに表示される使用量をすべて回収できない占有メモリだと考えるのは正確ではありません。

逆に、表示されている使用量がすべて見かけだけのものだと考えるのも間違いです。プログラムやOSが実際に必要とするメモリもあり、簡単には回収できない領域もあるからです。

大事なのは、OSや他のアプリケーションもRAMを必要としているということです。

私が作るプログラムには、この共有資源を可能な限り少なく使ってほしいと思っています。

### RAM 8GBの環境を念頭に置く

一般的なデスクトップやノートパソコンには、RAMが8GBまたは16GBのものもあります。

もっと大容量の機種もありますが、すべての利用者が豊富なハードウェア資源を持っていると想定したくはありません。

そこで、比較的軽量なユーティリティを開発するときは、RAM 8GBの環境でも実行できるよう設計したいと思っています。

ただし、これは毎回RAM 8GBの仮想マシンを作り、長期間テストするという意味ではありません。

すべてのプログラムをさまざまな環境で繰り返し検証すると、個人開発者である私には大きな時間と保守コストがかかります。

すべてのプロジェクトでそこまでの検証を行う予定はありません。

その代わり、設計段階からプログラム自体が必要とするメモリを抑えようとします。

たとえばファイル変換ツール、簡単な画像処理ツール、小さなシステムユーティリティであれば、通常の使用状況でのメモリ使用量を可能なら1GB以下にすることを目標にしたいです。

そうすればRAM 8GBのパソコンでも、OSや他のプログラムにある程度の余裕を残せます。

もちろん、この数値は絶対的な制限ではありません。

扱うファイルの大きさや処理内容によっては、一時的にもっと多くのメモリが必要になることもあります。

また、プログラムの種類によって要求される資源は大きく異なります。

ゲームや大規模なデータ処理ソフトウェアまで1GB以下に制限するのは現実的ではありません。

機能や目的を考えず、ただメモリ使用量だけを減らすことが良い設計だとも思いません。

私が目指しているのは数値としてメモリを小さくすることではなく、**提供する機能に対して不必要に多くのメモリを消費しないようにすること**です。

1GBという数値も、ある種のユーティリティに対する個人的な目標であって、すべてのプログラムに適用する厳格な規則ではありません。

## 4. 不要な機能は思い切って省く

四つ目の原則は機能の単純さです。

私は多くの機能をそろえることより、本当に必要な機能がきちんと動くことを重視します。

機能を一つ追加しても、ボタンやメニューが一つ増えるだけでは済まないことがあります。

その機能のためのコードや依存関係、テスト項目、説明文、今後の修正や保守作業も増える可能性があります。

最初は小さく見えた機能が、時間とともにプロジェクトを複雑にすることもあります。

だから、機能を追加する前に本当に必要なのかを考えたいと思っています。

あれば便利そうな機能と、本当に必要な機能は違うからです。

目的が曖昧で、利用者にとっての利益も小さく、保守コストばかり増えるのであれば、むしろ省くほうを選びます。

何でもできるプログラムより、決められた目的を単純かつ安定して実行するプログラムを作りたいです。

### アクセシビリティ機能についての個人的な考え

この原則には意見が分かれそうな部分があります。

アクセシビリティです。

アクセシビリティは、さまざまな利用者がソフトウェアを使えるようにするための重要な要素です。

キーボードだけで操作すること、スクリーンリーダーへの対応、見た目の調整などが含まれます。

そうした機能を必要とする利用者がいることは理解しています。

ただし、現在の私の個人プロジェクトでは、標準配布版に高度なアクセシビリティ機能を別途実装し、継続して保守する予定はありません。

アクセシビリティが重要ではないと考えているわけではありません。

幅広い要求に対応するには、さまざまな使用環境や支援技術を考える必要があります。また、新しいバージョンを出すたびに、それらが正常に動くか確認する必要も生じます。

個人開発者として、すべてを実装し継続的に管理する負担は大きいと感じます。

もちろん、キーボード操作のように一般的な使いやすさを高める基本的な部分は実装できます。

しかし、スクリーンリーダーとの細かな連携や特定の利用環境向けの専用機能まで、現時点では標準版に含めるつもりはありません。

代わりに、別の方法を考えています。

私のプログラムを使いたい人が特定のアクセシビリティ機能を必要とする場合、メールなどで要望を受け付けることはできます。

内容を確認し、私に実装できる範囲であれば、元のソースコードから別のブランチやフォークを作り、必要な機能を追加したカスタムビルドを提供することを検討しています。

これなら標準版に機能を増やさず、実際に必要としている人に個別に対応できます。

ただし、すべての要望を受け入れたり、必ず特別版を提供したりできると約束するわけではありません。実装の可能性や作業量によって判断します。

また、標準版とアクセシビリティ対応版という二つの製品を、すべての更新で並行して保守するつもりもありません。

具体的な依頼が来たとき、その時点のコードを基に別のビルドを作るという考え方です。

これがすべての利用者にとって理想的だとは思いません。

連絡して待つ必要があること自体が障壁になりますし、特別版が継続して更新されるとは限りません。

そうした限界も認識しています。

それでも現在の開発規模と保守できる範囲を考えると、標準版ですべてを提供すると約束するより、必要に応じて個別に対応するほうが現実的だと考えています。

## 5. できるだけオープンソースとして公開する

五つ目の原則はオープンソースです。

可能であれば、自分が書いたプログラムのソースコードを公開したいと思っています。

一番の理由は、私自身が他の開発者の公開したコードから多くを学んできたからです。

プログラミングを学ぶ中で問題に遭遇すると、公式ドキュメントだけでなく、他の人が同じような問題をどう解決したかを調べることもよくありました。

特に実装したい機能に近いプロジェクトを見つけたときは、そのソースコードを読み、構成や実装方法を参考にしました。

これは単純にコードをコピーすることとは違います。

同じ問題でも開発者によって解決方法が異なり、構成や採用する技術も違います。

そうした違いを調べることで多くのことを学びました。

自分では思いつかなかった方法を見つけたり、自分のコードの問題点を考え直すきっかけになったりしました。

だから私も、ほかの開発者が参考にできるコードを残していきたいです。

### MITライセンスを好む

私が主に採用したいのはMITライセンスです。

MITライセンスは、著作権表示と許諾表示を残すなどの条件の下で、ソフトウェアの使用、改変、再配布を広く認める比較的簡潔で許容的なライセンスです。

私は公開したコードを他の開発者が読んだり、自分のプロジェクトに活用したりすることに比較的前向きです。

もちろん、すべてのプロジェクトにMITライセンスが適しているわけではありません。外部のコードやライブラリの条件、プロジェクトの目的によっては別の選択が必要です。

また、現在の私のGitHubリポジトリの中には、まだLICENSEファイルがないものもあります。

この点は今後整理する予定です。

GitHubでソースコードが公開されているだけでは、誰もが自由に改変や再配布をできるライセンスが自動的に付与されるわけではありません。

そのため、再利用を想定したプロジェクトには適切なライセンスを明記することが大切だと思います。

今後はその点にも注意したいです。

### 小さなプロジェクトをすべて公開するつもりはない

とはいえ、自分が書いたすべてのプログラムを今のGitHubアカウントにアップロードするつもりはありません。

メインのアカウントは、ある程度の規模があるプロジェクトや、今後も開発を続ける予定のあるプロジェクトを中心に整理したいと考えています。

小さな実験コードや個人用のツールまで同じ場所に置くと、リポジトリが増えすぎて、管理したいプロジェクトを探しにくくなるかもしれません。

もちろん、小さなライブラリや個人プロジェクトを公開することが悪いわけではありません。そうしたものが他の開発者の大きな助けになることもあります。

ただ、私はメインアカウントのリポジトリを比較的整理された状態に保ちたいのです。

将来、必要になれば別のアカウントを作り、小規模なプロジェクトや個人用ツールを管理することも考えています。

まだ確定した計画ではありませんが、選択肢の一つです。

私の目的は公開リポジトリの数を増やすことではありません。

**公開する価値があると判断したコードを適切な形で共有し、他の開発者の役に立てること**です。

## 6. 問題を解決したら、その過程も記録する

六つ目の原則は問題解決の過程を記録することです。

比較的最近の経験を通じて、これをさらに重要だと思うようになりました。

以前、Instagram DMのブリッジプラグインを開発していたとき、Meta APIに関するエラーに遭遇しました。

原因をなかなか特定できず、解決までにかなりの時間を費やしました。

詳しい技術的な内容は以前の記事[「`2534022`エラーを2日間追いかけた話」](/ja/blog/2026/10/tracking-instagram-dm-error/)で説明しています。

ここでは技術の詳細より、その経験から感じたことを話したいと思います。

### 解決した事例はあっても、解決方法がわからなかった

当時、エラーを直すために多くの資料を探しました。

似た問題に遭遇した人はいましたが、私が確認した資料では具体的な解決手順を見つけられませんでした。

ある投稿には「バックエンドのソースコードを修正して解決した」とだけ書かれていました。また別の場所では、解決策が一般には見えない返信やコメントで共有されたような痕跡がありました。

誰かが問題を解決したことはわかっても、何をどう変えたのかはわからない状態でした。

私自身も、最初はどこから調べればよいのかわかりませんでした。

エラーメッセージを読み、いくつもの可能性を確認しましたが、すぐに原因を特定することはできませんでした。

最終的には試行錯誤の末、Webhookの設定に関わる部分を確認することで問題を解決できました。

そのとき考えたことがあります。

自分が問題を解決するまでに経験した過程が、ほかの誰かの役に立つかもしれないということです。

もちろん、同じエラーコードが出ていても、ほかの人の問題が必ず同じ原因とは限りません。

だからこそ、どのような環境で問題が起き、何を確認し、どの作業が実際に役立ったのかを記録することが重要だと思います。

### 成功した方法だけでなく失敗した試みも残したい

私は、問題を解決した結果だけでなく、その結果に至る過程も記録したいと考えています。

最初に何を疑ったのか、どの方法を試したのか、なぜうまくいかなかったのか、といった内容です。

そのような情報には、最終的な正解だけを示す文書とは異なる価値があると思います。

ある方法では解決しなかったという事実も、別の人の時間を節約するかもしれません。

もちろん、すべてのエラーや試行錯誤を記録することはできません。

些細な問題まで毎回記事にしていたら、記録の管理にかかる時間のほうが増えてしまうこともあります。

そこで、長い時間をかけて調べた問題や、検索しても具体的な解決例が見つからなかった問題を中心に残したいと思います。

記録をこのブログに書き続けるか、専用のトラブルシューティングのカテゴリを作るか、GitHubのIssueトラッカーを使うかはまだ決めていません。

ただ、問題解決の経験をできるだけ共有したいという考えは変わらないと思います。

私もほかの人が残した記録に何度も助けられました。

今度は私の記録も誰かの役に立てばと思います。

## もう一つ大切にしていること：文書は英語を優先する

ここまでの六つの原則とは別に、ドキュメントの書き方についても個人的な基準があります。

可能であれば、プロジェクトの文書は英語を優先して書きたいと思っています。

英語が完璧に使えるからではありません。

ソフトウェア開発の分野には英語の資料が多く、プロジェクトを公開したときに幅広い開発者に読んでもらえると考えているからです。

文書で対応したい言語の優先順位は、英語、韓国語、日本語です。

韓国語は私が最も自然に使える言語で、日本語は個人的に勉強している言語でもあります。

そのため、現在このブログも三つの言語で運営しています。

ただし、ブログとソフトウェアのドキュメントは少し分けて考えています。

ブログの記事は一度書いて翻訳する形ですが、ソフトウェアの文書は機能の変更や新しいバージョンのリリースのたびに更新が必要になる場合が多いです。

特に更新頻度が高いプログラムでは、多言語の文書を常に最新の状態に保つのは大きな負担になります。

そのため、一般的なプロジェクトのドキュメントは英語と韓国語を中心に提供することになると思います。

日本語も可能なら用意したいですが、すべてのプロジェクトで対応すると約束するのは難しいです。

個人開発者として維持できる範囲で言語をサポートしたいと思っています。

## 原則と現実がぶつかったら？

ここまで、私が大切にしている六つの原則を説明しました。

では、これらは必ず守るべき規則なのでしょうか。

私はそうは思いません。

ポータブル方式を好んでいても、インストールが必要なプログラムはあります。

メモリ使用量を抑えたくても、目的によっては多くの資源が必要になることもあります。

機能を単純に保ちたくても、特定の利用者に本当に必要な機能なら別の実装を検討することもあります。

オープンソースを好んでいても、すべてのプロジェクトを公開できるわけではありません。

開発を続ければ、自分の基準と現実の要求が衝突する瞬間は必ずあるでしょう。

そんなときは原則を無条件に押し通すのではなく、プログラムの目的と自分が保守できる範囲を一緒に考えたいと思っています。

だからといって、最初に決めた基準を簡単に捨てるつもりもありません。

何を選ぶべきか迷ったとき、立ち返る基準があること自体が重要だと思います。

この六つの原則を書き残したのも、そのためです。

## おわりに

今回は、私がソフトウェア開発で大切にしている六つの原則について話しました。

できるだけポータブルに配布し、利用者の計算資源の負担を減らし、メモリ使用量を抑え、不要な機能を省き、可能ならソースコードを公開し、問題解決の過程を記録することです。

それぞれ別の原則に見えますが、私の中では共通する方向があります。

ソフトウェアを使う人に不必要な負担をかけず、開発者である自分が管理できる範囲で、単純で効率のよいプログラムを作りたいということです。

もちろん、この考えに賛成しない開発者も多いと思います。

機能の豊富さを優先する人もいれば、アクセシビリティや複数のプラットフォームへの対応を重視する人もいるでしょう。

それも十分に合理的な選択だと思います。

自分の方法が他より必ず優れていると主張したいわけではありません。

私自身、まだ多くのことを学んでいる途中です。

今大切にしている原則が、これからもすべて変わらないかどうかはわかりません。

新しいプロジェクトを通じて自分の考えが間違っていたと気づくかもしれませんし、それまで重視していなかったことがより重要になるかもしれません。

そんな経験をしたら、私の開発哲学も変わると思います。

この記事は完成された規則の宣言ではなく、**今の私がどんな考えでプログラムを作っているかを残す記録**です。

これからもっと多くのプログラムを作りながら、この原則が実際にどう適用され、どのように変わっていくのかも振り返りたいと思います。
