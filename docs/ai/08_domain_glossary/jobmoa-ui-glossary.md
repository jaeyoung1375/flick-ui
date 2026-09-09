# 도메인 용어 사전 상세 (jobmoa-ui Domain Glossary)

이 문서는 motive-ui 코드(타입·스토어·훅)에서 쓰는 **프론트엔드 쪽 용어·식별자의 단일 출처**입니다. 실측(코드) 기반이며, 추측으로 채우지 않았습니다.

> ⚠️ 도메인 데이터의 근본 정의(DB 컬럼·상태값 목록 등)는 `jobmoa-server` 저장소의 `docs/ai/08_domain_glossary/jobmoa-server-glossary.md`가 정본입니다. 이 문서는 그 개념을 **프론트가 어떤 타입/변수명으로 다루는지**만 정리합니다.

## 1. 인증

| 용어 | 코드 식별자 | 정의 |
|------|-------------|------|
| accessToken | `util/AxiosUtil.ts`의 모듈 변수 | 메모리 전용 보관(새로고침 시 소실). `setAccessToken`/`getAccessToken`으로만 접근 |
| 재발급 응답 | `RefreshResponse`(`features/auth/auth.type.ts`) | `accessToken` + `onboardingCompleted` |
| 내 정보 | `User`(`features/auth/auth.type.ts`) | `id/email/name/phone/role/status/profileFileId/provider/gender/birth/regDt/modDt/lastLoginDt` |
| 온보딩 완료 | `onboardingCompleted`(`RefreshResponse` 필드) | 백엔드 계산값을 그대로 신뢰 — 프론트에서 재계산하지 않음 |

## 2. 온보딩 (프론트 전용 임시 상태)

`store/onboardingStore.ts`의 `OnboardingState` 필드 — 백엔드 `InsertProfileRequest`(`features/onboarding/onboarding.type.ts`)로 최종 변환되어 전송된다.

| 용어 | 스토어 필드 | 대응 요청 필드 |
|------|-------------|------------------|
| 닉네임 | `nickname` | `nickname` |
| 프로필 이미지 | `profileImage`(`File \| null`) | multipart 파일 파트 `profileImage` |
| 성별 | `gender` | `gender` |
| 생년월일 | `birth` | `birth` |
| 목표 | `goal` | `goal` |
| 주당 운동 횟수 | `weeklyCount` | `weeklyCount` |
| 운동레벨 | `levelCd` | `levelCd` |
| 보유장비 | `equipmentCd` | `equipmentCd` |
| 체육관 | `gymId` | `gymId` |
| 키/몸무게/목표몸무게 | `height`/`weight`/`goalWeight` | 동일 |
| 운동경력 | `experienceCd` | `experienceCd` |
| 스쿼트/벤치프레스 가능여부 | `squat`/`benchPress`(`boolean \| null`) | `squat`/`benchPress`(요청 시 `Y`/`N` 변환 지점 확인 필요) |

## 3. 운동 기록

| 용어 | 코드 식별자 | 정의 |
|------|-------------|------|
| 작성 중 기록(draft) | `RecordExercise`(`store/recordDraftStore.ts`) | 서버 미저장 상태. `exercise`(`app/exercises/exercises.data.ts`의 `Exercise`) + `sets`(`RecordSet[]`) |
| 세트 | `RecordSet` / `WorkoutRecordSetRequest`·`WorkoutRecordSetResponse` | `weight`(kg) + `reps` |
| 운동기록 등록 요청 | `WorkoutRecordCreateRequest`(`features/workoutRecord/workoutRecord.type.ts`) | `categoryCd/recordDt/durationMin/exercises[]` |
| 운동기록 응답 | `WorkoutRecordResponse` | `workoutRecordId/categoryCd/recordDt/durationMin/exercises[]`(`exerciseId/exerciseName/sets[]`) |
| 운동 마스터(필터용) | `Exercise`(`app/exercises/exercises.data.ts`) | `id/name/bodyPartCd/bodyPartNm/equipmentCd/equipmentNm` — **부위·기구 필터 옵션은 하드코딩**(TODO 주석, [`12_known_issues`](../12_known_issues/jobmoa-ui-known-issues.md)) |
| 운동 마스터(API 응답) | `ExerciseResponse`(`features/exercise/exercise.type.ts`) | 공개/관리자 API 공통 응답 타입 — 위 `Exercise`와 필드 유사하나 별개 타입 선언이므로 혼용 시 확인 필요 |

## 4. 공통코드

| 용어 | 코드 식별자 | 정의 |
|------|-------------|------|
| 공통코드 응답 | `codeResponse`(`features/code/code.type.ts`) | `comCdId/comCdNm/dtlCdId/dtlCdNm/dtlCdExpln/lnkgDtlCdId1·2/useYn/sortSeq/...` |
| 다건 조회 응답 | `codeList` | ⚠️ 필드가 motive 도메인 그룹이 아닌 `RECRUIT_TYPE_CD` 등 채용 도메인 용어로 채워져 있음 — [`06_domain_playbooks/admin-code.md`](../06_domain_playbooks/admin-code.md) §1, [`12_known_issues`](../12_known_issues/jobmoa-ui-known-issues.md) 참고. **실제 사용 그룹 ID는 `fetchCodeList` 호출부의 인자로 확인** |
| 공통코드(관리자) | `ComCodeResponse`/`ComCodeCreateRequest`/`ComCodeUpdateRequest` | 그룹 단위 CRUD |
| 상세코드(관리자) | `DtlCodeCreateRequest`/`DtlCodeUpdateRequest` | 그룹에 속한 개별 코드값 CRUD |

## 5. 관리자(대시보드/유저) — ⚠️ 백엔드 미구현

| 용어 | 코드 식별자 | 정의 |
|------|-------------|------|
| 유저 통계 | `UserCountsResponse`(`totalCount/activeCount/deactivatedCount`) | 대응 백엔드 엔드포인트 없음 |
| 신규 유저 수 | `NewUserCountResponse`(`newUserCount`) | 대응 백엔드 엔드포인트 없음 |
| 게시글 수 | `PostCountResponse`(`postCount`) | motive에는 게시판 개념이 없음 — 도메인상 근거 불명, [`06_domain_playbooks/admin-code.md`](../06_domain_playbooks/admin-code.md) §4 참고 |
| 관리자용 유저 | `AdminUser`(`userId/name/email/provider/role/status/regDt/lastLoginDt/filePath`) | 대응 백엔드 엔드포인트 없음 |

> 위 5절 전체가 `motive-server`에 대응 컨트롤러가 없는 상태다 — 신규 작업 전 반드시 백엔드 구현 여부를 재확인한다.

## 6. 공통

| 용어 | 정의 |
|------|------|
| `ApiError`(`features/common/types/common.type.ts`) | TanStack Query 에러 제네릭에 쓰는 프론트 공용 에러 타입 |
| `ApiResponse<T>`(서버 응답 shape, `util/AxiosUtil.ts`의 로컬 인터페이스) | `code`(예: 정상 `"0000"`)·`data`·`message`. 백엔드의 `ApiResponse<T>`(`motive-server` 08_domain_glossary)와 이름은 같지만 프론트에서는 별도로 로컬 선언됨 — 공유 타입 패키지가 아님 |

> ⚠️ 이 저장소는 A-RMS(루트 워크스페이스)의 "제품/버전/요구사항" 용어 체계와 무관하다. 그쪽 용어를 여기 끌어오지 않는다.
