// 목업 데이터 — flick-server에 콘텐츠 카탈로그 API가 아직 없다(M1 미구현).
// 실제 API가 생기면 이 파일을 features/content/content.api.ts + content.query.ts로 교체한다.
import type { AdminContentItem, ContentRow, HeroContent } from "./content.type";

export const heroContent: HeroContent = {
  badge: "NEW",
  title: "파도 끝에서 만나요",
  synopsis:
    "서로 다른 삶을 살던 네 사람이 작은 해변 마을에서 우연히 얽히며 벌어지는 잔잔한 이야기.",
  meta: ["2026", "전 8부작", "12세 이상"],
  gradientFrom: "#0d594c",
  gradientTo: "#05191a",
  nextUp: [
    { title: "도시의 밤공기", gradientFrom: "#26805f", gradientTo: "#0a2621" },
    { title: "조용한 이웃", gradientFrom: "#806626", gradientTo: "#261c0a" },
  ],
};

export const contentRows: ContentRow[] = [
  {
    id: "action",
    genre: "ACTION",
    title: "액션 & 스릴러",
    items: [
      { id: "a1", title: "야간 순찰", year: 2026, genre: "ACTION", gradientFrom: "#8c2634", gradientTo: "#330d19" },
      { id: "a2", title: "블루 라인", year: 2025, genre: "ACTION", gradientFrom: "#264d80", gradientTo: "#0d1a40" },
      { id: "a3", title: "마지막 열차", year: 2026, genre: "ACTION", gradientFrom: "#805926", gradientTo: "#331f08" },
      { id: "a4", title: "이중 계약", year: 2024, genre: "ACTION", gradientFrom: "#59268c", gradientTo: "#1e0d33" },
      { id: "a5", title: "붉은 신호", year: 2026, genre: "ACTION", gradientFrom: "#266666", gradientTo: "#0a2626" },
      { id: "a6", title: "숲의 소리", year: 2025, genre: "ACTION", gradientFrom: "#4d7326", gradientTo: "#192e0d" },
    ],
  },
  {
    id: "romance",
    genre: "ROMANCE",
    title: "로맨스",
    items: [
      { id: "r1", title: "여름의 온도", year: 2026, genre: "ROMANCE", gradientFrom: "#993355", gradientTo: "#330d1a" },
      { id: "r2", title: "밤의 색깔", year: 2025, genre: "ROMANCE", gradientFrom: "#334d99", gradientTo: "#0d1433" },
      { id: "r3", title: "고백의 계절", year: 2026, genre: "ROMANCE", gradientFrom: "#4d8033", gradientTo: "#152e0d" },
      { id: "r4", title: "다시 만난 세계", year: 2024, genre: "ROMANCE", gradientFrom: "#805933", gradientTo: "#331f08" },
      { id: "r5", title: "우리만의 신호", year: 2026, genre: "ROMANCE", gradientFrom: "#66337f", gradientTo: "#1f0d33" },
      { id: "r6", title: "별들의 무게", year: 2025, genre: "ROMANCE", gradientFrom: "#26737a", gradientTo: "#0a2629" },
    ],
  },
  {
    id: "documentary",
    genre: "DOCUMENTARY",
    title: "다큐멘터리",
    items: [
      { id: "d1", title: "깊은 바다의 기록", year: 2026, genre: "DOCUMENTARY", gradientFrom: "#1f5c73", gradientTo: "#08202b" },
      { id: "d2", title: "도시의 뒷골목", year: 2025, genre: "DOCUMENTARY", gradientFrom: "#5c4c1f", gradientTo: "#2b2308" },
      { id: "d3", title: "사라진 언어들", year: 2026, genre: "DOCUMENTARY", gradientFrom: "#5c1f2e", gradientTo: "#2b0813" },
      { id: "d4", title: "느린 여행자", year: 2024, genre: "DOCUMENTARY", gradientFrom: "#2e5c1f", gradientTo: "#132b08" },
      { id: "d5", title: "별을 쫓는 사람들", year: 2026, genre: "DOCUMENTARY", gradientFrom: "#3c1f5c", gradientTo: "#18082b" },
    ],
  },
];

export const adminContentItems: AdminContentItem[] = [
  { id: "c1", title: "붉은 항구의 밤", posterImageUrl: null, releaseDate: "2026-03-14", ageRating: "15", kind: "SERIES" },
  { id: "c2", title: "파도 끝에서 만나요", posterImageUrl: null, releaseDate: "2026-05-01", ageRating: "12", kind: "SERIES" },
  { id: "c3", title: "황금빛 해안선", posterImageUrl: null, releaseDate: "2025-11-20", ageRating: "전체", kind: "MOVIE" },
  { id: "c4", title: "깊은 바다의 기록", posterImageUrl: null, releaseDate: "2026-01-09", ageRating: "12", kind: "MOVIE" },
];
