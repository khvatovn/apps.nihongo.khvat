import React from "react";

import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, View } from "react-native";

import { useThemeContext } from "../../contexts/theme/theme-context";

interface ModelContainerProps {
  children: React.ReactNode;
}

export const ModelContainer: React.FC<ModelContainerProps> = ({ children }) => {
  const { colors } = useThemeContext();

  useFocusEffect(() => {
    StatusBar.setBarStyle("light-content");

    return () => {
      const barStyle = colors._theme === "dark" ? "light-content" : "dark-content";
      StatusBar.setBarStyle(barStyle);
    };
  });

  return <View>{children}</View>;
};
