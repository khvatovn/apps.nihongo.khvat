export enum ShortLanguage {
  EN = "en",
  RU = "ru",
  DE = "de",
  FR = "fr",
  IT = "it",
  ID = "id",
  ko = "ko",
  ZH_CN = "zh-CN",
  ZH_TW = "zh-TW",
  ZH_HK = "zh-HK",
  PT_BR = "pt-BR",
  PT_PT = "pt-PT",
  ES_ES = "es-ES",
  ES_MX = "es-MX",
}

export type LanguageKeys =
  | "en"
  | "ru"
  | "de"
  | "fr"
  | "it"
  | "id"
  | "ko"
  | "zh-CN"
  | "zh-TW"
  | "zh-HK"
  | "pt-BR"
  | "pt-PT"
  | "es-ES"
  | "es-MX";

export const LanguageName: Record<LanguageKeys, string> = {
  en: "English",
  ru: "Русский",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  ko: "한국어",
  id: "Bahasa Indonesia",
  "zh-CN": "中文（简体）",
  "zh-TW": "中文（繁體）",
  "zh-HK": "中文（香港）",
  "pt-BR": "Português (Brasil)",
  "pt-PT": "Português (Portugal)",
  "es-ES": "Español (España)",
  "es-MX": "Español (México)",
};

export const languageRomaji: LanguageKeys[] = ["en", "ru"];
export const wordsLang: LanguageKeys[] = ["en", "ru"];
export const lessonsLang: LanguageKeys[] = [
  "en",
  "ru",
  "de",
  "fr",
  "it",
  "id",
  "ko",
  "zh-CN",
  "zh-TW",
  "zh-HK",
  "pt-BR",
  "pt-PT",
  "es-ES",
  "es-MX",
];

export const languageList = [
  { title: LanguageName.en, key: ShortLanguage.EN },
  { title: LanguageName.ru, key: ShortLanguage.RU },
  { title: LanguageName.id, key: ShortLanguage.ID },
  { title: LanguageName.fr, key: ShortLanguage.FR },
  { title: LanguageName["es-ES"], key: ShortLanguage.ES_ES },
  { title: LanguageName["es-MX"], key: ShortLanguage.ES_MX },
  { title: LanguageName["pt-BR"], key: ShortLanguage.PT_BR },
  { title: LanguageName["pt-PT"], key: ShortLanguage.PT_PT },
  { title: LanguageName.de, key: ShortLanguage.DE },
  { title: LanguageName.it, key: ShortLanguage.IT },
  { title: LanguageName["ko"], key: ShortLanguage.ko },
  { title: LanguageName["zh-CN"], key: ShortLanguage.ZH_CN },
  { title: LanguageName["zh-TW"], key: ShortLanguage.ZH_TW },
  { title: LanguageName["zh-HK"], key: ShortLanguage.ZH_HK },
];
