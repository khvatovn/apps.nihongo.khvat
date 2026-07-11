import { Selected } from "@/pages/kana/kana-table-choice-letters-page/model/context";

export const getKatakanaLetters = (selected: Selected) => [
  ...selected.base.katakana,
  ...selected.dakuon.katakana,
  ...selected.handakuon.katakana,
  ...selected.yoon.katakana,
];

export const getHiraganaLetters = (selected: Selected) => [
  ...selected.base.hiragana,
  ...selected.dakuon.hiragana,
  ...selected.handakuon.hiragana,
  ...selected.yoon.hiragana,
];
