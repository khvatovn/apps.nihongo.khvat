import { ILetter } from "@nihongo/core/shared/data/lettersTable";

import { Kana } from "@/shared/constants/kana";

export const DEMO_QUESTION: {
  question: ILetter;
  answers: ILetter[];
  questionKana: Kana;
  answersKana: Kana;
} = {
  question: {
    id: "a151eeeb-2537-463c-ae23-d484d1bcb835",
    ka: "ア",
    hi: "あ",
    transliterations: ["A", "A", "A", "А"],
  },
  answers: [
    {
      id: "a151eeeb-2537-463c-ae23-d484d1bcb835",
      ka: "ア",
      hi: "あ",
      transliterations: ["A", "A", "A", "А"],
    },
    {
      id: "11017078-148a-4a44-b3f7-21d1df02d981",
      ka: "イ",
      hi: "い",
      transliterations: ["I", "I", "I", "И"],
    },
    {
      id: "bcbd90e2-fabc-4dcc-8022-02e5b650c822",
      ka: "ウ",
      hi: "う",
      transliterations: ["U", "U", "U", "У"],
    },
    {
      id: "70680d73-c9f9-4b4e-aac4-c82caa49668c",
      ka: "エ",
      hi: "え",
      transliterations: ["E", "E", "E", "Э"],
    },
  ],
  questionKana: Kana.Hiragana,
  answersKana: Kana.Katakana,
};
