---
title: "Linux를 떠나 Windows를 다시 사용하게 된 이유"
title_en: "Why I Left Linux and Went Back to Windows"
title_ja: "Linuxを離れてWindowsに戻った理由"
published_at: "2026-10-15T05:52:30Z"
description: "GPU 패스스루로 Linux와 Windows를 함께 사용하다가 하드웨어 가상화 문제를 만나 Windows로 돌아온 과정을 이야기합니다."
description_en: "How I used Linux and Windows together with GPU passthrough, then returned to Windows after running into a hardware virtualization issue."
description_ja: "GPUパススルーでLinuxとWindowsを併用していた私が、ハードウェア仮想化の問題に直面し、Windowsに戻った経緯を紹介します。"
---

<!-- lang:ko -->
## Linux를 떠나 Windows를 다시 사용하게 된 이유

현재 제가 주로 사용하는 데스크톱 운영체제는 Windows입니다. 하지만 처음부터 Windows만 사용한 것은 아닙니다. 꽤 오랫동안 Linux를 메인 운영체제로 썼고, 가능하다면 다시 Linux로 돌아가고 싶습니다.

그런데 왜 지금은 Windows를 쓰고 있을까요? 컴퓨터를 사용하며 겪은 경험과 하드웨어 가상화 문제가 그 이유입니다. 이번 글에서는 제가 운영체제를 어떻게 바꿔 왔고, 지금은 왜 Windows를 쓰는지 이야기해 보겠습니다.

## 1. 처음 사용한 운영체제는 Windows였다

제가 처음 컴퓨터를 접한 건 초등학생 때였습니다. 당시에는 컴퓨터에 대한 지식이 거의 없었고, 주로 게임이나 일반 프로그램을 실행하는 기기로 생각했습니다. 자연스럽게 처음 사용한 운영체제도 Windows였습니다.

중학교에 들어가고, 특히 중학교 중반부터 프로그래밍과 컴퓨터 시스템에 관심이 깊어졌습니다. 직접 프로그램을 만들어 보고, 제대로 작동하지 않으면 고치고, 때로는 프로젝트를 버리고 처음부터 다시 만들기도 했습니다. 이때부터 컴퓨터는 단순히 프로그램을 사용하는 기기가 아니라 무언가를 직접 만드는 도구가 되었습니다.

당시에는 지금처럼 생성형 AI 코딩 도구가 보편적이지 않았습니다. 문제가 생기면 오류를 직접 분석하고, 검색하고, 공식 문서를 찾아가며 해결해야 했습니다. 비효율적으로 느껴질 때도 있었지만, 컴퓨터 시스템을 이해하는 데 도움이 되었습니다.

## 2. Linux를 메인 운영체제로 선택하다

프로그래밍에 관심이 깊어지면서 Linux를 사용하기 시작했습니다. Linux에서는 개발 환경을 직접 구성하고, 시스템이 작동하는 방식을 살펴보고, 필요한 작업을 스크립트나 프로그램으로 자동화할 수 있었습니다. 이런 자유로운 환경이 제 성향과 잘 맞았습니다. 그러다 보니 메인 운영체제도 Windows에서 Linux로 바뀌었습니다.

그렇다고 Windows를 완전히 없앨 수 있었던 건 아닙니다. 일부 프로그램은 Windows에서만 제대로 실행됐고, 특정 웹사이트에서는 Windows용 보안 프로그램이 필요하기도 했습니다. Linux를 주로 사용하면서도 Windows가 필요한 상황은 계속 있었습니다.

두 운영체제를 함께 쓰는 방법을 고민하다가 제가 선택한 것은 듀얼 부팅이 아니라 가상화였습니다.

## 3. Linux에서 Windows를 가상 머신으로 실행하다

당시 사용하던 컴퓨터에는 GPU가 두 개 있었습니다. 한 개는 Linux에서 사용하고, 다른 한 개는 Windows 가상 머신에 직접 할당했습니다. 이를 GPU 패스스루(GPU passthrough)라고 합니다. 가상 머신이 가상 그래픽 장치 대신 실제 그래픽카드를 사용하게 하는 방식입니다.

구성은 이랬습니다.

- 첫 번째 모니터는 Linux에 연결
- 두 번째 모니터는 Windows 가상 머신에 연결
- GPU 하나는 Linux에서 사용
- 다른 GPU는 Windows 가상 머신에 할당

하나의 컴퓨터에서 두 운영체제를 동시에 쓸 수 있었습니다.

구현 과정은 간단하지 않았습니다. Windows 가상 머신을 실행하려면 Linux에서 두 번째 GPU를 분리하고, 가상 머신에 전달할 수 있도록 준비해야 했습니다. 저는 이 과정을 자동화하는 스크립트를 작성했습니다.

1. Linux에서 두 번째 GPU 사용을 중단합니다.
2. GPU를 Linux 드라이버에서 분리합니다.
3. 가상 머신에 할당할 수 있도록 장치를 준비합니다.
4. GPU를 연결한 Windows 가상 머신을 실행합니다.

이 과정에서 두 번째 모니터가 잠깐 꺼졌다가 Windows가 시작되면 다시 켜졌습니다. 가상 머신이라는 특성상 물리적인 Windows 설치와 성능이 완전히 같지는 않았지만, 당시 컴퓨터 성능으로는 일반적인 작업은 물론 일부 AAA급 게임도 실행할 수 있었습니다.

Windows를 종료한 뒤에는 GPU를 Linux에서 다시 쓸 수 있도록 복구하는 스크립트를 실행했습니다. GPU를 Linux 드라이버에 다시 연결하면 두 번째 모니터도 Linux에서 사용할 수 있었습니다. Windows가 필요할 때는 두 운영체제를 동시에 쓰고, 그렇지 않을 때는 Linux에서 듀얼 모니터를 사용하는 방식이었습니다.

## 4. Rust로 입력 장치 전환 프로그램을 만들다

운영체제를 오가며 쓰다 보니 키보드와 마우스를 전환하는 일이 불편했습니다. Windows를 사용할 때는 입력 장치를 Windows 가상 머신으로 넘기고, 다시 Linux를 쓸 때는 호스트로 돌려야 했습니다.

이 문제를 해결하기 위해 Rust로 별도의 프로그램을 작성했습니다. USB 장치를 원하는 운영체제 쪽으로 전환하는 기능을 구현했습니다.

또 하나 특이한 구성은 별도의 키보드 하나를 문자 입력용이 아니라 제어 장치로 사용한 것입니다. 프로그램이 그 키보드에서 발생하는 HID 입력을 감지하고, 특정 키가 눌리면 미리 정해 둔 전환 작업을 실행하도록 했습니다. 키보드를 간단한 물리 제어판처럼 사용한 셈입니다.

이런 식으로 시스템에서 불편한 점이 생기면 직접 프로그램을 만들어 해결하는 것이 제 개발 습관 중 하나입니다. 이런 작업에 Rust를 사용하는 것도 잘 맞았습니다.

## 5. 컴퓨터를 업그레이드한 뒤 GPU 패스스루가 어려워지다

이 환경을 만족스럽게 사용하던 중 컴퓨터를 업그레이드했습니다. 새 컴퓨터에도 GPU가 두 개 있었고, CPU도 가상화를 지원했습니다. 기존 구성을 다시 만들 수 있을 거라고 생각했지만, IOMMU 그룹 문제가 있었습니다.

IOMMU 그룹은 하드웨어 장치가 어떤 단위로 격리되는지를 운영체제에 보여주는 구조입니다. GPU가 독립된 그룹에 있다면 가상 머신에 할당하기 수월합니다. 하지만 GPU가 다른 장치와 같은 그룹에 묶여 있으면, 장치를 안전하게 분리해 가상 머신에 넘기기가 어려워질 수 있습니다.

새 컴퓨터에서는 GPU가 제가 원하는 형태로 분리되지 않았습니다. 이전에 사용하던 GPU 패스스루 구성을 그대로 재현하기 어려웠습니다.

### 운영체제 설정만으로 풀기 어려운 문제

처음에는 Linux 설정이나 가상화 구성을 바꾸면 해결할 수 있을지 살펴봤습니다. 하지만 IOMMU 그룹은 운영체제 설정뿐 아니라 메인보드의 PCIe 구조와 장치 격리 기능에도 영향을 받습니다. 설정 파일을 몇 개 바꾸는 것만으로 해결되지 않을 수 있습니다.

Linux 커널에 ACS override 같은 패치를 적용해 장치 그룹을 나누어 보이게 하는 방법도 있습니다. 하지만 그룹을 소프트웨어에서 나누어 보이게 한다고 실제 하드웨어의 격리 기능까지 좋아지는 것은 아닙니다. 저는 가능하면 하드웨어의 격리 특성을 그대로 유지하는 쪽을 선호했습니다.

메인보드 BIOS 펌웨어를 직접 수정하는 방법도 생각해 봤습니다. 하지만 잘못된 펌웨어를 기록하면 시스템이 부팅되지 않거나 복구가 어려워질 수 있습니다. 그래서 지금은 그 방법을 시도하고 싶지 않습니다.

## 6. 다시 Windows를 메인으로 사용하다

이 문제 때문에 현재는 Windows를 메인 데스크톱 운영체제로 사용합니다. Linux를 완전히 지운 것은 아니고, Windows와 듀얼 부팅으로 설치해 두었습니다.

다만 듀얼 부팅에서는 두 운영체제를 동시에 쓸 수 없습니다. Linux로 작업하려면 Windows를 종료하고 Linux로 부팅해야 하며, 다시 Windows를 사용하려면 재부팅해야 합니다. 두 운영체제를 동시에 사용하던 예전 구성에 비하면 불편합니다. 그래서 데스크톱에서 Linux를 사용하는 빈도도 줄었습니다.

현재 Linux는 주로 서버에서 쓰고, 데스크톱에서는 Windows를 더 자주 사용합니다.

## 앞으로는 어떻게 할까?

아직 결정하지 않았습니다. BIOS 펌웨어를 직접 수정하지 않는 방법으로 IOMMU 그룹 문제를 해결할 수 있다면 시도해 보고 싶습니다. PCIe 슬롯 구성이나 하드웨어 설정을 바꿔 해결할 수 있는지도 살펴볼 생각입니다.

그 방법들로 해결되지 않는다면 컴퓨터를 한 대 더 구성할 수도 있습니다. 현재 다른 컴퓨터들은 대부분 Linux 기반이고, 일반 데스크톱보다는 서버에 가까운 구성을 갖고 있습니다. 새 Windows 전용 데스크톱을 구성하고 기존 컴퓨터를 Linux용으로 둘 수도 있고, 지금 컴퓨터를 Windows 전용으로 유지하면서 Linux 데스크톱을 따로 마련할 수도 있습니다.

## 저는 여전히 Linux를 선호한다

지금 Windows를 메인으로 쓰지만, 개인적으로 더 선호하는 운영체제는 Linux입니다. Linux가 언제나 더 빠르거나 가볍기 때문은 아닙니다. 자원 사용량은 설치된 프로그램과 설정, 실행하는 작업에 따라 달라집니다.

제가 Linux를 선호하는 이유는 시스템을 직접 제어하고 개발 환경을 원하는 방식으로 구성할 수 있기 때문입니다. 운영체제의 설계 방향과 사용자에게 주어지는 자유도도 제 가치관과 잘 맞습니다. 반면 Windows의 일부 제품 정책이나 시스템 관리 방식은 제 선호와 맞지 않는 부분이 있습니다.

물론 Windows에는 높은 소프트웨어 호환성, 게임 지원, 다양한 상용 프로그램을 사용할 수 있다는 장점이 있습니다. 그런 이유로 Windows를 완전히 포기하지 못했습니다.

지금 Windows를 사용하는 것은 Windows가 가장 마음에 드는 운영체제여서가 아닙니다. 현재 하드웨어와 실제 사용 환경을 고려했을 때 가장 현실적인 선택이기 때문입니다. 언젠가는 Linux를 다시 메인 데스크톱 환경으로 사용할 수 있기를 바랍니다.

관련 글: [Rust로 키보드와 마우스 전환 프로그램을 만든 이야기](/ko/blog/2026/10/rust-keyboard-mouse-switcher/) · [내가 Rust를 가장 좋아하는 이유](/ko/blog/2026/10/why-i-like-rust/).

<!-- lang:en -->
## Why I Left Linux and Went Back to Windows

Windows is currently the operating system I use most on my desktop. But I have not always used Windows. For quite a long time, Linux was my primary operating system, and I would still like to return to it if I can.

So why am I using Windows now? The answer comes from my experience with computers and a hardware virtualization problem. In this post, I will talk about the operating systems I have used, why I chose Linux, and why I currently use Windows.

## 1. Windows was the first operating system I used

I first encountered computers in elementary school. I had almost no technical knowledge then and mostly thought of a computer as a device for games and everyday programs. Naturally, Windows was the first operating system I used.

After starting middle school, especially around the middle of those years, I became more interested in programming and computer systems. I tried making programs, fixing them when they did not work, and sometimes abandoning a project and starting over. From then on, a computer became more than a device for running programs; it became a tool for making things myself.

Generative AI coding tools were not common then. When something went wrong, I had to analyze the error, search for answers, and read the official documentation myself. It could feel inefficient, but I think the experience helped me understand computer systems.

## 2. Choosing Linux as my primary operating system

As my interest in programming grew, I started using Linux. It gave me the freedom to configure my development environment, inspect how the system worked, and automate tasks with scripts and programs. That freedom suited me, and over time I switched my primary operating system from Windows to Linux.

That did not mean I could get rid of Windows completely. Some programs only worked properly on Windows, and certain websites required Windows security software. Even while using Linux most of the time, I still had reasons to use Windows.

I considered how to use both operating systems and chose virtualization instead of dual booting.

## 3. Running Windows in a virtual machine on Linux

The computer I used at the time had two GPUs. I used one with Linux and passed the other directly to a Windows virtual machine. This is called GPU passthrough: it allows a virtual machine to use a physical graphics card instead of a virtual graphics device.

The setup looked like this:

- The first monitor was connected to Linux.
- The second monitor was connected to the Windows virtual machine.
- One GPU was used by Linux.
- The other GPU was assigned to Windows.

I could use both operating systems at the same time on one computer.

Setting it up was not simple. Before starting the Windows virtual machine, I had to detach the second GPU from Linux and prepare it for the virtual machine. I wrote a script to automate this process.

1. Stop using the second GPU in Linux.
2. Detach the GPU from the Linux driver.
3. Prepare the device for assignment to the virtual machine.
4. Start the Windows virtual machine with the GPU attached.

The second monitor went dark briefly, then came back on when Windows started. A virtual machine cannot guarantee the exact same performance as a physical Windows installation, but my computer was powerful enough for everyday work and even some AAA games.

After shutting down Windows, I ran another script to restore the GPU for Linux. Once it was reattached to the Linux driver, Linux could use the second monitor again. I could use both operating systems at once when I needed Windows, then return to a dual-monitor Linux desktop when I did not.

## 4. Writing a Rust program to switch input devices

Moving between operating systems made switching my keyboard and mouse inconvenient. When I used Windows, I had to pass the input devices to the Windows virtual machine, then return them to the host when I wanted to use Linux again.

To solve this, I wrote a separate program in Rust. It could switch USB devices to the operating system I wanted to use.

One unusual part of the setup was using a separate keyboard as a controller rather than for typing. The program detected HID input from that keyboard and ran a predefined switching action when I pressed a particular key. In effect, I used a keyboard as a simple physical control panel.

When something in my system is inconvenient, writing a program to fix it is one of my usual habits. Rust worked well for this kind of task too.

## 5. A computer upgrade made GPU passthrough difficult

I was happy with this setup until I upgraded my computer. The new computer also had two GPUs, and its CPU supported virtualization. I expected to recreate my old setup, but ran into an IOMMU group problem.

An IOMMU group describes how hardware devices are grouped for isolation. If a GPU is in its own group, assigning it to a virtual machine is more straightforward. If it is grouped with other devices, it can be difficult to separate and pass through safely.

On the new computer, the GPUs were not separated in the way I needed. I could not reproduce my previous GPU passthrough setup as it was.

### A problem that may not be solved by operating-system settings alone

At first, I looked into changing Linux or virtualization settings. But IOMMU grouping is affected not only by the operating system, but also by the motherboard's PCIe layout and device isolation capabilities. Changing a few configuration files may not be enough.

There are patches such as ACS override that can make device groups appear split in the Linux kernel. But making groups look separate in software does not improve the hardware's actual isolation. If possible, I prefer to preserve the isolation properties provided by the hardware.

I also considered modifying the motherboard's BIOS firmware directly. A bad firmware flash can prevent the system from booting and may be difficult to recover from. For now, I do not want to try that approach.

## 6. Going back to Windows as my primary desktop OS

Because of this issue, Windows is currently my primary desktop operating system again. I have not removed Linux; I installed both systems in a dual-boot configuration.

With dual booting, though, I cannot use both operating systems at once. To use Linux, I have to shut down Windows and boot into Linux. To return to Windows, I have to reboot again. Compared with my old setup, where both systems were available at the same time, this is inconvenient. I use Linux on my desktop less often as a result.

I mainly use Linux on servers now and Windows more often on my desktop.

## What might I do next?

I have not decided yet. If I can solve the IOMMU group issue without modifying the BIOS firmware directly, I would like to try. I also want to see whether changing the PCIe slot arrangement or other hardware settings could help.

If those options do not work, I may build another computer. Most of my other computers currently run Linux and are configured more like servers than ordinary desktops. I could build a Windows-only desktop and keep my existing computer for Linux, or keep this computer dedicated to Windows and build a separate Linux desktop.

## I still prefer Linux

Even though Windows is my primary operating system now, Linux is still my personal preference. That is not simply because Linux is always faster or lighter. Resource use depends on the installed programs, system settings, and the work being done.

I prefer Linux because I can control the system directly and configure my development environment the way I want. Its design and the freedom it gives users also fit my values. Some Windows product policies and system management choices do not fit my preferences as well.

Of course, Windows has advantages: broad software compatibility, strong game support, and access to many commercial programs. Those are some of the reasons I have not abandoned it completely.

I use Windows now not because it is my favorite operating system, but because it is the most practical choice for my current hardware and day-to-day needs. I hope I can make Linux my primary desktop environment again someday.

Related reading: [Building a Keyboard and Mouse Switcher in Rust](/en/blog/2026/10/rust-keyboard-mouse-switcher/) · [Why Rust Is My Favorite Programming Language](/en/blog/2026/10/why-i-like-rust/).

<!-- lang:ja -->
## Linuxを離れてWindowsに戻った理由

現在、デスクトップで主に使っているOSはWindowsです。ただ、最初からWindowsだけを使っていたわけではありません。かなり長い間LinuxをメインOSとして使っていましたし、できればまたLinuxに戻りたいと思っています。

では、なぜ今はWindowsを使っているのでしょうか。コンピューターを使ってきた経験と、ハードウェア仮想化の問題が関係しています。これまで使ってきたOSやLinuxを選んだ理由、そして現在Windowsを使っている理由について書きます。

## 1. 最初に使ったOSはWindowsだった

初めてコンピューターに触れたのは小学生の頃でした。当時は専門的な知識がほとんどなく、ゲームや一般的なソフトを使うための機器だと思っていました。最初に使ったOSがWindowsだったのも自然なことでした。

中学校に入ってから、特に中学の半ば頃に、プログラミングやコンピューターシステムへの興味が深まりました。自分でプログラムを作り、うまく動かなければ修正し、ときにはプロジェクトをやめて最初から作り直すこともありました。この頃から、コンピューターは単にソフトを使うための機器ではなく、自分で何かを作るための道具になりました。

当時は現在のような生成AIのコーディングツールは一般的ではありませんでした。問題が起きたら自分でエラーを分析し、検索し、公式ドキュメントを調べて解決する必要がありました。非効率に感じることもありましたが、コンピューターシステムを理解するうえで役に立ったと思います。

## 2. メインOSにLinuxを選ぶ

プログラミングへの興味が深まるにつれて、Linuxを使い始めました。Linuxでは開発環境を自分で構成し、システムの動作を調べ、必要な作業をスクリプトやプログラムで自動化できます。そうした自由さが自分に合っていて、メインOSもWindowsからLinuxへ変わっていきました。

とはいえ、Windowsを完全に手放せたわけではありません。一部のソフトはWindowsでしか正常に動かず、特定のウェブサイトではWindows用のセキュリティソフトが必要なこともありました。Linuxを中心に使いながらも、Windowsが必要な場面は残っていました。

2つのOSをどう併用するか考え、デュアルブートではなく仮想化を選びました。

## 3. Linux上の仮想マシンでWindowsを動かす

当時使っていたコンピューターにはGPUが2基ありました。1基はLinuxで使い、もう1基をWindowsの仮想マシンに直接割り当てました。これをGPUパススルーと呼びます。仮想マシンが仮想グラフィックデバイスではなく、実際のグラフィックカードを使えるようにする方法です。

構成は次のとおりです。

- 1台目のモニターはLinuxに接続
- 2台目のモニターはWindows仮想マシンに接続
- GPUの1基はLinuxで使用
- もう1基はWindowsに割り当て

1台のコンピューターで2つのOSを同時に使えました。

実際の構築は簡単ではありませんでした。Windowsの仮想マシンを起動する前に、Linuxから2基目のGPUを切り離し、仮想マシンに渡せる状態にする必要がありました。この作業を自動化するスクリプトを書きました。

1. Linuxで2基目のGPUの使用を停止する。
2. GPUをLinuxのドライバーから切り離す。
3. 仮想マシンに割り当てられるようデバイスを準備する。
4. GPUを接続したWindows仮想マシンを起動する。

この間、2台目のモニターは一度消え、Windowsが起動すると再び表示されました。仮想マシンなので物理的なWindows環境とまったく同じ性能が保証されるわけではありませんが、当時のコンピューターでは一般的な作業に加え、一部のAAAタイトルのゲームも動かせました。

Windowsを終了した後は、GPUをLinuxで再び使えるように戻すスクリプトを実行しました。GPUをLinuxドライバーに接続し直すと、2台目のモニターもLinuxで使えるようになりました。Windowsが必要なときは2つのOSを同時に使い、不要なときはLinuxでデュアルモニターを利用していました。

## 4. Rustで入力デバイス切り替えプログラムを作る

OSを切り替えて使うと、キーボードやマウスの切り替えが不便でした。Windowsを使うときは入力デバイスをWindows仮想マシンに渡し、Linuxに戻るときはホスト側へ戻さなければなりません。

この問題を解決するため、Rustで専用のプログラムを書きました。USBデバイスを使いたいOS側へ切り替える機能を実装しました。

もうひとつ特徴的だったのは、別のキーボードを文字入力用ではなく制御装置として使ったことです。そのキーボードからのHID入力をプログラムが検知し、特定のキーが押されると、あらかじめ決めた切り替え処理を実行するようにしました。キーボードを簡単な物理コントロールパネルのように使ったわけです。

システムで不便なことがあれば、自分でプログラムを書いて解決するのは、私の開発習慣のひとつです。こうした用途にRustを使うのも自分には合っていました。

## 5. PCをアップグレードしたらGPUパススルーが難しくなった

この環境には満足していましたが、その後コンピューターをアップグレードしました。新しいコンピューターにもGPUが2基あり、CPUも仮想化に対応していました。以前の構成を再現できると思っていましたが、IOMMUグループの問題に直面しました。

IOMMUグループは、ハードウェアデバイスがどの単位で隔離されるかをOSに示す仕組みです。GPUが独立したグループにあれば、仮想マシンに割り当てやすくなります。GPUがほかのデバイスと同じグループに含まれていると、安全に切り離して仮想マシンへ渡すのが難しくなることがあります。

新しいコンピューターではGPUが必要な形で分離されておらず、以前のGPUパススルー構成をそのまま再現することが難しくなりました。

### OSの設定だけでは解決しにくい問題

最初はLinuxや仮想化の設定を変更すれば解決できるか調べました。しかし、IOMMUグループはOSの設定だけでなく、マザーボードのPCIe構成やデバイスの隔離機能にも影響されます。設定ファイルをいくつか変更するだけでは解決しない場合があります。

ACS overrideのようなパッチをLinuxカーネルに適用し、デバイスグループが分かれているように見せる方法もあります。ただし、ソフトウェア上でグループを分けても、実際のハードウェアの隔離能力が高まるわけではありません。できれば、ハードウェアが備える隔離特性を維持したいと思っています。

マザーボードのBIOSファームウェアを直接変更する方法も考えました。しかし、書き込みに失敗するとシステムが起動しなくなり、復旧が難しくなる可能性があります。そのため、今のところ試すつもりはありません。

## 6. 再びWindowsをメインにする

この問題がきっかけで、現在はWindowsをデスクトップのメインOSとして使っています。Linuxを削除したわけではなく、Windowsとデュアルブートできるようにしています。

ただしデュアルブートでは、2つのOSを同時に使えません。Linuxを使うにはWindowsを終了してLinuxを起動し、Windowsに戻るには再起動する必要があります。両方を同時に使っていた以前の構成と比べると不便です。そのため、デスクトップでLinuxを使う頻度は減りました。

現在は主にサーバーでLinuxを使い、デスクトップではWindowsを使うことが多くなっています。

## これからどうするか

まだ決めていません。BIOSファームウェアを直接変更せずにIOMMUグループの問題を解決できる方法があれば試したいです。PCIeスロットの構成やハードウェア設定を変えることで解決するかも調べてみたいと思います。

それでも解決しなければ、コンピューターをもう1台組むことも考えています。現在使っているほかのコンピューターはほとんどLinuxベースで、一般的なデスクトップというよりサーバーに近い構成です。Windows専用のデスクトップを新たに用意して今のPCをLinux用にするか、今のPCをWindows専用にしてLinuxデスクトップを別に用意する方法もあります。

## 今でもLinuxのほうが好き

現在はWindowsをメインにしていますが、個人的には今でもLinuxのほうが好きです。Linuxが常に速い、軽いという理由ではありません。資源の使用量は、インストールされているソフトや設定、実行する作業によって変わります。

Linuxが好きなのは、システムを直接制御し、開発環境を自分の望む形に構成できるからです。OSの設計方針や利用者に与えられる自由度も、自分の価値観に合っています。一方、Windowsの製品方針やシステム管理方法には、自分の好みと合わないところがあります。

もちろん、Windowsには幅広いソフトウェアとの互換性、ゲーム対応、多くの商用ソフトを使えるといった利点があります。そうした理由から、Windowsを完全に手放せずにいます。

今Windowsを使っているのは、Windowsが一番好きなOSだからではありません。現在のハードウェアと日々の使い方を考えたとき、最も現実的な選択だからです。いつかまたLinuxをメインのデスクトップ環境にできればと思っています。

関連記事：[Rustでキーボードとマウスの切り替えプログラムを作った話](/ja/blog/2026/10/rust-keyboard-mouse-switcher/)、[私がRustを一番好きな理由](/ja/blog/2026/10/why-i-like-rust/)。

