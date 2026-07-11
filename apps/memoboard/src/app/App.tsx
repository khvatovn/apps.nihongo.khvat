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
import { ApiGatewayProvider } from "@nihongo/core/shared/lib/api-gateway";
import NotificationsWrapper from "@nihongo/core/shared/lib/notifications";
import AppWrapper from "@nihongo/core/shared/ui/layouts/app-wrapper";
import { Providers } from "@nihongo/core/shared/ui/providers";
import { View } from "react-native";
import { AppRegistry } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";

import Layout from "@/app/layout";
import { BoardProvider } from "@/shared/contexts/board/board-context";

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
            [ModalProvider],
            [BottomTabVisibilityProvider],
            [NotificationsWrapper],
            [DeviceRegistrationProvider],
            [ActionSheetProvider],
            [HapticProvider],
            [BoardProvider],
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
