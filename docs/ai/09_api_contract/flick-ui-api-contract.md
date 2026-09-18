# API 계약 상세 (flick-ui API Contract) — 소비자 관점

실측: `features/**/*.api.ts`, `*.query.ts`(2026-09-16 기준). `util/AxiosUtil.ts`의 `baseURL`은 `NEXT_PUBLIC_API_BASE_URL`(호스트만, 경로 프리픽스 없음)이므로, **아래 표의 경로는 각 파일에 실제로 쓰인 문자열 그대로**다. 백엔드는 `/api/v1`을 `WebConfig`가 자동으로 붙이므로(`flick-server` 실측), 프론트 호출 문자열에도 `/api/v1`이 리터럴로 포함되어야 정상 도달한다.

> ⚠️ OTT 고유 도메인(콘텐츠·재생·시청기록·구독 등) API는 프론트·백엔드 양쪽에 아직 없다. 구현되면 이 문서에 새 절로 추가한다. 온보딩(`/fitness-profile`)·운동 기록(`/workout-records`)·운동 마스터 공개 조회(`/exercises`) 호출부는 2026-09-16 대응 `features/{onboarding,workoutRecord,exercise}` 삭제와 함께 이 문서에서도 제거했다.

## 공통 응답 형태 (프론트에서 언랩)

```json
{ "code": "0000", "message": "정상 처리되었습니다.", "data": { ... } }
```
`util/AxiosUtil.ts`의 `get`은 `data`만 반환, `post/put/patch`는 `{code, message, data}`를, `deleteData`는 `{code, data}`를 반환한다. `code !== "0000"`이면 응답 인터셉터가 reject한다.

## 인증 (`features/auth/auth.query.ts`)

| 메서드 | 경로 | 호출 지점 |
|--------|------|-----------|
| POST | `/api/v1/auth/refresh` | `getToken` — 앱 로드 시 `AuthBootstrap`이 트리거 |
| GET | `/api/v1/auth/me` | `getMe` — `useMeQuery` |

> `getToken`의 응답 타입(`RefreshResponse`)에는 `onboardingCompleted` 필드가 여전히 선언돼 있으나, `flick-server`가 2026-09-09 `TokenResponseDto`에서 이 필드를 제거했다 — 죽은 필드다. [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고.

## 공통코드 (`features/code/code.api.ts`)

| 메서드 | 경로 | 호출 지점 |
|--------|------|-----------|
| GET | `/api/v1/public/codes` | `fetchCodeList` (다건, `comCdIds` 파라미터) |
| GET | `/api/v1/public/code` | `fetchCode` (단건) |
| GET | `/api/v1/admin/codes` | `fetchAdminComCodeList` |
| POST | `/api/v1/admin/codes` | `createAdminComCode` |
| PUT | `/api/v1/admin/codes/{comCdId}` | `updateAdminComCode` |
| DELETE | `/api/v1/admin/codes/{comCdId}` | `deleteAdminComCode` |
| GET | `/api/v1/admin/codes/{comCdId}/details` | `fetchAdminDtlCodeList` |
| POST | `/api/v1/admin/codes/{comCdId}/details` | `createAdminDtlCode` |
| PUT | `/api/v1/admin/codes/{comCdId}/details/{dtlCdId}` | `updateAdminDtlCode` |
| DELETE | `/api/v1/admin/codes/{comCdId}/details/{dtlCdId}` | `deleteAdminDtlCode` |

## 메뉴 (`features/menu/menu.query.ts`)

| 메서드 | 경로 | 호출 지점 |
|--------|------|-----------|
| GET | ~~`/public/menus`~~ | `fetchMenuList` |

> ⚠️ **경로에 `/api/v1` 프리픽스가 빠져 있다.** 다른 모든 도메인 파일은 리터럴로 `/api/v1/...`을 쓰는데 이 파일만 `/public/menus`로 호출한다. `baseURL`이 호스트만 담당하므로 실제 요청은 `{API_BASE_URL}/public/menus`로 나가고, 백엔드 실제 경로는 `{API_BASE_URL}/api/v1/public/menus`다(`flick-server` `MenuController`, `WebConfig` 자동 프리픽스). **현재 코드 그대로면 메뉴 조회는 404가 난다.** [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고 — 수정 시 `/api/v1/public/menus`로 바꾼다.

## 관리자 — 대시보드/유저 (`features/admin/admin.query.ts`) — ⚠️ 백엔드 확인 필요

| 메서드 | 경로 | 호출 지점 |
|--------|------|-----------|
| GET | `/api/v1/admin/dashboard/users/counts` | `fetchUserCounts` |
| GET | `/api/v1/admin/dashboard/users/new-counts` | `fetchNewUserCount` |
| GET | `/api/v1/admin/dashboard/posts/counts` | `fetchPostCount` |
| GET | `/api/v1/admin/users/search` | `fetchAdminUsers` |
| PATCH | `/api/v1/admin/users/{userId}/role` | `updateUserRole` |
| POST | `/api/v1/admin/users/{userId}/force-logout` | `forceLogout` |

> 이 6개 엔드포인트는 `flick-server`의 `09_api_contract` 문서에 없다. `flick-server`의 `CLAUDE.md` 패키지 구조에는 `admin/{dashboard,log,mapper,user}`가 나열돼 있으나 API 계약 문서에는 반영되지 않았다 — 스캐폴딩만 있고 미구현인지, 문서화 누락인지 백엔드 쪽에서 재확인이 필요하다(추측 금지). `app/admin/dashboard`, `app/admin/users` 화면은 확인 전까지 실행하면 실패할 수 있다고 가정한다.

## 관리자 — 운동마스터 (`app/admin/exercises/page.tsx`) — ⚠️ 레거시, 현재 컴파일 깨짐

* 이 화면이 호출하던 `features/exercise/exercise.api.ts`(`/api/v1/exercises`, `/api/v1/admin/exercises` 5종)는 2026-09-16 삭제됐다. 화면 코드는 남아있지만 삭제된 모듈을 여전히 import하므로 **현재 빌드가 실패한다** — [`06_domain_playbooks/admin-code.md`](../06_domain_playbooks/admin-code.md) §3, [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고. OTT 도메인 API 설계 시 이 엔드포인트들을 참고하지 않는다(도메인 자체가 무관).

## 파일 업로드

* 저장소 내에 파일 업로드 API를 직접 호출하는 코드(`postForm`으로 `/file/editor-image` 등을 부르는 지점)가 `features/**` 안에서 확인되지 않았다. `hooks/useTempKey.ts`(tempKey 생성)와 `components/Editor.tsx`(Tiptap)는 있으나 실제 업로드 호출부는 이 문서 작성 시점에 미확인 — 관련 작업 시 먼저 grep으로 확인할 것(추측 금지).
