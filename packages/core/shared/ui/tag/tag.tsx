import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { ColorsType, useThemeContext } from "../../contexts/theme/theme-context";
import { Typography } from "../../typography";

interface TagProps {
  icon?: React.JSX.Element;
  text: string;

  isUpperCase?: boolean;
}

const Tag: React.FC<TagProps> = ({ text, icon, isUpperCase }) => {
  const { colors } = useThemeContext();

  const styles = makeStyles(colors, isUpperCase || false);

  return (
    <View style={styles.tag}>
      {icon && <View>{icon}</View>}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const makeStyles = (colors: ColorsType, isUpperCase: boolean) =>
  StyleSheet.create({
    tag: {
      width: "auto",

      borderRadius: 12,
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 2,
      paddingTop: 2,

      backgroundColor: colors.BgLightGray,

      flexDirection: "row",
      alignItems: "center",
      gap: 2,
    },
    text: {
      color: colors.TextPrimary,
      ...Typography.regularCaption,

      textTransform: isUpperCase ? "uppercase" : "capitalize",

      marginHorizontal: 2,
      marginVertical: 2,
    },
  });

export default Tag;
