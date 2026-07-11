import React, { useEffect, useMemo, useState } from "react";

import { signInWithEmail } from "@nihongo/core/features/auth/api";
import { completeAuth } from "@nihongo/core/features/auth/lib/completeAuth";
import { AUTH_ROUTES, AuthParamList } from "@nihongo/core/features/auth/routes";
import { useResetApp } from "@nihongo/core/shared/contexts/reset-context/reset-context";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { useGatewayUrl } from "@nihongo/core/shared/lib/api-gateway";
import { Typography } from "@nihongo/core/shared/typography";
import PrimaryButton from "@nihongo/core/shared/ui/buttons/Primary/primary-button";
import Input from "@nihongo/core/shared/ui/input";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CaretLeftIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Pressable, Text, Linking } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

// * Messages are i18n keys (auth.errors.*); translated in the component via t().
const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "emailRequired")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalidEmail"),
  password: z.string().min(1, "passwordRequired"),
});

const validateSignIn = (d: Record<string, string>): Record<string, string> => {
  const result = signInSchema.safeParse({
    email: d.email ?? "",
    password: d.password ?? "",
  });
  if (result.success) return {};

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
};

// * Backend error codes (docs/auth/auth_api.md) -> form fields.
const mapSignInError = (code?: string): Record<string, string> => {
  switch (code) {
    case "invalid_credentials":
      return { password: "invalidCredentials" };
    case "email_not_verified":
      return { email: "emailNotVerified" };
    case "use_google_to_sign_in":
      return { email: "useGoogleToSignIn" };
    default:
      return { email: "somethingWrong" };
  }
};

type LoginNavigationProp = StackNavigationProp<AuthParamList, typeof AUTH_ROUTES.SIGN_IN>;

export const SignInPage: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  const { t, i18n } = useTranslation();

  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors, insets);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    });
  }, [navigation]);

  const goBack = () => navigation.goBack();

  const privacyPolicyUrl = useGatewayUrl(
    `/${i18n.language}/docs/${process.env.DOCS_SLUG}/privacy_policy`,
  );

  const { forceReset } = useResetApp();

  const [data, setData] = useState<Record<string, string>>({});
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const setField = (name: string, val: string) => {
    setData((prev) => ({ ...prev, [name]: val }));
    setServerErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const errors = useMemo(() => validateSignIn(data), [data]);
  const isValid = Object.keys(errors).length === 0;

  const fieldError = (name: string): string | undefined => {
    if (!submitted) return undefined;
    const key = errors[name] ?? serverErrors[name];
    return key ? t(`auth.errors.${key}`) : undefined;
  };

  const next = async () => {
    setSubmitted(true);
    setServerErrors({});

    if (!isValid) return;

    setSubmitting(true);
    try {
      const { ok, body } = await signInWithEmail(data["email"].trim(), data["password"]);

      if (ok && body.access_token && body.refresh_token) {
        await completeAuth(body.access_token, body.refresh_token);
        forceReset(); // * exit the auth flow into the app
        return;
      }

      setServerErrors(mapSignInError(body.error));
    } catch {
      setServerErrors({ email: "requestFailed" });
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
        <Text style={styles.title}>{t("auth.signIn.title")}</Text>
      </View>

      <View style={styles.inputs}>
        <Input
          placeholder={t("auth.fields.email")}
          onChange={(val: string) => setField("email", val)}
          error={fieldError("email")}
        />
        <Input
          placeholder={t("auth.fields.password")}
          isSecure
          onChange={(val: string) => setField("password", val)}
          error={fieldError("password")}
        />
      </View>

      <PrimaryButton
        onClick={next}
        isDisabled={(submitted && !isValid) || submitting}
        containerStyles={styles.submitButton}
        text={t("auth.signIn.submit")}
      />

      <View style={styles.subtitle}>
        <Text
          style={{
            height: 20,
            margin: 0,
            padding: 0,
            alignItems: "center",
            color: colors.TextPrimary,
            ...Typography.regularLabel,
          }}
        >
          {t("auth.agreement.prefix")}
        </Text>

        <Pressable
          onPress={() => {
            // ? Navigate to Terms of Service
          }}
          style={{ height: 20, margin: 0, padding: 0, alignItems: "center" }}
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.link,
                { color: pressed ? colors.TextPrimaryPressed : colors.TextPrimary },
              ]}
            >
              {t("auth.agreement.terms")}
            </Text>
          )}
        </Pressable>

        <Text
          style={{
            height: 20,
            margin: 0,
            padding: 0,
            alignItems: "center",
            color: colors.TextPrimary,
            ...Typography.regularLabel,
          }}
        >
          {" & "}
        </Text>

        <Pressable
          onPress={() => {
            // ? Navigate to Privacy Policy
            if (privacyPolicyUrl) Linking.openURL(privacyPolicyUrl);
          }}
          style={{ height: 20, margin: 0, padding: 0, alignItems: "center" }}
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.link,
                { color: pressed ? colors.TextPrimaryPressed : colors.TextPrimary },
              ]}
            >
              {t("auth.agreement.privacy")}
            </Text>
          )}
        </Pressable>
      </View>
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

    inputs: {
      marginTop: 32,

      width: "100%",
      gap: 8,
    },

    submitButton: {
      width: "100%",

      marginTop: 44,
    },

    subtitle: {
      ...Typography.regularLabel,

      color: colors.TextPrimary,

      marginTop: 16,

      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",

      // textAlign: 'center',
      // alignItems: 'center',

      maxWidth: 360,
    },
    link: {
      ...Typography.boldLabel,
      color: colors.TextPrimary,
    },
  });
