import { REVIEW_KEY } from "@nihongo/core/shared/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StoreReview from "expo-store-review";


const REVIEW_INTERVAL_MS = 90 * 24 * 60 * 60 * 1000;
const REVIEW_CHANCE = 0.3;

export const requestStoreReview = async (): Promise<void> => {
  console.log("-> call requestStoreReview");

  if (process.env.STORE !== "Apple App Store" && process.env.STORE !== "Google Play") {
    console.log("* incorrect store, end func", process.env.STORE);
    return;
  }

  try {
    const saved = await AsyncStorage.getItem(REVIEW_KEY);
    const now = Date.now();

    if (saved) {
      const lastRequested = parseInt(saved, 10);
      if (now - lastRequested < REVIEW_INTERVAL_MS) return;
    }

    if (Math.random() > REVIEW_CHANCE) return;

    if (!(await StoreReview.hasAction())) return;

    await AsyncStorage.setItem(REVIEW_KEY, now.toString());
    await StoreReview.requestReview();
  } catch (err) {
    console.warn("Review check error", err);
  }
};
