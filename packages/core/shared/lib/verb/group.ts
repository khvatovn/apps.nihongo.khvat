const keysWords = ["глагол", "verb"];

export enum VerbGroup {
  I = "I",
  II = "II",
  III = "III",
}

export const getVerbGroup = (tags: string[]) => {
  const lowerCaseTags = tags.join("").toLowerCase();

  for (let i = 0; i < keysWords.length; i++) {
    const keyWord = keysWords[i];

    if (lowerCaseTags.includes(keyWord) && lowerCaseTags.includes("i")) {
      if (tags.join(" ").toLowerCase().includes(` iii`)) return VerbGroup.III;
      if (tags.join(" ").toLowerCase().includes(` ii`)) return VerbGroup.II;
      if (tags.join(" ").toLowerCase().includes(` i`)) return VerbGroup.I;
    }
  }

  return null;
};
