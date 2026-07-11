import React, { useCallback, useEffect, useMemo, useState } from "react";

import { TABLET_WIDTH } from "@nihongo/core/shared/constants/sizes";
import { useHaptic } from "@nihongo/core/shared/contexts/haptic/haptic-context";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { ILetter } from "@nihongo/core/shared/data/lettersTable";
import useGetRomaji from "@nihongo/core/shared/lib/i18n/hooks/useKey";
import { Typography } from "@nihongo/core/shared/typography";
import { SpeakerHighIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import SoundLetter from "@/entities/kana/sound-letter/sound-letter";
import { OnSubmit } from "@/pages/education/practice/education-practice/lib/types/questions";
import { useStatisticsContext } from "@/pages/kana/kana-table-list-page/model/hooks";
import { Kana, KanaAlphabet } from "@/shared/constants/kana";
import { useFirstClickHandler } from "@/shared/helpers/firstClickHandler";

interface EducationPracticeSelectAnswersProps {
  question: ILetter;
  answers: ILetter[];
  answersKana: Kana;

  onCompleted: OnSubmit;
}

const PracticeAudio: React.FC<EducationPracticeSelectAnswersProps> = ({
  question,
  answers = [],
  answersKana,
  onCompleted,
}) => {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const { colors } = useThemeContext();

  const { recalculateOnce } = useStatisticsContext();
  const { triggerHaptic } = useHaptic();

  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [isLocked, setIsLocked] = useState(false);
  const [answerState, setAnswerState] = useState<{
    id: string;
    isCorrect: boolean;
    question: string;
    index: number;
  } | null>(null);

  useEffect(() => {
    setAnswerState(null);
    setIsLocked(false);
  }, [question, answers]);

  const handlePick = useCallback(
    (answer: ILetter, questionId: string, index: number) => {
      if (isLocked || questionId !== question.id || answerState !== null) return;

      triggerHaptic();

      const isCorrect = answer.id === question.id;

      const typeOfChapter =
        answersKana === Kana.Hiragana ? KanaAlphabet.Hiragana : KanaAlphabet.Katakana;
      recalculateOnce(typeOfChapter, question.id, isCorrect);

      setAnswerState({ id: answer.id, isCorrect, question: question.id, index });
      setIsLocked(true);

      onCompleted({ isCorrectAnswer: isCorrect });
    },
    [answersKana, question, onCompleted, isLocked, answerState, triggerHaptic, recalculateOnce],
  );

  // * useFirstClickHandler сам мемоизирован — оборачиваем стабильный обработчик.
  const pick = useFirstClickHandler(handlePick, 300);

  const widthCard = useMemo(() => {
    const totalWidth = width - 50;

    if (totalWidth > TABLET_WIDTH && height < TABLET_WIDTH * 2) return (404 - 50) / 2;

    if (totalWidth > TABLET_WIDTH) return (TABLET_WIDTH - 50) / 2;

    return totalWidth / 2;
  }, [width, height]);

  const { getRomaji } = useGetRomaji();

  const getTitle = useCallback(
    (answer: ILetter) => {
      if (answersKana === Kana.Hiragana) return answer.hi;
      if (answersKana === Kana.Katakana) return answer.ka;
      return getRomaji(answer);
    },
    [answersKana, getRomaji],
  );

  return (
    <>
      <View style={styles.buttonContainer}>
        <View
          style={{
            marginTop: 26,
          }}
        >
          <SoundLetter isAutoPlay id={question.id}>
            <View style={styles.button}>
              <SpeakerHighIcon size={64} color={colors.BgContrast} />
            </View>
          </SoundLetter>
        </View>

        <Text style={styles.subText}>{t("practice.playAudio")}</Text>
      </View>
      <View style={styles.container}>
        <View style={[styles.content, { maxWidth: widthCard * 2 + 50 }]}>
          {answers?.map((answer, index) => {
            const cardBackground = (pressed: boolean, marked: boolean | null) => {
              if (!answerState && pressed) return colors.BgLightGray;
              if (marked === false) return colors.BgDanger;
              if (marked === true) return colors.BgSuccess;
              return colors.BgSecondary;
            };

            const marked =
              answerState?.id === answer.id &&
              answerState?.question === question.id &&
              index === answerState.index
                ? answerState.isCorrect
                : null;

            const textColor =
              marked === false || marked === true
                ? colors.TextContrastSecondary
                : colors.TextPrimary;

            return (
              <Pressable
                key={answer.id}
                onPress={() => pick?.(answer, question.id, index)}
                style={({ pressed }) => ({
                  width: widthCard,
                  height: widthCard,

                  justifyContent: "center",
                  alignItems: "center",

                  backgroundColor: cardBackground(pressed, marked),
                  borderRadius: 24,
                })}
              >
                <Text style={{ ...Typography.boldH2, color: textColor }}>{getTitle(answer)}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </>
  );
};

const makeStyles = (colors: ColorsType) =>
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
    buttonContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: colors.BgSecondary,
      width: 104,
      height: 104,

      justifyContent: "center",
      alignItems: "center",

      borderRadius: 60,
      marginBottom: 8,
    },
    subText: {
      ...Typography.boldDefault,
      color: colors.TextSecondary,
    },
  });

export default PracticeAudio;
