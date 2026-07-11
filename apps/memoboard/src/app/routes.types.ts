import { Card } from "@/pages/board/api/get-cards";

export enum ROUTES {
  ROOT = "Root",
  HOME = "HOME",

  BOARDS = "BOARDS",
  BOARD = "BOARD",
  WORD = "WORD",
  SECTIONS = "SECTIONS",

  PROFILE_ROOT = "Profile",
  SETTINGS_ROOT = "Settings",

  SETTINGS_LANGUAGE = "SettingLanguage",
  SETTINGS_TRANSLITERATION = "SettingTransliterations",
  SETTINGS_THEME = "SettingTheme",

  // * Auth section
  WELCOME = "WelcomePage",
  AUTH_PREVIEW = "AUTH_PREVIEW",
  SIGN_UP_PAGE = "SIGN_UP_PAGE",
  SIGN_IN_PAGE = "SIGN_IN_PAGE",

  SUBMIT_CODE = "SUBMIT_CODE",
}

export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.ROOT]: undefined;

  [ROUTES.BOARDS]: undefined;
  [ROUTES.BOARD]: { id: string; name: string };
  [ROUTES.WORD]: { card: Card };

  [ROUTES.PROFILE_ROOT]: undefined;
  [ROUTES.SETTINGS_ROOT]: undefined;

  [ROUTES.SETTINGS_LANGUAGE]: undefined;
  [ROUTES.SETTINGS_TRANSLITERATION]: undefined;
  [ROUTES.SETTINGS_THEME]: undefined;

  // * Auth section
  [ROUTES.WELCOME]: undefined;
  [ROUTES.AUTH_PREVIEW]: undefined;
  [ROUTES.SIGN_UP_PAGE]: undefined;
  [ROUTES.SIGN_IN_PAGE]: undefined;

  [ROUTES.SUBMIT_CODE]: { email: string; region: string };
  [ROUTES.SECTIONS]: undefined;
};
