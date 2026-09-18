"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useGetTokenQuery } from "@/features/auth/auth.query";

const MENU = ["홈", "시리즈", "영화", "라이브", "찜"];

export default function HomeNav() {
  const { data, isSuccess } = useGetTokenQuery(false);
  const isLoggedIn = isSuccess && !!data?.accessToken;

  return (
    <div className="pt-6 px-10">
      <nav className="flex items-center justify-between rounded-full border border-white/10 bg-[#1a2222]/85 pl-7 pr-5 py-3">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-ott-accent">
            FLICK
          </span>
          <ul className="flex items-center gap-6">
            {MENU.map((label, i) => (
              <li
                key={label}
                className={
                  i === 0
                    ? "text-sm font-semibold text-white"
                    : "text-sm text-ott-text-muted"
                }
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <Search size={18} className="text-ott-text-muted" />
          {isLoggedIn ? (
            <div className="h-8 w-8 rounded-full bg-ott-accent" />
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-ott-accent px-4 py-1.5 text-sm font-semibold text-black"
            >
              로그인
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
