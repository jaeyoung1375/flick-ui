// Step11Page.tsx
// Motive – 온보딩 Step 11: 목표 몸무게 입력
"use client";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import NumberField from "./components/NumberField";
import OnboardingHeader from "./components/OnboardingHeader";
import Button from "@/components/Button";

interface Step11PageProps {
  currentHeight?: number;
  currentWeight?: number;
  onNext?: (goalWeight: number) => void;
}

export default function Step11Page({
  currentHeight = 165,
  currentWeight = 65,
  onNext,
}: Step11PageProps) {
  const [goalWeight, setGoalWeight] = useState(currentWeight - 2);

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={11} />

      <div className="px-[26px] pb-[24px]">
        <p className="mt-[8px] font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
          목표 몸무게가 어떻게 되시나요?
        </p>

        <div className="mt-[24px] rounded-[8px] border-[1.5px] border-[#2F80FF] bg-[#E4EEFF] p-[16px]">
          <div className="flex items-center gap-[6px]">
            <Sparkles className="size-[14px] text-[#2F80FF]" />
            <p className="font-['Pretendard',sans-serif] text-[13px] font-semibold text-[#2F80FF]">
              건강한 목표 몸무게를 추천 드렸어요
            </p>
          </div>
          <p className="mt-[6px] font-['Pretendard',sans-serif] text-[12px] text-[#64748B]">
            {currentHeight}cm·{currentWeight}kg 기준의 건강한 목표 체중이에요.
          </p>
          <p className="mt-[2px] font-['Pretendard',sans-serif] text-[11px] text-[#94A3B8]">
            WHO · 대한비만학회 건강 체중 BMI 기준
          </p>
        </div>

        <NumberField value={goalWeight} onChange={setGoalWeight} unit="kg" />

        <Button
          type="button"
          onClick={() => onNext?.(goalWeight)}
          className="mt-[48px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
