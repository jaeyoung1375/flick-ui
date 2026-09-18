# 디렉토리 구조 상세 (flick-ui Directory)

실측: 루트 `app/`, `features/`, `components/`, `store/`, `hooks/`, `util/`, `styles/` (2026-09-16 기준, 운동 기록/온보딩 도메인 삭제 완료 후 working tree)

```
motive-ui/ (=flick-ui)
├── app/                              # Next.js App Router — 라우팅 전용, 얇은 page.tsx
│   ├── page.tsx                      # 메인(홈) → HomePage.tsx
│   ├── HomePage.tsx                  # OTT 홈 화면 목업(Figma "FLOW" 시안) — Nav+Hero+장르별 행 조합, 서버 컴포넌트
│   ├── layout.tsx, providers.tsx     # 루트 레이아웃(Motive 브랜딩·폰트 제거됨, globals.css는 재도입) + QueryClientProvider
│   ├── login/
│   │   ├── page.tsx                  # → LoginPage.tsx
│   │   └── LoginPage.tsx
│   ├── admin/
│   │   ├── layout.tsx, page.tsx
│   │   ├── dashboard/page.tsx        # 유저/게시글 통계 (features/admin 소비) — ⚠️ 대응 백엔드 엔드포인트 미확인
│   │   ├── users/page.tsx            # 유저 관리 — ⚠️ 대응 백엔드 엔드포인트 미확인
│   │   ├── code/page.tsx             # 공통코드 CRUD
│   │   ├── exercises/page.tsx        # 운동마스터 CRUD — ⚠️ OTT 도메인과 무관한 레거시 잔존 코드(곧 정리 예정). 삭제된 `features/exercise`·`app/onboarding`을 여전히 import해 현재 빌드가 깨진다
│   │   └── components/               # AdminAuthGuard, AdminHeader, AdminModal, AdminSidebar
│   ├── components/
│   │   ├── auth/AuthBootstrap.tsx    # 앱 로드 시 1회 /auth/refresh
│   │   ├── home/                     # HomeNav, HomeHero, ContentRow, ContentCard — 홈 화면 전용 프레젠테이셔널 컴포넌트
│   │   ├── layout/                   # Header, Footer, ConditionalLayout, NotificationDropdown
│   │   └── ui/                       # loading/GlobalLoading, modal/BaseModal
│   └── test/page.tsx                 # 임시/실험 페이지로 추정
│
├── features/                         # 도메인별 api.ts / query.ts / type.ts (+ mutation.ts)
│   ├── auth/          # auth.query.ts, auth.type.ts (api 별도 파일 없이 query.ts에서 직접 axios 래퍼 호출)
│   ├── code/           # code.api.ts, .query.ts, .type.ts (공통코드)
│   ├── content/         # content.type.ts, content.mock.ts — ⚠️ 목업뿐, api.ts/query.ts 없음(백엔드 콘텐츠 API 없음)
│   ├── menu/           # menu.query.ts, menu.type.ts, menuLayout.tsx
│   ├── admin/          # admin.query.ts(axios 래퍼 직접 호출), admin.type.ts — api.ts 파일 없음(다른 도메인과 패턴 다름)
│   └── common/types/common.type.ts   # ApiError 등 도메인 공용 타입
│
│   (2026-09-16 삭제됨: features/{onboarding, workoutRecord, exercise} — 운동 기록 도메인 전체)
│
├── store/              # Zustand 전역 상태
│   ├── alertStore.ts       # 전역 알림(메시지+확인 콜백)
│   └── confirmStore.ts     # 확인/취소 2버튼 모달
│   (2026-09-16 삭제됨: onboardingStore.ts, recordDraftStore.ts)
│
├── hooks/              # 공용 훅 (useTempKey — 파일 업로드용 UUID)
│
├── components/          # 공용 UI 컴포넌트 — ⚠️ 최상위와 components/ui/ 두 세트가 공존(미해결, 12_known_issues 참고)
│   ├── Alert.tsx, Banner.tsx, BirthDatePicker.tsx, BottomNav.tsx, Button.tsx, Card.tsx,
│   │   ConfirmModal.tsx, DropButton.tsx, Dropdown.tsx, Editor.tsx, Input.tsx, Label.tsx,
│   │   MotiveDatePicker.tsx, MultiSelectBox.tsx, SelectBox.tsx   # 구 세트
│   └── ui/
│       ├── Button.tsx, Input.tsx     # 신 세트 — styles/globals.css의 @theme 토큰(bg-motive 등) 사용
│       └── Badge.tsx, FilterChip.tsx, MainSkeleton.tsx, Pagination.tsx
│
├── util/                # 공통 유틸
│   ├── AxiosUtil.ts    # get/post/put/patch/deleteData/postForm + accessToken 메모리 관리
│   ├── DateUtil.ts     # yyyyMMdd 포맷 변환, D-day 계산
│   ├── FileUtil.ts     # toMultipart (JSON+파일 멀티파트 구성)
│   ├── CommonUtil.ts   # codeToSelectOption 등
│   ├── cn.ts           # clsx + tailwind-merge
│   └── router.ts (+ router.md 메모)
│
└── styles/
    ├── globals.css      # Tailwind @theme 토큰(--color-motive, --color-ink-*)
    └── editor.css       # Tiptap 에디터 전용 스타일
```

## 계층 관례

* **라우트(`app/**/page.tsx`)는 얇게 유지한다** — 실제 화면 로직은 같은 디렉토리의 PascalCase 컴포넌트(`LoginPage.tsx` 등)에 있고, `page.tsx`는 그 컴포넌트를 라우팅 파라미터·네비게이션 콜백과 함께 렌더링만 한다.
* **도메인 로직은 `features/<domain>/`로 분리한다.** 화면 컴포넌트가 axios를 직접 호출하지 않고 `*.query.ts`(조회)/`*.mutation.ts`(변경) 훅을 통해서만 접근한다.
* **`features/admin`은 다른 도메인과 패턴이 다르다** — 별도 `admin.api.ts` 없이 `admin.query.ts`가 `get/post/patch`를 직접 호출한다. 새 admin 하위 기능을 추가할 때 이 패턴을 따를지, 다른 도메인처럼 `api.ts`로 분리할지는 작업 전 확인이 필요하다(강제하지 않음).
* **JPA/MyBatis 같은 서버 영속 계층은 이 저장소에 없다** — 클라이언트 상태는 TanStack Query(서버 데이터 캐시) + Zustand(순수 클라이언트 상태) 두 갈래로만 나뉜다.
* **`features/content`는 현재 목업 전용이다** — `content.type.ts` + `content.mock.ts`만 있고 `api.ts`/`query.ts`는 없다(백엔드 콘텐츠 API가 아직 없음). 실제 API가 생기면 다른 도메인과 같은 패턴(api.ts + query.ts + type.ts)으로 확장하고, 그 전에는 엔드포인트가 실제로 존재하는지 `flick-server`의 `09_api_contract`로 먼저 확인한다.

## 리소스 매핑

```
public/                # 정적 자산 (favicon 등, app/favicon.ico는 App Router 규약)
.env.development        # 로컬 환경변수
.env.production          # 운영 환경변수 (배포 워크플로우와 변수명 불일치 있음 — 13_deploy_runbook 참고)
.github/workflows/deploy.yml
```
