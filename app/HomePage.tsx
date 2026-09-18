import HomeNav from "@/app/components/home/HomeNav";
import HomeHero from "@/app/components/home/HomeHero";
import ContentRow from "@/app/components/home/ContentRow";
import { heroContent, contentRows } from "@/features/content/content.mock";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ott-bg pb-20">
      <HomeNav />
      <HomeHero hero={heroContent} />
      {contentRows.map((row) => (
        <ContentRow key={row.id} row={row} />
      ))}
    </div>
  );
}
