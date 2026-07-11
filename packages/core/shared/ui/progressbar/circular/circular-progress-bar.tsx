import React from "react";

import { View, Text } from "react-native";
import { Svg, Circle } from "react-native-svg";

import { useThemeContext } from "../../..//contexts/theme/theme-context";
import { Typography } from "../../../typography";

interface CircularProgressBarProps {
  progress: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress }) => {
  const radius = 75;
  const strokeWidthBg = 10;
  const strokeWidthProgress = 10;
  const diameter = radius * 2;
  const svgSize = diameter + strokeWidthBg * 2;
  const center = svgSize / 2;

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const { colors } = useThemeContext();

  return (
    <View>
      <Svg width={svgSize} height={svgSize}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.BgLightGray}
          fill={colors.BgPrimary}
          strokeWidth={strokeWidthBg}
          origin={`${center}, ${center}`}
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={progress < 51 ? colors.BgDanger : colors.BgSuccess}
          strokeWidth={strokeWidthProgress}
          fill={colors.transparent}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${center}, ${center}`}
        />
        <View
          style={{
            position: "absolute",
            top: center - 16,
            width: svgSize,
          }}
        >
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              color: colors.TextPrimary,
              ...Typography.boldH2,
            }}
          >
            {`${Math.round(progress)}%`}
          </Text>
        </View>
      </Svg>
    </View>
  );
};

export default CircularProgressBar;
