import React from "react";


import { useActionSheet } from "@expo/react-native-action-sheet";
import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { LanguageKeys, LanguageName, ShortLanguage } from "@nihongo/core/shared/constants/language";
import { isIOS } from "@nihongo/core/shared/constants/platformUtil";
import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import useSetLanguage from "@nihongo/core/shared/lib/i18n/hooks/useSetLanguage";
import { useTranslation } from "react-i18next";

interface SettingsLanguage {
  goToLanguageSettingsPage: () => void;

  isLast?: boolean;
}

const SettingsLanguage: React.FC<SettingsLanguage> = ({
  goToLanguageSettingsPage,
  isLast = false,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const { themeString } = useThemeContext();

  const { t, i18n } = useTranslation();

  const { set } = useSetLanguage();

  const openModal = () => {
    const options = [
      t("alert.cancel"),
      LanguageName.ch,
      LanguageName.en,
      LanguageName.es,
      LanguageName.pt,
      LanguageName.ru,
      LanguageName.fr,
      LanguageName.de,
      LanguageName.it,
      LanguageName.ko,
    ];
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
            set(ShortLanguage.CH);
            break;
          case 2:
            set(ShortLanguage.EN);
            break;
          case 3:
            set(ShortLanguage.ES);
            break;
          case 4:
            set(ShortLanguage.PT);
            break;
          case 5:
            set(ShortLanguage.RU);
            break;
          case 6:
            set(ShortLanguage.FR);
            break;
          case 7:
            set(ShortLanguage.DE);
            break;
          case 8:
            set(ShortLanguage.IT);
            break;
          case 9:
            set(ShortLanguage.KO);
            break;
          default:
            break;
        }
      },
    );
  };

  return (
    <SettingItem
      text={t("settings.language")}
      subText={LanguageName[i18n.language as LanguageKeys]}
      onClick={isIOS ? openModal : goToLanguageSettingsPage}
      isLast={isLast}
    />
  );
};

export default SettingsLanguage;
