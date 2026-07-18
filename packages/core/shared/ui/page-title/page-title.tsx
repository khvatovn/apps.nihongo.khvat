import React from "react";

import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeContext } from "../../contexts/theme/theme-context";
import { Typography } from "../../typography/index";

interface PageTitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;

  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  isSaveArea?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({
  children,
  icon,
  leftIcon,
  style = {},
  containerStyle = {},
  isSaveArea,
}) => {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          backgroundColor: colors.transparent,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        ...(isSaveArea
          ? [
              {
                paddingLeft: insets.left + 16,
                paddingRight: insets.right + 16,
                paddingTop: insets.top,
              },
            ]
          : []),
        containerStyle,
      ]}
    >
      <View style={styles.line}>
        {leftIcon && leftIcon}

        <Text style={[styles.title, { color: colors.TextPrimary }, style]}>{children}</Text>
      </View>

      {icon && icon}
    </View>
  );
};

export default PageTitle;

const styles = StyleSheet.create({
  title: {
    ...Typography.boldH2,
    marginTop: 10,
    marginBottom: 16,
  },

  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
