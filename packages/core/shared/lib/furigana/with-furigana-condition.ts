import { removeFurigana } from "./remove-furigana";
import { withFurigana } from "./with-furigana";

export const withFuriganaCondition = (text: string, condition: boolean) =>  {
  if (condition) {
    return withFurigana(text);
  } else {
    return removeFurigana(text)
  }
}