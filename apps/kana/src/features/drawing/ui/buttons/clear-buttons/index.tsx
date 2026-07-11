import React from "react";

import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import SecondaryButton from "@nihongo/core/shared/ui/buttons/Secondary/secondary-button";
import { ArrowBendUpLeftIcon, ArrowCounterClockwiseIcon } from "phosphor-react-native";
import { StyleSheet, View } from "react-native";

interface ClearButtonsProps {
  clearFull: () => void;
  clearStep: () => void;
}

const ClearButtons: React.FC<ClearButtonsProps> = ({ clearFull, clearStep }) => {
  const { colors } = useThemeContext();

  return (
    <View style={styles.buttonsContainer}>
      <View style={{ flex: 1 }}>
        <SecondaryButton
          isHapticFeedback
          icon={<ArrowBendUpLeftIcon size={20} color={colors.BgContrast} />}
          onClick={clearStep}
          isOutline
        />
      </View>
      <View style={{ flex: 1 }}>
        <SecondaryButton
          isHapticFeedback
          icon={<ArrowCounterClockwiseIcon size={20} color={colors.BgContrast} />}
          onClick={clearFull}
          isOutline
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 16,
    gap: 16,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

export default ClearButtons;
