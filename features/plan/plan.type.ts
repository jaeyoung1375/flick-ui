export type PlanAccent = "neutral" | "teal" | "amber";

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  priceUnit: string;
  features: string[];
  recommended?: boolean;
  accent: PlanAccent;
  ctaLabel: string;
}
