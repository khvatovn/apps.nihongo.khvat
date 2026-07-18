import React from "react";

import SettingItem from "@nihongo/core/entities/setting/setting-item/setting-item";
import { useModal } from "@nihongo/core/shared/contexts/modal/modal-context";
import { AlertModal } from "@nihongo/core/shared/contexts/modal/presets/alert";
import { ConfirmationModal } from "@nihongo/core/shared/contexts/modal/presets/confirmation";
import { DeleteAccountModal } from "@nihongo/core/shared/contexts/modal/presets/delete-account";
import {
  clearTokens,
  deleteAccount,
  logout as revokeSession,
  requestAccountDeletion,
} from "@nihongo/core/shared/lib/auth";
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

  // * Удалили аккаунт: чистим токены и локальные данные, forceReset уводит на онбординг.
  const onDeleted = async () => {
    hideModal();
    await clearTokens();
    eraseData();
  };

  const showDeleteCodeModal = () =>
    showModal({
      closeOnBackdrop: false,
      onClose: () => {},
      content: (
        <DeleteAccountModal
          onConfirm={(code) => deleteAccount(code)}
          onResend={requestAccountDeletion}
          onSuccess={onDeleted}
          onCancel={hideModal}
        />
      ),
    });

  const showError = (subtitle: string) =>
    showModal({
      closeOnBackdrop: false,
      onClose: () => {},
      content: (
        <AlertModal
          title={t("settings.deleteAccount.button")}
          subtitle={subtitle}
          onPress={hideModal}
        />
      ),
    });

  // * Шаг 1: запрашиваем код и открываем модалку ввода. resend_cooldown = код уже отправлен,
  // * тоже открываем модалку; account_migrating и прочее — показываем ошибку.
  const confirmDelete = async () => {
    try {
      const { ok, error } = await requestAccountDeletion();

      if (ok || error === "resend_cooldown") {
        showDeleteCodeModal();
        return;
      }

      if (error === "account_migrating") {
        showError(t("auth.errors.accountMigrating"));
        return;
      }

      showError(t("auth.errors.somethingWrong"));
    } catch {
      showError(t("auth.errors.requestFailed"));
    }
  };

  return (
    <>
      <SettingItem isDanger text={t("settings.deleteAccount.button")} onClick={confirmDelete} />
      <SettingItem isLast isDanger text={t("settings.logout.button")} onClick={confirmLogout} />
    </>
  );
};

export default AccountActions;
