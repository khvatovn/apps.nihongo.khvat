export function replaceKanjiWithFurigana(text: string) {
  return text.replace(/([一-龯]+)\(([^)]+)\)/g, '$2');
}