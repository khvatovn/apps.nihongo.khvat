import React from "react";

import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import { CalendarIcon, ClockIcon } from "phosphor-react-native";
import { View, StyleSheet, Text } from "react-native";

interface StatWidgetProps {
  daysCount: number;
  practiceCount: number;
}

const StatWidget: React.FC<StatWidgetProps> = ({ daysCount, practiceCount }) => {
  const { colors } = useThemeContext();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View>
          <CalendarIcon weight="fill" size={32} color={colors.BgContrast} />
        </View>
        <View>
          <Text style={styles.title}>{daysCount}</Text>
          <Text style={styles.subtitle}>days of study</Text>
        </View>
      </View>
      <View style={styles.item}>
        <View>
          <ClockIcon weight="fill" size={32} color={colors.BgContrast} />
        </View>
        <View>
          <Text style={styles.title}>{practiceCount}</Text>
          <Text style={styles.subtitle}>раз практики</Text>
        </View>
      </View>
    </View>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 16,
    },
    item: {
      backgroundColor: colors.BgSecondary,
      flex: 1,
      borderRadius: 12,
      padding: 16,

      flexDirection: "row",

      gap: 8,
    },
    title: {
      color: colors.TextPrimary,

      ...Typography.boldH2,
    },
    subtitle: {
      color: colors.TextSecondary,

      ...Typography.regularLabel,
    },
  });

export default StatWidget;
