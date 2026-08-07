"use client";

import { create } from "zustand";
import type { Exercise } from "@/app/exercises/exercises.data";

export interface RecordSet {
  weight: number;
  reps: number;
}

export interface RecordExercise {
  exercise: Exercise;
  sets: RecordSet[];
}

const DEFAULT_SET_COUNT = 4;
const createDefaultSet = (): RecordSet => ({ weight: 0, reps: 0 });

interface RecordDraftState {
  records: RecordExercise[];
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exerciseId: number) => void;
  addSet: (exerciseId: number) => void;
  removeSet: (exerciseId: number, setIndex: number) => void;
  updateSet: (
    exerciseId: number,
    setIndex: number,
    patch: Partial<RecordSet>,
  ) => void;
  reset: () => void;
}

export const useRecordDraftStore = create<RecordDraftState>((set) => ({
  records: [],
  addExercise: (exercise) =>
    set((state) =>
      state.records.some((r) => r.exercise.id === exercise.id)
        ? state
        : {
            records: [
              ...state.records,
              {
                exercise,
                sets: Array.from(
                  { length: DEFAULT_SET_COUNT },
                  createDefaultSet,
                ),
              },
            ],
          },
    ),
  removeExercise: (exerciseId) =>
    set((state) => ({
      records: state.records.filter((r) => r.exercise.id !== exerciseId),
    })),
  addSet: (exerciseId) =>
    set((state) => ({
      records: state.records.map((r) =>
        r.exercise.id === exerciseId
          ? {
              ...r,
              sets: [...r.sets, { ...(r.sets[r.sets.length - 1] ?? createDefaultSet()) }],
            }
          : r,
      ),
    })),
  removeSet: (exerciseId, setIndex) =>
    set((state) => ({
      records: state.records.map((r) =>
        r.exercise.id === exerciseId
          ? { ...r, sets: r.sets.filter((_, i) => i !== setIndex) }
          : r,
      ),
    })),
  updateSet: (exerciseId, setIndex, patch) =>
    set((state) => ({
      records: state.records.map((r) =>
        r.exercise.id === exerciseId
          ? {
              ...r,
              sets: r.sets.map((s, i) =>
                i === setIndex ? { ...s, ...patch } : s,
              ),
            }
          : r,
      ),
    })),
  reset: () => set({ records: [] }),
}));
