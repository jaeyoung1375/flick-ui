// Step7Page.tsx
// Motive – 온보딩 Step 7: 사용 기구 선택
"use client";
import { useState } from "react";
import OnboardingHeader from "./components/OnboardingHeader";
import SelectOption from "./components/SelectOption";
import Button from "@/components/Button";
import { useCodeQuery } from "@/features/code/code.query";

interface Step7PageProps {
  onNext?: (equipment: string) => void;
}

export default function Step7Page({ onNext }: Step7PageProps) {
  // 운동 장비 구분코드 조회
  const { data: equipments = [] } = useCodeQuery({ comCdId: "EQUIPMENTS_CD" });

  const [equipment, setEquipment] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={7} />

      <div className="px-[26px] pb-[24px]">
        <p className="mt-[8px] font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
          운동할 때 어떤 기구를 가장 자주 쓰시나요?
        </p>
        <p className="mt-[6px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
          사용하고 있는 기구에 딱 맞게 추천해 드릴게요.
        </p>

        <div className="mt-[24px] flex flex-col gap-[12px]">
          {equipments.map(({ dtlCdId, dtlCdNm, dtlCdExpln }) => (
            <SelectOption
              key={dtlCdId}
              title={dtlCdNm}
              description={dtlCdExpln}
              selected={equipment === dtlCdId}
              onClick={() => setEquipment(dtlCdId)}
            />
          ))}
        </div>

        <Button
          type="button"
          disabled={!equipment}
          onClick={() => equipment && onNext?.(equipment)}
          className="mt-[24px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
