import React from "react";

import { lettersTableBase, lettersTableById } from "@nihongo/core/shared/data/lettersTable";
import { View } from "react-native";

import SymbolHeader from "@/entities/kana/symbol-header/symbol-header";
import Draw from "@/features/drawing/ui/draw/draw";
import { KanaAlphabet } from "@/shared/constants/kana";

type borderLetterProps = {
  id: string;
  kana: KanaAlphabet;

  marginTop?: number;

  onComplete?: (hasError: boolean) => void;
};

const BorderLetterExercise: React.FC<borderLetterProps> = ({ id, kana, marginTop, onComplete }) => {
  return (
    <View>
      <SymbolHeader kana={kana} letter={lettersTableById[id]} />

      <View
        style={{
          borderRadius: 12,
          marginTop: marginTop !== undefined ? marginTop : 30,
        }}
      >
        <Draw
          isCheck
          onCompleted={(isError) => onComplete?.(isError)}
          letter={lettersTableBase[id]}
          kana={kana}
        />
      </View>
    </View>
  );
};

export default BorderLetterExercise;
