import React from "react";

import { useActionSheet } from "@expo/react-native-action-sheet";
import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { isIOS } from "@nihongo/core/shared/constants/platformUtil";
import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import {
  Transliterations,
  useTransliterationsContext,
} from "@nihongo/core/shared/contexts/transliteration/transliteration";
import { useTranslation } from "react-i18next";

interface SettingsTransliterationsProps {
  goToTransliterationsSettingsPage: () => void;
}

const SettingsTransliterations: React.FC<SettingsTransliterationsProps> = ({
  goToTransliterationsSettingsPage,
}) => {
  const { themeString } = useThemeContext();

  const { showActionSheetWithOptions } = useActionSheet();

  const { t } = useTranslation();

  const { transliterations, updateTransliterations } = useTransliterationsContext();

  const onUpdateTransliterations = (transliteration: Transliterations) => {
    updateTransliterations(transliteration);
  };

  const transliterationSystems = [
    t("transliterationSystems.hepburn"),
    t("transliterationSystems.kunreiShiki"),
    t("transliterationSystems.nihonShiki"),
    t("transliterationSystems.polivanovSystem"),
  ];

  const onPress = () => {
    const options = [t("alert.cancel"), ...transliterationSystems];
    const cancelButtonIndex = 0;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        userInterfaceStyle: themeString as "dark" | "light",
      },
      (buttonIndex?: number) => {
        switch (buttonIndex) {
          case 1:
            onUpdateTransliterations(Transliterations.HEP);
            break;
          case 2:
            onUpdateTransliterations(Transliterations.KUN);
            break;
          case 3:
            onUpdateTransliterations(Transliterations.NIH);
            break;
          case 4:
            onUpdateTransliterations(Transliterations.POL);
            break;
          default:
            break;
        }
      },
    );
  };

  return (
    <SettingItem
      isLast
      text={t("transliterationSystems.transliterationSystems")}
      subText={transliterationSystems[transliterations]}
      onClick={isIOS ? onPress : goToTransliterationsSettingsPage}
    />
  );
};

export default SettingsTransliterations;
