import React from "react";

import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import SecondaryButton from "@nihongo/core/shared/ui/buttons/Secondary/secondary-button";
import { SelectionIcon, SelectionSlashIcon } from "phosphor-react-native";

import { useDrawBorder } from "@/features/drawing/model/hooks";

const ToggleShowBorders: React.FC = () => {
  const { isShowBorder, toggleBorder } = useDrawBorder();

  const { colors } = useThemeContext();

  return (
    <SecondaryButton
      isHapticFeedback
      icon={
        !isShowBorder ? (
          <SelectionSlashIcon size={20} color={isShowBorder ? colors.BgWhite : colors.BgContrast} />
        ) : (
          <SelectionIcon size={20} color={isShowBorder ? colors.BgWhite : colors.BgContrast} />
        )
      }
      isOutline={!isShowBorder}
      onClick={toggleBorder}
      width={50}
    />
  );
};

export default ToggleShowBorders;
