import React, { useMemo } from "react";


import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { Card } from "@/pages/board/api/get-cards";

interface KanjiTableProps {
  cards: Card[];
  cardWidth: number;
  onPress: (card: Card) => void;
}

const KanjiTableComponent: React.FC<KanjiTableProps> = ({ cards, cardWidth, onPress }) => {
  const { colors } = useThemeContext();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.list}>
      {cards.map((card) => (
        <Pressable
          onPress={() => onPress(card)}
          style={[styles.item, { width: cardWidth }]}
          key={card.id}
        >
          <Text numberOfLines={1} style={styles.title}>
            {card.titleWithoutFurigana}
          </Text>
          <Text numberOfLines={1} style={styles.subtitle}>
            {card.subtitle}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export const KanjiTable = React.memo(KanjiTableComponent);

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    list: {
      gap: 4,
      paddingLeft: 12,
      paddingRight: 12,
      marginBottom: 4,

      flexDirection: "row",
      alignSelf: "stretch",
    },
    item: {
      height: 62,
      borderBottomColor: colors.BorderDefault,

      backgroundColor: colors.BgSecondary,
      borderRadius: 12,

      padding: 6,
    },
    title: {
      ...Typography.boldH3,
      color: colors.TextPrimary,
      lineHeight: 24,
    },
    subtitle: {
      ...Typography.regularDefault,
      color: colors.TextSecondary,
      lineHeight: 24,
    },
  });
