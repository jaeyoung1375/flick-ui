export type OnboardingUser = {
  email: string; // 이메일
  name: string; // 이름
  birth?: string; // 생년월일
  phone: string; // 휴대폰번호
  profileFileId: number; // 프로필 파일ID
  gender?: "01" | "02" | "03"; // 성별
  completed: boolean; // 온보딩 완료 여부
};

export type RefreshResponse = {
  accessToken: string;
  onboardingCompleted: boolean; // 온보딩 완료 여부
};

export type User = {
  userId: number;
  email: string;
  name: string;
  phone: string;
  role: string;
  status: string;
  profileFileId?: string;
  provider: string;
  gender?: string;
  birth?: string;
  regDt: string;
  modDt: string;
  lastLoginDt?: string;
};
