"use client";

import { useGetTokenQuery } from "@/features/auth/auth.query";

// 앱 로드 시 1회 /auth/refresh 호출 -> 성공하면 accessToken을 메모리에 채워둠 (실패 = 비로그인 상태)
export default function AuthBootstrap() {
  useGetTokenQuery();

  return null;
}
