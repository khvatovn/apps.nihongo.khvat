import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { ChartBarIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";

import { useStatisticsContext } from "@/pages/kana/kana-table-list-page/model/hooks";

const SettingsStatistics: React.FC = () => {
  const { t } = useTranslation();

  const { colors } = useThemeContext();

  const { isEnabled: isEnabledStats, toggleStatistics } = useStatisticsContext();

  return (
    <SettingItem
      leftIcon={<ChartBarIcon size={20} color={colors.BgContrast} />}
      text={t("settings.displayStatistics")}
      isEnable={isEnabledStats}
      onValueChange={toggleStatistics}
    />
  );
};

export default SettingsStatistics;
