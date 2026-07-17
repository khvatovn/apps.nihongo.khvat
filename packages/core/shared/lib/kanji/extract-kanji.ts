export const extractKanji = (text: string) => {
  return Array.from(text).filter(char => /[\u4E00-\u9FFF]/.test(char));
} 
