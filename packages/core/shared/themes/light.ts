import { darkTheme } from "./dark";

type Colors = typeof darkTheme;

const lightTheme: Colors = {
  // Background
  BgPrimary: "#FFFFFF",
  BgSecondary: "#F6F6F6",
  BgDisabled: "#BBBBBB",
  BgWhite: "#FFFFFF",
  BgGray: "#757575",
  BgLightGray: "#ECECEC",
  BgContrast: "#2A2A2A",
  BgContrastSecondary: "#1E1E1E",
  BgContrastPressed: "#1E1E1E",
  BgAccent: "#9A7861",
  BgAccentPressed: "#856753",
  BgSuccess: "#7ABC71",
  BgWarning: "#F6BF6C",
  BgDanger: "#F4817D",

  // Border
  BorderDefault: "#ECECEC",
  BorderContrast: "#363636",

  // Text
  TextPrimary: "#2A2A2A",
  TextPrimaryPressed: "#757575",
  TextSecondary: "#757575",
  TextSecondaryPressed: "#363636",
  TextDisabled: "#BBBBBB",
  TextContrastPrimary: "#FFFFFF",
  TextContrastSecondary: "#FFFFFF",
  TextTabBar: "#9A7861",
  TextSuccess: "#7ABC71",
  TextDanger: "#F4817D",

  // system
  primary: "#9A7861", // BgAccent
  background: "#FFFFFF", // BgPrimary
  card: "#FFFFFF", // BgPrimary
  text: "#2A2A2A", // TextPrimary
  border: "#E2E2E2", // BorderDefault
  notification: "#2A2A2A", // BgContrast

  // transparent
  transparent: "transparent",

  _theme: "light",
};

export { lightTheme };
