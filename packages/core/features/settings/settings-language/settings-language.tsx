import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { LanguageKeys, LanguageName } from "@nihongo/core/shared/constants/language";
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

  return (
    <SettingItem
      text={t("settings.language")}
      subText={LanguageName[i18n.language as LanguageKeys]}
      onClick={goToLanguageSettingsPage}
      isLast={isLast}
    />
  );
};

export default SettingsLanguage;
