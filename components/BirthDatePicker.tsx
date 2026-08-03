"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { format, getDaysInMonth } from "date-fns";
import { Check } from "lucide-react";
import Button from "@/components/Button";
import { cn } from "@/util/cn";

interface BirthDatePickerProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

const ROW_HEIGHT = 44;
const PAD_ROWS = 2;

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = CURRENT_YEAR - 100;
const YEARS = Array.from(
  { length: CURRENT_YEAR - MIN_YEAR + 1 },
  (_, i) => MIN_YEAR + i,
);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

interface WheelColumnProps {
  options: number[];
  value: number;
  onSelect: (value: number) => void;
  format: (value: number) => string;
}

/** 연/월/일 공용 스크롤 휠 컬럼 — 가운데 정지한 항목을 선택값으로 확정한다 */
function WheelColumn({ options, value, onSelect, format }: WheelColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const [centerIndex, setCenterIndex] = useState(() =>
    Math.max(0, options.indexOf(value)),
  );

  // options(연/월 변경으로 인한 일수 재계산 등)가 바뀔 때만 스크롤 위치를 다시 맞춘다
  useEffect(() => {
    const idx = Math.max(0, options.indexOf(value));
    setCenterIndex(idx);
    containerRef.current?.scrollTo({ top: idx * ROW_HEIGHT, behavior: "auto" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const idx = Math.min(
      Math.max(Math.round(el.scrollTop / ROW_HEIGHT), 0),
      options.length - 1,
    );
    setCenterIndex(idx);

    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => onSelect(options[idx]), 120);
  };

  // 행을 직접 탭했을 때 — 스크롤 정착을 기다리지 않고 즉시 선택 확정
  const handleRowClick = (i: number) => {
    if (settleTimer.current) clearTimeout(settleTimer.current);
    setCenterIndex(i);
    containerRef.current?.scrollTo({ top: i * ROW_HEIGHT, behavior: "smooth" });
    onSelect(options[i]);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-[220px] flex-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden"
      style={{ scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
    >
      <div style={{ height: PAD_ROWS * ROW_HEIGHT }} />
      {options.map((opt, i) => (
        <div
          key={opt}
          onClick={() => handleRowClick(i)}
          className={cn(
            "flex cursor-pointer items-center justify-center gap-[4px] font-['Pretendard',sans-serif] transition-colors",
            i === centerIndex
              ? "text-[16px] font-bold text-[#2F80FF]"
              : Math.abs(i - centerIndex) === 1
                ? "text-[15px] text-[#64748B]"
                : "text-[14px] text-[#94A3B8]",
          )}
          style={{ height: ROW_HEIGHT, scrollSnapAlign: "center" }}
        >
          {format(opt)}
          {i === centerIndex && <Check className="size-[14px]" />}
        </div>
      ))}
      <div style={{ height: PAD_ROWS * ROW_HEIGHT }} />
    </div>
  );
}

export default function BirthDatePicker({
  value,
  onChange,
  placeholder = "생년월일 선택",
  className,
}: BirthDatePickerProps) {
  const [open, setOpen] = useState(false);

  const defaultDate = useMemo(() => new Date(CURRENT_YEAR - 20, 0, 1), []);
  const [year, setYear] = useState(
    (value ?? defaultDate).getFullYear(),
  );
  const [month, setMonth] = useState(
    (value ?? defaultDate).getMonth() + 1,
  );
  const [day, setDay] = useState((value ?? defaultDate).getDate());

  const days = useMemo(
    () =>
      Array.from(
        { length: getDaysInMonth(new Date(year, month - 1)) },
        (_, i) => i + 1,
      ),
    [year, month],
  );
  // 연/월 변경으로 일수가 줄어들면(예: 31일 → 2월) 렌더링 시점에만 clamp — 별도 state 동기화 불필요
  const clampedDay = Math.min(day, days.length);

  // 열려 있는 동안 ESC로 닫기 + 배경 스크롤 잠금
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleConfirm = () => {
    onChange?.(new Date(year, month - 1, clampedDay));
    setOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen(true)}
        className={cn(
          "w-full justify-start rounded-[8px] border-[1.5px] border-[#E2E8F0] bg-white px-[14px] font-['Pretendard',sans-serif] text-[14px] hover:bg-white",
          value ? "text-[#0B1220]" : "text-[#94A3B8]",
          className,
        )}
      >
        {value ? format(value, "yyyy.MM.dd.") : placeholder}
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />

          <div
            className="relative z-10 w-full max-w-[402px] rounded-t-[20px] bg-white pt-[8px] pb-[24px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mt-[8px] h-[4px] w-[36px] rounded-full bg-[#E2E8F0]" />

            <div className="relative mt-[12px] flex px-[26px]">
              <div
                className="pointer-events-none absolute inset-x-[26px] border-y border-[#E2E8F0] bg-[#F4F8FF]"
                style={{ top: PAD_ROWS * ROW_HEIGHT, height: ROW_HEIGHT }}
              />
              <WheelColumn
                options={YEARS}
                value={year}
                onSelect={setYear}
                format={(v) => `${v}년`}
              />
              <WheelColumn
                options={MONTHS}
                value={month}
                onSelect={setMonth}
                format={(v) => `${v}월`}
              />
              <WheelColumn
                options={days}
                value={clampedDay}
                onSelect={setDay}
                format={(v) => `${v}일`}
              />
            </div>

            <div className="mt-[16px] px-[26px]">
              <Button
                type="button"
                onClick={handleConfirm}
                className="h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold"
              >
                완료
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
