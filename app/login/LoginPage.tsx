// LoginPage.tsx
// HealthSync – 로그인 화면
// Figma: node-id 2:2 ("Login page")
//
// ⚠️ 이미지 에셋 안내: LandingPage.tsx 상단 주석 참고 (Figma 임시 URL, ~7일 유효)
"use client";
import { Check, EyeOff } from "lucide-react";
import { useState } from "react";
import Header from "@/app/components/layout/Header";

// 국내에서 흔히 쓰는 소셜 로그인 3종 (Google / Kakao / GitHub) 브랜드 아이콘
const imgGoogle = "https://img.icons8.com/?id=17949&format=png&size=64";
const imgKakao = "https://img.icons8.com/?id=BH0XTdh770dG&format=png&size=64";
const imgGithub =
  "https://img.icons8.com/?id=12599&format=png&size=64&color=ffffff";

interface LoginPageProps {
  onForgotPassword?: () => void;
  onRegister?: () => void;
  onSubmit?: (email: string, password: string) => void;
}

export default function Login({
  onForgotPassword,
  onRegister,
  onSubmit,
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email, password);
  };

  const handleGoogleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_OAUTH_GOOGLE_URL!;
  };

  const handleKakaoLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_OAUTH_KAKAO_URL!;
  };

  const handleGithubLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_OAUTH_GITHUB_URL!;
  };

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      {/* 뒤로가기 */}
      <Header variant="back" />

      <div className="px-[26px] pb-[24px]">
        {/* 헤딩 */}
        <div className="mt-[20px]">
          <p className="font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
            Motive에 오신 걸 환영해요
          </p>
          <p className="mt-[6px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
            로그인하고 계속 진행해보세요
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="mt-[28px]">
          {/* 이메일 */}
          <div>
            <label
              htmlFor="email"
              className="mb-[6px] block font-['Pretendard',sans-serif] text-[13px] font-medium text-[#0B1220]"
            >
              이메일 또는 전화번호
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
              {email && (
                <Check className="size-[16px] shrink-0 text-[#2F80FF]" />
              )}
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="mt-[18px]">
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

          {/* 비밀번호 찾기 */}
          <button
            type="button"
            onClick={onForgotPassword}
            className="mt-[10px] block cursor-pointer font-['Pretendard',sans-serif] text-[13px] font-medium text-[#2F80FF]"
          >
            비밀번호를 잊으셨나요?
          </button>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="mt-[22px] h-[47px] w-full cursor-pointer rounded-[8px] border-none bg-[#2F80FF] font-['Pretendard',sans-serif] text-[16px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
          >
            로그인
          </button>
        </form>

        {/* 소셜 로그인 */}
        <p className="mt-[22px] text-center font-['Pretendard',sans-serif] text-[12px] text-[#94A3B8]">
          또는 다음으로 로그인
        </p>

        <div className="mt-[14px] flex flex-col gap-[10px]">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-[46px] cursor-pointer items-center justify-center gap-[10px] rounded-[8px] border border-[#E2E8F0] bg-white transition-opacity hover:opacity-90"
          >
            <img src={imgGoogle} alt="" className="size-[16px]" />
            <span className="font-['Pretendard',sans-serif] text-[13px] text-[#0B1220]">
              Google로 로그인
            </span>
          </button>

          <button
            type="button"
            onClick={handleKakaoLogin}
            className="flex h-[46px] cursor-pointer items-center justify-center gap-[10px] rounded-[8px] border-none bg-[#fee500] transition-opacity hover:opacity-90"
          >
            <img src={imgKakao} alt="" className="size-[16px]" />
            <span className="font-['Pretendard',sans-serif] text-[13px] text-[#191919]">
              카카오로 로그인
            </span>
          </button>

          <button
            type="button"
            onClick={handleGithubLogin}
            className="flex h-[46px] cursor-pointer items-center justify-center gap-[10px] rounded-[8px] border-none bg-[#181717] transition-opacity hover:opacity-90"
          >
            <img src={imgGithub} alt="" className="size-[16px]" />
            <span className="font-['Pretendard',sans-serif] text-[13px] text-white">
              GitHub로 로그인
            </span>
          </button>
        </div>

        {/* 회원가입 링크 */}
        <button
          type="button"
          onClick={onRegister}
          className="mt-[24px] block w-full cursor-pointer text-center font-['Pretendard',sans-serif] text-[13px] font-medium text-[#0B1220]"
        >
          {"계정이 없으신가요? "}
          <span className="text-[#2F80FF]">회원가입</span>
        </button>
      </div>
    </div>
  );
}
