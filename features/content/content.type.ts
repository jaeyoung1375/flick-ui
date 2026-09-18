export type ContentBadge = "NEW" | "ORIGINAL";

export interface ContentItem {
  id: string;
  title: string;
  year: number;
  genre: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface HeroContent {
  badge: ContentBadge;
  title: string;
  synopsis: string;
  meta: string[];
  gradientFrom: string;
  gradientTo: string;
  nextUp: Pick<ContentItem, "title" | "gradientFrom" | "gradientTo">[];
}

export interface ContentRow {
  id: string;
  genre: string;
  title: string;
  items: ContentItem[];
}

// ── 관리자: 작품 관리 (목업 — 실제 API 없음, content.api.ts/query.ts 미생성) ──

export type ContentKind = "MOVIE" | "SERIES";

export interface AdminContentItem {
  id: string;
  title: string;
  posterImageUrl: string | null;
  releaseDate: string; // yyyy-mm-dd
  ageRating: string;
  kind: ContentKind;
}

export type AdminContentFormValues = Omit<AdminContentItem, "id" | "posterImageUrl"> & {
  posterImageUrl: string | null;
};
