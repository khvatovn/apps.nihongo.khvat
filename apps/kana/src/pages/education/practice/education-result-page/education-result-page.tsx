import React, { useCallback, useEffect } from "react";

import { isAndroid } from "@nihongo/core/shared/constants/platformUtil";
import { TABLET_WIDTH } from "@nihongo/core/shared/constants/sizes";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import useGetRomaji from "@nihongo/core/shared/lib/i18n/hooks/useKey";
import { Typography } from "@nihongo/core/shared/typography";
import PrimaryButton from "@nihongo/core/shared/ui/buttons/Primary/primary-button";
import CircularProgressBar from "@nihongo/core/shared/ui/progressbar/circular/circular-progress-bar";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, StyleSheet, BackHandler, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Svg, Path } from "react-native-svg";

import formatResultAnswer from "../education-practice/helpers/format-result-answer";
import { QUESTIONS_LENGTH } from "../education-practice/helpers/wrapper-question-generate";
import { PracticeResultData } from "../education-practice/lib/types/questions";

import { ROUTES, RootStackParamList } from "@/app/routes.types";
import { requestHuaweiStoreReview } from "@/shared/lib/promotions/huawei-store-review";
import { requestRustoreStoreReview } from "@/shared/lib/promotions/rustore-store-review";
import { requestStoreReview } from "@/shared/lib/promotions/store-review";
import { useTelegramPromotion } from "@/shared/lib/promotions/use-telegram-promotion";

type LearnResultsNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.RESULTS>;
interface EducationResultProps {
  route: RouteProp<RootStackParamList, typeof ROUTES.RESULTS>;
}

const ResultStatusIcon: React.FC<{ isCorrect: boolean; colors: ColorsType }> = ({
  isCorrect,
  colors,
}) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {isCorrect ? (
      <Path
        d="M5 13l4 4L19 7"
        stroke={colors.TextSuccess}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <Path
        d="M6 6l12 12M18 6L6 18"
        stroke={colors.TextDanger}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </Svg>
);

const EducationResultPage: React.FC<EducationResultProps> = ({ route }) => {
  const { showTelegramPromotionIfNeeded } = useTelegramPromotion();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const { colors } = useThemeContext();
  const navigation = useNavigation<LearnResultsNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (isAndroid) {
      StatusBar.setBackgroundColor(colors.BgPrimary);
    }

    return () => {
      if (isAndroid) {
        StatusBar.setBackgroundColor(colors.transparent);
      }
    };
  }, [colors]);

  type ResultStats = {
    totalQuestions: number;
    correctAnswers: number;
    totalTime: number;
    avgTime: number;
  };

  const calculateStats = (questionsTime: PracticeResultData["questionsTime"]): ResultStats => {
    const totalQuestions = questionsTime.length;
    const correctAnswers = questionsTime.filter((q) => q.isCorrectAnswer).length;
    const totalTime = questionsTime.reduce((sum, q) => sum + q.ms, 0);
    const avgTime = totalQuestions > 0 ? Math.round(totalTime / totalQuestions) : 0;

    return {
      totalQuestions,
      correctAnswers,
      totalTime,
      avgTime,
    };
  };

  const { questionsTime, questions } = route.params;
  const { transliterations } = useGetRomaji();

  const data = calculateStats(questionsTime.slice(0, QUESTIONS_LENGTH));

  // * for each answer - lines "question → answer", signature and correctness
  const answers = questionsTime.slice(0, QUESTIONS_LENGTH).map(({ index, isCorrectAnswer }) => ({
    ...formatResultAnswer({ question: questions[index], t, transliterations }),
    isCorrectAnswer,
  }));

  const styles = makeStyles(colors);

  const home = useCallback(async () => {
    await requestStoreReview();
    await requestHuaweiStoreReview();
    await requestRustoreStoreReview();
    await showTelegramPromotionIfNeeded();
    navigation.popToTop();
  }, [navigation, showTelegramPromotionIfNeeded]);

  useEffect(() => {
    const onBackPress = () => {
      home();
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => backHandler.remove();
  }, [home]);

  const millisecondsToSeconds = (milliseconds: number) => {
    const totalSeconds = milliseconds / 1000;
    if (totalSeconds >= 60) {
      const minutes = Math.floor(totalSeconds / 60);
      const remainingSeconds = totalSeconds % 60;
      return `${minutes.toFixed(0)} ${t("result.min")} ${remainingSeconds.toFixed(0)} ${t("result.sec")}`;
    } else {
      return `${totalSeconds.toFixed(0)} ${t("result.sec")}`;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: colors.BgSecondary,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{t("result.title")}</Text>

        <CircularProgressBar progress={(data.correctAnswers / data.totalQuestions) * 100} />
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={[Typography.boldH3, { color: colors.TextPrimary }]}>
              {data.correctAnswers} / {data.totalQuestions}
            </Text>

            <Text style={[Typography.regularLabel, { color: colors.TextSecondary }]}>
              {t("result.score")}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={[Typography.boldH3, { color: colors.TextPrimary }]}>
              {millisecondsToSeconds(data.totalTime)}
            </Text>

            <Text style={[Typography.regularLabel, { color: colors.TextSecondary }]}>
              ({millisecondsToSeconds(data.avgTime)} / {t("result.question")?.toLocaleLowerCase()})
            </Text>
          </View>
        </View>

        <View style={styles.answers}>
          {answers.map((answer, index) => (
            <View
              key={index}
              style={[styles.answer, index >= answers.length - 1 && { borderBottomWidth: 0 }]}
            >
              <View style={styles.answer__texts}>
                {answer.lines.map((line, lineIndex) => (
                  <Text key={lineIndex} style={styles.answer__title}>
                    {line}
                  </Text>
                ))}
                <Text style={styles.answer__subtitle}>{answer.subtitle}</Text>
              </View>

              <ResultStatusIcon isCorrect={answer.isCorrectAnswer} colors={colors} />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={{ marginBottom: insets.bottom, marginTop: 16, paddingHorizontal: 20 }}>
        <PrimaryButton isHapticFeedback text={t("result.done")} onClick={home} />
      </View>
    </View>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    header: {
      backgroundColor: colors.BgPrimary,
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 32,
      paddingBottom: 32,
      gap: 32,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      marginBottom: 16,
    },
    title: {
      color: colors.TextPrimary,
      ...Typography.boldH2,
      textAlign: "center",
    },
    scroll: {
      padding: 16,
      paddingTop: 0,
    },
    card: {
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
    },
    cardContent: {
      borderRadius: 12,
      paddingTop: 16,
      paddingBottom: 16,
      backgroundColor: colors.BgPrimary,
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      marginBottom: 8,

      width: "100%",
      maxWidth: TABLET_WIDTH,
    },

    answers: {
      backgroundColor: colors.BgPrimary,
      borderRadius: 12,
    },

    answer: {
      borderBottomWidth: 1,

      borderBottomColor: colors.BorderDefault,

      padding: 16,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },

    answer__texts: {
      flex: 1,
    },

    answer__title: {
      color: colors.TextSecondary,

      ...Typography.boldDefault,
    },

    answer__subtitle: {
      color: colors.TextPrimary,

      ...Typography.regularLabel,
    },
  });

export default EducationResultPage;
