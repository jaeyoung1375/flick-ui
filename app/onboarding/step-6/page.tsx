"use client";

import { useRouter } from "next/navigation";
import Step6Page from "../Step6Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const update = useOnboardingStore((state) => state.update);

  return (
    <Step6Page
      onNext={(level) => {
        update({ levelCd: level });
        router.push("/onboarding/step-7");
      }}
    />
  );
}
