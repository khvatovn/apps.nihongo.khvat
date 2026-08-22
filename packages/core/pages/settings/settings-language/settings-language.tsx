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
import CountryFlag from "react-native-country-flag";

type ItemProps = {
  onPress: () => void;
  title: string;
  lang: string;
  colors: ColorsType;
  active: boolean;
};

const Item = ({ title, lang, colors, onPress, active }: ItemProps) => {
  const styles = makeStyles(colors);

  const getIsoCode = (key: ShortLanguage) => {
    if (key === ShortLanguage.EN) return "us";
    if (key === ShortLanguage.ES_ES) return "es";
    if (key === ShortLanguage.ES_MX) return "mx";
    if (key === ShortLanguage.PT_BR) return "br";
    if (key === ShortLanguage.PT_PT) return "pt";
    if (key === ShortLanguage.ko) return "kr";

    if (key === ShortLanguage.ZH_CN) return "cn";
    if (key === ShortLanguage.ZH_HK) return "hk";
    if (key === ShortLanguage.ZH_TW) return "tw";

    return key;
  };

  return (
    <Pressable onPress={onPress} style={active ? styles.item__active : styles.item}>
      <View style={styles.row}>
        <CountryFlag
          style={styles.languageFlag}
          isoCode={getIsoCode((lang || "") as ShortLanguage)}
          size={24}
        />
        <Text style={active ? styles.item__text_active : styles.item__text}>{title}</Text>
      </View>

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
      <View style={{ flex: 1 }}>
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

        <View style={{ paddingHorizontal: 16, flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            data={languageList}
            renderItem={({ item }) => (
              <Item
                active={langToEdit === null ? i18n.language === item.key : langToEdit === item.key}
                onPress={() => setAppLanguage(item.key)}
                colors={colors}
                key={item.key}
                lang={item.key}
                title={item.title}
              />
            )}
            keyExtractor={(item) => item.key}
          />
        </View>
      </View>
    </ModelContainer>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    item__active: {
      marginBottom: 8,
      borderRadius: 12,

      height: 56,

      paddingLeft: 16,
      paddingRight: 16,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      backgroundColor: colors.BgContrast,
    },
    item: {
      marginBottom: 8,
      borderRadius: 12,

      height: 56,

      paddingLeft: 16,
      paddingRight: 16,

      backgroundColor: colors.BgSecondary,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    row: {
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
    },
    item__text: {
      ...Typography.boldDefault,
      color: colors.TextPrimary,
      lineHeight: 24,
    },
    item__text_active: {
      ...Typography.boldDefault,
      color: colors.TextContrastPrimary,
      lineHeight: 24,
    },
    languageFlag: {
      borderRadius: 24,
      width: 24,
      height: 24,
    },
  });

export default SettingsLanguagePage;
