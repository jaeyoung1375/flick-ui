// Step5Page.tsx
// Motive – 온보딩 Step 5: 일주일 운동 횟수 선택
"use client";
import { useState } from "react";
import OnboardingHeader from "./components/OnboardingHeader";
import SelectOption from "./components/SelectOption";
import Button from "@/components/Button";

const WEEKLY_COUNTS = [7, 6, 5, 4, 3, 2, 1];

interface Step5PageProps {
  onNext?: (weeklyCount: number) => void;
}

export default function Step5Page({ onNext }: Step5PageProps) {
  const [weeklyCount, setWeeklyCount] = useState<number | null>(null);

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={5} />

      <div className="px-[26px] pb-[24px]">
        <p className="mt-[8px] font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
          일주일에 몇 번 운동하실 예정인가요?
        </p>
        <p className="mt-[6px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
          선택한 운동 수준과 목표에 맞춰 추천한 운동 횟수예요.
        </p>

        <div className="mt-[24px] flex flex-col gap-[12px]">
          {WEEKLY_COUNTS.map((count) => (
            <SelectOption
              key={count}
              title={`${count}회`}
              selected={weeklyCount === count}
              onClick={() => setWeeklyCount(count)}
            />
          ))}
        </div>

        <Button
          type="button"
          disabled={!weeklyCount}
          onClick={() => weeklyCount && onNext?.(weeklyCount)}
          className="mt-[24px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
