import React from "react";

import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { ILetter } from "@nihongo/core/shared/data/lettersTable";
import { StyleSheet, View } from "react-native";

import { kanaTemplates } from "../../lib/hieroglyph-recognition/templates";
import { DrawingPath } from "../../lib/svg-path";
import StrokesCanvas from "../drawing-preview/strokes-canvas";

import { KanaAlphabet } from "@/shared/constants/kana";
import { getImage } from "@/shared/resources/svgs";

const TEMPLATE_VIEW_BOX = 1;

const SVG_SIZE = 345;

interface DrawingReferenceProps {
  letter: ILetter;
  kana: KanaAlphabet;

  size?: number;

  additionalPadding: number;
}

const getTemplateStrokes = (letter: ILetter, kana: KanaAlphabet): DrawingPath[] | null => {
  const symbol = kana === KanaAlphabet.Hiragana ? letter.hi : letter.ka;

  const templates = (kana === KanaAlphabet.Hiragana
    ? kanaTemplates.hiragana
    : kanaTemplates.katakana) as unknown as Record<string, number[][][] | undefined>;

  const template = templates[symbol];
  if (!template) return null;

  return template.map((stroke) => stroke.map(([x, y]) => ({ x, y })));
};

const DrawingReference: React.FC<DrawingReferenceProps> = ({
  additionalPadding,
  letter,
  kana,
  size = 100,
}) => {
  const { colors } = useThemeContext();

  const strokes = getTemplateStrokes(letter, kana);

  if (strokes !== null) {
    return (
      <StrokesCanvas
        additionalPadding={additionalPadding}
        strokes={strokes}
        viewBoxSize={TEMPLATE_VIEW_BOX}
        size={size}
      />
    );
  }

  const image = getImage(`${kana}_${letter.id.replaceAll("-", "_")}`);

  return (
    <View
      style={[styles.container, { width: size, height: size, borderColor: colors.BorderDefault }]}
    >
      <View style={[styles.image, { transform: [{ scale: size / SVG_SIZE }] }]}>
        {image(colors.BgAccent, colors.BgContrast)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",

    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: SVG_SIZE,
    height: SVG_SIZE,
  },
});

export default DrawingReference;
