import React from "react";

import { LoginPage } from "@nihongo/core/pages/auth/preview";
import { SignInPage } from "@nihongo/core/pages/auth/sign-in";
import { SignUpPage } from "@nihongo/core/pages/auth/sign-up";
import { SubmitCode } from "@nihongo/core/pages/auth/submit-code";
import ProfilePage from "@nihongo/core/pages/profile";
import SettingsLanguagePage from "@nihongo/core/pages/settings/settings-language/settings-language";
import SettingsThemePage from "@nihongo/core/pages/settings/settings-theme/settings-theme";
import WelcomePage from "@nihongo/core/pages/welcome/welcome";
import { isAndroid } from "@nihongo/core/shared/constants/platformUtil";
import { TabBarButton } from "@nihongo/core/shared/ui/bottom-tap";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { SwatchesIcon, UserIcon } from "phosphor-react-native";

import { ROUTES } from "./routes.types";

import BoardPage from "@/pages/board";
import BoardsPage from "@/pages/boards";
import SectionsPage from "@/pages/sections";
import SettingsPage from "@/pages/settings/settings-page";
import WordPage from "@/pages/word";

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
              [ROUTES.BOARDS]: { title: "boards", icon: SwatchesIcon },
              [ROUTES.PROFILE_ROOT]: { title: "tabs.profile", icon: UserIcon },
            }}
          />
        ),
        screens: {
          [ROUTES.BOARDS]: BoardsPage,
          [ROUTES.PROFILE_ROOT]: ProfilePage,
        },
        screenOptions: {
          headerShown: false,
        },
      }),
      options: { headerShown: false },
    },

    [ROUTES.BOARD]: BoardPage,
    [ROUTES.WORD]: withModal(WordPage),
    [ROUTES.SECTIONS]: withModal(SectionsPage),

    [ROUTES.SETTINGS_ROOT]: SettingsPage,

    [ROUTES.SETTINGS_LANGUAGE]: withModal(SettingsLanguagePage),
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
  },
};

export const AndroidRootNavigation = createStaticNavigation(createStackNavigator(RootStack));
export const IOSRootNavigation = createStaticNavigation(createNativeStackNavigator(RootStack));

export const AndroidAuthNavigation = createStaticNavigation(createStackNavigator(AuthStack));
export const IOSAuthNavigation = createStaticNavigation(createNativeStackNavigator(AuthStack));
