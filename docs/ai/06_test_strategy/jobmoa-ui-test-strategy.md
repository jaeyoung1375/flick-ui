# 테스트 전략 (jobmoa-ui Test Strategy)

## 1. 현재 상태 (2026-08-10 실측)

* `package.json`에 테스트 러너(Jest/Vitest/Testing Library/Playwright 등)가 **전혀 설치되어 있지 않다.** `scripts`에도 `test` 항목이 없다(`dev`/`build`/`start`/`lint`뿐).
* 저장소 전체에 `*.test.*`/`*.spec.*` 파일이 하나도 없다. **테스트 코드 자체가 존재하지 않는다.**
* `.github/workflows/deploy.yml`은 `npm ci` → `npm run build` → 배포로 바로 이어진다 — 테스트 단계 자체가 파이프라인에 없다(백엔드 `motive-server`처럼 "스킵"하는 게 아니라 애초에 구성되어 있지 않음).

## 2. 원칙 (테스트를 추가할 때)

* 이 저장소 관례가 아직 없으므로 특정 러너를 강제하지 않는다. Next.js 16 + React 19 조합에서는 Vitest + React Testing Library, 또는 Next.js 공식 가이드의 Jest 설정이 일반적인 선택지다 — 실제로 도입할 때 팀 방침을 먼저 정하고 이 문서를 갱신한다.
* `features/<domain>/*.query.ts`·`*.mutation.ts`는 TanStack Query 훅이므로 테스트 시 `QueryClientProvider`로 감싸야 한다(`app/providers.tsx`의 설정 참고).
* `util/AxiosUtil.ts`는 모듈 스코프 변수(`accessToken`)를 갖고 있어 테스트 간 격리를 위해 `setAccessToken(null)`로 초기화하거나 axios 인스턴스를 목(mock)으로 대체해야 한다.
* E2E 성격의 검증(온보딩 15단계, 소셜 로그인 리다이렉트)이 필요하면 실제 백엔드(`motive-server`)와의 통합이 전제이므로, 단위 테스트만으로는 흐름 전체를 검증할 수 없다는 점을 감안한다.

## 3. 갱신 규칙

* 테스트 러너·테스트 스위트가 실제로 생기면 이 문서의 "현재 상태"를 갱신하고, CI(`deploy.yml`)에 테스트 단계를 넣을지 논의를 함께 기록한다.
