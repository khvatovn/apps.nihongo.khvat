import { isAndroid } from "@nihongo/core/shared/constants/platformUtil";
import { DEVICE_ID } from "@nihongo/core/shared/constants/storageKeys";
import { apiFetch } from "@nihongo/core/shared/lib/api-gateway";
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum Platform {
  Android = "android",
  IOS = "IOS",
}

type SetDeviceRequestDeviceRegistrationState = {
  lang: string;
  platform?: Platform;
};

type SetDeviceRequestDeviceUpdateState = {
  id: string; // * Pass id if it exists; if omitted, a new device is created
  lang: string; // * App language (ShortLanguage enum)
  platform?: Platform; // * Platform (Platform enum)

  token?: string; // * Notification token

  notifications?: boolean; // * Allows disabling all notifications (defaults to true)
  custom_notifications?: boolean; // * Allows disabling custom notifications (defaults to true)

  version?: string; // * App version
  application_name?: string; // * App name
};

// ? Request payload for device registration
type SetDeviceRequestState =
  | SetDeviceRequestDeviceRegistrationState
  | SetDeviceRequestDeviceUpdateState;

// * Failed setDevice response
type SetDeviceResponseFailedState = {
  ok: false;
  id: null;
};

// * Successful setDevice response
type SetDeviceResponseSuccessState = {
  ok: true;
  id: string;
};

// ? Response to the device registration request
type SetDeviceResponseState = SetDeviceResponseFailedState | SetDeviceResponseSuccessState;

export const setDeviceOnline = async () => {
  const deviceId = await AsyncStorage.getItem(DEVICE_ID);

  if (!deviceId) return;

  try {
    const response = await apiFetch("/api/v2/device/online", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: deviceId,

        version: process.env.VERSION,
      }),
    });

    if (!response.ok) {
      console.log(`[${+new Date()}] [ERROR]: Error setDeviceOnline request: `);
    } else {
      console.log(`[${+new Date()}] [LOG]: Send setDeviceOnline request: `);
    }
  } catch (error) {
    console.log(`[${+new Date()}] [ERROR]: Error setDeviceOnline device: `, error);
    return { ok: false, id: null };
  }
};

export const setDevice = async (
  payload: SetDeviceRequestState,
): Promise<SetDeviceResponseState> => {
  const deviceId = await AsyncStorage.getItem(DEVICE_ID);

  const fullPayload: SetDeviceRequestState = {
    ...(deviceId ? { id: deviceId } : {}),
    platform: isAndroid ? Platform.Android : Platform.IOS,

    version: process.env.VERSION,
    // * App display name from the app's .env (react-native-dotenv inlines it at build time).
    application_name: process.env.APP_NAME,
    ...payload,
  };

  console.log(
    `[${+new Date()}] [LOG]: SET_DEVICE_REQUEST, payload: ${JSON.stringify(fullPayload, null, 2)}`,
  );

  try {
    const response = await apiFetch("/api/v2/device", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullPayload),
    });

    if (!response.ok) {
      console.log(`[${+new Date()}] [ERROR]: Error setDevice request: `, response.text());
      return { ok: false, id: null };
    }

    const body = await response.json();

    if (body.ok === true && !!body.id) {
      return body;
    }

    return { ok: false, id: null };
  } catch (error) {
    console.log(`[${+new Date()}] [ERROR]: Error registration device: `, error);
    return { ok: false, id: null };
  }
};
