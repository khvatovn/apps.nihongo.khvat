import { ShortLanguage } from "@nihongo/core/shared/constants/language";
import { ILetter } from "@nihongo/core/shared/data/lettersTable";

import { Kana, PracticeType } from "@/shared/constants/kana";
import { Word } from "@/shared/data/words";

export type Maybe<T> = T | null;

// * Practice Question
export type PracticeQuestion = {
  type: PracticeType;

  // * need to PracticeType.Testing
  [PracticeType.Testing]?: {
    question: ILetter;
    answers: ILetter[];
    questionKana: Kana;
    answersKana: Kana;
  };

  // * need to PracticeType.Drawing
  [PracticeType.Drawing]?: {
    question: ILetter;
    questionKana: Kana;
  };

  // * need to PracticeType.Listening
  [PracticeType.Listening]?: {
    question: ILetter;
    answers: ILetter[];
    answersKana: Kana;
  };

  // * need to PracticeType.MultipleChoice
  [PracticeType.MultipleChoice]?: {
    word: Word;
    answers: { title: string; isTrue: boolean }[];
    kana: Kana;
  };

  // * need to PracticeType.MatchingPairs
  [PracticeType.MatchingPairs]?: {
    pairs: {
      kana: string;
      translate: string;
      transliteration: string;
    }[];
    questionKana: Kana;
  };

  // * need to PracticeType.WordBuilding
  [PracticeType.WordBuilding]?: {
    sequence: string[];
    title: string;
    subtitle: string;
    kana: Kana;
  };

  // * need to PracticeType.Typing
  [PracticeType.Typing]?: {
    question: ILetter;
    questionKana: Kana;
    language: ShortLanguage;
  };
};

export type Result = {
  questions: {
    type: PracticeType;

    [PracticeType.Testing]?: {
      question: ILetter;
      answers: ILetter[];
      questionKana: Kana;
      answersKana: Kana;

      isCorrectAnswer: boolean;
      wrongAnswersId?: string;
    };
  }[];
};

export type OnSubmit = (data: {
  // * `true` if the answer is correct, `false` if it is not correct
  isCorrectAnswer: boolean;
}) => void;

export type PracticeResultData = {
  questionsTime: { index: number; isCorrectAnswer: boolean; ms: number }[];
  // * all practice questions to show the answer list on the result screen
  questions: PracticeQuestion[];
};
