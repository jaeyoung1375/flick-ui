"use client";

import { useRouter } from "next/navigation";
import Step10Page from "../Step10Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const update = useOnboardingStore((state) => state.update);

  return (
    <Step10Page
      onNext={(weight) => {
        update({ weight, goalWeight: weight - 2 });
        router.push("/onboarding/step-11");
      }}
    />
  );
}
