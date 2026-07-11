import React from "react";

import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";

import Sequence from "@/entities/education/sequence";
import { OnSubmit } from "@/pages/education/practice/education-practice/lib/types/questions";
import { Kana, TEST_DELAY } from "@/shared/constants/kana";
import { useFirstClickHandler } from "@/shared/helpers/firstClickHandler";
import Title from "@/widgets/learning/lesson/info-screen/title/title";

interface ChooseLettersProps {
  sequence: string[];
  title: string;
  subtitle: string;
  kana: Kana;

  onCompleted: OnSubmit;
}

const EducationPracticeChooseLetters: React.FC<ChooseLettersProps> = ({
  sequence,
  title,
  subtitle,
  kana,

  onCompleted,
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const onFinish = useFirstClickHandler(
    (hasError) => onCompleted({ isCorrectAnswer: hasError }),
    TEST_DELAY,
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { color: colors.TextPrimary }]}>
        {kana === Kana.Hiragana
          ? t("practice.selectHiraganaForWord")
          : t("practice.selectKatakanaForWord")}
      </Text>

      <Title title={title} subtitle={subtitle} />

      <Sequence key={sequence.join(", ")} onFinish={onFinish} sequence={sequence} />
    </View>
  );
};

export default EducationPracticeChooseLetters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  question: {
    width: "100%",
    textAlign: "center",
    ...Typography.boldDefault,
    marginBottom: 8,
  },
});
