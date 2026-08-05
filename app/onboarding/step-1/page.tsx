"use client";

import { useRouter } from "next/navigation";
import Step1Page from "../Step1Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const update = useOnboardingStore((state) => state.update);

  return (
    <Step1Page
      onNext={(name, profileImage) => {
        update({ nickname: name, profileImage });
        router.push("/onboarding/step-2");
      }}
    />
  );
}
