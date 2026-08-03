"use client";

import { useRouter } from "next/navigation";
import Step13Page from "../Step13Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const update = useOnboardingStore((state) => state.update);

  return (
    <Step13Page
      onNext={(squat) => {
        update({ squat });
        router.push("/onboarding/step-14");
      }}
    />
  );
}
