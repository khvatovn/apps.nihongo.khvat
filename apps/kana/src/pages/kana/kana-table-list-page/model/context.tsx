import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  ReactNode,
} from "react";

import { KANA_STATISTICS } from "@nihongo/core/shared/constants/storageKeys";
import { useRegisterEraseSource } from "@nihongo/core/shared/contexts/erase-data/erase-data-context";
import { getTokenUserId } from "@nihongo/core/shared/lib/auth/claims";
import { subscribeToAuthChange } from "@nihongo/core/shared/lib/auth/tokens";
import { getUserDataField, syncUserData } from "@nihongo/core/shared/lib/user-data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";

import { RawStatistics, StatisticChapter, StatisticChapterRaw, StatisticLevel } from "./types";

import { KanaAlphabet } from "@/shared/constants/kana";

const FIELD_NAME = "kana_statistics";
const MAX_VALUES = 10;
const SYNC_DELAY = 3_000;

interface StatisticsState {
  raw: RawStatistics;
  isEnabled: boolean;
  owner: string | null;
  synced: boolean;
}

export interface StatisticsContextType {
  statistics: { hiragana: StatisticChapter; katakana: StatisticChapter };
  isEnabled: boolean;
  recalculateOnce: (chapter: KanaAlphabet, id: string, isCorrect: boolean) => void;
  toggleStatistics: () => void;
}

const initialState: StatisticsState = { raw: {}, isEnabled: true, owner: null, synced: false };

const StatisticsContext = createContext<StatisticsContextType | null>(null);

const statKey = (chapter: KanaAlphabet, id: string) => `${id}/${chapter}`;

const calculateLevel = (correct: number, total: number): StatisticLevel => {
  const avg = (correct * 100) / total;
  if (avg >= 81) return StatisticLevel.Green;
  if (avg >= 51) return StatisticLevel.Yellow;
  return StatisticLevel.Red;
};

const toLevels = (raw: RawStatistics) => {
  const result = {
    hiragana: {} as StatisticChapter,
    katakana: {} as StatisticChapter,
  };

  for (const [key, entry] of Object.entries(raw)) {
    const separator = key.lastIndexOf("/");
    const id = key.slice(0, separator);
    const chapter = key.slice(separator + 1);

    if (chapter !== KanaAlphabet.Hiragana && chapter !== KanaAlphabet.Katakana) continue;
    if (entry.total <= 0) continue;

    result[chapter][id] = { level: calculateLevel(entry.correct, entry.total) };
  }

  return result;
};

const parseState = (stored: string): StatisticsState => {
  const parsed = JSON.parse(stored) as {
    raw?: RawStatistics;
    rawStatistics?: { hiragana?: StatisticChapterRaw; katakana?: StatisticChapterRaw };
    isEnabled?: boolean;
    owner?: string | null;
    synced?: boolean;
  };

  const isEnabled = parsed.isEnabled ?? true;

  if (parsed.raw) {
    return {
      raw: parsed.raw,
      isEnabled,
      owner: parsed.owner ?? null,
      synced: Boolean(parsed.synced),
    };
  }

  const raw: RawStatistics = {};

  for (const chapter of [KanaAlphabet.Hiragana, KanaAlphabet.Katakana]) {
    for (const [id, entry] of Object.entries(parsed.rawStatistics?.[chapter] ?? {})) {
      const history = entry?.values ?? [];
      if (!history.length) continue;

      raw[statKey(chapter, id)] = {
        values: history.slice(-MAX_VALUES),
        correct: history.filter((value) => value > 0).length,
        total: history.length,
      };
    }
  }

  return { raw, isEnabled, owner: null, synced: false };
};

const mergeAppend = (server: RawStatistics, local: RawStatistics): RawStatistics => {
  const result: RawStatistics = { ...server };

  for (const [key, entry] of Object.entries(local)) {
    const fromServer = server[key];
    const combined = [...(fromServer?.values ?? []), ...entry.values];

    result[key] = {
      values: combined.slice(-MAX_VALUES),
      correct: (fromServer?.correct ?? 0) + entry.correct,
      total: (fromServer?.total ?? 0) + entry.total,
    };
  }

  return result;
};

const mergeLongest = (server: RawStatistics, local: RawStatistics): RawStatistics => {
  const result: RawStatistics = { ...server };

  for (const [key, entry] of Object.entries(local)) {
    const fromServer = server[key];
    if (fromServer === undefined || entry.total >= fromServer.total) result[key] = entry;
  }

  return result;
};

const addDelta = (
  base: RawStatistics,
  before: RawStatistics,
  after: RawStatistics,
): RawStatistics => {
  const result: RawStatistics = { ...base };

  for (const [key, entry] of Object.entries(after)) {
    const previous = before[key];
    const deltaTotal = entry.total - (previous?.total ?? 0);
    if (deltaTotal <= 0) continue;

    const target = result[key];
    const appended = entry.values.slice(Math.max(0, entry.values.length - deltaTotal));

    result[key] = {
      values: [...(target?.values ?? []), ...appended].slice(-MAX_VALUES),
      correct: (target?.correct ?? 0) + (entry.correct - (previous?.correct ?? 0)),
      total: (target?.total ?? 0) + deltaTotal,
    };
  }

  return result;
};

const sameRaw = (a: RawStatistics, b: RawStatistics) => {
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;

  return keys.every((key) => {
    const left = a[key];
    const right = b[key];

    if (right === undefined) return false;
    if (left.correct !== right.correct || left.total !== right.total) return false;

    return (
      left.values.length === right.values.length &&
      left.values.every((value, index) => value === right.values[index])
    );
  });
};

export const StatisticsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<StatisticsState>(initialState);

  const stateRef = useRef(state);
  const restored = useRef(false);
  const syncing = useRef<Promise<void> | null>(null);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const epoch = useRef(0);

  const write = useCallback((next: StatisticsState) => {
    stateRef.current = next;
    setState(next);
    AsyncStorage.setItem(KANA_STATISTICS, JSON.stringify(next));
  }, []);

  const sync = useCallback(async (): Promise<void> => {
    if (!restored.current) return;
    if (syncing.current) return syncing.current;

    syncing.current = (async () => {
      try {
        const userId = await getTokenUserId();
        if (!userId) return;

        const current = stateRef.current;
        const startedAt = epoch.current;
        const isOurs = current.owner === null || current.owner === userId;
        const local = isOurs ? current : initialState;

        const server = (await getUserDataField<RawStatistics>(FIELD_NAME)) ?? {};
        const merged = local.synced
          ? mergeLongest(server, local.raw)
          : mergeAppend(server, local.raw);

        if (!sameRaw(merged, server)) {
          await syncUserData({ [FIELD_NAME]: merged });
        }

        if (epoch.current !== startedAt) return;

        const latest = isOurs ? stateRef.current : local;

        write({
          raw: addDelta(merged, local.raw, latest.raw),
          isEnabled: stateRef.current.isEnabled,
          owner: userId,
          synced: true,
        });
      } catch {
        console.log("error kana statistics sync");
      } finally {
        syncing.current = null;
      }
    })();

    return syncing.current;
  }, [write]);

  useEffect(() => {
    const restore = async () => {
      try {
        const stored = await AsyncStorage.getItem(KANA_STATISTICS);

        if (stored) {
          const next = parseState(stored);
          stateRef.current = next;
          setState(next);
        }
      } catch {
        console.log("error restore");
      }

      restored.current = true;
      void sync();
    };

    restore();
  }, [sync]);

  useEffect(() => subscribeToAuthChange(() => void sync()), [sync]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (next) => {
      if (next === "active") void sync();
    });

    return () => {
      subscription.remove();
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  }, [sync]);

  const recalculateOnce = useCallback(
    (chapter: KanaAlphabet, id: string, isCorrect: boolean) => {
      const current = stateRef.current;
      const key = statKey(chapter, id);
      const entry = current.raw[key];

      const next = {
        values: [...(entry?.values ?? []), isCorrect ? 100 : 0].slice(-MAX_VALUES),
        correct: (entry?.correct ?? 0) + (isCorrect ? 1 : 0),
        total: (entry?.total ?? 0) + 1,
      };

      write({ ...current, raw: { ...current.raw, [key]: next } });

      if (syncTimer.current) clearTimeout(syncTimer.current);
      syncTimer.current = setTimeout(() => {
        syncTimer.current = null;
        void sync();
      }, SYNC_DELAY);
    },
    [sync, write],
  );

  const toggleStatistics = useCallback(() => {
    const current = stateRef.current;
    write({ ...current, isEnabled: !current.isEnabled });
  }, [write]);

  const statistics = useMemo(() => toLevels(state.raw), [state.raw]);

  const dataSize = useMemo(() => new Blob([JSON.stringify(state.raw)]).size, [state.raw]);

  useRegisterEraseSource({
    clear: async () => {
      epoch.current += 1;
      stateRef.current = initialState;
      setState(initialState);
      await AsyncStorage.removeItem(KANA_STATISTICS);
    },
    getSize: () => dataSize,
  });

  const value = useMemo(
    () => ({
      statistics,
      isEnabled: state.isEnabled,
      recalculateOnce,
      toggleStatistics,
    }),
    [statistics, state.isEnabled, recalculateOnce, toggleStatistics],
  );

  return <StatisticsContext.Provider value={value}>{children}</StatisticsContext.Provider>;
};

export { StatisticsContext };
