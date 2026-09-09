# 플레이북 · 온보딩(운동 프로필) / 운동 기록 화면 (Workout)

관련 코드: `app/onboarding/step-1`~`step-15`, `store/onboardingStore.ts`, `features/onboarding/`, `app/profile/record*`, `store/recordDraftStore.ts`, `features/workoutRecord/`, `app/exercises`, `features/exercise/`

## 1. 온보딩 (15단계)

```
step-1(닉네임/프로필이미지) → step-2~ (성별·생년월일·목표·주당 횟수·레벨·보유장비·체육관·키·몸무게·목표몸무게·운동경력·스쿼트/벤치프레스 가능여부 등)
    → 마지막 단계에서 useOnboardingStore의 누적 값을 InsertProfileRequest로 변환
    → insertProfile(body, profileImage) → POST /api/v1/fitness-profile (multipart)
```

* 각 `step-N/page.tsx`는 `useOnboardingStore().update(partial)`로 해당 단계 입력값만 갱신하고 `router.push("/onboarding/step-{N+1}")`로 다음 단계로 이동한다(`step-1/page.tsx` 실측) — 단계 간 값 전달은 URL 쿼리가 아니라 전역 Zustand 스토어로 한다.
* `useOnboardingStore`의 필드는 백엔드 `InsertProfileRequest`(`features/onboarding/onboarding.type.ts`)와 거의 1:1 대응하지만 `nickname`(스토어) 등 일부 네이밍은 스토어 자체 관례를 따른다 — 새 온보딩 필드를 추가할 때 스토어 필드명과 요청 타입 필드명을 둘 다 맞춰야 누락이 없다.
* 최종 제출은 `postForm`(멀티파트) — `profileImage`가 없으면 파일 파트 자체를 생략한다(`onboarding.api.ts`: `profileImage ? { profileImage } : undefined`).
* 온보딩 완료 후 `useOnboardingStore().reset()` 호출 여부를 화면에서 확인할 것(다음 로그인 시 잔여 값이 남아있지 않도록).

## 2. 운동 기록 작성 (draft → 제출)

```
app/exercises 에서 운동 선택 → useRecordDraftStore.addExercise(exercise)
    → 상세 화면에서 세트 추가/수정 (addSet/updateSet, 기본 4세트)
    → 제출 시 draft(RecordExercise[])를 WorkoutRecordCreateRequest.exercises 형태로 변환
    → useCreateWorkoutRecordMutation() → POST /api/v1/workout-records
        → 성공 시 ["workout-records"] 쿼리 무효화
```

* `useRecordDraftStore`(`store/recordDraftStore.ts`)가 작성 중 상태(선택한 운동 + 세트별 무게/횟수)를 들고 있다 — 서버에 아직 저장되지 않은 값이므로 TanStack Query 캐시가 아니라 Zustand로 관리한다.
* `RecordExercise.exercise` 타입이 `app/exercises/exercises.data.ts`의 `Exercise`(부위/기구 필터용 하드코딩 타입)를 참조한다 — 이 타입이 백엔드 `ExerciseResponse`(`features/exercise/exercise.type.ts`)와 필드가 같은지 다른지 확인 없이 섞어 쓰면 타입은 통과해도 실제 값이 어긋날 수 있다. 새 필드 추가 시 두 타입 모두 갱신해야 한다.
* 목록 조회(`useWorkoutRecordListQuery`)는 `yearMonth` 파라미터만 받는다(월 단위 조회) — 상세 조회(`useWorkoutRecordQuery`)는 `workoutRecordId`로 개별 호출한다. 목록에서 세트까지 미리 가져오지 않으므로, 상세 화면 진입 시 별도 요청이 발생하는 것이 정상 동작이다.
* 수정/삭제 mutation은 `workoutRecord.mutation.ts`에 아직 생성(`useCreateWorkoutRecordMutation`)만 있다 — 수정·삭제 화면을 만들 때 대응하는 mutation 훅이 없다는 점을 확인하고 먼저 추가한다(백엔드 `PUT/DELETE /workout-records/{id}`는 존재, `motive-server` `09_api_contract` 참고).

## 3. 운동 마스터 조회 (`app/exercises`)

* `features/exercise/exercise.api.ts`의 `fetchExerciseList`가 `GET /api/v1/exercises`를 호출한다(공개, 인증 불필요).
* **부위/기구 필터 옵션 자체는 `app/exercises/exercises.data.ts`에 하드코딩되어 있다**(파일 1행 TODO 주석: "공통코드 연동 전까지 사용하는 임시 하드코딩 데이터"). 실제 필터값을 공통코드(`features/code`)로 전환하는 작업이 아직 안 된 상태 — 필터 관련 요구사항이 오면 이 하드코딩을 유지할지 공통코드 연동으로 바꿀지 먼저 확인한다.
