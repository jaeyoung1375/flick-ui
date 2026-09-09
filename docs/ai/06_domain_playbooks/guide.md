# 도메인 플레이북 (Domain Playbooks)

반복 작업하는 도메인의 화면·상태·API 연동 규칙을 정리합니다. 새 플레이북 추가 시 이 표에 한 줄 추가하세요.

| 파일 | 도메인 | 관련 라우트/features |
|------|--------|----------------------|
| [`auth.md`](./auth.md) | 인증·소셜 로그인·accessToken·온보딩 진입 판정 | `app/login`, `app/components/auth/AuthBootstrap.tsx`, `features/auth` |
| [`workout.md`](./workout.md) | 온보딩(운동 프로필) + 운동 기록 화면 | `app/onboarding/step-*`, `app/profile/record`, `features/onboarding`, `features/workoutRecord`, `features/exercise` |
| [`admin-code.md`](./admin-code.md) | 공통코드 소비 + 관리자 CRUD 화면 | `app/admin/*`, `features/code`, `features/admin`, `features/exercise`(admin 부분) |

## 작성 규칙

* 도메인이 안정된 뒤(요구사항이 반복적으로 들어오는 시점) 작성한다 — 최초 구현 단계에서 미리 만들지 않는다.
* 실제 코드에서 관찰한 사실만 적는다. 계획·희망은 [`01_project_overview/guide.md`](../01_project_overview/guide.md)에.
* 용어는 [`../08_domain_glossary/jobmoa-ui-glossary.md`](../08_domain_glossary/jobmoa-ui-glossary.md)와 통일한다.
* API 계약 자체(엔드포인트 존재 여부·요청/응답 필드)의 정본은 `motive-server` 저장소다. 여기서는 프론트가 그 계약을 **어떻게 소비하는지**(어느 훅이 어느 화면에서 호출되는지)를 적는다.
