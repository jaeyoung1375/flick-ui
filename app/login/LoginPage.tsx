// LoginPage.tsx
// HealthSync – 로그인 화면
// Figma: node-id 2:2 ("Login page")
//
// ⚠️ 이미지 에셋 안내: LandingPage.tsx 상단 주석 참고 (Figma 임시 URL, ~7일 유효)
"use client";
import { Check, ChevronLeft, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
    <div className="relative min-h-screen w-full bg-ott-bg bg-[radial-gradient(120%_50%_at_50%_-10%,rgba(38,199,158,0.16),transparent_60%)]">
      {/* 뒤로가기 */}
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="뒤로 가기"
        className="absolute left-6 top-6 flex size-[36px] cursor-pointer items-center justify-center rounded-full bg-white/5 text-white"
      >
        <ChevronLeft className="size-[20px]" />
      </button>

      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col justify-center px-[26px] py-[64px]">
        {/* 로고 & 헤딩 */}
        <div className="text-center">
          <p className="font-['Pretendard',sans-serif] text-[34px] font-extrabold tracking-tight text-white">
            FLICK
          </p>
          <p className="mt-[10px] font-['Pretendard',sans-serif] text-[13px] text-ott-text-muted">
            로그인하고 계속 진행해보세요
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="mt-[36px]">
          {/* 이메일 */}
          <div>
            <label
              htmlFor="email"
              className="mb-[6px] block font-['Pretendard',sans-serif] text-[13px] font-medium text-white/80"
            >
              이메일 또는 전화번호
            </label>
            <div className="relative flex h-[52px] items-center rounded-[16px] border border-white/10 bg-ott-surface px-[16px] focus-within:border-ott-accent">
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@motive.com"
                className="size-full bg-transparent font-['Pretendard',sans-serif] text-[14px] text-white placeholder:text-ott-text-muted/60 focus:outline-none"
              />
              {email && (
                <Check className="size-[16px] shrink-0 text-ott-accent" />
              )}
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="mt-[18px]">
            <label
              htmlFor="password"
              className="mb-[6px] block font-['Pretendard',sans-serif] text-[13px] font-medium text-white/80"
            >
              비밀번호
            </label>
            <div className="relative flex h-[52px] items-center rounded-[16px] border border-white/10 bg-ott-surface px-[16px] focus-within:border-ott-accent">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className="size-full bg-transparent font-['Pretendard',sans-serif] text-[14px] text-white placeholder:text-ott-text-muted/60 focus:outline-none"
              />
              <EyeOff className="size-[16px] shrink-0 text-ott-text-muted" />
            </div>
          </div>

          {/* 비밀번호 찾기 */}
          <button
            type="button"
            onClick={onForgotPassword}
            className="mt-[10px] block cursor-pointer font-['Pretendard',sans-serif] text-[13px] font-medium text-ott-accent"
          >
            비밀번호를 잊으셨나요?
          </button>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="mt-[24px] h-[52px] w-full cursor-pointer rounded-full border-none bg-ott-accent font-['Pretendard',sans-serif] text-[16px] font-bold text-black transition-opacity hover:opacity-90 active:opacity-80"
          >
            로그인
          </button>
        </form>

        {/* 구분선 */}
        <div className="mt-[28px] flex items-center gap-[12px]">
          <div className="h-px flex-1 bg-white/10" />
          <span className="font-['Pretendard',sans-serif] text-[12px] text-ott-text-muted">
            또는
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* 소셜 로그인 */}
        <div className="mt-[18px] flex flex-col gap-[12px]">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-[52px] cursor-pointer items-center justify-center gap-[10px] rounded-full border border-white/10 bg-ott-surface transition-opacity hover:opacity-90"
          >
            <img src={imgGoogle} alt="" className="size-[18px]" />
            <span className="font-['Pretendard',sans-serif] text-[14px] font-medium text-white">
              Google로 로그인
            </span>
          </button>

          <button
            type="button"
            onClick={handleKakaoLogin}
            className="flex h-[52px] cursor-pointer items-center justify-center gap-[10px] rounded-full border border-white/10 bg-ott-surface transition-opacity hover:opacity-90"
          >
            <img src={imgKakao} alt="" className="size-[18px]" />
            <span className="font-['Pretendard',sans-serif] text-[14px] font-medium text-white">
              카카오로 로그인
            </span>
          </button>

          <button
            type="button"
            onClick={handleGithubLogin}
            className="flex h-[52px] cursor-pointer items-center justify-center gap-[10px] rounded-full border border-white/10 bg-ott-surface transition-opacity hover:opacity-90"
          >
            <img src={imgGithub} alt="" className="size-[18px]" />
            <span className="font-['Pretendard',sans-serif] text-[14px] font-medium text-white">
              GitHub로 로그인
            </span>
          </button>
        </div>

        {/* 회원가입 링크 */}
        <button
          type="button"
          onClick={onRegister}
          className="mt-[28px] block w-full cursor-pointer text-center font-['Pretendard',sans-serif] text-[13px] font-medium text-white/70"
        >
          {"계정이 없으신가요? "}
          <span className="text-ott-accent">회원가입</span>
        </button>
      </div>
    </div>
  );
}
