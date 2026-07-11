import { ILetter } from "@nihongo/core/shared/data/lettersTable";

import { KanaAlphabet } from "../constants/kana";

const getKana = (letter: ILetter, kana: KanaAlphabet) => {
  const key = kana === KanaAlphabet.Hiragana ? "hi" : "ka";

  return letter?.[key];
};

export default getKana;
