import { TextStyle, StyleSheet } from "react-native";

import { isAndroid } from "../constants/platformUtil";

const regular = isAndroid ? "IBMPlexSans-Regular" : "SFProText-Regular";
const medium = isAndroid ? "IBMPlexSans-Medium" : "SFProDisplay-Semibold";

export const fonts = {
  regular: { fontFamily: regular, fontWeight: "400" },
  medium: { fontFamily: regular, fontWeight: "500" },
  bold: { fontFamily: medium, fontWeight: "600" },
  heavy: { fontFamily: medium, fontWeight: "600" },
} as const;

const gts = (
  fontFamily: string,
  fontSize: number,
  lineHeight: number,
  fontWeight: TextStyle["fontWeight"],
): TextStyle => {
  const style: TextStyle = { fontFamily, fontSize, lineHeight, fontWeight };
  return style;
};

export const Typography = StyleSheet.create({
  regularDefault: gts(regular, 17, 24, "400"),
  regularLabel: gts(regular, 15, 20, "400"),
  regularCaption: gts(regular, 13, 16, "400"),

  boldDefault: gts(medium, 17, 24, "600"),
  boldLabel: gts(medium, 15, 20, "600"),

  boldH1: gts(medium, 96, 104, "600"),
  boldH2: gts(medium, 28, 32, "600"),
  boldH3: gts(medium, 22, 28, "600"),
});
