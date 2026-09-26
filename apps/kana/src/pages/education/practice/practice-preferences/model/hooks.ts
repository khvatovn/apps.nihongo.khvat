import { useContext } from "react";

import { PracticePreferencesContext } from "./context";

export const usePracticePreferences = () => {
  const context = useContext(PracticePreferencesContext);
  if (!context) {
    throw new Error("usePracticePreferences must be used within PracticePreferencesProvider");
  }
  return context;
};
