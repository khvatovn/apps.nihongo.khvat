import React from "react";

import { View, StyleSheet } from "react-native";

interface ThemeIconProps {
  colors: string[];
}

const ThemeIcon: React.FC<ThemeIconProps> = (props) => {
  const styles = makeStyles();

  if (props.colors.length < 3) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.half}>
        <View
          style={[styles.quarter, { backgroundColor: props.colors[0], borderTopLeftRadius: 24 }]}
        />
        <View
          style={[styles.quarter, { backgroundColor: props.colors[1], borderTopRightRadius: 24 }]}
        />
      </View>
      <View
        style={[
          styles.half,
          {
            backgroundColor: props.colors[2],
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          },
        ]}
      />
    </View>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    container: {
      width: 48,
      height: 48,

      borderRadius: 48,
      flexDirection: "column",
      transform: [{ rotate: "315deg" }],
    },

    half: {
      height: "50%",
      flexDirection: "row",
    },

    quarter: {
      width: "50%",
    },
  });

export default ThemeIcon;
