# 플레이북 · 공통코드 소비 / 관리자 화면 (Admin & Code)

관련 코드: `app/admin/*`, `features/code/`(공개+관리자 공통코드), `features/admin/`(대시보드·유저 관리), `features/exercise/`(운동마스터 admin 부분)

## 1. 공개 공통코드 소비 (`features/code/code.api.ts`)

* `fetchCodeList(comCdIds, param)` → `GET /api/v1/public/codes` — 여러 그룹을 한 번에 조회, 응답은 그룹ID를 키로 한 맵.
* `fetchCode(param)` → `GET /api/v1/public/code` — 단일 그룹 조회.
* **`code.type.ts`의 `codeList` 타입 필드(`RECRUIT_TYPE_CD`, `PROGRESS_TYPE_CD`, `TECH_STACK`, `RECRUIT_POSIT_TYPE_CD`, `CONTACT_METHOD_CD`)는 motive(운동 기록) 도메인과 무관한 채용/구인 도메인 용어다.** 다른 프로젝트에서 복사된 뒤 motive 도메인 그룹 ID(`BODY_PART_CD`, `EXERCISE_EQUIPMENT_CD`, `EXPERIENCE_CD`, `LEVEL_CD`, `EQUIPMENT_CD` 등, `motive-server`의 `08_domain_glossary` 참고)로 바뀌지 않은 것으로 보인다 — [`12_known_issues`](../12_known_issues/jobmoa-ui-known-issues.md) 참고. **`codeList` 타입을 그대로 신뢰해 새 필드를 참조하지 말 것**; 실제로 어떤 그룹을 쓰는지는 `fetchCodeList` 호출부의 `comCdIds` 인자로 확인한다.
* 공통코드를 셀렉트 옵션으로 바꿀 때는 `util/CommonUtil.ts`의 `codeToSelectOption(codes, includeAll?)`을 재사용한다(자체 변환 로직을 새로 만들지 않는다).

## 2. 관리자 — 공통코드 CRUD (`app/admin/code`, `features/code/code.api.ts`)

* 공통코드: `fetchAdminComCodeList`/`createAdminComCode`/`updateAdminComCode`/`deleteAdminComCode` → `/api/v1/admin/codes` 4종.
* 상세코드: `fetchAdminDtlCodeList`/`createAdminDtlCode`/`updateAdminDtlCode`/`deleteAdminDtlCode` → `/api/v1/admin/codes/{comCdId}/details` 4종.
* 공통코드 삭제는 백엔드에서 상세코드까지 cascade 삭제된다(`motive-server` `06_domain_playbooks/admin-code.md` 참고) — 삭제 확인 UI에 "하위 상세코드도 함께 삭제됩니다" 같은 경고가 있는지 확인하고, 없다면 추가를 검토한다.

## 3. 관리자 — 운동마스터 CRUD (`app/admin/exercises`, `features/exercise/exercise.api.ts`)

* `fetchAdminExerciseList`/`createAdminExercise`/`updateAdminExercise`/`deleteAdminExercise` → `/api/v1/admin/exercises` 4종, 공개 조회(`fetchExerciseList`)와 같은 `exercise.api.ts` 파일에 함께 있다.

## 4. 관리자 — 대시보드/유저 관리 (`app/admin/dashboard`, `app/admin/users`, `features/admin/`)

* `admin.query.ts`가 다른 도메인과 달리 별도 `admin.api.ts` 없이 `get/post/patch`를 직접 호출한다: `fetchUserCounts`(`/api/v1/admin/dashboard/users/counts`), `fetchNewUserCount`(`.../new-counts`), `fetchPostCount`(`/api/v1/admin/dashboard/posts/counts`), `fetchAdminUsers`(`/api/v1/admin/users/search`), `updateUserRole`(`PATCH .../role`), `forceLogout`(`POST .../force-logout`).
* **이 6개 엔드포인트는 `motive-server` 저장소의 컨트롤러 어디에도 존재하지 않는다**(실측: `kr.co.motive.admin` 패키지에는 `code`·`exercise` 서브패키지만 있음, `dashboard`/`users` 없음). `app/admin/dashboard`·`app/admin/users` 화면은 현재 백엔드 없이 프론트만 만들어진 상태로, 실행하면 404가 난다. **이 두 화면을 다루는 작업을 시작하기 전에 반드시 백엔드 구현 여부를 먼저 확인할 것** — [`12_known_issues`](../12_known_issues/jobmoa-ui-known-issues.md), [`09_api_contract`](../09_api_contract/jobmoa-ui-api-contract.md) 참고.
* `AdminUser`(`admin.type.ts`)의 `postCount`("게시글 수") 개념도 motive(운동 기록 서비스)에 게시판 기능이 없어 도메인상 어색하다 — 다른 프로젝트 템플릿에서 복사되었을 가능성이 있다(확정은 아님, 실사용 요구사항이 오면 재확인).

## 5. 관리자 접근 제어

* `app/admin/components/AdminAuthGuard.tsx`가 현재 모든 admin 라우트를 감싸지만 실제 인증 검사 로직이 없다(children을 무조건 렌더링) — [`06_domain_playbooks/auth.md`](./auth.md) §5, [`12_known_issues`](../12_known_issues/jobmoa-ui-known-issues.md) 참고. 관리자 기능을 실제로 배포하기 전 우선순위 높은 작업이다.
