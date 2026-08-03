"use client";

import { useRouter } from "next/navigation";
import Step9Page from "../Step9Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const update = useOnboardingStore((state) => state.update);

  return (
    <Step9Page
      onNext={(height) => {
        update({ height });
        router.push("/onboarding/step-10");
      }}
    />
  );
}
