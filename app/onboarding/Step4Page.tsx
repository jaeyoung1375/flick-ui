// Step4Page.tsx
// Motive – 온보딩 Step 4: 운동 목표 선택
"use client";
import { useState } from "react";
import OnboardingHeader from "./components/OnboardingHeader";
import SelectOption from "./components/SelectOption";
import Button from "@/components/Button";
import { useCodeQuery } from "@/features/code/code.query";

interface Step4PageProps {
  onNext?: (goal: string) => void;
}

export default function Step4Page({ onNext }: Step4PageProps) {
  // 운동 목표 구분코드 조회
  const { data: goals = [] } = useCodeQuery({ comCdId: "GOAL_CD" });

  const [goal, setGoal] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={4} />

      <div className="px-[26px] pb-[24px]">
        <p className="mt-[8px] font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
          운동 목표가 어떻게 되시나요?
        </p>
        <p className="mt-[6px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
          목표에 맞는 운동 플랜을 추천해 드릴게요.
        </p>

        <div className="mt-[24px] flex flex-col gap-[12px]">
          {goals.map(({ dtlCdId, dtlCdNm }) => (
            <SelectOption
              key={dtlCdId}
              title={dtlCdNm}
              selected={goal === dtlCdId}
              onClick={() => setGoal(dtlCdId)}
            />
          ))}
        </div>

        <Button
          type="button"
          disabled={!goal}
          onClick={() => goal && onNext?.(goal)}
          className="mt-[24px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
