import {
  dakuonFlatLettersId,
  handakuonFlatLettersId,
  yoonFlatLettersId,
} from "@nihongo/core/shared/data/lettersTable";

export const getTypeById = (id: string) => {
  if (handakuonFlatLettersId.includes(id)) return "kana.handakuon";
  if (yoonFlatLettersId.includes(id)) return "kana.yoon";
  if (dakuonFlatLettersId.includes(id)) return "kana.dakuon";

  return "kana.basic";
};
