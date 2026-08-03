// VerifyAccountPage.tsx
// Motive – 계정 인증(OTP) 화면
// Figma: node-id 17:120 ("Verify Account page")
"use client";
import { useRef, useState } from "react";
import Header from "@/app/components/layout/Header";

const CODE_LENGTH = 4;

interface VerifyAccountPageProps {
  email?: string;
  onSubmit?: (code: string) => void;
  onResend?: () => void;
}

export default function VerifyAccountPage({
  email = "example@motive.com",
  onSubmit,
  onResend,
}: VerifyAccountPageProps) {
  const [codes, setCodes] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...codes];
    next[index] = digit;
    setCodes(next);

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(codes.join(""));
  };

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      {/* 뒤로가기 */}
      <Header variant="back" />

      <div className="px-[26px] pb-[24px]">
        {/* 헤딩 */}
        <div className="mt-[8px]">
          <p className="font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
            계정 인증
          </p>
          <p className="mt-[6px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
            {email}로 전송된 인증번호 {CODE_LENGTH}자리를 입력해주세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-[32px]">
          {/* OTP 입력 */}
          <div className="flex justify-center gap-[16px]">
            {codes.map((code, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="size-[51px] rounded-[8px] border-[1.5px] border-[#E2E8F0] bg-white text-center font-['Pretendard',sans-serif] text-[20px] font-semibold text-[#0B1220] focus:border-[#2F80FF] focus:outline-none"
              />
            ))}
          </div>

          {/* 재전송 */}
          <button
            type="button"
            onClick={onResend}
            className="mt-[18px] block w-full cursor-pointer text-center font-['Pretendard',sans-serif] text-[13px] font-medium text-[#2F80FF] underline"
          >
            인증번호 재전송
          </button>

          {/* 인증하기 버튼 */}
          <button
            type="submit"
            className="mt-[24px] h-[53px] w-full cursor-pointer rounded-[8px] border-none bg-[#2F80FF] font-['Pretendard',sans-serif] text-[17px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
          >
            인증하기
          </button>
        </form>
      </div>
    </div>
  );
}
