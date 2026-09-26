import React, { useCallback } from "react";

import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, StyleSheet, View } from "react-native";

import { useThemeContext } from "../../contexts/theme/theme-context";

interface ModelContainerProps {
  children: React.ReactNode;
}

export const ModelContainer: React.FC<ModelContainerProps> = ({ children }) => {
  const { colors } = useThemeContext();

  const isDark = colors._theme === "dark";

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");

      return () => {
        StatusBar.setBarStyle(isDark ? "light-content" : "dark-content");
      };
    }, [isDark]),
  );

  // * flex: 1 обязателен — без него высота контейнера равна контенту, и вложенные
  // * FlatList/ScrollView не получают границы, по которой могли бы скроллиться
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
