import React from "react";

import LanguageItem from "@nihongo/core/entities/setting/language/language-item";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import {
  Transliterations,
  useTransliterationsContext,
} from "@nihongo/core/shared/contexts/transliteration/transliteration";
import { base, dakuon } from "@nihongo/core/shared/data/lettersTable";
import usePreviewSetting from "@nihongo/core/shared/lib/settings/usePreviewSetting";
import { Typography } from "@nihongo/core/shared/typography";
import { ModalHeader } from "@nihongo/core/shared/ui/modal-header/modal-header";
import { ModelContainer } from "@nihongo/core/shared/ui/model-container/model-container";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text } from "react-native";

const SettingsTransliterationsPage: React.FC = () => {
  const { t } = useTranslation();
  const { transliterations, updateTransliterations } = useTransliterationsContext();

  const { colors } = useThemeContext();
  const styles = makeStyles(colors);

  const navigation = useNavigation();

  const { selected, select, isDirty, confirm, cancel } = usePreviewSetting<Transliterations>({
    current: transliterations,
    preview: updateTransliterations,
  });

  const onDone = async () => {
    await confirm();
    navigation.goBack();
  };

  const onClose = () => {
    cancel();
    navigation.goBack();
  };

  const transliterationSystems = [
    {
      key: Transliterations.HEP,
      title: t("transliterationSystems.hepburn"),
      tags: ["Самая популярная"],
    },
    {
      key: Transliterations.KUN,
      title: t("transliterationSystems.kunreiShiki"),
      tags: ["Официальная Япония"],
    },
    {
      key: Transliterations.NIH,
      title: t("transliterationSystems.nihonShiki"),
      tags: ["Самая строгая"],
    },
  ];

  const cyrillicTransliterationSystems = [
    {
      key: Transliterations.POL,
      title: t("transliterationSystems.polivanovSystem"),
      tags: ["Стандарт в России"],
    },
  ];

  return (
    <ModelContainer>
      <View style={{ flex: 1 }}>
        <ModalHeader
          title={t("transliterationSystems.romaji")}
          left={{
            text: t("common.close"),
            onPress: onClose,
          }}
          right={{
            text: t("common.done"),
            onPress: () => isDirty && onDone(),
            color: isDirty ? colors.TextPrimary : colors.TextDisabled,
          }}
        />

        <Text style={styles.title}>Latin</Text>
        <View style={styles.list}>
          {transliterationSystems.map((item, index) => (
            <LanguageItem
              key={item.key}
              tags={item.tags}
              transliteration={index}
              name={item.title}
              icons={[base[2][1], dakuon[2][2]]}
              onPress={() => select(item.key)}
              active={selected === item.key}
            />
          ))}
        </View>

        <Text style={[styles.title, styles.title_bottom]}>Cyrillic</Text>
        <View style={styles.list}>
          {cyrillicTransliterationSystems.map((item, index) => (
            <LanguageItem
              key={item.key}
              tags={item.tags}
              transliteration={3 + index}
              name={item.title}
              icons={[base[2][1], dakuon[2][2]]}
              onPress={() => select(item.key)}
              active={selected === item.key}
            />
          ))}
        </View>
      </View>
    </ModelContainer>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    title: {
      color: colors.TextPrimary,

      ...Typography.boldH3,

      marginTop: 16,
      marginBottom: 16,
      marginHorizontal: 16,
    },
    title_bottom: {
      marginTop: 32,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    list: {
      marginHorizontal: 16,
      gap: 8,
      flexDirection: "column",
      overflow: "hidden",
    },
    item__text: {
      ...Typography.boldDefault,
      color: colors.TextPrimary,
      lineHeight: 24,
    },
  });

export default SettingsTransliterationsPage;
