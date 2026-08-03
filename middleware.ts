import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken");

  if (!refreshToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/onboarding/:path*"],
};
