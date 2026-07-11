import { useContext } from "react";

import { DrawContext } from "./context";

export const useDrawSettings = () => {
  const context = useContext(DrawContext);
  if (!context) {
    throw new Error("useDrawSettings must be used within DrawProvider");
  }
  return context;
};

export const useDrawLineWidth = () => {
  const { settings, setLineWidth } = useDrawSettings();
  return { lineWidth: settings.lineWidth, setLineWidth };
};

export const useDrawBorder = () => {
  const { settings, toggleBorder } = useDrawSettings();
  return { isShowBorder: settings.isShowBorder, toggleBorder };
};

export const useDrawLetter = () => {
  const { settings, toggleLetter } = useDrawSettings();
  return { isShowLetter: settings.isShowLetter, toggleLetter };
};
