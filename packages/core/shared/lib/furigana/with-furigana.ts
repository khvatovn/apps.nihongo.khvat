export const withFurigana = (text: string) => {
  if (!text) return ''
  return text.replace(/(\p{Script=Han}+)\((.*?)\)/gu, '<ruby>$1<rt>$2</rt></ruby>')
}