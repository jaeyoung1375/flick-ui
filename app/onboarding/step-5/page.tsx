"use client";

import { useRouter } from "next/navigation";
import Step5Page from "../Step5Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const update = useOnboardingStore((state) => state.update);

  return (
    <Step5Page
      onNext={(weeklyCount) => {
        update({ weeklyCount });
        router.push("/onboarding/step-6");
      }}
    />
  );
}
