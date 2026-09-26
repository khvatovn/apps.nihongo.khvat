import React from "react";

import { Pressable, StyleSheet, Text } from "react-native";

import { useHaptic } from "../../contexts/haptic/haptic-context";
import { ColorsType, useThemeContext } from "../../contexts/theme/theme-context";
import { Typography } from "../../typography";

interface ChipProps {
  text: string;
  active?: boolean;
  onPress: () => void;
}

const Chip: React.FC<ChipProps> = ({ text, active = false, onPress }) => {
  const { colors } = useThemeContext();
  const { triggerHaptic } = useHaptic();
  const styles = makeStyles(colors, active);

  return (
    <Pressable
      style={({ pressed }) => [styles.chip, pressed && { opacity: 0.7 }]}
      onPress={() => {
        triggerHaptic();
        onPress();
      }}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const makeStyles = (colors: ColorsType, active: boolean) =>
  StyleSheet.create({
    chip: {
      height: 36,
      paddingHorizontal: 14,
      borderRadius: 18,
      justifyContent: "center",
      backgroundColor: active ? colors.BgAccent : colors.BgLightGray,
    },
    text: {
      ...Typography.boldLabel,
      color: active ? colors.TextWhite : colors.TextPrimary,
    },
  });

export default Chip;
