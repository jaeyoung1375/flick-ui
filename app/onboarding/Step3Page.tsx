// Step3Page.tsx
// Motive – 온보딩 Step 3: 생년월일 입력
"use client";
import { useState } from "react";
import { format } from "date-fns";
import OnboardingHeader from "./components/OnboardingHeader";
import BirthDatePicker from "@/components/BirthDatePicker";
import Button from "@/components/Button";

interface Step3PageProps {
  onNext?: (birthDate: string) => void;
}

export default function Step3Page({ onNext }: Step3PageProps) {
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={3} />

      <div className="px-[26px] pb-[24px]">
        <p className="mt-[8px] font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
          생년월일이 어떻게 되시나요?
        </p>
        <p className="mt-[6px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
          나이는 신체 수준을 파악하여 운동 플랜을 제공하는데 필요해요. 절대
          외부에 공개되지 않아요.
        </p>

        <div className="mt-[32px]">
          <BirthDatePicker
            value={birthDate}
            onChange={setBirthDate}
            placeholder="생년월일 선택"
            className="h-[47px]"
          />
        </div>

        <Button
          type="button"
          disabled={!birthDate}
          onClick={() => birthDate && onNext?.(format(birthDate, "yyyyMMdd"))}
          className="mt-[40px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
