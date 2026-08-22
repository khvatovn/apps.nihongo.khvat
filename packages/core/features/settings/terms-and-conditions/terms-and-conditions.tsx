import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { useGatewayUrl } from "@nihongo/core/shared/lib/api-gateway";
import { FileDocIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";

interface TermsAndConditionsProps {
  // ? for example nihon-go-kana
  app: string;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ app }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const url = useGatewayUrl(`/${language}/docs/${app}/terms_conditions`);
  const { colors } = useThemeContext();

  return (
    <SettingItem
      leftIcon={<FileDocIcon size={20} color={colors.BgContrast} />}
      isLast
      text={t("settings.termsAndConditions")}
      link={url}
    />
  );
};

export default TermsAndConditions;
