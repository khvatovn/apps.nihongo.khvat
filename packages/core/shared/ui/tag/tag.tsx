import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { ColorsType, useThemeContext } from "../../contexts/theme/theme-context";
import { Typography } from "../../typography";

interface TagProps {
  icon?: string;
  text: string;
}

const Tag: React.FC<TagProps> = ({ text, icon }) => {
  const { colors } = useThemeContext();
  const styles = makeStyles(colors);

  return (
    <View style={styles.tag}>
      {icon && <View></View>}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    tag: {
      width: "auto",

      borderRadius: 12,
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 2,
      paddingTop: 2,

      backgroundColor: colors.BgLightGray,
    },
    text: {
      color: colors.TextPrimary,
      ...Typography.regularCaption,
    },
  });

export default Tag;
