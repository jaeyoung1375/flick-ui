// NumberField.tsx
// 온보딩 큰 숫자 입력 (키 / 몸무게 / 목표 몸무게 등에서 재사용)
"use client";

interface NumberFieldProps {
  value: number;
  onChange: (value: number) => void;
  unit: string;
}

export default function NumberField({ value, onChange, unit }: NumberFieldProps) {
  return (
    <div className="mt-[48px] flex items-end justify-center gap-[8px]">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-[120px] bg-transparent text-right font-['Pretendard',sans-serif] text-[48px] font-bold text-[#0B1220] focus:outline-none"
      />
      <span className="pb-[8px] font-['Pretendard',sans-serif] text-[18px] font-medium text-[#64748B]">
        {unit}
      </span>
    </div>
  );
}
