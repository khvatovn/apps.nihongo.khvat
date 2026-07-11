import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { useModal } from "@nihongo/core/shared/contexts/modal/modal-context";
import { ConfirmationModal } from "@nihongo/core/shared/contexts/modal/presets/confirmation";
import { useTranslation } from "react-i18next";

import { useEraseData } from "@/features/settings/lib/use-erase-data";
import { useLessonsContext } from "@/pages/education/learning/model/hooks";
import { useKanaContext } from "@/pages/kana/kana-table-choice-letters-page/model/hooks";
import { useStatisticsContext } from "@/pages/kana/kana-table-list-page/model/hooks";

const RemoveData: React.FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const { showModal, hideModal } = useModal();

  const eraseData = useEraseData();

  const { chapters, completedLessonsKeys: completedKeys, lang: lessonsLang } = useLessonsContext();
  const { selected: kanaSelected, selectedWords: kanaWords } = useKanaContext();
  const { statistics: statisticsState } = useStatisticsContext();

  const stateSize = new Blob([
    JSON.stringify({ kanaSelected, kanaWords }),
    JSON.stringify({ chapters, completedKeys, lessonsLang }),
    JSON.stringify(statisticsState),
  ]).size;

  const langSizes = {
    en: ["B", "KB", "MB", "GB"],
    ru: ["Б", "КБ", "МБ", "ГБ"],
    de: ["B", "KB", "MB", "GB"],
    es: ["B", "KB", "MB", "GB"],
    fr: ["o", "Ko", "Mo", "Go"],
    it: ["B", "KB", "MB", "GB"],
    pt: ["B", "KB", "MB", "GB"],
    ch: ["字节", "千字节", "兆字节", "吉字节"],
    ko: ["바이트", "킬로바이트", "메가바이트", "기가바이트"],
    id: ["B", "KB", "MB", "GB"],
  };

  function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0";

    const k = 1024;
    const sizes = langSizes[language as "en"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
  }

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
            eraseData();
            hideModal();
          }}
          onCancel={hideModal}
        />
      ),
    });

  const dataTakesUp = t("settings.eraseData.dataTakesUp") + ": " + formatBytes(stateSize);

  return (
    <SettingItem
      text={t("settings.eraseData.button")}
      subText={dataTakesUp}
      onClick={confirmationCloseAlert}
    />
  );
};

export default RemoveData;
