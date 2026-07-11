import {
  ACCESS_TOKEN,
  IS_WELCOME_PAGE,
  REFRESH_TOKEN,
} from "@nihongo/core/shared/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";


// * Успешный вход/регистрация: сохраняем токены и помечаем, что welcome/auth-флоу пройден.
// * После этого апка вызывает forceReset() и уходит из AuthNavigation в RootNavigation.
export const completeAuth = (accessToken: string, refreshToken: string) =>
  AsyncStorage.multiSet([
    [ACCESS_TOKEN, accessToken],
    [REFRESH_TOKEN, refreshToken],
    [IS_WELCOME_PAGE, "true"],
  ]);
