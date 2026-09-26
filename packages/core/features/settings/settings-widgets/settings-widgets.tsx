import React from "react";

import { useAvailableProfileWidgets } from "@nihongo/core/shared/lib/settings/useProfileWidgets";
import { SquaresFourIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";

import SettingItem from "../../../entities/setting/setting-item/setting-item";
import SettingsSection from "../../../entities/setting/setting-section/settings-section";
import { useThemeContext } from "../../../shared/contexts/theme/theme-context";

interface SettingsWidgetsProps {
  toWidgetsSettingPage: () => void;
}

const SettingsWidgets: React.FC<SettingsWidgetsProps> = ({ toWidgetsSettingPage }) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const available = useAvailableProfileWidgets();

  if (available.length === 0) return null;

  return (
    <SettingsSection>
      <SettingItem
        leftIcon={<SquaresFourIcon size={20} color={colors.BgContrast} />}
        text={t("settings.widgets.title")}
        isLast
        onClick={toWidgetsSettingPage}
      />
    </SettingsSection>
  );
};

export default SettingsWidgets;
