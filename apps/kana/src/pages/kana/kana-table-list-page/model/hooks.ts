import { useContext } from "react";

import { StatisticsContext } from "./context";

export const useStatisticsContext = () => {
  const context = useContext(StatisticsContext);
  if (!context) throw new Error("useStatisticsContext must be used within StatisticsProvider");
  return context;
};
