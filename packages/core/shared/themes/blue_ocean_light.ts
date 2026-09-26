import { darkTheme } from "./dark";

type Colors = typeof darkTheme;

const blueOceanLightTheme: Colors = {
  // Background
  BgPrimary: "#FFFFFF",
  BgSecondary: "#F2F5F8",
  BgDisabled: "#9DA7B2",
  BgWhite: "#FFFFFF",
  BgGray: "#5B6877",
  BgLightGray: "#D6DFE9",
  BgDarkGray: "#222C37",
  BgContrast: "#101822",
  BgContrastSecondary: "#04080C",
  BgContrastPressed: "#04080C",
  BgAccent: "#55BBEA",
  BgAccentPressed: "#007DBD",
  BgSuccess: "#6CE6B5",
  BgWarning: "#F8E275",
  BgDanger: "#E66C6E",
  BgModal: "#04080C80",

  // Border
  BorderDefault: "#D6DFE9",
  BorderContrast: "#222C37",

  // Text
  TextPrimary: "#101822",
  TextPrimaryPressed: "#04080C",
  TextSecondary: "#5B6877",
  TextSecondaryPressed: "#222C37",
  TextDisabled: "#9DA7B2",
  TextContrast: "#FFFFFF",
  TextWhite: "#FFFFFF",
  TextAccent: "#55BBEA",
  TextSuccess: "#6CE6B5",
  TextDanger: "#E66C6E",

  // system
  primary: "#55BBEA", // BgAccent
  background: "#FFFFFF", // BgPrimary
  card: "#FFFFFF", // BgPrimary
  text: "#101822", // TextPrimary
  border: "#D6DFE9", // BorderDefault
  notification: "#101822", // BgContrast

  // transparent
  transparent: "transparent",

  _theme: "light",
};

export { blueOceanLightTheme };
