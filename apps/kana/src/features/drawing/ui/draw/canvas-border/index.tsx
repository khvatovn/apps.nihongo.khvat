import React from "react";

import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Line } from "react-native-svg";

interface CanvasBorderProps {
  canvasSize: number;
}

const CanvasBorder: React.FC<CanvasBorderProps> = ({ canvasSize }) => {
  const { colors } = useThemeContext();

  return (
    <>
      <Line
        stroke={colors.BorderDefault}
        strokeWidth={1}
        strokeDasharray="10, 10"
        x1={canvasSize / 2}
        x2={canvasSize / 2}
        y1="0"
        y2={canvasSize - 2}
      />
      <Line
        stroke={colors.BorderDefault}
        strokeWidth={1}
        strokeDasharray="10, 10"
        y1={canvasSize / 2}
        y2={canvasSize / 2}
        x1="0"
        x2={canvasSize - 2}
      />
    </>
  );
};

export default CanvasBorder;
