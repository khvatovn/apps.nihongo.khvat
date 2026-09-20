import { IS_WELCOME_PAGE } from "@nihongo/core/shared/constants/storageKeys";
import { saveTokens } from "@nihongo/core/shared/lib/auth/tokens";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const completeAuth = async (accessToken: string, refreshToken: string) => {
  await AsyncStorage.setItem(IS_WELCOME_PAGE, "true");
  await saveTokens(accessToken, refreshToken);
};
