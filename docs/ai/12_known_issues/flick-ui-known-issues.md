# 알려진 이슈·함정 상세 (flick-ui Known Issues)

실제 코드 실측 기반(2026-09-16). 확인되지 않은 추측은 적지 않았다.

## 0. (가장 중요) OTT 도메인은 홈 화면 목업뿐 — 실제 콘텐츠 API·온보딩 연동은 없음

flick-ui는 넷플릭스·티빙류의 스트리밍(OTT) 서비스로 기획됐으나(2026-09-16, [`01_project_overview/guide.md`](../01_project_overview/guide.md)), 개인 운동 기록 서비스 `motive-ui` → 채용정보 서비스 `jobmoa-ui` 두 번의 이전 정체성을 거치며 남은 코드를 그대로 물려받았다. 2026-09-16 운동 기록 도메인(온보딩·운동기록 CRUD·운동 목록)을 대량 삭제하고, 같은 날 **OTT 메인 홈 화면 목업**(`app/HomePage.tsx`, `features/content/content.mock.ts`)을 새로 구현했다. **단 이건 하드코딩 목업이다** — 백엔드(`flick-server`)에 콘텐츠 API가 아직 없어 `features/content/api.ts`/`query.ts`가 없고, 온보딩(장르 선택)도 없어 행 구성이 고정돼 있다.
**영향:** 홈 화면의 시각적 틀(Nav/Hero/Row 컴포넌트 구조)은 참고할 수 있지만, 실제 콘텐츠 연동·온보딩·재생 등을 만들 때는 `content.mock.ts`를 실제 API 연동으로 교체하는 작업부터 다시 필요하다. 백엔드 로드맵(`flick-server`의 `flick-server-streaming-roadmap.md`)이 설계 제안 단계로 존재하니 먼저 확인할 것.

## 1. `app/admin/exercises/page.tsx`가 삭제된 모듈을 import해 컴파일이 깨짐

2026-09-16 운동 기록 도메인 정리에서 `features/exercise/**`와 `app/onboarding/**`가 전부 삭제됐는데, `app/admin/exercises/page.tsx`만 정리 대상에서 빠진 채 남아있다. 이 파일은 여전히 `@/features/exercise/exercise.query`, `@/features/exercise/exercise.type`, `@/app/onboarding/components/SelectOption`을 import한다 — 셋 다 디스크에 존재하지 않는다(실측: `find`로 부재 확인).
**영향:** 이 화면을 렌더링하는 경로(`/admin/exercises`)는 물론 `npm run build`/`npm run dev` 전체가 이 파일 때문에 실패할 수 있다. OTT 도메인 작업을 시작하기 전에 이 파일을 삭제하거나 import를 고쳐야 한다 — 다른 작업의 참고 패턴으로 쓰지 말 것. [`06_domain_playbooks/admin-code.md`](../06_domain_playbooks/admin-code.md) §3 참고.

## 2. `RefreshResponse.onboardingCompleted`가 백엔드에 없는 죽은 필드

`features/auth/auth.type.ts`의 `RefreshResponse`는 여전히 `onboardingCompleted: boolean`을 선언하지만, 백엔드 `flick-server`는 2026-09-09 `TokenResponseDto`에서 이 필드를 완전히 제거했다(운동 기록 도메인 삭제와 함께). 프론트 코드 어디에서도 현재 이 필드를 읽지 않는다(과거 `app/page.tsx`의 랜딩/홈 분기 로직도 삭제됨).
**영향:** 당장 런타임 에러는 없지만(어차피 안 읽으므로), 이 필드를 신뢰해 새 로그인 후 분기 로직을 짜면 백엔드 응답에 실제로 없는 값을 참조하게 된다. 새로 진입 분기를 설계할 때는 이 필드를 되살리지 말고 백엔드에 필요한 값을 먼저 요청할 것.

## 3. `.env.development`의 API 베이스와 OAuth URL 포트 불일치

`NEXT_PUBLIC_API_BASE_URL=http://localhost:9999`인데 `NEXT_PUBLIC_OAUTH_{GOOGLE,KAKAO,GITHUB}_URL`은 전부 `http://localhost:9090/oauth2/authorization/{provider}`를 가리킨다. `flick-server`의 로컬 실행 포트는 9090(`CLAUDE.md` 실측)이므로, 9999는 별도 프록시이거나 실수로 바뀐 값일 가능성이 있다(확인 안 됨).
**영향:** 로컬에서 API 호출은 9999로, 소셜 로그인 진입은 9090으로 나가 두 값이 실제로 같은 백엔드를 가리키는지 확인이 필요하다. 새로 로컬 개발 환경을 세팅하거나 이 파일을 수정하기 전에 먼저 실제 의도를 확인할 것.

## 4. 메뉴 조회 API 호출에 `/api/v1` 프리픽스가 빠져 있음 — 실행 시 404 가능성

`features/menu/menu.query.ts`의 `fetchMenuList`가 `get<Menu[]>("/public/menus")`를 호출한다. `util/AxiosUtil.ts`의 `baseURL`은 호스트만 담당하고(`NEXT_PUBLIC_API_BASE_URL`), 나머지 모든 도메인 파일(`auth`, `code`, `admin`)은 예외 없이 경로 문자열에 `/api/v1`을 리터럴로 포함한다. `menu.query.ts`만 이 프리픽스가 빠져 있어 실제 요청이 `{API_BASE_URL}/public/menus`로 나가지만, 백엔드 실제 경로는 `{API_BASE_URL}/api/v1/public/menus`다(`WebConfig`가 `/api/v1`을 자동 부여).
**영향:** 메뉴를 사용하는 화면(`features/menu/menuLayout.tsx`)에서 조회가 항상 실패할 가능성이 높다. 메뉴 관련 작업 시 가장 먼저 확인할 지점.

## 5. `AdminAuthGuard`가 실제로는 아무 것도 막지 않음

`app/admin/components/AdminAuthGuard.tsx`는 `useRouter()`를 호출만 하고 실제로는 사용하지 않으며(`router` 변수 미사용), 인증 상태를 확인하는 로직 없이 `children`을 무조건 렌더링한다. 컴포넌트 상단 주석은 "로그인 상태가 확인되지 않으면 홈으로 리다이렉트"라고 적혀 있지만 구현이 비어 있다.
**영향:** 현재 `/admin/**` 경로는 프론트에서 접근을 전혀 제한하지 않는다. 백엔드도 role 기반 인가가 없으므로(`flick-server` `12_known_issues`), 관리자 화면은 프론트·백엔드 양쪽에서 사실상 로그인 여부와 무관하게 열려 있다(로그인조차 안 해도 화면 자체는 렌더링됨 — API 호출만 401이 날 수 있음). 관리자 화면을 실사용자에게 노출하기 전 반드시 구현해야 한다.

## 6. `components/`(최상위)와 `components/ui/`에 중복 컴포넌트가 공존 — 색상 체계는 ✅ 해결됨(2026-09-10, 블루로 확정)

`Button.tsx`, `Input.tsx` 등이 최상위 `components/`와 `components/ui/` 양쪽에 존재한다(구조적 중복은 미해결). 색상 값 자체는 사용자가 `CLAUDE.md`의 블루 컨셉을 정본으로 확정해 `styles/globals.css`의 `--color-motive*` 스케일(토큰 이름은 유지, 값만 교체)을 `#2F80FF` 기준 블루로 교체했다 — `motive`(=500) `#2f80ff`, `motive-50` `#f4f8ff`, `motive-100`/`motive-light` `#e4eeff`, `motive-soft` `#edf4ff`, `motive-hover`(=600) `#2971e0`, `motive-pressed`(=700) `#2564c7`. 부수적으로 `components/ui/MainSkeleton.tsx`에 남아있던 하드코딩 오렌지도 `motive-50` 토큰 참조로 교체했다.
**영향:** 색상은 더 이상 문제가 아니지만, 두 컴포넌트 세트가 공존하는 구조는 그대로다. 신규 공용 컴포넌트는 `components/ui/`에 만든다(§04_coding_standards 참고).

## 7. `features/code/code.type.ts`의 `codeList` 타입이 flick 도메인과 무관한 필드로 채워짐

`codeList` 타입의 필드가 `RECRUIT_TYPE_CD`, `PROGRESS_TYPE_CD`, `TECH_STACK`, `RECRUIT_POSIT_TYPE_CD`, `CONTACT_METHOD_CD`로, jobmoa-ui 시절 채용/구인 도메인 용어다. flick(OTT) 도메인과는 당연히 무관하고, 그 이전 motive(운동 기록) 도메인과도 무관했다.
**영향:** 이 타입을 그대로 신뢰해 필드를 참조하면 타입 에러가 나거나, 존재하지 않는 필드를 참조하는 죽은 코드가 생길 수 있다. 공통코드 다건 조회 결과를 다룰 때는 이 타입에 의존하지 말고 `fetchCodeList`의 실제 반환값(런타임 키)을 확인한다. OTT 도메인에서 장르 등 코드값이 필요해지면 이 타입을 전면 재정의해야 한다.

## 8. `features/admin`이 호출하는 6개 엔드포인트가 `flick-server` API 계약 문서에 없음

`admin.query.ts`의 `fetchUserCounts`/`fetchNewUserCount`/`fetchPostCount`/`fetchAdminUsers`/`updateUserRole`/`forceLogout`이 각각 `/api/v1/admin/dashboard/users/counts`, `.../new-counts`, `/api/v1/admin/dashboard/posts/counts`, `/api/v1/admin/users/search`, `PATCH .../role`, `POST .../force-logout`을 호출한다. `flick-server`의 `docs/ai/09_api_contract`에는 이 엔드포인트들이 없다 — 다만 `flick-server`의 `CLAUDE.md` 패키지 구조에는 `admin/{dashboard,log,mapper,user}`가 나열돼 있어, 스캐폴딩만 있고 API 문서화가 안 된 것인지 실제 미구현인지는 확실치 않다(추측 금지, 백엔드 쪽 확인 필요).
**영향:** 확인 전까지는 `app/admin/dashboard`, `app/admin/users` 화면이 실행 시 실패할 수 있다고 가정한다. 이 두 화면을 다루는 작업 전 반드시 백엔드 구현 여부를 먼저 확인할 것.

## 9. 운영 환경 OAuth 진입 URL 경로 패턴이 개발 환경과 다름

`.env.development`의 `NEXT_PUBLIC_OAUTH_*_URL`은 `/oauth2/authorization/{provider}`(Spring Security 표준 진입점)인데, `.env.production`은 `/oauth/{provider}`로 경로 자체가 다르다.
**영향:** 운영 배포본에서 소셜 로그인 버튼이 실제로 동작하는지 별도 확인이 필요하다. 새로 프로바이더를 추가/수정할 때 두 env 파일의 경로 패턴을 통일할 것.

## 10. 배포 워크플로우가 실제로 쓰이지 않는 환경변수명을 설정함

`.github/workflows/deploy.yml`의 빌드 스텝이 `env: NEXT_PUBLIC_API_URL: http://146.56.116.158:9090`를 설정하지만, 코드 전체(`util/AxiosUtil.ts` 등)는 `NEXT_PUBLIC_API_BASE_URL`을 참조한다. 이름이 다르므로 이 `env:` 설정은 빌드에 아무 영향을 주지 않고, 실제 값은 `.env.production`에 이미 있는 `NEXT_PUBLIC_API_BASE_URL`이 그대로 쓰인다(현재는 두 값이 우연히 같아 문제가 드러나지 않음).
**영향:** `.env.production`을 갱신하지 않고 workflow의 `NEXT_PUBLIC_API_URL`만 바꾸면 배포 결과물에 반영되지 않는 혼란이 생긴다. 배포 대상 API 서버를 바꿀 때는 `.env.production`을 갱신하는 것이 실제로 유효한 방법이다([`13_deploy_runbook`](../13_deploy_runbook/flick-ui-deploy-runbook.md) 참고).

## 11. `package.json`에 소스에서 전혀 쓰이지 않는 의존성이 있음

grep 실측(`app/`·`components/`·`features/`·`store/`·`util/`·`hooks/`, node_modules 제외) 결과:
* **`jquery`** — 어디에서도 import되지 않음
* **`amqplib`** — Node.js RabbitMQ 클라이언트. 브라우저 프론트엔드가 가질 이유가 없는 의존성이며 미사용
* **`react-slick`**, **`slick-carousel`** — 캐러셀은 실제로 `swiper`(`components/Banner.tsx`)로 구현되어 있어 중복. 미사용

**영향:** 번들에는 포함되지 않지만(사용 안 하므로 트리쉐이킹됨) `npm install` 크기·`package.json` 가독성에 불필요한 부담이 된다. 실제로 필요해서 최근에 추가된 것인지 확인 없이 지우지 말고, 정리가 필요하면 먼저 사용자에게 확인한다.

## 12. 테스트가 전혀 없음

[`06_test_strategy`](../06_test_strategy/flick-ui-test-strategy.md) 참고. 테스트 러너 자체가 설치되어 있지 않고, CI는 빌드 후 바로 배포한다(테스트를 스킵하는 게 아니라 애초에 구성이 없음).

## 13. 저장소·패키지명이 서비스 정체성과 어긋남

로컬 디렉터리·git 저장소명은 `motive-ui`, `package.json`의 `name`은 `jobmoa-ui`로, 둘 다 현재 서비스 정체성(`flick-ui`, OTT)과 다르다. `docs/ai/` 문서 파일명·내용은 `flick-ui` 기준으로 통일했지만 실제 저장소·패키지명은 의도적으로 변경하지 않았다(백엔드 `flick-server`도 저장소명을 유지하는 동일한 방침).
**영향:** `npm run build` 산출물이나 `package-lock.json` 등에서 `jobmoa-ui`라는 이름이 노출될 수 있다. 저장소·패키지명을 실제로 바꿀지는 별도 논의·작업이 필요하며, 이번 문서 갱신 범위 밖이다.
