import { useContext } from "react";

import { KanaContext } from "./context";

export const useKanaContext = () => {
  const context = useContext(KanaContext);
  if (!context) throw new Error("useKanaContext must be used within KanaProvider");
  return context;
};
