import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { useGatewayUrl } from "@nihongo/core/shared/lib/api-gateway";
import { HeadsetIcon } from "phosphor-react-native";
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
  const { colors } = useThemeContext();

  return (
    <SettingItem
      leftIcon={<HeadsetIcon size={20} color={colors.BgContrast} />}
      text={t("settings.contactSupport")}
      link={url}
    />
  );
};

export default ContactSupport;
