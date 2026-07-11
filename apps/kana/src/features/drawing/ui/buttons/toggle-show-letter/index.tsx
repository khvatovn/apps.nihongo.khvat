import React from "react";

import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import SecondaryButton from "@nihongo/core/shared/ui/buttons/Secondary/secondary-button";
import { EyeIcon, EyeSlashIcon } from "phosphor-react-native";

import { useDrawLetter } from "@/features/drawing/model/hooks";

const ToggleShowLetter: React.FC = () => {
  const { isShowLetter, toggleLetter } = useDrawLetter();

  const { colors } = useThemeContext();

  return (
    <SecondaryButton
      isHapticFeedback
      icon={
        isShowLetter ? (
          <EyeIcon size={20} color={isShowLetter ? colors.BgWhite : colors.BgContrast} />
        ) : (
          <EyeSlashIcon size={20} color={isShowLetter ? colors.BgWhite : colors.BgContrast} />
        )
      }
      isOutline={!isShowLetter}
      onClick={toggleLetter}
      width={50}
    />
  );
};

export default ToggleShowLetter;
