// OnboardingHeader.tsx
// 온보딩 공통 상단 영역 - 뒤로가기 / 진행률 바 / (선택) 건너뛰기
"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const TOTAL_STEPS = 14;

interface OnboardingHeaderProps {
  step: number;
  onSkip?: () => void;
}

export default function OnboardingHeader({ step, onSkip }: OnboardingHeaderProps) {
  const router = useRouter();
  const progress = Math.min(step / TOTAL_STEPS, 1) * 100;

  return (
    <div className="px-[26px] pt-[24px]">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          aria-label="뒤로 가기"
          className="flex size-[36px] items-center justify-center rounded-full bg-white p-0 text-[#0B1220] hover:bg-white"
        >
          <ChevronLeft className="size-[20px]" />
        </Button>
        {onSkip && (
          <Button
            type="button"
            variant="ghost"
            onClick={onSkip}
            className="h-auto px-0 font-['Pretendard',sans-serif] text-[13px] font-semibold text-[#2F80FF] hover:bg-transparent"
          >
            건너뛰기
          </Button>
        )}
      </div>

      <div className="mt-[20px] h-[6px] w-full rounded-full bg-[#E2E8F0]">
        <div
          className="h-full rounded-full bg-[#2F80FF] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
