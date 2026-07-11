export enum ShortLanguage {
  EN = "en",
  ES = "es",
  FR = "fr",
  DE = "de",
  RU = "ru",
  IT = "it",
  PT = "pt",
  CH = "ch",
  KO = "ko",
  ID = "id",
}

export type LanguageKeys = "en" | "es" | "fr" | "de" | "ru" | "it" | "pt" | "ch" | "ko" | "id";

export const LanguageName = {
  ch: "中文",
  en: "English",
  es: "Español",
  pt: "Português",
  ru: "Русский",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  ko: "한국어",
  id: "Indonesia",
};

export const languageRomaji: ("en" | "ru")[] = ["en", "ru"];
export const wordsLang: ("en" | "ru")[] = ["en", "ru"];
export const lessonsLang: ("en" | "ru" | "de" | "es" | "fr" | "it" | "pt" | "ch" | "ko" | "id")[] =
  ["en", "ru", "de", "es", "fr", "it", "pt", "ch", "ko", "id"];

export const languageList = [
  { title: LanguageName.en, key: ShortLanguage.EN },
  { title: LanguageName.ru, key: ShortLanguage.RU },
  { title: LanguageName.id, key: ShortLanguage.ID },
  { title: LanguageName.fr, key: ShortLanguage.FR },
  { title: LanguageName.es, key: ShortLanguage.ES },
  { title: LanguageName.pt, key: ShortLanguage.PT },
  { title: LanguageName.de, key: ShortLanguage.DE },
  { title: LanguageName.it, key: ShortLanguage.IT },
  { title: LanguageName.ko, key: ShortLanguage.KO },
  { title: LanguageName.ch, key: ShortLanguage.CH },
];
