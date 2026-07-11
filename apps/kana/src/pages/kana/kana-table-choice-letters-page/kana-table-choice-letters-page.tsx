import React, { useMemo, useState } from "react";

import { isIOS } from "@nihongo/core/shared/constants/platformUtil";
import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import PrimaryButton from "@nihongo/core/shared/ui/buttons/Primary/primary-button";
import { ModalHeader } from "@nihongo/core/shared/ui/modal-header/modal-header";
import Switcher from "@nihongo/core/shared/ui/switcher/switcher";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { View, Text, SectionList, StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ROUTES, RootStackParamList } from "@/app/routes.types";
import EducationKanaTableSelected from "@/features/education/education-kana-table-selected/education-kana-table";
import { Alphabet, KanaAlphabet } from "@/shared/constants/kana";

type ScreenNavigationProps = StackNavigationProp<RootStackParamList, typeof ROUTES.KANA_SELECT>;

const KanaTableChoiceLettersPage: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProps>();
  const { colors } = useThemeContext();

  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();

  useFocusEffect(() => {
    StatusBar.setBarStyle("light-content");

    return () => {
      const barStyle = colors._theme === "dark" ? "light-content" : "dark-content";
      StatusBar.setBarStyle(barStyle);
    };
  });

  const [activeTab, setActiveTab] = useState<KanaAlphabet>(KanaAlphabet.Hiragana);

  const sections = useMemo(
    () => [
      { title: t("kana.basic"), type: "base", data: ["base"] },
      { title: t("kana.dakuon"), type: "dakuon", data: ["dakuon"] },
      { title: t("kana.handakuon"), type: "handakuon", data: ["handakuon"] },
      { title: t("kana.yoon"), type: "yoon", data: ["yoon"] },
    ],
    [t],
  );

  const done = () => navigation.goBack();

  return (
    <View style={{ flex: 1, paddingBottom: 40 + insets.bottom, position: "relative" }}>
      <ModalHeader
        title={activeTab === KanaAlphabet.Hiragana ? t("kana.hiragana") : t("kana.katakana")}
        left={{
          text: t("common.close"),
          onPress: done,
        }}
      />

      {isIOS && (
        <View style={[styles.lineContainer, { top: 46, backgroundColor: colors.BorderDefault }]} />
      )}

      {isIOS && (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={({ section }) => (
            <React.Suspense fallback={<View />}>
              <EducationKanaTableSelected
                alphabetType={section.type as Alphabet}
                kana={activeTab}
                last={section.type === "yoon"}
              />
            </React.Suspense>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={[styles.nameContainer, { backgroundColor: colors.BgPrimary }]}>
              <Text style={[Typography.boldH3, { color: colors.TextPrimary }]}>{title}</Text>
            </View>
          )}
        />
      )}

      {!isIOS && (
        <FlatList
          data={sections}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <React.Suspense fallback={<View />}>
              <View style={[styles.nameContainer]}>
                <Text style={[Typography.boldH3, { color: colors.TextPrimary }]}>{item.title}</Text>
              </View>

              <EducationKanaTableSelected
                alphabetType={item.type as Alphabet}
                kana={activeTab}
                last={item.type === "yoon"}
              />
            </React.Suspense>
          )}
        />
      )}

      <View
        style={[
          styles.switcherContainer,
          {
            bottom: insets.bottom,
            backgroundColor: colors.BgPrimary,
            borderColor: colors.BorderDefault,
          },
        ]}
      >
        <Switcher<KanaAlphabet>
          isFullWidth
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          options={[KanaAlphabet.Hiragana, KanaAlphabet.Katakana]}
          translate={
            i18n.language === "ch"
              ? [t("kana.hiragana"), t("kana.katakana")]
              : ["ひらがな", "カタカナ"]
          }
          customStyles={{
            flex: 2,
          }}
        />
        <PrimaryButton
          isFullWidth
          isHapticFeedback
          onClick={() => done()}
          text={t("common.done")}
        />
      </View>
    </View>
  );
};

export default KanaTableChoiceLettersPage;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    height: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  nameContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,

    height: 46,
  },
  lineContainer: {
    width: "100%",

    zIndex: 1,
    height: 1,
  },
  switcherContainer: {
    position: "absolute",
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    paddingHorizontal: 20,
  },
});
