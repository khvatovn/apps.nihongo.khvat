import React from "react";

import type { StaticScreenProps } from "@react-navigation/native";

import { Lesson as LessonInterface } from "../model/types";

import { EducationPracticeContextProvider } from "./lib/context/education-lesson-context";
import Lesson from "./ui/lesson";

type LessonsPageProps = StaticScreenProps<{
  lesson: LessonInterface;
}>;

const LessonPage: React.FC<LessonsPageProps> = ({ route }) => {
  return (
    <EducationPracticeContextProvider>
      <Lesson lesson={route.params.lesson} />
    </EducationPracticeContextProvider>
  );
};

export default LessonPage;
