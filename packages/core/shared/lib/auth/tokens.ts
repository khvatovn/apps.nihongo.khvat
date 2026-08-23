import { ACCESS_TOKEN, REFRESH_TOKEN } from "@nihongo/core/shared/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAccessToken = () => AsyncStorage.getItem(ACCESS_TOKEN);
export const getRefreshToken = () => AsyncStorage.getItem(REFRESH_TOKEN);

export const saveTokens = (access: string, refresh: string) =>
  AsyncStorage.multiSet([
    [ACCESS_TOKEN, access],
    [REFRESH_TOKEN, refresh],
  ]);

export const clearTokens = () => AsyncStorage.multiRemove([ACCESS_TOKEN, REFRESH_TOKEN]);
