import { ACCESS_TOKEN, REFRESH_TOKEN } from "@nihongo/core/shared/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthChangeListener = () => void;

const listeners = new Set<AuthChangeListener>();

export const subscribeToAuthChange = (listener: AuthChangeListener) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const notifyAuthChange = () => {
  listeners.forEach((listener) => listener());
};

export const getAccessToken = () => AsyncStorage.getItem(ACCESS_TOKEN);
export const getRefreshToken = () => AsyncStorage.getItem(REFRESH_TOKEN);

export const saveTokens = async (access: string, refresh: string) => {
  await AsyncStorage.multiSet([
    [ACCESS_TOKEN, access],
    [REFRESH_TOKEN, refresh],
  ]);

  notifyAuthChange();
};

export const clearTokens = async () => {
  await AsyncStorage.multiRemove([ACCESS_TOKEN, REFRESH_TOKEN]);

  notifyAuthChange();
};
