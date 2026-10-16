"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { useGetTokenQuery, useMeQuery } from "@/features/auth/auth.query";
import { useLogoutMutation } from "@/features/auth/auth.mutation";
import { useAlertStore } from "@/store/alertStore";

const MENU = ["홈", "시리즈", "영화", "라이브", "찜"];

export default function HomeNav() {
  const { data, isSuccess } = useGetTokenQuery(false);
  const isLoggedIn = isSuccess && !!data?.accessToken;
  const { data: me } = useMeQuery(isLoggedIn);
  const initial = me?.name?.trim().charAt(0) ?? "";
  const { mutate: logout, isPending } = useLogoutMutation();
  const { setAlert } = useAlertStore();

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
            <Popover.Root>
              <Popover.Trigger className="flex h-8 w-8 items-center justify-center rounded-full bg-ott-accent text-sm font-semibold text-black">
                {initial}
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  sideOffset={8}
                  align="end"
                  className="z-50 w-40 rounded-xl border border-white/10 bg-[#1a2222] p-1 shadow-lg"
                >
                  <button
                    type="button"
                    onClick={() =>
                      logout(undefined, {
                        onError: (e) => setAlert(e.message),
                      })
                    }
                    disabled={isPending}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-white/10 disabled:opacity-50"
                  >
                    로그아웃
                  </button>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
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
