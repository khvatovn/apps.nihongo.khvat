import { ILetter } from "@nihongo/core/shared/data/lettersTable";

import {
  Maybe,
  PracticeQuestion,
} from "@/pages/education/practice/education-practice/lib/types/questions";
import { Kana, PracticeType } from "@/shared/constants/kana";

interface questionGenerateDrawingProps {
  availableHiraganaLetters: ILetter[];
  availableKatakanaLetters: ILetter[];

  addedHiraganaLetters: string[];
  addedKatakanaLetters: string[];

  questionKana: Kana;
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

const questionGenerateDrawing = ({
  availableHiraganaLetters,
  availableKatakanaLetters,

  addedHiraganaLetters,
  addedKatakanaLetters,

  questionKana,
}: questionGenerateDrawingProps): Maybe<PracticeQuestion[PracticeType.Drawing]> => {
  const availableQuestionLetters =
    questionKana === Kana.Hiragana ? availableHiraganaLetters : availableKatakanaLetters;
  const addedQuestionLetters =
    questionKana === Kana.Hiragana ? addedHiraganaLetters : addedKatakanaLetters;

  const questionLetter = getQuestion(availableQuestionLetters, addedQuestionLetters);

  if (!questionLetter) return null;

  const question: PracticeQuestion[PracticeType.Drawing] = {
    question: questionLetter,
    questionKana: questionKana,
  };

  return question;
};

export default questionGenerateDrawing;
