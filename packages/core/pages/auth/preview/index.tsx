import React, { useEffect, useState } from "react";

import {
  checkGoogleOAuthAvailability,
  GOOGLE_OAUTH_BLOCKED,
  oauthGoogle,
} from "@nihongo/core/features/auth/api";
import { completeAuth } from "@nihongo/core/features/auth/lib/completeAuth";
import { googleSignIn } from "@nihongo/core/features/auth/lib/googleAuth";
import { AUTH_ROUTES, AuthParamList } from "@nihongo/core/features/auth/routes";
import { IS_WELCOME_PAGE } from "@nihongo/core/shared/constants/storageKeys";
import { useModal } from "@nihongo/core/shared/contexts/modal/modal-context";
import { AlertModal } from "@nihongo/core/shared/contexts/modal/presets/alert";
import { useResetApp } from "@nihongo/core/shared/contexts/reset-context/reset-context";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { useGatewayUrl } from "@nihongo/core/shared/lib/api-gateway";
import { Typography } from "@nihongo/core/shared/typography";
import PrimaryButton from "@nihongo/core/shared/ui/buttons/Primary/primary-button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CaretLeftIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { View, Text, Image, StyleSheet, Pressable, Linking } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

import authLogo from "../../../shared/assets/auth/avatar.jpg";
import googleIcon from "../../../shared/assets/auth/google.png";

type LoginNavigationProp = StackNavigationProp<AuthParamList, typeof AUTH_ROUTES.PREVIEW>;

// ! Нужно тут вынести компонент Google OAuth кнопка и логика, что бы я мог вставить кнопку входа по google и в другой экран

export const LoginPage: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  const { forceReset } = useResetApp();
  const { showModal, hideModal } = useModal();

  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();
  const styles = makeStyles(colors, insets);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    });
  }, [navigation]);

  const goBack = () => navigation.goBack();

  const skipAuth = async () => {
    await AsyncStorage.setItem(IS_WELCOME_PAGE, "true");
    forceReset();
  };

  const [googleLoading, setGoogleLoading] = useState(false);

  const showGoogleUnavailable = (ip?: string) =>
    showModal({
      closeOnBackdrop: true,
      onClose: () => {},
      content: (
        <AlertModal
          title={t("auth.googleUnavailable.title")}
          subtitle={t("auth.googleUnavailable.subtitle", { ip: ip ?? "—" })}
          button={t("alert.ok")}
          onPress={hideModal}
        />
      ),
    });

  const continueWithGoogle = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);

    try {
      const availability = await checkGoogleOAuthAvailability().catch(() => null);

      if (availability && !availability.available) {
        showGoogleUnavailable(availability.ip);
        return;
      }

      const idToken = await googleSignIn();

      const { ok, body } = await oauthGoogle(idToken);

      if (body.error === GOOGLE_OAUTH_BLOCKED) {
        showGoogleUnavailable(availability?.ip);
        return;
      }

      if (ok && body.access_token && body.refresh_token) {
        await completeAuth(body.access_token, body.refresh_token);
        forceReset();
        return;
      }
    } catch (error) {
      if (error instanceof Error && error.message === "User cancelled flow") return;
    } finally {
      setGoogleLoading(false);
    }
  };

  const privacyPolicyUrl = useGatewayUrl(
    `/${i18n.language}/docs/${process.env.DOCS_SLUG}/privacy_policy`,
  );
  const termsUrl = useGatewayUrl(
    `/${i18n.language}/docs/${process.env.DOCS_SLUG}/terms_conditions`,
  );

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

      <Image style={styles.image} source={authLogo} />
      <Text style={styles.title}>{t("auth.welcome.firstStep")}</Text>

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
            if (termsUrl) Linking.openURL(termsUrl);
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

      <View style={styles.buttons}>
        <PrimaryButton
          width="100%"
          onClick={continueWithGoogle}
          isDisabled={googleLoading}
          icon={
            <View>
              <Image style={styles.button_image} source={googleIcon}></Image>
            </View>
          }
          containerStyles={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Text style={styles.button_text}>{t("auth.continueWithGoogle")}</Text>
        </PrimaryButton>

        <PrimaryButton
          width="100%"
          onClick={() => {
            navigation.navigate(AUTH_ROUTES.SIGN_UP);
          }}
          containerStyles={{
            flexDirection: "row",
            gap: 8,
            marginTop: 8,
            backgroundColor: colors.BgSecondary,
          }}
        >
          <Text style={[styles.button_text, { color: colors.TextPrimary }]}>
            {t("auth.signUpWithEmail")}
          </Text>
        </PrimaryButton>

        <Pressable
          onPress={() => {
            navigation.navigate(AUTH_ROUTES.SIGN_IN);
          }}
          style={styles.buttonLink}
        >
          {({ pressed }) => (
            <>
              <Text style={styles.buttonLinkText}>{t("auth.alreadyHaveAccount")}</Text>
              <Text
                style={[
                  styles.buttonLinkBold,
                  { color: pressed ? colors.TextPrimaryPressed : colors.TextPrimary },
                ]}
              >
                {t("auth.login")}
              </Text>
            </>
          )}
        </Pressable>
      </View>

      <Pressable
        onPress={skipAuth}
        style={[
          styles.buttonLink,
          {
            position: "absolute",
            bottom: 16 + insets.bottom,
          },
        ]}
      >
        {({ pressed }) => (
          <Text
            style={[
              styles.buttonLinkBold,
              { color: pressed ? colors.TextPrimaryPressed : colors.TextPrimary },
            ]}
          >
            {t("auth.continueWithoutLogin")}
          </Text>
        )}
      </Pressable>
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
    image: {
      width: 192,
      height: 192,
      borderRadius: 192,
    },
    title: {
      ...Typography.H3,

      marginTop: 32,

      color: colors.TextPrimary,

      textAlign: "center",

      maxWidth: 340,
    },
    subtitle: {
      ...Typography.regularLabel,

      color: colors.TextPrimary,

      marginTop: 8,

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
    buttons: {
      width: "100%",

      marginTop: 32,
    },
    button_image: {
      width: 20,
      height: 20,
    },
    button_text: {
      ...Typography.boldDefault,

      color: colors.TextContrastPrimary,
    },
    buttonLink: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 8,

      marginTop: 16,
    },
    buttonLinkText: {
      ...Typography.regularDefault,
      color: colors.TextPrimary,
    },
    buttonLinkBold: {
      ...Typography.boldDefault,
    },
  });
