import React from "react";

import { XIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useHaptic } from "../../../contexts/haptic/haptic-context";
import { useModal } from "../../../contexts/modal/modal-context";
import { ConfirmationModal } from "../../../contexts/modal/presets/confirmation";
import { ColorsType, useThemeContext } from "../../../contexts/theme/theme-context";
import { Typography } from "../../../typography/index";

interface ProgressBarProp {
  close?: () => void;
  requireConfirmation?: boolean;
  confirmationTitle?: string;
  confirmationSubtitle?: string;
  current: number;
  all: number;
  title?: string;
}

const LinearProgressBar: React.FC<ProgressBarProp> = ({
  close,
  requireConfirmation = true,
  confirmationTitle,
  confirmationSubtitle,
  current,
  all,
  title,
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();
  const { triggerHaptic } = useHaptic();
  const { showModal, hideModal } = useModal();

  const styles = makeStyles(colors);

  const localizedConfirmationTitle = confirmationTitle
    ? confirmationTitle
    : t("alert.exitConformation.title");
  const localizedConfirmationSubtitle = confirmationSubtitle
    ? confirmationSubtitle
    : t("alert.exitConformation.subtitle");

  const confirmationCloseAlert = () =>
    showModal({
      closeOnBackdrop: false,
      onClose: () => {},
      content: (
        <ConfirmationModal
          title={localizedConfirmationTitle}
          subtitle={localizedConfirmationSubtitle}
          cancelText={t("alert.cancel")}
          confirmText={t("alert.ok")}
          onConfirm={() => {
            hideModal();
            close?.();
          }}
          onCancel={hideModal}
        />
      ),
    });

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarLine}>
        {Array.from({ length: all }, (_, index) => index).map((item) => (
          <View
            style={[
              styles.progressBarLineActive,
              {
                width: `${100 / all}%`,
                backgroundColor: current > item ? colors.BgContrast : colors.BgSecondary,
              },
            ]}
            key={`progress-bar-item-${item}`}
          ></View>
        ))}
      </View>
      <View style={styles.progressBarBottom}>
        <TouchableOpacity
          style={styles.progressBarPressble}
          onPress={() => {
            triggerHaptic();

            if (requireConfirmation) {
              confirmationCloseAlert();
            } else {
              close?.();
            }
          }}
        >
          <XIcon size={20} color={colors.BgContrast} />
        </TouchableOpacity>
        <Text style={styles.progressBarText}>
          {title ? title : t("practice.question")} {current + 1} / {all}
        </Text>
      </View>
    </View>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    progressBarContainer: {
      paddingTop: 25,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    progressBarLine: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.BgLightGray,
    },
    progressBarLineActive: {
      height: 4,
    },
    progressBarBottom: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    progressBarClose: {
      zIndex: 999,
      justifyContent: "center",
      alignItems: "center",
    },
    progressBarText: {
      ...Typography.regularCaption,
      textAlign: "right",
      fontStyle: "normal",
      color: colors.TextSecondary,
    },
    progressBarPressble: {
      padding: 10,
      paddingLeft: 0,
    },
  });

export default LinearProgressBar;
