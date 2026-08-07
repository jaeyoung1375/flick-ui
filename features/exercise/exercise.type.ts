// ── Admin 타입 ──────────────────────────────────────────

export type ExerciseResponse = {
  exerciseId: number;
  name: string;
  bodyPartCd: string;
  equipmentCd: string;
  bodyPartNm: string;
  equipmentNm: string;
  regDt?: string;
  modDt?: string;
};

export type ExerciseCreateRequest = {
  name: string;
  bodyPartCd: string;
  equipmentCd?: string | null;
};

export type ExerciseUpdateRequest = {
  name: string;
  bodyPartCd: string;
  equipmentCd?: string | null;
};
