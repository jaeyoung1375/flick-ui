export type WorkoutRecordSetRequest = {
  setNo: number;
  weight: number;
  reps: number;
};

export type WorkoutRecordExerciseRequest = {
  exerciseId: number;
  sets: WorkoutRecordSetRequest[];
};

export type WorkoutRecordCreateRequest = {
  categoryCd: string;
  recordDt: string;
  durationMin: number;
  exercises: WorkoutRecordExerciseRequest[];
};

// ── 조회 타입 ────────────────────────────────────────────

export type WorkoutRecordSetResponse = {
  setNo: number;
  weight: number;
  reps: number;
};

export type WorkoutRecordExerciseResponse = {
  exerciseId: number;
  exerciseName: string;
  sets: WorkoutRecordSetResponse[];
};

export type WorkoutRecordResponse = {
  workoutRecordId: number;
  categoryCd: string;
  recordDt: string;
  durationMin: number;
  exercises: WorkoutRecordExerciseResponse[];
};
