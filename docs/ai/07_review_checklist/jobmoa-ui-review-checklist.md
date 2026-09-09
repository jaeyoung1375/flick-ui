# 제출 전 자가검토 체크리스트 (jobmoa-ui)

## 라우팅·구조
- [ ] `page.tsx`를 얇게 유지하고 실제 로직은 같은 디렉토리의 PascalCase 컴포넌트에 두었는가
- [ ] 새 도메인이면 `features/<domain>/`에 `api.ts`(또는 query.ts에 직접)/`query.ts`/`type.ts` 구조를 갖췄는가
- [ ] 컴포넌트에서 axios를 직접 import하지 않고 `util/AxiosUtil.ts` 래퍼를 경유했는가

## 상태 관리
- [ ] 서버 데이터는 TanStack Query 캐시에만 두고 Zustand에 복제하지 않았는가
- [ ] 변경(mutation) 성공 시 관련 `queryKey`를 `invalidateQueries`로 무효화했는가
- [ ] accessToken을 `util/AxiosUtil.ts`의 모듈 스코프 변수 밖에 저장하지 않았는가

## 인증
- [ ] 로그인 필요 화면에서 로딩/비로그인 상태를 실제로 구분해 렌더링했는가 (children을 무조건 렌더링하는 자리표시자 가드를 새로 만들지 않았는가 — `AdminAuthGuard` 사례 참고, [`12_known_issues`](../12_known_issues/jobmoa-ui-known-issues.md))
- [ ] 새 관리자 화면을 추가했다면, 현재 프론트·백엔드 양쪽에 role 기반 접근 제어가 없다는 한계를 인지하고 있는가

## API 연동
- [ ] 호출하는 엔드포인트가 `motive-server`의 `docs/ai/09_api_contract`에 실제로 존재하는지 확인했는가(존재하지 않으면 임의로 있다고 가정하지 않았는가 — `features/admin` 사례 참고)
- [ ] 요청/응답 타입 필드명이 백엔드 DTO(camelCase)와 일치하는가
- [ ] 공통코드(`features/code`)를 참조할 때 `code.type.ts`의 `codeList` 타입에 있는 필드를 그대로 신뢰하지 않고 실제 그룹 ID를 확인했는가

## 스타일
- [ ] 색상을 하드코딩하지 않고 `styles/globals.css`의 테마 토큰(`bg-motive` 등)을 썼는가
- [ ] 신규 공용 컴포넌트를 `components/`(구 세트)가 아니라 `components/ui/`에 만들었는가
- [ ] UI 문구가 한국어로 작성되었는가

## 설정
- [ ] 새 환경변수를 추가했다면 `NEXT_PUBLIC_` 접두어를 붙이고 `.env.development`/`.env.production` 양쪽에 반영했는가
- [ ] 배포 워크플로우(`.github/workflows/deploy.yml`)가 참조하는 환경변수명이 실제 코드에서 쓰는 이름과 일치하는지 확인했는가
- [ ] 새 의존성을 추가했다면 [`02_tech_stack`](../02_tech_stack/jobmoa-ui-tech-stack.md)에도 반영했는가

## 문서 동기화
- [ ] 소비하는 API가 바뀌었다면 [`09_api_contract`](../09_api_contract/jobmoa-ui-api-contract.md)를 갱신했는가
- [ ] 클라이언트 타입/전역 상태 구조가 바뀌었다면 [`10_data_model`](../10_data_model/jobmoa-ui-data-model.md)을 갱신했는가
- [ ] 변경 사항을 [`11_changelog`](../11_changelog/jobmoa-ui-changelog.md)에 남겼는가
- [ ] 새로 발견한 함정이 있다면 [`12_known_issues`](../12_known_issues/jobmoa-ui-known-issues.md)에 남겼는가
