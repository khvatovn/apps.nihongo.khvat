import React from "react";

import { useTransliterationsContext } from "@nihongo/core/shared/contexts/transliteration/transliteration";
import { ILetter } from "@nihongo/core/shared/data/lettersTable";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import Draw from "@/features/drawing/ui/draw/draw";
import { OnSubmit } from "@/pages/education/practice/education-practice/lib/types/questions";
import { Kana, KanaAlphabet } from "@/shared/constants/kana";
import { getTypeById } from "@/shared/helpers/kana-letter";
import Header from "@/shared/ui/practice-header/practice-header";

interface PracticeDrawKanaProps {
  symbol: ILetter;
  kana: Kana;
  onCompleted: OnSubmit;
}

const PracticeDrawKana: React.FC<PracticeDrawKanaProps> = ({ symbol, kana, onCompleted }) => {
  const { t } = useTranslation();

  const { transliterations } = useTransliterationsContext();

  return (
    <View style={styles.screen}>
      <Header
        title={symbol?.transliterations?.[transliterations]}
        subtitle={`${kana === Kana.Hiragana ? t("kana.hiragana") : t("kana.katakana")} (${t(getTypeById(symbol.id))})`}
      />
      <View style={styles.container}>
        <Draw
          onCompleted={(isErrors) => onCompleted({ isCorrectAnswer: isErrors })}
          isCheck
          letter={symbol}
          kana={kana === Kana.Hiragana ? KanaAlphabet.Hiragana : KanaAlphabet.Katakana}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    gap: 16,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
});

export default PracticeDrawKana;
