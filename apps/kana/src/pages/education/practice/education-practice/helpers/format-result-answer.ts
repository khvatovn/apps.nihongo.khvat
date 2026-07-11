import { ILetter } from "@nihongo/core/shared/data/lettersTable";
import { TFunction } from "i18next";

import { PracticeQuestion } from "../lib/types/questions";

import { Kana, PracticeType } from "@/shared/constants/kana";

interface FormatResultAnswerProps {
  question: PracticeQuestion;
  t: TFunction;
  transliterations: number;
}

export interface ResultAnswerView {
  lines: string[];
  subtitle: string;
}

const letterText = (letter: ILetter, kana: Kana, transliterations: number): string => {
  if (kana === Kana.Hiragana) return letter.hi;
  if (kana === Kana.Katakana) return letter.ka;
  return letter.transliterations[transliterations];
};

const formatResultAnswer = ({
  question,
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
      return {
        lines: [`${from} → ${to}`],
        subtitle: subtitle(kanaLabel(data.questionKana, data.answersKana)),
      };
    }

    case PracticeType.Drawing: {
      const data = question[PracticeType.Drawing]!;
      return {
        lines: [letterText(data.question, data.questionKana, transliterations)],
        subtitle: subtitle(kanaLabel(data.questionKana)),
      };
    }

    case PracticeType.Listening: {
      const data = question[PracticeType.Listening]!;
      const from = letterText(data.question, Kana.Romaji, transliterations);
      const to = letterText(data.question, data.answersKana, transliterations);
      return { lines: [`${from} → ${to}`], subtitle: subtitle(kanaLabel(data.answersKana)) };
    }

    case PracticeType.MultipleChoice: {
      const data = question[PracticeType.MultipleChoice]!;
      const correct = data.answers.find((answer) => answer.isTrue)?.title ?? "";
      return {
        lines: [`${data.word.kana} → ${correct}`],
        subtitle: subtitle(kanaLabel(data.kana)),
      };
    }

    case PracticeType.MatchingPairs: {
      const data = question[PracticeType.MatchingPairs]!;
      return {
        lines: data.pairs.map((pair) => `${pair.kana} → ${pair.transliteration}`),
        subtitle: subtitle(kanaLabel(data.questionKana)),
      };
    }

    case PracticeType.WordBuilding: {
      const data = question[PracticeType.WordBuilding]!;
      return {
        lines: [`${data.title} → ${data.sequence.join("")}`],
        subtitle: subtitle(kanaLabel(data.kana)),
      };
    }

    case PracticeType.Typing: {
      const data = question[PracticeType.Typing]!;
      const from = letterText(data.question, data.questionKana, transliterations);
      const to = letterText(data.question, Kana.Romaji, transliterations);
      return { lines: [`${from} → ${to}`], subtitle: subtitle(kanaLabel(data.questionKana)) };
    }

    default:
      return { lines: [], subtitle: "" };
  }
};

export default formatResultAnswer;
