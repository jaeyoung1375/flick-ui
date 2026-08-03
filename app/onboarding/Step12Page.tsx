// Step12Page.tsx
// Motive – 온보딩 Step 12: 웨이트 트레이닝 경력
"use client";
import { useState } from "react";
import OnboardingHeader from "./components/OnboardingHeader";
import SelectOption from "./components/SelectOption";
import Button from "@/components/Button";
import { useCodeQuery } from "@/features/code/code.query";

interface Step12PageProps {
  onNext?: (experience: string) => void;
}

export default function Step12Page({ onNext }: Step12PageProps) {
  // 운동경력 구분코드 조회
  const { data: experiences = [] } = useCodeQuery({ comCdId: "EXPERIENCE_CD" });

  const [experience, setExperience] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={12} />

      <div className="px-[26px] pb-[24px]">
        <p className="mt-[8px] font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
          규칙적으로 웨이트 트레이닝을 한 지 얼마나 됐나요?
        </p>

        <div className="mt-[32px] flex flex-col gap-[12px]">
          {experiences.map(({ dtlCdId, dtlCdNm }) => (
            <SelectOption
              key={dtlCdId}
              title={dtlCdNm}
              selected={experience === dtlCdId}
              onClick={() => setExperience(dtlCdId)}
            />
          ))}
        </div>

        <Button
          type="button"
          disabled={!experience}
          onClick={() => experience && onNext?.(experience)}
          className="mt-[32px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
