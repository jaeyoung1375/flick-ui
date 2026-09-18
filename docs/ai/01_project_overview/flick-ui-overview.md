# 프로젝트 정체성 (flick-ui Overview)

이 문서는 AI 작업용 사실 정리입니다. 프로젝트의 주관적 목적·우선순위는 [`guide.md`](./guide.md)에 사용자가 직접 적습니다.

## 1. 정체성

**flick-ui**는 넷플릭스·티빙류의 스트리밍(OTT) 서비스 프론트엔드다(2026-09-16 확정, 이전에는 채용정보 통합 서비스로 방향을 잡았었다 — 배경은 [`guide.md`](./guide.md) 참고). `motive-ui`(로컬 디렉터리·git 저장소명)와 `jobmoa-ui`(`package.json`의 `name`)는 이전 정체성의 흔적이며 현재 서비스 정체성과는 무관하다.

> ⚠️ **레거시 코드베이스, 단 홈 화면은 목업 구현 시작됨:** 이 저장소는 개인 운동 기록 서비스 `motive-ui`로 시작한 초기 스캐폴딩이다. 온보딩(15단계)·운동 기록 CRUD·운동 목록·랜딩 화면 및 대응 `features/{onboarding,workoutRecord,exercise}`·`store/{onboardingStore,recordDraftStore}`는 2026-09-16 working tree에서 전부 제거했다. 같은 날 `app/HomePage.tsx` + `features/content`(목업 데이터, 실제 API 없음)로 **OTT 메인 홈 화면 목업**을 새로 구현했다(Figma "FLOW" 시안 기준) — §2 참고. `app/admin/exercises`만 예외적으로 정리 대상에서 빠진 레거시 잔존 코드다.

| 항목 | 내용 |
| ---- | ---- |
| 패키지명(`package.json`) | `jobmoa-ui` (레거시 흔적, 변경 안 함) |
| 로컬 디렉터리·git 저장소명 | `motive-ui` (레거시 흔적, 변경 안 함) |
| 프레임워크 | Next.js 16.1.6 (App Router) |
| 기본 포트 | 3000 (`npm run dev`) |
| API 베이스 | `NEXT_PUBLIC_API_BASE_URL` 환경변수 (백엔드 `flick-server`) |

## 2. 제공 기능 (화면 기준 실측, 2026-09-16 working tree)

- **OTT 메인 홈 화면 (목업)** — `app/HomePage.tsx` + `app/components/home/*`. 플로팅 캡슐 네비, 백드롭 히어로(+ "다음 추천" 인셋 패널), 장르별 랜드스케이프 카드 행(액션/로맨스/다큐). **데이터는 전부 `features/content/content.mock.ts`의 하드코딩 목업**이다 — 백엔드에 콘텐츠 API가 없어 `content.api.ts`/`content.query.ts`는 아직 없다. 온보딩(장르 선택) 연동도 아직 없음(행 구성은 고정).
- **인증** — 소셜 로그인(카카오/구글/깃허브) 진입 버튼, 앱 로드 시 1회 accessToken 재발급(`AuthBootstrap`)
- **관리자 셸** — 대시보드/유저/공통코드/운동마스터 화면(`app/admin/*`). 이 중 **대시보드·유저 관리는 대응 백엔드 엔드포인트가 확인되지 않고, 운동마스터(`exercises`)는 OTT 도메인과 무관한 레거시 잔존 코드**([`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고)
- **공통코드** — 관리자 CRUD(`features/code`)
- **메뉴** — 전체 메뉴 조회(`features/menu`)

## 3. 이것과 다른 저장소의 관계

- 백엔드는 별도 저장소 `flick-server`(Spring Boot, PostgreSQL)다. `.env.development`의 `NEXT_PUBLIC_API_BASE_URL=http://localhost:9999`가 로컬 API 베이스이며, OAuth 진입 URL 3종은 여전히 `http://localhost:9090/oauth2/authorization/{provider}`를 가리킨다 — **API 베이스(9999)와 OAuth URL(9090) 포트가 서로 다르다**([`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고, 원인 미확인).
- flick-ui 고유의 화면 요구사항은 아직 정해지지 않았다. 백엔드가 먼저 로드맵을 세웠으므로(`flick-server-streaming-roadmap.md`, M1~M6) 프론트 화면 설계도 그 순서(카탈로그 → 재생 → 시청기록 → 구독 → 추천)를 참고할 수 있다.

## 4. 워크플로우 요약

```
소셜 로그인(OAuth2) → JWT 발급(accessToken 메모리, refreshToken httpOnly 쿠키)
    → AuthBootstrap이 앱 로드 시 1회 재발급
```

flick 고유의 콘텐츠 탐색/재생/구독 워크플로우는 아직 설계 전이다.
