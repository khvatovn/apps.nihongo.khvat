import { Word } from "@/shared/data/words";

export const getRandomWords = (excludedWords: string[], allWords: Word[]): Word => {
  const availableWords = allWords.filter((word) => !excludedWords.includes(word.kana));

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
};
