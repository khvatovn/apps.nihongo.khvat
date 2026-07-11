import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  FunctionComponent,
} from "react";

import { KANA_TRANSLITERATION } from "@nihongo/core/shared/constants/storageKeys";
import { transliterateByIndex } from "@nihongo/core/shared/helpers/wordsRomanji";
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum Transliterations {
  HEP = 0,
  KUN = 1,
  NIH = 2,
  POL = 3,
}

interface TransliterationsContextType {
  transliterations: Transliterations;
  updateTransliterations: (transliterations: Transliterations) => void;
  replaceTransliterations: (text: string, index?: number) => string;
}

const TransliterationsContext = createContext<TransliterationsContextType>({
  transliterations: Transliterations.HEP,
  updateTransliterations: () => {},
  replaceTransliterations: () => "",
});

interface TransliterationsProviderProps {
  children: ReactNode;
}

export const TransliterationsProvider: FunctionComponent<TransliterationsProviderProps> = ({
  children,
}) => {
  const [transliterations, setTransliterations] = useState<Transliterations>(Transliterations.HEP);

  useEffect(() => {
    const loadTransliterationsFromStorage = async () => {
      try {
        const storedTransliterations = await AsyncStorage.getItem(KANA_TRANSLITERATION);
        if (storedTransliterations) {
          setTransliterations(JSON.parse(storedTransliterations));
        }
      } catch (error) {
        return error;
      }
    };

    loadTransliterationsFromStorage();
  }, []);

  const updateTransliterations = (newTransliterations: Transliterations) => {
    AsyncStorage.setItem(KANA_TRANSLITERATION, JSON.stringify(newTransliterations));
    setTransliterations(newTransliterations);
  };

  function replaceTransliterations(text: string, index: number = 0): string {
    if (!text) return text;

    text = text.replace(/tr:([\u3040-\u309F\u30A0-\u30FF]+)/gi, (_, kana) =>
      transliterateByIndex(kana, index),
    );

    text = text.replace(/tr\(([^)]+)\)/gi, (_, kana) => transliterateByIndex(kana, index));

    return text;
  }

  return (
    <TransliterationsContext.Provider
      value={{
        updateTransliterations,
        transliterations,
        replaceTransliterations,
      }}
    >
      {children}
    </TransliterationsContext.Provider>
  );
};

export const useTransliterationsContext = () => {
  const context = useContext(TransliterationsContext);

  return context;
};
