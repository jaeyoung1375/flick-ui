# 데이터 모델 상세 (jobmoa-ui Data Model) — 클라이언트 상태

> ⚠️ 이 저장소는 DB에 접근하지 않는다. 아래는 `features/**/*.type.ts`(서버 응답/요청 shape)와 `store/*.ts`(순수 클라이언트 상태)에서 실측한 타입 구조다. DB 컬럼·제약조건이 필요하면 `jobmoa-server`의 `docs/ai/10_data_model/jobmoa-server-data-model.md`를 확인한다.

## 1. TanStack Query 캐시 (서버 상태)

`queryKey` 규칙 실측 — 도메인 → 세부 구분 순:

| queryKey | 훅 | 데이터 |
|----------|-----|--------|
| `["auth", "me"]` | `useGetTokenQuery` | `RefreshResponse` |
| `["auth", "profile"]` | `useMeQuery` | `User` |
| `["workout-records", "list", yearMonth]` | `useWorkoutRecordListQuery` | `WorkoutRecordResponse[]` |
| `["workout-records", "detail", workoutRecordId]` | `useWorkoutRecordQuery` | `WorkoutRecordResponse` |
| `["menus"]` | `useMenuQuery` | `Menu[]` |

새 도메인 쿼리를 추가할 때 이 `[도메인, 세부구분, ...식별자]` 패턴을 따른다. `useCreateWorkoutRecordMutation` 성공 시 `["workout-records"]`(프리픽스)를 통째로 무효화한다 — 개별 `list`/`detail` 키를 따로 무효화하지 않는다.

## 2. Zustand 스토어 (순수 클라이언트 상태)

| 스토어 | 파일 | 주요 필드 |
|--------|------|-----------|
| `useOnboardingStore` | `store/onboardingStore.ts` | `OnboardingState` — [`08_domain_glossary`](../08_domain_glossary/jobmoa-ui-glossary.md) §2에 필드 전체 표 |
| `useRecordDraftStore` | `store/recordDraftStore.ts` | `records: RecordExercise[]`(`exercise: Exercise` + `sets: RecordSet[]`) |
| `useAlertStore` | `store/alertStore.ts` | `message, show, onConfirm?` — 전역 알림 모달 |
| `useConfirmStore` | `store/confirmStore.ts` | `message, show, onConfirm?, onCancel?` — 취소 콜백이 있는 점이 `alertStore`와 다름(확인/취소 2버튼 모달용) |

모든 스토어가 `{...initialState, update/action 메서드들, reset()}` 형태를 따른다(`create<State>((set) => ({...}))`).

## 3. 주요 도메인 타입 (서버 요청/응답)

전체 필드는 각 `features/<domain>/<domain>.type.ts`가 정본이다. 여기서는 구조만 요약한다.

* **인증** — `RefreshResponse{accessToken, onboardingCompleted}`, `User{id,email,name,phone,role,status,profileFileId?,provider,gender?,birth?,regDt,modDt,lastLoginDt?}`, `OnboardingUser`(온보딩 화면 표시용, `auth.type.ts`에 있으나 스토어의 `OnboardingState`와는 별개 타입).
* **온보딩 요청** — `InsertProfileRequest`(닉네임~벤치프레스 가능여부, [`08_domain_glossary`](../08_domain_glossary/jobmoa-ui-glossary.md) §2 표 참고).
* **운동 기록** — `WorkoutRecordCreateRequest{categoryCd, recordDt, durationMin, exercises: WorkoutRecordExerciseRequest[]}` → 각 exercise는 `{exerciseId, sets: WorkoutRecordSetRequest[]}` → 각 set은 `{setNo, weight, reps}`. 응답 `WorkoutRecordResponse`도 동일한 3단 구조(`exerciseName` 추가).
* **운동 마스터** — `ExerciseResponse`(API), `ExerciseCreateRequest`/`UpdateRequest`(관리자). 화면 필터용 `Exercise`(`app/exercises/exercises.data.ts`)는 별개 타입 — 필드 유사도만으로 서로 대입하지 말 것([`06_domain_playbooks/workout.md`](../06_domain_playbooks/workout.md) §2 참고).
* **공통코드** — `codeResponse`(단건), `codeList`(다건, 그룹ID를 키로 — 필드가 motive 도메인과 무관하다는 점은 [`08_domain_glossary`](../08_domain_glossary/jobmoa-ui-glossary.md) §4 참고), `ComCodeResponse`/`*CreateRequest`/`*UpdateRequest`, `DtlCode*Request`.
* **관리자(대시보드/유저)** — `UserCountsResponse`/`NewUserCountResponse`/`PostCountResponse`/`AdminUser`/`AdminUserSearchParams`(`features/admin/admin.type.ts`) — 대응 백엔드 없음, [`09_api_contract`](../09_api_contract/jobmoa-ui-api-contract.md) 참고.

## 4. 서버 DB 스키마와의 대응 관계

* `USER_FITNESS_PROFILE`(백엔드 테이블) ↔ 프론트 `OnboardingState`/`InsertProfileRequest` — 1:1 대응이나 이름이 다르다(`equipmentCd` 등은 컬럼명과 동일, `nickname`은 프론트 스토어 전용 명칭).
* `WORKOUT_RECORD` → `WORKOUT_RECORD_EXERCISE` → `WORKOUT_RECORD_SET`(3단, 백엔드) ↔ `WorkoutRecordResponse.exercises[].sets[]`(프론트) — 구조가 그대로 반영되어 있다.
* `CMM_CODE`/`CMM_CODE_DTL`(백엔드) ↔ `codeResponse`/`ComCodeResponse` — 필드명이 거의 동일(`comCdId`, `dtlCdId` 등)하게 매핑되어 있다.

이 대응 관계가 바뀌면(백엔드 컬럼 추가/변경) 이 문서와 `features/<domain>/<domain>.type.ts`를 함께 갱신한다.
