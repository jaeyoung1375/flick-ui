"use client";

import { useRouter } from "next/navigation";
import Step12Page from "../Step12Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const update = useOnboardingStore((state) => state.update);

  return (
    <Step12Page
      onNext={(experience) => {
        update({ experienceCd: experience });
        router.push("/onboarding/step-13");
      }}
    />
  );
}
