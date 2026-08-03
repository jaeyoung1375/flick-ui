// Step13Page.tsx
// Motive – 온보딩 Step 13: 스쿼트 경험 확인
"use client";
import { useState } from "react";
import OnboardingHeader from "./components/OnboardingHeader";
import YesNoQuestion from "./components/YesNoQuestion";
import Button from "@/components/Button";

interface Step13PageProps {
  onNext?: (hasExperience: boolean) => void;
}

export default function Step13Page({ onNext }: Step13PageProps) {
  const [answer, setAnswer] = useState<boolean | null>(null);

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={13} />

      <div className="px-[26px] pb-[24px]">
        <YesNoQuestion
          exerciseName="스쿼트"
          answer={answer}
          onAnswer={setAnswer}
        />

        <Button
          type="button"
          disabled={answer === null}
          onClick={() => answer !== null && onNext?.(answer)}
          className="mt-[32px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
