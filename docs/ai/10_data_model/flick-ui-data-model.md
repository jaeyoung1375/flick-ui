# 데이터 모델 상세 (flick-ui Data Model) — 클라이언트 상태

> ⚠️ 이 저장소는 DB에 접근하지 않는다. 아래는 `features/**/*.type.ts`(서버 응답/요청 shape)와 `store/*.ts`(순수 클라이언트 상태)에서 실측한 타입 구조다. DB 컬럼·제약조건이 필요하면 `flick-server`의 `docs/ai/10_data_model/flick-server-data-model.md`를 확인한다.
>
> ⚠️ OTT 고유 데이터 모델(콘텐츠·시즌·에피소드·시청기록·구독 등)은 아직 없다. 온보딩/운동 기록 관련 타입·스토어(`OnboardingState`, `RecordExercise`, `WorkoutRecordCreateRequest` 등)는 2026-09-16 대응 코드 삭제와 함께 이 문서에서도 제거했다.

## 1. TanStack Query 캐시 (서버 상태)

`queryKey` 규칙 실측 — 도메인 → 세부 구분 순:

| queryKey | 훅 | 데이터 |
|----------|-----|--------|
| `["auth", "me"]` | `useGetTokenQuery` | `RefreshResponse` |
| `["auth", "profile"]` | `useMeQuery` | `User` |
| `["menus"]` | `useMenuQuery` | `Menu[]` |

새 도메인 쿼리를 추가할 때 이 `[도메인, 세부구분, ...식별자]` 패턴을 따른다.

## 2. Zustand 스토어 (순수 클라이언트 상태)

| 스토어 | 파일 | 주요 필드 |
|--------|------|-----------|
| `useAlertStore` | `store/alertStore.ts` | `message, show, onConfirm?` — 전역 알림 모달 |
| `useConfirmStore` | `store/confirmStore.ts` | `message, show, onConfirm?, onCancel?` — 취소 콜백이 있는 점이 `alertStore`와 다름(확인/취소 2버튼 모달용) |

모든 스토어가 `{...initialState, update/action 메서드들, reset()}` 형태를 따른다(`create<State>((set) => ({...}))`). (`onboardingStore`/`recordDraftStore`는 2026-09-16 삭제됨)

## 3. 주요 도메인 타입 (서버 요청/응답)

전체 필드는 각 `features/<domain>/<domain>.type.ts`가 정본이다. 여기서는 구조만 요약한다.

* **인증** — `RefreshResponse{accessToken, onboardingCompleted}`(⚠️ `onboardingCompleted`는 백엔드가 제거한 죽은 필드, [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고), `User{id,email,name,phone,role,status,profileFileId?,provider,gender?,birth?,regDt,modDt,lastLoginDt?}`, `OnboardingUser`(레거시 잔존 타입 — 온보딩 화면이 삭제됐으므로 참조하는 화면 없음, `auth.type.ts`에만 남아있음).
* **공통코드** — `codeResponse`(단건), `codeList`(다건, 그룹ID를 키로 — 필드가 flick 도메인과 무관하다는 점은 [`08_domain_glossary`](../08_domain_glossary/flick-ui-glossary.md) §2 참고), `ComCodeResponse`/`*CreateRequest`/`*UpdateRequest`, `DtlCode*Request`.
* **관리자(대시보드/유저)** — `UserCountsResponse`/`NewUserCountResponse`/`PostCountResponse`/`AdminUser`/`AdminUserSearchParams`(`features/admin/admin.type.ts`) — 대응 백엔드 API 문서 없음, [`09_api_contract`](../09_api_contract/flick-ui-api-contract.md) 참고.

## 4. 서버 DB 스키마와의 대응 관계

* `CMM_CODE`/`CMM_CODE_DTL`(백엔드) ↔ `codeResponse`/`ComCodeResponse` — 필드명이 거의 동일(`comCdId`, `dtlCdId` 등)하게 매핑되어 있다.
* `USERS`/`SOCIAL_ACCOUNTS`(백엔드) ↔ `User`/인증 흐름 — `role`·`provider` 등 필드명이 대응한다.
* OTT 고유 테이블(`CONTENT`/`SEASON`/`EPISODE`/`WATCH_HISTORY`/`SUBSCRIPTION_PLAN` 등)은 `flick-server`의 `flick-server-streaming-roadmap.md`에 제안 단계로만 존재하며, 아직 실제 DDL·프론트 타입 어느 쪽에도 없다.

이 대응 관계가 바뀌면(백엔드 컬럼 추가/변경) 이 문서와 `features/<domain>/<domain>.type.ts`를 함께 갱신한다.
