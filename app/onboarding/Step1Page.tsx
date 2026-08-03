// Step1Page.tsx
// Motive – 온보딩 Step 1: 사용할 이름 입력
"use client";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import OnboardingHeader from "./components/OnboardingHeader";
import Button from "@/components/Button";

interface Step1PageProps {
  onNext?: (name: string) => void;
}

export default function Step1Page({ onNext }: Step1PageProps) {
  const [name, setName] = useState<string>("");

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={1} />

      <div className="px-[26px] pb-[24px]">
        <p className="mt-[8px] font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
          사용할 이름을 입력해 주세요
        </p>

        <div className="mt-[40px] flex justify-center">
          <Button
            type="button"
            variant="ghost"
            aria-label="프로필 사진 추가"
            className="flex size-[100px] items-center justify-center rounded-full border-[1.5px] border-dashed border-[#94A3B8] bg-white p-0 hover:bg-white"
          >
            <UserPlus
              className="size-[32px] text-[#94A3B8]"
              strokeWidth={1.5}
            />
          </Button>
        </div>

        <div className="mt-[24px] flex h-[47px] items-center rounded-[8px] border-[1.5px] border-[#E2E8F0] bg-white px-[14px]">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
            className="size-full bg-transparent font-['Pretendard',sans-serif] text-[14px] text-[#0B1220] placeholder:text-[#94A3B8] focus:outline-none"
          />
        </div>

        <Button
          type="button"
          disabled={!name.trim()}
          onClick={() => onNext?.(name)}
          className="mt-[40px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
