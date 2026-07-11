import React, { useState, useMemo } from "react";

import { useHaptic } from "@nihongo/core/shared/contexts/haptic/haptic-context";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface MatchPairsProps {
  onComplete?: (hasError: boolean) => void;
  pairs: { data: string[][] };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type ItemState = "default" | "selected" | "matched" | "error";

export default function MatchPairs({ onComplete, pairs }: MatchPairsProps) {
  const { triggerHaptic } = useHaptic();
  const { colors } = useThemeContext();
  const styles = makeStyles(colors);

  const data = pairs.data as [string, string][];

  const shuffledLeftIndices = useMemo(() => shuffleArray(data.map((_, i) => i)), [data]);
  const shuffledRightIndices = useMemo(() => shuffleArray(data.map((_, i) => i)), [data]);

  const [matched, setMatched] = useState<Record<number, number>>({});
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const [errorPair, setErrorPair] = useState<{ left: number; right: number } | null>(null);

  const matchedLeftIndices = Object.values(matched);
  const matchedRightIndices = Object.keys(matched).map(Number);

  const handleLeftPress = (leftIndex: number) => {
    triggerHaptic();

    if (matchedLeftIndices.includes(leftIndex) || errorPair) return;

    setSelectedLeft(leftIndex);
    if (selectedRight !== null) tryMatch(leftIndex, selectedRight);
  };

  const handleRightPress = (rightIndex: number) => {
    triggerHaptic();

    if (matchedRightIndices.includes(rightIndex) || errorPair) return;

    setSelectedRight(rightIndex);
    if (selectedLeft !== null) tryMatch(selectedLeft, rightIndex);
  };

  const tryMatch = (leftIndex: number, rightIndex: number) => {
    const isCorrect = leftIndex === rightIndex;

    if (isCorrect) {
      const newMatched = { ...matched, [rightIndex]: leftIndex };
      setMatched(newMatched);
      setSelectedLeft(null);
      setSelectedRight(null);
      if (Object.keys(newMatched).length === data.length) {
        onComplete?.(hasError);
      }
    } else {
      setHasError(true);
      setErrorPair({ left: leftIndex, right: rightIndex });
      setTimeout(() => {
        setErrorPair(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 600);
    }
  };

  const getLeftState = (leftIndex: number): ItemState => {
    if (matchedLeftIndices.includes(leftIndex)) return "matched";
    if (errorPair?.left === leftIndex) return "error";
    if (selectedLeft === leftIndex) return "selected";
    return "default";
  };

  const getRightState = (rightIndex: number): ItemState => {
    if (matchedRightIndices.includes(rightIndex)) return "matched";
    if (errorPair?.right === rightIndex) return "error";
    if (selectedRight === rightIndex) return "selected";
    return "default";
  };

  const getItemStyle = (state: ItemState) => {
    switch (state) {
      case "selected":
        return [styles.item, styles.itemSelected];
      case "matched":
        return [styles.item, styles.itemMatched];
      case "error":
        return [styles.item, styles.itemError];
      default:
        return [styles.item];
    }
  };

  const getTextStyle = (state: ItemState) => {
    switch (state) {
      case "error":
        return [styles.itemText, styles.itemTextError];
      case "matched":
        return [styles.itemText, styles.itemTextMatched];
      default:
        return [styles.itemText];
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: data.length }).map((_, rowIndex) => {
        const leftIndex = shuffledLeftIndices[rowIndex];
        const rightIndex = shuffledRightIndices[rowIndex];
        const leftState = getLeftState(leftIndex);
        const rightState = getRightState(rightIndex);

        return (
          <View key={rowIndex} style={styles.row}>
            <TouchableOpacity
              style={[getItemStyle(leftState), styles.cell]}
              onPress={() => handleLeftPress(leftIndex)}
              activeOpacity={leftState === "matched" ? 1 : 0.7}
              disabled={leftState === "matched"}
            >
              <Text style={getTextStyle(leftState)}>{data[leftIndex][0]}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[getItemStyle(rightState), styles.cell]}
              onPress={() => handleRightPress(rightIndex)}
              activeOpacity={rightState === "matched" ? 1 : 0.7}
              disabled={rightState === "matched"}
            >
              <Text style={getTextStyle(rightState)}>{data[rightIndex][1]}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      width: "100%",
      gap: 8,
    },
    row: {
      flexDirection: "row",
      gap: 16,
      alignItems: "stretch",
    },
    cell: {
      flex: 1,
    },
    item: {
      minHeight: 50,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.BorderDefault,
      backgroundColor: colors.BgSecondary,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    itemSelected: {
      borderColor: colors.BorderContrast,
    },
    itemMatched: {
      opacity: 0.5,
    },
    itemError: {
      borderColor: colors.BgDanger,
      backgroundColor: colors.BgDanger,
    },
    itemText: {
      ...Typography.regularDefault,
      color: colors.TextPrimary,
      fontWeight: "500",
      textAlign: "center",
    },
    itemTextMatched: {
      color: colors.TextPrimary,
    },
    itemTextError: {
      color: colors.TextContrastSecondary,
    },
  });
