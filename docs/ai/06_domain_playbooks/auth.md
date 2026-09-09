# 플레이북 · 인증/온보딩 진입 (Auth)

관련 코드: `app/login`, `app/components/auth/AuthBootstrap.tsx`, `features/auth/`(`auth.query.ts`, `auth.type.ts`)

## 1. 흐름

```
app/login/LoginPage.tsx (소셜 버튼) → NEXT_PUBLIC_OAUTH_{GOOGLE|KAKAO|GITHUB}_URL 로 이동
    → 백엔드 OAuth2 처리 후 프론트로 리다이렉트 (refreshToken은 httpOnly 쿠키로 내려옴)
    → 앱 재로드 시 app/providers.tsx의 AuthBootstrap → useGetTokenQuery()
        → POST /api/v1/auth/refresh → setAccessToken(res.data.accessToken)
    → onboardingCompleted === false 면 /onboarding/step-1 로, true면 홈으로
```

* 소셜 로그인 버튼 자체는 백엔드 OAuth2 진입점(`GET /oauth2/authorization/{provider}`)으로 단순 이동만 한다 — 프론트가 별도로 처리하는 로직은 없다.
* **`.env.development`의 OAuth URL은 `/oauth2/authorization/{provider}`(Spring Security 표준 경로)인데, `.env.production`은 `/oauth/{provider}`로 경로 패턴이 다르다.** 운영 환경에서 소셜 로그인 버튼이 정상 동작하는지 확인이 필요하다 — [`12_known_issues`](../12_known_issues/jobmoa-ui-known-issues.md) 참고. 새 소셜 프로바이더 추가 시 두 env 파일 모두 같은 경로 패턴으로 맞춰야 한다.

## 2. accessToken 재발급 (`useGetTokenQuery`)

* `features/auth/auth.query.ts`의 `getToken`이 `POST /api/v1/auth/refresh`를 호출하고 응답의 `accessToken`을 `setAccessToken`(`util/AxiosUtil.ts`)으로 메모리에 저장한다. `retry: false` — 실패하면 비로그인 상태로 간주하고 재시도하지 않는다.
* 응답의 `onboardingCompleted`는 그대로 신뢰한다 — 프론트에서 운동 프로필 존재 여부를 별도로 재계산하지 않는다(계산 로직은 백엔드 책임, `motive-server`의 `06_domain_playbooks/workout.md` 참고).
* `AuthBootstrap`은 렌더링하는 것이 없다(`return null`) — 부수효과(쿼리 트리거) 전용 컴포넌트다. 이 컴포넌트를 화면 어딘가에 새로 배치할 때 중복 마운트(중복 `/auth/refresh` 호출)가 없는지 확인한다.

## 3. 인증 사용자 정보 (`useMeQuery`)

* `features/auth/auth.query.ts`의 `getMe`가 `GET /api/v1/auth/me`를 호출해 `User` 타입(`id/email/name/phone/role/status/...`)을 가져온다. `enabled` 파라미터로 로그인 상태일 때만 호출하도록 화면에서 제어한다(기본값 `true` — 무조건 호출하는 화면에서는 401 처리 경로를 인지하고 있어야 함, 아래 4번 참고).
* `role` 필드는 응답에 존재하지만, **프론트 어디에서도 role 값을 기반으로 접근을 제어하는 로직이 없다**(`AdminAuthGuard.tsx` 실측 — children을 무조건 렌더링). 관리자 화면을 실사용자에게 노출하기 전 이 가드를 실제로 구현해야 한다 — [`12_known_issues`](../12_known_issues/jobmoa-ui-known-issues.md) 참고.

## 4. 401 처리

* `util/AxiosUtil.ts`의 응답 인터셉터가 전역으로 처리한다 — HTTP 401이고 요청 URL이 `/auth/login`·`/auth/refresh`가 아니면 `window.location.href = "/"`로 강제 이동한다. 개별 화면/훅에서 401을 잡아 별도 처리하지 않는다(이미 리다이렉트되므로 추가 처리가 대부분 불필요).

## 5. 신규 작업 시 체크

* 새로 로그인 필요 화면을 만들 때 `useMeQuery`/`useGetTokenQuery` 결과로 로딩·비로그인 상태를 구분해서 렌더링할 것 — `AdminAuthGuard`처럼 인증 상태를 확인하지 않고 children을 그대로 렌더링하는 패턴을 복제하지 않는다.
* 관리자 전용 화면을 추가할 때는 백엔드도 role 인가가 아직 없다는 점(`motive-server`의 `12_known_issues` 1번)과 합쳐서, 현재 "관리자 화면"은 프론트·백엔드 양쪽에서 로그인만 하면 접근 가능한 상태임을 인지하고 작업한다.
