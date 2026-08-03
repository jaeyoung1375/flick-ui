// Step8Page.tsx
// Motive – 온보딩 Step 8: 헬스장 검색
"use client";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import OnboardingHeader from "./components/OnboardingHeader";
import Button from "@/components/Button";

const MOCK_GYMS = [
  { id: "1", name: "위드핏PT", distance: "116m", address: "서울 영등포구 버드나루로19길 3 양용빌딩 201호" },
  { id: "2", name: "바디클래스", distance: "137m", address: "서울특별시 영등포구 영중로 138-1, 201호 (영등포동8가)" },
  { id: "3", name: "인도어사이클링", distance: "159m", address: "서울특별시 영등포구 영중로 119 (영등포동8가,KT영등포지사 1층)" },
  { id: "4", name: "좋은습관 PT STUDIO", distance: "162m", address: "대한민국 서울특별시 영등포구 버드나루로 102-1 2층" },
];

interface Step8PageProps {
  onNext?: (gymId: string | null) => void;
  onSkip?: () => void;
}

export default function Step8Page({ onNext, onSkip }: Step8PageProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      MOCK_GYMS.filter((gym) =>
        gym.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={8} onSkip={onSkip} />

      <div className="px-[26px] pb-[24px]">
        <div className="mt-[16px] flex h-[47px] items-center gap-[8px] rounded-[8px] border-[1.5px] border-[#E2E8F0] bg-white px-[14px]">
          <Search className="size-[16px] shrink-0 text-[#94A3B8]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="헬스장명, 주소로 검색"
            className="size-full bg-transparent font-['Pretendard',sans-serif] text-[14px] text-[#0B1220] placeholder:text-[#94A3B8] focus:outline-none"
          />
        </div>

        <p className="mt-[20px] font-['Pretendard',sans-serif] text-[13px] font-semibold text-[#64748B]">
          근처 헬스장
        </p>

        <div className="mt-[10px] flex flex-col">
          {filtered.map((gym) => (
            <Button
              key={gym.id}
              type="button"
              variant="ghost"
              onClick={() => setSelected(gym.id)}
              className="flex h-auto items-center justify-between gap-[12px] rounded-none border-b border-[#E2E8F0] px-0 py-[14px] text-left hover:bg-white"
            >
              <div>
                <p className="font-['Pretendard',sans-serif] text-[15px] font-semibold text-[#0B1220]">
                  {gym.name}
                </p>
                <p className="mt-[4px] font-['Pretendard',sans-serif] text-[12px] text-[#64748B]">
                  {gym.distance} · {gym.address}
                </p>
              </div>
              <span
                className={`flex size-[20px] shrink-0 items-center justify-center rounded-full border-[1.5px] ${
                  selected === gym.id
                    ? "border-[#2F80FF] bg-[#2F80FF]"
                    : "border-[#E2E8F0]"
                }`}
              >
                {selected === gym.id && (
                  <span className="size-[8px] rounded-full bg-white" />
                )}
              </span>
            </Button>
          ))}
        </div>

        <Button
          type="button"
          disabled={!selected}
          onClick={() => onNext?.(selected)}
          className="mt-[24px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          헬스장 선택
        </Button>
      </div>
    </div>
  );
}
