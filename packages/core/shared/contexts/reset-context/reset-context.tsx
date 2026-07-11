import { createContext, useContext } from "react";

type ResetContextType = {
  forceReset: () => void;
};

export const ResetContext = createContext<ResetContextType>({
  forceReset: () => {},
});

export const useResetApp = () => useContext(ResetContext);
