import React, { useEffect, useMemo, useState } from "react";

import { TABLET_WIDTH } from "@nihongo/core/shared/constants/sizes";
import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import SecondaryButton from "@nihongo/core/shared/ui/buttons/Secondary/secondary-button";
import { StyleSheet, View } from "react-native";

import { TEST_DELAY } from "@/shared/constants/kana";
import { shuffleArray } from "@/shared/helpers/letters";

type SelectAnswerProps = {
  answers: { title: string; isTrue: boolean }[];
  onFinish?: (hasError: boolean) => void;
};

const SelectAnswer: React.FC<SelectAnswerProps> = ({ answers, onFinish }) => {
  const { colors } = useThemeContext();

  const shuffleAnswers = useMemo(() => shuffleArray(answers), [answers]);

  const [errors, setErrors] = useState<string[]>([]);
  const [correct, setCorrect] = useState<string[]>([]);

  const onAnswer = (answer: { title: string; isTrue: boolean }) => {
    if (answer.isTrue) {
      setCorrect((prev) => [...prev, answer.title]);
      onFinish?.(!true);

      setTimeout(() => {
        setCorrect([]);
      }, TEST_DELAY);
    } else {
      setErrors((prev) => [...prev, answer.title]);
      onFinish?.(!false);

      setTimeout(() => {
        setErrors([]);
      }, TEST_DELAY);
    }
  };

  useEffect(() => {
    return () => {
      setErrors([]);
      setCorrect([]);
    };
  }, [answers]);

  return (
    <View style={styles.container}>
      <View style={styles.answers}>
        {shuffleAnswers.map((answer) => (
          <SecondaryButton
            key={answer.title}
            isOutline
            isHapticFeedback
            onClick={() => onAnswer(answer)}
            text={answer.title}
            containerStyles={
              errors.includes(answer.title)
                ? {
                    backgroundColor: colors.BgDanger,
                  }
                : correct.includes(answer.title)
                  ? {
                      backgroundColor: colors.BgSuccess,
                    }
                  : {}
            }
            textStyles={
              errors.includes(answer.title) || correct.includes(answer.title)
                ? {
                    color: colors.TextContrastSecondary,
                    ...Typography.regularDefault,
                  }
                : {
                    ...Typography.regularDefault,
                  }
            }
          />
        ))}
      </View>
    </View>
  );
};

export default SelectAnswer;

const styles = StyleSheet.create({
  container: {
    width: "100%",

    flexDirection: "column",
    alignItems: "center",
  },
  answers: {
    width: "100%",
    maxWidth: TABLET_WIDTH,

    flexDirection: "column",
    gap: 16,
  },
});
