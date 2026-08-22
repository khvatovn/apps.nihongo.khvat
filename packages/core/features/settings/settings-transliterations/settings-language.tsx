import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { useTransliterationsContext } from "@nihongo/core/shared/contexts/transliteration/transliteration";
import { StackIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";

interface SettingsTransliterationsProps {
  goToTransliterationsSettingsPage: () => void;
}

const SettingsTransliterations: React.FC<SettingsTransliterationsProps> = ({
  goToTransliterationsSettingsPage,
}) => {
  const { colors } = useThemeContext();

  const { t } = useTranslation();

  const { transliterations } = useTransliterationsContext();

  const transliterationSystems = [
    t("transliterationSystems.hepburn"),
    t("transliterationSystems.kunreiShiki"),
    t("transliterationSystems.nihonShiki"),
    t("transliterationSystems.polivanovSystem"),
  ];

  return (
    <SettingItem
      isLast
      leftIcon={<StackIcon size={20} color={colors.BgContrast} />}
      text={t("transliterationSystems.transliterationSystems")}
      subText={transliterationSystems[transliterations]}
      onClick={goToTransliterationsSettingsPage}
    />
  );
};

export default SettingsTransliterations;
