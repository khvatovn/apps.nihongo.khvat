import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { useGatewayUrl } from "@nihongo/core/shared/lib/api-gateway";
import { useTranslation } from "react-i18next";

interface ContactSupportProps {
  // ? for example nihon-go-kana
  app: string;
}

const ContactSupport: React.FC<ContactSupportProps> = ({ app }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const url = useGatewayUrl(`/${language}/docs/${app}/contact_support`);

  return <SettingItem text={t("settings.contactSupport")} link={url} />;
};

export default ContactSupport;
