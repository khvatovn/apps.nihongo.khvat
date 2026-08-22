import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { LanguageKeys, LanguageName } from "@nihongo/core/shared/constants/language";
import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { TranslateIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";

interface SettingsLanguage {
  goToLanguageSettingsPage: () => void;

  isLast?: boolean;
}

const SettingsLanguage: React.FC<SettingsLanguage> = ({
  goToLanguageSettingsPage,
  isLast = false,
}) => {
  const { t, i18n } = useTranslation();
  const { colors } = useThemeContext();

  return (
    <SettingItem
      leftIcon={<TranslateIcon size={20} color={colors.BgContrast} />}
      text={t("settings.language")}
      subText={LanguageName[i18n.language as LanguageKeys]}
      onClick={goToLanguageSettingsPage}
      isLast={isLast}
    />
  );
};

export default SettingsLanguage;
