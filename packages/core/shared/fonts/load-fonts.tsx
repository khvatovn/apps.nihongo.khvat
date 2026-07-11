import * as Font from "expo-font";
import { Platform } from "react-native";

import IBMPlexSansMedium from "./IBMPlexSans/IBMPlexSans-Medium.ttf";
import IBMPlexSansRegular from "./IBMPlexSans/IBMPlexSans-Regular.ttf";
import SFProDisplaySemibold from "./SFProText/SFProDisplay-Semibold.ttf";
import SFProTextRegular from "./SFProText/SFProText-Regular.ttf";

interface LoadFontsProps {
  successful?: () => void | Promise<void>;
  error?: (e: unknown) => void | Promise<void>;
  finallyCallback?: () => void | Promise<void>;
}

export const loadFonts = async ({ successful, error, finallyCallback }: LoadFontsProps) => {
  try {
    const fonts = Platform.select<Record<string, Font.FontSource>>({
      android: {
        "IBMPlexSans-Regular": IBMPlexSansRegular,
        "IBMPlexSans-Medium": IBMPlexSansMedium,
      },
      ios: {
        "SFProText-Regular": SFProTextRegular,
        "SFProDisplay-Semibold": SFProDisplaySemibold,
      },
      default: {},
    })!;

    await Font.loadAsync(fonts);
    await successful?.();
  } catch (e) {
    await error?.(e);
  } finally {
    await finallyCallback?.();
  }
};
