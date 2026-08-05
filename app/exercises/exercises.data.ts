// TODO: EXERCISES 테이블/API 연동 전까지 사용하는 임시 하드코딩 데이터
export type BodyPart = "가슴" | "등" | "하체" | "어깨" | "삼두" | "이두" | "코어";
export type Equipment = "바벨" | "덤벨" | "케틀벨" | "밴드" | "머신" | "폼롤러";

export type Exercise = {
  id: number;
  name: string;
  bodyPart: BodyPart;
  equipment: Equipment | null;
};

export const BODY_PARTS: BodyPart[] = ["가슴", "등", "하체", "어깨", "삼두", "이두", "코어"];
export const EQUIPMENTS: Equipment[] = ["바벨", "덤벨", "케틀벨", "밴드", "머신", "폼롤러"];

export const EXERCISES: Exercise[] = [
  { id: 1, name: "벤치 프레스", bodyPart: "가슴", equipment: "바벨" },
  { id: 2, name: "덤벨 벤치 프레스", bodyPart: "가슴", equipment: "덤벨" },
  { id: 3, name: "덤벨 풀오버", bodyPart: "가슴", equipment: "덤벨" },
  { id: 4, name: "펙덱 플라이", bodyPart: "가슴", equipment: "머신" },
  { id: 5, name: "덤벨 플라이", bodyPart: "가슴", equipment: "덤벨" },
  { id: 6, name: "랫풀다운", bodyPart: "등", equipment: "머신" },
  { id: 7, name: "바벨 로우", bodyPart: "등", equipment: "바벨" },
  { id: 8, name: "데드리프트", bodyPart: "등", equipment: "바벨" },
  { id: 9, name: "스쿼트", bodyPart: "하체", equipment: "바벨" },
  { id: 10, name: "레그 프레스", bodyPart: "하체", equipment: "머신" },
  { id: 11, name: "런지", bodyPart: "하체", equipment: "덤벨" },
  { id: 12, name: "숄더 프레스", bodyPart: "어깨", equipment: "덤벨" },
  { id: 13, name: "사이드 레터럴 레이즈", bodyPart: "어깨", equipment: "덤벨" },
  { id: 14, name: "케이블 푸시다운", bodyPart: "삼두", equipment: "머신" },
  { id: 15, name: "덤벨 킥백", bodyPart: "삼두", equipment: "덤벨" },
  { id: 16, name: "바벨 컬", bodyPart: "이두", equipment: "바벨" },
  { id: 17, name: "덤벨 컬", bodyPart: "이두", equipment: "덤벨" },
  { id: 18, name: "플랭크", bodyPart: "코어", equipment: null },
  { id: 19, name: "케이블 크런치", bodyPart: "코어", equipment: "머신" },
  { id: 20, name: "폼롤러 스트레칭", bodyPart: "코어", equipment: "폼롤러" },
];
