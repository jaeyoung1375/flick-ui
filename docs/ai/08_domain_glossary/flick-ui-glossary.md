# 도메인 용어 사전 상세 (flick-ui Domain Glossary)

이 문서는 flick-ui 코드(타입·스토어·훅)에서 쓰는 **프론트엔드 쪽 용어·식별자의 단일 출처**입니다. 실측(코드) 기반이며, 추측으로 채우지 않았습니다.

> ⚠️ 도메인 데이터의 근본 정의(DB 컬럼·상태값 목록 등)는 `flick-server` 저장소의 `docs/ai/08_domain_glossary/flick-server-glossary.md`가 정본입니다. 이 문서는 그 개념을 **프론트가 어떤 타입/변수명으로 다루는지**만 정리합니다.
>
> ⚠️ **OTT 고유 용어(콘텐츠·시즌·에피소드·시청기록·구독 등)는 아직 코드에 없다.** 구현되면 이 문서에 새 절로 추가한다. 온보딩·운동 기록 관련 용어(닉네임·운동레벨·세트·운동 마스터 등)는 2026-09-16 대응 코드(`features/{onboarding,workoutRecord,exercise}`, `store/{onboardingStore,recordDraftStore}`) 삭제와 함께 이 문서에서도 제거했다.

## 1. 인증

| 용어 | 코드 식별자 | 정의 |
|------|-------------|------|
| accessToken | `util/AxiosUtil.ts`의 모듈 변수 | 메모리 전용 보관(새로고침 시 소실). `setAccessToken`/`getAccessToken`으로만 접근 |
| 재발급 응답 | `RefreshResponse`(`features/auth/auth.type.ts`) | `accessToken` + `onboardingCompleted`(⚠️ 백엔드가 2026-09-09 제거한 죽은 필드 — 현재 어떤 화면도 읽지 않음, [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고) |
| 내 정보 | `User`(`features/auth/auth.type.ts`) | `id/email/name/phone/role/status/profileFileId/provider/gender/birth/regDt/modDt/lastLoginDt` |

## 2. 공통코드

| 용어 | 코드 식별자 | 정의 |
|------|-------------|------|
| 공통코드 응답 | `codeResponse`(`features/code/code.type.ts`) | `comCdId/comCdNm/dtlCdId/dtlCdNm/dtlCdExpln/lnkgDtlCdId1·2/useYn/sortSeq/...` |
| 다건 조회 응답 | `codeList` | ⚠️ 필드가 flick(OTT) 도메인 그룹이 아닌 `RECRUIT_TYPE_CD` 등 jobmoa 시절 채용 도메인 용어로 채워져 있음 — [`06_domain_playbooks/admin-code.md`](../06_domain_playbooks/admin-code.md) §1, [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고. **실제 사용 그룹 ID는 `fetchCodeList` 호출부의 인자로 확인** |
| 공통코드(관리자) | `ComCodeResponse`/`ComCodeCreateRequest`/`ComCodeUpdateRequest` | 그룹 단위 CRUD |
| 상세코드(관리자) | `DtlCodeCreateRequest`/`DtlCodeUpdateRequest` | 그룹에 속한 개별 코드값 CRUD |

## 3. 관리자(대시보드/유저) — ⚠️ 백엔드 확인 필요

| 용어 | 코드 식별자 | 정의 |
|------|-------------|------|
| 유저 통계 | `UserCountsResponse`(`totalCount/activeCount/deactivatedCount`) | `flick-server`의 `09_api_contract` 문서에 대응 엔드포인트 없음(패키지 스캐폴딩만 존재 가능성 — 확인 필요) |
| 신규 유저 수 | `NewUserCountResponse`(`newUserCount`) | 상동 |
| 게시글 수 | `PostCountResponse`(`postCount`) | flick(OTT 서비스)에는 게시판 개념이 없음 — 도메인상 근거 불명, [`06_domain_playbooks/admin-code.md`](../06_domain_playbooks/admin-code.md) §4 참고 |
| 관리자용 유저 | `AdminUser`(`userId/name/email/provider/role/status/regDt/lastLoginDt/filePath`) | 상동 |

> 위 표 전체가 `flick-server`의 문서화된 API 계약에 없는 상태다 — 신규 작업 전 반드시 백엔드 구현 여부를 재확인한다.

## 4. 관리자 — 운동마스터(`app/admin/exercises`) — ⚠️ 레거시 잔존, OTT 도메인 아님

`features/exercise` 타입 자체는 2026-09-16 삭제됐으나 화면(`app/admin/exercises`)은 남아있다. 관련 상태(부위/기구 코드 등)는 [`06_domain_playbooks/admin-code.md`](../06_domain_playbooks/admin-code.md) §3 참고 — 곧 정리될 예정이라 이 문서에 별도 용어표를 만들지 않는다.

## 5. 공통

| 용어 | 정의 |
|------|------|
| `ApiError`(`features/common/types/common.type.ts`) | TanStack Query 에러 제네릭에 쓰는 프론트 공용 에러 타입 |
| `ApiResponse<T>`(서버 응답 shape, `util/AxiosUtil.ts`의 로컬 인터페이스) | `code`(예: 정상 `"0000"`)·`data`·`message`. 백엔드의 `ApiResponse<T>`(`flick-server` 08_domain_glossary)와 이름은 같지만 프론트에서는 별도로 로컬 선언됨 — 공유 타입 패키지가 아님 |

> ⚠️ 이 저장소는 A-RMS(루트 워크스페이스)의 "제품/버전/요구사항" 용어 체계와 무관하다. 그쪽 용어를 여기 끌어오지 않는다.
