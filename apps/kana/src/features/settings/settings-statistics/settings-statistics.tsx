import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { useTranslation } from "react-i18next";

import { useStatisticsContext } from "@/pages/kana/kana-table-list-page/model/hooks";

const SettingsStatistics: React.FC = () => {
  const { t } = useTranslation();

  const { isEnabled: isEnabledStats, toggleStatistics } = useStatisticsContext();

  return (
    <SettingItem
      text={t("settings.displayStatistics")}
      isEnable={isEnabledStats}
      onValueChange={toggleStatistics}
    />
  );
};

export default SettingsStatistics;
