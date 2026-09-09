# 변경 이력 (jobmoa-ui Changelog)

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
