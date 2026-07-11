import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  FunctionComponent,
  useState,
} from "react";

import { APP_THEME } from "@nihongo/core/shared/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeName, useColorScheme } from "react-native";

import { Theme } from "../../constants/theme";
import { darkTheme } from "../../themes/dark";
import { hokkaidoDarkTheme } from "../../themes/hokkaido_dark";
import { hokkaidoLightTheme } from "../../themes/hokkaido_light";
import { lightTheme } from "../../themes/light";
import { osakaDarkTheme } from "../../themes/osaka_dark";
import { osakaLightTheme } from "../../themes/osaka_light";
import { sakuraLightTheme } from "../../themes/sakura_light";

type Colors = typeof darkTheme;

const colors = {
  dark: darkTheme,
  light: lightTheme,
  hokkaidoLight: hokkaidoLightTheme,
  hokkaidoDark: hokkaidoDarkTheme,
  osakaDark: osakaDarkTheme,
  osakaLight: osakaLightTheme,
  sakuraLight: sakuraLightTheme,
};

interface ThemeContextType {
  colors: Colors;
  themeString: string;
  updateTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: colors.light,
  themeString: "light",
  updateTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export type ColorsType = typeof darkTheme;

const getColors = (currentTheme: Theme, theme: ColorSchemeName) => {
  if (currentTheme === Theme.Auto) {
    if (theme === "dark") return colors.dark;
    if (theme === "light") return colors.light;
  }

  if (currentTheme === Theme.Dark) return colors.dark;
  if (currentTheme === Theme.Light) return colors.light;
  if (currentTheme === Theme.HokkaidoDark) return colors.hokkaidoDark;
  if (currentTheme === Theme.HokkaidoLight) return colors.hokkaidoLight;
  if (currentTheme === Theme.OsakaDark) return colors.osakaDark;
  if (currentTheme === Theme.OsakaLight) return colors.osakaLight;
  if (currentTheme === Theme.SakuraLight) return colors.sakuraLight;

  return colors.light;
};

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(Theme.Auto);

  const deviceTheme = useColorScheme();

  useEffect(() => {
    const loadThemeFromStorage = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(APP_THEME);
        if (storedTheme) {
          const parsedTheme = JSON.parse(storedTheme) as Theme;
          updateTheme(parsedTheme);
        } else {
          updateTheme(Theme.Auto);
        }
      } catch (error) {
        console.error("Failed to load theme from storage:", error);
      }
    };

    loadThemeFromStorage();
  }, []);

  const updateTheme = (newTheme: Theme) => {
    setCurrentTheme(newTheme);
    AsyncStorage.setItem(APP_THEME, JSON.stringify(newTheme));
  };

  const colors = getColors(currentTheme, deviceTheme);

  const themeString = currentTheme;

  return (
    <ThemeContext.Provider value={{ updateTheme, colors, themeString }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
