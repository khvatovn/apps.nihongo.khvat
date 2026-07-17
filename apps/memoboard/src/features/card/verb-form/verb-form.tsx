import React, { useState } from "react";

import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { removeFurigana } from "@nihongo/core/shared/lib/furigana/remove-furigana";
import { Typography } from "@nihongo/core/shared/typography";
import { EyeIcon, EyeClosedIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable, StyleSheet } from "react-native";

import getVerbForm from "./get-verb-form";

import Furigana from "@/shared/ui/furigana/furigana";

const keyWord = "Глагол";

interface VerbFormProps {
  tags: string[];
  title: string;
}

interface VerbItemProps {
  label: string;
  value: string;
  isShow: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getVerbItem = (styles: any) => {
  const VerbItem: React.FC<VerbItemProps> = ({ label, value, isShow }) => {
    if (!value) return <View></View>;
    return (
      <View style={styles.item}>
        <Text style={styles.itemLabel}>{label}</Text>
        {!isShow && <Text style={styles.itemValue}>{removeFurigana(value)}</Text>}
        {isShow && (
          <Furigana
            typography={Typography.regularDefault}
            typographyFurigana={Typography.regularCaption}
            text={value}
          />
        )}
      </View>
    );
  };

  return VerbItem;
};

const VerbForm: React.FC<VerbFormProps> = ({ tags, title }) => {
  const [isShow, setIsShow] = useState(false);

  const { colors } = useThemeContext();
  const styles = makeStyles(colors);

  const VerbItem = getVerbItem(styles);

  const { t } = useTranslation();

  const data = getVerbForm({ tags, title });

  if (!tags.join(" ").toLowerCase().includes(`${keyWord} I`.toLowerCase())) return <View></View>;

  if (data.length === 0) return null;

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 12,
          marginBottom: 12,
          height: 1,
          width: "100%",
          backgroundColor: colors.BorderDefault,
        }}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}> {t("verbForm.title")} </Text>
        <Pressable onPress={() => setIsShow((prev) => !prev)}>
          {isShow ? <EyeIcon /> : <EyeClosedIcon />}
        </Pressable>
      </View>

      <View style={styles.content}>
        {data.map((item) => (
          <VerbItem key={item.label} label={t(item.label)} value={item.value} isShow={isShow} />
        ))}
      </View>
    </View>
  );
};

export default VerbForm;

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {},
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
      gap: 6,
    },
    title: {
      color: colors.TextPrimary,
    },
    label: {
      color: colors.TextPrimary,
      ...Typography.regularLabel,
    },
    item: {
      backgroundColor: colors.BgSecondary,
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 4,
    },
    itemLabel: {
      color: colors.TextSecondary,
      ...Typography.regularLabel,
    },
    itemValue: {
      color: colors.TextPrimary,
      ...Typography.regularDefault,
    },
  });
