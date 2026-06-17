# jyc8369 개인 프로젝트 쇼케이스 웹사이트 - 개발자 문서

[English](README_DEV.md) | [한국어](README_DEV_KO.md)

이 문서는 `My_Website`의 의도, 구조, 화면 구성, 현재 코드 상태를 개발자 기준으로 정리합니다.

## 프로젝트 목표

- 프로젝트를 하나의 제품처럼 보이게 만든다.
- 단순한 자기소개보다 시각적 경험을 우선한다.
- 방문자가 프로젝트를 빠르게 탐색하고 GitHub로 이동할 수 있게 한다.

## 현재 범위

- 정적 랜딩 페이지
- 프로젝트 목록 페이지
- 블로그 페이지
- 테마 전환
- 탐색용 내비게이션

## 핵심 파일

- `main.html`: 홈 화면
- `projects.html`: 프로젝트 목록
- `blog.html`: 블로그 진입점
- `css/main.css`: 메인 페이지 스타일
- `css/projects.css`: 프로젝트 목록 스타일
- `css/blog.css`: 블로그 스타일
- `js/main.js`: 홈 페이지 상호작용
- `js/theme-toggle.js`: 테마 전환
- `js/blog.js`: 블로그 상호작용

## 구조

### Home

- Hero section
- Featured projects
- Project showcase
- Developer patterns
- Open source section

### Projects

- 프로젝트 카드 목록
- GitHub 링크
- 상세 페이지 진입점

### Blog

- 메인 콘텐츠는 아니며 보조 페이지 성격이다.

## 구현 포인트

- `Space Grotesk`와 `Bebas Neue`를 사용해 강한 타이포그래피를 만든다.
- 그라데이션과 패널 기반 레이아웃으로 분위기를 구성한다.
- 테마 토글은 전체 사이트 톤을 바꾼다.

## 주의사항

- 현재 일부 프로젝트명과 경로 표기가 코드상에서 임시값일 수 있다.
- 프로젝트 상세 페이지는 아직 완전히 정리되지 않은 항목이 있다.
- 정적 파일이므로 배포 전 링크와 경로를 반드시 확인해야 한다.

