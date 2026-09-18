# 기술 스택 상세 (flick-ui Tech Stack)

실측 근거: `package.json`, `tsconfig.json`, `eslint.config.mjs`, `next.config.js`, `postcss.config.mjs` (2026-09-16 기준)

## 1. 프레임워크·언어

* **Next.js 16.1.6** (App Router, `app/` 디렉토리)
* **React 19.2.3** / **React DOM 19.2.3**
* **TypeScript 5** — `strict: true`, `moduleResolution: bundler`, path alias `@/*`(루트) · `@/styles`·`@/util`·`@/components`·`@/hooks`·`@/features`·`@/store`

## 2. 상태 관리

* **Zustand 5.0.12** — 로그인이 아닌 전역 상태(`store/`: `alertStore`, `confirmStore`뿐 — 온보딩·운동기록 드래프트 스토어는 도메인 삭제와 함께 제거됨)
* **TanStack Query 5.90.21** + **devtools 5.91.3** — 서버 상태(API 데이터) 캐싱·재요청. `app/providers.tsx`에서 `QueryClientProvider`로 앱 전체를 감쌈
* **react-hook-form 7.71.2** — 폼 상태·검증

## 3. 스타일

* **Tailwind CSS 4.2.1** + `@tailwindcss/postcss` — `postcss.config.mjs`에 플러그인 등록, `styles/globals.css`의 `@theme`에서 `--color-motive`(토큰 이름은 유지, 값은 `#2f80ff` 블루 계열) · `--color-ink-*` 토큰 정의
* `CLAUDE.md`의 디자인 컨셉("포인트 블루 `#2F80FF`")과 `styles/globals.css`의 실제 테마 토큰 값이 일치한다(과거 오렌지 값이었던 것을 블루로 교체 완료 — [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고).
* **@tailwindcss/typography** — 에디터(Tiptap) 콘텐츠 렌더링용
* **clsx 2.1.1** + **tailwind-merge 3.5.0** — `util/cn.ts`의 클래스 병합 유틸

## 4. HTTP·API 연동

* **Axios 1.13.5** — `util/AxiosUtil.ts`가 `axios.create`로 만든 단일 인스턴스를 래핑(`get/post/put/patch/deleteData/postForm`). `withCredentials: true`로 refreshToken 쿠키 자동 첨부, `timeout: 5000`
* accessToken은 모듈 스코프 변수(`setAccessToken`/`getAccessToken`)로만 관리 — 별도 상태관리 라이브러리에 넣지 않음

## 5. 에디터·업로드

* **Tiptap 3.20** (`@tiptap/react`, `starter-kit`, `extension-image`, `extension-placeholder`) — `components/Editor.tsx`
* 이미지 업로드는 `hooks/useTempKey.ts`(uuid 기반 tempKey) + `util/FileUtil.ts`(`toMultipart`)로 멀티파트 구성 후 백엔드 파일 업로드 API 호출

## 6. UI 컴포넌트·기타 라이브러리

* **@radix-ui/react-popover**, **@radix-ui/react-select** — 접근성 있는 프리미티브
* **lucide-react** — 아이콘
* **date-fns**, **react-datepicker** — 날짜 처리/선택 UI
* **swiper 12.1.3** — `components/Banner.tsx`의 실제 캐러셀 구현체
* **crypto-js**, **uuid** — 해시/UUID

## 7. package.json에 있으나 소스에서 미사용 확인된 의존성

grep 실측 결과 `app/`·`components/`·`features/`·`store/`·`util/`·`hooks/`(node_modules 제외) 어디에서도 import되지 않음:

* **jquery** — 사용처 없음
* **amqplib** — Node.js RabbitMQ 클라이언트. 브라우저 프론트엔드에 존재할 이유가 없는 의존성
* **react-slick**, **slick-carousel** — 캐러셀은 `swiper`로 구현되어 있어 중복. `Banner.tsx`가 swiper를 씀

새 캐러셀·jQuery 필요 작업을 시작하기 전에 이미 설치된 이 의존성들을 재사용할 수 있다고 가정하지 말 것 — 실제 사용 여부를 다시 확인한다. 상세는 [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고.

## 8. 빌드·배포

* Next.js 표준 빌드(`npm run build`), 배포는 GitHub Actions(`workflow_dispatch`) → `appleboy/scp-action`으로 서버 전송 → `pm2 start npm --name next-app -- start`. 상세는 [`13_deploy_runbook`](../13_deploy_runbook/flick-ui-deploy-runbook.md).

## 9. 설정 파일 구조

| 파일 | 역할 |
|------|------|
| `.env.development` | 로컬 개발 — API 베이스 `localhost:9999`, OAuth 진입점 URL 3종(카카오/구글/깃허브, `/oauth2/authorization/{provider}`, `localhost:9090`). **API 베이스와 OAuth URL의 포트가 다르다**([`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고) |
| `.env.production` | 운영 — API 베이스 `146.56.116.158:9090`, OAuth URL이 `/oauth/{provider}` 형태로 개발 환경과 경로 패턴이 다름([`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고) |
| `next.config.js` | 이미지 원격 패턴 허용(`cdn.jsdelivr.net`, `skillicons.dev`) |
| `eslint.config.mjs` | `eslint-config-next`의 core-web-vitals + typescript 규칙 |

## 10. A-RMS(루트 워크스페이스)와의 차이 — 혼동 주의

이 저장소는 루트 `Java-Service-Tree-Framework`의 A-RMS Frontend(vanilla JS·jQuery·Bootstrap 서버렌더링/멀티페이지)와 **완전히 다른 스택**이다. React/Next.js App Router, TanStack Query, Zustand는 이 저장소 고유이며 A-RMS 프론트엔드에는 없다.
