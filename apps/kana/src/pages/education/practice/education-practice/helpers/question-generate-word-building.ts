import { transliterateByIndex } from "@nihongo/core/shared/helpers/wordsRomanji";

import {
  Maybe,
  PracticeQuestion,
} from "@/pages/education/practice/education-practice/lib/types/questions";
import { Kana, PracticeType } from "@/shared/constants/kana";
import { Word } from "@/shared/data/words";
import { getRandomWords } from "@/shared/helpers/words";

interface questionGenerateWordBuildingProps {
  addedKanaWords: string[];

  katakanaWords: Word[];
  hiraganaWords: Word[];

  kana: Kana.Hiragana | Kana.Katakana;

  lang: "ru" | "en";

  transliterations: number;
}

const questionGenerateWordBuilding = ({
  addedKanaWords,
  katakanaWords,
  hiraganaWords,
  kana,
  lang,
  transliterations,
}: questionGenerateWordBuildingProps): {
  question: Maybe<PracticeQuestion[PracticeType.WordBuilding]>;
  word: Word;
} => {
  const words = kana === Kana.Hiragana ? hiraganaWords : katakanaWords;

  const word = getRandomWords(addedKanaWords, words);

  const question: PracticeQuestion[PracticeType.WordBuilding] = {
    title: transliterateByIndex(word.kana, transliterations),
    subtitle: word[lang],
    sequence: word?.kana.split(""),
    kana: kana,
  };

  return { question, word: word };
};

export default questionGenerateWordBuilding;
