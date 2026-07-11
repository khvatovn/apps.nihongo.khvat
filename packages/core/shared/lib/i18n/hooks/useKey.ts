
import { languageRomaji, lessonsLang, wordsLang } from "@nihongo/core/shared/constants/language";
import { useTransliterationsContext } from "@nihongo/core/shared/contexts/transliteration/transliteration";
import { ILetter } from "@nihongo/core/shared/data/lettersTable";
import { useTranslation } from "react-i18next";

const useGetRomaji = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const { transliterations } = useTransliterationsContext();

  const key = languageRomaji.includes(language as "en") ? language : "en";
  const wordKey = wordsLang.includes(language as "en") ? language : "en";
  const lessonsKey = lessonsLang.includes(language as "en") ? language : "en";

  return {
    getRomaji: (letter: ILetter) => {
      return letter?.transliterations?.[transliterations];
    },
    key: key as "en",
    wordKey: wordKey as "en",
    lessonsKey: lessonsKey as "en",
    transliterations,
  };
};

export default useGetRomaji;
