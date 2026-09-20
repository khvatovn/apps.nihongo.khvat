import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  ReactNode,
} from "react";

import { COMPLETED_LESSONS_KEYS, LESSONS_LIST } from "@nihongo/core/shared/constants/storageKeys";
import { useRegisterEraseSource } from "@nihongo/core/shared/contexts/erase-data/erase-data-context";
import { getTokenUserId } from "@nihongo/core/shared/lib/auth/claims";
import { subscribeToAuthChange } from "@nihongo/core/shared/lib/auth/tokens";
import { getUserDataField, syncUserData } from "@nihongo/core/shared/lib/user-data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";

import { getLessons } from "./api";
import { getDump } from "./dump";
import { Chapter, Lesson } from "./types";

const COMPLETED_FIELD_NAME = "completed_lessons";
const SYNC_DELAY = 3_000;

interface CompletedLessons {
  keys: string[];
  owner: string | null;
}

const parseCompleted = (raw: string): CompletedLessons => {
  const parsed = JSON.parse(raw) as string[] | Partial<CompletedLessons>;

  if (Array.isArray(parsed)) return { keys: parsed, owner: null };

  return { keys: parsed.keys ?? [], owner: parsed.owner ?? null };
};

export interface LessonsContextType {
  chapters: Chapter[];
  completedLessonsKeys: string[];
  lang: string;
  loading: boolean;
  loadLessons: (lang: string, signal?: AbortSignal) => Promise<void>;
  completeLesson: (lessonKey: string) => void;
}

const LessonsContext = createContext<LessonsContextType | null>(null);

function pickNewerLesson(a: Lesson, b: Lesson): Lesson {
  const dateA = new Date(a.last_updated).getTime() || 0;
  const dateB = new Date(b.last_updated).getTime() || 0;
  return dateA >= dateB ? a : b;
}

function mergeChapters(primary: Chapter[], ...others: (Chapter[] | null | undefined)[]): Chapter[] {
  const bestByKey = new Map<string, Lesson>();

  for (const chapters of [primary, ...others]) {
    if (!chapters) continue;
    for (const chapter of chapters) {
      for (const lesson of chapter.lessons) {
        const existing = bestByKey.get(lesson.lesson_key);
        bestByKey.set(lesson.lesson_key, existing ? pickNewerLesson(existing, lesson) : lesson);
      }
    }
  }

  return primary.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map((lesson) => bestByKey.get(lesson.lesson_key) ?? lesson),
  }));
}

export const LessonsProvider = ({ children }: { children: ReactNode }) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [completedLessonsKeys, setCompletedLessonsKeys] = useState<string[]>([]);
  const [lang, setLang] = useState<string>("en");
  const [loading, setLoading] = useState(false);

  const completedRef = useRef<string[]>([]);
  const ownerRef = useRef<string | null>(null);
  const syncing = useRef<Promise<void> | null>(null);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restored = useRef(false);
  const epoch = useRef(0);

  const writeCompleted = useCallback((keys: string[], owner: string | null) => {
    completedRef.current = keys;
    ownerRef.current = owner;
    setCompletedLessonsKeys(keys);
    AsyncStorage.setItem(COMPLETED_LESSONS_KEYS, JSON.stringify({ keys, owner }));
  }, []);

  const syncCompletedLessons = useCallback(async (): Promise<void> => {
    if (!restored.current) return;
    if (syncing.current) return syncing.current;

    syncing.current = (async () => {
      try {
        const userId = await getTokenUserId();
        if (!userId) return;

        const startedAt = epoch.current;
        const isOurs = ownerRef.current === null || ownerRef.current === userId;
        const local = isOurs ? completedRef.current : [];

        const server = (await getUserDataField<string[]>(COMPLETED_FIELD_NAME)) ?? [];
        const merged = [...new Set([...server, ...local])];

        if (merged.length !== server.length) {
          await syncUserData({ [COMPLETED_FIELD_NAME]: merged });
        }

        if (epoch.current !== startedAt) return;

        const latest = isOurs ? completedRef.current : [];

        writeCompleted([...new Set([...merged, ...latest])], userId);
      } catch {
        console.log("error completed lessons sync");
      } finally {
        syncing.current = null;
      }
    })();

    return syncing.current;
  }, [writeCompleted]);

  useEffect(() => {
    const restore = async () => {
      try {
        const [lessonsRaw, completedRaw] = await Promise.all([
          AsyncStorage.getItem(LESSONS_LIST),
          AsyncStorage.getItem(COMPLETED_LESSONS_KEYS),
        ]);

        if (lessonsRaw) {
          const obj = JSON.parse(lessonsRaw);
          setChapters(obj.lessons ?? []);
          setLang(obj.lang ?? "en");
        }

        if (completedRaw) {
          const { keys, owner } = parseCompleted(completedRaw);
          completedRef.current = keys;
          ownerRef.current = owner;
          setCompletedLessonsKeys(keys);
        }
      } catch {
        console.log("error restore");
      }

      restored.current = true;
      void syncCompletedLessons();
    };

    restore();
  }, [syncCompletedLessons]);

  useEffect(() => subscribeToAuthChange(() => void syncCompletedLessons()), [syncCompletedLessons]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") void syncCompletedLessons();
    });

    return () => {
      subscription.remove();
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  }, [syncCompletedLessons]);

  const loadLessons = useCallback(async (newLang: string, signal?: AbortSignal) => {
    setLoading(true);

    const lessonsRaw = await AsyncStorage.getItem(LESSONS_LIST).catch(() => null);
    const lessonsObj = lessonsRaw ? JSON.parse(lessonsRaw) : null;
    const cachedChapters: Chapter[] | null =
      lessonsObj?.lang === newLang ? lessonsObj.lessons : null;
    const dumpChapters = (getDump(newLang) as Chapter[]) ?? [];

    try {
      const { data: serverLessons, status } = await getLessons(newLang, signal);

      if (signal?.aborted) return;

      if (status === 200) {
        const merged = mergeChapters(serverLessons, cachedChapters, dumpChapters);
        setChapters(merged);
        setLang(newLang);
        AsyncStorage.setItem(LESSONS_LIST, JSON.stringify({ lang: newLang, lessons: merged }));
      } else if (cachedChapters) {
        setChapters(mergeChapters(cachedChapters, dumpChapters));
        setLang(newLang);
      } else {
        setChapters(dumpChapters);
        setLang(newLang);
      }
    } catch {
      if (signal?.aborted) return;

      if (cachedChapters) {
        setChapters(mergeChapters(cachedChapters, dumpChapters));
        setLang(newLang);
      } else {
        setChapters(dumpChapters);
        setLang(newLang);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  const completeLesson = useCallback(
    (lessonKey: string) => {
      if (completedRef.current.includes(lessonKey)) return;

      writeCompleted([...completedRef.current, lessonKey], ownerRef.current);

      if (syncTimer.current) clearTimeout(syncTimer.current);
      syncTimer.current = setTimeout(() => {
        syncTimer.current = null;
        void syncCompletedLessons();
      }, SYNC_DELAY);
    },
    [syncCompletedLessons, writeCompleted],
  );

  const dataSize = useMemo(
    () => new Blob([JSON.stringify({ chapters, completedLessonsKeys, lang })]).size,
    [chapters, completedLessonsKeys, lang],
  );

  useRegisterEraseSource({
    clear: async () => {
      epoch.current += 1;
      setChapters([]);
      completedRef.current = [];
      ownerRef.current = null;
      setCompletedLessonsKeys([]);
      setLang("en");
      setLoading(false);
      await AsyncStorage.multiRemove([LESSONS_LIST, COMPLETED_LESSONS_KEYS]);
    },
    getSize: () => dataSize,
  });

  const value = useMemo(
    () => ({
      chapters,
      completedLessonsKeys,
      lang,
      loading,
      loadLessons,
      completeLesson,
    }),
    [chapters, completedLessonsKeys, lang, loading, loadLessons, completeLesson],
  );

  return <LessonsContext.Provider value={value}>{children}</LessonsContext.Provider>;
};

export { LessonsContext };
