// CreateAccountPage.tsx
// Motive – 계정 만들기 화면
// Figma: node-id 12:2 ("Create account page")
"use client";
import { Check, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Header from "@/app/components/layout/Header";

const imgGoogle = "https://img.icons8.com/?id=17949&format=png&size=64";
const imgKakao = "https://img.icons8.com/?id=BH0XTdh770dG&format=png&size=64";
const imgGithub =
  "https://img.icons8.com/?id=12599&format=png&size=64&color=ffffff";

interface CreateAccountPageProps {
  onSubmit?: (data: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => void;
}

export default function CreateAccountPage({
  onSubmit,
}: CreateAccountPageProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ name, phone, email, password });
  };

  const handleGoogleSignup = () => {
    window.location.href = process.env.NEXT_PUBLIC_OAUTH_GOOGLE_URL!;
  };

  const handleKakaoSignup = () => {
    window.location.href = process.env.NEXT_PUBLIC_OAUTH_KAKAO_URL!;
  };

  const handleGithubSignup = () => {
    window.location.href = process.env.NEXT_PUBLIC_OAUTH_GITHUB_URL!;
  };

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      {/* 뒤로가기 */}
      <Header variant="back" />

      <div className="px-[26px] pb-[34px]">
        {/* 헤딩 */}
        <div className="mt-[8px]">
          <p className="font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
            계정 만들기
          </p>
          <p className="mt-[6px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
            가입을 위해 아래 정보를 입력해주세요
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="mt-[28px] flex flex-col gap-[18px]">
          {/* 이름 */}
          <div>
            <label
              htmlFor="name"
              className="mb-[6px] block font-['Pretendard',sans-serif] text-[13px] font-medium text-[#0B1220]"
            >
              이름
            </label>
            <div className="relative flex h-[47px] items-center rounded-[8px] border-[1.5px] border-[#E2E8F0] bg-white px-[14px]">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                className="size-full bg-transparent font-['Pretendard',sans-serif] text-[14px] text-[#0B1220] placeholder:text-[#94A3B8] focus:outline-none"
              />
            </div>
          </div>

          {/* 전화번호 */}
          <div>
            <label
              htmlFor="phone"
              className="mb-[6px] block font-['Pretendard',sans-serif] text-[13px] font-medium text-[#0B1220]"
            >
              전화번호
            </label>
            <div className="relative flex h-[47px] items-center rounded-[8px] border-[1.5px] border-[#E2E8F0] bg-white px-[14px]">
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-1234-5678"
                className="size-full bg-transparent font-['Pretendard',sans-serif] text-[14px] text-[#0B1220] placeholder:text-[#94A3B8] focus:outline-none"
              />
            </div>
          </div>

          {/* 이메일 */}
          <div>
            <label
              htmlFor="email"
              className="mb-[6px] block font-['Pretendard',sans-serif] text-[13px] font-medium text-[#0B1220]"
            >
              이메일
            </label>
            <div className="relative flex h-[47px] items-center rounded-[8px] border-[1.5px] border-[#2F80FF] bg-white px-[14px]">
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@motive.com"
                className="size-full bg-transparent font-['Pretendard',sans-serif] text-[14px] text-[#0B1220] placeholder:text-[#94A3B8] focus:outline-none"
              />
              {email && <Check className="size-[16px] shrink-0 text-[#2F80FF]" />}
            </div>
          </div>

          {/* 비밀번호 */}
          <div>
            <label
              htmlFor="password"
              className="mb-[6px] block font-['Pretendard',sans-serif] text-[13px] font-medium text-[#0B1220]"
            >
              비밀번호
            </label>
            <div className="relative flex h-[47px] items-center rounded-[8px] border-[1.5px] border-[#E2E8F0] bg-white px-[14px]">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className="size-full bg-transparent font-['Pretendard',sans-serif] text-[14px] text-[#0B1220] placeholder:text-[#94A3B8] focus:outline-none"
              />
              <EyeOff className="size-[16px] shrink-0 text-[#94A3B8]" />
            </div>
          </div>

          {/* 계정 만들기 버튼 */}
          <button
            type="submit"
            className="mt-[8px] h-[53px] w-full cursor-pointer rounded-[8px] border-none bg-[#2F80FF] font-['Pretendard',sans-serif] text-[17px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
          >
            계정 만들기
          </button>
        </form>

        {/* 소셜 회원가입 */}
        <p className="mt-[22px] text-center font-['Pretendard',sans-serif] text-[12px] text-[#94A3B8]">
          또는 다음으로 계속하기
        </p>

        <div className="mt-[14px] flex flex-col gap-[10px]">
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="flex h-[46px] cursor-pointer items-center justify-center gap-[10px] rounded-[8px] border border-[#E2E8F0] bg-white transition-opacity hover:opacity-90"
          >
            <img src={imgGoogle} alt="" className="size-[16px]" />
            <span className="font-['Pretendard',sans-serif] text-[13px] text-[#0B1220]">
              Google로 계속하기
            </span>
          </button>

          <button
            type="button"
            onClick={handleKakaoSignup}
            className="flex h-[46px] cursor-pointer items-center justify-center gap-[10px] rounded-[8px] border-none bg-[#fee500] transition-opacity hover:opacity-90"
          >
            <img src={imgKakao} alt="" className="size-[16px]" />
            <span className="font-['Pretendard',sans-serif] text-[13px] text-[#191919]">
              카카오로 계속하기
            </span>
          </button>

          <button
            type="button"
            onClick={handleGithubSignup}
            className="flex h-[46px] cursor-pointer items-center justify-center gap-[10px] rounded-[8px] border-none bg-[#181717] transition-opacity hover:opacity-90"
          >
            <img src={imgGithub} alt="" className="size-[16px]" />
            <span className="font-['Pretendard',sans-serif] text-[13px] text-white">
              GitHub로 계속하기
            </span>
          </button>
        </div>

        {/* 로그인 링크 */}
        <Link
          href="/login"
          className="mt-[24px] block w-full text-center font-['Pretendard',sans-serif] text-[13px] font-medium text-[#0B1220]"
        >
          {"이미 계정이 있으신가요? "}
          <span className="text-[#2F80FF]">로그인</span>
        </Link>
      </div>
    </div>
  );
}
