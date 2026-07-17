export enum KanaIndex {
  A = 0,
  I = 1,
  U = 2,
  E = 3,
  O = 4,
}

export const replaceKana = (verb: string, replace: KanaIndex, replaceValue: KanaIndex) => {
  const data = [
    // ! wa not a
    ["わ", "い", "う", "え", "お"],
    ["か", "き", "く", "け", "こ"],
    ["さ", "し", "す", "せ", "そ"],
    ["た", "ち", "つ", "て", "と"],
    ["ま", "に", "ぬ", "ね", "の"],
    ["は", "ひ", "ふ", "へ", "ほ"],
    ["ま", "み", "む", "め", "も"],
    ["ら", "り", "る", "れ", "ろ"],
    ["が", "ぎ", "ぐ", "げ", "ご"],
    ["ざ", "じ", "ず", "ぜ", "ぞ"],
    ["ば", "び", "ぶ", "べ", "ぼ"],
    ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
  ];

  const lastChar = verb.at(-1);

  for (let i = 0; i < data.length; i++) {
    const pair = data[i];

    if (lastChar === pair[replace]) {
      return verb.slice(0, -1) + pair[replaceValue];
    }
  }

  return null;
};
