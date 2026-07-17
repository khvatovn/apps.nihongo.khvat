export function removeFurigana(text: string) {
  return text.replace(/\([^)]+\)/g, '');
}
