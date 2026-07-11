import React, { createContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";

import { KANA_STATISTICS } from "@nihongo/core/shared/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StatisticChapter, StatisticChapterRaw, StatisticLevel } from "./types";

import { KanaAlphabet } from "@/shared/constants/kana";

interface StatisticsState {
  rawStatistics: { hiragana: StatisticChapterRaw; katakana: StatisticChapterRaw };
  statistics: { hiragana: StatisticChapter; katakana: StatisticChapter };
  isEnabled: boolean;
}

export interface StatisticsContextType {
  statistics: { hiragana: StatisticChapter; katakana: StatisticChapter };
  isEnabled: boolean;
  recalculateOnce: (chapter: KanaAlphabet, id: string, isCorrect: boolean) => void;
  toggleStatistics: () => void;
  clearStatistics: () => void;
}

const initialState: StatisticsState = {
  rawStatistics: { hiragana: {}, katakana: {} },
  statistics: { hiragana: {}, katakana: {} },
  isEnabled: true,
};

const StatisticsContext = createContext<StatisticsContextType | null>(null);

const calculateLevel = (values: number[]): StatisticLevel => {
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  if (avg >= 81) return StatisticLevel.Green;
  if (avg >= 51) return StatisticLevel.Yellow;
  return StatisticLevel.Red;
};

const save = (next: StatisticsState) => {
  AsyncStorage.setItem(KANA_STATISTICS, JSON.stringify(next));
};

export const StatisticsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<StatisticsState>(initialState);

  useEffect(() => {
    const restore = async () => {
      try {
        const raw = await AsyncStorage.getItem(KANA_STATISTICS);
        if (raw) setState(JSON.parse(raw));
      } catch {
        console.log("error restore");
      }
    };

    restore();
  }, []);

  const recalculateOnce = useCallback((chapter: KanaAlphabet, id: string, isCorrect: boolean) => {
    setState((prev) => {
      const currentValues = prev.rawStatistics[chapter][id]?.values ?? [];
      const newValues = [...currentValues, isCorrect ? 100 : 0];
      const level = calculateLevel(newValues);

      const newRaw = {
        ...prev.rawStatistics,
        [chapter]: { ...prev.rawStatistics[chapter], [id]: { values: newValues } },
      };

      const prevLevel = prev.statistics[chapter][id]?.level;
      const newStats =
        prevLevel === level
          ? prev.statistics
          : {
              ...prev.statistics,
              [chapter]: { ...prev.statistics[chapter], [id]: { level } },
            };

      const next = { ...prev, rawStatistics: newRaw, statistics: newStats };
      save(next);
      return next;
    });
  }, []);

  const toggleStatistics = useCallback(() => {
    setState((prev) => {
      const next = { ...prev, isEnabled: !prev.isEnabled };
      save(next);
      return next;
    });
  }, []);

  const clearStatistics = useCallback(() => {
    setState(initialState);
    save(initialState);
  }, []);

  const value = useMemo(
    () => ({
      statistics: state.statistics,
      isEnabled: state.isEnabled,
      recalculateOnce,
      toggleStatistics,
      clearStatistics,
    }),
    [state.statistics, state.isEnabled, recalculateOnce, toggleStatistics, clearStatistics],
  );

  return <StatisticsContext.Provider value={value}>{children}</StatisticsContext.Provider>;
};

export { StatisticsContext };
