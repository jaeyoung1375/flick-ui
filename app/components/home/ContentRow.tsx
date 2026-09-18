import type { ContentRow as ContentRowData } from "@/features/content/content.type";
import ContentCard from "./ContentCard";

export default function ContentRow({ row }: { row: ContentRowData }) {
  return (
    <section className="flex flex-col gap-3.5 px-10 pt-8">
      <h2 className="text-[19px] font-semibold text-white">{row.title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {row.items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
