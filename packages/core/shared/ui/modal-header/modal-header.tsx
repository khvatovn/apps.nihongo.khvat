import React from "react";

import { View, StyleSheet, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useHaptic } from "../../contexts/haptic/haptic-context";
import { ColorsType, useThemeContext } from "../../contexts/theme/theme-context";
import { Typography } from "../../typography";

interface ModalHeaderProps {
  title: string;

  left?: {
    onPress: () => void;
    text: string;
    color?: string;
  };

  right?: {
    onPress: () => void;
    text: string;
    color?: string;
  };
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ left, title, right }) => {
  const insets = useSafeAreaInsets();

  const { triggerHaptic } = useHaptic();

  const { colors } = useThemeContext();
  const styles = makeStyles(colors);

  return (
    <View
      style={[
        styles.header,
        {
          paddingLeft: insets.left + 16,
          paddingRight: insets.right + 16,
        },
      ]}
    >
      <Pressable
        style={[styles.buttonContainerStyles, { justifyContent: "flex-start" }]}
        onPress={
          left?.onPress
            ? () => {
                triggerHaptic();
                left.onPress();
              }
            : () => {}
        }
      >
        {({ pressed }) => (
          <Text
            style={[
              styles.buttonTextStyles,
              {
                // ! make pressed
                textAlign: "left",
                color: left?.color
                  ? left?.color
                  : pressed
                    ? colors.TextSecondaryPressed
                    : colors.TextSecondary,
                ...Typography.regularDefault,
              },
            ]}
          >
            {left?.text ? left.text : ""}
          </Text>
        )}
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <Pressable
        style={[styles.buttonContainerStyles, { justifyContent: "flex-end" }]}
        onPress={right?.onPress ? right.onPress : () => {}}
      >
        <Text
          style={[
            styles.buttonTextStyles,
            {
              textAlign: "right",
              color: right?.color ? right?.color : colors.TextSecondary,
              ...Typography.regularDefault,
            },
          ]}
        >
          {right?.text ? right.text : ""}
        </Text>
      </Pressable>
    </View>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    header: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",

      height: 54,
    },
    title: {
      position: "absolute",
      width: "100%",
      textAlign: "center",
      ...Typography.boldDefault,
      color: colors.TextPrimary,

      left: 16,
    },
    buttonContainerStyles: {
      width: "40%",
      borderWidth: 0,
      backgroundColor: colors.transparent,
      flexDirection: "row",
      alignItems: "center",
      height: 50,
      zIndex: 9,
    },
    buttonTextStyles: {
      ...Typography.regularDefault,
      color: colors.TextSecondary,
    },
  });
