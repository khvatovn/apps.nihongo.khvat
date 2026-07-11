import React, { JSX } from "react";

import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import { Text, View, StyleSheet, TextStyle } from "react-native";

interface StylesProps {
  typography?: TextStyle;
  typographyFurigana?: TextStyle;
}

interface FuriganaProps extends StylesProps {
  text: string;
}

const Furigana: React.FC<FuriganaProps> = ({ text, typography, typographyFurigana }) => {
  const { colors } = useThemeContext();

  if (!text) return null;

  const styles = makeStyles(colors, {
    typography: typography || Typography.boldH2,
    typographyFurigana: typographyFurigana || Typography.regularCaption,
  });

  const furiganaRegex = /(\p{Script=Han}+)\((.*?)\)/gu;

  let lastIndex = 0;
  const elements: JSX.Element[] = [];
  let match;

  while ((match = furiganaRegex.exec(text)) !== null) {
    const [fullMatch, kanji, furigana] = match;
    const startIndex = match.index;

    if (startIndex > lastIndex) {
      elements.push(
        <Text key={`text-${lastIndex}`} style={styles.regularText}>
          {text.slice(lastIndex, startIndex)}
        </Text>,
      );
    }

    elements.push(
      <View key={`furigana-${startIndex}`} style={styles.furiganaContainer}>
        <Text style={styles.furiganaText}>{furigana}</Text>
        <Text style={styles.kanjiText}>{kanji}</Text>
      </View>,
    );

    lastIndex = startIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    elements.push(
      <Text key={`text-${lastIndex}`} style={styles.regularText}>
        {text.slice(lastIndex)}
      </Text>,
    );
  }

  return <View style={styles.container}>{elements}</View>;
};

const makeStyles = (colors: ColorsType, options: StylesProps) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-end",
    },
    furiganaContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    kanjiText: {
      color: colors.TextPrimary,

      ...options.typography,
    },
    furiganaText: {
      color: colors.TextTabBar,
      textAlign: "center",

      ...options.typographyFurigana,
    },
    regularText: {
      color: colors.TextPrimary,

      ...options.typography,
    },
  });

export default Furigana;
