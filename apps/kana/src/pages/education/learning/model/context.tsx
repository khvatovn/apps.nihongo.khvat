import React, { createContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";

import { COMPLETED_LESSONS_KEYS, LESSONS_LIST } from "@nihongo/core/shared/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getLessons } from "./api";
import { getDump } from "./dump";
import { Chapter, Lesson } from "./types";

export interface LessonsContextType {
  chapters: Chapter[];
  completedLessonsKeys: string[];
  lang: string;
  loading: boolean;
  loadLessons: (lang: string, signal?: AbortSignal) => Promise<void>;
  completeLesson: (lessonKey: string) => void;
  clearLessons: () => void;
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
          setCompletedLessonsKeys(JSON.parse(completedRaw));
        }
      } catch {
        console.log("error restore");
      }
    };

    restore();
  }, []);

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

  const completeLesson = useCallback((lessonKey: string) => {
    setCompletedLessonsKeys((prev) => {
      if (prev.includes(lessonKey)) return prev;
      const next = [...prev, lessonKey];
      AsyncStorage.setItem(COMPLETED_LESSONS_KEYS, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearLessons = useCallback(() => {
    setChapters([]);
    setCompletedLessonsKeys([]);
    setLang("en");
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      chapters,
      completedLessonsKeys,
      lang,
      loading,
      loadLessons,
      completeLesson,
      clearLessons,
    }),
    [chapters, completedLessonsKeys, lang, loading, loadLessons, completeLesson, clearLessons],
  );

  return <LessonsContext.Provider value={value}>{children}</LessonsContext.Provider>;
};

export { LessonsContext };
