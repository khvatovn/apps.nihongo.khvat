import { InfoLessonScreen } from "@/shared/constants/lessons";

export interface InitialState {
  completedLessonsKeys: string[];
  lessons: Chapter[];
  lang: "ru" | "en";
  loading: boolean;
}

export interface Chapter {
  id: string;
  lessons: Lesson[];
  title: string;
  topic_order: number;
}

export interface Lesson {
  expanded_subtitle: string;
  expanded_title: string;
  icon: string;
  id: string;
  last_updated: string;
  lesson_key: string;
  lesson_order: number;
  minimum_version: string;
  subtitle: string;
  title: string;
  topic_id: string;
  screens: InfoLessonScreen[];
}
