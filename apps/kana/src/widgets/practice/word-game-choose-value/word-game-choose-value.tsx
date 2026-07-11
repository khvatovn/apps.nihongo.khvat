import React, { useMemo } from "react";

import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";

import SelectAnswer from "@/entities/education/select-answer/select-answer";
import { OnSubmit } from "@/pages/education/practice/education-practice/lib/types/questions";
import { TEST_DELAY } from "@/shared/constants/kana";
import { Word } from "@/shared/data/words";
import { useFirstClickHandler } from "@/shared/helpers/firstClickHandler";
import Title from "@/widgets/learning/lesson/info-screen/title/title";

interface EducationPracticeChooseValueProps {
  word: Word;
  answers: { title: string; isTrue: boolean }[];

  onCompleted: OnSubmit;
}

const EducationPracticeChooseValue: React.FC<EducationPracticeChooseValueProps> = ({
  word,
  answers,

  onCompleted,
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { colors } = useThemeContext();

  const langKey = language === "ru" ? "ru" : "en";

  const answersList = useMemo(
    () =>
      answers.map((item) => ({
        title: item.title,
        isTrue: item.isTrue,
      })),
    [answers],
  );

  const styles = makeStyles(colors);

  const onFinish = useFirstClickHandler((hasError) => {
    onCompleted({ isCorrectAnswer: !hasError });
  }, TEST_DELAY);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.question}>{t("practice.selectCorrectTransliteration")}</Text>

        <Title title={word.kana} subtitle={`(${word[langKey]})`} />

        <SelectAnswer key={answersList.join()} answers={answersList} onFinish={onFinish} />
      </View>
    </View>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
    content: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",

      width: "100%",
      maxWidth: 546,
    },

    question: {
      width: "100%",
      textAlign: "center",
      ...Typography.boldDefault,
      color: colors.TextPrimary,
      marginBottom: 8,
    },
  });

export default EducationPracticeChooseValue;
