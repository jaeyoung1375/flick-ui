"use client";

import { useRouter } from "next/navigation";
import Step7Page from "../Step7Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const update = useOnboardingStore((state) => state.update);

  return (
    <Step7Page
      onNext={(equipment) => {
        update({ equipmentCd: equipment });
        router.push("/onboarding/step-8");
      }}
    />
  );
}
