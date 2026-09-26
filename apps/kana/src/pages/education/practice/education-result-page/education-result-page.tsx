import React, { useCallback, useEffect } from "react";

import { TABLET_WIDTH } from "@nihongo/core/shared/constants/sizes";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { ILetter } from "@nihongo/core/shared/data/lettersTable";
import useGetRomaji from "@nihongo/core/shared/lib/i18n/hooks/useKey";
import { Typography } from "@nihongo/core/shared/typography";
import PrimaryButton from "@nihongo/core/shared/ui/buttons/Primary/primary-button";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, StyleSheet, BackHandler, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Svg, Path } from "react-native-svg";

import formatResultAnswer from "../education-practice/helpers/format-result-answer";
import { PracticeResultData } from "../education-practice/lib/types/questions";

import { ROUTES, RootStackParamList } from "@/app/routes.types";
import DrawingPreview from "@/features/drawing/ui/drawing-preview/drawing-preview";
import DrawingReference from "@/features/drawing/ui/drawing-reference/drawing-reference";
import { Kana, KanaAlphabet, PracticeType } from "@/shared/constants/kana";
import { requestHuaweiStoreReview } from "@/shared/lib/promotions/huawei-store-review";
import { requestRustoreStoreReview } from "@/shared/lib/promotions/rustore-store-review";
import { requestStoreReview } from "@/shared/lib/promotions/store-review";
import { useTelegramPromotion } from "@/shared/lib/promotions/use-telegram-promotion";

type LearnResultsNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.RESULTS>;
interface EducationResultProps {
  route: RouteProp<RootStackParamList, typeof ROUTES.RESULTS>;
}

const ResultStatusIcon: React.FC<{ isCorrect: boolean; colors: ColorsType; size?: number }> = ({
  isCorrect,
  colors,
  size = 24,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
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

  const { width } = useWindowDimensions();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    });
  }, [navigation]);

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

  const data = calculateStats(questionsTime.slice(0, questions.length));

  const answers = questionsTime
    .slice(0, questions.length)
    .map(({ index, isCorrectAnswer, userSelect }) => ({
      ...formatResultAnswer({ question: questions[index], userSelect, t, transliterations }),
      isCorrectAnswer,
      userSelect,
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

  const getIletterByKey = (answersKana: string, letter: ILetter) => {
    if (answersKana === "Romaji") return letter.transliterations[transliterations];
    if (answersKana === "Hiragana") return letter.hi;
    if (answersKana === "Katakana") return letter.ka;

    return "null";
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.BgSecondary,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{t("result.title")}</Text>

        <Text style={{ color: colors.TextPrimary, ...Typography.H3 }}>
          {(data.correctAnswers / data.totalQuestions) * 100}%
        </Text>
      </View>

      <View style={[styles.scroll]}>
        <View style={styles.scroll__clip}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={[Typography.H4, { color: colors.TextPrimary }]}>
                  {data.correctAnswers} / {data.totalQuestions}
                </Text>

                <Text style={[Typography.regularLabel, { color: colors.TextSecondary }]}>
                  {t("result.score")}
                </Text>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={[Typography.H4, { color: colors.TextPrimary }]}>
                  {millisecondsToSeconds(data.totalTime)}
                </Text>

                <Text style={[Typography.regularLabel, { color: colors.TextSecondary }]}>
                  ({millisecondsToSeconds(data.avgTime)} /{" "}
                  {t("result.question")?.toLocaleLowerCase()})
                </Text>
              </View>
            </View>

            <View style={styles.answers}>
              {answers.map((answer, index) => {
                if (answer.question === null) return <View key={index}></View>;

                if (answer.question.type === PracticeType.MultipleChoice) {
                  // * userSelect хранит title выбранного варианта, id у ответов нет
                  const pickedTitle =
                    answer.userSelect?.type === PracticeType.MultipleChoice
                      ? answer.userSelect.value
                      : null;

                  return (
                    <View
                      key={index}
                      style={[
                        styles.answer,
                        index >= answers.length - 1 && { borderBottomWidth: 0 },
                      ]}
                    >
                      <Text style={{ color: colors.TextPrimary, ...Typography.regularDefault }}>
                        {answer.question![PracticeType.MultipleChoice]?.word.kana}
                      </Text>
                      {answer.question![PracticeType.MultipleChoice]?.answers.map((item) => {
                        const isWrongPick = pickedTitle === item.title && !item.isTrue;

                        return (
                          <View
                            style={{
                              backgroundColor: item.isTrue
                                ? colors.BgSuccess
                                : isWrongPick
                                  ? colors.BgDanger
                                  : colors.BgSecondary,
                              padding: 12,
                              borderRadius: 6,
                            }}
                            key={index + item.title}
                          >
                            <Text
                              style={{
                                color:
                                  item.isTrue || isWrongPick
                                    ? colors.TextContrastSecondary
                                    : colors.TextPrimary,
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  );
                }

                if (answer.question.type === PracticeType.Drawing) {
                  const drawing =
                    answer.userSelect?.type === PracticeType.Drawing
                      ? answer.userSelect.value
                      : null;

                  const drawingData = answer.question[PracticeType.Drawing]!;
                  const drawingKana =
                    drawingData.questionKana === Kana.Hiragana
                      ? KanaAlphabet.Hiragana
                      : KanaAlphabet.Katakana;

                  const canvasSize = (width - 60) / 2 - 6;

                  return (
                    <View
                      key={index}
                      style={[
                        styles.answer,
                        index >= answers.length - 1 && { borderBottomWidth: 0 },
                      ]}
                    >
                      <View style={styles.answer__header}>
                        <Text style={{ color: colors.TextPrimary, ...Typography.regularDefault }}>
                          {t("result.drawing")}:{" "}
                          {
                            answer.question![PracticeType.Drawing]?.question.transliterations[
                              transliterations
                            ]
                          }
                        </Text>

                        <View style={styles.answer__status}>
                          <ResultStatusIcon
                            size={16}
                            isCorrect={answer.isCorrectAnswer}
                            colors={colors}
                          />

                          <Text
                            style={[
                              Typography.regularLabel,
                              {
                                color: answer.isCorrectAnswer
                                  ? colors.TextSuccess
                                  : colors.TextDanger,
                              },
                            ]}
                          >
                            {answer.isCorrectAnswer ? t("result.correct") : t("result.wrong")}
                          </Text>
                        </View>
                      </View>

                      <View></View>

                      {/* * слева — Правильно, справа — Человек написал */}
                      <View style={styles.answer__drawings}>
                        <View>
                          <Text
                            style={{
                              color: colors.TextPrimary,
                              ...Typography.regularDefault,
                              marginBottom: 6,
                            }}
                          >
                            {t("result.example")}:
                          </Text>
                          <View style={{ backgroundColor: colors.BgSecondary, borderRadius: 6 }}>
                            <DrawingReference
                              letter={drawingData.question}
                              kana={drawingKana}
                              size={canvasSize}
                              additionalPadding={0.2}
                            />
                          </View>
                        </View>

                        <View>
                          <Text
                            style={{
                              color: colors.TextPrimary,
                              ...Typography.regularDefault,
                              marginBottom: 6,
                            }}
                          >
                            {t("result.you")}:
                          </Text>
                          <View style={{ backgroundColor: colors.BgSecondary, borderRadius: 6 }}>
                            {drawing !== null && (
                              <DrawingPreview drawing={drawing} size={canvasSize} />
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }

                if (answer.question.type === PracticeType.Testing) {
                  const pickedId =
                    answer.userSelect?.type === PracticeType.Testing
                      ? answer.userSelect.value.id
                      : null;

                  return (
                    <View
                      key={index}
                      style={[
                        styles.answer,
                        index >= answers.length - 1 && { borderBottomWidth: 0 },
                      ]}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          borderRadius: 6,
                          gap: 6,
                          flexWrap: "wrap",
                          width: width - 62,
                        }}
                      >
                        {answer.question[PracticeType.Testing]?.answers.map((item) => {
                          const isCorrectItem =
                            answer.question![PracticeType.Testing]?.question.id === item.id;

                          const isWrongPick = pickedId === item.id && !isCorrectItem;

                          return (
                            <View
                              key={index + item.id}
                              style={{
                                backgroundColor: isCorrectItem
                                  ? colors.BgSuccess
                                  : isWrongPick
                                    ? colors.BgDanger
                                    : colors.BgSecondary,
                                width: (width - 62) / 2 - 4,
                                padding: 12,
                                borderRadius: 6,
                              }}
                            >
                              <Text
                                style={{
                                  color:
                                    isCorrectItem || isWrongPick
                                      ? colors.TextContrastSecondary
                                      : colors.TextPrimary,
                                  ...Typography.boldLabel,
                                }}
                              >
                                {getIletterByKey(
                                  answer.question![PracticeType.Testing]?.answersKana || "",
                                  item,
                                )}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  );
                }

                return (
                  <View
                    key={index}
                    style={[styles.answer, index >= answers.length - 1 && { borderBottomWidth: 0 }]}
                  >
                    {answer.userLines.length > 0 && (
                      <View style={styles.answer__userLines}>
                        {answer.userLines.map((userLine, userLineIndex) => (
                          <View key={userLineIndex} style={styles.answer__userLine}>
                            <ResultStatusIcon
                              size={16}
                              isCorrect={userLine.isCorrect}
                              colors={colors}
                            />

                            <Text
                              style={[
                                styles.answer__userLineText,
                                {
                                  color: userLine.isCorrect
                                    ? colors.TextSuccess
                                    : colors.TextDanger,
                                },
                              ]}
                            >
                              {userLine.text}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>

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
      ...Typography.H3,
      textAlign: "center",
    },
    scroll__clip: {
      flex: 1,

      borderRadius: 12,
      overflow: "hidden",
    },

    scroll: {
      flex: 1,

      padding: 16,

      paddingTop: 0,
      paddingBottom: 0,
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

      flexDirection: "column",
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

    answer__header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
    },

    answer__status: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },

    answer__drawings: {
      flexDirection: "row",
      gap: 12,
    },

    answer__userLines: {
      gap: 4,
    },

    answer__userLine: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },

    answer__userLineText: {
      ...Typography.regularLabel,
    },
  });

export default EducationResultPage;
