"use client";
import { ChevronLeft, Dumbbell, Heart, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  BODY_PARTS,
  EQUIPMENTS,
  EXERCISES,
  type BodyPart,
  type Equipment,
  type Exercise,
} from "./exercises.data";

type MyFilter = "favorite" | "recent" | null;

interface ExerciseListPageProps {
  onBack: () => void;
}

function toggleValue<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function ExerciseListPage({ onBack }: ExerciseListPageProps) {
  const [keyword, setKeyword] = useState("");
  const [myFilter, setMyFilter] = useState<MyFilter>(null);
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    return EXERCISES.filter((ex) => {
      if (keyword && !ex.name.includes(keyword)) return false;
      if (myFilter === "favorite" && !favorites.has(ex.id)) return false;
      if (myFilter === "recent") return false; // TODO: 최근 운동 기록 API 연동 전까지 항상 비어있음
      if (bodyParts.length > 0 && !bodyParts.includes(ex.bodyPart)) return false;
      if (equipments.length > 0 && (!ex.equipment || !equipments.includes(ex.equipment)))
        return false;
      return true;
    });
  }, [keyword, myFilter, favorites, bodyParts, equipments]);

  const grouped = useMemo(() => {
    const map = new Map<BodyPart, Exercise[]>();
    for (const ex of filtered) {
      const list = map.get(ex.bodyPart) ?? [];
      list.push(ex);
      map.set(ex.bodyPart, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      {/* 헤더 */}
      <div className="relative flex h-[56px] items-center justify-center px-[8px]">
        <button
          type="button"
          onClick={onBack}
          aria-label="뒤로가기"
          className="absolute left-[8px] flex size-[36px] items-center justify-center text-[#0B1220]"
        >
          <ChevronLeft size={22} strokeWidth={2} />
        </button>
        <p className="font-['Pretendard',sans-serif] text-[17px] font-semibold text-[#0B1220]">
          운동 목록
        </p>
      </div>

      {/* 검색 */}
      <div className="px-[20px]">
        <div className="flex h-[44px] items-center gap-[8px] rounded-[12px] border border-[#E2E8F0] bg-white px-[14px]">
          <Search size={16} className="text-[#94A3B8]" strokeWidth={2} />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="운동 이름으로 검색해보세요"
            className="flex-1 bg-transparent font-['Pretendard',sans-serif] text-[14px] text-[#0B1220] placeholder:text-[#94A3B8] focus:outline-none"
          />
        </div>
      </div>

      {/* MY 필터 */}
      <div className="mt-[20px] flex items-center gap-[8px] px-[20px]">
        <span className="shrink-0 font-['Pretendard',sans-serif] text-[12px] font-semibold text-[#94A3B8]">
          MY
        </span>
        {(
          [
            { key: "favorite", label: "즐겨찾기" },
            { key: "recent", label: "최근 한 운동" },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setMyFilter((prev) => (prev === key ? null : key))}
            className={`rounded-full px-[12px] py-[6px] font-['Pretendard',sans-serif] text-[13px] font-semibold transition-colors ${
              myFilter === key
                ? "bg-[#2F80FF] text-white"
                : "border border-[#E2E8F0] bg-white text-[#64748B]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 부위 필터 */}
      <div className="mt-[16px] flex items-center gap-[8px] overflow-x-auto px-[20px] pb-[4px]">
        <span className="shrink-0 font-['Pretendard',sans-serif] text-[12px] font-semibold text-[#94A3B8]">
          부위
        </span>
        {BODY_PARTS.map((part) => (
          <button
            key={part}
            type="button"
            onClick={() => setBodyParts((prev) => toggleValue(prev, part))}
            className={`shrink-0 rounded-full px-[12px] py-[6px] font-['Pretendard',sans-serif] text-[13px] font-semibold transition-colors ${
              bodyParts.includes(part)
                ? "bg-[#2F80FF] text-white"
                : "border border-[#E2E8F0] bg-white text-[#64748B]"
            }`}
          >
            {part}
          </button>
        ))}
      </div>

      {/* 기구 필터 */}
      <div className="mt-[10px] flex items-center gap-[8px] overflow-x-auto px-[20px] pb-[16px]">
        <span className="shrink-0 font-['Pretendard',sans-serif] text-[12px] font-semibold text-[#94A3B8]">
          기구
        </span>
        {EQUIPMENTS.map((equipment) => (
          <button
            key={equipment}
            type="button"
            onClick={() => setEquipments((prev) => toggleValue(prev, equipment))}
            className={`shrink-0 rounded-full px-[12px] py-[6px] font-['Pretendard',sans-serif] text-[13px] font-semibold transition-colors ${
              equipments.includes(equipment)
                ? "bg-[#2F80FF] text-white"
                : "border border-[#E2E8F0] bg-white text-[#64748B]"
            }`}
          >
            {equipment}
          </button>
        ))}
      </div>

      <div className="border-t border-[#E2E8F0] px-[20px] pb-[24px] pt-[16px]">
        <p className="font-['Pretendard',sans-serif] text-[13px] text-[#94A3B8]">
          전체 {filtered.length}개
        </p>

        {grouped.length === 0 && (
          <p className="mt-[40px] text-center font-['Pretendard',sans-serif] text-[14px] text-[#94A3B8]">
            {myFilter === "recent"
              ? "최근 운동 기록이 없어요"
              : "조건에 맞는 운동이 없어요"}
          </p>
        )}

        {grouped.map(([part, list]) => (
          <div key={part} className="mt-[20px]">
            <p className="mb-[8px] font-['Pretendard',sans-serif] text-[16px] font-bold text-[#0B1220]">
              {part}
            </p>
            {list.map((ex, i) => (
              <div
                key={ex.id}
                className={`flex items-center gap-[12px] py-[12px] ${
                  i > 0 ? "border-t border-[#E2E8F0]" : ""
                }`}
              >
                <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[10px] bg-[#E4EEFF]">
                  <Dumbbell size={22} className="text-[#2F80FF]" strokeWidth={1.5} />
                </div>
                <p className="flex-1 font-['Pretendard',sans-serif] text-[14px] font-semibold text-[#0B1220]">
                  {ex.name}
                </p>
                <button
                  type="button"
                  onClick={() => toggleFavorite(ex.id)}
                  aria-label="즐겨찾기"
                  className="flex size-[32px] items-center justify-center"
                >
                  <Heart
                    size={18}
                    className={favorites.has(ex.id) ? "text-[#2F80FF]" : "text-[#94A3B8]"}
                    fill={favorites.has(ex.id) ? "currentColor" : "none"}
                    strokeWidth={2}
                  />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
