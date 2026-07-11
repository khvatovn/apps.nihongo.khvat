import React from "react";

import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import { View, Text, StyleSheet } from "react-native";

type TextProps = {
  text: string;
};

const BoldText: React.FC<{ children: string }> = ({ children }) => {
  return <Text style={{ fontWeight: "600" }}>{children}</Text>;
};

const parseString = (input: string) => {
  const regex = /\*\*(.*?)\*\*/g;
  const matches = input.matchAll(regex);
  let lastIndex = 0;
  const parsedContent = [];

  for (const match of matches) {
    const [fullMatch, word] = match;
    const startIndex = input.indexOf(fullMatch, lastIndex);
    const beforeText = input.substring(lastIndex, startIndex);

    if (beforeText) {
      parsedContent.push(beforeText);
    }

    parsedContent.push(<BoldText key={startIndex}>{word}</BoldText>);
    lastIndex = startIndex + fullMatch.length;
  }

  const remainingText = input.substring(lastIndex);
  if (remainingText) {
    parsedContent.push(remainingText);
  }

  return parsedContent;
};

const BlockText: React.FC<TextProps> = ({ text }) => {
  const { colors } = useThemeContext();

  return (
    <View>
      <Text style={[styles.blockText, { color: colors.TextPrimary }]}>{parseString(text)}</Text>
    </View>
  );
};

export default BlockText;

const styles = StyleSheet.create({
  blockText: {
    ...Typography.regularDefault,
  },
});
