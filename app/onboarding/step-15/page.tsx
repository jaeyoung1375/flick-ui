"use client";

import { useRouter } from "next/navigation";
import Step15Page from "../Step15Page";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useInsertProfileMutation } from "@/features/onboarding/onboarding.mutation";

export default function Page() {
  const router = useRouter();
  const {
    nickname,
    profileImage,
    gender,
    birth,
    goal,
    weeklyCount,
    levelCd,
    equipmentCd,
    gymId,
    height,
    weight,
    goalWeight,
    experienceCd,
    squat,
    benchPress,
    reset,
  } = useOnboardingStore();

  const { mutate } = useInsertProfileMutation();

  return (
    <Step15Page
      goal={goal}
      weeklyCount={weeklyCount}
      levelCd={levelCd}
      equipmentCd={equipmentCd}
      height={height}
      weight={weight}
      onFinish={() => {
        mutate(
          {
            body: {
              nickname,
              gender,
              birth,
              goal,
              weeklyCount,
              levelCd,
              equipmentCd,
              gymId,
              height,
              weight,
              goalWeight,
              experienceCd,
              squat,
              benchPress,
            },
            profileImage,
          },
          {
            onSuccess: () => {
              reset();
              router.push("/");
            },
          },
        );
      }}
    />
  );
}
