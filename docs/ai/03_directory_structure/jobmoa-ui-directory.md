# 디렉토리 구조 상세 (jobmoa-ui Directory)

실측: 루트 `app/`, `features/`, `components/`, `store/`, `hooks/`, `util/`, `styles/` (2026-08-10 기준)

```
jobmoa-ui/
├── app/                              # Next.js App Router — 라우팅 전용, 얇은 page.tsx
│   ├── page.tsx                      # 메인(홈) → LandingPage.tsx
│   ├── LandingPage.tsx
│   ├── WorkoutHomePage.tsx           # 로그인 후 홈
│   ├── layout.tsx, providers.tsx     # 루트 레이아웃 + QueryClientProvider/AuthBootstrap
│   ├── login/
│   │   ├── page.tsx                  # → LoginPage.tsx
│   │   └── LoginPage.tsx
│   ├── onboarding/
│   │   ├── step-1/ ~ step-15/        # 각 page.tsx는 Step{N}Page.tsx를 라우팅만 함
│   │   ├── Step1Page.tsx ~ Step15Page.tsx
│   │   └── components/               # NumberField, OnboardingHeader, SelectOption, YesNoQuestion
│   ├── exercises/
│   │   ├── page.tsx → ExerciseListPage.tsx
│   │   └── exercises.data.ts         # 부위/기구 필터 옵션 (임시 하드코딩, TODO 주석 있음)
│   ├── profile/
│   │   ├── page.tsx → ProfilePage.tsx
│   │   └── record/
│   │       ├── page.tsx → RecordPage.tsx        # 운동기록 목록
│   │       └── [id]/page.tsx → RecordDetailPage.tsx  # 운동기록 상세
│   ├── admin/
│   │   ├── layout.tsx, page.tsx
│   │   ├── dashboard/page.tsx        # 유저/게시글 통계 (features/admin 소비)
│   │   ├── users/page.tsx            # 유저 관리
│   │   ├── code/page.tsx             # 공통코드 CRUD
│   │   ├── exercises/page.tsx        # 운동마스터 CRUD
│   │   └── components/               # AdminAuthGuard, AdminHeader, AdminModal, AdminSidebar
│   ├── components/
│   │   ├── auth/AuthBootstrap.tsx    # 앱 로드 시 1회 /auth/refresh
│   │   ├── layout/                   # Header, Footer, ConditionalLayout, NotificationDropdown
│   │   └── ui/                       # loading/GlobalLoading, modal/BaseModal
│   └── test/page.tsx                 # 임시/실험 페이지로 추정
│
├── features/                         # 도메인별 api.ts / query.ts / type.ts (+ mutation.ts)
│   ├── auth/          # auth.query.ts, auth.type.ts (api 별도 파일 없이 query.ts에서 직접 axios 래퍼 호출)
│   ├── onboarding/     # onboarding.api.ts, onboarding.mutation.ts, onboarding.type.ts
│   ├── workoutRecord/  # workoutRecord.api.ts, .mutation.ts, .query.ts, .type.ts
│   ├── exercise/       # exercise.api.ts, .query.ts, .type.ts
│   ├── code/           # code.api.ts, .query.ts, .type.ts (공통코드)
│   ├── menu/           # menu.query.ts, menu.type.ts, menuLayout.tsx
│   ├── admin/          # admin.query.ts(axios 래퍼 직접 호출), admin.type.ts — api.ts 파일 없음(다른 도메인과 패턴 다름)
│   └── common/types/common.type.ts   # ApiError 등 도메인 공용 타입
│
├── store/              # Zustand 전역 상태
│   ├── alertStore.ts       # 전역 알림(메시지+확인 콜백)
│   ├── confirmStore.ts
│   ├── onboardingStore.ts  # 온보딩 15단계 임시 입력값
│   └── recordDraftStore.ts # 운동기록 작성 중 draft(운동+세트)
│
├── hooks/              # 공용 훅 (useTempKey — 파일 업로드용 UUID)
│
├── components/          # 공용 UI 컴포넌트 — ⚠️ 최상위와 components/ui/ 두 세트가 공존
│   ├── Button.tsx, Input.tsx, ...    # 구 세트 — 색상 하드코딩(#2F80FF 등)
│   └── ui/
│       ├── Button.tsx, Input.tsx     # 신 세트 — styles/globals.css의 @theme 토큰(bg-motive 등) 사용
│       └── Badge.tsx, FilterChip.tsx, MainSkeleton.tsx, Pagination.tsx
│   (신·구 세트의 공존은 우연이 아니라 마이그레이션 중인 것으로 보임 — 신규 화면은 components/ui/를 우선 사용, 상세는 12_known_issues 참고)
│
├── util/                # 공통 유틸
│   ├── AxiosUtil.ts    # get/post/put/patch/deleteData/postForm + accessToken 메모리 관리
│   ├── DateUtil.ts     # yyyyMMdd 포맷 변환, D-day 계산
│   ├── FileUtil.ts     # toMultipart (JSON+파일 멀티파트 구성)
│   ├── CommonUtil.ts   # codeToSelectOption 등
│   ├── cn.ts           # clsx + tailwind-merge
│   └── router.ts
│
└── styles/
    ├── globals.css      # Tailwind @theme 토큰(--color-motive, --color-ink-*)
    └── editor.css       # Tiptap 에디터 전용 스타일
```

## 계층 관례

* **라우트(`app/**/page.tsx`)는 얇게 유지한다** — 실제 화면 로직은 같은 디렉토리의 PascalCase 컴포넌트(`Step1Page.tsx`, `LoginPage.tsx`, `RecordPage.tsx` 등)에 있고, `page.tsx`는 그 컴포넌트를 라우팅 파라미터·네비게이션 콜백과 함께 렌더링만 한다(`app/onboarding/step-1/page.tsx` 실측).
* **도메인 로직은 `features/<domain>/`로 분리한다.** 화면 컴포넌트가 axios를 직접 호출하지 않고 `*.query.ts`(조회)/`*.mutation.ts`(변경) 훅을 통해서만 접근한다.
* **`features/admin`은 다른 도메인과 패턴이 다르다** — 별도 `admin.api.ts` 없이 `admin.query.ts`가 `get/post/patch`를 직접 호출한다. 새 admin 하위 기능을 추가할 때 이 패턴을 따를지, 다른 도메인처럼 `api.ts`로 분리할지는 작업 전 확인이 필요하다(강제하지 않음).
* **JPA/MyBatis 같은 서버 영속 계층은 이 저장소에 없다** — 클라이언트 상태는 TanStack Query(서버 데이터 캐시) + Zustand(순수 클라이언트 상태) 두 갈래로만 나뉜다.

## 리소스 매핑

```
public/                # 정적 자산 (favicon 등, app/favicon.ico는 App Router 규약)
.env.development        # 로컬 환경변수
.env.production          # 운영 환경변수 (배포 워크플로우와 변수명 불일치 있음 — 13_deploy_runbook 참고)
.github/workflows/deploy.yml
```
