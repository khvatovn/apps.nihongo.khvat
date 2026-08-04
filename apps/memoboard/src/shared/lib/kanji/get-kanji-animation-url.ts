const KANJI_ANIMATION_DIR = "kanji_old";

const getFileId = (kanji: string) => kanji.charCodeAt(0).toString(16).padStart(4, "0");

export const getKanjiAnimationUrl = (kanji: string) =>
  `${process.env.MEMOBOARD_API}/resources/${KANJI_ANIMATION_DIR}/${getFileId(kanji)}.gif`;
