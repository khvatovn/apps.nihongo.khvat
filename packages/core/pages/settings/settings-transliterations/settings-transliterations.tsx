import React, { useState } from "react";

import LanguageItem from "@nihongo/core/entities/setting/language/language-item";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import {
  Transliterations,
  useTransliterationsContext,
} from "@nihongo/core/shared/contexts/transliteration/transliteration";
import { base, dakuon } from "@nihongo/core/shared/data/lettersTable";
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

  const [langToEdit, setLangToEdit] = useState<null | Transliterations>(null);

  const navigation = useNavigation();

  const setAppTransliterations = (item: Transliterations) => {
    updateTransliterations(item);

    setLangToEdit(null);
    navigation.goBack();
  };

  const setTransliterations = async (lang: Transliterations) => {
    setLangToEdit(lang);
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
            onPress: () => navigation.goBack(),
          }}
          right={{
            text: t("common.done"),
            onPress: () => langToEdit !== null && setAppTransliterations(langToEdit),
            color: langToEdit === null ? colors.TextDisabled : colors.TextPrimary,
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
              onPress={() => setTransliterations(item.key)}
              active={langToEdit === null ? transliterations === item.key : langToEdit === item.key}
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
              onPress={() => setTransliterations(item.key)}
              active={langToEdit === null ? transliterations === item.key : langToEdit === item.key}
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
