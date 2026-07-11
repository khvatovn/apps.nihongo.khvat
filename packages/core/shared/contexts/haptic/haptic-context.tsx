import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
  useCallback,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

import { isAndroid, isIOS } from "../../constants/platformUtil";
import { APP_HAPTIC_ENABLED } from "../../constants/storageKeys";

interface HapticContextType {
  triggerHaptic: (force?: boolean) => void;
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => Promise<void>;
  toggle: () => Promise<void>;
}

const HapticContext = createContext<HapticContextType>({
  triggerHaptic: () => {},
  isEnabled: true,
  setEnabled: async () => {},
  toggle: async () => {},
});

interface HapticProviderProps {
  children: ReactNode;
}

export const HapticProvider: FunctionComponent<HapticProviderProps> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  useEffect(() => {
    const loadHapticSetting = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(APP_HAPTIC_ENABLED);
        if (storedValue !== null) {
          setIsEnabled(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error("Failed to load haptic setting:", error);
      }
    };

    loadHapticSetting();
  }, []);

  const setEnabled = useCallback(async (newValue: boolean) => {
    try {
      setIsEnabled(newValue);
      await AsyncStorage.setItem(APP_HAPTIC_ENABLED, JSON.stringify(newValue));
    } catch (error) {
      console.error("Failed to save haptic setting:", error);
    }
  }, []);

  const toggle = useCallback(async () => {
    await setEnabled(!isEnabled);
  }, [isEnabled, setEnabled]);

  const triggerHaptic = useCallback(
    (force: boolean = false) => {
      if (!isEnabled && !force) {
        return;
      }

      if (isIOS) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else if (isAndroid) {
        Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Context_Click);
      }
    },
    [isEnabled],
  );

  return (
    <HapticContext.Provider value={{ triggerHaptic, isEnabled, setEnabled, toggle }}>
      {children}
    </HapticContext.Provider>
  );
};

export const useHaptic = () => useContext(HapticContext);
