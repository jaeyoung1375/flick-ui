"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ChevronLeft, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRecordDraftStore } from "@/store/recordDraftStore";
import { useAlertStore } from "@/store/alertStore";
import { useCreateWorkoutRecordMutation } from "@/features/workoutRecord/workoutRecord.mutation";
import type { WorkoutRecordCreateRequest } from "@/features/workoutRecord/workoutRecord.type";
import Router from "@/util/router";
import { formatDateToYYYYMMDDHHmmss } from "@/util/DateUtil";

const CATEGORIES = ["헬스", "홈트", "러닝", "등산", "야외"];

export default function RecordPage() {
  const router = new Router(useRouter());
  const { setAlert } = useAlertStore();
  const records = useRecordDraftStore((s) => s.records);
  const removeExercise = useRecordDraftStore((s) => s.removeExercise);
  const addSet = useRecordDraftStore((s) => s.addSet);
  const removeSet = useRecordDraftStore((s) => s.removeSet);
  const updateSet = useRecordDraftStore((s) => s.updateSet);
  const resetDraft = useRecordDraftStore((s) => s.reset);
  const createWorkoutRecord = useCreateWorkoutRecordMutation();

  const [category, setCategory] = useState(CATEGORIES[0]);
  const [dateTime, setDateTime] = useState(() => {
    const { recordDt } =
      router.getData<{ recordDt: string | null }>("/profile/record") ?? {};

    const base = recordDt ? new Date(recordDt) : new Date();
    return format(base, "yyyy-MM-dd'T'HH:mm");
  });

  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");

  const handleAdd = async () => {
    const body: WorkoutRecordCreateRequest = {
      categoryCd: category,
      recordDt: formatDateToYYYYMMDDHHmmss(dateTime),
      durationMin: Number(hours) * 60 + Number(minutes),
      exercises: records.map(({ exercise, sets }) => ({
        exerciseId: exercise.id,
        sets: sets.map(({ weight, reps }, setIndex) => ({
          setNo: setIndex + 1,
          weight,
          reps,
        })),
      })),
    };
    try {
      await createWorkoutRecord.mutateAsync(body);
      resetDraft();
      setAlert("운동 기록이 등록되었습니다.");
      router.push("/profile");
    } catch {
      setAlert("운동 기록 등록에 실패했습니다.");
    }
  };

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
          <button
            type="button"
            onClick={handleAdd}
            disabled={createWorkoutRecord.isPending}
            className="font-['Pretendard',sans-serif] text-[15px] font-semibold text-[#2F80FF] disabled:opacity-40"
          >
            {createWorkoutRecord.isPending ? "등록중..." : "추가"}
          </button>
        </div>

        {/* 카테고리 */}
        <div className="mt-[20px] flex items-center gap-[8px] overflow-x-auto pb-[4px]">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-[16px] py-[10px] font-['Pretendard',sans-serif] text-[14px] font-semibold transition-colors ${
                category === c
                  ? "bg-[#2F80FF] text-white"
                  : "border border-[#E2E8F0] bg-white text-[#64748B]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* 날짜 및 시간 */}
        <div className="mt-[28px] flex items-center justify-between">
          <p className="font-['Pretendard',sans-serif] text-[15px] font-semibold text-[#0B1220]">
            날짜 및 시간
          </p>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="rounded-[10px] border border-[#E2E8F0] bg-white px-[14px] py-[10px] font-['Pretendard',sans-serif] text-[14px] text-[#0B1220]"
          />
        </div>

        {/* 운동한 시간 */}
        <div className="mt-[20px] flex items-center justify-between">
          <p className="font-['Pretendard',sans-serif] text-[15px] font-semibold text-[#0B1220]">
            운동한 시간
          </p>
          <div className="flex items-center gap-[6px]">
            <input
              type="number"
              min={0}
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="h-[44px] w-[56px] rounded-[10px] border border-[#E2E8F0] bg-white text-center font-['Pretendard',sans-serif] text-[15px] text-[#0B1220]"
            />
            <span className="font-['Pretendard',sans-serif] text-[13px] text-[#94A3B8]">
              시간
            </span>
            <input
              type="number"
              min={0}
              max={59}
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="h-[44px] w-[56px] rounded-[10px] border border-[#E2E8F0] bg-white text-center font-['Pretendard',sans-serif] text-[15px] text-[#0B1220]"
            />
            <span className="font-['Pretendard',sans-serif] text-[13px] text-[#94A3B8]">
              분
            </span>
          </div>
        </div>

        <div className="mt-[24px] border-t border-[#E2E8F0]" />

        {/* 상세 기록 */}
        <div className="mt-[24px] flex items-center justify-between">
          <p className="font-['Pretendard',sans-serif] text-[15px] font-semibold text-[#0B1220]">
            상세 기록 <span className="text-[#94A3B8]">(선택)</span>
          </p>
          <button
            type="button"
            onClick={() => router.push("/exercises?select=1")}
            aria-label="운동 추가"
            className="flex size-[32px] items-center justify-center rounded-full bg-[#E4EEFF] text-[#2F80FF]"
          >
            <Plus size={18} strokeWidth={2} />
          </button>
        </div>

        {records.length > 0 && (
          <div className="mt-[12px] flex flex-col gap-[12px]">
            {records.map(({ exercise, sets }) => (
              <div
                key={exercise.id}
                className="overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-white"
              >
                <div className="flex items-center justify-between border-b border-[#E2E8F0] px-[16px] py-[14px]">
                  <p className="font-['Pretendard',sans-serif] text-[14px] font-semibold text-[#0B1220]">
                    {exercise.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeExercise(exercise.id)}
                    aria-label="운동 삭제"
                    className="flex size-[28px] items-center justify-center text-[#94A3B8]"
                  >
                    <X size={16} strokeWidth={2} />
                  </button>
                </div>

                <div className="divide-y divide-[#E2E8F0]">
                  {sets.map((s, setIndex) => (
                    <div
                      key={setIndex}
                      className="flex items-center gap-[8px] px-[16px] py-[10px]"
                    >
                      <span className="w-[40px] shrink-0 font-['Pretendard',sans-serif] text-[13px] font-semibold text-[#64748B]">
                        {setIndex + 1}세트
                      </span>
                      <input
                        type="number"
                        min={0}
                        value={s.weight}
                        onChange={(e) =>
                          updateSet(exercise.id, setIndex, {
                            weight: Number(e.target.value),
                          })
                        }
                        className="h-[36px] w-[64px] rounded-[8px] border border-[#E2E8F0] bg-white text-center font-['Pretendard',sans-serif] text-[14px] text-[#0B1220]"
                      />
                      <span className="font-['Pretendard',sans-serif] text-[12px] text-[#94A3B8]">
                        kg
                      </span>
                      <input
                        type="number"
                        min={0}
                        value={s.reps}
                        onChange={(e) =>
                          updateSet(exercise.id, setIndex, {
                            reps: Number(e.target.value),
                          })
                        }
                        className="h-[36px] w-[64px] rounded-[8px] border border-[#E2E8F0] bg-white text-center font-['Pretendard',sans-serif] text-[14px] text-[#0B1220]"
                      />
                      <span className="font-['Pretendard',sans-serif] text-[12px] text-[#94A3B8]">
                        회
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSet(exercise.id, setIndex)}
                        aria-label="세트 삭제"
                        className="ml-auto flex size-[28px] items-center justify-center text-[#94A3B8]"
                      >
                        <Trash2 size={16} strokeWidth={2} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => addSet(exercise.id)}
                  className="w-full border-t border-[#E2E8F0] py-[12px] text-center font-['Pretendard',sans-serif] text-[13px] font-semibold text-[#2F80FF]"
                >
                  세트 추가
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 이전 기록 불러오기 */}
        <div className="mt-[32px] flex justify-center">
          <button
            type="button"
            className="rounded-full border border-[#E2E8F0] bg-white px-[20px] py-[10px] font-['Pretendard',sans-serif] text-[14px] font-semibold text-[#0B1220]"
          >
            이전 기록 불러오기
          </button>
        </div>
      </div>
    </div>
  );
}
