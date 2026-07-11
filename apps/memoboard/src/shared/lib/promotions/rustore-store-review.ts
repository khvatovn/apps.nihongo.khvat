import { REVIEW_KEY } from "@nihongo/core/shared/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RustoreReviewClient from "react-native-rustore-review";

const REVIEW_INTERVAL_MS = 90 * 24 * 60 * 60 * 1000;
const REVIEW_CHANCE = 0.5;

export const requestRustoreStoreReview = async (): Promise<void> => {
  console.log("- call requestRustoreStoreReview");

  if (process.env.STORE !== "RuStore") {
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

    if (Math.random() > REVIEW_CHANCE) {
      console.log("* not today");
      return;
    }

    console.log("* let's go");

    await RustoreReviewClient.init();

    const isRequested = await RustoreReviewClient.requestReviewFlow();
    if (isRequested) {
      await AsyncStorage.setItem(REVIEW_KEY, now.toString());
      await RustoreReviewClient.launchReviewFlow();
    }
  } catch (err) {
    if (err instanceof Error && err?.message?.includes("RuStoreReviewExists")) return;
    console.error("RuStore review error:", err);
  }
};
