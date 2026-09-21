// 목업 데이터 — flick-server에 이용권 결제 API가 아직 없다.
// 실제 API가 생기면 이 파일을 features/plan/plan.api.ts + plan.query.ts로 교체한다.
import type { Plan } from "./plan.type";

export const plans: Plan[] = [
  {
    id: "basic",
    name: "베이직",
    tagline: "광고 보고 무료로 즐기기",
    price: 9900,
    priceUnit: "원 / 월",
    features: ["광고 포함 시청", "HD 화질", "동시접속 1회선"],
    accent: "neutral",
    ctaLabel: "베이직으로 시작",
  },
  {
    id: "standard",
    name: "스탠다드",
    tagline: "광고 없이 즐기기",
    price: 13900,
    priceUnit: "원 / 월",
    features: ["광고 제거", "Full HD 화질", "동시접속 2회선"],
    recommended: true,
    accent: "teal",
    ctaLabel: "스탠다드 시작하기",
  },
  {
    id: "premium",
    name: "프리미엄",
    tagline: "최고 화질과 혜택",
    price: 19900,
    priceUnit: "원 / 월",
    features: ["광고 제거", "4K UHD 화질", "동시접속 4회선", "오프라인 다운로드"],
    accent: "amber",
    ctaLabel: "프리미엄 시작하기",
  },
];
