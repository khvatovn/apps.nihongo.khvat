import React from "react";

import { ColorsType } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import { Text, Pressable, View } from "react-native";

interface DefaultCellProps {
  colors: ColorsType;

  isLong?: boolean;

  isTablet: boolean;
  screenWidth: number;
  screenHeight: number;

  active: boolean;

  id: string;
  title: string;
  subtitle: string;

  onPress: (id: string) => void;
}

export const DefaultCell: React.FC<DefaultCellProps> = ({
  colors,
  onPress,
  active,
  id,
  title,
  subtitle,
  isTablet,
  screenWidth,
  screenHeight,
  isLong,
}) => {
  let tabletCellSize = isTablet ? screenHeight / 6 - 50 : screenWidth / 6 - 14;

  if (tabletCellSize > 85) {
    tabletCellSize = 85;
  }

  const widthLong = tabletCellSize * 1.6666;

  if (title === "") {
    return (
      <View
        style={{
          width: tabletCellSize,
          height: tabletCellSize,
        }}
      />
    );
  }

  return (
    <Pressable
      onPress={() => onPress?.(id)}
      style={({ pressed }) => [
        {
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          width: isLong ? widthLong : tabletCellSize,
          height: tabletCellSize,
          backgroundColor: !active
            ? pressed
              ? colors.BgLightGray
              : colors.BgSecondary
            : pressed
              ? colors.BgAccentPressed
              : colors.BgAccent,
        },
      ]}
    >
      <Text
        style={[
          Typography.regularDefault,
          { color: active ? colors.TextContrastSecondary : colors.TextPrimary },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          Typography.regularLabel,
          { color: active ? colors.TextContrastSecondary : colors.TextPrimary },
        ]}
      >
        {subtitle}
      </Text>
    </Pressable>
  );
};
