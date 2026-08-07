"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkoutRecordQuery } from "@/features/workoutRecord/workoutRecord.query";
import GlobalLoading from "@/app/components/ui/loading/GlobalLoading";
import { parseYYYYMMDDHHmmss } from "@/util/DateUtil";

export default function RecordDetailPage({ workoutRecordId }: { workoutRecordId: number }) {
  const router = useRouter();
  const { data: record, isLoading } = useWorkoutRecordQuery(workoutRecordId);

  if (isLoading) return <GlobalLoading />;

  return (
    <div className="relative min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <div className="px-[20px] pb-[40px] pt-[20px]">
        {/* 헤더 */}
        <div className="flex h-[36px] items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="뒤로가기"
            className="flex size-[36px] items-center justify-center text-[#0B1220]"
          >
            <ChevronLeft size={22} strokeWidth={2} />
          </button>
          <p className="font-['Pretendard',sans-serif] text-[17px] font-semibold text-[#0B1220]">
            운동 기록
          </p>
          <div className="size-[36px]" />
        </div>

        {!record ? (
          <p className="mt-[40px] text-center font-['Pretendard',sans-serif] text-[14px] text-[#94A3B8]">
            기록을 찾을 수 없어요.
          </p>
        ) : (
          <>
            {/* 요약 카드 */}
            <div className="mt-[20px] rounded-[16px] border border-[#E2E8F0] bg-white p-[20px]">
              <p className="font-['Pretendard',sans-serif] text-[13px] font-semibold text-[#2F80FF]">
                {record.categoryCd}
              </p>
              <p className="mt-[6px] font-['Pretendard',sans-serif] text-[18px] font-semibold text-[#0B1220]">
                {format(
                  parseYYYYMMDDHHmmss(record.recordDt),
                  "yyyy년 MM월 dd일 (EEE) HH:mm",
                  { locale: ko },
                )}
              </p>
              <p className="mt-[8px] font-['Pretendard',sans-serif] text-[13px] text-[#64748B]">
                운동 시간 {String(record.durationMin).padStart(2, "0")}:00
              </p>
            </div>

            {/* 상세 기록 */}
            {record.exercises.length > 0 && (
              <div className="mt-[16px] flex flex-col gap-[12px]">
                {record.exercises.map((ex) => (
                  <div
                    key={ex.exerciseId}
                    className="overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-white"
                  >
                    <p className="border-b border-[#E2E8F0] px-[16px] py-[14px] font-['Pretendard',sans-serif] text-[14px] font-semibold text-[#0B1220]">
                      {ex.exerciseName}
                    </p>
                    <div className="divide-y divide-[#E2E8F0]">
                      {ex.sets.map((s) => (
                        <div
                          key={s.setNo}
                          className="flex items-center gap-[8px] px-[16px] py-[10px] font-['Pretendard',sans-serif] text-[14px] text-[#0B1220]"
                        >
                          <span className="w-[40px] shrink-0 text-[13px] font-semibold text-[#64748B]">
                            {s.setNo}세트
                          </span>
                          <span>{s.weight}kg</span>
                          <span className="text-[#94A3B8]">×</span>
                          <span>{s.reps}회</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
