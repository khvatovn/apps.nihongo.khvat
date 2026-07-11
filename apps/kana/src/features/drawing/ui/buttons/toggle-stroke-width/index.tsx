import React from "react";

import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import PrimaryButton from "@nihongo/core/shared/ui/buttons/Primary/primary-button";
import {
  NumberCircleOneIcon,
  NumberCircleThreeIcon,
  NumberCircleTwoIcon,
} from "phosphor-react-native";

import { useDrawLineWidth } from "@/features/drawing/model/hooks";

const ToggleStrokeWidth: React.FC = () => {
  const { colors } = useThemeContext();

  const { lineWidth, setLineWidth } = useDrawLineWidth();

  const BIG_WIDTH = 14;
  const MIDDLE_WIDTH = 10;
  const SMALL_WIDTH = 6;

  const onClick = () => {
    if (lineWidth === BIG_WIDTH) {
      return setLineWidth(SMALL_WIDTH);
    }

    if (lineWidth === SMALL_WIDTH) {
      return setLineWidth(MIDDLE_WIDTH);
    }

    if (lineWidth === MIDDLE_WIDTH) {
      return setLineWidth(BIG_WIDTH);
    }
  };

  const getIcon = () => {
    if (lineWidth === BIG_WIDTH)
      return <NumberCircleThreeIcon size={20} color={colors.BgContrast} />;
    if (lineWidth === MIDDLE_WIDTH)
      return <NumberCircleTwoIcon size={20} color={colors.BgContrast} />;

    return <NumberCircleOneIcon size={20} color={colors.BgContrast} />;
  };

  return <PrimaryButton isHapticFeedback isIcon width={50} onClick={onClick} icon={getIcon()} />;
};

export default ToggleStrokeWidth;
