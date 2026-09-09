# 코딩 규칙 상세 (jobmoa-ui Coding Standards)

실측 코드 패턴 기반 (2026-08-10). 기존 코드에 없는 규칙을 새로 강제하지 않는다 — 여기 적힌 것은 이미 저장소에 존재하는 관례다.

## 1. 라우팅·컴포넌트 분리

* `app/**/page.tsx`는 얇게 유지하고, 실제 화면은 같은 디렉토리의 PascalCase 컴포넌트로 둔다(`Step1Page.tsx`, `LoginPage.tsx` 등). `page.tsx`는 `"use client"` + 훅(`useRouter` 등)으로 네비게이션 콜백만 연결한다.
* 동적 라우트는 Next.js 규약(`[id]/page.tsx`)을 그대로 따른다.

## 2. API 통신

* `features/<domain>/<domain>.api.ts`(또는 `.query.ts`)에서만 `util/AxiosUtil.ts`의 `get/post/put/patch/deleteData/postForm`을 호출한다. 컴포넌트에서 axios를 직접 import하지 않는다.
* 조회는 TanStack Query `useQuery`로 감싼 훅(`use<Domain>Query`)을, 변경은 `useMutation`으로 감싼 훅(`use<Action><Domain>Mutation`)을 `*.query.ts`/`*.mutation.ts`에 정의한다.
* 성공 시 관련 `queryKey`를 `invalidateQueries`로 무효화한다(`workoutRecord.mutation.ts` 실측 — `["workout-records"]`).
* `queryKey`는 배열 리터럴로 도메인→세부 구분 순서로 쓴다(예: `["workout-records", "detail", workoutRecordId]`).
* 파일 업로드가 필요한 요청은 `util/FileUtil.ts`의 `toMultipart(data, files)`로 JSON 파트 + 파일 파트를 구성한 뒤 `postForm`을 쓴다.

## 3. 타입

* 요청 타입 접미사: `*CreateRequest`/`*UpdateRequest`/`*Request`(백엔드의 `*InsertDto`/`*UpdateDto`에 대응), 응답 타입 접미사: `*Response`.
* API 응답 배열/객체 shape은 백엔드 DTO 필드명(camelCase)을 그대로 따른다 — 프론트에서 임의로 필드명을 바꾸지 않는다.
* 새 도메인 타입을 추가하기 전 [`08_domain_glossary`](../08_domain_glossary/jobmoa-ui-glossary.md)에서 이미 쓰인 용어와 충돌하지 않는지 확인한다.

## 4. 상태 관리

* 서버에서 온 데이터(API 응답)는 TanStack Query 캐시에만 둔다 — Zustand에 복제해서 들고 있지 않는다.
* 여러 화면에 걸쳐 유지되어야 하는 순수 클라이언트 상태(폼 임시값, 작성 중 draft, 전역 알림/확인 모달)만 `store/`의 Zustand 스토어로 관리한다(`onboardingStore`, `recordDraftStore`, `alertStore`, `confirmStore`가 기존 예시).
* 새 Zustand 스토어는 `create<State>((set) => ({...initialState, action: (...) => set(...), reset: () => set(initialState)}))` 패턴을 따른다(기존 스토어 공통 형태).

## 5. 인증

* accessToken을 컴포넌트 state나 Zustand에 저장하지 않는다 — `util/AxiosUtil.ts`의 `setAccessToken`/`getAccessToken`(모듈 스코프 변수)만 사용한다.
* 로그인 여부가 필요한 화면은 `useMeQuery`/`useGetTokenQuery`(`features/auth/auth.query.ts`) 결과로 판단한다. 새로운 인증 가드를 만들 때 실제로 로딩·인증 상태를 확인하는 로직 없이 children을 그대로 렌더링하는 자리표시자를 남기지 않는다(`AdminAuthGuard.tsx` 실측 — 현재 가드 로직이 비어 있음, [`12_known_issues`](../12_known_issues/jobmoa-ui-known-issues.md) 참고. 새 코드에서 이 패턴을 그대로 복제하지 말 것).

## 6. 스타일

* Tailwind 유틸리티 클래스를 직접 쓰고, 조건부 클래스는 `util/cn.ts`(clsx + tailwind-merge)로 병합한다.
* 색상은 `styles/globals.css`의 `@theme` 토큰(`bg-motive`, `text-ink-700` 등)을 우선 사용한다. `#2F80FF`처럼 색상 값을 새로 하드코딩하지 않는다 — 필요한 토큰이 없으면 먼저 `globals.css`에 추가할지 논의한다.
* 신규 공용 컴포넌트는 `components/ui/`에 만든다(`components/` 최상위는 구 세트로, 신규 작업의 기준이 아니다 — [`12_known_issues`](../12_known_issues/jobmoa-ui-known-issues.md) 참고).
* UI 언어는 한국어(버튼/라벨/안내 문구 전부).

## 7. 네이밍

* 컴포넌트 파일 PascalCase(`Button.tsx`), 훅/유틸 camelCase(`useTempKey.ts`, `DateUtil.ts`), 타입은 도메인 접두어 + 역할(`WorkoutRecordCreateRequest`).
* Zustand 스토어 파일: `<domain>Store.ts`, 훅 이름 `use<Domain>Store`.

## 8. 로깅·에러

* `util/AxiosUtil.ts`의 응답 인터셉터가 `code !== "0000"`이면 `{code, data, message}`를 reject하고, HTTP 401이면(로그인/재발급 경로 제외) `window.location.href = "/"`로 강제 이동한다 — 개별 API 호출부에서 401을 별도로 처리하지 않는다.
* 사용자에게 보여줄 에러/확인 메시지는 `store/alertStore.ts`/`confirmStore.ts`를 통해 전역 모달로 띄운다(개별 컴포넌트에서 `alert()`/`confirm()` 브라우저 API를 직접 쓰지 않는다).

## 9. 환경변수

* 클라이언트에서 참조하는 값은 반드시 `NEXT_PUBLIC_` 접두어를 쓴다(`NEXT_PUBLIC_API_BASE_URL` 등). 새 환경변수를 추가하면 `.env.development`와 `.env.production` 양쪽에 값을 채우고, 배포 워크플로우(`.github/workflows/deploy.yml`)의 `env:` 블록도 실제로 그 변수명을 참조하는지 확인한다(현재 이름 불일치 사례가 있음 — [`13_deploy_runbook`](../13_deploy_runbook/jobmoa-ui-deploy-runbook.md) 참고).
