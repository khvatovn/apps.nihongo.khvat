import React from "react";

import { ResetPasswordAskEmailPage } from "@nihongo/core/pages/auth/password-reset/ask-email";
import { ResetPasswordPage } from "@nihongo/core/pages/auth/password-reset/reset-password";
import { ResetPasswordSubmitCodePage } from "@nihongo/core/pages/auth/password-reset/submit-code";
import { LoginPage } from "@nihongo/core/pages/auth/preview";
import { SignInPage } from "@nihongo/core/pages/auth/sign-in";
import { SignUpPage } from "@nihongo/core/pages/auth/sign-up";
import { SubmitCode } from "@nihongo/core/pages/auth/submit-code";
import ProfilePage from "@nihongo/core/pages/profile";
import SettingsLanguagePage from "@nihongo/core/pages/settings/settings-language/settings-language";
import SettingsThemePage from "@nihongo/core/pages/settings/settings-theme/settings-theme";
import SettingsTransliterationsPage from "@nihongo/core/pages/settings/settings-transliterations/settings-transliterations";
import WelcomePage from "@nihongo/core/pages/welcome/welcome";
import { isAndroid } from "@nihongo/core/shared/constants/platformUtil";
import { TabBarButton } from "@nihongo/core/shared/ui/bottom-tap";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { CardsThreeIcon, GraduationCapIcon, SwatchesIcon, UserIcon } from "phosphor-react-native";

import { ROUTES } from "./routes.types";

import LearningList from "@/pages/education/learning/learning-list-page/learning-list-page";
import LessonPage from "@/pages/education/learning/lesson-page/lesson-page";
import EducationPracticePage from "@/pages/education/practice/education-practice";
import EducationResultPage from "@/pages/education/practice/education-result-page/education-result-page";
import PracticeWelcomePage from "@/pages/education/practice/practice-welcome/practice-welcome";
import KanaLetterPage from "@/pages/kana/kana-letter-page/kana-letter-page";
import KanaTableChoiceLettersPage from "@/pages/kana/kana-table-choice-letters-page/kana-table-choice-letters-page";
import KanaTableListPage from "@/pages/kana/kana-table-list-page/kana-table-list-page";
import SettingsPage from "@/pages/settings/settings-page";

const withModal = <P extends object>(Component: React.ComponentType<P>) => ({
  screen: Component,
  options: {
    presentation: "modal",
    headerShadowVisible: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(isAndroid && ({ ...TransitionPresets.ModalPresentationIOS } as any)),
    gestureEnabled: true,
    headerShown: false,
  } as const,
});

const RootStack = {
  screens: {
    [ROUTES.HOME]: {
      screen: createBottomTabNavigator({
        tabBar: (props) => (
          <TabBarButton
            {...props}
            tabs={{
              [ROUTES.LEARNING_ROOT]: { title: "tabs.practice", icon: GraduationCapIcon },
              [ROUTES.PRACTICE_ROOT]: { title: "tabs.learning", icon: CardsThreeIcon },
              [ROUTES.KANA_TABLE_ROOT]: { title: "tabs.kana", icon: SwatchesIcon },
              [ROUTES.PROFILE_ROOT]: { title: "tabs.profile", icon: UserIcon },
            }}
          />
        ),
        screens: {
          [ROUTES.PRACTICE_ROOT]: PracticeWelcomePage,
          [ROUTES.LEARNING_ROOT]: LearningList,
          [ROUTES.KANA_TABLE_ROOT]: KanaTableListPage,
          [ROUTES.PROFILE_ROOT]: ProfilePage,
        },
        screenOptions: { headerShown: false },
      }),
      options: { headerShown: false },
    },

    [ROUTES.SETTINGS_ROOT]: SettingsPage,

    [ROUTES.PRACTICE_TESTING]: EducationPracticePage,

    [ROUTES.LESSON_PAGE]: LessonPage,
    [ROUTES.RESULTS]: EducationResultPage,

    [ROUTES.KANA_INFO]: withModal(KanaLetterPage),
    [ROUTES.KANA_SELECT]: withModal(KanaTableChoiceLettersPage),

    // ? pages from @nihongo/core
    [ROUTES.SETTINGS_LANGUAGE]: withModal(SettingsLanguagePage),
    [ROUTES.SETTINGS_TRANSLITERATION]: withModal(SettingsTransliterationsPage),
    [ROUTES.SETTINGS_THEME]: withModal(SettingsThemePage),
  },
};

const AuthStack = {
  screens: {
    [ROUTES.WELCOME]: WelcomePage,
    [ROUTES.AUTH_PREVIEW]: LoginPage,

    [ROUTES.SIGN_UP_PAGE]: SignUpPage,
    [ROUTES.SIGN_IN_PAGE]: SignInPage,

    [ROUTES.SUBMIT_CODE]: SubmitCode,

    // ? Reset password
    [ROUTES.RESET_PASSWORD_ASK_EMAIL]: ResetPasswordAskEmailPage,
    [ROUTES.RESET_PASSWORD_SUBMIT_CODE]: ResetPasswordSubmitCodePage,
    [ROUTES.RESET_PASSWORD_CONFIRM]: ResetPasswordPage,
  },
};

export const AndroidRootNavigation = createStaticNavigation(createStackNavigator(RootStack));
export const IOSRootNavigation = createStaticNavigation(createNativeStackNavigator(RootStack));

export const AndroidAuthNavigation = createStaticNavigation(createStackNavigator(AuthStack));
export const IOSAuthNavigation = createStaticNavigation(createNativeStackNavigator(AuthStack));
