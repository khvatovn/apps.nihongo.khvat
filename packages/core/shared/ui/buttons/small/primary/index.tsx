import React from "react";

import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";

interface SmallPrimaryButton {
  text: string;

  onPress: (event: GestureResponderEvent) => void;
}

const SmallPrimaryButton: React.FC<SmallPrimaryButton> = ({ text, onPress }) => {
  const { colors } = useThemeContext();
  const styles = makeStyles(colors);

  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.BgContrast,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 14,

      width: "auto",

      cursor: "pointer",
    },
    text: {
      ...Typography.boldLabel,
      color: colors.TextContrastPrimary,
    },
  });

export default SmallPrimaryButton;
