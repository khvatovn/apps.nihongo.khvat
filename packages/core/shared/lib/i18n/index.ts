import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ChineseCN from "./languages/chinese/zh-CN";
import ChineseHK from "./languages/chinese/zh-HK";
import ChineseTW from "./languages/chinese/zh-TW";
import English from "./languages/english";
import French from "./languages/french";
import German from "./languages/german";
import Indonesian from "./languages/indonesian";
import Italian from "./languages/italian";
import Korean from "./languages/korean";
import PortugueseBR from "./languages/portuguese/pt-BR";
import PortuguesePT from "./languages/portuguese/pt-PT";
import Russian from "./languages/russian";
import SpanishES from "./languages/spanish/es-ES";
import SpanishMX from "./languages/spanish/es-MX";

type Language = typeof English;

const resources: { [key: string]: { translation: Language } } = {
  en: { translation: English },
  ru: { translation: Russian },
  de: { translation: German },
  fr: { translation: French },
  it: { translation: Italian },
  id: { translation: Indonesian },

  // Корейский
  ko: { translation: Korean },
  // Китай (упрощённый) 🇨🇳
  "zh-CN": { translation: ChineseCN },
  // Тайвань (традиционный) 🇹🇼
  "zh-TW": { translation: ChineseTW },
  // Гонконг (традиционный) 🇭🇰
  "zh-HK": { translation: ChineseHK },

  // Потугальский (Бразилия) 🇧🇷
  "pt-BR": { translation: PortugueseBR },
  // Потугальский (Португалия) 🇵🇹
  "pt-PT": { translation: PortuguesePT },

  // Испанский (Испания) 🇪🇸
  "es-ES": { translation: SpanishES },
  // Испанский (Мексика) 🇲🇽
  "es-MX": { translation: SpanishMX },
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
