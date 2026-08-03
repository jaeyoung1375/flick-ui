// Step14Page.tsx
// Motive – 온보딩 Step 14: 벤치프레스 경험 확인
"use client";
import { useState } from "react";
import OnboardingHeader from "./components/OnboardingHeader";
import YesNoQuestion from "./components/YesNoQuestion";
import Button from "@/components/Button";

interface Step14PageProps {
  onNext?: (hasExperience: boolean) => void;
}

export default function Step14Page({ onNext }: Step14PageProps) {
  const [answer, setAnswer] = useState<boolean | null>(null);

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={14} />

      <div className="px-[26px] pb-[24px]">
        <YesNoQuestion
          exerciseName="벤치프레스"
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
