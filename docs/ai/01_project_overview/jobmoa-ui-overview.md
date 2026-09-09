# 프로젝트 정체성 (jobmoa-ui Overview)

이 문서는 AI 작업용 사실 정리입니다. 프로젝트의 주관적 목적·우선순위는 [`guide.md`](./guide.md)에 사용자가 직접 적습니다.

## 1. 정체성

**jobmoa**는 여러 채용사이트의 공고를 한곳에 모아 볼 수 있게 하는 채용정보 통합(잡 어그리게이터) 서비스다. `jobmoa-ui`는 그 프론트엔드(Next.js)가 될 예정이며, 백엔드는 별도 저장소 `jobmoa-server`(Spring Boot)가 담당한다.

> ⚠️ **레거시 코드베이스:** 이 저장소는 개인 운동 기록 서비스 `motive-ui`를 복제한 초기 스캐폴딩이며, 아래 "2. 제공 화면"은 **현재 코드에 남아있는 motive-ui 시절 화면을 그대로 실측한 것**이다. 채용정보 도메인 화면은 아직 구현되지 않았다. Next.js/TanStack Query/Zustand 등 기술 골격은 그대로 재사용 가능하지만, 온보딩·운동기록·운동목록 등 workout 도메인 화면은 채용정보 도메인으로 교체되기 전까지의 임시 상태다.

| 항목 | 내용 |
|------|------|
| 패키지명 | `jobmoa-ui` / `0.1.0` (package.json) |
| 실행 포트 | `3000` (Next.js 기본, `npm run dev`) |
| API 베이스 | `NEXT_PUBLIC_API_BASE_URL` 환경변수 — 로컬 `http://localhost:9090`, 운영 `http://146.56.116.158:9090` |
| 렌더링 | App Router, 대부분의 화면 컴포넌트가 `"use client"` — 서버 컴포넌트보다 클라이언트 상태(TanStack Query, Zustand, 폼)가 중심 |

## 2. 제공 화면 (app/ 라우트 기준 실측)

* **랜딩/홈** — `app/page.tsx`(`LandingPage`), 로그인 후 `app/WorkoutHomePage.tsx`
* **로그인** — `app/login` — 소셜 로그인(카카오/구글/깃허브) 진입점 버튼
* **온보딩** — `app/onboarding/step-1` ~ `step-15` — 닉네임/성별/생년월일부터 운동경력·레벨·보유장비·신체정보·스쿼트/벤치프레스 가능여부까지 단계별 입력, 완료 시 `POST /api/v1/fitness-profile` 1회 호출
* **운동 기록** — `app/profile/record`, `app/profile/record/[id]` — 날짜별 운동 기록 목록/상세, 작성 중 상태는 `store/recordDraftStore.ts`
* **운동 목록** — `app/exercises` — 부위/기구 필터가 있는 운동 마스터 조회 화면(필터 옵션 자체는 현재 하드코딩, [`12_known_issues`](../12_known_issues/jobmoa-ui-known-issues.md) 참고)
* **프로필** — `app/profile` — 내 정보
* **관리자** — `app/admin/{dashboard,users,code,exercises}` — 대시보드 통계, 유저 관리, 공통코드 CRUD, 운동마스터 CRUD

## 3. 이것과 다른 저장소의 관계

* **`jobmoa-server`** — Spring Boot 백엔드. `NEXT_PUBLIC_API_BASE_URL`로 가리키는 API 서버이며, 이 저장소에서는 서버 로직·DB 스키마를 생성하지 않는다. API 계약 정본은 그 저장소의 `docs/ai/09_api_contract`이며, 현재는 jobmoa-server 쪽도 motive-server 시절 workout 도메인 계약이 그대로 남아있는 상태다(채용정보 도메인 계약으로 교체되기 전).
* **이 저장소는 워크스페이스 루트(`Java-Service-Tree-Framework`)의 멀티에이전트 하네스와 도메인이 무관하다.** 루트는 별개 프로젝트(A-RMS)의 오케스트레이션 시스템이며, `jobmoa-ui`는 그 루트 아래 독립 git 저장소로 얹혀 있을 뿐이다. jobmoa-ui 관련 작업은 이 하네스 문서를 우선 참고한다.

## 4. 워크플로우 요약

```
소셜 로그인 버튼 클릭 → 백엔드 OAuth2 진입점으로 이동 → 로그인 성공 후 프론트로 리다이렉트
    → 앱 로드 시 AuthBootstrap이 /auth/refresh 호출 → accessToken 메모리 저장
    → onboardingCompleted === false면 온보딩(step-1~15) → 완료 시 fitness-profile 등록
    → 운동 기록 등록/조회/수정/삭제 (app/profile/record)
```

* 온보딩 완료 여부는 `/auth/refresh` 응답의 `onboardingCompleted` 필드로 판정한다(백엔드 값을 그대로 신뢰 — 프론트에서 별도 계산하지 않음).
