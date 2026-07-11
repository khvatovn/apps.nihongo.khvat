import { kana2transliteration } from "./transliteration/kana2transliteration";

const INDEX_TO_SYSTEM = ["hepburn", "kunreiShiki", "nihonShiki", "polivanovSystem"];

export type TransliterationIndex = 0 | 1 | 2 | 3;

export function transliterateByIndex(word: string, index: number): string {
  return kana2transliteration(word, INDEX_TO_SYSTEM[index] as "hepburn").toLowerCase();
}
