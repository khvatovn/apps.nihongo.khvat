import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { useGatewayUrl } from "@nihongo/core/shared/lib/api-gateway";
import { useTranslation } from "react-i18next";

interface PrivacyPolicyProps {
  // ? for example nihon-go-kana
  app: string;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ app }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const url = useGatewayUrl(`/${language}/docs/${app}/privacy_policy`);

  return <SettingItem text={t("settings.privacyPolicy")} link={url} />;
};

export default PrivacyPolicy;
