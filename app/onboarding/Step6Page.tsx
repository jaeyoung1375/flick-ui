// Step6Page.tsx
// Motive – 온보딩 Step 6: 운동 수준 선택
"use client";
import { useState } from "react";
import OnboardingHeader from "./components/OnboardingHeader";
import SelectOption from "./components/SelectOption";
import Button from "@/components/Button";
import { useCodeQuery } from "@/features/code/code.query";

interface Step6PageProps {
  onNext?: (level: string) => void;
}

export default function Step6Page({ onNext }: Step6PageProps) {
  // 운동레벨수준 구분 코드 조회
  const { data: levels = [] } = useCodeQuery({ comCdId: "HEALTH_LEVEL_CD" });

  const [level, setLevel] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={6} />

      <div className="px-[26px] pb-[24px]">
        <p className="mt-[8px] font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
          운동 수준이 어떻게 되시나요?
        </p>
        <p className="mt-[6px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
          적절한 운동 추천에 필요해요! 외부에 공개되지 않아요.
        </p>

        <div className="mt-[24px] flex flex-col gap-[12px]">
          {levels.map(({ dtlCdId, dtlCdNm, dtlCdExpln }) => (
            <SelectOption
              key={dtlCdId}
              title={dtlCdNm}
              description={dtlCdExpln}
              selected={level === dtlCdId}
              onClick={() => setLevel(dtlCdId)}
            />
          ))}
        </div>

        <Button
          type="button"
          disabled={!level}
          onClick={() => level && onNext?.(level)}
          className="mt-[24px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
