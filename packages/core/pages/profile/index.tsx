import React, { useCallback, useState } from "react";

import PracticeHeatmap from "@nihongo/core/entities/profile/practice-heatmap";
import ProfileItem from "@nihongo/core/entities/profile/profile-item/profile-item";
import SocialMediaProfile from "@nihongo/core/entities/profile/social-media-profile/social-media-profile";
import { PROFILE_ROUTES, ProfileParamList } from "@nihongo/core/pages/profile/routes";
import { IS_WELCOME_PAGE } from "@nihongo/core/shared/constants/storageKeys";
import { useHaptic } from "@nihongo/core/shared/contexts/haptic/haptic-context";
import { useResetApp } from "@nihongo/core/shared/contexts/reset-context/reset-context";
import { useStudyActivity } from "@nihongo/core/shared/contexts/study-activity/study-activity-context";
import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { getProfile, Profile } from "@nihongo/core/shared/lib/auth";
import { Typography } from "@nihongo/core/shared/typography";
import PrimaryButton from "@nihongo/core/shared/ui/buttons/Primary/primary-button";
import PageTitle from "@nihongo/core/shared/ui/page-title/page-title";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { GearIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NavigationProp = StackNavigationProp<ProfileParamList, typeof PROFILE_ROUTES.PROFILE>;

const ProfilePage: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const { forceReset } = useResetApp();
  const { days, sync } = useStudyActivity();

  const insets = useSafeAreaInsets();
  const { triggerHaptic } = useHaptic();

  const styles = makeStyles(colors);

  const toSettings = () => {
    triggerHaptic();
    navigation.navigate(PROFILE_ROUTES.SETTINGS);
  };

  const toEditProfile = () => {
    triggerHaptic();
    navigation.navigate(PROFILE_ROUTES.EDIT);
  };

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getProfile().then((data) => {
        if (!active) return;
        setProfile(data);
        setLoading(false);
      });
      void sync();
      return () => {
        active = false;
      };
    }, [sync]),
  );

  return (
    <View style={styles.main}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <PageTitle
          icon={
            <Pressable onPress={toSettings}>
              <>
                <GearIcon size={32} color={colors.BgContrast} />
              </>
            </Pressable>
          }
        >
          {t("tabs.profile")}
        </PageTitle>

        {loading && (
          <ActivityIndicator
            size="large"
            color={colors.BgContrast}
            style={{ marginVertical: 24 }}
          />
        )}

        {!loading && profile?.email && (
          <Pressable onPress={toEditProfile}>
            <ProfileItem
              avatar={profile?.avatar_url}
              name={profile?.name ?? ""}
              email={profile?.email ?? ""}
            />
          </Pressable>
        )}

        {!loading && !profile?.email && (
          <View>
            <Text
              style={{
                ...Typography.regularDefault,
                color: colors.TextSecondary,
                maxWidth: 300,
                marginBottom: 16,
              }}
            >
              {t("profile.signInPrompt", { app: process.env.APP_NAME })}
            </Text>

            <PrimaryButton
              onClick={() => {
                AsyncStorage.removeItem(IS_WELCOME_PAGE);
                forceReset();
              }}
              text={t("profile.signInButton")}
            />
          </View>
        )}
      </View>

      <ScrollView
        contentContainerStyle={{ gap: 16 }}
        showsVerticalScrollIndicator={false}
        style={styles.content}
      >
        {process.env.APP_SLUG === "kana-master" && <PracticeHeatmap data={days} />}
        <SocialMediaProfile />
      </ScrollView>
    </View>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: colors.BgSecondary,
    },
    container: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      backgroundColor: colors.BgPrimary,
    },
    content: {
      marginTop: 16,
      paddingHorizontal: 16,
    },
  });

export default ProfilePage;
