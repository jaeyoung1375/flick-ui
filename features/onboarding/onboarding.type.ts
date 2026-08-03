// 온보딩 완료 시 USERS + USER_FITNESS_PROFILE을 한 번에 저장하는 요청 타입
export type InsertProfileRequest = {
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
};
