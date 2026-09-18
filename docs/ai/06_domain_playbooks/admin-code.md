# 플레이북 · 공통코드 소비 / 관리자 화면 (Admin & Code)

관련 코드: `app/admin/*`, `features/code/`(공개+관리자 공통코드), `features/admin/`(대시보드·유저 관리)

> ⚠️ 이 문서가 다루는 관리자 화면은 전부 OTT 고유 도메인이 아니라 이전 정체성(motive-ui 운동기록 서비스 / jobmoa-ui 채용정보 서비스)에서 재사용 중인 인프라 셸이다. 콘텐츠 관리자 화면(작품/에피소드 CRUD 등)은 아직 없다.

## 1. 공개 공통코드 소비 (`features/code/code.api.ts`)

* `fetchCodeList(comCdIds, param)` → `GET /api/v1/public/codes` — 여러 그룹을 한 번에 조회, 응답은 그룹ID를 키로 한 맵.
* `fetchCode(param)` → `GET /api/v1/public/code` — 단일 그룹 조회.
* **`code.type.ts`의 `codeList` 타입 필드(`RECRUIT_TYPE_CD`, `PROGRESS_TYPE_CD`, `TECH_STACK`, `RECRUIT_POSIT_TYPE_CD`, `CONTACT_METHOD_CD`)는 jobmoa-ui 시절 채용/구인 도메인 용어이며, flick(OTT) 도메인과도 무관하다.** [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고. **`codeList` 타입을 그대로 신뢰해 새 필드를 참조하지 말 것**; 실제로 어떤 그룹을 쓰는지는 `fetchCodeList` 호출부의 `comCdIds` 인자로 확인한다.
* 공통코드를 셀렉트 옵션으로 바꿀 때는 `util/CommonUtil.ts`의 `codeToSelectOption(codes, includeAll?)`을 재사용한다(자체 변환 로직을 새로 만들지 않는다).

## 2. 관리자 — 공통코드 CRUD (`app/admin/code`, `features/code/code.api.ts`)

* 공통코드: `fetchAdminComCodeList`/`createAdminComCode`/`updateAdminComCode`/`deleteAdminComCode` → `/api/v1/admin/codes` 4종.
* 상세코드: `fetchAdminDtlCodeList`/`createAdminDtlCode`/`updateAdminDtlCode`/`deleteAdminDtlCode` → `/api/v1/admin/codes/{comCdId}/details` 4종.
* 공통코드 삭제는 백엔드에서 상세코드까지 cascade 삭제된다(`flick-server` `06_domain_playbooks/admin-code.md` 참고) — 삭제 확인 UI에 "하위 상세코드도 함께 삭제됩니다" 같은 경고가 있는지 확인하고, 없다면 추가를 검토한다.
* OTT 도메인에서 장르·연령등급 등 분류값을 다룰 때도 신규 테이블 대신 이 공통코드 구조를 재사용하는 설계가 백엔드 로드맵(`flick-server-streaming-roadmap.md`)에서 제안돼 있다 — 새 코드값이 필요하면 먼저 이 CRUD로 등록하는 방식을 검토한다.

## 3. 관리자 — 운동마스터 CRUD (`app/admin/exercises`) — ⚠️ 레거시 잔존 코드, 곧 정리 예정, 현재 빌드 깨짐

* `features/exercise`는 2026-09-16 삭제됐지만, 화면(`app/admin/exercises/page.tsx`)만 정리 대상에서 빠진 채 남아있다. 오히려 같은 시점에 서버사이드 페이징(`pageNum`/`pageSize`)·부위/기구 필터가 추가됐다.
* **실측: 이 파일은 현재 존재하지 않는 모듈을 import하고 있어 컴파일이 깨진다** — `@/features/exercise/exercise.query`, `@/features/exercise/exercise.type`(둘 다 삭제됨), `@/app/onboarding/components/SelectOption`(`app/onboarding/` 디렉터리 전체 삭제됨). `npm run build`/`npm run dev`가 이 파일 때문에 실패할 수 있다 — [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고.
* **OTT 도메인과 무관하다.** 콘텐츠 관리 화면의 참고 패턴으로 이 코드를 복제하지 말 것 — 곧 삭제될 예정인 레거시다.
* 페이징 UI 패턴 자체(`components/ui/Pagination`의 `variant="admin"`, `PageHelper` 스타일 `{data, total, pages}` 응답 shape)는 재사용 가치가 있을 수 있으나, 도메인 로직(부위/기구 코드)은 재사용 대상이 아니다.

## 4. 관리자 — 대시보드/유저 관리 (`app/admin/dashboard`, `app/admin/users`, `features/admin/`) — ⚠️ 백엔드 확인 필요

* `admin.query.ts`가 다른 도메인과 달리 별도 `admin.api.ts` 없이 `get/post/patch`를 직접 호출한다: `fetchUserCounts`(`/api/v1/admin/dashboard/users/counts`), `fetchNewUserCount`(`.../new-counts`), `fetchPostCount`(`/api/v1/admin/dashboard/posts/counts`), `fetchAdminUsers`(`/api/v1/admin/users/search`), `updateUserRole`(`PATCH .../role`), `forceLogout`(`POST .../force-logout`).
* **이 6개 엔드포인트는 `flick-server`의 `09_api_contract` 문서에 없다.** 다만 `flick-server`의 `CLAUDE.md` 패키지 구조에는 `admin/{dashboard,log,mapper,user}`가 나열돼 있어 — 스캐폴딩만 있고 API 계약 문서화가 안 된 것인지, 실제로 미구현인지는 백엔드 쪽에서 다시 확인이 필요하다(추측 금지). `app/admin/dashboard`, `app/admin/users` 화면을 다루는 작업 전에 반드시 백엔드에 먼저 확인할 것 — [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md), [`09_api_contract`](../09_api_contract/flick-ui-api-contract.md) 참고.
* `AdminUser`(`admin.type.ts`)의 `postCount`("게시글 수") 개념은 flick(OTT 서비스)에도 게시판 기능이 없어 도메인상 근거가 여전히 불명확하다.

## 5. 관리자 접근 제어

* `app/admin/components/AdminAuthGuard.tsx`가 현재 모든 admin 라우트를 감싸지만 실제 인증 검사 로직이 없다(children을 무조건 렌더링) — [`06_domain_playbooks/auth.md`](./auth.md) §5, [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고. 관리자 기능을 실제로 배포하기 전 우선순위 높은 작업이다.
