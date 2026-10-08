// SignupPage.tsx
// FLICK – 회원가입 화면 (LoginPage와 동일한 디자인 컨셉)
"use client";
import { Check, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Router from "@/util/router";
import { useForm, useWatch } from "react-hook-form";
import { SignupRequest } from "@/features/auth/auth.type";

type SignUpFormValues = SignupRequest & { passwordConfirm: string };

const labelClass =
  "mb-[6px] block font-['Pretendard',sans-serif] text-[13px] font-medium text-white/80";
const boxClass =
  "relative flex h-[52px] items-center rounded-[16px] border bg-ott-surface px-[16px] focus-within:border-ott-accent";
const inputClass =
  "size-full bg-transparent font-['Pretendard',sans-serif] text-[14px] text-white placeholder:text-ott-text-muted/60 focus:outline-none";

export default function Signup() {
  const router = new Router(useRouter());

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormValues>({ mode: "onChange" });

  const [email, password, passwordConfirm, nickname] = useWatch({
    control,
    name: ["email", "password", "passwordConfirm", "nickname"],
  });
  const passwordMatch = !!passwordConfirm && password === passwordConfirm;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = ({ passwordConfirm, ...body }: SignUpFormValues) => {
    // TODO: 가입 API 연결 — mutate(body)
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
            계정을 만들고 FLICK을 시작해보세요
          </p>
        </div>

        {/* 폼 */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[36px] flex flex-col gap-[18px]"
        >
          {/* 이메일 */}
          <div>
            <label htmlFor="email" className={labelClass}>
              이메일
            </label>
            <div className={`${boxClass} border-white/10`}>
              <input
                id="email"
                type="email"
                {...register("email", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "이메일 형식이 아닙니다",
                  },
                })}
                placeholder="example@flick.com"
                autoComplete="email"
                required
                className={inputClass}
              />
              {email && !errors.email && (
                <Check className="size-[16px] shrink-0 text-ott-accent" />
              )}
            </div>
            {errors.email && (
              <p className="mt-[6px] font-['Pretendard',sans-serif] text-[12px] text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label htmlFor="password" className={labelClass}>
              비밀번호
            </label>
            <div className={`${boxClass} border-white/10`}>
              <input
                id="password"
                type="password"
                {...register("password", { deps: "passwordConfirm" })}
                placeholder="비밀번호 입력"
                autoComplete="new-password"
                required
                className={inputClass}
              />
              {password && (
                <Check className="size-[16px] shrink-0 text-ott-accent" />
              )}
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label htmlFor="passwordConfirm" className={labelClass}>
              비밀번호 확인
            </label>
            <div
              className={`${boxClass} ${errors.passwordConfirm ? "border-red-400/70" : "border-white/10"}`}
            >
              <input
                id="passwordConfirm"
                type="password"
                {...register("passwordConfirm", {
                  validate: (v) =>
                    !v ||
                    v === getValues("password") ||
                    "비밀번호가 일치하지 않습니다",
                })}
                placeholder="비밀번호 다시 입력"
                autoComplete="new-password"
                required
                className={inputClass}
              />
              {passwordMatch && (
                <Check className="size-[16px] shrink-0 text-ott-accent" />
              )}
            </div>
            {errors.passwordConfirm && (
              <p className="mt-[6px] font-['Pretendard',sans-serif] text-[12px] text-red-400">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          {/* 닉네임 */}
          <div>
            <label htmlFor="nickname" className={labelClass}>
              닉네임
            </label>
            <div className={`${boxClass} border-white/10`}>
              <input
                id="nickname"
                type="text"
                {...register("nickname")}
                placeholder="닉네임 입력"
                required
                className={inputClass}
              />
              {nickname && (
                <Check className="size-[16px] shrink-0 text-ott-accent" />
              )}
            </div>
          </div>

          {/* 가입 버튼 */}
          <button
            type="submit"
            className="mt-[6px] h-[52px] w-full cursor-pointer rounded-full border-none bg-ott-accent font-['Pretendard',sans-serif] text-[16px] font-bold text-black transition-opacity hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            회원가입
          </button>
        </form>

        {/* 로그인 링크 */}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-[28px] block w-full cursor-pointer text-center font-['Pretendard',sans-serif] text-[13px] font-medium text-white/70"
        >
          {"이미 계정이 있으신가요? "}
          <span className="text-ott-accent">로그인</span>
        </button>
      </div>
    </div>
  );
}
