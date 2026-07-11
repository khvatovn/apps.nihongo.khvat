import React from "react";

import { useTranslation } from "react-i18next";

import SettingItem from "../../../entities/setting/setting-item/setting-item";
import { useThemeContext } from "../../../shared/contexts/theme/theme-context";

interface SettingsThemeProps {
  toThemeSettingPage: () => void;
}

const SettingsTheme: React.FC<SettingsThemeProps> = ({ toThemeSettingPage }) => {
  const { t } = useTranslation();

  const { themeString } = useThemeContext();
  return (
    <SettingItem
      text={t("settings.theme.title")}
      subText={themeString.replaceAll("_", " ")}
      isLast
      onClick={toThemeSettingPage}
    />
  );
};

export default SettingsTheme;
