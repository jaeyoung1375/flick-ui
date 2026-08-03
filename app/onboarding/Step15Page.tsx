// Step15Page.tsx
// Motive – 온보딩 완료: 맞춤 운동 플랜 요약
"use client";
import { Target } from "lucide-react";
import Button from "@/components/Button";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useCodeQuery } from "@/features/code/code.query";

interface Step15PageProps {
  goal: string;
  weeklyCount: number | null;
  levelCd: string;
  equipmentCd: string;
  height: number;
  weight: number;
  onFinish?: () => void;
}

export default function Step15Page({
  goal,
  weeklyCount,
  levelCd,
  equipmentCd,
  height,
  weight,
  onFinish,
}: Step15PageProps) {
  console.log(useOnboardingStore.getState());

  const { data: goals = [] } = useCodeQuery({ comCdId: "GOAL_CD" });
  const { data: equipments = [] } = useCodeQuery({ comCdId: "EQUIPMENTS_CD" });
  const { data: levels = [] } = useCodeQuery({ comCdId: "HEALTH_LEVEL_CD" });

  const stats = [
    {
      label: "추천 수준",
      value: levels.find((item) => item.dtlCdId === levelCd)?.dtlCdNm ?? "입문",
    },
    { label: "몸무게", value: `${weight}kg` },
    { label: "키", value: `${height}cm` },
    { label: "주간 운동 횟수", value: weeklyCount ? `주 ${weeklyCount}회` : "주 3회" },
    {
      label: "운동 목표",
      value: goals.find((item) => item.dtlCdId === goal)?.dtlCdNm ?? "다이어트",
    },
    {
      label: "운동 장비",
      value:
        equipments.find((item) => item.dtlCdId === equipmentCd)?.dtlCdNm ??
        "맨몸 운동",
    },
  ];

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <div className="px-[26px] pt-[40px] pb-[24px]">
        <p className="font-['Pretendard',sans-serif] text-[24px] font-bold leading-snug text-[#0B1220]">
          내게 꼭 맞는 맞춤 운동
          <br />
          플랜이 준비됐어요!
        </p>
        <p className="mt-[12px] font-['Pretendard',sans-serif] text-[14px] text-[#64748B]">
          알려주신 정보와 수천만 개의 운동 기록을 비교했어요.
        </p>

        <div className="mt-[24px] rounded-[16px] border-[1.5px] border-[#2F80FF] bg-white p-[24px]">
          <div className="flex items-center gap-[12px]">
            <div className="flex size-[44px] items-center justify-center rounded-full bg-[#E4EEFF]">
              <Target className="size-[22px] text-[#2F80FF]" />
            </div>
            <p className="font-['Pretendard',sans-serif] text-[18px] font-bold text-[#0B1220]">
              나만의 운동 루틴
            </p>
          </div>

          <div className="mt-[24px] grid grid-cols-3 gap-y-[20px] border-t border-[#E2E8F0] pt-[20px]">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-['Pretendard',sans-serif] text-[12px] text-[#94A3B8]">
                  {label}
                </p>
                <p className="mt-[4px] font-['Pretendard',sans-serif] text-[14px] font-bold text-[#0B1220]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Button
          type="button"
          onClick={onFinish}
          className="mt-[32px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
