import {
  APP_LANG,
  IS_WELCOME_PAGE,
  KANA_STATISTICS,
  LESSONS_LIST,
  SELECTED_KANA,
  SETTINGS_KEY,
} from "@nihongo/core/shared/constants/storageKeys";
import { useResetApp } from "@nihongo/core/shared/contexts/reset-context/reset-context";
import {
  Transliterations,
  useTransliterationsContext,
} from "@nihongo/core/shared/contexts/transliteration/transliteration";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useLessonsContext } from "@/pages/education/learning/model/hooks";
import { useKanaContext } from "@/pages/kana/kana-table-choice-letters-page/model/hooks";
import { useStatisticsContext } from "@/pages/kana/kana-table-list-page/model/hooks";

export const useEraseData = () => {
  const { forceReset } = useResetApp();
  const { updateTransliterations } = useTransliterationsContext();
  const { clearLessons } = useLessonsContext();
  const { clearKana } = useKanaContext();
  const { clearStatistics } = useStatisticsContext();

  return ({ reset = true }: { reset?: boolean } = {}) => {
    AsyncStorage.removeItem(APP_LANG);
    AsyncStorage.removeItem(SETTINGS_KEY);
    AsyncStorage.removeItem(LESSONS_LIST);
    AsyncStorage.removeItem(KANA_STATISTICS);
    AsyncStorage.removeItem(SELECTED_KANA);
    AsyncStorage.removeItem(IS_WELCOME_PAGE);

    // * Erase Transliterations
    updateTransliterations(Transliterations.HEP);

    // * Erase Lessons / Kana / Statistics
    clearLessons();
    clearKana();
    clearStatistics();

    if (reset) forceReset();
  };
};
