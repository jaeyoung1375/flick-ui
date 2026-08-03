"use client";

import { useRouter } from "next/navigation";
import Step8Page from "../Step8Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const update = useOnboardingStore((state) => state.update);

  return (
    <Step8Page
      onNext={(gymId) => {
        update({ gymId });
        router.push("/onboarding/step-9");
      }}
      onSkip={() => router.push("/onboarding/step-9")}
    />
  );
}
