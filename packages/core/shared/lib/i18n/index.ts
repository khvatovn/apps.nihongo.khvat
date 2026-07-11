import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Chinese from "./languages/chinese/chinese";
import English from "./languages/english";
import French from "./languages/french";
import German from "./languages/german";
import Indonesian from "./languages/indonesian";
import Italian from "./languages/italian";
import Korean from "./languages/korean";
import Portuguese from "./languages/portuguese";
import Russian from "./languages/russian";
import Spanish from "./languages/spanish";

type Language = typeof English;

const resources: { [key: string]: { translation: Language } } = {
  en: { translation: English },
  ru: { translation: Russian },
  de: { translation: German },
  es: { translation: Spanish },
  fr: { translation: French },
  it: { translation: Italian },
  pt: { translation: Portuguese },
  ch: { translation: Chinese },
  ko: { translation: Korean },
  id: { translation: Indonesian },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
