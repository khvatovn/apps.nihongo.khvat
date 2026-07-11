import { Word } from "@/shared/data/words";

export interface InitialState {
  selectedLettersHiragana: number;
  selectedLettersKatakana: number;
  selectedLetters: number;
  selected: {
    base: { katakana: Array<string>; hiragana: Array<string> };
    dakuon: { katakana: Array<string>; hiragana: Array<string> };
    handakuon: { katakana: Array<string>; hiragana: Array<string> };
    yoon: { katakana: Array<string>; hiragana: Array<string> };
  };
  selectedWords: { katakana: Word[]; hiragana: Word[] };
}
