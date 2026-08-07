"use client";

import { BarChart3, Crown, Dumbbell, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

const NAV_ITEMS: { label: string; icon: LucideIcon; href?: string }[] = [
  { label: "운동", icon: Dumbbell, href: "/" },
  { label: "분석", icon: BarChart3 },
  { label: "커뮤니티", icon: Users },
  { label: "프로필", icon: User, href: "/profile" },
  { label: "프리미엄", icon: Crown },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 flex w-full max-w-[402px] -translate-x-1/2 items-center justify-between border-t border-[#E2E8F0] bg-white px-[8px] py-[10px]">
      {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
        const active = href !== undefined && pathname === href;
        const content = (
          <>
            <Icon
              size={20}
              strokeWidth={2}
              className={active ? "text-[#2F80FF]" : "text-[#94A3B8]"}
            />
            <span
              className={`font-['Pretendard',sans-serif] text-[11px] ${
                active ? "font-semibold text-[#2F80FF]" : "text-[#94A3B8]"
              }`}
            >
              {label}
            </span>
          </>
        );

        if (href) {
          return (
            <Link
              key={label}
              href={href}
              className="flex flex-1 flex-col items-center gap-[4px]"
            >
              {content}
            </Link>
          );
        }

        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-[4px]">
            {content}
          </div>
        );
      })}
    </nav>
  );
}
