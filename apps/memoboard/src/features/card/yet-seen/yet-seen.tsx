import React, { useMemo, useState } from "react";

import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { extractKanji } from "@nihongo/core/shared/lib/kanji/extract-kanji";
import { Typography } from "@nihongo/core/shared/typography";
import { EyeClosedIcon, EyeIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { Card } from "@/pages/board/api/get-cards";
import Furigana from "@/shared/ui/furigana/furigana";

interface YetSeenProps {
  title: string;
  cards: Card[];
  openModal: (card: Card) => void;
}

const YetSeen: React.FC<YetSeenProps> = ({ title, cards, openModal }) => {
  const [isShow, setIsShow] = useState(false);

  const { colors } = useThemeContext();
  const styles = makeStyles(colors);

  const { t } = useTranslation();

  const yetSeenKanji = useMemo(
    () =>
      extractKanji(title)
        .filter((item, index, self) => index === self.findIndex((obj) => obj === item))
        .reduce<{ key: string; cards: Card[] }[]>((acc, kanji) => {
          const yetSeen = cards.filter(
            (item) => item.title.includes(kanji) && item.title !== title,
          );

          if (yetSeen.length > 0) {
            acc.push({ key: kanji, cards: yetSeen });
          }

          return acc;
        }, []),
    [title, cards],
  );

  if (yetSeenKanji.length < 1) return null;

  return (
    <View style={styles.container}>
      <View style={styles.divider} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("card.alreadySeen")}</Text>
        <Pressable onPress={() => setIsShow((prev) => !prev)}>
          {isShow ? <EyeIcon /> : <EyeClosedIcon />}
        </Pressable>
      </View>

      <View style={styles.content}>
        {yetSeenKanji.map((group) => (
          <View key={group.key} style={styles.group}>
            <Text style={styles.groupLabel}>{group.key}</Text>

            <View style={styles.list}>
              {group.cards.map((card) => (
                <Pressable key={card.id} style={styles.item} onPress={() => openModal(card)}>
                  <View style={styles.itemInfo}>
                    {isShow ? (
                      <Furigana
                        text={card.title}
                        typography={Typography.regularDefault}
                        typographyFurigana={Typography.regularCaption}
                      />
                    ) : (
                      <Text style={styles.itemValue}>{card.titleWithoutFurigana}</Text>
                    )}
                    <Text style={styles.itemSubtitle}>{card.subtitleNoFurigana}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default YetSeen;

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {},
    divider: {
      marginTop: 12,
      marginBottom: 12,
      height: 1,
      width: "100%",
      backgroundColor: colors.BorderDefault,
    },
    header: {
      backgroundColor: colors.BgContrast,
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 4,

      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6,
    },
    headerTitle: {
      ...Typography.boldDefault,
    },
    content: {
      flexDirection: "column",
      gap: 12,
    },
    group: {
      flexDirection: "column",
      gap: 6,
    },
    groupLabel: {
      color: colors.TextSecondary,
      ...Typography.regularLabel,
    },
    list: {
      flexDirection: "column",
      gap: 6,
    },
    item: {
      backgroundColor: colors.BgSecondary,
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 4,
      gap: 6,
    },
    itemInfo: {
      flexDirection: "column",
    },
    itemValue: {
      color: colors.TextPrimary,
      ...Typography.regularDefault,
    },
    itemSubtitle: {
      color: colors.TextSecondary,
      ...Typography.regularLabel,
    },
    itemTags: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
    },
  });
