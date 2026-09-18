import { Play } from "lucide-react";
import type { HeroContent } from "@/features/content/content.type";

export default function HomeHero({ hero }: { hero: HeroContent }) {
  return (
    <div className="pt-5 px-10">
      <div
        className="relative overflow-hidden rounded-[20px] min-h-[560px]"
        style={{
          backgroundImage: `linear-gradient(135deg, ${hero.gradientFrom}, ${hero.gradientTo})`,
        }}
      >
        <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#0b0e0e]/90 to-transparent" />

        <div className="relative flex flex-col gap-4 max-w-[560px] px-12 pt-[200px] pb-12">
          <span className="w-fit rounded bg-ott-amber px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#241a06]">
            {hero.badge === "NEW" ? "NEW" : "오리지널"}
          </span>
          <h1 className="text-[44px] font-bold leading-tight tracking-tight text-white">
            {hero.title}
          </h1>
          <div className="flex items-center gap-2.5 text-[13px] font-medium text-ott-text-muted">
            {hero.meta.map((m, i) => (
              <span key={m}>
                {m}
                {i < hero.meta.length - 1 && <span className="ml-2.5">·</span>}
              </span>
            ))}
          </div>
          <p className="text-[15px] leading-relaxed text-white/85">
            {hero.synopsis}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button className="inline-flex items-center gap-2 rounded-full bg-ott-accent px-6 py-3 text-sm font-semibold text-[#04140f] hover:brightness-110 cursor-pointer">
              <Play size={16} fill="currentColor" />
              재생
            </button>
            <button className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 cursor-pointer">
              상세 정보
            </button>
          </div>
        </div>

        {hero.nextUp.length > 0 && (
          <div className="absolute right-10 top-10 w-[300px] rounded-2xl border border-white/10 bg-[#0c1717]/55 p-[18px]">
            <p className="mb-3.5 text-[13px] font-semibold text-white">
              다음 추천
            </p>
            <div className="flex flex-col gap-3">
              {hero.nextUp.map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <div
                    className="h-[44px] w-[68px] shrink-0 rounded-md"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                    }}
                  />
                  <span className="text-[13px] text-white/90">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
