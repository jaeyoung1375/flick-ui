"use client";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface LandingPageProps {
  /** "시작하기" 버튼 클릭 핸들러 (기본: 온보딩 Step 1로 이동) */
  onGetStarted?: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const router = useRouter();

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
      return;
    }
    router.push("/onboarding/step-1");
  };

  return (
    <div className="flex min-h-screen w-full max-w-[402px] mx-auto flex-col bg-[#F4F8FF]">
      {/* 히어로 영역 */}
      <div className="flex flex-1 items-center justify-center rounded-b-[40px] bg-[#E4EEFF]">
        <div className="flex size-[170px] items-center justify-center rounded-full bg-[#2F80FF]">
          <Heart
            className="size-[64px] text-white"
            strokeWidth={1.5}
            fill="white"
          />
        </div>
      </div>

      {/* 텍스트 + 버튼 */}
      <div className="w-full px-[26px] pb-[34px] pt-[28px]">
        <p className="mb-[6px] font-['Poppins',sans-serif] text-[22px] font-semibold text-[#0B1220]">
          Motive
        </p>
        <p className="mb-[24px] font-['Pretendard',sans-serif] text-[14px] text-[#64748B]">
          오늘의 동기부여, 모티브와 함께 시작해요
        </p>
        <button
          type="button"
          onClick={handleGetStarted}
          className="h-[53px] w-full cursor-pointer rounded-[8px] border-none bg-[#2F80FF] font-['Pretendard',sans-serif] text-[17px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
