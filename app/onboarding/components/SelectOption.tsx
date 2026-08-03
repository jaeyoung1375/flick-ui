// SelectOption.tsx
// 온보딩 단일 선택 항목 (성별 / 운동 수준 / 기구 / 트레이닝 경력 등에서 사용)
"use client";
import Button from "@/components/Button";
import { cn } from "@/util/cn";

interface SelectOptionProps {
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

export default function SelectOption({
  title,
  description,
  selected,
  onClick,
}: SelectOptionProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className={cn(
        "h-auto w-full justify-start rounded-[8px] border-[1.5px] px-[18px] py-[14px] text-left transition-colors",
        selected
          ? "border-[#2F80FF] bg-[#E4EEFF] hover:bg-[#E4EEFF]"
          : "border-[#E2E8F0] bg-white hover:bg-white",
      )}
    >
      <div>
        <p className="font-['Pretendard',sans-serif] text-[15px] font-semibold text-[#0B1220]">
          {title}
        </p>
        {description && (
          <p className="mt-[4px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
            {description}
          </p>
        )}
      </div>
    </Button>
  );
}
