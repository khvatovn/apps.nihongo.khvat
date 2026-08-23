import {
  APP_LANG,
  IS_WELCOME_PAGE,
  SETTINGS_KEY,
} from "@nihongo/core/shared/constants/storageKeys";
import { useEraseDataContext } from "@nihongo/core/shared/contexts/erase-data/erase-data-context";
import { useResetApp } from "@nihongo/core/shared/contexts/reset-context/reset-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useEraseData = () => {
  const { forceReset } = useResetApp();
  const { runEraseSources } = useEraseDataContext();

  return async ({ reset = true }: { reset?: boolean } = {}) => {
    // * общие для всех апок ключи
    await AsyncStorage.multiRemove([APP_LANG, SETTINGS_KEY, IS_WELCOME_PAGE]);

    // * всё остальное чистят модули, зарегистрированные в EraseDataProvider
    await runEraseSources();

    // * строго последним: forceReset ремаунтит дерево, до этого очистка должна закончиться
    if (reset) forceReset();
  };
};
