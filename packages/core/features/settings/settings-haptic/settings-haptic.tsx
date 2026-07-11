import React from "react";

import { useTranslation } from "react-i18next";

import SettingItem from "../../../entities/setting/setting-item/setting-item";
import { useHaptic } from "../../../shared/contexts/haptic/haptic-context";

const SettingsStatistics: React.FC = () => {
  const { t } = useTranslation();

  const { isEnabled, toggle } = useHaptic();

  return (
    <SettingItem text={t("settings.hapticFeedback")} isEnable={isEnabled} onValueChange={toggle} />
  );
};

export default SettingsStatistics;
