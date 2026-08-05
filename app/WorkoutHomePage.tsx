"use client";
import {
  BarChart3,
  Building2,
  ChevronRight,
  Crown,
  Dumbbell,
  List,
  Play,
  Settings,
  ShieldCheck,
  Target,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "운동", icon: Dumbbell, active: true },
  { label: "분석", icon: BarChart3, active: false },
  { label: "커뮤니티", icon: Users, active: false },
  { label: "프로필", icon: User, active: false },
  { label: "프리미엄", icon: Crown, active: false },
];

export default function WorkoutHomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <div className="px-[20px] pb-[100px] pt-[20px]">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between">
          <p className="font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
            운동
          </p>
          <div className="flex items-center gap-[8px]">
            <div className="flex items-center gap-[4px] rounded-full border border-[#2F80FF] bg-[#E4EEFF] px-[12px] py-[6px]">
              <ShieldCheck size={14} className="text-[#2F80FF]" strokeWidth={2} />
              <span className="font-['Pretendard',sans-serif] text-[12px] font-semibold text-[#2F80FF]">
                Upgrade
              </span>
            </div>
            <button
              type="button"
              aria-label="메뉴"
              onClick={() => router.push("/exercises")}
              className="flex size-[32px] items-center justify-center rounded-full bg-white text-[#64748B]"
            >
              <List size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* 추천 루틴 카드 */}
        <div className="mt-[16px] rounded-[16px] border border-[#E2E8F0] bg-white p-[20px]">
          <div className="flex items-start justify-between">
            <div className="flex size-[44px] items-center justify-center rounded-full bg-[#2F80FF]">
              <Target size={22} className="text-white" strokeWidth={1.5} />
            </div>
            <button
              type="button"
              aria-label="루틴 설정"
              className="flex size-[32px] items-center justify-center rounded-full text-[#94A3B8]"
            >
              <Settings size={18} strokeWidth={2} />
            </button>
          </div>

          <p className="mt-[16px] font-['Pretendard',sans-serif] text-[20px] font-semibold text-[#0B1220]">
            넓은 어깨 만들기
          </p>
          <p className="mt-[6px] font-['Pretendard',sans-serif] text-[14px] font-semibold text-[#2F80FF]">
            DAY 1
          </p>
          <p className="mt-[12px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
            운동 부위 어깨, 코어
          </p>
          <p className="mt-[4px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
            6개의 운동 · 20세트 · 195kcal
          </p>

          <button
            type="button"
            className="mt-[20px] h-[48px] w-full rounded-[8px] bg-[#2F80FF] font-['Pretendard',sans-serif] text-[15px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
          >
            추천 운동 미리보기
          </button>
        </div>

        {/* 비어있는 루틴으로 시작 */}
        <button
          type="button"
          className="mt-[16px] flex h-[56px] w-full items-center gap-[10px] rounded-[16px] border border-[#E2E8F0] bg-white px-[16px]"
        >
          <Play size={18} className="text-[#2F80FF]" strokeWidth={2} />
          <span className="font-['Pretendard',sans-serif] text-[14px] font-semibold text-[#0B1220]">
            비어있는 루틴으로 시작
          </span>
        </button>

        {/* 헬스장/내 장비 등록하기 */}
        <button
          type="button"
          className="mt-[10px] flex w-full items-center gap-[12px] rounded-[16px] border border-[#E2E8F0] bg-white px-[16px] py-[14px]"
        >
          <div className="flex size-[40px] shrink-0 items-center justify-center rounded-full bg-[#E4EEFF]">
            <Building2 size={20} className="text-[#2F80FF]" strokeWidth={1.5} />
          </div>
          <div className="flex-1 text-left">
            <p className="font-['Pretendard',sans-serif] text-[14px] font-semibold text-[#0B1220]">
              헬스장/내 장비 등록하기
            </p>
            <p className="mt-[2px] font-['Pretendard',sans-serif] text-[12px] text-[#64748B]">
              내 헬스장이나 운동 장비를 등록하고 운동 추천을 받아보세요!
            </p>
          </div>
          <ChevronRight size={18} className="shrink-0 text-[#94A3B8]" strokeWidth={2} />
        </button>
      </div>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-1/2 flex w-full max-w-[402px] -translate-x-1/2 items-center justify-between border-t border-[#E2E8F0] bg-white px-[8px] py-[10px]">
        {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
          <div
            key={label}
            className="flex flex-1 flex-col items-center gap-[4px]"
          >
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
          </div>
        ))}
      </nav>
    </div>
  );
}
