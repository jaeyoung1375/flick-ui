// YesNoQuestion.tsx
// 온보딩 운동 경험 확인 화면 (스쿼트 / 벤치프레스 등에서 재사용)
"use client";
import { Check, Dumbbell, X } from "lucide-react";
import Button from "@/components/Button";
import { cn } from "@/util/cn";

interface YesNoQuestionProps {
  exerciseName: string;
  answer: boolean | null;
  onAnswer: (value: boolean) => void;
}

export default function YesNoQuestion({
  exerciseName,
  answer,
  onAnswer,
}: YesNoQuestionProps) {
  return (
    <>
      <p className="mt-[8px] font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
        아래 운동을 해본 적이 있나요?
      </p>

      <div className="mt-[40px] flex justify-center">
        <div className="flex size-[140px] items-center justify-center rounded-full bg-[#E4EEFF]">
          <Dumbbell className="size-[56px] text-[#2F80FF]" strokeWidth={1.5} />
        </div>
      </div>
      <p className="mt-[16px] text-center font-['Pretendard',sans-serif] text-[16px] font-semibold text-[#0B1220]">
        {exerciseName}
      </p>

      <div className="mt-[32px] flex gap-[12px]">
        <Button
          type="button"
          variant="ghost"
          onClick={() => onAnswer(false)}
          className={cn(
            "flex h-[80px] flex-1 flex-col items-center justify-center gap-[6px] rounded-[8px] border-[1.5px] transition-colors",
            answer === false
              ? "border-[#2F80FF] bg-[#E4EEFF] hover:bg-[#E4EEFF]"
              : "border-[#E2E8F0] bg-white hover:bg-white",
          )}
        >
          <X className="size-[20px] text-[#64748B]" />
          <span className="font-['Pretendard',sans-serif] text-[14px] font-semibold text-[#0B1220]">
            아니오
          </span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => onAnswer(true)}
          className={cn(
            "flex h-[80px] flex-1 flex-col items-center justify-center gap-[6px] rounded-[8px] border-[1.5px] transition-colors",
            answer === true
              ? "border-[#2F80FF] bg-[#E4EEFF] hover:bg-[#E4EEFF]"
              : "border-[#E2E8F0] bg-white hover:bg-white",
          )}
        >
          <Check className="size-[20px] text-[#2F80FF]" />
          <span className="font-['Pretendard',sans-serif] text-[14px] font-semibold text-[#0B1220]">
            네
          </span>
        </Button>
      </div>
    </>
  );
}
