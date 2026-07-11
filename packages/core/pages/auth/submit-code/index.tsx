import React, { useEffect, useState } from "react";

import { resendVerification, verifyEmail } from "@nihongo/core/features/auth/api";
import { completeAuth } from "@nihongo/core/features/auth/lib/completeAuth";
import { AUTH_ROUTES, AuthParamList } from "@nihongo/core/features/auth/routes";
import { useResetApp } from "@nihongo/core/shared/contexts/reset-context/reset-context";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import PrimaryButton from "@nihongo/core/shared/ui/buttons/Primary/primary-button";
import SecondaryButton from "@nihongo/core/shared/ui/buttons/Secondary/secondary-button";
import Input from "@nihongo/core/shared/ui/input";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CaretLeftIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

const RESEND_COOLDOWN_SEC = 45;

const maskEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  return `****${local.slice(-2)}@${domain}`;
};

const mapCodeError = (code?: string): string => {
  switch (code) {
    case "invalid_code":
      return "invalidCode";
    case "code_expired":
      return "codeExpired";
    case "too_many_attempts":
      return "tooManyAttempts";
    case "resend_cooldown":
      return "resendCooldown";
    default:
      return "somethingWrong";
  }
};

type SubmitCodeNavProp = StackNavigationProp<AuthParamList, typeof AUTH_ROUTES.SUBMIT_CODE>;
type SubmitCodeRouteProp = RouteProp<AuthParamList, typeof AUTH_ROUTES.SUBMIT_CODE>;

export const SubmitCode: React.FC = () => {
  const navigation = useNavigation<SubmitCodeNavProp>();
  const { params } = useRoute<SubmitCodeRouteProp>();
  const { email, region } = params;

  const { t } = useTranslation();

  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors, insets);

  const { forceReset } = useResetApp();

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SEC);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const goBack = () => navigation.goBack();

  const isCodeValid = /^\d{6}$/.test(code);

  const onChangeCode = (val: string) => {
    setCode(val);
    if (error) setError(undefined);
  };

  const verify = async () => {
    if (!isCodeValid) {
      setError("codeRequired");
      return;
    }

    setSubmitting(true);
    try {
      const { ok, body } = await verifyEmail(email, code, region);

      if (ok && body.access_token && body.refresh_token) {
        await completeAuth(body.access_token, body.refresh_token);
        forceReset(); // * exit the auth flow into the app
        return;
      }

      setError(mapCodeError(body.error));
    } catch {
      setError("requestFailed");
    } finally {
      setSubmitting(false);
    }
  };

  const resend = async () => {
    if (cooldown > 0 || resending) return;

    setResending(true);
    setError(undefined);
    try {
      const { ok, status, body } = await resendVerification(email, region);

      if (ok || status === 204) {
        setCooldown(RESEND_COOLDOWN_SEC);
        return;
      }

      setError(mapCodeError(body.error));
    } catch {
      setError("requestFailed");
    } finally {
      setResending(false);
    }
  };

  const resendLabel =
    cooldown > 0
      ? t("auth.verifyEmail.resendCooldown", { seconds: cooldown })
      : t("auth.verifyEmail.resend");

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
        <Text style={styles.title}>{t("auth.verifyEmail.title")}</Text>
      </View>

      <Text style={styles.subtitle}>
        {t("auth.verifyEmail.subtitle", { email: maskEmail(email) })}
      </Text>

      <View style={styles.inputs}>
        <Input
          placeholder={t("auth.fields.code")}
          onChange={onChangeCode}
          error={error ? t(`auth.errors.${error}`) : undefined}
        />
      </View>

      <PrimaryButton
        onClick={verify}
        isDisabled={!isCodeValid || submitting}
        containerStyles={styles.submitButton}
        text={t("auth.verifyEmail.submit")}
      />
      <SecondaryButton
        onClick={resend}
        isDisabled={cooldown > 0 || resending}
        containerStyles={[styles.submitButton, { marginTop: 8 }]}
        text={resendLabel}
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
