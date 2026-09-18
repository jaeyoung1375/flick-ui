import type { ContentItem } from "@/features/content/content.type";

export default function ContentCard({ item }: { item: ContentItem }) {
  return (
    <div className="flex w-[260px] shrink-0 flex-col gap-2">
      <div
        className="h-[146px] w-full rounded-lg"
        style={{
          backgroundImage: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
        }}
      />
      <span className="text-[13px] text-ott-text-muted">{item.title}</span>
    </div>
  );
}
