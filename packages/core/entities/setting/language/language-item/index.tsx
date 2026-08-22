import React from "react";

import { ILetter } from "@nihongo/core/shared/data/lettersTable";
import { View, StyleSheet, Text, Pressable } from "react-native";

import { ColorsType, useThemeContext } from "../../../../shared/contexts/theme/theme-context";
import { Typography } from "../../../../shared/typography";
import Tag from "../../../../shared/ui/tag/tag";

export enum ThemeType {
  Dark = "dark",
  Light = "light",
}

interface ThemeItemProps {
  name: string;
  // ? 3 colors
  icons: ILetter[];
  tags: string[];

  transliteration: number;

  active: boolean;

  onPress: () => void;
}

const LanguageItem: React.FC<ThemeItemProps> = (props) => {
  const { colors } = useThemeContext();

  const { name, icons, active, transliteration, tags } = props;

  const styles = makeStyles(colors, active);

  return (
    <Pressable onPress={props.onPress} style={[styles.conteiner]}>
      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.tags}>
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </View>
      </View>

      <View style={styles.icon}>
        {icons.map((icon) => (
          <View style={styles.symbol} key={icon.id}>
            <Text style={styles.symbolTitle}>{icon.hi}</Text>
            <Text style={styles.symbolSubtitle}>{icon.transliterations[transliteration]}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
};

const makeStyles = (colors: ColorsType, active: boolean) =>
  StyleSheet.create({
    conteiner: {
      flexDirection: "row",

      justifyContent: "space-between",

      backgroundColor: active ? colors.BgContrast : colors.BgSecondary,

      borderBottomColor: colors.BorderDefault,

      paddingHorizontal: 16,
      paddingVertical: 16,

      borderRadius: 12,

      gap: 8,
    },

    title: {
      color: active ? colors.TextContrastPrimary : colors.TextPrimary,

      ...Typography.boldDefault,
    },

    conteinerLast: {
      borderBottomWidth: 0,
    },

    info: {
      gap: 4,
    },
    tags: {
      flexDirection: "row",
      gap: 4,
    },

    icon: {
      flexDirection: "row",
      gap: 6,
    },
    symbol: {
      backgroundColor: active ? colors.BgDarkGray : colors.BgLightGray,
      borderRadius: 8,

      width: 48,
      height: 48,

      flexDirection: "column",

      justifyContent: "center",
      alignContent: "center",
    },
    symbolTitle: {
      ...Typography.regularDefault,

      textAlign: "center",

      color: active ? colors.TextContrastPrimary : colors.TextPrimary,
    },
    symbolSubtitle: {
      ...Typography.regularLabel,

      textAlign: "center",

      color: active ? colors.TextContrastPrimary : colors.TextPrimary,
    },
  });

export default LanguageItem;
