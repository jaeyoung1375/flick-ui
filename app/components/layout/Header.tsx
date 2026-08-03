"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, PenSquare } from "lucide-react";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import NotificationDropdown from "./NotificationDropdown";

interface HeaderProps {
  /** "back": 모바일 페이지용 뒤로가기 헤더, "default": 데스크탑 상단 네비 */
  variant?: "default" | "back";
  /** variant="back"일 때 뒤로가기 버튼 옆에 표시할 제목 */
  title?: string;
  /** variant="back"일 때 뒤로가기 동작. 미지정 시 router.back() 사용 */
  onBack?: () => void;
}

export default function Header({
  variant = "default",
  title,
  onBack,
}: HeaderProps = {}) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [isLoginOpen, setIsLoginOpen] = useState(false); // 로그인 모달 열림 여부

  if (variant === "back") {
    const handleBack = () => {
      if (onBack) {
        onBack();
        return;
      }
      router.back();
    };

    return (
      <header className="sticky top-0 z-50 mx-auto w-full max-w-[402px] bg-[#F4F8FF] px-[26px] py-[24px]">
        <div className="flex items-center gap-[12px]">
          <button
            type="button"
            onClick={handleBack}
            aria-label="뒤로 가기"
            className="flex size-[36px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-[#0B1220]"
          >
            <ChevronLeft className="size-[20px]" />
          </button>
          {title && (
            <p className="font-['Pretendard',sans-serif] text-[16px] font-semibold text-[#0B1220]">
              {title}
            </p>
          )}
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* 로고 */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Motive Logo"
                width={240}
                height={100}
                className="h-16 w-32"
                priority
              />
            </Link>

            <div className="flex items-center gap-3"></div>
          </div>
        </div>
      </header>
    </>
  );
}
