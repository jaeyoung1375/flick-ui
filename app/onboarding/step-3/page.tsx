"use client";

import { useRouter } from "next/navigation";
import Step3Page from "../Step3Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const update = useOnboardingStore((state) => state.update);

  return (
    <Step3Page
      onNext={(birth) => {
        update({ birth });
        router.push("/onboarding/step-4");
      }}
    />
  );
}
