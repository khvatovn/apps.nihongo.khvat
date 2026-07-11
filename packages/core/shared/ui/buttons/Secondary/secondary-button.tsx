import React, { ReactNode } from "react";

import {
  Text,
  StyleSheet,
  Pressable,
  DimensionValue,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

import { useHaptic } from "../../../contexts/haptic/haptic-context";
import { useThemeContext } from "../../../contexts/theme/theme-context";
import { Typography } from "../../../typography";


interface SecondaryButtonProps {
  content?: ReactNode;

  text?: string;
  icon?: React.ReactElement;

  isDisabled?: boolean;
  isOutline?: boolean;

  width?: DimensionValue;
  isFullWidth?: boolean;

  isHapticFeedback?: boolean;

  containerStyles?: StyleProp<ViewStyle>;
  containerStylesFunc?: (option: { pressed: boolean }) => StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;

  children?: React.ReactElement;

  onClick?: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  content,

  text,
  icon,

  isDisabled,
  isOutline,

  width,
  isFullWidth,

  isHapticFeedback,

  containerStyles,
  containerStylesFunc,
  textStyles,

  children,

  onClick,
}) => {
  const { triggerHaptic } = useHaptic();
  const { colors } = useThemeContext();

  const onPress = () => {
    if (isDisabled) return;

    if (isHapticFeedback) {
      triggerHaptic();
    }

    onClick?.();
  };

  const getButtonStyles = (pressed: boolean): StyleProp<ViewStyle> => [
    isFullWidth ? { flex: 1 } : { width },

    {
      backgroundColor: colors.BgAccent,
    },

    pressed &&
      !isOutline && {
        backgroundColor: colors.BgAccentPressed,
      },

    isOutline && {
      backgroundColor: colors.BgSecondary,
    },

    isDisabled && {
      backgroundColor: colors.BgLightGray,
    },

    pressed &&
      isOutline &&
      !isDisabled && {
        backgroundColor: colors.BgLightGray,
      },

    icon && {
      flexDirection: "row",
      gap: 6,
      justifyContent: "center",
      alignItems: "center",
      height: 50,
    },

    styles.button,
    containerStyles && containerStyles,
    containerStylesFunc?.({ pressed }),
  ];

  const getTextStyles = () => [
    {
      color: colors.TextContrastSecondary,
    },
    isOutline && {
      color: colors.TextPrimary,
    },
    isDisabled && {
      color: colors.TextSecondary,
    },
    Typography.boldDefault,
    textStyles && textStyles,
  ];

  return (
    <Pressable onPress={onPress} style={({ pressed }) => getButtonStyles(pressed)}>
      {!content && text && <Text style={getTextStyles()}>{text}</Text>}

      {content && !text && content}
      {icon && icon}

      {children && children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,

    borderRadius: 12,
  },
});

export default SecondaryButton;
