import React, { ReactNode } from "react";

import { ColorsType } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Pressable } from "react-native";

const CELL_GAP = 9;

interface PlusCellProps {
  onPress: () => void;
  colors: ColorsType;

  active: boolean;
  isStartOfLine?: string | null | undefined | false | ReactNode;

  isLong?: boolean;

  isTablet: boolean;
  screenWidth: number;
  screenHeight: number;
}

export const PlusCell: React.FC<PlusCellProps> = ({
  onPress,
  colors,

  isLong,

  isTablet,
  screenWidth,
  screenHeight,

  active,

  isStartOfLine,
}) => {
  let tabletCellSize = isTablet ? screenHeight / 6 - 50 : screenWidth / 6 - 14;

  if (tabletCellSize > 85) {
    tabletCellSize = 85;
  }

  const widthLong = (tabletCellSize * 5 + CELL_GAP * 2) / 3;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 12,
          position: "relative",
          width: isLong ? widthLong : tabletCellSize,
          height: tabletCellSize,
          backgroundColor: pressed ? colors.BgLightGray : colors.BgSecondary,
          borderColor: active ? colors.transparent : colors.BorderDefault,
        },
      ]}
    >
      {isStartOfLine}
    </Pressable>
  );
};
