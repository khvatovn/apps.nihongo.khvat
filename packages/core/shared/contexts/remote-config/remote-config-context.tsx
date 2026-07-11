import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  FunctionComponent,
} from "react";

import { REMOTE_CONFIG } from "@nihongo/core/shared/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import { fetchRemoteConfig } from "./api";

interface RemoteConfigContextType {
  getField: (key: string) => unknown | null;
  isReady: boolean;
}

const RemoteConfigContext = createContext<RemoteConfigContextType>({
  getField: () => null,
  isReady: false,
});

export const RemoteConfigProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<Record<string, unknown> | null>(null);
  const [isReady, setIsReady] = useState(false);
  const { i18n } = useTranslation();
  const isFirstRun = useRef(true);

  useEffect(() => {
    setIsReady(false);
    let cancelled = false;

    (async () => {
      if (isFirstRun.current) {
        isFirstRun.current = false;

        const cached = await AsyncStorage.getItem(REMOTE_CONFIG);
        if (!cancelled && cached) {
          try {
            const parsed = JSON.parse(cached);
            if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
              setConfig(parsed);
            }
          } catch {
            console.log("failed to get configuration from local storage");
          }
        }
      }

      const fresh = await fetchRemoteConfig(i18n.language);

      if (cancelled) return;

      if (fresh !== null) {
        setConfig(fresh);
        await AsyncStorage.setItem(REMOTE_CONFIG, JSON.stringify(fresh));
      }

      setIsReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [i18n.language]);

  const getField = (key: string): unknown | null => {
    if (!config) return null;
    return key in config ? config[key] : null;
  };

  return (
    <RemoteConfigContext.Provider value={{ getField, isReady }}>
      {children}
    </RemoteConfigContext.Provider>
  );
};

export const useRemoteConfig = () => useContext(RemoteConfigContext);
