---
title: "포트 포워딩 없이 집 서버를 외부에 공개하는 방법"
title_en: "Exposing My Home Server Without Port Forwarding"
title_ja: "ポート転送を使わずに自宅サーバーを外部公開する方法"
published_at: "2026-10-15T02:25:26-06:00"
description: "Oracle Cloud 무료 VPS, Tailscale 암호화 터널, 리버스 프록시를 연결해 집 서버를 외부에 공개하는 방법과 포트 포워딩 제한 환경에서의 활용법을 소개합니다."
description_en: "How I use an Oracle Cloud VPS, a Tailscale tunnel, and a reverse proxy to make home-hosted services public without opening ports on my home router."
description_ja: "Oracle CloudのVPS、Tailscaleの暗号化トンネル、リバースプロキシで自宅サーバーを公開する構成と、ポート転送が難しい環境での活用例を紹介します。"
---

<!-- lang:ko -->
## 포트 포워딩 없이 집 서버를 외부에 공개하는 방법

저는 집에서 여러 대의 서버를 운영하고 있습니다.

서버를 직접 구성하고 운영하는 것을 좋아하다 보니, 자연스럽게 외부에서도 접근할 수 있는 서비스를 만들어 보고 싶었습니다.

그런데 집에 있는 서버를 인터넷에 공개하려면 생각해야 할 문제가 있습니다.

가장 대표적인 것은 외부에서 서버에 어떻게 접근하게 만들 것인가 하는 문제입니다.

일반적으로는 공유기의 포트 포워딩 기능을 이용할 수 있습니다. 하지만 저는 가능하면 집에 있는 서버의 공인 IP 주소를 직접 공개하고 싶지 않았습니다.

그래서 선택한 방법이 **VPS와 리버스 프록시, 그리고 암호화된 네트워크 터널을 함께 사용하는 방식**입니다.

이 구조는 이전 글인 [「캐나다의 서버와 따뜻한 방」](/ko/blog/2026/10/my-infrastructure-in-canada/)에서도 간단히 언급했습니다.

그때는 제 서버 환경을 소개하는 것이 목적이라 자세하게 설명하지 않았는데, 생각해 보면 이 방법은 저처럼 서버의 IP 주소를 직접 노출하고 싶지 않은 사람뿐 아니라 다른 환경에서도 유용할 수 있습니다.

이번에는 제가 어떤 방식으로 구성했는지와 함께, 이러한 구조를 어디에 활용할 수 있는지 이야기해 보려고 합니다.

## 1. 리버스 프록시란 무엇일까?

먼저 리버스 프록시(Reverse Proxy)라는 개념부터 설명하겠습니다.

일반적인 웹 서버는 사용자의 요청을 직접 받습니다.

사용자가 웹사이트 주소로 접속하면 해당 주소에 연결된 서버가 요청을 처리하고, HTML이나 이미지 등의 데이터를 사용자에게 돌려줍니다.

리버스 프록시는 이 과정에서 사용자와 실제 서버 사이에 위치합니다.

사용자는 실제 애플리케이션 서버에 직접 연결하는 대신 리버스 프록시 서버에 연결합니다.

그리고 리버스 프록시가 사용자의 요청을 실제 서버로 전달한 뒤, 그 서버에서 받은 응답을 다시 사용자에게 돌려줍니다.

예를 들어 집에 웹 서버가 있다고 가정하겠습니다.

사용자가 웹사이트에 접속하면 집에 있는 서버로 요청이 직접 들어오는 것이 아니라, 앞에 배치한 리버스 프록시로 요청이 들어갑니다.

리버스 프록시는 해당 요청을 내부 서버로 전달하고, 내부 서버가 생성한 응답을 다시 사용자에게 보내줍니다.

사용자 입장에서는 중간에 다른 서버가 있다는 사실을 특별히 의식하지 않고 웹사이트를 사용할 수 있습니다.

이 방식에는 여러 장점이 있습니다.

외부에서 접근하는 경로를 한곳으로 모으거나, 여러 서비스로 요청을 분배하거나, HTTPS 연결을 처리하거나, 일부 요청을 필터링하는 용도로 활용할 수 있습니다.

또한 제대로 구성하면 실제 애플리케이션 서버의 IP 주소를 방문자에게 직접 공개하지 않을 수도 있습니다.

저는 이 마지막 부분에 특히 관심이 있었습니다.

## 2. 왜 집 서버의 IP 주소를 직접 공개하고 싶지 않았을까?

제가 리버스 프록시를 선택한 가장 큰 이유는 보안과 네트워크 관리 때문입니다.

집에서 서버를 운영하면서 외부에 서비스를 공개하려면 일반적으로 공유기나 방화벽에 외부 접속을 허용하는 설정이 필요합니다.

그런데 저는 집의 인터넷 회선과 서버가 외부 요청을 직접 받는 구조를 가능한 한 피하고 싶었습니다.

특히 신경 쓰였던 것은 DDoS 공격 같은 상황입니다.

누군가 서버의 공인 IP 주소를 대상으로 대량의 트래픽을 보내면, 서버 자체가 요청을 처리하지 못하는 문제뿐 아니라 집 인터넷 회선에도 영향을 줄 수 있습니다.

물론 IP 주소를 공개했다고 해서 반드시 공격을 받는 것은 아닙니다.

반대로 IP 주소를 숨긴다고 해서 모든 공격을 막을 수 있는 것도 아닙니다.

그래도 저는 외부에서 접근하는 지점을 집 서버가 아닌 다른 곳에 두고 싶었습니다.

그래서 실제 서비스는 집에서 실행하되, 방문자가 접속하는 공개 주소는 별도로 마련한 VPS의 주소를 사용하도록 했습니다.

여기서 VPS는 Virtual Private Server의 약자로, 클라우드 사업자가 제공하는 가상 서버를 의미합니다.

쉽게 설명하면 인터넷에 연결된 원격 컴퓨터 하나를 빌려서 사용하는 것입니다.

저는 이 역할을 위해 Oracle Cloud Infrastructure, 줄여서 OCI의 무료 티어에서 가상 서버를 하나 마련했습니다.

그 VPS를 외부 접속을 받는 입구로 사용하는 것입니다.

## 3. Oracle Cloud VPS와 집 서버를 연결하다

그렇다면 외부에 공개된 VPS와 집에 있는 서버는 어떻게 연결할까요?

단순히 VPS를 하나 만들었다고 해서 그 서버가 자동으로 제 집의 컴퓨터에 접속할 수 있는 것은 아닙니다.

두 장비 사이에 통신할 수 있는 경로가 필요합니다.

저는 이 경로를 만들기 위해 Tailscale을 사용했습니다.

Tailscale은 WireGuard를 기반으로 장치 사이에 암호화된 네트워크 연결을 구성할 수 있게 해 주는 서비스입니다.

WireGuard는 네트워크 트래픽을 암호화해 서로 떨어져 있는 장치들이 안전하게 통신하도록 돕는 VPN 기술입니다.

Tailscale은 여기에 장치 인증, 연결 관리, NAT 통과 등의 기능을 추가해 네트워크 구성을 비교적 간편하게 만들어 줍니다.

이렇게 연결하면 서로 다른 네트워크에 있는 장치라도 같은 사설 네트워크 안에 있는 것처럼 통신할 수 있습니다.

제 경우에는 클라우드에 있는 VPS와 집 서버를 Tailscale로 연결했습니다.

결과적으로 VPS는 공개 인터넷을 통해 사용자의 요청을 받고, 그 요청을 Tailscale 네트워크를 통해 집 서버에 전달할 수 있게 됩니다.

여기서 중요한 점은 **VPS와 집 서버 사이의 데이터가 WireGuard 기반의 암호화된 연결을 통해 이동한다는 것**입니다.

물론 암호화된 터널이 있다고 해서 시스템의 모든 보안 문제가 해결되는 것은 아닙니다.

그래도 공개 인터넷을 통해 내부 서비스에 직접 접속하도록 만드는 것과는 다른 네트워크 구성을 할 수 있게 됩니다.

## 4. 실제 트래픽은 어떤 경로로 전달될까?

전체 구조를 간단하게 정리하면 다음과 같습니다.

**웹사이트 방문자 → Oracle Cloud VPS의 리버스 프록시 → Tailscale 암호화 연결 → 집 서버의 웹 애플리케이션**

응답은 반대 방향으로 돌아갑니다.

**집 서버 → Tailscale → VPS → 방문자**

조금 더 자세히 설명해 보겠습니다.

### 첫 번째: 방문자가 VPS에 접속한다

먼저 누군가 제가 외부에 공개한 서비스에 접속한다고 가정하겠습니다.

설명을 간단하게 하기 위해 도메인 이름은 사용하지 않고, IPv4 주소로 접속하는 상황을 생각해 보겠습니다.

방문자는 집 서버의 IP 주소가 아니라 Oracle Cloud VPS에 할당된 공인 IP 주소로 접속합니다.

외부에서 접속하는 입구가 VPS인 것입니다.

도메인을 사용하는 경우에도 해당 도메인이 VPS를 가리키도록 구성한다면 기본적인 원리는 같습니다.

### 두 번째: 리버스 프록시가 요청을 전달한다

VPS에는 리버스 프록시 역할을 수행하는 프로그램이 있습니다.

방문자의 요청을 받은 리버스 프록시는 해당 요청을 실제 서비스를 실행하는 서버로 전달합니다.

그런데 이때 실제 서버는 VPS와 같은 데이터센터에 있지 않습니다.

제 집에 있습니다.

따라서 리버스 프록시는 Tailscale로 연결된 네트워크 경로를 이용해 집 서버로 요청을 전달합니다.

집 서버의 공인 IP 주소를 직접 목적지로 사용할 필요 없이, Tailscale 네트워크에서 접근 가능한 주소를 이용할 수 있습니다.

### 세 번째: 집 서버가 요청을 처리한다

요청이 집 서버에 도착하면 실제 웹 애플리케이션이 작업을 수행합니다.

웹페이지를 반환할 수도 있고, API 요청을 처리할 수도 있습니다.

이때 집 서버는 외부 인터넷에 있는 방문자와 직접 연결하는 대신, 앞단에 있는 VPS를 통해 요청을 전달받습니다.

### 네 번째: 응답이 다시 방문자에게 전달된다

집 서버가 응답을 생성하면 그 결과가 Tailscale을 통해 VPS로 돌아갑니다.

그리고 VPS의 리버스 프록시가 해당 응답을 방문자에게 전달합니다.

이렇게 해서 방문자는 집에 있는 서버에서 실행되는 서비스를 사용할 수 있습니다.

사용자가 별도로 Tailscale을 설치해야 하는 것은 아닙니다.

Tailscale은 VPS와 집 서버 사이의 연결에 사용되고, 일반 방문자는 공개된 VPS에 접속하는 구조이기 때문입니다.

물론 서비스 자체에 별도의 인증이 필요하다면 그것은 별개의 문제입니다.

## 5. 그렇다면 실제 서버의 IP는 완전히 숨겨질까?

이 부분은 조금 정확하게 설명하고 싶습니다.

리버스 프록시와 Tailscale을 이용한다고 해서 집 서버의 실제 공인 IP 주소가 암호화되어 사라지는 것은 아닙니다.

암호화되는 것은 Tailscale을 통해 전달되는 네트워크 트래픽입니다.

제가 의도한 것은 **일반 방문자가 서비스에 접속하는 과정에서 집 서버의 공인 IP 주소를 직접 확인하거나 사용할 필요가 없도록 만드는 것**입니다.

방문자는 공개된 VPS의 주소로 접속합니다.

실제 집 서버로 이어지는 경로는 VPS 뒤에 배치되어 있습니다.

따라서 서비스의 DNS 설정이나 응답 내용 등에 집 서버의 주소를 별도로 노출하지 않고, 외부에서 집 서버로 직접 접근할 수 있는 경로도 열어 두지 않았다면, 일반적인 서비스 접속 과정에서는 집 서버의 주소를 알기 어려워집니다.

하지만 이것은 절대적인 익명성을 보장하는 기술은 아닙니다.

다른 DNS 기록이나 과거에 공개된 주소, 애플리케이션의 설정 오류 등으로 실제 IP 주소가 알려질 가능성은 남아 있습니다.

또한 집 서버의 주소를 숨기더라도 VPS 자체는 여전히 외부 공격을 받을 수 있습니다.

VPS를 공격해 서비스를 중단시키거나, 공개된 웹 애플리케이션의 취약점을 공격하는 것도 가능합니다.

따라서 리버스 프록시를 사용한다는 사실만으로 보안이 완성된다고 생각해서는 안 됩니다.

접근 제어, 방화벽, 프로그램 업데이트 등은 여전히 중요합니다.

특히 VPS와 집 서버를 연결한 Tailscale 네트워크에서 어떤 장치가 어떤 서비스에 접근할 수 있는지 제한하는 것도 필요합니다.

저는 이 구조를 보안을 완벽하게 해결해 주는 방법이라기보다, **집 서버의 직접적인 외부 노출을 줄이기 위한 네트워크 설계 방식**으로 보고 있습니다.

## 6. 포트 포워딩을 할 수 없는 환경에서도 활용할 수 있다

지금까지는 제가 이 구조를 사용한 이유를 설명했습니다.

하지만 이 방법의 장점이 단순히 서버의 IP 주소를 직접 공개하지 않는 것에만 있는 것은 아닙니다.

오히려 다른 사용자에게 더 유용할 수 있는 부분은 포트 포워딩이 어려운 환경에서 서비스를 공개할 수 있다는 점이라고 생각합니다.

### 포트 포워딩이란?

일반적인 가정용 네트워크에서는 여러 장치가 하나의 공유기를 통해 인터넷을 사용합니다.

집 안의 컴퓨터에는 보통 사설 IP 주소가 할당됩니다.

이 사설 IP 주소는 일반적으로 인터넷에서 직접 접근할 수 있는 주소가 아닙니다.

따라서 외부에서 들어오는 연결을 특정 컴퓨터로 전달하려면 공유기에 설정을 추가해야 하는 경우가 많습니다.

이것이 포트 포워딩(Port Forwarding)입니다.

예를 들어 외부에서 공유기의 특정 포트로 들어온 연결을 집 안의 웹 서버가 사용하는 포트로 전달하도록 설정하는 것입니다.

이렇게 하면 외부 사용자가 집에 있는 서비스를 사용할 수 있습니다.

그런데 모든 사람이 포트 포워딩을 자유롭게 설정할 수 있는 것은 아닙니다.

### 공유기를 마음대로 설정할 수 없다면?

예를 들어 아파트나 기숙사처럼 네트워크 장비를 직접 관리할 수 없는 환경이 있을 수 있습니다.

건물 전체가 하나의 네트워크 구성을 공유하거나, 사용자가 상위 라우터의 설정에 접근할 권한이 없는 경우입니다.

이중 공유기 환경에서도 비슷한 문제가 발생할 수 있습니다.

물론 공유기가 두 대 있다는 이유만으로 포트 포워딩이 무조건 불가능한 것은 아닙니다. 두 공유기의 설정을 모두 제어할 수 있다면 필요한 경로를 구성할 수도 있습니다.

하지만 상위 공유기에 접근할 수 없다면 이야기가 달라집니다.

또한 인터넷 제공업체가 CGNAT(Carrier-Grade NAT)을 사용하는 경우에는 개인 공유기에서 포트 포워딩을 설정하더라도 일반적인 IPv4 외부 접속이 되지 않을 수 있습니다.

이런 환경에서는 서버 프로그램을 실행해 놓고도 외부에서 접속할 방법을 마련하기 어려울 수 있습니다.

바로 이런 상황에서 공개 IP 주소를 가진 VPS와 Tailscale 같은 네트워크 연결 방식을 활용할 수 있습니다.

집 공유기에 외부 접속용 포트를 직접 열지 않더라도, 집 서버와 VPS 사이의 연결을 먼저 구성하고 VPS에서 요청을 받아 전달하는 방식입니다.

물론 사용하는 네트워크가 Tailscale 연결에 필요한 외부 통신을 허용해야 하고, 실제 연결이 성립하는지도 확인해야 합니다.

Tailscale은 네트워크 조건에 따라 직접 연결을 사용하거나 중계 서버를 거칠 수도 있습니다.

따라서 어떤 환경에서든 반드시 같은 속도로 동작한다고 보장할 수는 없습니다.

그래도 포트 포워딩 권한이 없는 환경에서 외부 서비스를 구성할 때 충분히 검토해 볼 만한 방법입니다.

## 7. 웹 서버뿐 아니라 다른 서비스에도 사용할 수 있다

여기까지 읽으셨다면 이런 생각이 들 수도 있습니다.

이 방식은 웹사이트를 운영할 때만 사용할 수 있는 것일까요?

그렇지는 않습니다.

VPS를 공개 접속 지점으로 두고 내부 네트워크로 트래픽을 전달하는 구조 자체는 다양한 서비스에 활용할 수 있습니다.

다만 서비스가 어떤 네트워크 프로토콜을 사용하는지에 따라 실제 구성 방식은 달라집니다.

### 웹 서버와 백엔드 API

가장 이해하기 쉬운 예시는 웹 서버입니다.

집에서 개인 프로젝트의 웹사이트를 실행하고, 외부 사용자는 VPS를 통해 접속하도록 만들 수 있습니다.

백엔드 API 서버도 비슷합니다.

HTTP 또는 HTTPS 기반의 서비스라면 NGINX 같은 일반적인 웹 리버스 프록시를 이용해 요청을 전달할 수 있습니다.

서비스가 여러 개라면 도메인이나 요청 경로를 기준으로 서로 다른 내부 서버에 전달하도록 구성할 수도 있습니다.

### Minecraft 같은 게임 서버

게임 서버에도 비슷한 구조를 응용할 수 있습니다.

예를 들어 집에서 Minecraft 서버를 실행하고, 외부 플레이어는 VPS의 공개 주소로 접속하게 만드는 방식입니다.

다만 여기서 주의할 점이 있습니다.

웹사이트에 사용하는 HTTP 리버스 프록시 설정을 게임 서버에 그대로 적용할 수 있는 것은 아닙니다.

게임 서버는 웹사이트와 다른 프로토콜을 사용할 수 있기 때문입니다.

Minecraft Java Edition은 일반적으로 TCP를 사용하고, Bedrock Edition은 UDP를 사용합니다.

따라서 어떤 게임 서버를 운영하는지에 따라 TCP 또는 UDP 트래픽을 전달할 수 있는 프록시나 포트 중계 구성이 필요합니다.

핵심 원리는 같지만, 실제로 사용하는 프로그램과 설정은 달라질 수 있습니다.

이 부분을 구분하지 않고 모든 서비스가 일반적인 웹 리버스 프록시로 동작한다고 생각하면 문제가 생길 수 있습니다.

### 그 밖의 개인 서비스

개인적으로 사용하는 웹 대시보드나 테스트용 애플리케이션 등에도 비슷한 방식을 적용할 수 있습니다.

다만 외부에 공개할 필요가 없는 관리 도구까지 무조건 공개하는 것은 권장하고 싶지 않습니다.

관리자 페이지나 서버 관리 인터페이스처럼 민감한 서비스는 공개 리버스 프록시를 통하지 않고, 인증된 장치만 접근할 수 있는 사설 네트워크 안에 두는 편이 더 적절할 수도 있습니다.

중요한 것은 모든 서비스를 외부에 공개하는 것이 아니라, 어떤 서비스를 누구에게 공개할 것인지 먼저 정하는 것이라고 생각합니다.

## 8. 직접 운영하면서 고려해야 하는 부분

여기까지만 보면 상당히 편리한 구조처럼 보일 수 있습니다.

실제로도 유용하지만, 몇 가지 단점과 주의할 점이 있습니다.

먼저 네트워크 경로가 길어집니다.

사용자와 집 서버가 직접 통신하는 대신 중간에 VPS가 하나 더 들어가기 때문입니다.

또한 Tailscale이 항상 두 장치 사이에 직접 연결을 만드는 것은 아닙니다.

네트워크 환경에 따라 중계 연결을 사용한다면 지연 시간이나 전송 속도에 추가적인 영향을 줄 수 있습니다.

저 역시 과거에 웹사이트를 셀프 호스팅하면서 네트워크 경로와 연결 상태 때문에 고민했던 경험이 있습니다.

그 이야기는 [「웹사이트를 셀프 호스팅하다가 옮긴 이유」](/ko/blog/2026/10/why-i-moved-my-website-hosting/)에서 자세히 다뤘습니다.

따라서 VPS를 거치는 구조가 언제나 직접 연결보다 빠르다고 생각하지는 않습니다.

또한 VPS에 문제가 생기면 외부 접속 경로도 함께 영향을 받을 수 있습니다.

집 서버는 정상적으로 실행되고 있어도 VPS가 중단되거나 터널 연결이 끊어지면 외부 사용자는 서비스에 접속하지 못할 수 있습니다.

비용도 생각해야 합니다.

저는 Oracle Cloud의 무료 티어를 활용했지만, 무료로 제공되는 자원과 사용 한도에는 제한이 있습니다.

서비스의 트래픽이 많아지면 VPS의 네트워크 대역폭이나 처리 성능이 병목이 될 수도 있습니다.

무료 서비스를 사용한다고 해서 어떤 사용량에서도 반드시 비용이 발생하지 않는다고 단정할 수도 없습니다. 실제 이용 조건과 계정 설정을 확인해야 합니다.

마지막으로 보안 관리입니다.

VPS의 공개 포트와 방화벽, Tailscale의 접근 권한, 내부 서버가 허용하는 연결 범위를 함께 확인해야 합니다.

웹사이트라면 방문자와 VPS 사이의 HTTPS 설정도 별도로 고려해야 합니다.

Tailscale이 VPS와 집 서버 사이의 통신을 암호화한다고 해서, 방문자의 브라우저와 VPS 사이의 연결까지 자동으로 HTTPS가 되는 것은 아니기 때문입니다.

또한 리버스 프록시 뒤의 애플리케이션이 방문자의 실제 IP 주소를 필요로 한다면, 신뢰할 수 있는 프록시에서 전달하는 헤더를 올바르게 처리하도록 구성해야 할 수 있습니다.

이런 부분을 고려하면 리버스 프록시와 암호화 터널을 함께 사용하는 방식도 결국 하나의 추가적인 관리 대상입니다.

사용 목적에 따라 얻는 이점보다 관리 부담이 더 커질 수도 있습니다.

## 9. 꼭 저와 같은 이유로 선택할 필요는 없다

제가 이 구조를 선택한 가장 큰 이유는 집 서버의 실제 공인 IP 주소를 외부 방문자에게 직접 공개하고 싶지 않았기 때문입니다.

하지만 다른 분들은 전혀 다른 이유로 같은 구조를 선택할 수 있습니다.

포트 포워딩을 할 수 없는 환경일 수도 있고, 집의 인터넷 회선에 외부에서 직접 접근할 수 없는 상황일 수도 있습니다.

여러 서버에 들어오는 요청을 하나의 공개 주소에서 관리하고 싶을 수도 있습니다.

또는 집에서 돌아가는 서비스를 유지하면서 외부 접속 지점만 별도의 클라우드 서버로 분리하고 싶을 수도 있겠죠.

모두 충분히 고려할 만한 이유라고 생각합니다.

물론 모든 상황에서 리버스 프록시와 VPS를 사용하는 것이 정답은 아닙니다.

단순히 본인만 접속할 서비스라면 외부에 공개하지 않고 Tailscale 같은 사설 네트워크를 통해 직접 접근하는 방식이 더 간단할 수 있습니다.

또한 단순한 정적 웹사이트라면 저의 현재 블로그처럼 별도의 정적 사이트 호스팅 서비스를 이용하는 것이 더 편할 수도 있습니다.

실제로 이 블로그는 현재 Cloudflare Workers Static Assets를 사용하고 있습니다.

따라서 이번 글에서 소개한 VPS와 집 서버 연결 방식이 현재 이 블로그의 페이지를 제공하는 구조는 아닙니다.

이 방법은 제가 집 서버에서 외부 공개 서비스를 운영하기 위해 구성해 온 방식에 관한 이야기입니다.

중요한 것은 특정 기술을 사용하는 것 자체가 아니라, 자신의 환경에서 어떤 문제가 발생하고 있는지를 먼저 이해하는 것이라고 생각합니다.

## 마치며

이번 글에서는 제가 집 서버를 외부에 공개하기 위해 사용한 네트워크 구조를 소개했습니다.

Oracle Cloud VPS를 외부 접속 지점으로 두고, Tailscale을 통해 집 서버와 암호화된 네트워크 연결을 구성한 뒤, 리버스 프록시로 요청을 전달하는 방식입니다.

제게는 집 서버의 공인 IP 주소를 직접 노출하지 않고 서비스를 운영할 수 있다는 점이 가장 큰 장점이었습니다.

하지만 이 방식은 그 외에도 포트 포워딩이 어려운 환경에서 서비스를 제공하거나 여러 내부 서비스를 하나의 공개 접속 지점에서 관리하는 데 활용할 수 있습니다.

물론 네트워크 경로가 복잡해지고 관리해야 할 구성 요소가 늘어나는 단점도 있습니다.

그래서 모든 사람에게 무조건 추천하고 싶은 방법은 아닙니다.

다만 집에서 서버를 운영하고 있는데 외부 공개 방법 때문에 고민하고 계신다면, 한 번쯤 알아볼 만한 구조라고 생각합니다.

저도 처음부터 모든 네트워크 기술을 알고 구성했던 것은 아닙니다.

직접 서버를 운영하면서 생긴 불편함을 해결하기 위해 여러 방법을 찾아보고, 그중 제 목적에 맞는 구성을 선택한 것입니다.

이 글이 비슷한 환경에서 서버를 운영하거나 새로운 네트워크 구성을 시도하려는 분들에게 작은 참고 자료가 되었으면 좋겠습니다.

<!-- lang:en -->
## Exposing My Home Server Without Port Forwarding

I run several servers at home.

I enjoy setting up and operating my own infrastructure, so naturally I wanted to make some of the services running on those machines accessible from outside my home.

But publishing a home server on the internet raises an important question: how do people connect to it?

A common approach is to configure port forwarding on a router. I wanted to avoid revealing my home server's public IP address directly whenever possible.

So I chose **a combination of a VPS, a reverse proxy, and an encrypted network tunnel**.

I briefly mentioned this setup in my earlier post, [“Servers in Canada and a Warm Room”](/en/blog/2026/10/my-infrastructure-in-canada/).

That article was about my infrastructure in general, so I did not explain the arrangement in detail. But it occurred to me that this setup could be useful not only to people who want to avoid directly exposing a home IP address, but also to those dealing with other network restrictions.

This time, I want to explain how the pieces fit together and where the same approach can be useful.

## 1. What is a reverse proxy?

First, let me explain what a reverse proxy is.

A conventional web server can receive requests directly from visitors.

When someone opens a website, a server associated with its address receives the request and returns content such as HTML pages or images.

A reverse proxy sits between the visitor and the server running the application.

Instead of connecting directly to the application server, the visitor connects to the reverse proxy.

The proxy forwards the request to the appropriate server and then returns that server's response to the visitor.

Imagine I have a web server running at home.

Rather than having each visitor connect to my home server, I put a reverse proxy in front of it. Requests arrive at the proxy first, and the proxy passes them on to the server at home.

The visitor can use the website without needing to know much about the intermediate server.

Reverse proxies have several uses. They can provide a single entry point, route requests among services, handle HTTPS connections, or filter certain requests.

With a suitable configuration, they can also keep the application server's IP address out of the information visitors normally see.

That last possibility was particularly interesting to me.

## 2. Why did I want to avoid exposing my home IP address?

My main reasons were security and network management.

Exposing a service from home commonly involves configuring a router or firewall to accept inbound connections.

I wanted to avoid having my home internet connection and servers directly receive public traffic whenever possible.

One thing I was especially concerned about was a DDoS attack.

If someone floods my public home IP address with traffic, the effect might not be limited to a particular application. It could also disrupt the internet connection I use at home.

Publishing an IP address does not automatically mean an attack will happen, of course.

And concealing an address does not guarantee that every attack will be prevented.

Still, I preferred to place the public entry point somewhere other than my home.

I therefore decided to run the actual services at home while giving visitors the public address of a separate VPS.

VPS stands for Virtual Private Server: a virtual machine provided by a hosting or cloud company.

Put simply, it is a remote computer you rent and can access over the internet.

For this role, I provisioned a virtual server using the free tier of Oracle Cloud Infrastructure (OCI).

That VPS became the public entry point to my home-hosted services.

## 3. Connecting an Oracle Cloud VPS to my home server

A VPS does not automatically have a way to reach a computer on my home network.

The two machines need a network path between them.

I used Tailscale to establish that path.

Tailscale is a service that helps connect devices through an encrypted network built on WireGuard.

WireGuard is a VPN technology that encrypts network traffic between devices. Tailscale adds conveniences such as device authentication, connection management, and NAT traversal.

This can let devices on different networks communicate as though they were part of the same private network.

In my setup, I connected the Oracle Cloud VPS and my home server through Tailscale.

The VPS can receive a request from the public internet and forward it to my home server using its Tailscale connection.

An important point is that **traffic between the VPS and my home server travels through a WireGuard-based encrypted connection**.

An encrypted tunnel does not solve every security problem, but it gives me a different network architecture from exposing the internal service directly to the internet.

## 4. What path does the traffic actually follow?

The overall path looks like this:

**Visitor → reverse proxy on Oracle Cloud VPS → encrypted Tailscale connection → web application on my home server**

The response travels back in the other direction:

**Home server → Tailscale → VPS → visitor**

Here is what happens in more detail.

### Step one: the visitor connects to the VPS

Suppose someone wants to access a service I have made public.

To simplify the explanation, imagine they connect directly to an IPv4 address rather than using a domain name.

They connect to the public IP address assigned to my Oracle Cloud VPS, not the address of my home server.

The VPS is the public entry point.

If I use a domain name that points to the VPS, the basic principle is the same.

### Step two: the reverse proxy forwards the request

A reverse proxy program is running on the VPS.

It receives the visitor's request and forwards it to the server hosting the actual service.

But that application server is not in the VPS's data center.

It is in my home.

The reverse proxy therefore uses the route provided by Tailscale to reach the home server.

It can use an address reachable through the Tailscale network instead of directly targeting the home server's public IP.

### Step three: the home server handles the request

When the request arrives, the application on my home server processes it.

It might serve a web page or respond to an API request.

From the application's perspective, the request is delivered through the VPS instead of arriving as a direct connection from the visitor over the public internet.

### Step four: the response returns to the visitor

The home server sends its response back over Tailscale to the VPS.

The reverse proxy then sends that response to the visitor.

That is how visitors can use a service running on my home server.

They do not have to install Tailscale themselves.

Only the connection between the VPS and the home server uses Tailscale; ordinary visitors connect to the public VPS.

Any authentication required by the application itself is a separate concern.

## 5. Does this completely hide the real server's IP address?

I want to be precise about this part.

Using a reverse proxy and Tailscale does not somehow encrypt the home server's public IP address and make it disappear.

What gets encrypted is the network traffic carried over the Tailscale connection.

My goal is **to make it unnecessary for ordinary visitors to know or use my home server's public IP address when accessing the service**.

Visitors connect to the public VPS. The route to the actual server is behind it.

If the service's DNS records and responses do not separately disclose the home address, and there are no direct public access paths to the home server, visitors would not ordinarily learn that IP just by using the service.

But this setup does not provide absolute anonymity.

Other DNS records, previously published addresses, or application configuration mistakes could still reveal the origin IP.

The VPS itself also remains exposed to the public internet.

An attacker could target the VPS or exploit vulnerabilities in an application reachable through the proxy.

So the presence of a reverse proxy does not mean security is complete.

Access controls, firewalls, and software updates still matter.

It is also important to restrict which devices and services are reachable through the Tailscale network connecting the VPS and home server.

I view this design not as a perfect security solution, but as **a way to reduce the direct public exposure of my home server**.

## 6. It is useful when port forwarding is unavailable

So far, I have explained why I chose this setup.

But hiding an origin IP is not its only advantage.

For other people, its most useful feature may be the ability to publish a service when port forwarding is difficult or impossible.

### What is port forwarding?

On a typical home network, several devices share one internet connection through a router.

Each local computer usually has a private IP address.

That private address cannot ordinarily be reached directly from the public internet.

To forward an incoming connection to a particular computer, the router may need a rule identifying which internal device should receive traffic arriving at a given port.

This is called port forwarding.

For example, a router could be configured to send connections arriving on a particular public port to a web server inside the home.

This makes the internal service reachable from outside.

But not everyone can configure such rules.

### What if you cannot control the router?

In an apartment building or dormitory, for example, you might not have administrative access to the network equipment.

Several households might share one managed network, or you might not be allowed to change the upstream router.

Double-router setups can create a similar problem.

Having two routers does not automatically make port forwarding impossible. If you can configure both, you may be able to create the necessary forwarding rules.

But if you cannot access the upstream router, things become more difficult.

Another example is CGNAT (Carrier-Grade NAT), where an internet provider places customers behind its own network address translation. Configuring port forwarding on your personal router may not make ordinary inbound IPv4 connections possible.

In these situations, running a server is easy enough, but giving outsiders a route to it can be difficult.

This is where a VPS with a public IP and a connection tool such as Tailscale can help.

Instead of opening an inbound port on the home router, the home server and VPS establish connectivity, and the VPS accepts and forwards the public requests.

The local network must still allow the outbound traffic needed for Tailscale, and the connection must actually succeed.

Depending on network conditions, Tailscale may establish a direct peer-to-peer connection or use a relay.

Performance is therefore not guaranteed to be the same in every environment.

Even with those qualifications, it is worth considering when you do not have permission to configure port forwarding.

## 7. This can work for more than web servers

Is this only useful for hosting websites?

Not at all.

Using a public VPS to accept traffic and forward it into a private network can support different kinds of services.

However, the exact setup depends on the network protocol each service uses.

### Websites and backend APIs

Web servers are the most straightforward example.

I could run a personal website on a machine at home and let visitors connect through the VPS.

A backend API can work similarly.

For HTTP or HTTPS services, a conventional web reverse proxy such as NGINX can forward requests to the internal application.

If several services share the VPS, the proxy can route traffic according to domain names or URL paths.

### Game servers such as Minecraft

The same broad approach can be adapted for game servers.

For example, a Minecraft server could run at home while players connect to the VPS's public address.

There is an important distinction, though.

The HTTP reverse proxy configuration used for websites does not necessarily work unchanged for game servers.

They may use different network protocols.

Minecraft Java Edition generally uses TCP, whereas Bedrock Edition uses UDP.

Depending on the game, you need a proxy or port-forwarding arrangement that can carry the relevant TCP or UDP traffic.

The underlying idea is similar, but the specific software and configuration can be different.

Assuming every service works through an ordinary HTTP reverse proxy can lead to problems.

### Other personal services

The approach can also be used for personal web dashboards or test applications.

However, I would not recommend making every administration tool public just because it is technically possible.

Sensitive services such as administrator dashboards or server management interfaces may be better kept inside a private network, accessible only to authorized devices.

The important question is not how to publish everything, but **which services should be accessible to whom**.

## 8. Things to consider when operating this setup

So far, this might sound like a very convenient design.

It is useful, but there are trade-offs.

First, the network path becomes longer.

Instead of communicating directly with the home server, visitors go through the VPS.

And Tailscale does not always establish a direct connection between peers.

If network conditions require a relay, latency or throughput may be affected further.

I previously experienced concerns about routes and connection stability while self-hosting my website.

I discussed those experiences in [“Why I Moved My Website Away from Self-Hosting”](/en/blog/2026/10/why-i-moved-my-website-hosting/).

So I would not claim that a VPS-based route is always faster than a direct connection.

The VPS also becomes a dependency.

Even if the home server is healthy, visitors may lose access when the VPS goes down or the tunnel becomes unavailable.

Costs matter too.

I used Oracle Cloud's free tier, but free resources come with limits and conditions.

Heavy traffic could make VPS bandwidth or processing capacity a bottleneck.

And using a free tier does not necessarily guarantee that no charge is possible under every circumstance. The applicable service terms and account settings should be checked.

Finally, there is security administration.

The VPS's public ports and firewall rules, Tailscale access permissions, and the internal server's accepted connections all need attention.

For a website, HTTPS between the visitor and the VPS needs to be configured separately.

Encrypting traffic between the VPS and home server with Tailscale does not automatically make the visitor-to-VPS connection HTTPS.

If an application behind the proxy needs a visitor's original IP address, it may also need to process forwarding headers correctly—and only trust those headers from a trusted proxy.

All of this means that a reverse proxy and encrypted tunnel introduce another set of components to maintain.

Depending on the application, the maintenance cost may outweigh the benefits.

## 9. You do not need to have the same reason I did

My main reason for adopting this structure was that I did not want visitors to connect directly to my home server's public IP address.

But other people may have completely different reasons.

Perhaps they cannot configure port forwarding, or their home connection is not directly reachable from the internet.

Perhaps they want to manage several internal services behind one public address.

Or perhaps they want to keep the applications running at home while moving only the public entry point to a cloud server.

All of these can be reasonable motivations.

A VPS and reverse proxy are not always the right answer, however.

If only you need access to a service, connecting over a private network such as Tailscale without publishing it at all may be simpler.

And for a static website, a dedicated static hosting service might be more convenient.

That is what my own blog uses today: Cloudflare Workers Static Assets.

The VPS-to-home-server architecture described here is therefore **not** the architecture currently serving this blog's pages.

It is the approach I have used to make services running on my home infrastructure accessible from outside.

What matters is understanding the problem in your own environment before choosing a technology.

## Closing thoughts

In this post, I have explained the network architecture I used to expose services running on my home server.

I placed an Oracle Cloud VPS at the public entry point, connected it to my home server through Tailscale, and used a reverse proxy to forward requests over the encrypted network.

For me, the biggest benefit was avoiding direct exposure of my home server's public IP address to ordinary visitors.

The same arrangement can also be useful when port forwarding is unavailable or when several internal services need a single public entry point.

It adds complexity to the network path and introduces more components to manage, so I would not recommend it unconditionally.

But if you run servers at home and are unsure how to make a service accessible from outside, I think it is worth learning about.

I did not begin with a complete understanding of every networking technology involved.

I learned about different approaches while operating my servers and solving the problems that came up, then chose the combination that suited my goals.

I hope this explanation gives others in similar environments a useful starting point.

<!-- lang:ja -->
## ポート転送を使わずに自宅サーバーを外部公開する方法

私は自宅で複数のサーバーを運用しています。

自分でサーバーを構築して動かすことが好きなので、自宅で実行しているサービスを外部からも利用できるようにしたいと思うようになりました。

ただし、自宅サーバーをインターネットに公開するときには考えなければならないことがあります。

最も基本的なのは、外部の人がどうやってサーバーにアクセスするかという問題です。

一般的にはルーターのポート転送機能を使えます。しかし私は、できるだけ自宅サーバーのグローバルIPアドレスを直接公開したくありませんでした。

そこで選んだのが、**VPSとリバースプロキシ、暗号化されたネットワークトンネルを組み合わせる方法**です。

この構成については以前の記事[「カナダのサーバーと暖かい部屋」](/ja/blog/2026/10/my-infrastructure-in-canada/)でも簡単に触れました。

そのときは私のサーバー環境全体を紹介するのが目的だったので、詳しく説明しませんでした。しかし、この構成は自宅のIPアドレスを直接見せたくない人だけでなく、別のネットワーク上の制約に困っている人にも役立つと思います。

今回は、私がどのように接続したのか、またどんな場面で利用できるのかを紹介します。

## 1. リバースプロキシとは何か？

最初にリバースプロキシ（Reverse Proxy）について説明します。

一般的なウェブサーバーは、利用者のリクエストを直接受け取ります。

利用者がウェブサイトへアクセスすると、そのアドレスに対応するサーバーがリクエストを処理し、HTMLや画像などを返します。

リバースプロキシは、この利用者と実際のアプリケーションサーバーの間に置かれるサーバーです。

利用者はアプリケーションサーバーに直接接続する代わりに、リバースプロキシへ接続します。

プロキシがリクエストを本来のサーバーへ転送し、そこから受け取った応答を利用者へ返します。

たとえば、自宅でウェブサーバーを動かしているとします。

その場合、利用者のリクエストを直接自宅で受けるのではなく、先に配置したリバースプロキシで受け取るようにできます。

リバースプロキシはそのリクエストを自宅サーバーへ届け、返ってきた応答を利用者へ送ります。

利用者は途中に別のサーバーがあることを特に意識せず、ウェブサイトを利用できます。

この方法にはいくつもの用途があります。

公開する入口を一か所にまとめたり、複数のサービスへリクエストを振り分けたり、HTTPS接続を処理したり、一部のリクエストをフィルタリングしたりできます。

また、適切に構成すれば実際のアプリケーションサーバーのIPアドレスを利用者へ直接公開せずに済みます。

私が特に興味を持ったのは、この最後の点でした。

## 2. なぜ自宅サーバーのIPアドレスを直接公開したくなかったのか？

私がリバースプロキシを選んだ主な理由は、セキュリティとネットワーク管理です。

自宅からサービスを外部公開するには、通常、ルーターやファイアウォールで外部からの接続を許可する設定が必要です。

しかし私は、できるだけ自宅のインターネット回線やサーバーが公開トラフィックを直接受けないようにしたかったのです。

特に気になっていたのはDDoS攻撃のような状況でした。

誰かが自宅のグローバルIPアドレスへ大量のトラフィックを送れば、サーバーの処理能力だけでなく、家庭のインターネット接続そのものにも影響が出る可能性があります。

もちろん、IPアドレスを公開したからといって必ず攻撃されるわけではありません。

逆に、アドレスを隠せばすべての攻撃を防げるわけでもありません。

それでも、公開する入口は自宅以外の場所に置きたいと考えました。

そこで実際のサービスは自宅で動かし、利用者が接続する公開アドレスには別のVPSのものを使うことにしました。

VPSはVirtual Private Serverの略で、クラウド事業者などが提供する仮想サーバーです。

簡単に言えば、インターネットにつながった遠隔のコンピューターを借りて利用するものです。

私はOracle Cloud Infrastructure（OCI）の無料ティアで仮想サーバーを一台用意しました。

そのVPSを外部からの接続を受け取る入口にしています。

## 3. Oracle CloudのVPSと自宅サーバーを接続する

VPSを作っただけでは、自宅にあるコンピューターへ自動的に接続できるわけではありません。

両者を結ぶ通信経路が必要です。

私はそのためにTailscaleを使いました。

TailscaleはWireGuardを基盤として、デバイス間に暗号化されたネットワーク接続を構築できるサービスです。

WireGuardは離れたデバイス間のトラフィックを暗号化するVPN技術です。

Tailscaleはデバイス認証、接続管理、NAT越えなどの機能を加え、ネットワークの設定を比較的簡単にしてくれます。

これにより、異なるネットワークにある機器同士でも同じプライベートネットワークにいるように通信できます。

私の場合は、クラウド上のVPSと自宅サーバーをTailscaleでつなぎました。

VPSが公開インターネットからリクエストを受け取り、それをTailscaleのネットワーク経由で自宅サーバーへ転送する構成です。

重要なのは、**VPSと自宅サーバーの間の通信がWireGuardベースの暗号化された接続を通ること**です。

もちろん、トンネルを暗号化しただけですべてのセキュリティ問題が解決するわけではありません。

それでも、内部サービスへ公開インターネットから直接アクセスさせるのとは異なる構成を作れます。

## 4. 実際のトラフィックはどの経路を通るのか？

全体の流れは次のようになります。

**訪問者 → Oracle Cloud VPSのリバースプロキシ → Tailscaleの暗号化接続 → 自宅サーバーのウェブアプリケーション**

応答は逆方向です。

**自宅サーバー → Tailscale → VPS → 訪問者**

順番に見てみます。

### ステップ1：訪問者がVPSへ接続する

まず、誰かが私の公開サービスにアクセスするとします。

説明を簡単にするため、ドメイン名を使わずIPv4アドレスで接続する場合を想像してください。

訪問者が接続するのは自宅サーバーのIPアドレスではなく、Oracle CloudのVPSに割り当てられたグローバルIPアドレスです。

公開された入口がVPSなのです。

ドメイン名を使い、その名前がVPSを指すように設定する場合も基本的な仕組みは同じです。

### ステップ2：リバースプロキシがリクエストを転送する

VPSではリバースプロキシ用のプログラムを動かしています。

リクエストを受け取ったプロキシは、実際にサービスを動かしているサーバーへ転送します。

ただし、そのサーバーはVPSと同じデータセンターにはありません。

私の自宅にあります。

そのため、リバースプロキシはTailscaleで作ったネットワーク経路を通して自宅サーバーへリクエストを送ります。

自宅のグローバルIPアドレスを直接宛先にする必要はなく、Tailscaleネットワーク内で到達できるアドレスを利用できます。

### ステップ3：自宅サーバーが処理する

リクエストが自宅サーバーへ届くと、そこで動いているアプリケーションが処理します。

ウェブページを返したり、APIリクエストに応答したりします。

このとき自宅サーバーは、公開インターネット上の訪問者から直接接続されるのではなく、VPSを通してリクエストを受け取ります。

### ステップ4：応答が訪問者へ戻る

アプリケーションの応答はTailscale経由でVPSへ戻ります。

その後、VPSのリバースプロキシが訪問者へ返します。

こうして利用者は自宅サーバーで実行しているサービスを使えます。

利用者側にTailscaleをインストールする必要はありません。

Tailscaleを使っているのはVPSと自宅サーバーの間だけで、通常の訪問者は公開されたVPSへアクセスするからです。

アプリケーション自体に認証が必要なら、それは別の問題です。

## 5. これで実際のIPアドレスは完全に隠れるのか？

ここは正確に説明したいと思います。

リバースプロキシとTailscaleを使っても、自宅サーバーのグローバルIPアドレス自体が暗号化されて消えるわけではありません。

暗号化されるのは、Tailscaleを通して送られるネットワークトラフィックです。

私の目的は、**一般の訪問者がサービスに接続するときに自宅サーバーのグローバルIPアドレスを直接知る必要も、使う必要もないようにすること**です。

利用者は公開されたVPSのアドレスに接続します。

実際の自宅サーバーへ向かう経路はその背後にあります。

DNSの記録やアプリケーションの応答などで自宅のアドレスを別途公開せず、直接アクセスできる経路も開いていなければ、通常の利用だけで自宅サーバーのIPを知ることは難しくなります。

ただし、完全な匿名性が保証されるわけではありません。

ほかのDNS記録、過去に公開したアドレス、アプリケーションの設定ミスなどからIPが判明する可能性は残ります。

さらに、公開されているVPS自体は攻撃対象になります。

VPSを攻撃してサービスを停止させたり、プロキシの先にあるウェブアプリケーションの脆弱性を悪用したりすることもできます。

リバースプロキシがあるだけで安全になるわけではありません。

アクセス制御、ファイアウォール、ソフトウェアの更新は引き続き必要です。

特に、VPSと自宅サーバーをつなぐTailscaleネットワークで、どのデバイスからどのサービスへアクセスできるかを制限することも重要です。

私はこの構成を完璧なセキュリティ対策ではなく、**自宅サーバーを公開インターネットへ直接さらす範囲を減らす設計**だと考えています。

## 6. ポート転送ができない環境でも使える

ここまでは、私がこの方式を選んだ理由を説明しました。

しかし、この仕組みの長所はIPアドレスを直接見せないことだけではありません。

むしろ、ほかの人にとってはポート転送が難しい環境でサービスを公開できることのほうが役立つかもしれません。

### ポート転送とは？

一般的な家庭のネットワークでは、複数のデバイスが一台のルーターを通してインターネットを使います。

家庭内のコンピューターには通常、プライベートIPアドレスが割り当てられています。

そのアドレスには普通、公開インターネットから直接アクセスできません。

外部から来た接続を特定のコンピューターへ届けるには、ルーターで転送先を指定する設定が必要になる場合があります。

これがポート転送（Port Forwarding）です。

たとえば、外部からルーターの特定のポートへ来た接続を、内部のウェブサーバーが使うポートへ送るように設定します。

これで外部から内部サービスを利用できるようになります。

しかし誰もがルーターを自由に設定できるわけではありません。

### ルーターの設定を変更できない場合は？

アパートや学生寮などでは、ネットワーク機器を自分で管理できない場合があります。

建物全体で一つのネットワークを共有していたり、上位ルーターの設定権限がなかったりする場合です。

ルーターが二台ある環境でも同様の問題が起こることがあります。

ただし、二台あるから必ずポート転送が不可能というわけではありません。両方を設定できれば必要な転送経路を作れることもあります。

上位ルーターを操作できなければ難しくなります。

また、インターネット接続業者がCGNAT（Carrier-Grade NAT）を利用している場合、家庭のルーターでポート転送を設定しても、通常のIPv4の着信接続ができないことがあります。

こうした環境では、サーバーを動かせても外部から接続する方法を用意するのが難しくなります。

そこで公開IPアドレスを持つVPSとTailscaleを利用できます。

自宅ルーターで公開用ポートを開かずに、まず自宅サーバーとVPSを接続し、VPSで外部のリクエストを受けて転送します。

もちろん、利用しているネットワークがTailscaleに必要な外向き通信を許可しており、実際に接続できる必要はあります。

Tailscaleはネットワークの条件によって直接接続する場合も、中継サーバーを通る場合もあります。

そのため、どの環境でも同じ通信速度が得られるとは限りません。

それでも、ポート転送の設定権限がない環境では検討する価値があると思います。

## 7. ウェブサーバー以外にも使える

この構成はウェブサイト専用なのでしょうか。

そうではありません。

VPSを公開入口にして、プライベートネットワークの中へトラフィックを転送するという考え方は、さまざまなサービスに応用できます。

ただし、使うネットワークプロトコルによって実際の設定は異なります。

### ウェブサーバーとバックエンドAPI

最もわかりやすい例はウェブサーバーです。

自宅で個人プロジェクトのウェブサイトを動かし、訪問者にはVPS経由でアクセスしてもらいます。

バックエンドAPIも同様です。

HTTPやHTTPSを使うサービスなら、NGINXのような一般的なウェブ用リバースプロキシでリクエストを転送できます。

サービスが複数ある場合は、ドメイン名やURLのパスによって別の内部サーバーへ振り分けることもできます。

### Minecraftなどのゲームサーバー

ゲームサーバーでも似た構造を応用できます。

たとえば自宅でMinecraftサーバーを動かし、プレイヤーがVPSの公開アドレスへ接続するようにできます。

ただし注意点があります。

ウェブサイト用のHTTPリバースプロキシの設定を、そのままゲームサーバーに使えるとは限りません。

ゲームサーバーは異なるネットワークプロトコルを使う場合があるからです。

Minecraft Java Editionは一般的にTCP、Bedrock EditionはUDPを使います。

そのため、運用するゲームに合わせてTCPまたはUDPのトラフィックを転送できるプロキシやポート中継の構成が必要です。

基本的な考え方は同じでも、使用するプログラムと設定は異なります。

すべてのサービスが普通のHTTPリバースプロキシで動くと思い込まないほうがよいでしょう。

### そのほかの個人用サービス

個人用のウェブダッシュボードやテストアプリケーションにも似た構造を利用できます。

ただし、技術的に可能だからといって管理ツールまで何でも公開することはおすすめしません。

管理者用画面やサーバー管理インターフェースのような機密性の高いサービスは、公開プロキシを通さず、認証されたデバイスからだけアクセスできるプライベートネットワークに置いたほうが適切な場合があります。

大事なのは何でも公開することではなく、**どのサービスを誰に公開するかを先に決めること**です。

## 8. 実際に運用するときの注意点

ここまで読むと、とても便利な構成に見えるかもしれません。

確かに便利ですが、短所や注意点もあります。

まず、通信経路が長くなります。

利用者と自宅サーバーが直接通信する代わりに、途中でVPSを経由するためです。

また、Tailscaleが常に機器間の直接接続を作るわけではありません。

ネットワーク環境によって中継が必要なら、遅延や通信速度にさらに影響が出る可能性があります。

私自身も以前ウェブサイトをセルフホスティングしていたとき、ネットワーク経路や接続の安定性について悩みました。

その話は[「ウェブサイトのセルフホスティングをやめて移行した理由」](/ja/blog/2026/10/why-i-moved-my-website-hosting/)で詳しく書いています。

そのため、VPSを経由する方法が直接接続より常に速いとは考えていません。

VPSも一つの依存先になります。

自宅サーバーが正常に動いていても、VPSが停止したりトンネルが切れたりすると、外部からアクセスできなくなる場合があります。

コストも重要です。

私はOracle Cloudの無料ティアを利用しましたが、無料で使える資源や利用上限には制限があります。

トラフィックが増えれば、VPSの回線帯域や処理性能がボトルネックになる可能性もあります。

無料ティアだからあらゆる状況で絶対に課金されない、とも言い切れません。実際の利用規約とアカウント設定を確認する必要があります。

最後はセキュリティです。

VPSの公開ポートとファイアウォール、Tailscaleのアクセス権限、内部サーバーで許可する接続をそれぞれ確認する必要があります。

ウェブサイトなら、訪問者とVPSの間のHTTPSも別途設定する必要があります。

TailscaleがVPSと自宅サーバーの間を暗号化しても、訪問者のブラウザーからVPSまでの通信が自動的にHTTPSになるわけではないからです。

また、プロキシの後ろにあるアプリケーションが訪問者の本来のIPアドレスを使う場合、転送ヘッダーを正しく処理し、その情報を信頼できるプロキシからのみ受け入れるようにする必要があります。

こうした点を考えると、リバースプロキシと暗号化トンネルの組み合わせも、結局は管理対象を一つ増やすことになります。

目的によっては、得られる利点より保守の負担が大きくなる可能性もあります。

## 9. 私と同じ理由で選ぶ必要はない

私がこの構成を選んだ一番の理由は、自宅サーバーのグローバルIPアドレスを一般の訪問者へ直接公開したくなかったからです。

しかし、ほかの人はまったく別の理由で同じ方法を使うかもしれません。

ポート転送ができない環境にいるかもしれませんし、自宅回線へ外部から直接接続できないのかもしれません。

複数の内部サービスを一つの公開アドレスで管理したい場合もあります。

あるいは、アプリケーションは自宅で動かしたまま、外部からの入口だけをクラウドへ移したい場合もあるでしょう。

どれも検討する理由になると思います。

ただし、VPSとリバースプロキシがいつも正解というわけではありません。

自分だけが使うサービスなら、公開せずにTailscaleのようなプライベートネットワークから直接アクセスするほうが簡単な場合もあります。

また、単純な静的ウェブサイトなら専用の静的ホスティングサービスを使うほうが便利かもしれません。

実際、現在の私のブログはCloudflare Workers Static Assetsを使っています。

つまり、**今回説明したVPSと自宅サーバーの接続構成が、このブログを現在配信している仕組みではありません**。

これは自宅サーバーのサービスを外部公開するために私が構築してきた方法についての話です。

重要なのは特定の技術を使うことではなく、自分の環境にどんな問題があるのかを理解することだと思います。

## おわりに

今回は、自宅サーバーのサービスを外部に公開するために使ったネットワーク構成を紹介しました。

Oracle CloudのVPSを公開入口にし、Tailscaleで自宅サーバーとの暗号化された接続を作り、リバースプロキシでリクエストを転送する方式です。

私にとって最大の利点は、自宅サーバーのグローバルIPアドレスを訪問者に直接見せずにサービスを公開できることでした。

同じ方式は、ポート転送が難しい環境や、複数の内部サービスを一つの公開入口で管理したいときにも活用できます。

一方で、ネットワーク経路が複雑になり、管理する構成要素も増えます。

そのため、すべての人に無条件でおすすめする方法ではありません。

ただ、自宅でサーバーを運用していて外部公開の方法に悩んでいるなら、一度調べてみる価値はあると思います。

私も最初からすべてのネットワーク技術を理解していたわけではありません。

実際にサーバーを動かす中で問題に出会い、いくつかの方法を調べて、自分の目的に合う構成を選んだのです。

この記事が、似た環境でサーバーを運用したり、新しいネットワーク構成を試したりする人の参考になればと思います。
