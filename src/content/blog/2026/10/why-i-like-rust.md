---
title: "내가 Rust를 가장 좋아하는 이유"
title_en: "Why Rust Is My Favorite Programming Language"
title_ja: "私がRustを一番好きな理由"
published_at: "2026-10-15T05:34:21Z"
description: "메모리 관리와 시스템 자원, 배포 방식에 대한 제 생각을 통해 Rust를 가장 좋아하는 이유를 이야기합니다."
description_en: "Why Rust is my favorite, through my views on memory management, system resources, and software distribution."
description_ja: "メモリ管理、システム資源、ソフトウェアの配布方法について考えながら、Rustが一番好きな理由を紹介します。"
---

<!-- lang:ko -->
## 내가 Rust를 가장 좋아하는 이유

프로그래밍 언어는 다양합니다. Python, JavaScript, C++, Go, Rust처럼 각 언어에는 저마다의 장단점이 있습니다.

제가 선호하는 언어를 순서대로 꼽자면 1위는 Rust, 2위는 Python, 3위는 JavaScript입니다. Rust가 모든 상황에서 가장 좋은 언어라고 생각하는 것은 아닙니다. 작업에 따라 Python이 더 알맞을 때도 있고, 웹 개발에서는 JavaScript가 필요하기도 합니다. 저 역시 상황에 맞춰 여러 언어를 사용합니다.

그럼에도 Rust를 가장 좋아하는 이유는 제가 중요하게 생각하는 개발 가치와 잘 맞기 때문입니다.

## 1. 시스템 자원을 세밀하게 다룰 수 있다

Rust를 좋아하는 첫 번째 이유는 메모리와 시스템 자원을 세밀하게 관리할 수 있다는 점입니다.

Rust는 시스템 프로그래밍에 적합한 언어입니다. C나 C++의 변형이나 확장판은 아니며, 독립적으로 설계된 언어입니다. Rust는 소유권(ownership)과 빌림(borrowing) 규칙을 사용해 메모리 안전성을 확보합니다. 안전한 Rust 코드에서 발생할 수 있는 여러 메모리 오류를 컴파일 단계에서 막아 줍니다.

그렇다고 Rust로 프로그램을 작성하면 메모리를 자동으로 적게 사용하는 것은 아닙니다. 데이터 구조와 알고리즘, 사용하는 라이브러리, 메모리 할당 방식에 따라 실제 사용량은 달라집니다. 그래도 런타임에 의존하지 않고 자원을 직접 관리하고 싶은 개발자에게 Rust는 매력적인 선택지입니다.

저는 임베디드나 IoT 관련 프로그램, 운영체제와 가까이 상호작용하는 프로그램을 만들 때가 있습니다. 이런 환경에서는 메모리와 하드웨어 자원 관리가 특히 중요해집니다. Python도 훌륭한 언어지만, 이런 작업에는 Rust 같은 시스템 프로그래밍 언어가 더 적합한 경우가 많다고 생각합니다.

### Windows를 사용하며 자원 한계를 느끼다

여담으로, 여러 현실적인 이유로 저는 현재 Windows를 주 운영체제로 사용합니다. 언젠가는 다른 운영체제로 작업 환경을 옮기고 싶지만 아직은 Windows를 계속 써야 합니다.

대규모 프로젝트를 빌드하거나 개발 도구를 여러 개 동시에 실행하면 시스템 자원의 한계를 체감할 때가 있습니다. 그 원인이 Windows 자체인지, 빌드 도구나 프로젝트 구조 또는 메모리 용량 때문인지는 단정하기 어렵습니다. 다만 이런 경험이 한정된 자원을 효율적으로 쓰는 방법을 더 고민하게 만들었습니다.

## 2. 실행 파일을 만들고 배포할 수 있다

Rust 프로젝트는 보통 Cargo로 의존성을 관리하고 빌드합니다. 프로젝트가 커지면 컴파일에 CPU와 메모리를 많이 쓰고, 빌드 시간도 길어질 수 있습니다.

빌드가 끝나면 대상 운영체제와 아키텍처에 맞는 실행 파일을 배포할 수 있습니다. 사용자가 프로그램을 실행하기 위해 Rust 컴파일러나 Cargo를 설치하고 소스 코드부터 직접 빌드해야 하는 것은 아닙니다. 다만 배포 방식과 프로그램의 의존성에 따라 추가 파일이 필요할 수 있습니다.

빌드 설정을 조정해 실행 파일 크기를 줄일 수도 있습니다. 그렇다고 Rust 실행 파일이 언제나 다른 언어보다 작다는 뜻은 아닙니다. 정적 링크 여부와 포함된 라이브러리, 최적화 설정에 따라 크기가 커질 수도 있습니다.

제가 높게 평가하는 점은 프로그램의 실행 특성과 자원 사용량을 측정하고 조정할 수 있다는 것입니다.

### 개발 과정의 비용과 사용자에게 돌아가는 이점

이 부분은 Rust를 좋아하는 가장 개인적인 이유이기도 합니다. 빌드 시간이 길어지고 개발 과정에서 더 많은 연산 자원을 쓰더라도, 완성된 프로그램이 많은 사용자의 컴퓨팅 자원을 아껴 준다면 감수할 가치가 있다고 생각합니다.

예를 들어 프로그램을 빌드하는 데 드는 비용이 조금 더 크더라도, 수천 명이나 수만 명이 사용할 때 메모리나 CPU 사용량을 줄일 수 있다면 전체적으로 의미 있는 선택일 수 있습니다.

물론 Rust를 쓴다는 이유만으로 이런 이점이 저절로 생기지는 않습니다. 성능을 측정하고 실제로 최적화해야 합니다. 제가 중요하게 생각하는 것은 특정 언어 자체보다, 개발자의 편의성뿐 아니라 프로그램을 사용하는 사람들의 자원까지 고려하는 태도입니다.

## 3. 추적형 가비지 컬렉터 없이 메모리 안전성을 추구한다

Rust를 좋아하는 세 번째 이유는 일반적인 런타임 가비지 컬렉터에 의존하지 않는다는 점입니다.

가비지 컬렉션(GC)은 프로그램이 더 이상 사용하지 않는 메모리를 찾아 회수하는 방식입니다. Python, Java, Go 등 여러 언어는 각기 다른 자동 메모리 관리 방식을 사용합니다. 이런 방식은 개발자가 직접 메모리를 해제해야 하는 부담을 줄여 주지만, 구현에 따라 추가적인 CPU 사용량이나 지연이 발생할 수 있습니다. 그 영향은 언어와 프로그램의 동작 방식에 따라 달라집니다.

Rust는 소유권 시스템을 통해 다른 방식으로 메모리를 관리합니다. 각 값에는 소유자가 있고, 소유권의 이동과 참조 사용에 규칙이 있습니다. 컴파일러는 이 규칙을 검사해 안전한 Rust 코드에서 이미 해제된 메모리에 접근하거나 메모리를 중복 해제하는 등의 오류를 방지합니다. 값의 소유자가 더 이상 유효하지 않을 때는 필요한 정리 작업도 수행됩니다.

따라서 일반적인 메모리 관리에 별도의 추적형 GC를 실행할 필요가 없습니다. 이런 설계는 런타임 동작을 예측하고 자원을 관리하는 데 도움이 될 수 있습니다.

물론 Rust에서도 메모리 누수가 절대 발생하지 않는 것은 아닙니다. 참조 카운트가 순환하는 구조처럼 메모리가 해제되지 않는 경우가 생길 수 있고, `unsafe` 코드를 사용하면 컴파일러가 보장하는 안전성의 범위도 달라집니다. 그래도 안전한 Rust 코드에서 많은 메모리 안전성 문제를 컴파일 단계에 발견할 수 있다는 점은 큰 장점입니다.

## 4. 단점도 감수할 만하다고 생각한다

Rust를 좋아한다고 해서 단점이 없다고 생각하는 것은 아닙니다.

컴파일이 오래 걸리고 빌드 중에 시스템 자원을 많이 사용할 수 있습니다. 대규모 프로젝트에서는 의존성 컴파일과 최적화, 링크 작업에 시간이 들기도 합니다. 소유권과 빌림 검사기는 처음 배우는 사람에게 진입 장벽이 될 수 있습니다. 다른 언어라면 간단히 작성할 코드를 Rust에서는 소유권과 수명을 고려해 다시 설계해야 할 때도 있습니다.

특정 프로젝트에서는 라이브러리 생태계나 하드웨어 지원 면에서 다른 언어가 더 나을 수 있습니다. 긴 빌드 시간 자체가 장점인 것도 아닙니다.

그래도 저는 이런 비용을 어느 정도 감수할 수 있습니다. 개발 시점에 더 많은 시간과 자원을 쓰는 대신, 완성된 프로그램의 안정성이나 실행 효율을 높일 가능성이 있다면 합리적인 절충이라고 보기 때문입니다. 실제 이점은 측정과 최적화를 통해 확인해야 합니다.

## 5. 그래서 Rust를 사용한다

저는 유틸리티 프로그램부터 서버 프로그램, 시스템 소프트웨어, 임베디드와 IoT 프로젝트까지 Rust를 우선 고려합니다. 물론 필요에 따라 Python이나 JavaScript도 사용합니다. Python은 빠른 개발과 자동화, 다양한 라이브러리를 활용할 때 편리하고, JavaScript는 웹 환경에서 중요한 역할을 합니다. 각 언어에는 각자의 강점이 있습니다.

그래도 제가 가장 좋아하는 언어는 Rust입니다. 프로그램을 만드는 사람의 편의성뿐 아니라, 그 프로그램을 사용하는 사람들의 컴퓨팅 자원도 중요하게 생각하기 때문입니다. 가능하다면 메모리를 덜 사용하고 불필요한 CPU 연산을 줄이며 안정적으로 동작하는 프로그램을 만들고 싶습니다.

제가 Rust를 좋아하는 이유는 단지 빠른 언어여서가 아닙니다. 제가 중요하게 생각하는 개발 가치를 코드에 반영하기 좋은 언어이기 때문입니다.

관련 글: [Rust로 키보드와 마우스 전환 프로그램을 만든 이야기](/ko/blog/2026/10/rust-keyboard-mouse-switcher/) · [내가 프로그램을 설계할 때 중요하게 생각하는 6가지 원칙](/ko/blog/2026/10/six-principles-of-software-design/).

<!-- lang:en -->
## Why Rust Is My Favorite Programming Language

There are many programming languages: Python, JavaScript, C++, Go, Rust, and plenty more. Each has its own strengths and weaknesses.

If I had to rank my preferences, Rust would be first, Python second, and JavaScript third. I do not think Rust is the best language for every situation. Python may be a better fit for some tasks, and JavaScript is often needed for web development. I use different languages depending on the work.

Still, Rust is my favorite because it fits the development values I care about.

## 1. Fine-grained control over system resources

My first reason for liking Rust is that it lets me manage memory and system resources precisely.

Rust is well suited to systems programming. It is not a variation or extension of C or C++; it was designed as an independent language. Rust uses ownership and borrowing rules to provide memory safety, preventing many memory errors in safe Rust code at compile time.

That does not mean every program written in Rust automatically uses less memory. Actual usage depends on data structures, algorithms, libraries, and allocation strategies. Even so, Rust is an appealing choice for developers who want to manage resources directly without relying on a runtime environment.

I sometimes build embedded or IoT software, as well as programs that interact closely with the operating system. Memory and hardware resource management matter especially in those environments. Python is also an excellent language, but I think a systems language like Rust is often a better fit for this kind of work.

### Feeling resource limits while using Windows

As an aside, I currently use Windows as my primary operating system for a number of practical reasons. I would like to move my work environment to another operating system eventually, but for now I still need to use Windows.

When I build large projects or run several development tools at once, I sometimes feel the limits of my system resources. I cannot say whether the cause is Windows itself, the build tools, the project structure, or the amount of memory. The experience has simply made me think more about using limited resources efficiently.

## 2. Building and distributing executables

Rust projects are usually built and managed with Cargo. As a project grows, compilation can use a lot of CPU and memory, and build times can become long.

Once the build is complete, you can distribute an executable for a target operating system and architecture. Users generally do not need to install the Rust compiler or Cargo and build the program from source just to run it. Depending on how the program is packaged and what it depends on, additional files may still be required.

Build settings can also be adjusted to reduce executable size. That does not mean Rust executables are always smaller than those from other languages. Static linking, included libraries, and optimization settings can make them larger instead.

What I value is being able to measure and tune a program's runtime behavior and resource use.

### Development cost and benefits for users

This is also the most personal reason I like Rust. Even if a build takes longer and uses more compute during development, I think that can be worth it if the finished program saves computing resources for many users.

For example, the cost of building a program might be somewhat higher, but if it reduces memory or CPU usage for thousands or tens of thousands of users, that may be worthwhile overall.

Of course, these benefits do not happen automatically just because a program is written in Rust. Performance still needs to be measured and optimized. What matters to me is not a particular language by itself, but a development mindset that considers the resources used by the people running the software as well as the convenience of the developer.

## 3. Memory safety without a tracing garbage collector

My third reason for liking Rust is that it does not rely on a conventional runtime garbage collector.

Garbage collection (GC) finds and reclaims memory that a program no longer uses. Languages such as Python, Java, and Go use different forms of automatic memory management. These approaches reduce the need for developers to free memory manually, but depending on the implementation, they can use additional CPU resources or affect latency. The impact varies with the language and how the program behaves.

Rust manages memory differently through its ownership system. Each value has an owner, and there are rules for moving ownership and using references. The compiler checks these rules to prevent errors such as accessing freed memory or freeing memory twice in safe Rust code. It also performs the necessary cleanup when a value's owner is no longer valid.

As a result, ordinary memory management does not require a separate tracing GC to run. This design can help make runtime behavior more predictable and resource management more direct.

Rust does not make memory leaks impossible. Memory may remain allocated in situations such as reference-counting cycles, and `unsafe` code changes the scope of what the compiler can guarantee. Still, catching many memory-safety problems at compile time in safe Rust is a major advantage.

## 4. I can live with the trade-offs

Liking Rust does not mean I think it has no downsides.

Compilation can take a long time and use significant system resources. Large projects may spend a lot of time compiling dependencies, optimizing, and linking. Ownership and the borrow checker can be a steep learning curve. Code that would be simple in another language may need to be redesigned around ownership and lifetimes in Rust.

For some projects, another language may have a stronger library ecosystem or better hardware support. Long build times are not an advantage in themselves.

Even so, I am willing to accept some of these costs. I see it as a reasonable trade-off when spending more time and resources during development may improve the finished program's reliability or runtime efficiency. The actual benefit still needs to be measured and optimized.

## 5. That is why I use Rust

I consider Rust for everything from utilities and server programs to systems software, embedded projects, and IoT. I also use Python or JavaScript when they are a better fit. Python is convenient for rapid development, automation, and its wide range of libraries; JavaScript plays an important role on the web. Each language has its strengths.

Still, Rust is my favorite. I care not only about the convenience of the person building a program, but also about the computing resources used by the people who run it. When possible, I want to build software that uses less memory, avoids unnecessary CPU work, and runs reliably.

Rust is not my favorite simply because it is fast. It is a language that helps me put the development values I care about into practice.

Related reading: [Building a Keyboard and Mouse Switcher in Rust](/en/blog/2026/10/rust-keyboard-mouse-switcher/) · [Six Principles That Guide How I Design Software](/en/blog/2026/10/six-principles-of-software-design/).

<!-- lang:ja -->
## 私がRustを一番好きな理由

プログラミング言語には、Python、JavaScript、C++、Go、Rustなど、さまざまなものがあります。それぞれに固有の長所と短所があります。

自分の好みで順位をつけるなら、1位がRust、2位がPython、3位がJavaScriptです。Rustがあらゆる状況で最良の言語だとは思っていません。作業によってはPythonのほうが適していることもありますし、ウェブ開発ではJavaScriptが必要になることもあります。私も用途に応じて複数の言語を使っています。

それでもRustが一番好きなのは、自分が大切にしている開発の価値観に合っているからです。

## 1. システム資源を細かく管理できる

Rustを好きな最初の理由は、メモリやシステム資源を細かく管理できることです。

Rustはシステムプログラミングに適した言語です。CやC++の変種や拡張ではなく、独立して設計されました。Rustは所有権（ownership）と借用（borrowing）の規則によってメモリ安全性を実現し、安全なRustコードで起こりうる多くのメモリエラーをコンパイル時に防ぎます。

ただし、Rustで書けばプログラムが自動的に少ないメモリしか使わないという意味ではありません。実際の使用量はデータ構造やアルゴリズム、ライブラリ、メモリの割り当て方法によって変わります。それでも、ランタイムに依存せず資源を直接管理したい開発者にとって、Rustは魅力的な選択肢です。

私は組み込みやIoT関連のプログラム、OSと密接にやり取りするプログラムを作ることがあります。そうした環境では、メモリやハードウェア資源の管理が特に重要になります。Pythonも優れた言語ですが、このような作業ではRustのようなシステムプログラミング言語のほうが適している場合が多いと思います。

### Windowsを使って感じる資源の限界

余談ですが、現実的な理由がいくつかあり、現在はWindowsをメインのOSとして使っています。いずれ別のOSに作業環境を移したいと思っていますが、今はまだWindowsを使い続ける必要があります。

大規模なプロジェクトをビルドしたり、開発ツールを複数同時に動かしたりすると、システム資源の限界を感じることがあります。その原因がWindows自体にあるのか、ビルドツールやプロジェクト構成、メモリ容量にあるのかは断定できません。ただ、こうした経験から、限られた資源を効率よく使う方法をより意識するようになりました。

## 2. 実行ファイルを作って配布できる

Rustのプロジェクトでは、通常Cargoを使って依存関係を管理し、ビルドします。プロジェクトが大きくなると、コンパイルに多くのCPUやメモリを使い、ビルド時間も長くなることがあります。

ビルドが終われば、対象のOSやアーキテクチャ向けの実行ファイルを配布できます。利用者がプログラムを実行するためにRustコンパイラーやCargoをインストールし、ソースからビルドし直す必要は一般にありません。ただし、パッケージ方法やプログラムの依存関係によっては、追加ファイルが必要な場合があります。

ビルド設定を調整して実行ファイルのサイズを小さくすることもできます。しかし、Rustの実行ファイルが常にほかの言語より小さいとは限りません。静的リンクの有無、含まれるライブラリ、最適化設定によっては、かえって大きくなることもあります。

私が評価しているのは、プログラムの実行特性や資源使用量を測定し、調整できることです。

### 開発時のコストと利用者に返る利点

これはRustを好きな、最も個人的な理由でもあります。ビルド時間が長くなり、開発時により多くの計算資源を使うとしても、完成したプログラムが多くの利用者の計算資源を節約できるなら、その負担を受け入れる価値があると思います。

たとえば、プログラムをビルドするコストが少し高くなっても、数千人、数万人が使うときにメモリやCPUの使用量を減らせるなら、全体として意味のある選択かもしれません。

もちろん、Rustを使うだけでこうした利点が自動的に得られるわけではありません。性能を測定し、実際に最適化する必要があります。私が大切にしているのは特定の言語そのものではなく、開発者の利便性だけでなく、ソフトウェアを使う人の計算資源まで考慮する姿勢です。

## 3. トレース型GCなしでメモリ安全性を目指す

Rustを好きな3つ目の理由は、一般的なランタイムのガベージコレクターに依存しないことです。

ガベージコレクション（GC）は、プログラムが使わなくなったメモリを見つけて回収する仕組みです。Python、Java、Goなど、多くの言語がそれぞれ異なる自動メモリ管理方式を採用しています。こうした方式は、開発者が手動でメモリを解放する負担を減らします。一方、実装によっては追加のCPU資源を使ったり、レイテンシに影響したりすることがあります。その影響は言語やプログラムの動作によって異なります。

Rustは所有権システムを通じて、別の方法でメモリを管理します。それぞれの値には所有者があり、所有権の移動や参照の使用には規則があります。コンパイラーはこの規則を検査し、安全なRustコードで解放済みメモリへのアクセスや二重解放などのエラーを防ぎます。値の所有者が有効でなくなったときには、必要な後片付けも行われます。

そのため、通常のメモリ管理のために別のトレース型GCを実行する必要はありません。この設計は、実行時の動作を予測し、資源を管理するうえで役立つ場合があります。

もちろん、Rustでメモリリークが絶対に起きないわけではありません。参照カウントが循環する構造などでメモリが解放されないことがありますし、`unsafe`コードを使えばコンパイラーが保証できる安全性の範囲も変わります。それでも、安全なRustコードで多くのメモリ安全性の問題をコンパイル時に見つけられることは大きな利点です。

## 4. 短所も受け入れられると思う

Rustが好きだからといって、短所がないと思っているわけではありません。

コンパイルに時間がかかり、ビルド中にシステム資源を多く使うことがあります。大規模なプロジェクトでは、依存関係のコンパイルや最適化、リンクにも時間がかかります。所有権や借用チェッカーは、初めて学ぶ人にとって高いハードルになることがあります。ほかの言語なら簡単に書けるコードでも、Rustでは所有権やライフタイムを考慮して設計し直す必要がある場合があります。

プロジェクトによっては、ライブラリエコシステムやハードウェア対応の面で、別の言語のほうが適していることもあります。ビルド時間が長いこと自体は利点ではありません。

それでも、私はこうしたコストをある程度受け入れられます。開発時に時間と資源を多く使う代わりに、完成したプログラムの信頼性や実行効率を高められる可能性があるなら、妥当なトレードオフだと考えるからです。実際の効果は測定と最適化によって確かめる必要があります。

## 5. だからRustを使う

ユーティリティやサーバープログラムから、システムソフトウェア、組み込み、IoTまで、私はまずRustを検討します。もちろん、必要に応じてPythonやJavaScriptも使います。Pythonは素早い開発や自動化、豊富なライブラリの活用に便利で、JavaScriptはウェブ環境で重要な役割を担っています。それぞれに強みがあります。

それでも、一番好きな言語はRustです。プログラムを作る人の利便性だけでなく、それを使う人の計算資源も大切だと考えているからです。できることなら、メモリの使用量を抑え、不要なCPU処理を減らし、安定して動くプログラムを作りたいです。

私がRustを好きなのは、単に速い言語だからではありません。自分が大切にしている開発の価値観を、コードに反映しやすい言語だからです。

関連記事：[Rustでキーボードとマウスの切り替えプログラムを作った話](/ja/blog/2026/10/rust-keyboard-mouse-switcher/)、[私がソフトウェアを設計するときに大切にしている6つの原則](/ja/blog/2026/10/six-principles-of-software-design/)。

