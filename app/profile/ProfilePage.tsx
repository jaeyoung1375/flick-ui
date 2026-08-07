"use client";

import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  addMonths,
  format,
  getDay,
  getDaysInMonth,
  isSameDay,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale/ko";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Dumbbell,
  Flame,
  Inbox,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { fetchWorkoutRecord } from "@/features/workoutRecord/workoutRecord.api";
import { useWorkoutRecordListQuery } from "@/features/workoutRecord/workoutRecord.query";
import Router from "@/util/router";
import { parseYYYYMMDDHHmmss } from "@/util/DateUtil";

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

// TODO: 칼로리 계산 로직 연동 전까지 사용하는 하드코딩 값
const MOCK_KCAL = 69;

type Tab = "record" | "activity";

export default function ProfilePage() {
  const router = new Router(useRouter());
  const [tab, setTab] = useState<Tab>("record");
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const { data: records = [] } = useWorkoutRecordListQuery(
    format(viewDate, "yyyyMM"),
  );
  const selectedDateRecords = selectedDate
    ? records.filter((r) =>
        isSameDay(parseYYYYMMDDHHmmss(r.recordDt), selectedDate),
      )
    : [];

  // 목록 API는 exercises를 채워주지 않아, 선택한 날짜의 레코드만 상세조회로 보강
  const selectedDateRecordDetailQueries = useQueries({
    queries: selectedDateRecords.map((r) => ({
      queryKey: ["workout-records", "detail", r.workoutRecordId],
      queryFn: () => fetchWorkoutRecord(r.workoutRecordId),
    })),
  });

  const handlePrevMonth = () => setViewDate((d) => subMonths(d, 1));
  const handleNextMonth = () => setViewDate((d) => addMonths(d, 1));
  const handleToday = () => {
    const today = new Date();
    setViewDate(today);
    setSelectedDate(today);
  };

  const firstDay = getDay(startOfMonth(viewDate));
  const daysInMonth = getDaysInMonth(viewDate);
  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(viewDate.getFullYear(), viewDate.getMonth(), i + 1),
    ),
  ];

  return (
    <div className="relative min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <div className="px-[20px] pb-[100px] pt-[20px]">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between">
          <p className="font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
            프로필
          </p>
          <button
            type="button"
            aria-label="설정"
            className="flex size-[32px] items-center justify-center rounded-full bg-white text-[#64748B]"
          >
            <Settings size={18} strokeWidth={2} />
          </button>
        </div>

        {/* 기록/활동 탭 */}
        <div className="mt-[20px] flex border-b border-[#E2E8F0]">
          <button
            type="button"
            onClick={() => setTab("record")}
            className={`flex-1 pb-[12px] text-center font-['Pretendard',sans-serif] text-[15px] ${
              tab === "record"
                ? "border-b-2 border-[#2F80FF] font-semibold text-[#0B1220]"
                : "text-[#94A3B8]"
            }`}
          >
            기록
          </button>
          <button
            type="button"
            onClick={() => setTab("activity")}
            className={`flex-1 pb-[12px] text-center font-['Pretendard',sans-serif] text-[15px] ${
              tab === "activity"
                ? "border-b-2 border-[#2F80FF] font-semibold text-[#0B1220]"
                : "text-[#94A3B8]"
            }`}
          >
            활동
          </button>
        </div>

        {tab === "record" ? (
          <>
            {/* 달력 카드 */}
            <div className="mt-[16px] rounded-[16px] border border-[#E2E8F0] bg-white p-[20px]">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  aria-label="이전 달"
                  onClick={handlePrevMonth}
                  className="flex size-[28px] items-center justify-center rounded-full text-[#94A3B8]"
                >
                  <ChevronLeft size={18} strokeWidth={2} />
                </button>
                <p className="font-['Pretendard',sans-serif] text-[16px] font-semibold text-[#0B1220]">
                  {format(viewDate, "yyyy년 MM월", { locale: ko })}
                </p>
                <button
                  type="button"
                  aria-label="다음 달"
                  onClick={handleNextMonth}
                  className="flex size-[28px] items-center justify-center rounded-full text-[#94A3B8]"
                >
                  <ChevronRight size={18} strokeWidth={2} />
                </button>
              </div>

              <div className="mt-[16px] grid grid-cols-7">
                {DAY_LABELS.map((d) => (
                  <div
                    key={d}
                    className="py-[4px] text-center font-['Pretendard',sans-serif] text-[12px] font-semibold text-[#94A3B8]"
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-[4px]">
                {cells.map((day, idx) => {
                  if (!day) return <div key={`empty-${idx}`} />;

                  const isSelected = selectedDate
                    ? isSameDay(day, selectedDate)
                    : false;
                  const hasRecord = records.some((r) =>
                    isSameDay(parseYYYYMMDDHHmmss(r.recordDt), day),
                  );

                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      onClick={() => setSelectedDate(day)}
                      className={`relative flex aspect-square w-full items-center justify-center rounded-full font-['Pretendard',sans-serif] text-[14px] ${
                        isSelected
                          ? "bg-[#2F80FF] font-bold text-white"
                          : "text-[#0B1220]"
                      }`}
                    >
                      {day.getDate()}
                      {isToday(day) && !isSelected && (
                        <span className="absolute bottom-[3px] left-1/2 size-[4px] -translate-x-1/2 rounded-full bg-[#2F80FF]" />
                      )}
                      {hasRecord && (
                        <span
                          className={`absolute bottom-[3px] left-1/2 size-[4px] -translate-x-1/2 rounded-full ${
                            isSelected ? "bg-white" : "bg-[#2F80FF]"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleToday}
                className="mt-[12px] w-full rounded-[8px] border border-[#E2E8F0] py-[8px] font-['Pretendard',sans-serif] text-[13px] font-semibold text-[#64748B]"
              >
                오늘
              </button>
            </div>

            {selectedDateRecords.length > 0 ? (
              /* 선택한 날짜의 운동 기록 카드 */
              <div className="mt-[16px] flex flex-col gap-[12px]">
                {selectedDateRecords.map((record, idx) => {
                  const exerciseCount =
                    selectedDateRecordDetailQueries[idx]?.data?.exercises
                      .length;

                  return (
                    <button
                      key={record.workoutRecordId}
                      type="button"
                      onClick={() =>
                        router.push(`/profile/record/${record.workoutRecordId}`)
                      }
                      className="w-full rounded-[16px] border border-[#E2E8F0] bg-white p-[20px] text-left"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-['Pretendard',sans-serif] text-[16px] font-semibold text-[#0B1220]">
                          {format(parseYYYYMMDDHHmmss(record.recordDt), "MM.dd")}.{" "}
                          <span className="text-[#2F80FF]">운동</span>
                        </p>
                        <ChevronRight
                          size={18}
                          className="text-[#94A3B8]"
                          strokeWidth={2}
                        />
                      </div>

                      <div className="mt-[16px] flex items-center gap-[20px]">
                        <div className="flex items-center gap-[8px]">
                          <div className="flex size-[32px] items-center justify-center rounded-full bg-[#F4F8FF]">
                            <Dumbbell
                              size={16}
                              className="text-[#64748B]"
                              strokeWidth={1.5}
                            />
                          </div>
                          <p className="font-['Pretendard',sans-serif] text-[15px] font-semibold text-[#0B1220]">
                            {exerciseCount ?? "-"}
                            <span className="font-normal text-[#64748B]">
                              개
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-[8px]">
                          <div className="flex size-[32px] items-center justify-center rounded-full bg-[#F4F8FF]">
                            <Flame
                              size={16}
                              className="text-[#64748B]"
                              strokeWidth={1.5}
                            />
                          </div>
                          <p className="font-['Pretendard',sans-serif] text-[15px] font-semibold text-[#0B1220]">
                            {MOCK_KCAL}
                            <span className="font-normal text-[#64748B]">
                              kcal
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-[8px]">
                          <div className="flex size-[32px] items-center justify-center rounded-full bg-[#F4F8FF]">
                            <Clock
                              size={16}
                              className="text-[#64748B]"
                              strokeWidth={1.5}
                            />
                          </div>
                          <p className="font-['Pretendard',sans-serif] text-[15px] font-semibold text-[#0B1220]">
                            {String(record.durationMin).padStart(2, "0")}:00
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* 운동 기록 추가 카드 */
              <div className="mt-[16px] flex w-full flex-col items-center gap-[12px] rounded-[16px] border border-[#E2E8F0] bg-white p-[24px] text-center">
                <div className="flex size-[44px] items-center justify-center rounded-full bg-[#E4EEFF]">
                  <Inbox
                    size={22}
                    className="text-[#2F80FF]"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="font-['Pretendard',sans-serif] text-[16px] font-semibold text-[#0B1220]">
                  운동 기록 추가
                </p>
                <p className="font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
                  이전에 했던 운동을 기록하고,
                  <br />
                  앞으로의 운동은 모티브와 함께 해요!
                </p>
                <button
                  type="button"
                  onClick={() =>
                    router.push("/profile/record", {
                      param: { recordDt: selectedDate },
                    })
                  }
                  className="mt-[8px] h-[48px] w-full rounded-[8px] bg-[#2F80FF] font-['Pretendard',sans-serif] text-[15px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
                >
                  추가하기
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-[16px] flex flex-col items-center gap-[8px] rounded-[16px] border border-[#E2E8F0] bg-white p-[40px] text-center">
            <p className="font-['Pretendard',sans-serif] text-[14px] text-[#64748B]">
              아직 활동 내역이 없어요
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
