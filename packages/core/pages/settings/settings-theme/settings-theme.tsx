import React from "react";

import ThemeItem, { ThemeType } from "@nihongo/core/entities/setting/theme/theme-item";
import { Theme } from "@nihongo/core/shared/constants/theme";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { darkTheme } from "@nihongo/core/shared/themes/dark";
import { hokkaidoDarkTheme } from "@nihongo/core/shared/themes/hokkaido_dark";
import { hokkaidoLightTheme } from "@nihongo/core/shared/themes/hokkaido_light";
import { lightTheme } from "@nihongo/core/shared/themes/light";
import { osakaDarkTheme } from "@nihongo/core/shared/themes/osaka_dark";
import { osakaLightTheme } from "@nihongo/core/shared/themes/osaka_light";
import { sakuraLightTheme } from "@nihongo/core/shared/themes/sakura_light";
import { Typography } from "@nihongo/core/shared/typography";
import { ModalHeader } from "@nihongo/core/shared/ui/modal-header/modal-header";
import { ModelContainer } from "@nihongo/core/shared/ui/model-container/model-container";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { FlatList, View, StyleSheet, Text } from "react-native";

const SettingsThemePage: React.FC = () => {
  const { t } = useTranslation();

  const { updateTheme } = useThemeContext();

  const { colors } = useThemeContext();

  const navigation = useNavigation();

  const styles = makeStyles(colors);

  const setTheme = (item: Theme) => {
    updateTheme(item);
    navigation.goBack();
  };

  const getIcon = (colors: ColorsType) => {
    return [colors.BgPrimary, colors.BgLightGray, colors.BgAccent];
  };

  const themeOptions = [
    { key: Theme.Light, type: ThemeType.Dark, title: "Default Light", icon: getIcon(lightTheme) },
    { key: Theme.Dark, type: ThemeType.Light, title: "Default Dark", icon: getIcon(darkTheme) },
    {
      key: Theme.HokkaidoDark,
      type: ThemeType.Dark,
      title: "Hokkaido Dark",
      icon: getIcon(hokkaidoDarkTheme),
    },
    {
      key: Theme.HokkaidoLight,
      type: ThemeType.Light,
      title: "Hokkaido Light",
      icon: getIcon(hokkaidoLightTheme),
    },
    {
      key: Theme.OsakaDark,
      type: ThemeType.Dark,
      title: "Osaka Dark",
      icon: getIcon(osakaDarkTheme),
    },
    {
      key: Theme.OsakaLight,
      type: ThemeType.Light,
      title: "Osaka Light",
      icon: getIcon(osakaLightTheme),
    },
    {
      key: Theme.SakuraLight,
      type: ThemeType.Light,
      title: "Sakura Light",
      icon: getIcon(sakuraLightTheme),
    },
  ];

  return (
    <ModelContainer>
      <View>
        <ModalHeader
          title={t("settings.theme.title")}
          left={{
            text: t("common.close"),
            onPress: () => navigation.goBack(),
          }}
        />

        <Text style={styles.title}>Installed</Text>
        <View style={styles.list}>
          <FlatList
            data={themeOptions}
            renderItem={({ item, index }) => (
              <ThemeItem
                key={item.key}
                name={item.title}
                icon={item.icon}
                author={"ui.taisia"}
                type={item.type}
                downloads={0}
                screenshots={[]}
                isOpen={false}
                isLast={index >= themeOptions.length - 1}
                onPress={() => setTheme(item.key)}
              />
            )}
            keyExtractor={(item) => item.key.toString()}
          />
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

      marginHorizontal: 18,
      marginVertical: 16,
    },
    list: {
      backgroundColor: colors.BgSecondary,
      marginHorizontal: 18,

      borderRadius: 12,
    },
  });

export default SettingsThemePage;
