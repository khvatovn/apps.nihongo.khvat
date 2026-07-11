import { ILetter } from "@nihongo/core/shared/data/lettersTable";

import {
  Maybe,
  PracticeQuestion,
} from "@/pages/education/practice/education-practice/lib/types/questions";
import { Kana, PracticeType } from "@/shared/constants/kana";

interface questionGenerateListeningProps {
  availableHiraganaLetters: ILetter[];
  availableKatakanaLetters: ILetter[];

  addedHiraganaLetters: string[];
  addedKatakanaLetters: string[];

  questionKanaTemplate: Kana[];
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

const getAnswers = (availableAnswerLetters: ILetter[], answer: ILetter): ILetter[] => {
  const filtered = availableAnswerLetters
    .filter((letter) => answer.id !== letter.id)
    .sort(() => Math.random() - 0.5);

  const shuffled = [...filtered.slice(0, 3), answer].sort(() => Math.random() - 0.5);
  return shuffled;
};

const questionGenerateListening = ({
  availableHiraganaLetters,
  availableKatakanaLetters,
  addedHiraganaLetters,
  addedKatakanaLetters,
  questionKanaTemplate,
}: questionGenerateListeningProps): Maybe<PracticeQuestion[PracticeType.Listening]> => {
  if (questionKanaTemplate.length !== 2) return null;

  const answersKana = questionKanaTemplate[1];

  const availableQuestionLetters =
    answersKana === Kana.Hiragana ? availableHiraganaLetters : availableKatakanaLetters;
  const availableAnswerLetters =
    answersKana === Kana.Hiragana ? availableHiraganaLetters : availableKatakanaLetters;

  const addedQuestionLetters =
    answersKana === Kana.Hiragana ? addedHiraganaLetters : addedKatakanaLetters;

  const questionLetter = getQuestion(availableQuestionLetters, addedQuestionLetters);

  if (!questionLetter) return null;

  const answersLetters = getAnswers(availableAnswerLetters, questionLetter);

  const question: PracticeQuestion[PracticeType.Listening] = {
    question: questionLetter,
    answers: answersLetters,
    answersKana: answersKana,
  };

  return question;
};

export default questionGenerateListening;
