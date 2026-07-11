import React, { useState } from "react";

import { languageList, ShortLanguage } from "@nihongo/core/shared/constants/language";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import useSetLanguage from "@nihongo/core/shared/lib/i18n/hooks/useSetLanguage";
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

const SettingsLanguagePage: React.FC = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();
  const { colors } = useThemeContext();

  const { set } = useSetLanguage();

  const [langToEdit, setLangToEdit] = useState<null | ShortLanguage>(null);

  const setAppLanguage = async (language: ShortLanguage) => {
    set(language);

    setLangToEdit(null);
    navigation.goBack();
  };

  return (
    <ModelContainer>
      <View>
        <ModalHeader
          title={t("settings.language")}
          left={{
            text: t("common.close"),
            onPress: () => navigation.goBack(),
          }}
          right={{
            text: t("common.done"),
            onPress: () => langToEdit && setAppLanguage(langToEdit),
            color: langToEdit === null ? colors.TextDisabled : colors.TextPrimary,
          }}
        />

        <FlatList
          data={languageList}
          renderItem={({ item }) => (
            <Item
              active={langToEdit === null ? i18n.language === item.key : langToEdit === item.key}
              onPress={() => setAppLanguage(item.key)}
              colors={colors}
              key={item.key}
              title={item.title}
            />
          )}
          keyExtractor={(item) => item.key}
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

export default SettingsLanguagePage;
