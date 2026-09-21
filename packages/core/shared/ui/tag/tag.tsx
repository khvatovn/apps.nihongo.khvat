import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { ColorsType, useThemeContext } from "../../contexts/theme/theme-context";
import { Typography } from "../../typography";

interface TagProps {
  icon?: React.JSX.Element;
  text: string;

  isUpperCase?: boolean;
  isLowerCase?: boolean;

  primary?: boolean;
}

const Tag: React.FC<TagProps> = ({ text, icon, isUpperCase, isLowerCase, primary }) => {
  const { colors } = useThemeContext();

  const styles = makeStyles(colors, isUpperCase || false, isLowerCase || false, primary || false);

  return (
    <View style={styles.tag}>
      {icon && <View>{icon}</View>}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const makeStyles = (
  colors: ColorsType,
  isUpperCase: boolean,
  isLowerCase: boolean,
  primary: boolean,
) =>
  StyleSheet.create({
    tag: {
      width: "auto",

      borderRadius: 12,
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 2,
      paddingTop: 2,

      backgroundColor: primary ? colors.BgDarkGray : colors.BgLightGray,

      flexDirection: "row",
      alignItems: "center",

      gap: 2,
    },
    text: {
      color: primary ? colors.TextContrastPrimary : colors.TextPrimary,
      ...Typography.regularCaption,

      textTransform: isUpperCase ? "uppercase" : isLowerCase ? "lowercase" : "capitalize",
    },
  });

export default Tag;
