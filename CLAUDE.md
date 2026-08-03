# motive-ui

헬스 루틴 및 헬스 정보를 공유하는 서비스 **Motive**의 모바일웹 Next.js 프론트엔드.

## 디자인 컨셉 (앞으로의 기본값)

> 이후 디자인 요청은 별다른 언급이 없는 한 이 컨셉을 기본으로 진행합니다.

| 용도                | 값                                                          |
| ------------------- | ----------------------------------------------------------- |
| 페이지 배경         | `#F4F8FF` (아주 옅은 블루 톤 — 완전 흰색보다 덜 밋밋하도록) |
| 히어로/보조 배경    | `#E4EEFF`                                                   |
| 포인트 블루         | `#2F80FF`                                                   |
| 텍스트(기본)        | `#0B1220`                                                   |
| 텍스트(보조)        | `#64748B` / `#94A3B8`                                       |
| 인풋 테두리(비활성) | `#E2E8F0`                                                   |
| UI 언어             | 한국어 (버튼/라벨/안내 문구 전부)                           |

## 기술 스택

- **프레임워크**: Next.js 16 (App Router), React 19, TypeScript
- **상태관리**: Zustand, TanStack Query v5 (서버 상태)
- **스타일**: Tailwind CSS v4
- **폼**: react-hook-form
- **에디터**: Tiptap (게시글 작성)
- **HTTP**: Axios (`util/AxiosUtil.ts` 래퍼 사용)

## 주요 명령어

```bash
npm run dev    # 개발 서버
npm run build  # 빌드
npm run lint   # 린트
```

## 디렉토리 구조

```
app/           # Next.js App Router 페이지
  page.tsx         # 메인(홈)
  login/           # 로그인
  admin/           # 관리자 (대시보드, 유저, 로그, 공통코드)
  auth/            # 토큰 처리 (TokenHandler)
  context/         # AuthContext (전역 로그인 상태)
  components/      # 레이아웃(Header, Footer), 에러바운더리, 로딩

features/      # 도메인별 API / 타입 / 쿼리
  auth/            # 로그인, 회원가입, 내 정보
  admin/           # 관리자

components/    # 공용 UI 컴포넌트 (Button, Input, Card, Editor 등)
util/          # 공통 유틸 (AxiosUtil, DateUtil, FileUtil 등)
styles/        # globals.css, editor.css
```

## API 통신 규칙

- `util/AxiosUtil.ts`의 `get / post / put / patch / deleteData` 래퍼를 사용
- 응답 포맷: `{ code, data, message }` — code `"0000"` 이 성공
- 인증: 앱 로드 시 `AuthBootstrap.tsx`가 `/api/v1/auth/refresh`를 1회 호출해 `accessToken`을 메모리에 저장 (refreshToken은 httpOnly 쿠키로 관리되어 `withCredentials`로 자동 전송) → 이후 모든 요청에 `Authorization: Bearer {accessToken}` 자동 첨부
- 401 발생 시 토큰 삭제 후 홈으로 리다이렉트 (로그인 상태였던 경우에만)
- 환경변수: `NEXT_PUBLIC_API_BASE_URL`

## 인증 흐름

- 앱 로드 시 `AuthBootstrap.tsx`가 `/api/v1/auth/refresh`를 1회 호출해 `accessToken`을 메모리에 채움 (실패 시 비로그인 상태로 간주)

## 주요 패턴

- 도메인별 `features/<domain>/<domain>.api.ts` + `query.ts` + `type.ts` 구조
- 공통 코드(기술스택 등)는 `features/c ommon/commonCode.ts`
