import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import SettingsSection from "@nihongo/core/entities/setting/setting-section/settings-section";
import * as StoreReview from "expo-store-review";
import { useTranslation } from "react-i18next";
import { Linking, Platform } from "react-native";

interface StoreReviewLinkProps {
  iosId: string;
  packageName: string;
}

const StoreReviewLink: React.FC<StoreReviewLinkProps> = ({ iosId, packageName }) => {
  const { t } = useTranslation();

  const openStoreReview = async () => {
    let url: string | null | undefined;

    if (process.env.STORE === "RuStore") {
      url = `rustore://details?id=${packageName}`;
    } else if (process.env.STORE === "Huawei AppGallery") {
      url = `appmarket://details?id=${packageName}`;
    } else {
      url =
        (await StoreReview.storeUrl()) ??
        Platform.select({
          android: `market://details?id=${packageName}`,
          ios: `https://apps.apple.com/app/${iosId}?action=write-review`,
          default: `https://play.google.com/store/apps/details?id=${packageName}`,
        });
    }

    if (url) Linking.openURL(url);
  };

  return (
    <SettingsSection>
      <SettingItem
        isLast
        text={t("settings.rateApp.title")}
        subText={t("settings.rateApp.subtitle")}
        onClick={openStoreReview}
      />
    </SettingsSection>
  );
};

export default StoreReviewLink;
