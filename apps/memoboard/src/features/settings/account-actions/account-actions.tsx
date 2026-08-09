import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { useModal } from "@nihongo/core/shared/contexts/modal/modal-context";
import { ConfirmationModal } from "@nihongo/core/shared/contexts/modal/presets/confirmation";
import { logout as revokeSession } from "@nihongo/core/shared/lib/auth";
import { useTranslation } from "react-i18next";

import { useEraseData } from "@/features/settings/lib/use-erase-data";

const AccountActions: React.FC = () => {
  const { t } = useTranslation();

  const { showModal, hideModal } = useModal();
  const eraseData = useEraseData();

  const logout = async () => {
    await revokeSession();
    eraseData();
  };

  const confirmLogout = () =>
    showModal({
      closeOnBackdrop: false,
      onClose: () => {},
      content: (
        <ConfirmationModal
          title={t("settings.logout.title")}
          subtitle={t("settings.logout.subtitle")}
          cancelText={t("alert.cancel")}
          confirmText={t("alert.confirm")}
          onConfirm={() => {
            logout();
            hideModal();
          }}
          onCancel={hideModal}
        />
      ),
    });

  return <SettingItem isLast isDanger text={t("settings.logout.button")} onClick={confirmLogout} />;
};

export default AccountActions;
