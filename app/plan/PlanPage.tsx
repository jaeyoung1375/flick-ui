"use client";

import { useEffect, useState } from "react";
import { plans } from "@/features/plan/plan.mock";
import type { Plan } from "@/features/plan/plan.type";
import { useLoginUser } from "@/features/auth/auth.query";
import {
  loadTossPayments,
  TossPaymentsPayment,
} from "@tosspayments/tosspayments-sdk";

const ACCENT_STYLES: Record<
  Plan["accent"],
  { bg: string; underline: string; cta: string; border: string }
> = {
  neutral: {
    bg: "bg-[#131817]",
    underline: "bg-white/20",
    cta: "border border-white/25 text-white font-bold",
    border: "border-white/60",
  },
  teal: {
    bg: "bg-[#16211E]",
    underline: "bg-ott-accent",
    cta: "bg-ott-accent text-black font-extrabold",
    border: "border-ott-accent",
  },
  amber: {
    bg: "bg-[#1E1712]",
    underline: "bg-ott-amber",
    cta: "bg-ott-amber text-black font-extrabold",
    border: "border-ott-amber",
  },
};

export default function PlanPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: user } = useLoginUser();

  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);

  useEffect(() => {
    if (!user) return;
    if (!clientKey) {
      console.error("TOSS_CLIENT_KEY가 설정되지 않았습니다.");
      return;
    }
    const customerKey = `user_${user.userId}`;

    const initPayment = async () => {
      const tossPayments = await loadTossPayments(clientKey);
      setPayment(tossPayments.payment({ customerKey }));
    };
    initPayment();
  }, [user, clientKey]);

  const handlePay = async (plan: Plan) => {
    if (!payment) return;

    try {
      await payment.requestPayment({
        method: "CARD",
        amount: { currency: "KRW", value: plan.price },
        orderId: crypto.randomUUID(),
        orderName: `${plan.name} 이용권`,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center bg-ott-bg px-20 py-24">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-white">
          이용권을 선택하세요
        </h1>
        <p className="mt-3 text-center text-base text-ott-text-muted">
          언제든 변경하거나 해지할 수 있어요
        </p>

        <div className="mt-14 flex items-stretch gap-5">
          {plans.map((plan) => {
            const accent = ACCENT_STYLES[plan.accent];
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedId(plan.id)}
                className={`flex w-[344px] cursor-pointer flex-col rounded-2xl border-2 p-7 ${accent.bg} ${
                  selectedId === plan.id ? accent.border : "border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">{plan.name}</h2>
                  {plan.recommended && (
                    <span className="text-[11px] font-bold text-ott-accent">
                      추천
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-xs text-ott-text-muted">
                  {plan.tagline}
                </p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-[28px] font-extrabold text-white">
                    {plan.price.toLocaleString("ko-KR")}
                  </span>
                  <span className="text-xs text-ott-text-muted">
                    {plan.priceUnit}
                  </span>
                </div>
                <div
                  className={`mt-1 h-[3px] w-8 rounded-full ${accent.underline}`}
                />

                <div className="mt-6 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="text-[13px] text-[#E5E7E7]">
                      · {feature}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    void handlePay(plan);
                  }}
                  className={`mt-auto rounded-[10px] py-[13px] text-[13px] ${accent.cta} disabled:cursor-not-allowed disabled:opacity-50`}
                  disabled={!payment}
                >
                  {plan.ctaLabel}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
