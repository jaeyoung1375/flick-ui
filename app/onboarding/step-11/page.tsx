"use client";

import { useRouter } from "next/navigation";
import Step11Page from "../Step11Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const { height, weight, update } = useOnboardingStore();

  return (
    <Step11Page
      currentHeight={height}
      currentWeight={weight}
      onNext={(goalWeight) => {
        update({ goalWeight });
        router.push("/onboarding/step-12");
      }}
    />
  );
}
