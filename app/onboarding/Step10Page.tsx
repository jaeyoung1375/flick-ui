// Step10Page.tsx
// Motive – 온보딩 Step 10: 현재 몸무게 입력
"use client";
import { useState } from "react";
import NumberField from "./components/NumberField";
import OnboardingHeader from "./components/OnboardingHeader";
import Button from "@/components/Button";

interface Step10PageProps {
  onNext?: (weight: number) => void;
}

export default function Step10Page({ onNext }: Step10PageProps) {
  const [weight, setWeight] = useState(65);

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={10} />

      <div className="px-[26px] pb-[24px]">
        <p className="mt-[8px] font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
          현재 몸무게가 어떻게 되시나요?
        </p>
        <p className="mt-[6px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
          알려주신 정보로 회원님께 딱 맞는 플랜을 추천해드릴게요.
        </p>

        <NumberField value={weight} onChange={setWeight} unit="kg" />

        <Button
          type="button"
          onClick={() => onNext?.(weight)}
          className="mt-[48px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
