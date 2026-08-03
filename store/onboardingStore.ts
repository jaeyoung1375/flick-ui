"use client";

import { create } from "zustand";

interface OnboardingState {
  nickname: string;
  gender: string;
  birth: string;
  goal: string;
  weeklyCount: number | null;
  levelCd: string;
  equipmentCd: string;
  gymId: string | null;
  height: number;
  weight: number;
  goalWeight: number;
  experienceCd: string;
  squat: boolean | null;
  benchPress: boolean | null;
  update: (partial: Partial<OnboardingState>) => void;
  reset: () => void;
}

const initialState = {
  nickname: "",
  gender: "",
  birth: "",
  goal: "",
  weeklyCount: null,
  levelCd: "",
  equipmentCd: "",
  gymId: null,
  height: 165,
  weight: 65,
  goalWeight: 63,
  experienceCd: "",
  squat: null,
  benchPress: null,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  update: (partial) => set(partial),
  reset: () => set(initialState),
}));
