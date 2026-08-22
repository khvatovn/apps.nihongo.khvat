import { darkTheme } from "./dark";

type Colors = typeof darkTheme;

const jiraiKeiLight: Colors = {
  // Background
  BgPrimary: "#FFFFFF",
  BgSecondary: "#F6F1F3",
  BgDisabled: "#A6999E",
  BgWhite: "#FFFFFF",
  BgGray: "#857D80",
  BgLightGray: "#E0D6DA",
  BgDarkGray: "#433F41",
  BgContrast: "#262425",
  BgContrastSecondary: "#100F0F",
  BgContrastPressed: "#100F0F",
  BgAccent: "#75617D",
  BgAccentPressed: "#4E4153",
  BgSuccess: "#7FA99B",
  BgWarning: "#EECF7F",
  BgDanger: "#E3A2A2",

  // Border
  BorderDefault: "#E0D6DA",
  BorderContrast: "#433F41",

  // Text
  TextPrimary: "#262425",
  TextPrimaryPressed: "#100F0F",
  TextSecondary: "#857D80",
  TextSecondaryPressed: "#433F41",
  TextDisabled: "#A6999E",
  TextContrastPrimary: "#FFFFFF",
  TextContrastSecondary: "#FFFFFF",
  TextTabBar: "#75617D",
  TextSuccess: "#7FA99B",
  TextDanger: "#E3A2A2",

  // system
  primary: "#75617D", // BgAccent
  background: "#FFFFFF", // BgPrimary
  card: "#FFFFFF", // BgPrimary
  text: "#262425", // TextPrimary
  border: "#E0D6DA", // BorderDefault
  notification: "#262425", // BgContrast

  // transparent
  transparent: "transparent",

  _theme: "light",
};

export { jiraiKeiLight };
