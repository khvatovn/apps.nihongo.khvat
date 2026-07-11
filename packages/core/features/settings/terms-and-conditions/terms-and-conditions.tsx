import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { useGatewayUrl } from "@nihongo/core/shared/lib/api-gateway";
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

  return <SettingItem isLast text={t("settings.termsAndConditions")} link={url} />;
};

export default TermsAndConditions;
