import React from "react";

import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { ILetter } from "@nihongo/core/shared/data/lettersTable";
import { Typography } from "@nihongo/core/shared/typography";
import PrimaryButton from "@nihongo/core/shared/ui/buttons/Primary/primary-button";

interface AnswerCardProps {
  value: ILetter;
  children: string;

  questionId: string;

  width: number;

  redMarked: boolean;
  greenMarked: boolean;

  onClick?: (value: ILetter, questionId: string) => void;

  isDisable?: boolean;
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  value,
  width,
  redMarked,
  greenMarked,
  children,
  isDisable,
  questionId,
  onClick,
}) => {
  const { colors } = useThemeContext();

  const cardBackground = (pressed?: boolean) => {
    if (!isDisable && pressed) {
      return colors.BgLightGray;
    }

    if (redMarked) {
      return colors.BgDanger;
    }

    if (greenMarked) {
      return colors.BgSuccess;
    }

    return colors.BgSecondary;
  };

  const textColor = redMarked || greenMarked ? colors.TextContrastSecondary : colors.TextPrimary;

  return (
    <PrimaryButton
      onClick={() => onClick?.(value, questionId)}
      containerStylesFunc={({ pressed }) => ({
        width: width,
        height: width,
        backgroundColor: cardBackground(pressed),
        borderRadius: 24,
      })}
      isOutline
      text={children}
      textStyles={{
        ...Typography.boldH2,
        color: textColor,
      }}
    />
  );
};

export default AnswerCard;
