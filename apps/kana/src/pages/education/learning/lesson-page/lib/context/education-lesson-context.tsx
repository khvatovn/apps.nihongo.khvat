/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import { InfoLessonScreen } from "@/shared/constants/lessons";

const FINISH_SCREEN: InfoLessonScreen = {
  id: "finish",
  screen_order: -1,
  title: "finish",
  blocks: [],
};

interface EducationLessonContextValue {
  init: (screens: InfoLessonScreen[]) => void;
  next: (hasError?: boolean) => void;
  retry: () => void;
  lessonScreens: InfoLessonScreen[];
  currentScreen: InfoLessonScreen | null;
  screen: number;
}

export const EducationLessonContext = createContext<EducationLessonContextValue>({
  init: () => {},
  next: () => {},
  retry: () => {},
  lessonScreens: [],
  currentScreen: null,
  screen: 0,
});

export const useEducationLessonContext = () => useContext(EducationLessonContext);

export const EducationPracticeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [screens, setScreens] = useState([] as InfoLessonScreen[]);
  const [screen, setScreen] = useState(0);

  const init = (infoScreens: InfoLessonScreen[]) => {
    setScreens([...infoScreens, FINISH_SCREEN]);
  };

  const next = (hasError?: boolean) => {
    if (hasError) {
      if ((screens[screen] as any).retry !== 2) {
        setScreens((prev) => [
          ...prev.slice(0, -1),
          {
            ...screens[screen],
            retry: (screens[screen] as any)?.retry ? (screens[screen] as any)?.retry + 1 : 1,
          },
          FINISH_SCREEN,
        ]);
      }
    }

    if (screen + 1 !== screens.length) {
      setScreen((prev) => prev + 1);
    }
  };

  const retry = () => {
    setScreen(0);
  };

  return (
    <EducationLessonContext.Provider
      value={{
        init,
        next,
        retry,
        lessonScreens: screens,
        screen,
        currentScreen: screens[screen],
      }}
    >
      {children}
    </EducationLessonContext.Provider>
  );
};
