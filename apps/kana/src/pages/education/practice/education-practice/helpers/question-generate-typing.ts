import { ShortLanguage } from "@nihongo/core/shared/constants/language";
import { ILetter } from "@nihongo/core/shared/data/lettersTable";

import {
  Maybe,
  PracticeQuestion,
} from "@/pages/education/practice/education-practice/lib/types/questions";
import { Kana, PracticeType } from "@/shared/constants/kana";

interface questionGenerateTypingProps {
  availableHiraganaLetters: ILetter[];
  availableKatakanaLetters: ILetter[];

  addedHiraganaLetters: string[];
  addedKatakanaLetters: string[];

  questionKana: Kana;

  language: ShortLanguage;
}

const getQuestion = (
  availableQuestionLetters: ILetter[],
  addedQuestionLetters: string[],
): ILetter | null => {
  const filtered = availableQuestionLetters.filter(
    (letter) => !addedQuestionLetters.includes(letter.id),
  );

  if (filtered.length === 0) return null;

  return filtered[Math.floor(Math.random() * filtered.length)];
};

const questionGenerateTyping = ({
  availableHiraganaLetters,
  availableKatakanaLetters,

  addedHiraganaLetters,
  addedKatakanaLetters,

  questionKana,

  language,
}: questionGenerateTypingProps): Maybe<PracticeQuestion[PracticeType.Typing]> => {
  const availableQuestionLetters =
    questionKana === Kana.Hiragana ? availableHiraganaLetters : availableKatakanaLetters;
  const addedQuestionLetters =
    questionKana === Kana.Hiragana ? addedHiraganaLetters : addedKatakanaLetters;

  const questionLetter = getQuestion(availableQuestionLetters, addedQuestionLetters);

  if (!questionLetter) return null;

  const question: PracticeQuestion[PracticeType.Typing] = {
    question: questionLetter,
    questionKana: questionKana,
    language,
  };

  return question;
};

export default questionGenerateTyping;
