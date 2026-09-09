# 알려진 이슈·함정 상세 (jobmoa-ui Known Issues)

실제 코드 실측 기반(2026-08-10). 확인되지 않은 추측은 적지 않았다.

## 0. (가장 중요) 코드베이스 도메인이 프로젝트 목적과 다름

jobmoa-ui는 채용정보 통합(잡 어그리게이터) 서비스로 기획되었으나(2026-09-09, [`01_project_overview/guide.md`](../01_project_overview/guide.md)), 개인 운동 기록 서비스 `motive-ui`의 프로젝트명만 바꿔 시작했다. 아래 1번 이후의 이슈들과 `06_domain_playbooks`·`09_api_contract`·`10_data_model`·`08_domain_glossary`는 전부 motive-ui 시절 운동 기록 도메인(온보딩·운동 기록·운동 목록 등)을 실측한 내용이며, 채용정보 도메인 코드는 아직 존재하지 않는다.
**영향:** 신규 기능(채용 공고 조회·검색 등)을 설계할 때 이 인프라(App Router·features 계층·Axios 래퍼·인증 흐름 등)는 기술적 예시로 참고하되, 채용정보 도메인 화면/타입은 새로 만들어야 한다.

## 1. 메뉴 조회 API 호출에 `/api/v1` 프리픽스가 빠져 있음 — 실행 시 404 가능성

`features/menu/menu.query.ts`의 `fetchMenuList`가 `get<Menu[]>("/public/menus")`를 호출한다. `util/AxiosUtil.ts`의 `baseURL`은 호스트만 담당하고(`NEXT_PUBLIC_API_BASE_URL`), 나머지 모든 도메인 파일(`auth`, `workoutRecord`, `exercise`, `code`, `onboarding`, `admin`)은 예외 없이 경로 문자열에 `/api/v1`을 리터럴로 포함한다. `menu.query.ts`만 이 프리픽스가 빠져 있어 실제 요청이 `{API_BASE_URL}/public/menus`로 나가지만, 백엔드 실제 경로는 `{API_BASE_URL}/api/v1/public/menus`다(`WebConfig`가 `/api/v1`을 자동 부여).
**영향:** 메뉴를 사용하는 화면(`features/menu/menuLayout.tsx`)에서 조회가 항상 실패할 가능성이 높다. 메뉴 관련 작업 시 가장 먼저 확인할 지점.

## 2. `AdminAuthGuard`가 실제로는 아무 것도 막지 않음

`app/admin/components/AdminAuthGuard.tsx`는 `useRouter()`를 호출만 하고 실제로는 사용하지 않으며(`router` 변수 미사용), 인증 상태를 확인하는 로직 없이 `children`을 무조건 렌더링한다. 컴포넌트 상단 주석은 "로그인 상태가 확인되지 않으면 홈으로 리다이렉트"라고 적혀 있지만 구현이 비어 있다.
**영향:** 현재 `/admin/**` 경로는 프론트에서 접근을 전혀 제한하지 않는다. 백엔드도 role 기반 인가가 없으므로(`motive-server` `12_known_issues` 1번), 관리자 화면은 프론트·백엔드 양쪽에서 사실상 로그인 여부와 무관하게 열려 있다(로그인조차 안 해도 화면 자체는 렌더링됨 — API 호출만 401이 날 수 있음). 관리자 화면을 실사용자에게 노출하기 전 반드시 구현해야 한다.

## 3. `components/`(최상위)와 `components/ui/`에 중복 컴포넌트가 공존하며 색상 체계가 다름

`Button.tsx`, `Input.tsx` 등이 최상위 `components/`와 `components/ui/` 양쪽에 존재한다. 최상위 버전은 `#2F80FF`(파랑) 등 색상을 하드코딩하고, `components/ui/` 버전은 `styles/globals.css`의 `@theme` 토큰(`bg-motive` = `#ff7a00`, 오렌지 계열)을 쓴다. **`CLAUDE.md`에 적힌 디자인 컨셉("포인트 블루 `#2F80FF`")과 실제 테마 토큰(오렌지)도 서로 어긋난다.**
**영향:** 어느 세트를 쓰느냐에 따라 화면 색감이 달라진다. 신규 화면 작업 시 두 세트를 섞어 쓰면 일관성이 깨진다. 어느 쪽이 최신 기준인지(오렌지 테마로 가는 마이그레이션 중으로 추정) 팀 확인이 필요하며, 확인 전까지는 `components/ui/` + 테마 토큰을 기본으로 삼는다([`04_coding_standards`](../04_coding_standards/jobmoa-ui-coding-standards.md) §6).

## 4. `features/code/code.type.ts`의 `codeList` 타입이 motive 도메인과 무관한 필드로 채워짐

`codeList` 타입의 필드가 `RECRUIT_TYPE_CD`, `PROGRESS_TYPE_CD`, `TECH_STACK`, `RECRUIT_POSIT_TYPE_CD`, `CONTACT_METHOD_CD`로, 채용/구인 도메인 용어다. motive(운동 기록 서비스)의 실제 공통코드 그룹(`BODY_PART_CD`, `EXERCISE_EQUIPMENT_CD`, `EXPERIENCE_CD`, `LEVEL_CD` 등)과 무관하다.
**영향:** 이 타입을 그대로 신뢰해 `codeList.BODY_PART_CD` 같은 코드를 작성하면 타입 에러가 나거나(필드가 없으므로), 반대로 존재하지 않는 필드를 참조하는 죽은 코드가 생길 수 있다. 다른 프로젝트 템플릿에서 복사된 뒤 도메인에 맞게 고쳐지지 않은 것으로 보인다. 공통코드 다건 조회 결과를 다룰 때는 이 타입에 의존하지 말고 `fetchCodeList`의 실제 반환값(런타임 키)을 확인한다.

## 5. `features/admin`이 호출하는 6개 엔드포인트가 백엔드에 없음

`admin.query.ts`의 `fetchUserCounts`/`fetchNewUserCount`/`fetchPostCount`/`fetchAdminUsers`/`updateUserRole`/`forceLogout`이 각각 `/api/v1/admin/dashboard/users/counts`, `.../new-counts`, `/api/v1/admin/dashboard/posts/counts`, `/api/v1/admin/users/search`, `PATCH .../role`, `POST .../force-logout`을 호출한다. `motive-server` 저장소의 `kr.co.motive.admin` 패키지에는 `code`·`exercise` 서브패키지만 있고 `dashboard`·`users`는 없다(컨트롤러 실측).
**영향:** `app/admin/dashboard`, `app/admin/users` 화면은 현재 백엔드 없이 프론트만 존재하며 실행하면 API 호출이 실패한다. `PostCountResponse`(게시글 수) 같은 개념도 motive에 게시판 기능이 없어 도메인상 근거가 불명확하다 — 다른 템플릿에서 복사되었을 가능성. 이 두 화면 관련 작업 전 백엔드 구현 계획을 먼저 확인할 것.

## 6. 운영 환경 OAuth 진입 URL 경로 패턴이 개발 환경과 다름

`.env.development`의 `NEXT_PUBLIC_OAUTH_*_URL`은 `/oauth2/authorization/{provider}`(Spring Security 표준 진입점, `motive-server` 실측과 일치)인데, `.env.production`은 `/oauth/{provider}`로 경로 자체가 다르다.
**영향:** 운영 배포본에서 소셜 로그인 버튼이 실제로 동작하는지 별도 확인이 필요하다(백엔드에 `/oauth/{provider}` 별도 라우팅이 있는지 확인되지 않음 — `motive-server` 실측상 커스텀 컨트롤러 없이 Spring Security 표준 진입점만 씀). 새로 프로바이더를 추가/수정할 때 두 env 파일의 경로 패턴을 통일할 것.

## 7. 배포 워크플로우가 실제로 쓰이지 않는 환경변수명을 설정함

`.github/workflows/deploy.yml`의 빌드 스텝이 `env: NEXT_PUBLIC_API_URL: http://146.56.116.158:9090`를 설정하지만, 코드 전체(`util/AxiosUtil.ts` 등)는 `NEXT_PUBLIC_API_BASE_URL`을 참조한다. 이름이 다르므로 이 `env:` 설정은 빌드에 아무 영향을 주지 않고, 실제 값은 `.env.production`에 이미 있는 `NEXT_PUBLIC_API_BASE_URL`이 그대로 쓰인다(현재는 두 값이 우연히 같아 문제가 드러나지 않음).
**영향:** `.env.production`을 갱신하지 않고 workflow의 `NEXT_PUBLIC_API_URL`만 바꾸면 배포 결과물에 반영되지 않는 혼란이 생긴다. 배포 대상 API 서버를 바꿀 때는 `.env.production`을 갱신하는 것이 실제로 유효한 방법이다. workflow의 죽은 `env:` 항목은 정리하거나 이름을 맞추는 것을 검토([`13_deploy_runbook`](../13_deploy_runbook/jobmoa-ui-deploy-runbook.md) 참고).

## 8. `package.json`에 소스에서 전혀 쓰이지 않는 의존성이 있음

grep 실측(`app/`·`components/`·`features/`·`store/`·`util/`·`hooks/`, node_modules 제외) 결과:
* **`jquery`** — 어디에서도 import되지 않음
* **`amqplib`** — Node.js RabbitMQ 클라이언트. 브라우저 프론트엔드가 가질 이유가 없는 의존성이며 미사용
* **`react-slick`**, **`slick-carousel`** — 캐러셀은 실제로 `swiper`(`components/Banner.tsx`)로 구현되어 있어 중복. 미사용

**영향:** 번들에는 포함되지 않지만(사용 안 하므로 트리쉐이킹됨) `npm install` 크기·`package.json` 가독성에 불필요한 부담이 된다. 실제로 필요해서 최근에 추가된 것인지 확인 없이 지우지 말고, 정리가 필요하면 먼저 사용자에게 확인한다.

## 9. 테스트가 전혀 없음

[`06_test_strategy`](../06_test_strategy/jobmoa-ui-test-strategy.md) 참고. 테스트 러너 자체가 설치되어 있지 않고, CI는 빌드 후 바로 배포한다(테스트를 스킵하는 게 아니라 애초에 구성이 없음).

## 10. `app/exercises/exercises.data.ts`의 `Exercise`와 `features/exercise/exercise.type.ts`의 `ExerciseResponse`가 별개 타입으로 중복 정의됨

두 타입 모두 운동 마스터를 나타내지만(id/name/bodyPartCd/equipmentCd 계열 필드 유사) 서로 다른 파일에 독립적으로 선언되어 있고, `store/recordDraftStore.ts`의 `RecordExercise.exercise`는 전자(`Exercise`)를 참조한다.
**영향:** 두 타입이 구조적으로 호환되어 보여도 실제 API 응답(`ExerciseResponse`)과 화면 내부 상태(`Exercise`)를 섞어 쓰면 필드가 어긋날 수 있다. 운동 마스터 관련 필드를 추가/변경할 때 두 타입 모두 갱신이 필요한지 확인할 것.
