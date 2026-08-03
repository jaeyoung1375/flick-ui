"use client";

import { useRouter } from "next/navigation";
import Step4Page from "../Step4Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const update = useOnboardingStore((state) => state.update);

  return (
    <Step4Page
      onNext={(goal) => {
        update({ goal });
        router.push("/onboarding/step-5");
      }}
    />
  );
}
