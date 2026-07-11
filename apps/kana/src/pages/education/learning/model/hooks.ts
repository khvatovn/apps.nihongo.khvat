import { useContext } from "react";

import { LessonsContext } from "./context";

export const useLessonsContext = () => {
  const context = useContext(LessonsContext);
  if (!context) throw new Error("useLessonsContext must be used within LessonsProvider");
  return context;
};

export const useCompletedLessons = () => {
  const { completedLessonsKeys } = useLessonsContext();
  return completedLessonsKeys;
};
