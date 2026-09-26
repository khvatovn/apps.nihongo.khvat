import React, { ReactNode, useEffect, useState } from "react";

import { APP_LANG } from "@nihongo/core/shared/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

export const SavedLanguageGate: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const restore = async () => {
      try {
        const savedLang = await AsyncStorage.getItem(APP_LANG);
        if (savedLang) await i18n.changeLanguage(savedLang);
      } catch {
        //
      } finally {
        setReady(true);
      }
    };

    restore();
  }, [i18n]);

  if (!ready) return null;

  return <>{children}</>;
};
