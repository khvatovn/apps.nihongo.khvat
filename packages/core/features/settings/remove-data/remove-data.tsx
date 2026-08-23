import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { useEraseData } from "@nihongo/core/features/settings/lib/use-erase-data";
import { useEraseDataContext } from "@nihongo/core/shared/contexts/erase-data/erase-data-context";
import { useModal } from "@nihongo/core/shared/contexts/modal/modal-context";
import { ConfirmationModal } from "@nihongo/core/shared/contexts/modal/presets/confirmation";
import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { TrashIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";

const langSizes: Record<string, string[]> = {
  en: ["B", "KB", "MB", "GB"],
  ru: ["Б", "КБ", "МБ", "ГБ"],
  de: ["B", "KB", "MB", "GB"],
  es: ["B", "KB", "MB", "GB"],
  fr: ["o", "Ko", "Mo", "Go"],
  it: ["B", "KB", "MB", "GB"],
  pt: ["B", "KB", "MB", "GB"],
  zh: ["字节", "千字节", "兆字节", "吉字节"],
  ko: ["바이트", "킬로바이트", "메가바이트", "기가바이트"],
  id: ["B", "KB", "MB", "GB"],
};

const formatBytes = (bytes: number, language: string, decimals = 2): string => {
  if (bytes === 0) return "0";

  const k = 1024;
  const sizes = langSizes[language.split("-")[0]] ?? langSizes.en;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
};

const RemoveData: React.FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const { colors } = useThemeContext();

  const { showModal, hideModal } = useModal();

  const eraseData = useEraseData();

  // * размер считают сами модули через getSize своего EraseSource
  const { getSourcesSize } = useEraseDataContext();

  const confirmationCloseAlert = () =>
    showModal({
      closeOnBackdrop: false,
      onClose: () => {},
      content: (
        <ConfirmationModal
          title={t("settings.eraseData.title")}
          subtitle={t("settings.eraseData.subtitle")}
          cancelText={t("alert.cancel")}
          confirmText={t("alert.confirm")}
          onConfirm={() => {
            void eraseData();
            hideModal();
          }}
          onCancel={hideModal}
        />
      ),
    });

  const dataTakesUp =
    t("settings.eraseData.dataTakesUp") + ": " + formatBytes(getSourcesSize(), language);

  return (
    <SettingItem
      leftIcon={<TrashIcon size={20} color={colors.BgContrast} />}
      isLast
      text={t("settings.eraseData.button")}
      subText={dataTakesUp}
      onClick={confirmationCloseAlert}
    />
  );
};

export default RemoveData;
