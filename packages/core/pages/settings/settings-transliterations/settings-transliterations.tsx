import React, { useState } from "react";

import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import {
  Transliterations,
  useTransliterationsContext,
} from "@nihongo/core/shared/contexts/transliteration/transliteration";
import { Typography } from "@nihongo/core/shared/typography";
import { ModalHeader } from "@nihongo/core/shared/ui/modal-header/modal-header";
import { ModelContainer } from "@nihongo/core/shared/ui/model-container/model-container";
import { useNavigation } from "@react-navigation/native";
import { CheckIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { FlatList, View, StyleSheet, Text, Pressable } from "react-native";

type ItemProps = { onPress: () => void; title: string; colors: ColorsType; active: boolean };

const Item = ({ title, colors, onPress, active }: ItemProps) => {
  const styles = makeStyles(colors);

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <Text style={styles.item__text}>{title}</Text>

      {active && <CheckIcon color={colors.BgContrast} size={20} />}
    </Pressable>
  );
};

const SettingsTransliterationsPage: React.FC = () => {
  const { t } = useTranslation();
  const { transliterations, updateTransliterations } = useTransliterationsContext();

  const { colors } = useThemeContext();

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
    { key: Transliterations.HEP, title: t("transliterationSystems.hepburn") },
    { key: Transliterations.KUN, title: t("transliterationSystems.kunreiShiki") },
    { key: Transliterations.NIH, title: t("transliterationSystems.nihonShiki") },
    { key: Transliterations.POL, title: t("transliterationSystems.polivanovSystem") },
  ];

  return (
    <ModelContainer>
      <View>
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

        <FlatList
          data={transliterationSystems}
          renderItem={({ item }) => (
            <Item
              active={langToEdit === null ? transliterations === item.key : langToEdit === item.key}
              onPress={() => setTransliterations(item.key)}
              colors={colors}
              key={item.key}
              title={item.title}
            />
          )}
          keyExtractor={(item) => item.key.toString()}
        />
      </View>
    </ModelContainer>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    item: {
      height: 56,
      paddingLeft: 16,
      paddingRight: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.BorderDefault,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    item__text: {
      ...Typography.boldDefault,
      color: colors.TextPrimary,
      lineHeight: 24,
    },
  });

export default SettingsTransliterationsPage;
