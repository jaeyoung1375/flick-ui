# AI 전용 프롬프트 템플릿 (Prompt Templates)

개발자가 AI에게 프론트엔드 작업을 요청할 때 사용하는 표준 프롬프트 양식입니다. 이 형식을 복사해서 AI에게 제공하세요.

> 📌 **이 저장소는 프론트엔드(Next.js) 전용입니다.** 서버(Spring Boot) 코드는 `jobmoa-server` 저장소에 있으므로 여기서 백엔드 코드를 생성하지 않습니다. 모든 템플릿은 App Router + `features/<domain>` 계층(api/query/mutation/type)을 전제로 합니다. 스택은 [`02_tech_stack/jobmoa-ui-tech-stack.md`](../02_tech_stack/jobmoa-ui-tech-stack.md) 참고.

---

## 템플릿 1: 도메인 화면 작업 요청 (가장 자주 쓰는 양식)

기존 도메인 화면을 수정·확장할 때는 해당 도메인의 **플레이북**(`06_domain_playbooks/`)을 컨텍스트로 제공합니다.

> **[복사용 프롬프트]**
> 너는 이 저장소(jobmoa-ui)의 프론트엔드 작업자야. 아래 문서 규칙을 지켜서 작업해 줘.
> * `docs/ai/06_domain_playbooks/<domain>.md` — 도메인 화면·상태·API 연동 규칙
> * `docs/ai/04_coding_standards/jobmoa-ui-coding-standards.md` — 라우팅·상태관리·스타일 규칙
>
> * **대상 도메인/경로:** [예: `app/profile/record`, `features/workoutRecord`]
> * **요구사항:** [추가/변경할 화면·상호작용]
> * **인증 필요 여부:** [로그인 필요 / public]
>
> **[준수사항]**
> 1. API 호출은 `util/AxiosUtil.ts` 래퍼만 경유하고, `features/<domain>/*.query.ts`·`*.mutation.ts`를 통해서만 컴포넌트에 노출할 것.
> 2. 신규 공용 컴포넌트는 `components/ui/`에 만들고 `styles/globals.css`의 테마 토큰을 쓸 것(색상 하드코딩 금지).
> 3. 용어는 `08_domain_glossary`·플레이북 정의와 통일할 것.
> 4. 요구 범위 밖 필드·화면을 추측으로 채우지 말 것(가정이 필요하면 명시).
> 5. React 19 / Next.js 16 App Router 문법만 사용할 것.

---

## 템플릿 2: 새 도메인(features) 신규 구현 요청

> **[복사용 프롬프트]**
> 너는 이 저장소(jobmoa-ui)의 프론트엔드 작업자야. `docs/ai/`의 개요·기술 스택·코딩 규칙을 기반으로 아래 도메인 화면을 새로 만들어 줘.
>
> * **도메인명:** [예: `features/<domain>`]
> * **역할:** [한 줄 정의]
> * **라우트:** [예: `app/<route>/page.tsx`]
> * **호출할 API:** [메서드·경로 — jobmoa-server의 `docs/ai/09_api_contract`를 먼저 확인하고, 없으면 명시]
> * **인증 필요 여부:** [로그인 필요 / public]
>
> **[요구사항]**
> 1. `features/<domain>/<domain>.api.ts`(axios 호출), `.query.ts`(조회 훅), `.type.ts`(+ 변경이 필요하면 `.mutation.ts`) 구조로 만들어 줘.
> 2. 라우트는 얇은 `page.tsx` + 같은 디렉토리의 PascalCase 컴포넌트로 분리해 줘.
> 3. 백엔드에 아직 없는 엔드포인트를 호출해야 한다면 임의로 존재를 가정하지 말고 그 사실을 결과에 명시해 줘.
> 4. 용어는 `08_domain_glossary` 정의와 통일해 줘.
> 5. 작업 후 도메인 플레이북(`06_domain_playbooks`)·변경 이력(`11_changelog`)을 함께 갱신해 줘.

---

## 템플릿 3: 코드 리뷰 및 리팩토링 요청

> **[복사용 프롬프트]**
> 내가 작성한 아래 프론트엔드 코드를 리뷰하고 리팩토링해 줘.
> `docs/ai/04_coding_standards/jobmoa-ui-coding-standards.md`의 코딩 규칙과 `docs/ai/07_review_checklist/jobmoa-ui-review-checklist.md`의 체크리스트를 지켜야 해.
>
> **[대상]** [컴포넌트/훅 — 예: `RecordDetailPage.tsx`]
>
> **[기존 코드]**
> ```tsx
> [여기에 코드를 붙여넣으세요]
> ```
>
> **[리팩토링 방향]**
> * 컴포넌트에서 axios 직접 호출 여부, `features/*` 계층 위반, TanStack Query 캐시 무효화 누락, 색상 하드코딩, 구 `components/`(최상위) 세트 재사용 여부를 점검하고 수정된 코드와 이유를 설명해 줘.
> * React 19 / Next.js 16 호환 문법만 사용해 줘.

---

## 템플릿 4: 인증/온보딩 관련 작업 요청

소셜 로그인 진입, accessToken 재발급, 온보딩 완료 판정 등 인증 흐름 작업에 사용합니다.

> **[복사용 프롬프트]**
> 아래 작업을 해 줘. `docs/ai/06_domain_playbooks/auth.md`·`docs/ai/09_api_contract/jobmoa-ui-api-contract.md`의 계약과 어긋나지 않아야 해.
>
> * **대상:** [예: `AuthBootstrap` / 온보딩 스텝 / 관리자 인증 가드]
> * **목적/변경 내용:** [추가·수정할 로직]
>
> **[준수사항]**
> 1. accessToken을 `util/AxiosUtil.ts`의 모듈 스코프 변수 밖(컴포넌트 state, Zustand, localStorage 등)에 저장하지 말 것.
> 2. `onboardingCompleted` 판정은 프론트에서 재계산하지 말고 `/auth/refresh` 응답값을 그대로 신뢰할 것.
> 3. 알려진 함정(`12_known_issues`) — `AdminAuthGuard`가 실제 인증 검사 없이 children을 그대로 렌더링하는 점, 운영 환경 OAuth URL 경로 패턴 불일치 — 를 확인할 것.
> 4. 변경을 `11_changelog`에 기록할 것.

---

> 📌 작업 전 항상 `01_project_overview`(맥락)와 `02_tech_stack`(스택)을 먼저 확인하세요. 전체 하네스 사용법은 [`harness_engineering.md`](../harness_engineering.md) 참고.
