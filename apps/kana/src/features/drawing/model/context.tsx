import React, { createContext, useState, useEffect, ReactNode, useMemo } from "react";

import { SETTINGS_KEY } from "@nihongo/core/shared/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface DrawSettings {
  lineWidth: number;
  isShowBorder: boolean;
  isShowLetter: boolean;
}

export interface DrawContextType {
  settings: DrawSettings;
  setLineWidth: (width: number) => void;
  toggleBorder: () => void;
  toggleLetter: () => void;
  resetSettings: () => void;
}

const DrawContext = createContext<DrawContextType | null>(null);

const initialSettings: DrawSettings = {
  lineWidth: 6,
  isShowBorder: true,
  isShowLetter: true,
};

export const DrawProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<DrawSettings>(initialSettings);

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(SETTINGS_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setSettings(parsed.draw ?? parsed);
        }
      } catch (e) {
        console.warn("Не удалось загрузить настройки рисования", e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({ draw: settings }));
      } catch (e) {
        console.warn("Не удалось сохранить настройки рисования", e);
      }
    };
    save();
  }, [settings]);

  const setLineWidth = (width: number) => {
    setSettings((prev) => ({ ...prev, lineWidth: width }));
  };

  const toggleBorder = () => {
    setSettings((prev) => ({ ...prev, isShowBorder: !prev.isShowBorder }));
  };

  const toggleLetter = () => {
    setSettings((prev) => ({ ...prev, isShowLetter: !prev.isShowLetter }));
  };

  const resetSettings = () => setSettings(initialSettings);

  const value = useMemo(
    () => ({
      settings,
      setLineWidth,
      toggleBorder,
      toggleLetter,
      resetSettings,
    }),
    [settings],
  );

  return <DrawContext.Provider value={value}>{children}</DrawContext.Provider>;
};

export { DrawContext };
