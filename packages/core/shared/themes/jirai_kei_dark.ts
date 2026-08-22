import { darkTheme } from "./dark";

type Colors = typeof darkTheme;

const jiraiKeiDark: Colors = {
  // Background
  BgPrimary: "#100F0F",
  BgSecondary: "#262425",
  BgDisabled: "#857D80",
  BgWhite: "#FFFFFF",
  BgGray: "#A6999E",
  BgLightGray: "#433F41",
  BgDarkGray: "#E0D6DA",
  BgContrast: "#FFFFFF",
  BgContrastSecondary: "#F6F1F3",
  BgContrastPressed: "#E0D6DA",
  BgAccent: "#A38BAD",
  BgAccentPressed: "#4E4153",
  BgSuccess: "#83C5AF",
  BgWarning: "#F2C85A",
  BgDanger: "#F18686",

  // Border
  BorderDefault: "#433F41",
  BorderContrast: "#E0D6DA",

  // Text
  TextPrimary: "#FFFFFF",
  TextPrimaryPressed: "#E0D6DA",
  TextSecondary: "#A6999E",
  TextSecondaryPressed: "#857D80",
  TextDisabled: "#857D80",
  TextContrastPrimary: "#100F0F",
  TextContrastSecondary: "#FFFFFF",
  TextTabBar: "#A38BAD",
  TextSuccess: "#83C5AF",
  TextDanger: "#F18686",

  // system
  primary: "#A38BAD", // BgAccent
  background: "#100F0F", // BgPrimary
  card: "#100F0F", // BgPrimary
  text: "#FFFFFF", // TextPrimary
  border: "#433F41", // BorderDefault
  notification: "#FFFFFF", // BgContrast

  // transparent
  transparent: "transparent",

  _theme: "dark",
};

export { jiraiKeiDark };
