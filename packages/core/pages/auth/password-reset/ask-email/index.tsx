import React, { useEffect, useMemo, useState } from "react";

import { requestPasswordReset } from "@nihongo/core/features/auth/api";
import { AUTH_ROUTES, AuthParamList } from "@nihongo/core/features/auth/routes";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import PrimaryButton from "@nihongo/core/shared/ui/buttons/Primary/primary-button";
import Input from "@nihongo/core/shared/ui/input";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CaretLeftIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "emailRequired")
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalidEmail");

const mapServerError = (code?: string): string => {
  switch (code) {
    case "invalid_email":
      return "invalidEmail";
    default:
      return "somethingWrong";
  }
};

type LoginNavigationProp = StackNavigationProp<
  AuthParamList,
  typeof AUTH_ROUTES.RESET_PASSWORD_ASK_EMAIL
>;

export const ResetPasswordAskEmailPage: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  const { t } = useTranslation();

  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors, insets);

  const [email, setEmail] = useState("");
  const [serverError, setServerError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validationError = useMemo(() => {
    const result = emailSchema.safeParse(email);
    return result.success ? undefined : result.error.issues[0]?.message;
  }, [email]);

  const isValid = validationError === undefined;

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    });
  }, [navigation]);

  const goBack = () => navigation.goBack();

  const onChangeEmail = (val: string) => {
    setEmail(val);
    if (serverError) setServerError(undefined);
  };

  const errorKey = submitted ? (validationError ?? serverError) : undefined;

  const next = async () => {
    setSubmitted(true);
    setServerError(undefined);

    if (!isValid) return;

    const trimmed = email.trim();

    setSubmitting(true);
    try {
      const { ok, body } = await requestPasswordReset(trimmed);

      if (ok && body.region) {
        navigation.navigate(AUTH_ROUTES.RESET_PASSWORD_SUBMIT_CODE, {
          email: trimmed,
          region: body.region,
        });
        return;
      }

      setServerError(mapServerError(body.error));
    } catch {
      setServerError("requestFailed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.page}>
      <Pressable
        onPress={goBack}
        style={{
          position: "absolute",
          left: insets.left + 16,
          top: insets.top + 16,
        }}
      >
        <CaretLeftIcon color={colors.BgContrast} size={32} />
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.title}>{t("auth.resetPassword.title")}</Text>
      </View>

      <Text style={styles.subtitle}>{t("auth.resetPassword.subtitle")}</Text>

      <View style={styles.inputs}>
        <Input
          placeholder={t("auth.fields.email")}
          onChange={onChangeEmail}
          error={errorKey ? t(`auth.errors.${errorKey}`) : undefined}
        />
      </View>

      <PrimaryButton
        onClick={next}
        isDisabled={(submitted && !isValid) || submitting}
        containerStyles={styles.submitButton}
        text={t("auth.verifyEmail.submit")}
      />
    </View>
  );
};

const makeStyles = (colors: ColorsType, insets: EdgeInsets) =>
  StyleSheet.create({
    page: {
      paddingTop: insets.top + 16,
      paddingBottom: insets.bottom + 16,
      paddingLeft: insets.left + 16,
      paddingRight: insets.right + 16,

      width: "100%",
      flex: 1,
      alignItems: "center",
    },

    header: {
      width: "100%",
    },

    title: {
      ...Typography.boldH2,

      color: colors.TextPrimary,

      marginTop: 80,

      maxWidth: 300,
    },

    subtitle: {
      marginTop: 16,

      ...Typography.regularDefault,

      color: colors.TextSecondary,
    },

    inputs: {
      marginTop: 32,

      width: "100%",
      gap: 8,
    },

    submitButton: {
      width: "100%",

      marginTop: 44,
    },
  });
