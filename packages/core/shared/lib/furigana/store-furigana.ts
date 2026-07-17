import { removeFurigana } from "./remove-furigana";

export const StoreFurigana = () => {
  const furiganaMap = new Map();

  function storeFurigana(text: string) {
    const regex = /(\p{Script=Han}+)\((.*?)\)/gu;
    let match;
    while ((match = regex.exec(text)) !== null) {
      furiganaMap.set(match[1], match[2]);
    }
  }

  function applyFurigana(text: string) {
    let result = text;
    for (const [kanji, furigana] of furiganaMap) {
      if (text[text.indexOf(result) + 1] === "(") {
        // ? do nothing...
      } else {
        const regex = new RegExp(`(?<!<ruby>)${kanji}(?!<rt>)`, "g");

        result = result.replace(regex, `${kanji}(${furigana})`);
        furiganaMap.delete(kanji);
      }
    }
    return result;
  }

  function clearFurigana() {
    furiganaMap.clear();
  }

  return { furiganaMap, storeFurigana, applyFurigana, clearFurigana };
};

export const getWithFurigana = (
  title: string,
  furigana: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    furiganaMap: Map<any, any>;
    storeFurigana: (text: string) => void;
    applyFurigana: (text: string) => string;
    clearFurigana: () => void;
  },
) => {
  return (callback: (title: string) => string | null) => {
    furigana.storeFurigana(title);

    try {
      return furigana.applyFurigana(callback(removeFurigana(title)) || "");
    } finally {
      furigana.clearFurigana();
    }
  };
};
