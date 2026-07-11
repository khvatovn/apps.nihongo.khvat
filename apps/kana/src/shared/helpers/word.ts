import { Word } from "@/shared/data/words";

export const findWordsFromArray = (words: Word[], characters: string[]): Word[] => {
  const allCharacters = [...characters, "っ", "ー", "ィ", "ェ", "ゥ", "ォ", "ァ", "ッ"];

  return words.filter((word) => {
    const changedWord = word.kana.split("");

    for (let i = 0; i < changedWord.length; i++) {
      if (changedWord[i + 1] && ["ャ", "ュ", "ョ", "ゃ", "ゅ", "ょ"].includes(changedWord[i + 1])) {
        changedWord[i] += changedWord[i + 1];
        changedWord.splice(i + 1, 1);
        i--;
      }
    }

    for (const char of changedWord) {
      if (!allCharacters.includes(char)) {
        return false;
      }
    }
    return true;
  });
};
