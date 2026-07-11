import { ILetter } from "@nihongo/core/shared/data/lettersTable";

import {
  Maybe,
  PracticeQuestion,
} from "@/pages/education/practice/education-practice/lib/types/questions";
import { Kana, PracticeType } from "@/shared/constants/kana";

interface questionGenerateTestingProps {
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

const questionGenerateTesting = ({
  availableHiraganaLetters,
  availableKatakanaLetters,
  addedHiraganaLetters,
  addedKatakanaLetters,
  questionKanaTemplate,
}: questionGenerateTestingProps): Maybe<PracticeQuestion[PracticeType.Testing]> => {
  if (questionKanaTemplate.length !== 2) return null;

  const questionKana = questionKanaTemplate[0];
  const answersKana = questionKanaTemplate[1];

  const getAvailableLetters = () => {
    if (questionKana === Kana.Hiragana) return availableHiraganaLetters;
    if (questionKana === Kana.Katakana) return availableKatakanaLetters;

    if (questionKana === Kana.Romaji) {
      if (answersKana === Kana.Hiragana) return availableHiraganaLetters;
      if (answersKana === Kana.Katakana) return availableKatakanaLetters;
    }

    return [];
  };

  const getAddedQuestions = () => {
    if (questionKana === Kana.Hiragana) return addedHiraganaLetters;
    if (questionKana === Kana.Katakana) return addedKatakanaLetters;

    if (questionKana === Kana.Romaji) {
      if (answersKana === Kana.Hiragana) return addedHiraganaLetters;
      if (answersKana === Kana.Katakana) return addedKatakanaLetters;
    }

    return [];
  };

  const getAvailableAnswers = () => {
    if (answersKana === Kana.Hiragana) return availableHiraganaLetters;

    if (answersKana === Kana.Romaji) {
      if (questionKana === Kana.Hiragana) return availableHiraganaLetters;
    }

    return availableKatakanaLetters;
  };

  const availableQuestionLetters = getAvailableLetters();
  const availableAnswerLetters = getAvailableAnswers();
  const addedQuestionLetters = getAddedQuestions();

  const questionLetter = getQuestion(availableQuestionLetters, addedQuestionLetters);

  if (!questionLetter) return null;

  const answersLetters = getAnswers(availableAnswerLetters, questionLetter);

  const question: PracticeQuestion[PracticeType.Testing] = {
    question: questionLetter,
    answers: answersLetters,
    questionKana,
    answersKana,
  };

  return question;
};

export default questionGenerateTesting;
