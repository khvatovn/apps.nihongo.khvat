import { transliterateByIndex } from "@nihongo/core/shared/helpers/wordsRomanji";

import {
  Maybe,
  PracticeQuestion,
} from "@/pages/education/practice/education-practice/lib/types/questions";
import { Kana, KanaAlphabet, PracticeType } from "@/shared/constants/kana";
import { Word } from "@/shared/data/words";
import { shuffleArray } from "@/shared/helpers/letters";
import { getRandomWords } from "@/shared/helpers/words";

interface GenerateChoiceAnswerProps {
  addedKanaWords: string[];

  katakanaWords: Word[];
  hiraganaWords: Word[];

  kana: KanaAlphabet;

  transliterations: number;
}

const questionGenerateMultipleChoice = ({
  addedKanaWords,
  katakanaWords,
  hiraganaWords,
  kana,
  transliterations,
}: GenerateChoiceAnswerProps): Maybe<PracticeQuestion[PracticeType.MultipleChoice]> => {
  const words = kana === KanaAlphabet.Hiragana ? hiraganaWords : katakanaWords;

  const word = getRandomWords(addedKanaWords, words);

  if (words.length === 0) return null;

  const wordSecond = getRandomWords([word.kana], words);
  const wordThird = getRandomWords([word.kana, wordSecond.kana], words);
  const wordFourth = getRandomWords([word.kana, wordSecond.kana, wordThird.kana], words);

  const question: PracticeQuestion[PracticeType.MultipleChoice] = {
    word: word,
    kana: kana === KanaAlphabet.Hiragana ? Kana.Hiragana : Kana.Katakana,
    answers: shuffleArray([
      { title: transliterateByIndex(word.kana, transliterations), isTrue: true },
      { title: transliterateByIndex(wordSecond.kana, transliterations), isTrue: false },
      { title: transliterateByIndex(wordThird.kana, transliterations), isTrue: false },
      { title: transliterateByIndex(wordFourth.kana, transliterations), isTrue: false },
    ]),
  };

  return question;
};

export default questionGenerateMultipleChoice;
