import { REVIEW_KEY } from "@nihongo/core/shared/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InAppReview from "react-native-in-app-review";

const REVIEW_INTERVAL_MS = 90 * 24 * 60 * 60 * 1000;
const REVIEW_CHANCE = 0.5;

export const requestHuaweiStoreReview = async (): Promise<void> => {
  console.log("- call requestHuaweiStoreReview");

  if (process.env.STORE !== "Huawei AppGallery") {
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

    const resultCode = await InAppReview.requestInAppCommentAppGallery();
    console.log("Huawei AppGallery review result:", resultCode);

    // resultCode 102 = Rating submitted, 103 = Comment submitted
    if (resultCode === 102 || resultCode === 103) {
      await AsyncStorage.setItem(REVIEW_KEY, now.toString());
    }
  } catch (err) {
    if (err instanceof Error && err?.message?.includes("does not meet the conditions")) return;
    console.error("Huawei AppGallery review error:", err);
  }
};
