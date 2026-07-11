import React, { useEffect } from "react";

// * from packages/core

import SettingsSection from "@nihongo/core/entities/setting/setting-section/settings-section";
import ContactSupport from "@nihongo/core/features/settings/contact-support/contact-support";
import DebugInfo from "@nihongo/core/features/settings/debug-info/debug-info";
import PrivacyPolicy from "@nihongo/core/features/settings/privacy-policy/privacy-policy";
import SettingsHaptic from "@nihongo/core/features/settings/settings-haptic/settings-haptic";
import SettingsLanguage from "@nihongo/core/features/settings/settings-language/settings-language";
import SettingsTheme from "@nihongo/core/features/settings/settings-theme/settings-theme";
import SettingsTransliterations from "@nihongo/core/features/settings/settings-transliterations/settings-language";
import StoreReviewLink from "@nihongo/core/features/settings/store-review-link/store-review-link";
import TermsAndConditions from "@nihongo/core/features/settings/terms-and-conditions/terms-and-conditions";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import PageTitle from "@nihongo/core/shared/ui/page-title/page-title";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CaretLeftIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";

import { RootStackParamList, ROUTES } from "@/app/routes.types";
import AccountActions from "@/features/settings/account-actions/account-actions";
import RemoveData from "@/features/settings/remove-data/remove-data";
import SettingsStatistics from "@/features/settings/settings-statistics/settings-statistics";

type NavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.SETTINGS_ROOT>;

const SettingsPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const styles = makeStyles(colors);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const goBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <PageTitle
        isSaveArea
        leftIcon={
          <Pressable onPress={goBack}>
            <>
              <CaretLeftIcon size={32} color={colors.BgContrast} />
            </>
          </Pressable>
        }
      >
        {t("tabs.settings")}
      </PageTitle>

      <ScrollView contentContainerStyle={styles.scroll}>
        <SettingsSection>
          <SettingsStatistics />
          <SettingsHaptic />
          <SettingsTheme toThemeSettingPage={() => navigation.navigate(ROUTES.SETTINGS_THEME)} />
        </SettingsSection>

        <SettingsSection>
          <SettingsLanguage
            goToLanguageSettingsPage={() => navigation.navigate(ROUTES.SETTINGS_LANGUAGE)}
          />
          <SettingsTransliterations
            goToTransliterationsSettingsPage={() =>
              navigation.navigate(ROUTES.SETTINGS_TRANSLITERATION)
            }
          />
        </SettingsSection>

        <SettingsSection>
          <PrivacyPolicy app="nihon-go-kana" />
          <ContactSupport app="nihon-go-kana" />
          <TermsAndConditions app="nihon-go-kana" />
        </SettingsSection>

        <StoreReviewLink iosId="id6479753061" packageName={process.env.ANDROID_PACKAGE} />

        <DebugInfo />

        <SettingsSection>
          <RemoveData />
          <AccountActions />
        </SettingsSection>
      </ScrollView>
    </View>
  );
};

export default SettingsPage;

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BgPrimary,
    },
    scroll: {
      gap: 16,
      paddingBottom: 32,
    },
    title: {
      marginLeft: 20,
    },
  });
