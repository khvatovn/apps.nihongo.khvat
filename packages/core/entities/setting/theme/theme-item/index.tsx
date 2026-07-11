import React from "react";

import { View, StyleSheet, Text, Pressable } from "react-native";

import { ColorsType, useThemeContext } from "../../../../shared/contexts/theme/theme-context";
import { Typography } from "../../../../shared/typography";
import Tag from "../../../../shared/ui/tag/tag";

import ThemeIcon from "./components/theme-icon";

export enum ThemeType {
  Dark = "dark",
  Light = "light",
}

interface ThemeItemProps {
  name: string;
  // ? 3 colors
  icon: string[];
  author: string;
  type: ThemeType;
  downloads: number;
  // ? Array of URLs
  screenshots: string[];

  isOpen: boolean;

  isLast: boolean;

  onPress: () => void;
}

const ThemeItem: React.FC<ThemeItemProps> = (props) => {
  const { colors } = useThemeContext();
  const styles = makeStyles(colors);

  const { name, icon, isOpen, isLast } = props;
  // ? {author, type, downloads, screenshots} = props

  if (isOpen) {
    return <View></View>;
  }

  return (
    <Pressable onPress={props.onPress} style={[styles.conteiner, isLast && styles.conteinerLast]}>
      <View style={styles.icon}>
        <ThemeIcon colors={icon} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.tags}>
          <Tag text="1k+" />
          <Tag text="ui.taisia" />
        </View>
      </View>
    </Pressable>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    conteiner: {
      flexDirection: "row",

      borderBottomColor: colors.BorderDefault,
      borderBottomWidth: 1,

      paddingHorizontal: 16,
      paddingVertical: 10,

      gap: 12,
    },

    conteinerLast: {
      borderBottomWidth: 0,
    },

    info: {
      gap: 4,
    },

    icon: {
      width: 48,
      height: 48,
    },
    title: {
      color: colors.TextPrimary,

      ...Typography.boldDefault,
    },
    tags: {
      flexDirection: "row",
      gap: 4,
    },
  });

export default ThemeItem;
