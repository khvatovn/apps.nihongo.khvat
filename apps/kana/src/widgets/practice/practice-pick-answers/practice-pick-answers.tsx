import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { TABLET_WIDTH } from "@nihongo/core/shared/constants/sizes";
import { useHaptic } from "@nihongo/core/shared/contexts/haptic/haptic-context";
import {
  ILetter,
  dakuonFlatLettersId,
  handakuonFlatLettersId,
  yoonFlatLettersId,
} from "@nihongo/core/shared/data/lettersTable";
import useGetRomaji from "@nihongo/core/shared/lib/i18n/hooks/useKey";
import { useTranslation } from "react-i18next";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import AnswerCard from "@/entities/education/practice/answer-card/answer-card";
import { OnSubmit } from "@/pages/education/practice/education-practice/lib/types/questions";
import { useStatisticsContext } from "@/pages/kana/kana-table-list-page/model/hooks";
import { Kana, KanaAlphabet, TEST_DELAY } from "@/shared/constants/kana";
import { useFirstClickHandler } from "@/shared/helpers/firstClickHandler";
import Header from "@/shared/ui/practice-header/practice-header";

interface Props {
  question: ILetter;
  answers: ILetter[];
  questionKana: Kana;
  answersKana: Kana;
  currentIndex?: number;
  onCompleted: OnSubmit;
}

const EducationPracticeSelectAnswers = React.memo<Props>(function EducationPracticeSelectAnswers({
  question,
  answers,
  questionKana,
  answersKana,
  currentIndex,
  onCompleted,
}) {
  const { width, height } = useWindowDimensions();
  const { t } = useTranslation();
  const { getRomaji } = useGetRomaji();
  const { recalculateOnce } = useStatisticsContext();
  const { triggerHaptic } = useHaptic();

  const [answerState, setAnswerState] = useState({
    selected: null as string | null,
    isCorrect: false,
  });

  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    setAnswerState({ selected: null, isCorrect: false });
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [question, currentIndex]);

  const delayCallback = useCallback((ms: number, callback: () => void) => {
    const start = Date.now();
    const check = () => {
      if (Date.now() - start >= ms) callback();
      else frameRef.current = requestAnimationFrame(check);
    };
    frameRef.current = requestAnimationFrame(check);
  }, []);

  const handlePick = useCallback(
    (answer: ILetter) => {
      if (answerState.selected) return;

      triggerHaptic();

      const key = questionKana + answer.id + question.id;
      const isCorrect = answer.id === question.id;

      const typeOfChapter =
        questionKana === Kana.Romaji
          ? answersKana === Kana.Hiragana
            ? KanaAlphabet.Hiragana
            : KanaAlphabet.Katakana
          : questionKana === Kana.Hiragana
            ? KanaAlphabet.Hiragana
            : KanaAlphabet.Katakana;
      recalculateOnce(typeOfChapter, question.id, isCorrect);

      setAnswerState({ selected: key, isCorrect });
      onCompleted({ isCorrectAnswer: isCorrect });

      if (isCorrect) {
        delayCallback(TEST_DELAY, () => setAnswerState({ selected: null, isCorrect: false }));
      }
    },
    [
      answerState.selected,
      triggerHaptic,
      questionKana,
      question,
      answersKana,
      recalculateOnce,
      onCompleted,
      delayCallback,
    ],
  );

  // * useFirstClickHandler сам мемоизирован — просто оборачиваем стабильный обработчик.
  const pickAnswer = useFirstClickHandler(handlePick, 300);

  const widthCard = useMemo(() => {
    const totalWidth = width - 50;

    if (totalWidth > TABLET_WIDTH && height < TABLET_WIDTH * 2) return (404 - 50) / 2;

    if (totalWidth > TABLET_WIDTH) return (TABLET_WIDTH - 50) / 2;

    return totalWidth / 2;
  }, [width, height]);

  const getTypeById = useCallback(
    (id: string) =>
      yoonFlatLettersId.includes(id)
        ? t("kana.yoon")
        : handakuonFlatLettersId.includes(id)
          ? t("kana.handakuon")
          : dakuonFlatLettersId.includes(id)
            ? t("kana.dakuon")
            : t("kana.basic"),
    [t],
  );

  const styles = useMemo(() => makeStyles(), []);

  const symbolLabel = useMemo(() => {
    if (questionKana === Kana.Hiragana) return question.hi;
    if (questionKana === Kana.Katakana) return question.ka;
    return getRomaji(question);
  }, [questionKana, question, getRomaji]);

  const subTitle = useMemo(() => {
    const kanaText = t(`kana.${questionKana.toLowerCase()}`);
    return `${kanaText} (${getTypeById(question.id)})`;
  }, [questionKana, question.id, getTypeById, t]);

  return (
    <>
      <Header title={symbolLabel} subtitle={subTitle} />
      <View style={styles.container}>
        <View style={[styles.content, { maxWidth: widthCard * 2 + 50 }]}>
          {answers.map((answer) => {
            const key = questionKana + answer.id + question.id;

            return (
              <AnswerCard
                key={answer.id}
                value={answer}
                width={widthCard}
                redMarked={answerState.selected === key && !answerState.isCorrect}
                greenMarked={answerState.selected === key && answerState.isCorrect}
                onClick={pickAnswer}
                questionId={question.id}
              >
                {answersKana === Kana.Hiragana
                  ? answer.hi
                  : answersKana === Kana.Katakana
                    ? answer.ka
                    : getRomaji(answer)}
              </AnswerCard>
            );
          })}
        </View>
      </View>
    </>
  );
});

const makeStyles = () =>
  StyleSheet.create({
    container: {
      width: "100%",

      flexDirection: "column",
      alignItems: "center",
    },
    content: {
      width: "100%",

      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default EducationPracticeSelectAnswers;
