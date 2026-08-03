// Step2Page.tsx
// Motive – 온보딩 Step 2: 성별 선택
"use client";
import { useState } from "react";
import OnboardingHeader from "./components/OnboardingHeader";
import SelectOption from "./components/SelectOption";
import { useCodeQuery } from "@/features/code/code.query";
import Button from "@/components/Button";

interface Step2PageProps {
  onNext?: (gender: string) => void;
}

export default function Step2Page({ onNext }: Step2PageProps) {
  // 성별 구분코드 조회
  const { data: genders = [] } = useCodeQuery({ comCdId: "GENDER_CD" });

  const [gender, setGender] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={2} />

      <div className="px-[26px] pb-[24px]">
        <p className="mt-[8px] font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
          성별이 어떻게 되시나요?
        </p>
        <p className="mt-[6px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
          적절한 운동 추천에 필요해요! 외부에 공개되지 않아요.
        </p>

        <div className="mt-[32px] flex flex-col gap-[12px]">
          {genders.map(({ dtlCdId, dtlCdNm }) => (
            <SelectOption
              key={dtlCdId}
              title={dtlCdNm}
              selected={gender === dtlCdId}
              onClick={() => setGender(dtlCdId)}
            />
          ))}
        </div>

        <Button
          type="button"
          disabled={!gender}
          onClick={() => gender && onNext?.(gender)}
          className="mt-[40px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
