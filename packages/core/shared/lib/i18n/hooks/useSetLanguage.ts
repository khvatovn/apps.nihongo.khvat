

import { ShortLanguage } from "@nihongo/core/shared/constants/language";
import { APP_LANG } from "@nihongo/core/shared/constants/storageKeys";
import { setDevice } from "@nihongo/core/shared/contexts/device-registration/api";
import {
  Transliterations,
  useTransliterationsContext,
} from "@nihongo/core/shared/contexts/transliteration/transliteration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const useSetLanguage = () => {
  const { updateTransliterations } = useTransliterationsContext();
  const { i18n } = useTranslation();

  return {
    set: async (language: ShortLanguage) => {
      console.log(`[LOG] (SetLanguage) ${language} ${new Date()}`);

      if (language === ShortLanguage.RU) {
        updateTransliterations(Transliterations.POL);
      } else {
        updateTransliterations(Transliterations.HEP);
      }

      if (!language) {
        console.log(`[ERROR] Emprty language ${new Date()}`);
        return;
      }

      await AsyncStorage.setItem(APP_LANG, language);
      i18n.changeLanguage(language);

      // * Update device
      await setDevice({ lang: language });

      return true;
    },
  };
};

export default useSetLanguage;
