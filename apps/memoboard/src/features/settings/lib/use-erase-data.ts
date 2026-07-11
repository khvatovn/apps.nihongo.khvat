
import {
  APP_LANG,
  IS_WELCOME_PAGE,
  KANA_STATISTICS,
  LESSONS_LIST,
  SELECTED_KANA,
  SETTINGS_KEY,
} from "@nihongo/core/shared/constants/storageKeys";
import { useResetApp } from "@nihongo/core/shared/contexts/reset-context/reset-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useEraseData = () => {
  const { forceReset } = useResetApp();

  return ({ reset = true }: { reset?: boolean } = {}) => {
    AsyncStorage.removeItem(APP_LANG);
    AsyncStorage.removeItem(SETTINGS_KEY);
    AsyncStorage.removeItem(LESSONS_LIST);
    AsyncStorage.removeItem(KANA_STATISTICS);
    AsyncStorage.removeItem(SELECTED_KANA);
    AsyncStorage.removeItem(IS_WELCOME_PAGE);

    if (reset) forceReset();
  };
};
