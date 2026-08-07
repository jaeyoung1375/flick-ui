// TODO: 부위/기구 필터 옵션은 공통코드 연동 전까지 사용하는 임시 하드코딩 데이터

export type Exercise = {
  id: number;
  name: string;
  bodyPartCd: string;
  bodyPartNm: string;
  equipmentCd: string;
  equipmentNm: string;
};
