import React, { createContext, useContext, ReactNode, useEffect } from "react";

import { isAndroid } from "@nihongo/core/shared/constants/platformUtil";
import {
  APP_LANG,
  DEVICE_ID,
  FAILED_TO_REQUEST_NOTIFICATION_TOKEN,
  NOTIFICATION_TOKEN,
} from "@nihongo/core/shared/constants/storageKeys";
import { useNotificationsContext } from "@nihongo/core/shared/lib/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Platform, setDevice, setDeviceOnline } from "./api";

// * Контекст ничего не отдаёт (провайдер только запускает регистрацию девайса) — пустой объект.
type DeviceRegistrationContextType = Record<string, never>;

const DeviceRegistrationContext = createContext<DeviceRegistrationContextType | undefined>(
  undefined,
);

async function registerDeviceImmediately() {
  let deviceId = await AsyncStorage.getItem(DEVICE_ID);

  if (!deviceId) {
    const language = (await AsyncStorage.getItem(APP_LANG)) || "en";

    try {
      const response = await setDevice({
        platform: isAndroid ? Platform.Android : Platform.IOS,
        lang: language,
      });

      if (response.ok && response.id) {
        console.log(`[${+new Date()}] [LOG]: DEVICE CREATED`);

        await AsyncStorage.setItem(DEVICE_ID, response.id);
        deviceId = response.id;
      }
    } catch (error) {
      console.log(`[${+new Date()}] [ERROR]: ERROR CREATE DEVICE`, error);
      return null;
    }
  } else {
    await setDeviceOnline();
  }

  return deviceId;
}

async function tryRegisterPushTokenLater(
  deviceId: string,
  requestPushNotificationsToken: () => Promise<string | null>,
) {
  if (!deviceId) return;

  const language = (await AsyncStorage.getItem(APP_LANG)) || "en";
  const notificationToken = await AsyncStorage.getItem(NOTIFICATION_TOKEN);
  const failedBefore = await AsyncStorage.getItem(FAILED_TO_REQUEST_NOTIFICATION_TOKEN);

  if (notificationToken || failedBefore === "true") {
    return;
  }

  try {
    const token = await requestPushNotificationsToken();

    if (!token) {
      await AsyncStorage.setItem(FAILED_TO_REQUEST_NOTIFICATION_TOKEN, "true");
      return;
    }

    await AsyncStorage.setItem(NOTIFICATION_TOKEN, token);

    const response = await setDevice({
      id: deviceId,
      platform: isAndroid ? Platform.Android : Platform.IOS,
      lang: language,
      token,
    });

    if (response.ok && response.id) {
      console.log(`[${+new Date()}] [LOG]: UPDATED TOKEN`);
    } else {
      console.log(`[${+new Date()}] [ERROR]: CANNOT UPDATED TOKEN`);
    }
  } catch (error) {
    console.log(`[${+new Date()}] [ERROR]: CANNOT UPDATED TOKEN`, error);
  }
}

export const DeviceRegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { requestPushNotificationsToken } = useNotificationsContext();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    (async () => {
      const deviceId = await registerDeviceImmediately();

      if (deviceId) {
        timeoutId = setTimeout(() => {
          tryRegisterPushTokenLater(deviceId, requestPushNotificationsToken);
        }, 12000);
      }
    })();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [requestPushNotificationsToken]);

  return (
    <DeviceRegistrationContext.Provider value={{}}>{children}</DeviceRegistrationContext.Provider>
  );
};

export const useDeviceRegistration = (): DeviceRegistrationContextType => {
  const context = useContext(DeviceRegistrationContext);
  if (undefined === context) {
    throw new Error("useDeviceRegistration must be used within a DeviceRegistrationProvider");
  }

  return context;
};
