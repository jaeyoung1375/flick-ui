"use client";
import Link from "next/link";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useConfirmPaymentMutation } from "@/features/payment/payment.mutation";
import { useEffect } from "react";

const RECEIPT = {
  planName: "스탠다드",
  amount: 13900,
  orderId: "b7f3c2e0-5a1d-4c8e-9f21-7d6a0e3b4c15",
  method: "카드",
  paidAt: "2026.09.21 14:32",
  nextPaymentAt: "2026.10.21",
};

export default function PaymentSuccess() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const paymentKey = params.get("paymentKey");
  const amount = Number(params.get("amount"));

  const { mutate } = useConfirmPaymentMutation();

  const rows = [
    { label: "이용권", value: `${RECEIPT.planName} 이용권` },
    { label: "결제수단", value: RECEIPT.method },
    { label: "결제일시", value: RECEIPT.paidAt },
    { label: "다음 결제일", value: RECEIPT.nextPaymentAt },
    { label: "주문번호", value: RECEIPT.orderId, mono: true },
  ];

  useEffect(() => {
    if (!orderId || !paymentKey || Number.isNaN(amount)) return;
    mutate({ orderId, paymentKey, amount });
  }, [orderId, paymentKey, amount, mutate]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-ott-bg px-6 py-24">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ott-accent-dark ring-2 ring-ott-accent">
        <Check className="h-8 w-8 text-ott-accent" strokeWidth={3} />
      </div>

      <h1 className="mt-7 text-center text-4xl font-extrabold tracking-tight text-white">
        결제가 완료되었어요
      </h1>
      <p className="mt-3 text-center text-base text-ott-text-muted">
        지금부터 {RECEIPT.planName} 이용권으로 FLICK을 즐겨보세요
      </p>

      <div className="mt-12 w-full max-w-[440px] rounded-2xl bg-[#16211E] p-7">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-ott-text-muted">결제 금액</span>
          <span className="text-[28px] font-extrabold text-white">
            {RECEIPT.amount.toLocaleString("ko-KR")}
            <span className="ml-1 text-xs font-normal text-ott-text-muted">
              원
            </span>
          </span>
        </div>
        <div className="mt-3 h-[3px] w-8 rounded-full bg-ott-accent" />

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
          href="/plan"
          className="flex-1 rounded-[10px] border border-white/25 py-[13px] text-center text-[13px] font-bold text-white"
        >
          이용권 확인
        </Link>
        <Link
          href="/"
          className="flex-1 rounded-[10px] bg-ott-accent py-[13px] text-center text-[13px] font-extrabold text-black"
        >
          시청하러 가기
        </Link>
      </div>
    </div>
  );
}
