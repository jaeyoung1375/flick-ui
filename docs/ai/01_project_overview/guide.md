# 프로젝트 개요 (Project Overview)

> ✍️ **이 파일은 직접 작성하는 영역입니다.** 프로젝트의 목적과 방향을 본인 언어로 적으세요.
> AI 참조용 사실(정체성·도메인·워크플로우) 정리는 [`jobmoa-ui-overview.md`](./jobmoa-ui-overview.md)에 있습니다.

---

## 1. 프로젝트 목적
* **프로젝트 이름:** jobmoa-ui
* **한 줄 요약:** 여러 채용사이트의 공고를 한곳에 모아서 볼 수 있게 해주는 채용정보 통합(잡 어그리게이터) 서비스의 프론트엔드
* **핵심 목표:** 흩어진 채용사이트를 매번 따로 확인해야 하는 불편을 없애고, 한 곳에서 통합 조회/검색할 수 있게 한다

## 2. 비즈니스 배경 / 맥락
<!-- 왜 이 프로젝트를 하는가, 어떤 문제를 푸는가 -->
구직자는 사람인·잡코리아·원티드 등 여러 채용사이트를 각각 들어가서 확인해야 하는 번거로움이 있다. jobmoa-ui는 이런 채용사이트들의 공고를 모아 한 화면에서 조회할 수 있게 하는 것이 목표다. 백엔드는 `jobmoa-server`가 담당한다.

> ⚠️ **코드베이스 현황:** 이 저장소는 개인 운동 기록 서비스 `motive-ui`를 프로젝트명만 바꿔 시작했다. Next.js/TanStack Query/Zustand 등 **기술적 골격은 재사용**하지만, 현재 구현된 화면(소셜 로그인·온보딩·운동 기록 CRUD·관리자 화면 등)은 전부 이전 프로젝트의 도메인이며 **채용정보 도메인으로 아직 마이그레이션되지 않았다.** `01_project_overview/jobmoa-ui-overview.md` 2절 이하 및 `06_domain_playbooks`·`09_api_contract`·`10_data_model`은 이 레거시 코드를 실측한 것이지 목표 도메인이 아니다 — 작업 시 혼동하지 말 것.

## 3. 현재 집중 영역
<!-- 지금 가장 중요한 작업, 우선순위 -->
아직 채용정보 도메인 설계·구현 전 단계. 우선순위는 사용자가 추후 정한다.

## 4. 참고
* AI 작업용 사실 정리: [`jobmoa-ui-overview.md`](./jobmoa-ui-overview.md)
* 기술 스택: [`../02_tech_stack/jobmoa-ui-tech-stack.md`](../02_tech_stack/jobmoa-ui-tech-stack.md)
* 용어 사전: [`../08_domain_glossary/jobmoa-ui-glossary.md`](../08_domain_glossary/jobmoa-ui-glossary.md)
