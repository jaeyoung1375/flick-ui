# 프로젝트 개요 (Project Overview)

> ✍️ **이 파일은 직접 작성하는 영역입니다.** 프로젝트의 목적과 방향을 본인 언어로 적으세요.
> AI 참조용 사실(정체성·도메인·워크플로우) 정리는 [`flick-ui-overview.md`](./flick-ui-overview.md)에 있습니다.

---

## 1. 프로젝트 목적
* **프로젝트 이름:** flick-ui (저장소명은 `motive-ui` 유지, 서비스 정체성은 변경됨 — 아래 참고)
* **한 줄 요약:** 넷플릭스·티빙류의 스트리밍(OTT) 서비스 프론트엔드
* **핵심 목표:** 아직 미정 — 콘텐츠 카탈로그·재생·구독 등 OTT 도메인의 구체적 화면 설계는 이번 범위 밖(§3 참고)

## 2. 비즈니스 배경 / 맥락
<!-- 왜 이 프로젝트를 하는가, 어떤 문제를 푸는가 -->
2026-09-09 프로젝트명을 `motive-ui`에서 `jobmoa-ui`로 바꾸고 채용정보 통합(잡 어그리게이터) 서비스로 방향을 잡았으나, 실제 채용 도메인 화면은 구현되지 않은 채 2026-09-16 서비스 정체성을 **스트리밍(OTT) 프론트엔드**로 최종 확정했다. 백엔드(`flick-server`)는 2026-09-13에 먼저 같은 방향으로 확정됐다. 상세 경위는 [`11_changelog`](../11_changelog/flick-ui-changelog.md) 참고.

> ⚠️ **코드베이스 현황(2026-09-16):** 이 저장소는 2026-08 개인 운동 기록 서비스 `motive-ui`를 복제해 시작했다. Next.js/TanStack Query/Zustand 등 **기술적 골격은 재사용**하며, 운동 기록 도메인 화면(랜딩·온보딩 15단계·운동 기록 CRUD·운동 목록)은 전부 삭제했다. 같은 날 **OTT 메인 홈 화면을 목업 데이터로 구현 시작**했다(`app/HomePage.tsx`, Figma "FLOW" 시안 기준 — 플로팅 네비·히어로·장르별 카드 행). **단, 데이터는 `features/content/content.mock.ts` 하드코딩이며 실제 콘텐츠 API·온보딩(장르 선택) 연동은 없다.** `06_domain_playbooks`·`09_api_contract`·`10_data_model`·`08_domain_glossary`는 아직 인프라(인증·공통코드·메뉴)만 다루며 홈 화면 목업은 반영 전이다 — 작업 시 혼동하지 말 것. `app/admin/exercises`(운동마스터 관리자 화면)만 예외적으로 정리 대상에서 빠진 레거시 잔존 코드다.

## 3. 현재 집중 영역
<!-- 지금 가장 중요한 작업, 우선순위 -->
OTT 메인 홈 화면 목업이 막 나온 단계(2026-09-16, 개발 착수 확정은 됐으나 온보딩·실제 API 연동은 다음 단계). 우선순위는 사용자가 추후 정한다. 백엔드 `flick-server` 저장소의 `docs/ai/01_project_overview/flick-server-streaming-roadmap.md`(마일스톤 M1 콘텐츠 카탈로그 → M2 영상 파이프라인 → M3 재생 → M4 시청기록 → M5 구독 → M6 추천) 순서를 프론트 화면 설계에도 참고할 수 있다.

## 4. 참고
* AI 작업용 사실 정리: [`flick-ui-overview.md`](./flick-ui-overview.md)
* 기술 스택: [`../02_tech_stack/flick-ui-tech-stack.md`](../02_tech_stack/flick-ui-tech-stack.md)
* 용어 사전: [`../08_domain_glossary/flick-ui-glossary.md`](../08_domain_glossary/flick-ui-glossary.md)
* 백엔드 OTT 로드맵(설계 제안, 실측 아님): `flick-server` 저장소의 `docs/ai/01_project_overview/flick-server-streaming-roadmap.md`
