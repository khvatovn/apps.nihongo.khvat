import { transliterateByIndex } from "@nihongo/core/shared/helpers/wordsRomanji";

import {
  Maybe,
  PracticeQuestion,
} from "@/pages/education/practice/education-practice/lib/types/questions";
import { Kana, PracticeType } from "@/shared/constants/kana";
import { Word } from "@/shared/data/words";
import { getRandomWords } from "@/shared/helpers/words";

interface questionGenerateMatchingPairsProps {
  katakanaWords: Word[];
  hiraganaWords: Word[];

  kana: Kana.Hiragana | Kana.Katakana;

  lang: "en" | "ru";

  transliterations: number;
}

const questionGenerateMatchingPairs = ({
  katakanaWords,
  hiraganaWords,
  kana,
  lang,
  transliterations,
}: questionGenerateMatchingPairsProps): Maybe<PracticeQuestion[PracticeType.MatchingPairs]> => {
  const words = kana === Kana.Hiragana ? hiraganaWords : katakanaWords;

  if (words.length === 0) return null;

  const word = getRandomWords([], words.flat());

  const word1 = getRandomWords([word.kana], words);
  const word2 = getRandomWords([word.kana, word1.kana], words);

  const kanaElements = [word, word1, word2];

  const wordsPairs = kanaElements.map((item) => ({
    kana: item.kana,
    translate: item?.[lang as "en"],
    transliteration: transliterateByIndex(item.kana, transliterations),
  }));

  return {
    pairs: wordsPairs,
    questionKana: kana,
  };
};

export default questionGenerateMatchingPairs;
