"use client";

import { useRouter } from "next/navigation";
import Step14Page from "../Step14Page";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function Page() {
  const router = useRouter();
  const update = useOnboardingStore((state) => state.update);

  return (
    <Step14Page
      onNext={(benchPress) => {
        update({ benchPress });
        router.push("/onboarding/step-15");
      }}
    />
  );
}
