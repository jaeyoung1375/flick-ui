"use client";

import { useRouter } from "next/navigation";
import Step2Page from "../Step2Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const update = useOnboardingStore((state) => state.update);

  return (
    <Step2Page
      onNext={(gender) => {
        update({ gender });
        router.push("/onboarding/step-3");
      }}
    />
  );
}
