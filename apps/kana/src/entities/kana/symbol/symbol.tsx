import React from "react";

import { getCanvasSize } from "@nihongo/core/shared/constants/sizes";
import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { useWindowDimensions, View } from "react-native";

import { KanaAlphabet } from "@/shared/constants/kana";
import { getImage } from "@/shared/resources/svgs";

interface SymbolProps {
  id: string;
  kana: KanaAlphabet.Hiragana | KanaAlphabet.Katakana;
  width?: number;
  height?: number;

  isGray?: boolean;
}

const Symbol: React.FC<SymbolProps> = ({
  id,
  kana,

  isGray,
}) => {
  const { width, height } = useWindowDimensions();
  const { colors } = useThemeContext();

  const canvasSize = getCanvasSize(width, height);

  const getImagePath = (key: string | undefined) => {
    const keyString = `${kana}_${key?.replaceAll("-", "_")}`;

    return getImage(keyString);
  };

  const fillColor = isGray ? colors.BgLightGray : colors.BgAccent;
  const strokeColor = isGray ? colors.BgLightGray : colors.BgContrast;

  return (
    <View
      style={{
        height: canvasSize,
        width: canvasSize,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {getImagePath(id)(fillColor, strokeColor)}
    </View>
  );
};

export default Symbol;
