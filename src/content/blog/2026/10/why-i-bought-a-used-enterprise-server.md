---
title: "약 8만 원에 들여온 중고 엔터프라이즈 서버, 선택한 이유와 장단점"
title_en: "Why I Bought a Used Enterprise Server for About 80,000 Won: Advantages and Disadvantages"
title_ja: "約8万ウォンで購入した中古エンタープライズサーバー：選んだ理由と長所・短所"
published_at: "2026-10-15T02:57:30-06:00"
description: "약 8만 원에 구매한 Cisco UCS C220 M5의 CPU 교체 경험과 CIMC 진단, 메모리 확장성, 소음과 전용 부품 등 직접 느낀 장단점을 소개합니다."
description_en: "A used Cisco UCS C220 M5, a CPU replacement that solved its boot problem, and the practical benefits and limitations of enterprise server hardware."
description_ja: "約8万ウォンで購入したCisco UCS C220 M5のCPU交換、CIMCによる診断、拡張性、騒音や専用部品などの長所と短所を紹介します。"
---

<!-- lang:ko -->
## 약 8만 원에 들여온 중고 엔터프라이즈 서버, 선택한 이유와 장단점

저는 현재 집에서 여러 대의 서버를 운영하고 있습니다.

이전 글인 [「캐나다의 서버와 따뜻한 방」](/ko/blog/2026/10/my-infrastructure-in-canada/)에서도 소개했지만, 제가 사용하는 서버 중에는 일반적인 데스크톱 컴퓨터가 아니라 데이터센터에서 사용하던 엔터프라이즈 서버도 있습니다.

그런데 생각해 보면, 개인이 집에서 사용할 컴퓨터를 구할 때 굳이 엔터프라이즈 서버를 선택할 이유가 있을까요?

일반적인 데스크톱을 직접 조립할 수도 있고, 요즘에는 작은 미니 PC만으로도 여러 서비스를 운영할 수 있습니다.

엔터프라이즈 서버는 크고 시끄럽고, 전력도 많이 사용할 수 있습니다.

그럼에도 저는 중고 엔터프라이즈 서버를 선택했습니다.

가장 큰 이유는 가격이었습니다.

그리고 그다음으로 중요했던 것은 제조사에서 검증한 하드웨어 구성과 잘 정리된 기술 문서였습니다.

이번 글에서는 제가 중고 엔터프라이즈 서버를 구매하게 된 이유, 실제로 처음 사용하면서 겪은 CPU 문제, 그리고 직접 운영하면서 느낀 장점과 단점을 이야기해 보려고 합니다.

## 1. 가장 큰 구매 이유는 가격이었다

솔직히 말씀드리면, 중고 엔터프라이즈 서버를 선택한 가장 큰 이유는 가성비였습니다.

저는 컴퓨터를 좋아하지만, 그렇다고 통장 잔고가 서버실인 부자는 아닙니다.

따라서 적은 비용으로 얼마나 많은 연산 자원을 확보할 수 있는지 중요하게 생각합니다.

새로운 서버를 구매하거나 최신 데스크톱을 조립하는 방법도 있지만, 비슷한 예산으로 얻을 수 있는 CPU 코어 수와 메모리 확장성을 비교하면 중고 서버가 매력적으로 느껴질 때가 있습니다.

특히 데이터센터에서 사용되던 장비는 기업에서 더 새로운 세대로 교체하면서 중고 시장에 나오는 경우가 있습니다.

당연히 최신 제품과 비교하면 전력 효율이나 단일 코어 성능에서 불리할 수 있습니다.

하지만 특정한 작업에서는 적은 가격으로 많은 CPU 코어를 확보할 수 있다는 점이 큰 장점이 됩니다.

### 지역 중고 장터에서 발견한 서버

제가 사용하는 서버 중 한 대도 캐나다에서 생활하면서 지역 중고 직거래 장터를 통해 구했습니다.

구매한 모델은 **Cisco UCS C220 M5**입니다.

1U 규격의 랙 서버로, 두 개의 Intel Xeon 프로세서를 장착할 수 있는 제품입니다.

구매 당시 가격은 제 기억으로 한화 약 8만 원 정도였습니다.

물론 구매 기록을 다시 확인하면 정확한 금액이나 환산 금액에는 차이가 있을 수 있습니다.

그래도 그 정도의 비용으로 기업용 서버 본체를 구할 수 있었다는 것이 제게는 상당히 매력적으로 다가왔습니다.

단순히 CPU 하나나 메인보드 하나를 구한 것이 아니라, 서버용 메인보드와 전원 공급 장치, 냉각 시스템, 섀시 등이 갖춰진 장비를 가져올 수 있었기 때문입니다.

일반적인 컴퓨터를 직접 조립하려면 메인보드, 파워서플라이, 케이스, 냉각 장치 등을 각각 선택해야 합니다.

하지만 중고 완제품 서버는 기본적인 하드웨어 구성이 이미 마련되어 있습니다.

물론 제가 구매한 장비가 처음부터 아무런 문제 없이 작동했던 것은 아닙니다.

오히려 구매하고 나서 예상하지 못했던 문제를 하나 겪었습니다.

그 이야기는 조금 뒤에서 설명하겠습니다.

여기서 말씀드리고 싶은 것은 약 8만 원이 장비를 가져오는 데 들어간 가격이라는 점입니다.

이후 CPU를 별도로 교체했기 때문에, 최종적으로 정상 가동하기까지 들어간 비용이 8만 원으로 끝난 것은 아닙니다.

그럼에도 당시에는 적은 초기 비용으로 기업용 서버의 기본 구성을 확보할 수 있다는 점이 구매를 결정한 가장 큰 이유였습니다.

## 2. 제조사에서 제공하는 정비 문서도 중요한 이유였다

가격 다음으로 중요하게 생각했던 부분은 기술 문서였습니다.

제가 엔터프라이즈 서버를 좋아하는 이유 중 하나는 문제가 발생했을 때 참고할 수 있는 자료가 잘 정리되어 있다는 점입니다.

물론 일반적인 데스크톱 메인보드에도 사용 설명서가 있습니다.

하지만 제가 구매한 Cisco UCS C220 M5는 기업에서 유지보수할 것을 전제로 만들어진 제품이다 보니, 설치와 부품 교체, 오류 진단에 관한 자료가 상당히 체계적으로 제공됩니다.

예를 들어 메모리를 어떤 순서로 장착해야 하는지, CPU를 교체할 때 어떤 도구가 필요한지, 방열판은 어떤 규격을 사용해야 하는지 등을 공식 문서에서 확인할 수 있습니다.

하드웨어 오류가 발생했을 때 참고할 수 있는 관리 기능도 있습니다.

저는 이 부분을 상당히 높게 평가합니다.

컴퓨터에 문제가 생기면 인터넷에서 비슷한 사례를 찾아보는 경우가 많습니다.

그런데 특정 제품의 정확한 오류 코드와 정비 절차가 문서로 남아 있다면 문제를 해결할 때 훨씬 명확한 출발점을 얻을 수 있습니다.

모든 문제를 문서만으로 해결할 수 있다는 뜻은 아닙니다.

그럼에도 어디서부터 확인해야 할지 알 수 있다는 것 자체가 제게는 큰 장점입니다.

실제로 저는 서버를 가져온 직후 이 장점을 경험했습니다.

## 3. CPU 오류로 부팅되지 않았던 서버

처음 서버를 가동했을 때 CPU와 관련된 문제가 계속 발생했습니다.

정상적인 부팅 과정으로 넘어가지 못했고, 오류가 반복됐습니다.

솔직히 처음에는 조금 당황스러웠습니다.

아무리 저렴하게 구한 서버라도 정상적으로 실행되지 않으면 사용할 수 없기 때문입니다.

그렇다고 바로 고장 난 장비라고 판단하고 포기할 생각은 없었습니다.

무엇이 문제인지 직접 확인하기로 했습니다.

### CIMC를 이용한 오류 확인

이때 도움이 된 것이 Cisco의 **CIMC(Cisco Integrated Management Controller)**였습니다.

CIMC는 서버의 하드웨어 상태를 관리하고 확인할 수 있는 기능입니다.

일반적인 운영체제가 정상적으로 부팅되지 않은 상태에서도 하드웨어 상태와 시스템 이벤트 등을 살펴볼 수 있습니다.

여기서 CIMC를 별도의 BIOS라고 생각하기 쉬운데, 정확히는 서버의 메인 CPU에서 실행되는 운영체제와 별도로 동작하는 관리 컨트롤러에 가깝습니다.

저는 CIMC에서 나타나는 오류 정보와 제조사 문서를 함께 살펴봤습니다.

단순히 CPU 오류가 발생했다는 사실만 확인하는 것이 아니라, 어떤 문제가 발생했는지 더 자세히 조사할 수 있었습니다.

이것이 좋았습니다.

일반적인 컴퓨터였다면 부팅 화면에 표시되는 오류나 메인보드의 상태 표시를 중심으로 확인했을 수도 있습니다.

하지만 이 서버에서는 관리 기능을 통해 추가적인 정보를 얻을 수 있었습니다.

물론 CIMC가 특정 부품의 고장을 항상 정확하게 확정해 주는 것은 아닙니다.

오류 코드가 같아도 실제 원인은 다를 수 있습니다.

그래도 문제를 추적할 근거가 있다는 것은 큰 도움이 됐습니다.

### 결국 CPU를 교체했다

오류 정보와 문서를 확인하며 여러 가능성을 살펴본 끝에, 당시 저는 CPU 자체에 문제가 있을 가능성이 높다고 판단했습니다.

그래서 정상 작동이 확인된 CPU를 별도로 구매했습니다.

그리고 기존 CPU를 교체한 뒤 서버를 다시 가동했습니다.

그 결과 정상적으로 POST 과정을 완료할 수 있었습니다.

POST는 Power-On Self-Test의 약자로, 전원을 켤 때 주요 하드웨어를 점검하는 초기 부팅 과정입니다.

이전에는 해당 과정에서 오류가 발생했지만, CPU를 교체한 이후에는 정상적으로 통과했습니다.

이 경험을 바탕으로 기존 CPU에 문제가 있었을 가능성이 높다고 생각합니다.

물론 별도의 정밀 분석 장비로 고장 원인을 완전히 밝혀낸 것은 아닙니다.

따라서 CPU 내부의 어느 부분이 고장 났는지까지 확정할 수는 없습니다.

그래도 실제로 CPU를 교체한 뒤 정상 부팅에 성공했다는 점은 분명합니다.

그리고 이 경험을 통해 제조사의 정비 문서와 관리 기능이 왜 중요한지 직접 느꼈습니다.

**문제가 생기지 않는 것도 중요하지만, 문제가 생겼을 때 무엇이 잘못됐는지 찾아볼 수 있다는 점 역시 중요하다고 생각합니다.**

## 4. 장점: 장시간 가동을 고려한 하드웨어

이제 하드웨어 자체의 장점도 이야기해 보겠습니다.

제가 마음에 들었던 부분은 장시간 가동을 고려해 설계된 전원 공급 장치와 메인보드입니다.

### 서버용 파워서플라이

엔터프라이즈 서버는 일반적으로 데이터센터나 기업 환경에서 장시간 가동할 것을 고려해 설계됩니다.

전원 공급 장치 역시 이러한 사용 환경에 맞춰 구성됩니다.

일부 서버에서는 전원 공급 장치를 이중으로 구성하거나, 지원되는 조건에서 서버를 종료하지 않고 교체할 수 있도록 만들기도 합니다.

저는 이런 설계 방향이 마음에 들었습니다.

특히 Cisco처럼 오랫동안 기업용 네트워크 및 서버 장비를 제조해 온 회사가 하나의 시스템으로 구성한 제품이라는 점도 신뢰를 느끼게 했습니다.

물론 브랜드가 유명하다고 해서 모든 부품의 품질이 자동으로 보장되는 것은 아닙니다.

중고 제품이라면 이미 상당한 시간 동안 사용했을 가능성도 있습니다.

또한 서버용 파워서플라이가 모든 데스크톱용 파워서플라이보다 무조건 안정적이라고 말할 근거는 없습니다.

저 역시 두 종류의 파워서플라이를 동일한 조건에서 장기간 비교한 것은 아닙니다.

다만 장시간 가동을 목표로 설계된 시스템을 비교적 저렴하게 확보할 수 있다는 점을 장점으로 봤습니다.

### 두 개의 Xeon CPU를 사용하는 메인보드

메인보드도 마찬가지입니다.

제가 사용하는 Cisco UCS C220 M5에는 **Intel Xeon Platinum 8160 두 개**를 장착했습니다.

이 프로세서는 각각 24코어 48스레드를 지원합니다.

두 개를 장착했으므로 전체적으로는 48코어 96스레드 구성이 됩니다.

그리고 Xeon Platinum 8160의 공식 TDP는 개당 150W입니다.

두 CPU의 TDP를 합하면 300W입니다.

여기서 주의할 점이 있습니다.

TDP는 냉각 시스템을 설계할 때 사용하는 열 설계 전력 관련 수치입니다. 따라서 CPU 두 개가 언제나 정확히 300W의 전기를 소비한다는 뜻은 아닙니다.

실제 소비전력은 작업 부하와 동작 상태에 따라 달라집니다.

그래도 CPU 두 개에 장시간 높은 부하를 주는 환경이라면 메인보드의 전원부와 냉각 시스템이 중요해집니다.

일반적인 데스크톱 컴퓨터에서도 높은 전력의 CPU를 사용하는 것은 가능합니다.

하지만 제가 원했던 것은 두 개의 서버용 CPU를 설치하고 장시간 연산 작업을 수행하는 용도를 고려해 설계된 시스템이었습니다.

그런 점에서 엔터프라이즈 서버의 메인보드와 냉각 구조가 마음에 들었습니다.

### 높은 TDP의 CPU까지 고려한 설계

Cisco UCS C220 M5의 공식 구성 자료를 살펴보면, 일부 구성에는 TDP가 205W인 Xeon 프로세서도 포함되어 있습니다.

따라서 제가 현재 사용하는 150W급 CPU보다 높은 TDP의 프로세서를 고려한 제품이라는 것을 알 수 있습니다.

물론 이 말이 아무 CPU나 장착해도 된다는 뜻은 아닙니다.

세대별 CPU 호환성, 펌웨어 버전, 방열판, 냉각 조건 등을 함께 확인해야 합니다.

그리고 이 부분도 제가 별도로 전원부의 전기적 안정성이나 내구성을 측정해서 얻은 결론은 아닙니다.

제조사의 지원 사양과 시스템 설계를 보고 장점이라고 판단한 것입니다.

그래도 제가 사용하려는 작업을 고려하면 충분히 마음에 드는 구성입니다.

### 24개의 메모리 슬롯

메모리 확장성도 장점입니다.

Cisco UCS C220 M5는 총 **24개의 DDR4 DIMM 슬롯**을 지원합니다.

CPU당 12개씩 할당되며, 각 CPU는 6개의 메모리 채널을 지원합니다.

메모리 채널은 CPU가 메모리와 데이터를 주고받는 경로라고 생각하면 됩니다.

일반적인 데스크톱보다 많은 메모리 슬롯을 사용할 수 있다는 점은 제게 상당히 매력적이었습니다.

서버를 사용하다 보면 처음 예상했던 것보다 더 많은 메모리가 필요해질 수 있기 때문입니다.

물론 슬롯이 많다고 아무 위치에나 메모리를 꽂으면 되는 것은 아닙니다.

CPU 구성과 메모리 채널에 따라 권장되는 장착 순서가 있으며, 사용 가능한 DIMM 종류에도 조건이 있습니다.

이 부분에서도 Cisco의 공식 문서를 참고할 수 있습니다.

저는 현재도 메모리 증설을 고려하고 있습니다.

따라서 메모리 슬롯이 많고 장착 규칙이 잘 정리되어 있다는 점도 중요한 장점이라고 생각합니다.

## 5. 단점: 1U 서버의 소음

장점이 많은 것은 사실이지만, 단점도 분명합니다.

가장 먼저 이야기하고 싶은 것은 소음입니다.

Cisco UCS C220 M5는 1U 규격의 랙 서버입니다.

1U는 약 44.45mm의 높이를 의미합니다.

일반적인 데스크톱 케이스와 비교하면 상당히 낮은 높이입니다.

이러한 구조는 서버 랙에서 공간을 적게 차지한다는 장점이 있습니다.

하지만 동시에 냉각팬의 크기에 제약이 생깁니다.

높이가 낮기 때문에 큰 팬을 사용하기 어렵고, 작은 팬을 높은 회전 속도로 작동시켜 필요한 공기 흐름을 확보하는 방식이 사용됩니다.

문제는 그때 발생하는 소음입니다.

일반적인 데스크톱 컴퓨터의 팬이 빠르게 돌아가는 소리와는 조금 다릅니다.

높은 부하가 걸리면 상당히 날카로운 고음역대의 소리가 발생합니다.

단순히 바람이 많이 나오는 소리라기보다는 귀를 찌르는 듯한 소리에 가깝습니다.

처음 접하는 분들은 생각보다 훨씬 시끄럽다고 느끼실 수도 있습니다.

저는 이 서버를 실제 생활 공간에서 사용하고 있습니다.

그리고 생각보다 이런 환경에서도 잘 생활하는 편입니다.

하지만 그렇다고 소음이 문제가 아니라는 뜻은 아닙니다.

조용한 방을 원하거나 서버와 같은 공간에서 오랜 시간을 보내야 한다면, 이 소음은 상당히 큰 단점일 수 있습니다.

따라서 중고 서버를 구매하려는 분들은 가격과 성능뿐 아니라 냉각팬의 소음도 꼭 고려하셨으면 좋겠습니다.

## 6. 단점: 전용 부품의 가격과 수급

두 번째 단점은 전용 부품입니다.

일반적인 데스크톱 컴퓨터는 비교적 표준화된 부품을 사용합니다.

메인보드나 파워서플라이, CPU 쿨러 등을 여러 제조사에서 구매할 수 있는 경우가 많습니다.

반면 엔터프라이즈 서버는 특정 제조사와 모델에 맞춰 설계된 부품을 사용하는 경우가 있습니다.

이런 부품은 고장 났을 때 대체품을 구하기 어렵거나 가격이 높을 수 있습니다.

물론 모든 부품이 비싼 것은 아닙니다.

하지만 특정 제품에서만 사용하는 부품을 구매하려고 하면 생각보다 비용이 많이 들기도 합니다.

### 일반 방열판과 고성능 방열판

제가 특히 가격 차이를 크게 느꼈던 것은 CPU 방열판이었습니다.

Cisco UCS C220 M5는 CPU의 TDP에 따라 사용하는 방열판을 구분합니다.

공식 정비 문서에서는 다음과 같이 안내하고 있습니다.

- **150W 이하 CPU:** 일반 방열판 `UCSC-HS-C220M5=`
- **150W 초과 CPU:** 고성능 방열판 `UCSC-HS2-C220M5=`

제가 현재 사용하는 Xeon Platinum 8160은 개당 TDP가 150W이므로 일반 방열판을 사용할 수 있는 범위에 들어갑니다.

그런데 나중에 더 높은 TDP의 CPU로 교체한다면 이야기가 달라집니다.

150W를 초과하는 CPU를 사용하려면 제조사가 지정한 고성능 방열판도 고려해야 합니다.

제가 당시 부품을 찾아봤을 때 일반 방열판은 개당 약 3만 원 정도였습니다.

반면 고성능 방열판은 배송비를 제외하고도 약 17만 원 정도인 매물을 확인했습니다.

물론 이 가격은 제가 확인한 당시의 매물 기준입니다.

판매처나 시기에 따라 달라질 수 있습니다.

그럼에도 제게는 상당히 비싸게 느껴졌습니다.

서버 본체를 한화 약 8만 원에 가져왔는데, CPU 방열판 하나가 그보다 비쌀 수 있기 때문입니다.

이런 상황을 보면 중고 엔터프라이즈 서버의 가격이 항상 저렴하다고 말하기는 어렵습니다.

**본체는 저렴하게 구매하더라도, 나중에 필요한 특정 전용 부품이 상당히 비쌀 수 있습니다.**

따라서 CPU나 메모리만 확인할 것이 아니라, 앞으로 교체해야 할 가능성이 있는 부품의 가격도 살펴볼 필요가 있습니다.

## 7. 단점: 일반적인 그래픽카드 사용이 어렵다

세 번째 단점은 PCIe 확장 카드입니다.

특히 그래픽카드를 사용할 때 제약이 생깁니다.

앞서 설명했듯이 Cisco UCS C220 M5는 1U 규격의 서버입니다.

내부 공간이 제한적이기 때문에 일반적인 데스크톱용 그래픽카드를 그대로 장착하기 어렵습니다.

물론 PCIe 슬롯 자체가 없는 것은 아닙니다.

공식 사양상 PCIe 확장 슬롯은 두 개이며, 그중 하나는 풀하이트 카드에 대응하는 슬롯입니다.

다만 높이만 맞는다고 장착이 가능한 것은 아닙니다.

카드의 길이와 두께, 방열판 크기, 보조 전원 공급 방식, 냉각 조건, PCIe 라이저 구조 등을 함께 고려해야 합니다.

일반적인 데스크톱용 그래픽카드는 냉각팬과 대형 방열판 때문에 상당한 공간을 차지하는 경우가 많습니다.

특히 두꺼운 그래픽카드라면 1U 서버에 설치하기 어려울 수 있습니다.

따라서 GPU를 사용하려면 서버에서 실제로 지원하는 모델과 장착 조건을 확인해야 합니다.

경우에 따라 로우 프로파일(Low Profile) 카드나 작은 전문 작업용 GPU를 고려할 수 있습니다.

하지만 그런 제품도 크기만 맞으면 무조건 호환된다고 볼 수는 없습니다.

다행히 저는 이 부분을 큰 단점으로 느끼지는 않았습니다.

이 서버를 당장 GPU 연산용으로 사용할 생각이 없기 때문입니다.

또한 일반적인 그래픽카드를 장착할 수 있는 워크스테이션도 별도로 가지고 있습니다.

그래서 GPU 작업이 필요하다면 다른 장비를 활용할 수 있습니다.

반대로 처음부터 GPU 서버를 만들 계획이라면, 제가 사용하는 것과 같은 1U 서버가 적절한 선택인지 신중하게 살펴봐야 할 것입니다.

## 8. 실제 운영 비용까지 고려해야 한다

마지막으로 생각해야 할 부분은 운영 비용입니다.

제가 구매한 서버는 초기 구매 비용만 보면 상당히 저렴했습니다.

하지만 서버를 운영하면서 들어가는 돈은 구매 가격이 전부가 아닙니다.

CPU나 메모리 같은 부품을 추가해야 할 수도 있고, 고장 난 부품을 교체해야 할 수도 있습니다.

그리고 전기 요금도 생각해야 합니다.

오래된 엔터프라이즈 서버는 최신 시스템보다 전력 효율이 떨어질 수 있습니다.

특히 장시간 높은 부하로 운영한다면 전력 소비가 상당할 수 있습니다.

제가 실제로 사용하는 서버들의 소비전력과 발열, 생활 공간에서 느끼는 소음에 관해서는 [「캐나다의 서버와 따뜻한 방」](/ko/blog/2026/10/my-infrastructure-in-canada/)에서 별도로 이야기했습니다.

여기서는 서버 구매와 유지보수 관점에서만 설명하려고 합니다.

저는 적은 비용으로 많은 연산 자원을 확보하는 것을 중요하게 생각합니다.

하지만 단순히 서버 본체 가격이 저렴하다는 사실만으로 가성비가 좋다고 단정할 수는 없습니다.

운영하는 동안 들어가는 전기 요금과 부품 교체 비용, 그리고 제가 직접 관리하는 데 사용하는 시간도 고려해야 합니다.

실제로 중고 서버를 구매하고 CPU 문제를 해결하면서 처음 예상했던 것보다 추가적인 비용과 시간이 필요했습니다.

이 부분도 중고 서버를 구매하는 과정의 일부라고 생각합니다.

## 9. 그렇다면 다시 구매할 생각이 있을까?

현재까지의 경험을 기준으로 생각하면, 저는 비슷한 조건이라면 중고 엔터프라이즈 서버를 다시 구매할 의향이 있습니다.

물론 모든 제품을 추천한다는 뜻은 아닙니다.

구매하려는 서버의 모델과 상태, 부품 수급 상황, 실제 필요한 성능을 함께 확인해야 합니다.

특히 중고 거래라면 정상 부팅 여부와 CPU, 메모리, 저장 장치 등의 상태를 가능한 한 확인하는 것이 좋습니다.

저처럼 구매 후에 CPU 문제를 해결해야 할 수도 있기 때문입니다.

또한 최신 데스크톱이나 미니 PC가 더 적합한 경우도 많습니다.

전기 요금과 소음이 중요하거나, 서버를 24시간 높은 부하로 운영할 필요가 없다면 오히려 최신의 저전력 시스템이 더 합리적일 수 있습니다.

하지만 제가 중요하게 생각하는 기준은 조금 다릅니다.

저는 하드웨어를 직접 관리하는 것을 좋아하고, 문제가 발생했을 때 원인을 찾아 해결하는 과정도 흥미롭게 느낍니다.

또한 적은 초기 비용으로 많은 CPU 코어와 메모리 확장성을 확보할 수 있다는 점을 높게 평가합니다.

이러한 기준에서는 중고 엔터프라이즈 서버가 제게 잘 맞았습니다.

## 마치며

이번 글에서는 제가 Cisco UCS C220 M5 중고 서버를 구매한 이유와 직접 사용하면서 느낀 장단점을 이야기했습니다.

가장 큰 구매 이유는 가격이었습니다.

한화 약 8만 원 정도에 서버 본체를 구할 수 있었고, 적은 초기 비용으로 기업용 서버의 하드웨어 구성을 확보할 수 있었습니다.

또한 Cisco에서 제공하는 기술 문서와 CIMC 관리 기능도 큰 장점이었습니다.

실제로 처음에는 CPU 문제로 정상 부팅이 되지 않았지만, 오류 정보를 확인하고 CPU를 교체하면서 문제를 해결할 수 있었습니다.

하드웨어가 처음부터 완벽하게 작동하지는 않았지만, 오히려 이 경험을 통해 정비 문서가 잘 갖춰진 제품의 장점을 느꼈습니다.

장시간 운영을 고려한 전원 공급 및 냉각 구조, 두 개의 CPU를 사용할 수 있는 메인보드, 24개의 메모리 슬롯도 만족스러운 부분이었습니다.

반면 단점도 확실했습니다.

1U 서버 특유의 날카로운 소음이 있었고, 특정 전용 부품은 가격이 상당히 높았습니다.

일반적인 그래픽카드를 사용하기 어렵다는 제약도 있었습니다.

그럼에도 현재 제 용도에서는 이런 단점을 감수할 만하다고 생각합니다.

물론 중고 엔터프라이즈 서버가 모든 사람에게 좋은 선택이라고 생각하지는 않습니다.

조용하고 전력 효율이 좋은 컴퓨터가 필요하다면 최신 데스크톱이나 미니 PC가 더 적합할 수도 있습니다.

하지만 저처럼 연산 자원을 많이 활용하고, 서버를 직접 관리하는 과정도 즐기며, 중고 부품을 찾아보는 수고를 감수할 수 있다면 상당히 흥미로운 선택이 될 수 있다고 생각합니다.

앞으로 부품을 업그레이드하거나 새로운 문제가 발생한다면, 그 과정도 다시 기록해 보려고 합니다.

<!-- lang:en -->
## Why I Bought a Used Enterprise Server for About 80,000 Won: Advantages and Disadvantages

I currently operate several servers at home.

As I mentioned in [“Servers in Canada and a Warm Room”](/en/blog/2026/10/my-infrastructure-in-canada/), some of them are enterprise servers originally designed for data centers rather than ordinary desktop PCs.

But is there any reason for an individual to choose enterprise hardware for home use?

I could build a desktop, and even a mini PC can run many kinds of services these days.

Enterprise servers can be large, noisy, and power-hungry.

Nevertheless, I chose a used enterprise server.

The most important reason was price. The next was a manufacturer-designed hardware configuration with detailed maintenance documentation.

In this post, I want to explain why I bought this server, how I dealt with its initial CPU problem, and the advantages and drawbacks I have noticed while operating it.

## 1. Price was the biggest reason

Frankly, the main reason I bought a used enterprise server was value for money.

I like computers, but I am not rich enough for my bank balance to resemble a server room.

That makes the amount of computing capacity I can obtain for a limited budget important to me.

Buying a new server or building a modern desktop is possible, but older enterprise machines can be attractive if I compare the CPU core count and memory expansion available at similar prices.

Equipment used in data centers sometimes appears on the secondhand market when companies move to newer generations.

Such systems may be behind modern hardware in power efficiency or single-core performance.

But for some workloads, a large number of CPU cores at a low purchase price is an appealing trade-off.

### A server from a local secondhand marketplace

I found one of my servers through a local person-to-person marketplace while living in Canada.

It is a **Cisco UCS C220 M5**, a 1U rack server that supports two Intel Xeon processors.

If I remember correctly, I paid the equivalent of about 80,000 Korean won.

The exact amount and converted value may differ slightly when I check the original purchase record.

Still, acquiring an enterprise server for roughly that amount seemed like a great opportunity.

I was getting more than a CPU or motherboard. The chassis, power delivery, cooling system, and server motherboard were already assembled.

When building a regular PC, I would normally select the case, motherboard, power supply, and cooling equipment separately.

A used complete server comes with that basic hardware configuration already in place.

Unfortunately, the machine did not work perfectly from the beginning. I encountered an unexpected problem soon after bringing it home.

I will discuss that shortly.

For now, I want to emphasize that about 80,000 won was the cost of acquiring the server itself.

I later replaced a CPU, so the total cost of getting it running was higher.

Even so, the low initial price was the biggest factor in my decision.

## 2. The manufacturer's maintenance documentation mattered as well

After price, the most important consideration was documentation.

One thing I like about enterprise servers is that the information needed to investigate problems is often well organized.

Ordinary desktop motherboards have manuals too, of course.

But the Cisco UCS C220 M5 was designed for enterprise maintenance, and Cisco provides systematic information on installation, component replacement, and troubleshooting.

I can consult the official material to find the correct memory installation order, tools needed for CPU replacement, and compatible heatsink specifications.

There are also management features intended to help diagnose hardware problems.

I appreciate that.

When something goes wrong with a computer, I often search online for other people with similar problems.

If a product also has documented error information and service procedures, I have a much clearer place to begin.

That does not mean documentation can solve every hardware failure.

But even knowing what to inspect first is a major advantage.

I experienced this shortly after buying the server.

## 3. The server would not boot because of a CPU-related error

The first time I powered on the server, CPU-related errors kept appearing.

It would not complete the normal boot process.

I was a little worried.

A cheap server is not much use if it cannot boot.

Still, I did not want to immediately declare the entire system broken and give up.

I decided to investigate.

### Checking errors with CIMC

Cisco's **CIMC (Cisco Integrated Management Controller)** was particularly useful.

CIMC provides a way to monitor and manage the server's hardware.

I can inspect hardware status and system events even when the normal operating system is not booting properly.

It may sound like a second BIOS, but it is more accurately a management controller operating separately from the host operating system.

I checked CIMC's error information and compared it with Cisco's documentation.

That let me investigate more than just the fact that a CPU error had occurred.

I appreciated being able to see additional diagnostic details.

On an ordinary computer, I might have relied mainly on boot messages and motherboard status indicators.

Here, the management controller gave me more information to work with.

CIMC cannot always identify a failed component conclusively, of course, and the same error can have different causes.

But having a basis for troubleshooting made a real difference.

### I eventually replaced the CPU

After looking through the errors and considering possible explanations, I suspected the CPU itself.

I bought another CPU that had been confirmed to work and installed it in place of the original.

This time, the server completed POST successfully.

POST stands for Power-On Self-Test, the initial hardware checks performed when a computer starts.

Previously the system had failed during startup. After the CPU replacement, it passed that stage.

This makes me think the original CPU was probably faulty.

I did not perform a full component-level failure analysis with specialized equipment, so I cannot say precisely which part of the CPU failed.

But replacing it did resolve the boot issue.

The experience taught me firsthand why maintenance documentation and hardware management tools are so useful.

**It matters that a computer works, but it also matters that I can investigate what went wrong when it does not.**

## 4. Advantage: hardware designed for sustained operation

Beyond price and documentation, I like that this system was designed with long-running workloads in mind.

In particular, its power supply arrangement and motherboard design appealed to me.

### Server power supplies

Enterprise servers are generally designed with data-center or business environments in mind, including extended periods of operation.

The power system is built around those requirements.

Some servers support redundant power supplies, and under supported conditions a failed supply can sometimes be replaced without shutting down.

That design approach interests me.

I also liked that I was purchasing a complete system designed by Cisco, a company with long experience in enterprise networking and server hardware.

A familiar brand is not a guarantee that every component is excellent, however.

Used equipment may already have been operated for many years.

I have no controlled evidence that every server power supply is more reliable than every desktop power supply, either.

I have not compared them in a long-duration test under identical conditions.

The advantage for me was obtaining a complete system designed for extended operation at a relatively low cost.

### A motherboard for two Xeon processors

The motherboard is another reason I like the machine.

My Cisco UCS C220 M5 has **two Intel Xeon Platinum 8160 processors**.

Each has 24 cores and 48 threads, for a combined configuration of 48 cores and 96 threads.

The official TDP of each processor is 150W.

Adding those two thermal design ratings gives 300W.

It is important to distinguish TDP from measured electricity consumption.

TDP is a figure related to thermal design and cooling requirements. It does not mean the two CPUs constantly consume exactly 300W.

Actual power use varies with workload and operating conditions.

Nevertheless, sustained heavy workloads across two processors make motherboard power delivery and cooling especially important.

High-power CPUs can be used in ordinary desktops as well.

But I specifically wanted a system designed around two server CPUs running computational workloads for extended periods.

That is why the enterprise motherboard and cooling arrangement appealed to me.

### Support for some higher-TDP processors

Cisco's official configuration documents for the UCS C220 M5 include some Xeon configurations rated at 205W TDP.

So the system was also designed to accommodate some processors with a higher rating than my current 150W CPUs.

This certainly does not mean that any processor can be installed.

I still have to check CPU generation, compatibility, firmware, heatsink, and cooling requirements.

And I did not arrive at this conclusion by measuring the durability or electrical stability of the motherboard myself.

I am evaluating what the manufacturer explicitly supports.

For the workloads I want to run, the configuration is a good fit.

### Twenty-four memory slots

Memory expansion is another advantage.

The Cisco UCS C220 M5 has **24 DDR4 DIMM slots** in total.

There are 12 associated with each processor, and each CPU supports six memory channels.

A memory channel can be thought of as a path used to exchange data between the CPU and RAM.

Having so many slots compared with a typical desktop is appealing to me.

My RAM requirements may grow beyond what I originally expected.

Of course, the presence of many slots does not mean I can insert memory modules in any order.

Recommended population rules depend on the CPU and memory-channel configuration, and supported DIMM types have their own requirements.

Cisco's official documentation is helpful here too.

I am still considering adding more RAM, so both the available slots and the well-documented installation rules are useful.

## 5. Disadvantage: noise from a 1U server

The benefits are real, but so are the disadvantages.

The first is noise.

The Cisco UCS C220 M5 is a 1U rack server.

One rack unit is approximately 44.45 mm high, considerably shorter than a conventional desktop case.

This saves rack space but limits the size of the cooling fans.

Small fans must often run at high RPM to move enough air through a 1U chassis.

The resulting noise is the problem.

It does not sound quite like an ordinary desktop fan running fast.

Under heavy load, the server can produce a sharp, high-pitched whine.

To me, it sounds less like flowing air and more like something piercing my ears.

People who have never used a rack server may be surprised by the volume.

I keep mine in my living space and experience that noise directly.

I have found that I can live with it better than expected, but that does not make the noise disappear.

For anyone who wants a quiet room, or needs to spend hours next to the server, this can be a significant drawback.

I would therefore recommend considering fan noise and chassis size along with price and performance.

## 6. Disadvantage: expensive, difficult-to-source proprietary parts

The second downside is obtaining parts.

Desktop PCs use many standardized components, so it is often possible to buy motherboards, power supplies, and CPU coolers from various manufacturers.

Enterprise servers sometimes use components made specifically for a vendor or model.

Replacement parts may be difficult to locate or surprisingly expensive.

Not every part is expensive, but the price of a model-specific component can be unexpected.

### Standard versus high-performance CPU heatsinks

The CPU heatsinks were a particularly striking example.

The Cisco UCS C220 M5 specifies different heatsinks depending on the processor's TDP.

According to the maintenance documentation:

- **CPU with TDP at or below 150W:** standard heatsink `UCSC-HS-C220M5=`
- **CPU with TDP above 150W:** high-performance heatsink `UCSC-HS2-C220M5=`

My Xeon Platinum 8160 processors each have a 150W TDP, placing them within the range for the standard heatsink.

But upgrading to a processor with a higher TDP would change that.

I would have to consider the high-performance heatsink specified by Cisco.

When I checked secondhand listings, I found standard heatsinks for around 30,000 Korean won each.

High-performance versions were listed for around 170,000 won before shipping.

Those were the prices I saw at the time, not permanent or universal market prices.

Nevertheless, they felt expensive.

The entire server cost me about 80,000 won, yet one specialized heatsink could cost more than the machine itself.

This is why buying an older enterprise server is not necessarily cheap overall.

**The chassis may be inexpensive, while a specialized part needed for an upgrade or repair can be costly.**

I think prospective buyers should check parts availability and upgrade costs, not just CPU and memory specifications.

## 7. Disadvantage: using ordinary graphics cards is difficult

A third limitation concerns PCIe expansion cards, especially GPUs.

As mentioned earlier, the Cisco UCS C220 M5 uses a 1U chassis.

Its limited internal space makes installing an ordinary desktop graphics card difficult.

It does have PCIe slots.

The official specification lists two PCIe expansion slots, one of which can accommodate a full-height card.

But height alone is not enough to establish compatibility.

Card length, thickness, heatsink dimensions, auxiliary power, cooling, and the PCIe riser layout also matter.

Many ordinary graphics cards have large fans and heatsinks that occupy substantial space.

Thick GPU cards in particular may be impossible to fit into a 1U chassis.

To use a GPU, I would need to check which models and installation arrangements the server actually supports.

Low-profile graphics cards or smaller professional GPUs might be candidates in some cases.

But fitting physically does not automatically mean a card is supported.

Fortunately, this is not a major problem for me.

I do not currently plan to turn this server into a GPU computing machine.

I also have a separate workstation that can accommodate ordinary desktop graphics cards.

I can use that computer if I need GPU capacity.

Someone planning to build a GPU server from the outset, however, should examine the limitations of a 1U chassis very carefully.

## 8. Operating costs also matter

The last consideration is operating cost.

My server was very inexpensive to purchase.

But the initial price is not the whole cost of running it.

I may need to add CPU or memory components, and failed parts may eventually require replacement.

Electricity also costs money.

Older enterprise servers can be less power-efficient than modern machines.

Long periods under heavy load may therefore result in substantial energy consumption.

I discussed my servers' measured power draw, heat, and the experience of living alongside them in [“Servers in Canada and a Warm Room”](/en/blog/2026/10/my-infrastructure-in-canada/).

Here, I want to focus on purchasing and maintaining the equipment.

I value obtaining significant computing capacity with a limited budget.

But a cheap purchase price is not enough on its own to prove that the system offers good value.

Electricity, replacement parts, and the time I spend maintaining it all need to be considered.

Resolving the CPU issue after buying the server required more time and money than I initially expected.

That is part of what purchasing used equipment can involve.

## 9. Would I buy another used enterprise server?

Based on my experience, I would consider buying another used enterprise server if the conditions were similar.

That does not mean I would recommend every machine.

I would need to look at the model, condition, parts availability, and whether its performance matches my intended workloads.

When buying secondhand hardware, it is worth checking that it boots and confirming the condition of its CPU, memory, and storage whenever possible.

Otherwise, you might end up troubleshooting a problem after the purchase, as I did.

A modern desktop or mini PC will also be more suitable in many situations.

If electricity costs and noise are important, or there is no reason to run a server under high load around the clock, a modern low-power system may be more rational.

My own priorities are a little different.

I enjoy managing hardware and find the process of investigating faults interesting.

I also value having many CPU cores and room for memory expansion at a low initial cost.

For those reasons, this used enterprise server has been a good fit for me.

## Closing thoughts

This post explains why I bought a used Cisco UCS C220 M5 and what I have learned from using it.

The main reason was price.

For about 80,000 Korean won, I obtained a complete enterprise server chassis and much of the hardware I needed.

Cisco's technical documentation and the CIMC management features were also major advantages.

The server initially failed to boot because of a suspected CPU issue. I investigated the errors, replaced the processor, and got it working.

It did not work perfectly from the beginning, but the experience made me appreciate having thorough service documentation.

I also like the power and cooling design intended for sustained operation, the dual-CPU motherboard, and the 24 memory slots.

The shortcomings are clear too: sharp fan noise from the 1U chassis, costly specialized parts, and difficulty using ordinary graphics cards.

For my needs, I consider these trade-offs acceptable.

I do not think used enterprise servers are right for everyone.

A modern desktop or mini PC may be a better choice for someone who needs a quiet, power-efficient computer.

But for someone like me who uses substantial computing resources, enjoys maintaining servers, and is willing to search for used parts, an older enterprise server can be an interesting choice.

If I upgrade components or encounter new problems, I would like to document those experiences as well.

<!-- lang:ja -->
## 約8万ウォンで購入した中古エンタープライズサーバー：選んだ理由と長所・短所

私は現在、自宅で複数のサーバーを運用しています。

以前の記事[「カナダのサーバーと暖かい部屋」](/ja/blog/2026/10/my-infrastructure-in-canada/)でも紹介しましたが、使用している機器の中には一般的なデスクトップPCではなく、データセンターで使われていたエンタープライズサーバーもあります。

そもそも個人が自宅で使うために、わざわざ企業向けサーバーを選ぶ必要はあるのでしょうか。

普通のデスクトップを自作することもできますし、最近は小さなミニPCでも多くのサービスを運用できます。

エンタープライズサーバーは大きく、騒音もあり、電力消費が多い場合もあります。

それでも私は中古のエンタープライズサーバーを選びました。

一番の理由は価格です。次に重要だったのは、メーカーがシステムとして設計したハードウェアと、整備のための豊富な技術資料でした。

今回は購入理由、最初に遭遇したCPUの問題、実際に運用して感じた長所と短所を書いてみます。

## 1. 一番の理由は価格だった

率直に言えば、私が中古のエンタープライズサーバーを選んだ一番の理由はコストパフォーマンスです。

私はコンピューターが好きですが、銀行口座の残高までサーバールームのように豊富なわけではありません。

限られた予算でどれだけの計算資源を確保できるかを重視しています。

新しいサーバーや最新のデスクトップを購入する方法もあります。しかし、同じような予算で得られるCPUコア数やメモリ拡張性を考えると、中古サーバーが魅力的に見えることがあります。

企業がデータセンターの機器を新しい世代へ更新すると、古い機器が中古市場に流通することがあります。

もちろん最新の製品と比べれば、電力効率やシングルコア性能で不利かもしれません。

それでも用途によっては、低価格で多数のCPUコアを確保できる点が大きな利点です。

### 地元の中古売買サイトで見つけたサーバー

私はカナダで生活する中、地元の個人間売買サイトでサーバーを一台購入しました。

モデルは**Cisco UCS C220 M5**です。

Intel Xeonプロセッサーを2基搭載できる1Uラックサーバーです。

購入価格は記憶では韓国ウォンに換算して約8万ウォンでした。

購入記録を確認すれば、正確な額や換算額には多少の違いがあるかもしれません。

それでも、その程度の価格で企業向けサーバー本体を入手できたことは魅力的でした。

CPUやマザーボードだけではなく、サーバー用マザーボード、電源装置、冷却機構、シャーシなどがそろった機器を購入できたからです。

普通のPCを自作する場合、それぞれの部品を選ぶ必要があります。

中古の完成品サーバーなら、その基本構成が最初からあります。

ただし、購入した機器が最初から問題なく動いたわけではありません。

持ち帰った後、予想外の問題が発生しました。

それについては後ほど説明します。

約8万ウォンはあくまで本体の購入価格です。

後でCPUを別途交換したため、正常稼働までの総費用はそれより高くなりました。

それでも、少ない初期費用で企業向けサーバーの土台を確保できることが購入の決め手でした。

## 2. メーカーの整備資料も重要だった

価格の次に重視したのは技術文書です。

私がエンタープライズサーバーを好む理由の一つは、問題が起きたときに参照できる資料がよく整理されていることです。

もちろん、一般的なデスクトップ用マザーボードにもマニュアルはあります。

しかしCisco UCS C220 M5は企業での保守を想定した製品で、設置や部品交換、障害診断について体系的な資料があります。

メモリの装着順序、CPU交換時に必要な道具、ヒートシンクの対応規格などを公式文書で確認できます。

ハードウェアエラーの診断に役立つ管理機能もあります。

私はこの点を高く評価しています。

コンピューターに問題が発生すると、インターネットで似た事例を探すことがよくあります。

その製品のエラー情報や整備手順が文書化されていれば、調査の出発点がはっきりします。

もちろん、すべての問題をマニュアルだけで解決できるわけではありません。

それでも、何を最初に調べればよいかわかることは長所です。

私は購入直後にその利点を実感しました。

## 3. CPUエラーで起動できなかったサーバー

最初に電源を入れたとき、CPUに関連するエラーが繰り返し発生しました。

正常な起動処理に進めなかったのです。

正直、最初は少し困りました。

どれほど安いサーバーでも、正常に動かなければ使えません。

それでも機器全体が故障したと決めつけて諦めたくはありませんでした。

原因を調べることにしました。

### CIMCでエラーを確認する

そこで役立ったのがCiscoの**CIMC（Cisco Integrated Management Controller）**です。

CIMCはサーバーのハードウェア状態を確認・管理するための機能です。

通常のOSが起動できない場合でも、ハードウェアの状態やシステムイベントを確認できます。

「別のBIOS」のように思えるかもしれませんが、正確にはホストOSとは別に動作する管理コントローラーです。

私はCIMCで表示されたエラー情報とメーカーの文書を照らし合わせて調査しました。

単にCPUエラーが出たというだけでなく、状況をより詳しく確認できました。

これが便利でした。

一般的なPCなら起動画面のエラーやマザーボードの表示を中心に調べていたかもしれません。

このサーバーでは管理機能から追加情報を得られました。

ただし、CIMCが必ず故障した部品を特定してくれるわけではありません。

同じエラーでも別の原因が考えられます。

それでも調査の根拠が得られることは大きな助けでした。

### 最終的にCPUを交換した

エラー情報と文書を調べた結果、私はCPU自体に問題がある可能性が高いと判断しました。

そこで正常動作が確認されたCPUを別途購入し、元のCPUと交換しました。

すると正常にPOSTを完了できました。

POSTはPower-On Self-Testの略で、電源投入時に主要なハードウェアを確認する初期処理です。

以前は起動時にエラーが出ていましたが、CPU交換後にはこの段階を通過できました。

そのため、元のCPUに問題があった可能性は高いと考えています。

ただし、専門的な検査装置で故障原因を完全に特定したわけではありません。

CPU内部のどこが故障していたかまで断定はできません。

それでもCPU交換後に正常起動したことは確かです。

この経験から、整備資料と管理機能の価値を直接実感しました。

**問題が起きないことも大切ですが、問題が起きたときに原因を調べられることも重要だと思います。**

## 4. 長所：長時間稼働を考慮したハードウェア

価格と資料以外にも長所があります。

私が気に入ったのは、長時間稼働を想定した電源装置とマザーボードの構成です。

### サーバー用電源装置

エンタープライズサーバーは一般的に、データセンターなどで長時間稼働することを考慮して設計されます。

電源装置もその用途に合わせた構成です。

機種によっては電源を冗長化したり、一定の条件で稼働を止めずに交換できたりします。

私はその設計方針が気に入りました。

企業向けネットワーク機器とサーバーを長年製造しているCiscoが、全体を一つのシステムとして設計していることにも安心感がありました。

ただし有名なメーカーだからといって、すべての部品が優れていると保証されるわけではありません。

中古品ならすでに長期間使われていた可能性もあります。

サーバー用電源があらゆるデスクトップ用電源より安定しているというデータも、私にはありません。

両者を同じ条件で長期間比較したわけではないからです。

それでも長時間稼働を意図したシステムを比較的安く入手できる点は長所でした。

### Xeon CPUを2基搭載するマザーボード

マザーボードも同様です。

私のCisco UCS C220 M5には**Intel Xeon Platinum 8160を2基**搭載しています。

このCPUは1基あたり24コア48スレッドで、2基では合計48コア96スレッドになります。

公式TDPは1基あたり150Wです。

2基分のTDPを合計すると300Wになります。

ただし、これは実際の消費電力とは区別する必要があります。

TDPは冷却設計に関係する熱設計電力であり、CPU2基が常に正確に300Wを消費するという意味ではありません。

実際の消費電力は負荷と動作状態によって変わります。

それでもCPU2基に長時間高い負荷をかけるなら、マザーボードの電源回路と冷却機構は重要です。

普通のデスクトップでも高電力のCPUを使うことはできます。

しかし私が欲しかったのは、サーバー用CPUを2基使った長時間の計算処理を想定したシステムでした。

だから企業向けマザーボードと冷却構造が気に入りました。

### より高いTDPのCPUを考慮した構成

Cisco UCS C220 M5の公式構成資料には、TDPが205WのXeonプロセッサーを含む構成もあります。

つまり、現在使用している150WのCPUより高いTDPの一部製品も想定されています。

ただし、どんなCPUでも取り付けられるわけではありません。

CPUの世代、互換性、ファームウェア、ヒートシンク、冷却条件を調べる必要があります。

また、私自身が電源回路の安定性や耐久性を測定した結果でもありません。

メーカーのサポート仕様と設計から評価している長所です。

それでも、私の用途には十分魅力的です。

### 24個のメモリスロット

メモリの拡張性も長所です。

Cisco UCS C220 M5は合計**24個のDDR4 DIMMスロット**を備えています。

CPU1基あたり12個で、それぞれのCPUが6つのメモリチャネルをサポートします。

メモリチャネルはCPUとRAMの間でデータをやり取りする経路と考えるとわかりやすいでしょう。

一般的なデスクトップより多くのスロットがあることは、将来必要なメモリが増えるかもしれない私にとって魅力です。

もちろん、好きなスロットに自由にメモリを挿してよいわけではありません。

CPU構成やチャネルに応じた推奨装着順序があり、対応するDIMMの種類にも条件があります。

この点でもCiscoの公式文書が参考になります。

私は今もメモリ増設を考えています。

スロット数が多く装着規則も明確な点は重要な利点です。

## 5. 短所：1Uサーバーの騒音

長所は多いものの、短所もあります。

まずは騒音です。

Cisco UCS C220 M5は1U規格のラックサーバーです。

1Uは約44.45mmの高さを意味します。

一般的なデスクトップケースと比べると、かなり薄い構造です。

ラックのスペースを節約できる一方で、大型の冷却ファンを使いにくくなります。

そのため小さなファンを高い回転数で動かし、必要な風量を確保する場合が多くあります。

問題はその音です。

一般的なデスクトップのファンが速く回る音とは少し違います。

高負荷時には鋭い高音が発生します。

私には単なる風切り音というより、耳を刺すような音に感じられます。

ラックサーバーを初めて使う人は予想以上の騒音に驚くかもしれません。

私はこのサーバーを実際の生活空間で使っています。

意外にもその環境で普通に生活できていますが、音が消えるわけではありません。

静かな部屋が必要な人や、同じ空間で長時間過ごす人にとっては大きな欠点になります。

中古サーバーの購入時は価格や性能だけでなく、シャーシの規格とファンの騒音も考えるべきです。

## 6. 短所：専用部品の価格と入手しにくさ

二つ目の短所は部品の調達です。

一般的なデスクトップは比較的標準化された部品を使っています。

マザーボードや電源、CPUクーラーを複数のメーカーから選べる場合が多くあります。

一方、エンタープライズサーバーでは特定のメーカーや機種専用に設計された部品を使うことがあります。

交換品が見つかりにくかったり、値段が高かったりします。

すべての部品が高いわけではありませんが、機種専用品を探すと予想外の費用がかかることがあります。

### 標準ヒートシンクと高性能ヒートシンク

私が特に価格差を感じたのはCPUのヒートシンクでした。

Cisco UCS C220 M5はCPUのTDPによって使用するヒートシンクを区別しています。

公式整備資料では次のように指定されています。

- **TDPが150W以下のCPU：** 標準ヒートシンク `UCSC-HS-C220M5=`
- **TDPが150Wを超えるCPU：** 高性能ヒートシンク `UCSC-HS2-C220M5=`

私のXeon Platinum 8160は1基あたり150Wなので、標準ヒートシンクの対象範囲です。

しかし、将来さらに高いTDPのCPUへ交換すれば事情が変わります。

150Wを超えるCPUではメーカー指定の高性能ヒートシンクも必要になります。

当時部品を探すと、標準ヒートシンクは1個約3万韓国ウォンで販売されていました。

高性能ヒートシンクには、送料を除いても約17万ウォンの出品がありました。

これは当時私が見た価格であり、常に同じ相場というわけではありません。

それでも高いと感じました。

サーバー本体は約8万ウォンで購入したのに、専用ヒートシンク1個が本体より高くなることもあるのです。

中古サーバーがいつも安いとは限らない理由の一つです。

**本体が安くても、後から必要になる専用部品には高い費用がかかる可能性があります。**

CPUやメモリだけでなく、修理とアップグレードに必要な部品の価格も事前に調べるべきだと思います。

## 7. 短所：一般的なグラフィックカードを使いにくい

三つ目の制限はPCIe拡張カード、特にGPUです。

Cisco UCS C220 M5は1Uのため、内部スペースが限られています。

一般的なデスクトップ用グラフィックカードをそのまま搭載するのは難しい場合があります。

PCIeスロットがないわけではありません。

公式仕様ではPCIe拡張スロットが2つあり、うち1つはフルハイトカードに対応します。

ただし高さが合うだけでは不十分です。

カードの長さ、厚さ、ヒートシンクの大きさ、補助電源、冷却、PCIeライザーの構造も考える必要があります。

一般的なGPUには大型のファンやヒートシンクがあり、多くのスペースを占めます。

特に厚いGPUは1Uシャーシに入らない可能性があります。

GPUを使う場合は、実際にサポートされるモデルと搭載条件を確認する必要があります。

ロープロファイルカードや小さな業務用GPUが候補になる場合もあります。

それでもサイズだけで互換性が保証されるわけではありません。

幸い、私にはあまり大きな問題ではありません。

今のところこのサーバーをGPU計算用にするつもりはないからです。

普通のグラフィックカードを搭載できるワークステーションも別にあります。

GPUが必要ならそちらを使えます。

反対に、最初からGPUサーバーを作りたい人は1Uという制約を慎重に検討するべきでしょう。

## 8. 実際の運用費用も考える

最後は運用費用です。

購入価格だけを見ると、このサーバーはとても安価でした。

しかし総費用は本体の価格だけではありません。

CPUやメモリの追加、故障部品の交換が必要になることもあります。

電気代も考えなければなりません。

古いエンタープライズサーバーは最新のシステムより電力効率が低い場合があります。

特に長時間高負荷で運用すれば、多くの電力を消費する可能性があります。

私のサーバーの実際の消費電力や発熱、生活空間で感じる騒音については[「カナダのサーバーと暖かい部屋」](/ja/blog/2026/10/my-infrastructure-in-canada/)で別に紹介しました。

ここでは購入と保守の費用に絞ります。

私は少ない予算で多くの計算資源を得ることを重視しています。

しかし本体価格が安いだけでコストパフォーマンスがよいとは断定できません。

電気代、交換部品、自分が保守に費やす時間も含めて考える必要があります。

実際、購入後のCPU問題の解決には予想以上の費用と時間がかかりました。

それも中古機器を使う現実の一部です。

## 9. また買うつもりはあるか？

これまでの経験を考えると、似た条件なら中古エンタープライズサーバーをまた購入するかもしれません。

もちろん、あらゆる機種をおすすめするわけではありません。

購入するモデルと状態、部品の入手性、用途に必要な性能を確認する必要があります。

中古取引では可能な範囲で正常起動するか、CPU、メモリ、ストレージの状態を確認したほうがよいでしょう。

私のように購入後にCPUの問題を解決する必要が出るかもしれません。

また最新のデスクトップやミニPCのほうが適している場合も多くあります。

電気代や騒音が重要だったり、常に高負荷で稼働させる必要がなかったりするなら、最新の省電力システムのほうが合理的かもしれません。

ただし、私の基準は少し違います。

自分でハードウェアを管理するのが好きで、問題が起きたときに原因を調べることも面白いと感じます。

低い初期費用で多くのCPUコアとメモリ拡張性を確保できる点も評価しています。

その意味では、中古エンタープライズサーバーが私に合っていました。

## おわりに

今回は中古のCisco UCS C220 M5を購入した理由と、実際に使って感じた長所と短所を紹介しました。

最大の理由は価格です。

約8万韓国ウォンでサーバー本体を入手でき、少ない初期費用で企業向けハードウェアの基本構成を確保できました。

Ciscoの技術資料とCIMCの管理機能も大きな長所でした。

最初はCPUに関連する問題で正常に起動できませんでしたが、エラーを調べてCPUを交換したことで解決できました。

初めから完璧に動いたわけではありませんが、かえって整備資料の充実した機器のよさを実感しました。

長時間稼働を考慮した電源と冷却構造、デュアルCPU対応のマザーボード、24個のメモリスロットにも満足しています。

一方、1U特有の鋭いファン音、高価な専用部品、普通のグラフィックカードを使いにくい構造などの短所もあります。

それでも現在の用途では、こうした制約を受け入れられます。

中古エンタープライズサーバーがすべての人に向いているとは思いません。

静かで電力効率のよいPCが必要なら、最新のデスクトップやミニPCのほうが適しているかもしれません。

しかし私のように多くの計算資源を使い、自分で保守する作業も楽しみ、中古部品を探す手間を受け入れられるなら、面白い選択肢だと思います。

今後部品をアップグレードしたり新しい問題が発生したりすれば、その過程も記録したいです。
