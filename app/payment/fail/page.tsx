import Link from "next/link";
import { X } from "lucide-react";

// 퍼블리싱 예시용 목업 — 실제 연동 시 failUrl 쿼리(code, message, orderId)로 교체한다.
const FAILURE = {
  planName: "스탠다드",
  code: "PAY_PROCESS_CANCELED",
  message: "결제를 취소하셨어요",
  orderId: "b7f3c2e0-5a1d-4c8e-9f21-7d6a0e3b4c15",
};

export default function PaymentFailPage() {
  const rows = [
    { label: "이용권", value: `${FAILURE.planName} 이용권` },
    { label: "실패 사유", value: FAILURE.message },
    { label: "오류 코드", value: FAILURE.code, mono: true },
    { label: "주문번호", value: FAILURE.orderId, mono: true },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-ott-bg px-6 py-24">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#211416] ring-2 ring-[#F0616D]">
        <X className="h-8 w-8 text-[#F0616D]" strokeWidth={3} />
      </div>

      <h1 className="mt-7 text-center text-4xl font-extrabold tracking-tight text-white">
        결제가 완료되지 않았어요
      </h1>
      <p className="mt-3 text-center text-base text-ott-text-muted">
        결제가 진행되지 않았어요. 잠시 후 다시 시도해 주세요
      </p>

      <div className="mt-12 w-full max-w-[440px] rounded-2xl bg-[#16211E] p-7">
        <span className="text-sm text-ott-text-muted">결제 정보</span>
        <div className="mt-3 h-[3px] w-8 rounded-full bg-[#F0616D]" />

        <dl className="mt-6 flex flex-col gap-3.5">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-6 text-[13px]"
            >
              <dt className="shrink-0 text-ott-text-muted">{row.label}</dt>
              <dd
                className={`text-right text-[#E5E7E7] ${
                  row.mono ? "break-all text-xs" : ""
                }`}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-8 flex w-full max-w-[440px] gap-3">
        <Link
          href="/"
          className="flex-1 rounded-[10px] border border-white/25 py-[13px] text-center text-[13px] font-bold text-white"
        >
          홈으로
        </Link>
        <Link
          href="/plan"
          className="flex-1 rounded-[10px] bg-ott-accent py-[13px] text-center text-[13px] font-extrabold text-black"
        >
          다시 결제하기
        </Link>
      </div>
    </div>
  );
}
