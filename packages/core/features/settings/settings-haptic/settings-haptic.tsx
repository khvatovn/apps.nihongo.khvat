import React from "react";

import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { VibrateIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";

import SettingItem from "../../../entities/setting/setting-item/setting-item";
import { useHaptic } from "../../../shared/contexts/haptic/haptic-context";

const SettingsStatistics: React.FC = () => {
  const { t } = useTranslation();

  const { isEnabled, toggle } = useHaptic();
  const { colors } = useThemeContext();

  return (
    <SettingItem
      leftIcon={<VibrateIcon size={20} color={colors.BgContrast} />}
      text={t("settings.hapticFeedback")}
      isEnable={isEnabled}
      onValueChange={toggle}
    />
  );
};

export default SettingsStatistics;
