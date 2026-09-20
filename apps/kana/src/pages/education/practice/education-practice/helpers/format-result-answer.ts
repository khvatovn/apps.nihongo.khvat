import { ILetter } from "@nihongo/core/shared/data/lettersTable";
import { TFunction } from "i18next";

import { PracticeQuestion, PracticeUserSelect, UserSelectByType } from "../lib/types/questions";

import { Kana, PracticeType } from "@/shared/constants/kana";

interface FormatResultAnswerProps {
  question: PracticeQuestion;
  userSelect: PracticeUserSelect | null;
  t: TFunction;
  transliterations: number;
}

export type ResultUserLine = { text: string; isCorrect: boolean };

export interface ResultAnswerView {
  question: PracticeQuestion | null;

  lines: string[];
  userLines: ResultUserLine[];
  subtitle: string;
}

const letterText = (letter: ILetter, kana: Kana, transliterations: number): string => {
  if (kana === Kana.Hiragana) return letter.hi;
  if (kana === Kana.Katakana) return letter.ka;
  return letter.transliterations[transliterations];
};

const selectOf = <Type extends PracticeType>(
  userSelect: PracticeUserSelect | null,
  type: Type,
): UserSelectByType[Type] | null => {
  if (userSelect === null || userSelect.type !== type) return null;

  return userSelect.value as UserSelectByType[Type];
};

const formatResultAnswer = ({
  question,
  userSelect,
  t,
  transliterations,
}: FormatResultAnswerProps): ResultAnswerView => {
  const typeLabel = t(`practice.modes.${question.type}.title`);

  const kanaLabel = (...kanas: Kana[]): string =>
    [...new Set(kanas.filter((kana) => kana !== Kana.Romaji))]
      .map((kana) => t(`kana.${kana.toLowerCase()}`))
      .join(" & ");

  const subtitle = (kana: string) => `${kana} / ${typeLabel}`;

  switch (question.type) {
    case PracticeType.Testing: {
      const data = question[PracticeType.Testing]!;
      const from = letterText(data.question, data.questionKana, transliterations);
      const to = letterText(data.question, data.answersKana, transliterations);

      const picked = selectOf(userSelect, PracticeType.Testing);

      return {
        question: {
          type: PracticeType.Testing,

          [PracticeType.Testing]: data,
        },

        lines: [`${from} → ${to}`],
        userLines: picked
          ? [
              {
                text: `${from} → ${letterText(picked, data.answersKana, transliterations)}`,
                isCorrect: picked.id === data.question.id,
              },
            ]
          : [],
        subtitle: subtitle(kanaLabel(data.questionKana, data.answersKana)),
      };
    }

    case PracticeType.Drawing: {
      const data = question[PracticeType.Drawing]!;
      return {
        question: {
          type: PracticeType.Drawing,

          [PracticeType.Drawing]: data,
        },

        lines: [letterText(data.question, data.questionKana, transliterations)],
        userLines: [],
        subtitle: subtitle(kanaLabel(data.questionKana)),
      };
    }

    case PracticeType.Listening: {
      const data = question[PracticeType.Listening]!;
      const from = letterText(data.question, Kana.Romaji, transliterations);
      const to = letterText(data.question, data.answersKana, transliterations);
      const picked = selectOf(userSelect, PracticeType.Listening);

      return {
        question: {
          type: PracticeType.Listening,

          [PracticeType.Listening]: data,
        },

        lines: [`${from} → ${to}`],
        userLines: picked
          ? [
              {
                text: `${from} → ${letterText(picked, data.answersKana, transliterations)}`,
                isCorrect: picked.id === data.question.id,
              },
            ]
          : [],
        subtitle: subtitle(kanaLabel(data.answersKana)),
      };
    }

    case PracticeType.MultipleChoice: {
      const data = question[PracticeType.MultipleChoice]!;
      const correct = data.answers.find((answer) => answer.isTrue)?.title ?? "";
      const picked = selectOf(userSelect, PracticeType.MultipleChoice);

      return {
        question: {
          type: PracticeType.MultipleChoice,

          [PracticeType.MultipleChoice]: data,
        },

        lines: [`${data.word.kana} → ${correct}`],
        userLines: picked
          ? [{ text: `${data.word.kana} → ${picked}`, isCorrect: picked === correct }]
          : [],
        subtitle: subtitle(kanaLabel(data.kana)),
      };
    }

    case PracticeType.MatchingPairs: {
      const data = question[PracticeType.MatchingPairs]!;
      const attempts = selectOf(userSelect, PracticeType.MatchingPairs);

      return {
        question: {
          type: PracticeType.MatchingPairs,

          [PracticeType.MatchingPairs]: data,
        },

        lines: data.pairs.map((pair) => `${pair.kana} → ${pair.transliteration}`),
        userLines: (attempts ?? []).map((attempt) => ({
          text: `${attempt.question} → ${attempt.answer}`,
          isCorrect: attempt.isCorrect,
        })),
        subtitle: subtitle(kanaLabel(data.questionKana)),
      };
    }

    case PracticeType.WordBuilding: {
      const data = question[PracticeType.WordBuilding]!;
      const picked = selectOf(userSelect, PracticeType.WordBuilding);
      const correctWord = data.sequence.join("");

      return {
        question: {
          type: PracticeType.WordBuilding,

          [PracticeType.WordBuilding]: data,
        },

        lines: [`${data.title} → ${correctWord}`],
        userLines: picked
          ? [
              {
                text: `${data.title} → ${picked.join("")}`,
                isCorrect: picked.join("").toLowerCase() === correctWord.toLowerCase(),
              },
            ]
          : [],
        subtitle: subtitle(kanaLabel(data.kana)),
      };
    }

    case PracticeType.Typing: {
      const data = question[PracticeType.Typing]!;
      const from = letterText(data.question, data.questionKana, transliterations);
      const to = letterText(data.question, Kana.Romaji, transliterations);
      const typed = selectOf(userSelect, PracticeType.Typing);

      return {
        question: {
          type: PracticeType.Typing,

          [PracticeType.Typing]: data,
        },

        lines: [`${from} → ${to}`],
        userLines:
          typed !== null
            ? [{ text: `${from} → ${typed}`, isCorrect: typed.toLowerCase() === to.toLowerCase() }]
            : [],
        subtitle: subtitle(kanaLabel(data.questionKana)),
      };
    }

    default:
      return { question: null, lines: [], userLines: [], subtitle: "" };
  }
};

export default formatResultAnswer;
