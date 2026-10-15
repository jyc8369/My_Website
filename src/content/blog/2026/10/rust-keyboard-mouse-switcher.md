---
title: "Rust로 키보드와 마우스 전환 프로그램을 만든 이야기"
title_en: "Building a Keyboard and Mouse Switcher in Rust"
title_ja: "Rustでキーボードとマウスの切り替えプログラムを作った話"
published_at: "2026-10-15T00:51:03-06:00"
description: "Linux와 Windows를 동시에 사용하던 시절, Rust와 쉘 스크립트로 입력 장치를 전환하던 프로그램의 개발 과정과 소스 코드 유실에서 배운 점을 기록합니다."
description_en: "How I built a Rust and shell-script tool to switch input devices between Linux and Windows, and what I learned after losing its source code."
description_ja: "LinuxとWindowsの間で入力デバイスを切り替えるRustとシェルスクリプトのツールを作った経験と、ソースコードを失って学んだことを振り返ります。"
---

<!-- lang:ko -->
## Rust로 키보드와 마우스 전환 프로그램을 만든 이야기

예전에 Linux를 메인 운영체제로 사용하던 시절, 키보드와 마우스를 전환하기 위해 Rust로 작은 프로그램을 만든 적이 있습니다.

거창한 프로젝트는 아니었습니다. 다른 사람에게 배포하거나 많은 기능을 제공하려는 목적도 없었습니다. 단순히 제가 컴퓨터를 사용하면서 느끼던 불편함을 해결하고 싶어서 만든 프로그램이었습니다.

그런데 지금 돌아보면 이 작은 프로그램에도 여러 시행착오가 있었습니다. 운영체제의 입력 장치를 직접 다루는 일부터 USB 장치 전환 문제, 그리고 지금은 소스 코드조차 남아 있지 않다는 아쉬운 결말까지 있었습니다.

이번 글에서는 그 프로그램을 왜 만들었고, 어떤 방식으로 작동했으며, 개발하면서 무엇을 배웠는지 이야기해 보려고 합니다.

## 1. 두 운영체제를 동시에 사용하던 환경

먼저 당시 사용하던 컴퓨터 환경을 간단히 설명하겠습니다.

저는 예전에 Linux를 메인 운영체제로 사용하면서 Windows를 가상 머신으로 실행했습니다. 일반적인 듀얼 부팅과 달리 두 운영체제를 동시에 사용할 수 있는 환경이었습니다.

GPU 패스스루를 이용해 Windows 가상 머신에 별도의 그래픽카드를 할당했고, 각각의 모니터에서 Linux와 Windows를 사용할 수 있도록 구성했습니다.

이 시스템을 구성한 과정이나 지금은 사용하지 못하게 된 이유는 이전 글인 [「Linux를 떠나 Windows를 다시 사용하게 된 이유」](/ko/blog/2026/10/why-i-returned-to-windows/)에서 설명했습니다. 이번에는 해당 환경에서 발생했던 입력 장치 문제에 집중하겠습니다.

두 운영체제를 동시에 사용하는 것까지는 좋았습니다. 하지만 실제로 사용하다 보니 생각보다 불편한 부분이 있었습니다.

바로 키보드와 마우스였습니다.

## 2. 키보드와 마우스를 어떻게 전환할 것인가?

Linux와 Windows를 동시에 실행하더라도 입력 장치를 어떻게 사용할지는 별개의 문제입니다.

일반적인 방법으로는 운영체제마다 키보드와 마우스를 별도로 연결하거나, KVM 스위치 같은 장치를 이용해 하나의 입력 장치를 여러 시스템에서 공유할 수 있습니다.

하지만 저는 조금 다른 방법을 선택하고 싶었습니다.

가장 큰 이유는 책상 공간과 사용 편의성이었습니다.

키보드 두 대를 놓는 것이 무조건 공간을 많이 차지하는 것은 아닙니다. 문제는 키보드를 사용하는 위치에 있습니다.

보통 키보드는 손이 편하게 닿는 위치에 놓고 사용합니다. 두 대를 책상 위에 배치하면 하나는 앞쪽에, 다른 하나는 조금 더 먼 곳에 두게 됩니다.

이때 두 키보드를 모두 일반적인 입력 장치로 사용한다면 운영체제를 전환할 때마다 키보드를 옮기거나 손을 뻗어야 합니다.

저는 이 부분이 불편했습니다.

Linux에서 작업하다가 Windows로 넘어가고, 다시 Linux로 돌아오는 일이 자주 있었기 때문입니다. 운영체제는 바로 전환할 수 있는데 매번 키보드 위치를 바꿔야 한다면 사용 경험이 좋지 않았습니다.

그래서 생각한 방법이 키보드 두 대와 마우스 한 대를 사용하되, **두 키보드의 역할을 완전히 다르게 만드는 것**이었습니다.

손 앞에 있는 키보드는 실제 작업에 사용하는 메인 키보드로 두고, 책상 위쪽에 있는 다른 키보드는 운영체제 전환을 위한 제어 장치로 사용하는 방식입니다.

마우스 역시 별도로 두 대를 사용할 필요 없이 전환해서 사용하고 싶었습니다.

## 3. 키보드 하나를 제어 장치로 사용하다

여기에는 한 가지 문제가 있었습니다.

메인 키보드와 마우스를 Windows 가상 머신에 넘기면 Linux에서는 해당 장치로 입력을 받을 수 없게 됩니다.

반대로 Windows에서 작업하다가 Linux로 돌아오려면 입력 장치를 다시 Linux 쪽으로 가져와야 합니다.

그런데 전환 명령을 내릴 수 있는 입력 장치가 Windows에 연결되어 있다면 Linux에서는 어떻게 전환 작업을 실행할 수 있을까요?

이 문제를 해결하기 위해 저는 별도의 키보드 하나를 Linux에 계속 연결해 두었습니다.

이 키보드는 일반적인 문자 입력용이 아니었습니다. 사실상 물리적인 제어판에 가까웠습니다.

그리고 이 키보드의 입력을 감지하는 프로그램을 Rust로 작성했습니다.

구조는 비교적 단순했습니다.

Linux가 해당 키보드를 HID(Human Interface Device) 입력 장치로 인식하면, Rust 프로그램이 그 장치에서 발생하는 원시 입력 이벤트를 읽도록 했습니다.

일반적인 키보드 입력은 운영체제가 처리한 뒤 실행 중인 프로그램에 전달됩니다. 하지만 저는 특정 키 입력을 일반적인 문자 입력이나 단축키로 사용하지 않고, 별도의 시스템 제어 명령으로 처리하고 싶었습니다.

그래서 프로그램이 지정된 키보드에서 발생하는 입력 이벤트를 감지하고, 특정 키가 눌리면 대응하는 작업을 실행하도록 만들었습니다.

제가 전환에 사용한 키는 `Esc`였습니다.

제어용 키보드에서 `Esc`를 누르면 Rust 프로그램이 그 입력을 받아 전환 작업을 시작했습니다. 해당 키 입력은 일반적인 운영체제 입력으로 전달되지 않도록 처리했습니다.

결과적으로 메인 키보드와 마우스가 Windows에 연결되어 있더라도, Linux에 남아 있는 제어용 키보드를 통해 다시 전환 작업을 실행할 수 있었습니다.

키보드 한 대를 추가로 사용하기는 했지만, 실제 타이핑에 사용하는 키보드를 매번 옮길 필요는 없었습니다.

제가 원했던 것도 바로 이런 사용 방식이었습니다.

## 4. 전환 작업을 Rust가 아닌 쉘 스크립트로 처리한 이유

프로그램의 핵심 역할은 입력을 감지하는 것이었습니다.

특정 키가 눌렸다는 사실을 감지하고, 그에 대응하는 Linux 쉘 스크립트를 실행하도록 했습니다.

그렇다면 왜 USB 장치 전환 과정까지 Rust 프로그램에 모두 구현하지 않았을까요?

가장 큰 이유는 개발 과정에서 겪었던 문제 때문입니다.

처음에는 입력 장치를 전환하는 과정이 생각보다 간단하지 않았습니다.

USB 장치를 식별할 때 원하는 장치의 ID를 제대로 찾지 못하는 경우가 있었고, 장치를 다른 운영체제로 넘기더라도 즉시 인식되지 않는 문제도 있었습니다.

문제의 대부분은 키보드 입력을 읽는 부분보다 실제로 장치를 분리하고 다시 연결하는 과정에서 발생했습니다.

원시 키보드 이벤트를 받아 특정 키가 눌렸는지 확인하는 작업 자체는 상대적으로 어렵지 않았습니다.

반면 장치 전환은 당시 시스템 구성과 장치 상태에 따라 조정해야 할 부분이 있었습니다.

그래서 저는 두 작업을 분리했습니다.

**Rust 프로그램은 입력을 감지하고, 쉘 스크립트는 실제 장치 전환 작업을 수행하는 구조**였습니다.

이렇게 구성하면 전환 과정에서 문제가 발생하더라도 Rust 프로그램을 수정하고 다시 컴파일할 필요가 없었습니다.

쉘 스크립트를 수정한 뒤 다시 실행해 보면 됐습니다.

예를 들어 장치 식별 방법을 변경하거나 장치 전환 과정에 필요한 처리를 조정해야 한다면, 쉘 스크립트만 수정할 수 있었습니다.

당시에는 필요한 기능도 복잡하지 않았습니다. 프로그램에 다양한 기능을 넣기보다는 제가 원하는 전환 작업 하나를 안정적으로 수행하도록 만드는 것이 중요했습니다.

지금 생각해도 당시 목적에는 비교적 합리적인 구조였다고 생각합니다.

모든 작업을 하나의 프로그램에 넣는 것보다, 변경이 자주 필요한 부분을 분리하는 편이 유지보수하기 쉬웠기 때문입니다.

## 5. 왜 Rust를 선택했을까?

운영체제의 입력 장치를 직접 다루는 프로그램이라면 C나 C++도 충분히 고려할 수 있습니다.

실제로 C와 C++는 운영체제와 하드웨어에 가까운 영역에서 오랫동안 사용되어 온 언어입니다.

그런데 저는 Rust를 선택했습니다.

가장 단순한 이유는 당시 제가 Rust에 많은 관심을 가지고 있었고, 가장 선호하는 프로그래밍 언어였기 때문입니다.

하지만 단순히 좋아하는 언어라는 이유만 있었던 것은 아닙니다.

이 프로그램은 일반적인 유틸리티와 조금 달랐습니다. 특정 작업을 수행하고 종료하는 프로그램이 아니라, 컴퓨터를 사용하는 동안 계속 실행되어야 하는 프로그램이었습니다.

키보드 전환이 필요할 때만 프로그램을 실행하는 방식으로는 제가 원하는 사용 경험을 만들기 어려웠습니다.

따라서 프로그램을 백그라운드에서 상시 실행하고, 키보드 입력을 기다리도록 해야 했습니다.

이런 프로그램에서는 장시간 실행에 따른 안정성도 고려하고 싶었습니다.

Rust는 소유권과 빌림 검사 등을 통해 여러 메모리 안전성 문제를 컴파일 단계에서 발견할 수 있습니다. 일반적인 추적형 가비지 컬렉터에 의존하지 않는다는 점도 제가 선호하는 특성이었습니다.

물론 Rust로 작성했다고 프로그램이 반드시 안정적으로 실행되는 것은 아닙니다. 논리적인 오류가 발생할 수도 있고, 운영체제나 외부 장치 상태에 따라 문제가 생길 수도 있습니다.

그래도 제가 원하는 시스템 프로그래밍 방식과 잘 맞는 언어였습니다.

Rust를 좋아하는 기술적인 이유에 대해서는 이전 글인 [「내가 Rust를 가장 좋아하는 이유」](/ko/blog/2026/10/why-i-like-rust/)에서 더 자세하게 설명했습니다.

## 6. 소스 코드가 사라졌다

이쯤에서 프로그램의 실제 소스 코드나 구현 예제를 보여드리면 좋겠지만, 아쉽게도 지금은 그럴 수 없습니다.

**소스 코드를 잃어버렸기 때문입니다.**

조금 부끄러운 이야기입니다.

당시에는 이 프로그램을 다른 사람에게 공개하거나 배포할 생각이 없었습니다.

오직 제 컴퓨터에서 편하게 사용하기 위해 만든 도구였기 때문에 GitHub 같은 원격 저장소에 올려 두지도 않았습니다.

프로그램은 정상적으로 작동했고, 저는 그대로 사용했습니다.

문제는 나중에 컴퓨터를 바꾸고 기존 환경을 정리하면서 발생했습니다.

저는 당연히 소스 코드가 어딘가에 백업되어 있을 것으로 생각했습니다.

평소에도 여러 프로젝트와 파일을 관리했기 때문에 이 프로그램 역시 백업되어 있을 거라고 막연히 믿었던 것 같습니다.

하지만 시스템을 포맷하고 나서 확인해 보니 소스 코드는 남아 있지 않았습니다.

백업되어 있을 것이라고 생각했던 것과 실제로 백업되어 있는 것은 완전히 다른 이야기였습니다.

결국 프로그램의 전체 소스 코드를 잃어버렸습니다.

지금도 당시 프로그램이 대략 어떤 구조로 작동했는지는 기억합니다. 하지만 구체적인 구현 코드까지 정확하게 기억하지는 못합니다.

그래서 이번 글에서도 실제로 작성했던 코드인 것처럼 예제를 만들어 보여드리지는 않으려고 합니다.

기억하고 있는 설계와 동작 방식을 설명하는 정도가 지금 할 수 있는 가장 정확한 기록이라고 생각합니다.

## 7. 지금도 같은 프로그램이 필요할까?

현재는 당시와 같은 환경을 사용하지 않고 있습니다.

컴퓨터를 업그레이드하면서 이전에 사용하던 GPU 패스스루 구성을 그대로 재현하기 어려워졌기 때문입니다.

특히 IOMMU 그룹 문제로 인해 원하는 방식으로 장치를 분리하기 어려웠고, 결국 현재는 Windows를 메인 데스크톱 운영체제로 사용하고 있습니다.

이 과정은 앞서 소개한 Linux와 Windows 관련 글에서 다루었으므로 여기서는 자세한 설명을 생략하겠습니다.

만약 새 컴퓨터에서도 예전과 같은 가상화 환경을 구성할 수 있었다면 어떻게 되었을까요?

아마 그때 사용하던 입력 장치 전환 프로그램이 다시 필요했을 것입니다.

그런데 소스 코드가 없으니 처음부터 다시 개발해야 했겠죠.

물론 이전에 직접 만들어 본 경험이 있으니 처음보다 빠르게 구현할 수는 있었을 것입니다. 구조도 어느 정도 기억하고 있고, 당시 어떤 문제가 발생했는지도 알고 있기 때문입니다.

하지만 이미 한 번 해결했던 문제를 다시 해결해야 한다는 것은 아쉬운 일입니다.

프로그램을 잃어버리지 않았다면 기존 코드를 수정해서 새로운 환경에 맞출 수도 있었을 것입니다.

## 8. 개인용 프로그램도 백업은 필요하다

이 프로젝트를 돌아보며 가장 아쉽게 생각하는 부분은 소스 코드를 제대로 관리하지 않았다는 점입니다.

당시에는 누구에게 보여줄 생각도 없었고, 다른 사람이 사용할 가능성도 거의 없다고 생각했습니다.

그래서 굳이 저장소를 만들거나 배포할 이유가 없다고 판단했습니다.

하지만 지금 생각해 보면 공개 배포와 소스 코드 백업은 전혀 다른 문제입니다.

다른 사람에게 공개하지 않는 프로그램이라도 개발한 사람에게는 충분한 가치가 있습니다.

특히 직접 겪었던 문제를 해결하는 과정에서 작성한 코드는 시간이 지나면 다시 참고할 수 있는 자료가 됩니다.

당시에는 필요했던 기능 하나만 작동하면 됐지만, 지금은 어떻게 구현했는지 다시 살펴보고 싶은 마음도 있습니다.

그런 의미에서 이 프로그램은 제게 두 가지 경험을 남겼습니다.

하나는 운영체제와 입력 장치를 직접 다루면서 원하는 사용 환경을 만들 수 있었다는 경험입니다.

다른 하나는 개인적으로 사용하는 작은 프로그램이라도 소스 코드를 제대로 보관해야 한다는 교훈입니다.

## 마치며

이번에 소개한 Rust 프로그램은 대단한 기능을 제공하는 소프트웨어는 아니었습니다.

Linux와 Windows를 동시에 사용하면서 키보드와 마우스를 전환하는 일이 불편했고, 그 문제를 해결하기 위해 직접 만든 작은 도구였습니다.

하지만 그 과정에서 운영체제의 입력 이벤트를 다루고, USB 장치를 전환하고, Rust와 쉘 스크립트를 조합하는 경험을 할 수 있었습니다.

또한 Linux를 좋아하는 이유를 다시 생각하게 만드는 프로젝트이기도 했습니다.

Linux에서는 시스템의 여러 동작을 직접 살펴보고, 필요한 경우 스크립트나 별도의 프로그램을 만들어 작업 방식을 바꿀 수 있습니다.

물론 모든 작업이 간단하거나 제한 없이 가능한 것은 아닙니다. 그래도 사용자가 시스템을 원하는 방향으로 구성할 수 있다는 점은 제가 Linux를 선호하는 큰 이유 중 하나입니다.

무엇보다 이 프로그램은 제가 프로그래밍을 좋아하는 이유를 보여주는 사례라고 생각합니다.

누군가에게 보여주기 위해서가 아니라, **제가 사용하는 컴퓨터를 조금 더 편하게 만들고 싶어서 직접 프로그램을 작성했던 경험**이기 때문입니다.

지금은 코드가 남아 있지 않지만, 그때 어떤 문제를 만났고 어떻게 해결했는지는 이렇게 글로 남길 수 있습니다.

앞으로는 이런 작은 프로젝트도 소스 코드와 함께 잘 보관하려고 합니다.

<!-- lang:en -->
## Building a Keyboard and Mouse Switcher in Rust

Back when Linux was my primary operating system, I built a small Rust program to switch my keyboard and mouse between operating systems.

It was not an ambitious project. I had no plans to distribute it or turn it into a feature-rich application. I simply wanted to solve an annoyance in the way I used my own computer.

Looking back, even this small tool involved quite a bit of trial and error: interacting directly with input devices, dealing with USB switching, and, unfortunately, ending up without any surviving source code.

In this post, I want to explain why I built it, how it worked, and what the experience taught me.

## 1. Running two operating systems at the same time

First, a brief explanation of my setup at the time.

I used Linux as my main operating system and ran Windows in a virtual machine. Unlike conventional dual booting, this allowed both systems to run simultaneously.

Using GPU passthrough, I assigned a separate graphics card to the Windows VM and set things up so I could use Linux and Windows on their respective monitors.

I have already covered how I built that environment and why I can no longer use it in [“Why I Left Linux and Went Back to Windows”](/en/blog/2026/10/why-i-returned-to-windows/). Here, I will focus on a particular problem that came with it: input devices.

Being able to run both operating systems at once was great. But once I started using the setup regularly, one inconvenience became surprisingly noticeable.

The keyboard and mouse.

## 2. How should I switch the keyboard and mouse?

Running Linux and Windows simultaneously does not automatically solve the question of which operating system receives input.

One common approach is to connect a separate keyboard and mouse to each system. Another is to use a KVM switch to share input devices.

I wanted to try something different.

My main concerns were desk space and convenience.

Having two keyboards does not necessarily take up an unreasonable amount of room. The real problem is where you have to place them.

Normally, you keep a keyboard within comfortable reach. With two on the same desk, one tends to sit in front of you while the other is farther away.

If both are regular typing keyboards, switching operating systems means moving a keyboard or reaching for the other one every time.

That bothered me.

I frequently moved from Linux to Windows and back again. Being able to change operating systems instantly did not feel very useful if I also had to rearrange my keyboard each time.

So I came up with a way to use two keyboards and one mouse while **giving the two keyboards completely different roles**.

The keyboard directly in front of me would remain my main typing keyboard. The second keyboard, placed farther up the desk, would act as a control device for switching operating systems.

I also wanted to share one mouse rather than keep a separate mouse for each environment.

## 3. Turning a keyboard into a control device

There was one important problem with this idea.

Once I passed my main keyboard and mouse through to the Windows VM, Linux could no longer receive input from those devices.

To return from Windows to Linux, I needed a way to hand them back to the Linux host.

But if the devices capable of issuing the switching command were already connected to Windows, how could I trigger the command on Linux?

My solution was to leave a second keyboard permanently connected to Linux.

I did not use that keyboard for ordinary typing. It was essentially a physical control panel.

I wrote a Rust program to watch its input.

The design was fairly simple.

Once Linux recognized the keyboard as an HID (Human Interface Device), the Rust program read raw input events from that device.

Normally, keyboard input is processed by the operating system before being delivered to applications. In my case, I did not want a designated keypress to behave as text input or a normal shortcut. I wanted it to trigger a system-control action.

So the program monitored events from the specific keyboard and performed a predefined action when a particular key was pressed.

The key I chose was `Esc`.

Pressing `Esc` on the control keyboard caused the Rust program to receive the event and start the switching procedure. I also arranged for that keystroke not to reach the operating system as ordinary input.

This meant that even when the main keyboard and mouse were attached to Windows, I could still trigger their return using the control keyboard connected to Linux.

I did have a second keyboard on the desk, but I no longer needed to move the keyboard I actually typed on.

That was exactly the experience I wanted.

## 4. Why I delegated switching to a shell script

The Rust program's primary responsibility was detecting input.

When it recognized a designated keypress, it launched the corresponding Linux shell script.

Why did I not implement the entire USB switching procedure in Rust as well?

Mostly because of the problems I encountered during development.

Switching input devices was less straightforward than I initially expected.

Sometimes the system failed to find the intended device ID or USB identifier. At other times, a device passed to the other operating system would not be recognized immediately.

Most of my difficulties occurred while detaching and reconnecting devices, not while reading keyboard input.

Receiving a raw event and determining which key had been pressed was relatively uncomplicated.

The actual switching procedure, on the other hand, needed adjustments depending on the system configuration and the state of the devices.

That led me to separate the responsibilities.

**Rust detected the input; a shell script performed the actual device switching.**

If something went wrong in the switching sequence, I could change the script without modifying and recompiling the Rust program.

I could simply edit the shell script and try again.

For example, if I needed to change how a device was identified or adjust a step in the switching process, I only had to update the script.

The program did not need many features at the time. My priority was making one specific switching action work reliably, not adding a wide range of functionality.

I still think that separation made sense for the problem I had.

Keeping the frequently changing part outside the compiled program made it easier to maintain.

## 5. Why did I choose Rust?

For software that interacts directly with operating-system input devices, C or C++ would also have been reasonable choices.

Both languages have long been used for systems programming and software that works close to operating systems and hardware.

I chose Rust instead.

The simplest reason is that I was particularly interested in Rust at the time, and it was my favorite programming language.

But personal preference was not the only reason.

This was somewhat different from a typical utility that runs a task and exits. It needed to stay active for as long as I was using the computer.

Launching the program only when I wanted to switch keyboards would not have delivered the experience I was after.

It needed to keep running in the background, waiting for keyboard input.

For a long-running process like that, I also wanted to consider stability over time.

Rust's ownership and borrowing rules help catch many memory-safety problems during compilation. I also appreciated that it does not rely on a conventional tracing garbage collector.

Of course, writing a program in Rust does not guarantee that it will always work reliably. Logic errors are still possible, as are problems involving the operating system or external devices.

Even so, Rust was a good fit for the kind of systems programming I wanted to do.

I discussed my broader reasons for liking the language in [“Why Rust Is My Favorite Programming Language”](/en/blog/2026/10/why-i-like-rust/).

## 6. The source code disappeared

This would be a good place to show the actual source code or an implementation example. Unfortunately, I cannot.

**I lost the source code.**

It is a little embarrassing to admit.

At the time, I had no intention of publishing or distributing this program.

It was a tool made solely for my own convenience, so I never uploaded it to a remote repository such as GitHub.

The program worked, and I continued using it.

The trouble came later, when I replaced my computer and cleaned up my old environment.

I assumed I must have backed up the source code somewhere.

I regularly managed other projects and files, so I vaguely believed this one would have been included in a backup too.

But after formatting the system, I discovered that the source code was nowhere to be found.

Assuming something has been backed up and actually having a backup are two very different things.

In the end, I lost the entire source code.

I still remember the general design and how the program behaved, but not the precise implementation.

That is why I am not going to invent example code and present it as something I originally wrote.

Describing the design and behavior as accurately as I remember them is the most honest record I can provide now.

## 7. Would I still need the same program today?

I no longer use the same computing environment.

After upgrading my computer, I found it difficult to recreate the GPU passthrough setup I had used before.

In particular, problems with IOMMU grouping made it difficult to isolate devices in the way I wanted. I eventually returned to using Windows as my primary desktop operating system.

I explained that story in my earlier Linux and Windows post, so I will not go into the details again here.

What if I had been able to rebuild the same virtualization environment on my new computer?

I would probably have needed that input-device switching program again.

But without the source code, I would have had to develop it from scratch.

Having built it once, I might have completed it faster the second time. I remember the overall architecture and the issues I encountered.

Still, it would have been frustrating to solve a problem I had already solved.

If I had kept the program, I could have tried adapting the existing code to the new environment instead.

## 8. Even personal programs need backups

The part I regret most about this project is how poorly I managed its source code.

At the time, I did not expect anyone else to see it, let alone use it.

So I saw little reason to create a repository or release it.

Looking back, though, publishing software and backing up its source code are completely different matters.

A program can be valuable to its author even if it is never made public.

Code written to solve a problem can also become useful reference material years later.

Back then, all that mattered was getting the feature to work. Now I would like to look back at the implementation and understand exactly what I did.

This project left me with two important experiences.

First, I learned that I could shape my computing environment by working directly with operating-system input devices.

Second, I learned that even a small, entirely personal program deserves a proper source-code backup.

## Closing thoughts

The Rust program I have described was not a sophisticated piece of software.

I built it because switching my keyboard and mouse between Linux and Windows was inconvenient, and I wanted to make my own setup easier to use.

Along the way, I gained experience with operating-system input events, USB device switching, and combining Rust with Linux shell scripts.

It was also a project that reminded me why I enjoy Linux.

On Linux, I can inspect many aspects of how the system works and, when necessary, change my workflow with scripts or custom programs.

Not every operation is easy or unrestricted, of course. But having the freedom to shape a system around my needs is one of the main reasons I prefer Linux.

Above all, this project captures what I enjoy about programming.

I did not build it to impress anyone. **I built it because I wanted to make the computer I use a little more convenient for myself.**

The code is gone, but I can still record the problem I faced and how I approached solving it.

From now on, I intend to keep the source code for even these small personal projects.

<!-- lang:ja -->
## Rustでキーボードとマウスの切り替えプログラムを作った話

以前、LinuxをメインのOSとして使っていた頃、キーボードとマウスを切り替えるための小さなプログラムをRustで作ったことがあります。

大きなプロジェクトではありませんでした。他の人に配布したり、多機能なアプリケーションにしたりするつもりもありません。ただ、自分のパソコンを使う中で感じていた不便を解消したくて作ったものでした。

しかし今振り返ると、この小さなツールにもさまざまな試行錯誤がありました。OSの入力デバイスを直接扱うこと、USBデバイスの切り替えで起きた問題、そして残念ながらソースコードすら残っていないという結末までありました。

今回は、なぜこのプログラムを作ったのか、どのように動いていたのか、そして何を学んだのかを書いてみます。

## 1. 二つのOSを同時に動かしていた環境

まず、当時のパソコン環境を簡単に説明します。

以前の私はLinuxをメインのOSとして使いながら、Windowsを仮想マシンで動かしていました。一般的なデュアルブートとは違い、二つのOSを同時に使用できる環境でした。

GPUパススルーを使ってWindowsの仮想マシンに別のグラフィックカードを割り当て、LinuxとWindowsをそれぞれのモニターで操作できるようにしていました。

この環境をどう構築したのか、そして今はなぜ使えなくなったのかについては、以前の記事[「Linuxを離れてWindowsに戻った理由」](/ja/blog/2026/10/why-i-returned-to-windows/)で説明しています。今回は、その環境で発生した入力デバイスの問題に絞って話します。

二つのOSを同時に使えるところまではよかったのですが、実際に使い始めると、思った以上に不便な点がありました。

それがキーボードとマウスでした。

## 2. キーボードとマウスをどう切り替えるか

LinuxとWindowsを同時に実行できても、入力デバイスをどちらで使うかは別の問題です。

一般的にはOSごとにキーボードとマウスを用意したり、KVMスイッチなどを使って入力デバイスを共有したりします。

しかし私は、少し違う方法を試したいと思いました。

一番の理由は、机のスペースと操作のしやすさです。

キーボードを二台置くこと自体が、必ずしも大きなスペースの無駄になるわけではありません。問題は、実際に使う位置です。

普通、キーボードは手が自然に届く場所に置きます。二台を同じ机に並べると、一台は手前に、もう一台は少し奥に置くことになります。

両方を普通の文字入力用として使うなら、OSを切り替えるたびにキーボードを動かしたり、奥のキーボードに手を伸ばしたりしなければなりません。

私はそれが不便でした。

Linuxで作業してからWindowsに移り、またLinuxに戻ることが頻繁にあったからです。OSをすぐに切り替えられても、そのたびにキーボードの位置を変えるのでは使い心地がよくありません。

そこで考えたのが、キーボード二台とマウス一台を使いつつ、**二台のキーボードにまったく異なる役割を持たせること**でした。

手元のキーボードは普段の作業に使うメインのキーボードとして残し、机の奥に置いたもう一台をOS切り替え用の制御デバイスにする方法です。

マウスも二台用意せず、一台を切り替えて使いたいと思いました。

## 3. キーボード一台を制御デバイスにする

ただし、この方法には一つ問題がありました。

メインのキーボードとマウスをWindowsの仮想マシンに渡すと、Linuxはそれらのデバイスから入力を受け取れなくなります。

WindowsからLinuxに戻るには、入力デバイスを再びLinux側に戻さなければなりません。

しかし、切り替え命令を出すためのデバイスがすでにWindowsにつながっているとしたら、Linux側でどうやって切り替え処理を実行すればよいのでしょうか。

この問題を解決するため、もう一台のキーボードをLinuxに常時接続しておきました。

そのキーボードは普通の文字入力には使いません。実質的には物理的な操作パネルのようなものでした。

そして、このキーボードからの入力を検知するプログラムをRustで書きました。

仕組みは比較的単純でした。

LinuxがキーボードをHID（Human Interface Device）として認識すると、Rustプログラムがそのデバイスから発生する生の入力イベントを読み取るようにしました。

一般的なキーボード入力は、OSで処理された後にアプリケーションへ渡されます。しかし私は、特定のキー入力を文字入力や普通のショートカットとして使うのではなく、システムを制御する命令として扱いたかったのです。

そこでプログラムが指定したキーボードの入力イベントを監視し、特定のキーが押されると対応する処理を実行するようにしました。

切り替えに使ったキーは`Esc`でした。

制御用キーボードで`Esc`を押すと、Rustプログラムがそのイベントを受け取り、切り替え処理を開始します。そのキー入力が通常の入力としてOS側に渡らないようにもしていました。

これにより、メインのキーボードとマウスがWindowsにつながっていても、Linuxに残した制御用キーボードから元に戻す操作ができました。

キーボードは一台増えましたが、実際にタイピングするキーボードを毎回動かす必要はなくなりました。

私が求めていたのは、まさにこの使い方でした。

## 4. 切り替え処理をRustではなくシェルスクリプトに任せた理由

Rustプログラムの主な役割は入力を検知することでした。

指定したキーが押されたことを検知すると、それに対応するLinuxのシェルスクリプトを実行する仕組みです。

では、なぜUSBデバイスの切り替え処理までRustで実装しなかったのでしょうか。

一番の理由は、開発中に遭遇した問題にありました。

最初は、入力デバイスの切り替えが思ったほど簡単ではありませんでした。

USBデバイスを識別するときに目的のデバイスIDを見つけられないこともあれば、別のOSにデバイスを渡してもすぐには認識されないこともありました。

問題の大半はキーボード入力の読み取りではなく、デバイスを切り離して再接続する段階で発生していました。

生のキーボードイベントを受け取り、どのキーが押されたかを判断する部分は比較的簡単でした。

一方、実際の切り替え処理では、当時のシステム構成やデバイスの状態に応じて調整が必要でした。

そこで、二つの役割を分けることにしました。

**Rustプログラムは入力を検知し、シェルスクリプトが実際のデバイス切り替えを担当する構成**です。

このようにすれば、切り替えの途中で問題が起きてもRustプログラムを修正して再コンパイルする必要がありません。

シェルスクリプトを編集して、もう一度試せばよかったのです。

たとえばデバイスの識別方法を変えたり、切り替え手順の一部を調整したりするときも、スクリプトだけを直せました。

当時必要だった機能はそれほど複雑ではありません。多くの機能を追加するより、目的の切り替え操作を一つ、安定して実行できることが重要でした。

今考えても、当時の目的には比較的合理的な構成だったと思います。

すべてを一つのプログラムに詰め込むより、頻繁に変更する部分を分離したほうが保守しやすかったからです。

## 5. なぜRustを選んだのか

OSの入力デバイスを直接扱うプログラムなら、CやC++も十分に選択肢になります。

実際、CとC++はOSやハードウェアに近い分野で長く使われてきた言語です。

それでも私はRustを選びました。

一番単純な理由は、当時Rustに強い関心があり、最も好きなプログラミング言語だったからです。

しかし、好きだからという理由だけではありませんでした。

このプログラムは、処理が終われば終了する一般的なユーティリティとは少し違いました。パソコンを使っている間、ずっと実行されている必要がありました。

キーボードを切り替えたいときだけプログラムを起動するのでは、望んでいた操作感を実現できません。

そのため、バックグラウンドで常時動かし、キーボード入力を待ち受ける必要がありました。

このように長時間動かすプログラムでは、安定性も意識したかったのです。

Rustの所有権と借用の仕組みは、さまざまなメモリ安全性の問題をコンパイル時に発見する助けになります。一般的なトレース型ガベージコレクタに依存しない点も、私が好んでいた特徴でした。

もちろんRustで書けば必ず安定するわけではありません。ロジックの誤りも起こり得ますし、OSや外部デバイスの状態に左右される問題もあります。

それでも、私がやりたかったシステムプログラミングに合っている言語でした。

Rustを好む技術的な理由については、以前の記事[「私がRustを一番好きな理由」](/ja/blog/2026/10/why-i-like-rust/)で詳しく説明しています。

## 6. ソースコードが消えてしまった

ここで実際のソースコードや実装例をお見せできればよいのですが、残念ながらそれはできません。

**ソースコードを失くしてしまったからです。**

少し恥ずかしい話です。

当時、このプログラムを公開したり、他の人に配布したりするつもりはありませんでした。

自分のパソコンを便利にするためだけに作ったツールだったので、GitHubのようなリモートリポジトリにもアップロードしていませんでした。

プログラムは問題なく動き、私はそのまま使い続けました。

問題が起きたのは、その後パソコンを買い替え、古い環境を整理したときです。

ソースコードは当然どこかにバックアップしてあると思い込んでいました。

普段から他のプロジェクトやファイルを管理していたので、このプログラムもきっとバックアップに含まれていると漠然と信じていたのだと思います。

しかし、システムをフォーマットした後に確認すると、ソースコードはどこにも残っていませんでした。

バックアップしたつもりでいることと、実際にバックアップが存在することは、まったく別の話でした。

結局、プログラムのソースコードをすべて失いました。

今でも全体的な構成や動作の流れは覚えていますが、具体的にどう実装したかまでは正確に覚えていません。

そのため、今回の記事でも新たにサンプルコードを作り、それを当時の実際のコードであるかのように紹介することはしません。

覚えている設計と動作を説明することが、今できる最も正確な記録だと思っています。

## 7. 今も同じプログラムが必要だろうか

現在は当時と同じ環境を使っていません。

パソコンをアップグレードしたところ、それまでのGPUパススルー構成をそのまま再現することが難しくなったためです。

特にIOMMUグループの問題で、望んだ形でデバイスを分離するのが難しくなり、結局今はWindowsをメインのデスクトップOSとして使っています。

この経緯は前述のLinuxとWindowsの記事で説明したので、ここでは詳しく触れません。

もし新しいパソコンでも以前と同じ仮想化環境を構築できていたら、どうなっていたでしょうか。

おそらく、あの入力デバイス切り替えプログラムが再び必要になっていたはずです。

ところがソースコードがないため、最初から作り直すことになったでしょう。

もちろん一度自分で作った経験があるので、二回目はもっと早く実装できたかもしれません。おおまかな構成も、当時発生した問題も覚えています。

それでも、一度解決した問題にもう一度取り組まなければならないのは残念なことです。

ソースコードを残していれば、既存のコードを新しい環境に合わせて修正することもできたはずです。

## 8. 個人用プログラムにもバックアップは必要

このプロジェクトで最も後悔しているのは、ソースコードをきちんと管理しなかったことです。

当時は誰かに見せる予定もなく、他の人が使う可能性もほとんどないと思っていました。

だからリポジトリを作ったり、配布したりする理由がないと判断しました。

しかし今考えると、一般公開とソースコードのバックアップはまったく別の問題です。

他の人に公開しないプログラムでも、開発した本人にとっては十分に価値があります。

自分が直面した問題を解決するために書いたコードは、時間が経ってから参考資料になることもあります。

当時は必要な機能が動けば十分でしたが、今はどう実装していたのか見返してみたい気持ちもあります。

このプログラムは、私に二つの経験を残しました。

一つは、OSの入力デバイスを直接扱い、自分の望む使用環境を作れたことです。

もう一つは、個人的に使う小さなプログラムでもソースコードをきちんと保管すべきだという教訓です。

## おわりに

今回紹介したRustプログラムは、特別に多くの機能を持ったソフトウェアではありませんでした。

LinuxとWindowsを同時に使う中で、キーボードとマウスの切り替えが不便だったため、それを解決しようと自分で作った小さなツールです。

しかし、その過程でOSの入力イベントを扱い、USBデバイスを切り替え、Rustとシェルスクリプトを組み合わせる経験ができました。

また、私がLinuxを好きな理由を改めて考えるきっかけにもなりました。

Linuxでは、システムのさまざまな動きを自分で調べ、必要ならスクリプトや独自のプログラムを作って作業の流れを変えられます。

もちろん、すべてが簡単だったり無制限にできたりするわけではありません。それでも、自分の望む方向にシステムを構成できる自由さは、私がLinuxを好む大きな理由の一つです。

何より、このプログラムは私がプログラミングを好きな理由をよく表していると思います。

誰かに見せるためではなく、**自分が使うパソコンを少しでも便利にしたくて、自分でプログラムを書いた経験**だからです。

コードはもう残っていませんが、どんな問題に遭遇し、どのように解決しようとしたのかは、こうして文章に残せます。

これからは、このような小さなプロジェクトでもソースコードをきちんと保管していきたいと思います。
