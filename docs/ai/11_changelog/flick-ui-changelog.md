# 변경 이력 (flick-ui Changelog)

형식: `YYYY-MM-DD — 변경 내용 (근거: 커밋/작업)`

- 2026-08-10 — `docs/ai/` 하네스 문서 체계를 motive-ui(Next.js 프론트엔드) 기준으로 전면 재작성 (기존에 `motive-server`에서 그대로 복사되어 있던 백엔드용 문서를 실제 프론트엔드 소스 실측 기준 01~13으로 교체). 코드 변경은 없음(문서만).

## 참고: git 커밋 이력 요약 (2026-08-10 기준, `git log --oneline`)

- `ef31f4a` 프로필 - 운동기록 화면 추가
- `5f932ef` 관리자 - 운동관리 메뉴 추가
- `8fa40eb` 불필요 파일 제거
- `81e4840` 온보딩 프로필 이미지 추가 및 운동목록조회(하드코딩)
- `7e0fc13` 불필요한 파일 제거
- `43f768c` 최초 커밋

> 이후 변경부터는 이 문서에 직접 append한다. git log 재요약을 여기 반복하지 않는다(git이 정본).

## jobmoa-ui 개명 이후

- 2026-09-09 — 프로젝트명을 `motive-ui`에서 `jobmoa-ui`로 변경(폴더 rename, git remote는 유지). 백엔드 `motive-server`가 앞서 `jobmoa-server`로 개명된 것에 맞춰 프론트엔드도 채용정보 통합(잡 어그리게이터) 서비스로 전환. `docs/ai` 하네스 갱신: `01_project_overview/guide.md`에 목적 기재, `jobmoa-ui-overview.md`·`harness_engineering.md`에 "현재 코드는 motive-ui 레거시이며 채용정보 도메인 미구현" 경고 추가, `12_known_issues`에 도메인 불일치를 0번 이슈로 등록, `docs/ai/**/motive-ui-*.md` 파일명을 `jobmoa-ui-*.md`로 일괄 변경. 채용정보 도메인 자체는 아직 설계·구현 전(이번 범위 아님). 코드 변경 없음(문서·설정만).
- 2026-09-10 — 디자인 톤을 `CLAUDE.md`의 블루 컨셉(`#2F80FF`)으로 확정하고 `styles/globals.css`의 `--color-motive*` 토큰 값을 오렌지에서 블루로 교체(토큰 이름은 유지). `components/ui/MainSkeleton.tsx`, `app/jobs/JobListPage.tsx`에 남아있던 하드코딩 오렌지 `#FFF8F0`를 `motive-50` 토큰 참조로 교체. `12_known_issues` 3번을 해결됨으로 갱신. `npm run dev`로 `/`, `/jobs` 컴파일 CSS를 확인해 `--color-motive*` 변수가 블루로 반영됨을 검증.

## flick-ui 정체성 확정 이후

- 2026-09-16 — 서비스 정체성을 **스트리밍(OTT) 프론트엔드**로 최종 확정(백엔드 `flick-server`는 2026-09-13에 먼저 확정). working tree에서 이전 정체성(motive-ui 운동기록 / jobmoa-ui 채용정보 시도)의 화면·상태를 대량 삭제: `app/{LandingPage,WorkoutHomePage}.tsx`, `app/onboarding/**`(15단계 전체), `app/exercises/**`(공개 목록), `app/profile/**`(운동기록 CRUD), 대응 `features/{onboarding,workoutRecord,exercise}`, `store/{onboardingStore,recordDraftStore}`. `app/page.tsx`를 빈 스텁으로, `app/layout.tsx`를 Motive 브랜딩(메타데이터·Geist 폰트) 제거된 형태로 단순화. `.env.development`의 `NEXT_PUBLIC_API_BASE_URL`을 `9090`→`9999`로 변경(OAuth URL은 `9090` 유지, 포트 불일치 — 미해결).
  - **예외:** `app/admin/exercises/page.tsx`(운동마스터 관리자 CRUD)는 정리 대상에서 빠진 채 남았고, 같은 시점에 서버사이드 페이징(`pageNum`/`pageSize`)·부위/기구 필터가 오히려 추가됐다. 삭제된 `features/exercise`·`app/onboarding/components/SelectOption`을 여전히 import하므로 **현재 컴파일이 깨진 상태**(레거시, 곧 정리 예정).
  - 문서 갱신: `docs/ai/**`의 `jobmoa-ui-*.md` 파일명을 전부 `flick-ui-*.md`로 rename, `harness_engineering.md`·`01_project_overview`·`03_directory_structure`·`08_domain_glossary`·`09_api_contract`·`10_data_model`·`06_domain_playbooks/{guide,auth,admin-code}`·`05_prompt_templates/guide.md`를 flick(OTT) 정체성 기준으로 재작성. `06_domain_playbooks/workout.md`(온보딩+운동기록 플레이북) 삭제 — 대응 코드 없음. `12_known_issues`에 도메인 불일치(#0)·`app/admin/exercises` 컴파일 깨짐·`onboardingCompleted` 죽은 필드·API 베이스/OAuth 포트 불일치를 신규/갱신 등록.
  - 검증: 문서 갱신 위주 작업. `app/admin/exercises`가 이미 컴파일이 깨진 상태였음을 실측(grep)으로 확인 — 이번 문서 작업으로 인한 신규 손상 아님. `npm run build` 등 실제 빌드 검증은 수행하지 않음(코드 변경 없이 문서만 갱신) — 사용자가 코드 정리를 진행할 때 별도 검증 필요.
- 2026-09-16 — OTT 메인 홈 화면 목업 구현(Figma 시안 4 "FLOW" 기준 — 부유형 캡슐 네비, 라운드 히어로 카드 + 인셋 "다음 추천" 패널, 장르별 넷플릭스식 랜드스케이프 카드 행). `app/page.tsx`의 빈 스텁을 `HomePage` 렌더로 교체.
  - 신규: `app/HomePage.tsx`, `app/components/home/{HomeNav,HomeHero,ContentRow,ContentCard}.tsx`, `features/content/{content.type,content.mock}.ts`(백엔드 콘텐츠 API가 아직 없어 목업 데이터만 — `content.api.ts`/`content.query.ts`는 미생성).
  - `styles/globals.css`에 OTT 다크 테마 전용 토큰 추가(`--color-ott-{bg,surface,accent,accent-dark,amber,text-muted}`) — 기존 `--color-motive-*`(블루, 관리자/기타 화면용)는 건드리지 않음.
  - **버그 수정:** `app/layout.tsx`에 `import "@/styles/globals.css"`가 누락돼 있어 전체 앱에 Tailwind가 전혀 적용되지 않고 있었다(9/16 정리 작업 중 폰트/메타데이터와 함께 실수로 같이 삭제된 것으로 보임) — 되살림. 이 목업 작업 중 브라우저 확인으로 발견.
  - 온보딩(장르 선택) 연동은 이번 범위 아님 — 행 구성은 현재 하드코딩. 방향은 [[project_flick_ui_home_design]] 참고(claude 세션 메모리, 저장소 파일 아님).
  - 검증: `npx tsc --noEmit`·`npx eslint`(신규/수정 파일 대상) 통과. `npm run dev` 기동 후 브라우저로 `/` 렌더링 확인(스크린샷 확인, 히어로·3개 장르 행 정상 표시).
- 2026-09-16 — 관리자 "작품 관리"(콘텐츠 CRUD) 화면 신규(`app/admin/contents/page.tsx`). 목업 데이터 기준 등록/수정/삭제(로컬 state) 구현 — **useQuery/useMutation 연동은 사용자가 직접 작업 예정, 이번 범위 아님**(`content.api.ts`/`content.query.ts`/`content.mutation.ts` 미생성).
  - 필드: 작품 타이틀, 포스터 이미지(로컬 미리보기만, 업로드 API 없음), 개봉일자, 연령 등급(전체/12/15/19), 구분(영화/시리즈) — `features/content/content.type.ts`에 `AdminContentItem`/`AdminContentFormValues` 추가, `content.mock.ts`에 `adminContentItems` 목업 4건 추가.
  - `app/admin/components/AdminSidebar.tsx`에 "작품 관리" 메뉴 추가.
  - 기존 `app/admin/code/page.tsx` 패턴(AdminModal + react-hook-form + alertStore/confirmStore)을 그대로 따름.
  - 검증: `tsc --noEmit`·`eslint` 통과(경고 1건 — react-hook-form `watch()`의 React Compiler 메모이제이션 스킵, 정상). 브라우저로 `/admin/contents` 접속해 등록 모달 렌더링, 수정(제출→목록 반영→alert), 삭제 확인 다이얼로그(취소로 종료, 실제 삭제는 미실행) 확인.
