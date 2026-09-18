# 하네스 엔지니어링 (AI Harness Engineering)

이 문서는 `flick-ui` 저장소(넷플릭스·티빙류의 스트리밍(OTT) 서비스 프론트엔드, 2026-09-16 정체성 확정)에서 **AI를 활용해 개발할 때 따르는 하네스(harness) 시스템**의 안내 허브입니다. AI에게 작업을 시키기 전에, 그리고 새 문서를 추가할 때 이 문서부터 확인하세요.

> 📌 **이 문서의 역할:** 개별 사실(스택·도메인·API 등)은 `docs/ai/01~13` 각 문서가 단일 출처(Single Source of Truth)입니다. 이 문서는 그 문서들을 **어떤 순서로·어떤 상황에 참조하는지**를 안내하는 지도(map)이며, 사실을 중복 기재하지 않습니다. 사실이 바뀌면 해당 번호 문서를 고치고, 이 문서는 구조가 바뀔 때만 갱신합니다.
>
> ⚠️ **저장소명은 레거시입니다.** 로컬 디렉터리·git 저장소명은 여전히 `motive-ui`이고 `package.json`의 `name`도 `jobmoa-ui`로 남아있습니다(리네임하지 않음 — 실제 인프라 식별자라 변경 범위 밖). `flick-ui`는 현재 서비스 정체성(문서·용어 기준)을 가리키는 이름이며, `docs/ai/` 문서 파일명은 이 정체성에 맞춰 `flick-ui-*.md`로 통일했습니다.
>
> ⚠️ **현재 코드베이스 현황(2026-09-16, 커밋 전 working tree):** 이전 두 정체성(개인 운동 기록 서비스 `motive-ui`, 그 뒤 시도한 채용정보 통합 서비스 `jobmoa-ui`)에서 쓰던 화면·상태·타입은 대량 삭제했다 — 랜딩페이지, 온보딩(15단계) 전체, 운동 기록 CRUD, 운동 목록(공개) 화면 및 대응 `features/{onboarding,workoutRecord,exercise}`·`store/{onboardingStore,recordDraftStore}`. 그 자리에 **OTT 메인 홈 화면 목업**(`app/HomePage.tsx`, Figma "FLOW" 시안 기준)을 새로 구현했다 — 단 `features/content/content.mock.ts` 하드코딩 데이터뿐이고, 실제 콘텐츠 API·온보딩(장르 선택) 연동은 아직 없다. 백엔드(`flick-server`)도 콘텐츠 API는 아직 없다(`flick-server` 저장소의 `docs/ai/01_project_overview/flick-server-streaming-roadmap.md` 참고). 상세는 [`01_project_overview/guide.md`](./01_project_overview/guide.md) 참고.
> * `app/admin/exercises`(운동마스터 관리자 CRUD)만 예외적으로 이번 정리 대상에서 빠진 채 오히려 페이징·필터가 추가됐다 — **OTT 도메인과 무관한 레거시 잔존 코드이며 곧 정리될 예정**이다. 새 작업의 참고 패턴으로 쓰지 말 것.

---

## 1. 하네스란 무엇인가

하네스는 AI가 이 저장소를 **매번 처음 보는 상태에서도 일관되게 작업하도록** 잡아주는 문서 체계입니다.

* **컨텍스트 주입:** AI는 세션마다 저장소 맥락을 모릅니다. `docs/ai/`의 문서를 컨텍스트로 제공해 프로젝트 사실·규칙·관례를 주입합니다.
* **단일 출처:** 같은 사실을 여러 곳에 적으면 반드시 어긋납니다. 각 주제는 정해진 한 문서에만 적고, 나머지는 그 문서를 링크로 가리킵니다.
* **검증된 패턴 축적:** 한 번 겪은 실수·해결책은 `12_known_issues`에 남겨 재발을 막습니다.
* **도메인 단위 플레이북:** 반복 작업하는 도메인은 화면·상태·API 연동 규칙을 `06_domain_playbooks`에 적어 일관성을 유지합니다. **flick 고유 도메인(콘텐츠·재생·구독 등)은 아직 안정되지 않아 플레이북이 없다** — §2 참고.

---

## 2. 문서 디렉토리 지도 (docs/ai/01~13)

각 디렉토리는 `guide.md`(역할·작성 규칙)와 `flick-ui-*.md`(실제 내용) 또는 도메인별 문서로 구성됩니다.

| # | 디렉토리 | 담는 내용 | 단일 출처 파일 |
|---|----------|-----------|----------------|
| 01 | `01_project_overview` | 프로젝트 정체성·목적 | `flick-ui-overview.md` |
| 02 | `02_tech_stack` | 기술 스택·라이브러리 버전 | `flick-ui-tech-stack.md` |
| 03 | `03_directory_structure` | 디렉토리 구조 (App Router + features 계층) | `flick-ui-directory.md` |
| 04 | `04_coding_standards` | 네이밍·상태관리·API 연동·스타일 규칙 등 코딩 표준 | `flick-ui-coding-standards.md` |
| 05 | `05_prompt_templates` | AI 작업 요청용 표준 프롬프트 양식 | `guide.md` |
| 06 | `06_domain_playbooks` | 도메인별 화면·상태·API 연동 규칙 (auth, admin-code) | 도메인별 `*.md` |
| 06 | `06_test_strategy` | 테스트 전략 (현재 공백 상태 포함) | `flick-ui-test-strategy.md` |
| 07 | `07_review_checklist` | 코드 리뷰 체크리스트 | `flick-ui-review-checklist.md` |
| 08 | `08_domain_glossary` | 도메인 용어 사전 | `flick-ui-glossary.md` |
| 09 | `09_api_contract` | API 계약 (flick-ui가 소비하는 엔드포인트 실측) | `flick-ui-api-contract.md` |
| 10 | `10_data_model` | 클라이언트 데이터 모델 (타입·전역 상태 shape) | `flick-ui-data-model.md` |
| 11 | `11_changelog` | 변경 이력 | `flick-ui-changelog.md` |
| 12 | `12_known_issues` | 알려진 이슈·함정·해결책 | `flick-ui-known-issues.md` |
| 13 | `13_deploy_runbook` | 빌드·배포 런북 | `flick-ui-deploy-runbook.md` |

> ⚠️ `06`이 두 개(`06_domain_playbooks`, `06_test_strategy`)입니다. 번호가 중복되어 있으니 디렉토리명으로 구분하세요. (motive-server 저장소의 하네스 관례를 그대로 따름.)
> ⚠️ `06_domain_playbooks/workout.md`는 2026-09-16 삭제했다(운동 기록 도메인 코드 자체가 삭제됨 — `flick-server`가 같은 시점에 `workout.md` 플레이북을 삭제한 것과 동일한 조치).

---

## 3. 작업 상황별 참조 순서

* **항상 먼저:** `01_project_overview`(맥락) → `02_tech_stack`(스택 확인)
* **도메인 화면 작업:** 해당 `06_domain_playbooks/<domain>.md` + `03_directory_structure`(파일 위치). **flick 고유 도메인은 플레이북이 아직 없다** — 백엔드 `flick-server` 저장소의 `docs/ai/01_project_overview/flick-server-streaming-roadmap.md`를 먼저 확인하고 화면 설계를 시작한다.
* **새 용어·상태가 나오면:** `08_domain_glossary` 확인 후 통일
* **API 연동 작업:** `09_api_contract` — 단, **API 계약의 실제 정본은 `flick-server` 저장소의 `docs/ai/09_api_contract/flick-server-api-contract.md`**다. 이 문서는 flick-ui가 실제로 호출하는 엔드포인트를 소비자 관점에서 정리한 것이며, 백엔드에 아직 없는 엔드포인트를 호출하는 경우도 기록한다(불일치 발견 시 `12_known_issues`에 남긴다).
* **코드 리뷰:** `04_coding_standards` + `07_review_checklist`
* **막히거나 이상하면:** `12_known_issues`에 같은 함정이 기록돼 있는지 먼저 확인
* **작업 후:** 변경은 `11_changelog`, 새로 발견한 함정은 `12_known_issues`에 기록

작업 요청 프롬프트 양식은 [`05_prompt_templates/guide.md`](./05_prompt_templates/guide.md)를 따릅니다.

---

## 4. 저장소 성격 (작업 전 반드시 확인)

| 항목 | 내용 |
|------|------|
| 역할(목표) | 넷플릭스·티빙류의 스트리밍(OTT) 서비스 프론트엔드 (2026-09-16 확정) |
| 역할(현재 코드) | 메인 홈 화면은 목업 데이터로 구현 시작(`app/HomePage.tsx`), 그 외 OTT 도메인(재생·시청기록·구독 등)은 없음. 나머지는 이전 정체성(motive-ui/jobmoa-ui)에서 재사용하는 인프라 — 소셜 로그인·공통코드 관리·메뉴·관리자 셸 ([`01_project_overview/guide.md`](./01_project_overview/guide.md) 참고) |
| 스택 | Next.js 16(App Router) · React 19 · TypeScript · Zustand · TanStack Query v5 · Tailwind CSS v4 |
| 인증 | 화면에서 직접 처리하지 않음 — 백엔드(Spring Security + JWT + OAuth2 소셜 로그인: 카카오/구글/깃허브)가 발급한 accessToken을 메모리에, refreshToken을 httpOnly 쿠키로 위임. `AuthBootstrap.tsx`가 앱 로드 시 1회 재발급 호출 |
| 백엔드 | 별도 저장소 `FLICK-SERVER`(Spring Boot, PostgreSQL). API 스펙의 단일 출처는 그 저장소의 `docs/ai/09_api_contract`이며, 여기서 서버 로직·DB 스키마를 생성하지 않는다. 백엔드도 OTT 도메인은 설계 단계이고 상세 로드맵(M1~M6)이 `01_project_overview/flick-server-streaming-roadmap.md`에 있다 |

상세는 [`02_tech_stack/flick-ui-tech-stack.md`](./02_tech_stack/flick-ui-tech-stack.md)가 단일 출처이며, 위는 요약만 적었습니다.

---

## 5. 도메인 작업의 핵심 관례

* **디렉토리 계층:** `app/`(라우팅, 얇은 페이지) → 같은 라우트 옆의 PascalCase 컴포넌트가 실제 화면. `features/<domain>/`에 `*.api.ts`(axios 호출) + `*.query.ts`(TanStack Query 훅) + `*.type.ts`(+ 변경이 필요하면 `*.mutation.ts`) 구조.
* **API 통신은 반드시 `util/AxiosUtil.ts`의 `get/post/put/patch/deleteData/postForm` 래퍼를 경유한다.** 컴포넌트나 `features/*`에서 axios를 직접 import하지 않는다.
* **응답 포맷:** `{ code, data, message }` — `code === "0000"`이 성공. 실패는 인터셉터가 `Promise.reject({ code, data, message })`로 던진다.
* **인증 상태:** accessToken은 메모리 변수(`util/AxiosUtil.ts`의 모듈 스코프)에만 저장 — 새로고침하면 사라지고 `AuthBootstrap.tsx`가 `/api/v1/auth/refresh`로 재발급한다. 컴포넌트에서 accessToken을 직접 상태로 들고 있지 않는다.
* **전역 상태:** 로그인이 아닌 전역 상태(알림/확인 모달 등)는 `store/`의 Zustand 스토어를 쓴다. 현재 남은 스토어는 `alertStore`/`confirmStore`뿐이다(온보딩·운동기록 드래프트 스토어는 삭제됨).
* **공통코드:** 백엔드의 `CMM_CODE`/`CMM_CODE_DTL`을 `features/code/`로 소비한다. **단, `features/code/code.type.ts`의 `codeList` 타입이 이전 정체성(채용정보 도메인)의 필드(`RECRUIT_TYPE_CD` 등)를 그대로 담고 있다** — [`12_known_issues`](./12_known_issues/flick-ui-known-issues.md) 참고, 신규 작업 시 이 타입에 의존하기 전에 실제 그룹 ID를 확인할 것.

---

## 6. 문서 작성·갱신 원칙

1. **단일 출처 유지:** 같은 사실을 두 문서에 쓰지 않습니다. 다른 곳에서 필요하면 링크로 가리킵니다.
2. **사실이 바뀌면 번호 문서를 고친다:** 이 허브 문서는 디렉토리 구조나 작업 흐름이 바뀔 때만 갱신합니다.
3. **변경은 changelog, 함정은 known_issues:** 작업 후 `11_changelog`에 변경을 남기고, 새로 발견한 실수·해결책은 `12_known_issues`에 기록합니다.
4. **플레이북은 도메인이 안정되면 작성:** 반복 작업하는 도메인은 `06_domain_playbooks`에 정리해 다음 작업의 컨텍스트로 씁니다. flick 고유 도메인은 아직 이 단계 전이다.
5. **시크릿 금지:** `.env.production`에는 서버 IP 등 배포 정보만 있고 시크릿은 없다 — 그래도 이 문서 체계 어디에도 실 크리덴셜 값을 옮겨 적지 않는다.

---

**문서 성격:** 하네스 시스템 안내 허브 (사실은 01~13 문서가 단일 출처)
**프로젝트:** flick-ui — 스트리밍(OTT) 서비스 프론트엔드 (목표. 현재 코드는 motive-ui/jobmoa-ui 유래 인프라 셸뿐)
**저장소:** motive-ui (로컬 디렉터리·git 저장소명. `package.json`의 `name`은 `jobmoa-ui`로 남아있음 — 둘 다 이전 정체성의 흔적)
