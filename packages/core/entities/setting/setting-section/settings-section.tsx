import React, { ReactNode } from "react";

import { useWindowDimensions, View } from "react-native";

import { TABLET_WIDTH } from "../../../shared/constants/sizes";
import { useThemeContext } from "../../../shared/contexts/theme/theme-context";

interface SettingSectionProps {
  children: ReactNode;
}

const SettingsSection: React.FC<SettingSectionProps> = ({ children }) => {
  const { colors } = useThemeContext();
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        width: "100%",

        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",

          maxWidth: width > TABLET_WIDTH ? TABLET_WIDTH : width - 32,

          backgroundColor: colors.BgSecondary,
          borderRadius: 12,

          paddingLeft: 16,

          marginHorizontal: 16,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default SettingsSection;
