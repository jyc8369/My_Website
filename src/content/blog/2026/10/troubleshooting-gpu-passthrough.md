---
title: "GPU 패스스루 문제를 해결하는 중"
title_en: "Still Troubleshooting GPU Passthrough"
title_ja: "GPUパススルーの問題を調査中"
published_at: "2026-10-17T20:44:34-06:00"
description: "Linux 호스트에서 Windows 가상 머신으로 GPU를 패스스루하는 과정에서 발생한 블루스크린과 현재 조사 상황을 기록합니다."
description_en: "A brief update on the blue screen and ongoing investigation while passing a GPU from a Linux host to a Windows virtual machine."
description_ja: "LinuxホストからWindows仮想マシンへGPUをパススルーする際に起きたブルースクリーンと、現在の調査状況を記録します。"
---

<!-- lang:ko -->
## GPU 패스스루 문제를 해결하는 중

이전에 Linux와 Windows를 동시에 사용하려고 GPU 패스스루를 구성했던 이야기를 썼습니다. 이번에는 그 시도를 새 하드웨어에서 다시 해 보려 했지만, 아직 성공하지 못한 상황을 간단히 기록하려 합니다.

IOMMU 설정과 GPU 패스스루 자체는 구성했습니다. 하지만 GPU를 Windows 가상 머신에 넘기고 드라이버를 활성화하면 게스트 운영체제에서 블루스크린이 발생합니다. 패스스루를 하지 않고 가상 머신이 CPU 쪽 그래픽 처리를 사용하게 하면 Windows는 정상적으로 부팅됩니다.

드라이버를 비활성화한 상태로는 부팅할 수 있지만, 드라이버가 활성화될 때 어떤 문제가 생기는지는 아직 파악하지 못했습니다. 블루스크린은 메모리 주소 접근과 관련된 내용을 가리키는 듯하지만, 그 메시지만으로 원인을 단정하기는 어렵습니다. 충돌이 매번 발생하는 것도 아니라서 재현과 분석도 쉽지 않습니다.

## 아직은 원인을 공개하지 않으려 한다

현재까지 여러 방법을 시도했지만, 근본 원인을 찾지는 못했습니다. 그래픽 드라이버와 하드웨어가 어떤 방식으로 상호작용하는지 더 공부해야 할 것 같습니다.

NVIDIA 그래픽카드의 공식 드라이버를 대상으로 패처를 개발하는 방법도 살펴보고 있습니다. 지금은 어떤 메모리 접근에서 문제가 생기는지, 해당 주소가 왜 유효하지 않은 상태가 되는지를 조사하는 단계입니다. 아직 확실한 해결책이 없고 결과도 검증되지 않아, 구체적인 내용은 당분간 공개하지 않으려고 합니다.

이 문제는 혼자 공부하며 해결해 보고 싶습니다. 원인을 파악하고 실제로 고칠 수 있다면, 같은 구성을 시도하는 사람들에게 도움이 될 수 있도록 해결 과정과 결과를 공유하고 싶습니다.

## 지금 사용하는 Linux

현재 가상 머신의 호스트 운영체제로는 Arch Linux를 사용하고 있습니다. 서버에는 Debian을 사용합니다. 제 첫 Linux 데스크톱은 Ubuntu였고, 당시에는 배포판이 무엇인지도 잘 모른 채 설치해 사용했습니다. 이후 Linux를 더 깊이 배우고 직접 구성해 보고 싶어 Arch Linux를 사용하기 시작했습니다. 서버 쪽에서는 Debian이 제게 더 잘 맞습니다. Ubuntu도 Debian을 기반으로 한 좋은 선택지지만, 저는 Debian을 조금 더 선호합니다.

GPU 패스스루 문제를 해결하면 Linux를 다시 메인 데스크톱 운영체제로 사용할 계획입니다. 그렇게 되면 제 주 운영체제도 Windows에서 Linux로 바뀔 수 있습니다.

지금은 문제가 발생했다는 사실과 현재까지 확인한 범위만 기록해 둡니다. 원인을 찾고 해결 방법을 검증한 뒤에 더 자세한 이야기를 이어가겠습니다.

<!-- lang:en -->
## Still Troubleshooting GPU Passthrough

I previously wrote about setting up GPU passthrough so I could use Linux and Windows at the same time. I tried the setup again on new hardware, but I have not managed to get it working yet. I want to briefly record where things stand.

I configured IOMMU and GPU passthrough itself. But when I pass the GPU to a Windows virtual machine and enable its driver, the guest operating system blue-screens. If I do not pass through the GPU and let the virtual machine use CPU-based graphics, Windows boots normally.

Windows can boot while the driver is disabled, but I have not figured out what goes wrong when the driver is enabled. The blue screen seems to point to a memory-address access issue, but I cannot determine the cause from that message alone. The crash is intermittent, which also makes it difficult to reproduce and analyze.

## I am not ready to share the cause yet

I have tried several approaches, but I have not found the root cause. I need to learn more about how the graphics driver and hardware interact.

I am also looking into developing a patcher for the official NVIDIA graphics driver. For now, I am investigating which memory access triggers the problem and why the address appears to be invalid. I do not have a reliable fix, and I have not verified any result, so I am going to keep the details private for the time being.

I would like to study and solve this problem on my own. If I can identify the cause and fix it, I hope to share the process and results to help others attempting a similar setup.

## The Linux distributions I use

I currently use Arch Linux as the host operating system for my virtual machines. My servers run Debian. Ubuntu was the first Linux desktop I used. At the time, I installed it without knowing much about Linux distributions. Later, I started using Arch Linux because I wanted to learn more deeply and configure the system myself. Debian works better for me on servers. Ubuntu, which is based on Debian, is also a good option, but I personally prefer Debian.

Once I solve the GPU passthrough problem, I plan to return to Linux as my main desktop operating system. That could mean changing my primary OS from Windows back to Linux.

For now, I am only documenting the problem and what I have confirmed so far. I will write more after I identify the cause and verify a solution.

<!-- lang:ja -->
## GPUパススルーの問題を調査中

以前、LinuxとWindowsを同時に使うためにGPUパススルーを設定した話を書きました。今回は新しいハードウェアでもう一度試しましたが、まだ成功していません。現在の状況を簡単に記録しておきます。

IOMMUの設定とGPUパススルー自体は構成できました。しかし、GPUをWindows仮想マシンに渡してドライバーを有効にすると、ゲストOSでブルースクリーンが発生します。GPUをパススルーせず、仮想マシンがCPU側のグラフィックス処理を使う場合は、Windowsは正常に起動します。

ドライバーを無効にしておけば起動できますが、有効にしたときに何が起きているのかはまだ分かっていません。ブルースクリーンはメモリアドレスへのアクセスに関係しているようですが、そのメッセージだけで原因を断定することはできません。クラッシュは毎回起きるわけではなく、再現して分析するのも難しい状態です。

## 原因はまだ公開しないことにする

これまでいくつかの方法を試しましたが、根本原因は見つかっていません。グラフィックスドライバーとハードウェアがどのようにやり取りするのか、さらに学ぶ必要がありそうです。

NVIDIAの公式グラフィックスドライバーを対象にパッチャーを開発する方法も検討しています。現在は、どのメモリアクセスで問題が起きるのか、そのアドレスがなぜ無効な状態になるのかを調べています。確実な解決策はまだなく、結果も検証できていないため、具体的な内容は当面公開しないつもりです。

この問題は自分で学びながら解決したいと思っています。原因を特定して実際に直せたら、同じ構成を試す人の参考になるよう、解決までの過程と結果を共有したいです。

## 現在使っているLinux

現在、仮想マシンのホストOSにはArch Linuxを使っています。サーバーではDebianを使っています。最初に使ったLinuxデスクトップはUbuntuでした。当時はディストリビューションについてよく知らず、そのままインストールして使っていました。その後、Linuxをより深く学び、自分で構成したいと思い、Arch Linuxを使い始めました。サーバー用途ではDebianのほうが自分に合っています。UbuntuもDebianをベースにした良い選択肢ですが、私はDebianのほうが好みです。

GPUパススルーの問題を解決できたら、LinuxをメインのデスクトップOSとして使う予定です。そうなれば、メインOSもWindowsからLinuxに戻るかもしれません。

今は問題が起きていることと、これまでに確認できた範囲だけを記録しておきます。原因を見つけ、解決方法を検証できたら、詳しい話を改めて書きます。
