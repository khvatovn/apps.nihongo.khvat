// * Initialization of i18n (side-effect) - before other modules
import "@nihongo/core/shared/lib/i18n/index";

import React, { StrictMode } from "react";

import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { BottomTabVisibilityProvider } from "@nihongo/core/shared/contexts/bottom-tab-visibility";
import { DeviceRegistrationProvider } from "@nihongo/core/shared/contexts/device-registration";
import { HapticProvider } from "@nihongo/core/shared/contexts/haptic/haptic-context";
import { ModalProvider } from "@nihongo/core/shared/contexts/modal/modal-context";
import { RemoteConfigProvider } from "@nihongo/core/shared/contexts/remote-config/remote-config-context";
import { ThemeProvider } from "@nihongo/core/shared/contexts/theme/theme-context";
import { TransliterationsProvider } from "@nihongo/core/shared/contexts/transliteration/transliteration";
import { ApiGatewayProvider } from "@nihongo/core/shared/lib/api-gateway";
import NotificationsWrapper from "@nihongo/core/shared/lib/notifications";
import AppWrapper from "@nihongo/core/shared/ui/layouts/app-wrapper";
import { Providers } from "@nihongo/core/shared/ui/providers";
import { AppRegistry, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";

import Layout from "@/app/layout";
import { DrawProvider } from "@/features/drawing/model/context";
import { LessonsProvider } from "@/pages/education/learning/model/context";
import { KanaProvider } from "@/pages/kana/kana-table-choice-letters-page/model/context";
import { StatisticsProvider } from "@/pages/kana/kana-table-list-page/model/context";

enableScreens();

const App: React.FC = () => {
  return (
    <StrictMode>
      <View style={{ flex: 1 }}>
        <Providers
          providers={[
            [ThemeProvider],
            [AppWrapper],
            [ApiGatewayProvider],
            [RemoteConfigProvider],
            [SafeAreaProvider],
            [TransliterationsProvider],
            [ModalProvider],
            [BottomTabVisibilityProvider],
            [NotificationsWrapper],
            [DeviceRegistrationProvider],
            [ActionSheetProvider],
            [HapticProvider],
            [StatisticsProvider],
            [DrawProvider],
            [KanaProvider],
            [LessonsProvider],
          ]}
        >
          <Layout />
        </Providers>
      </View>
    </StrictMode>
  );
};

AppRegistry.registerComponent("main", () => App);
export default App;
