"use client";

import { useRouter } from "next/navigation";
import { useGetTokenQuery } from "@/features/auth/auth.query";
import LandingPage from "./LandingPage";
import WorkoutHomePage from "./WorkoutHomePage";

export default function Page() {
  const router = useRouter();
  const { data, isLoading } = useGetTokenQuery();

  if (isLoading) {
    return <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]" />;
  }

  if (data?.onboardingCompleted) {
    return <WorkoutHomePage />;
  }

  return <LandingPage onGetStarted={() => router.push("/onboarding/step-1")} />;
}
