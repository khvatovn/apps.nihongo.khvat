import { PROMOTION_TELEGRAM_KEY } from "@nihongo/core/shared/constants/storageKeys";
import { useModal } from "@nihongo/core/shared/contexts/modal/modal-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import { PromotionTelegram } from "@/shared/contexts/modal/presets/promotion-telegram";

const TELEGRAM_CHANCE = 0.5;

export const useTelegramPromotion = () => {
  const { showModal, hideModal } = useModal();
  const { i18n } = useTranslation();

  const showTelegramPromotionIfNeeded = async (): Promise<void> => {
    if (i18n.language !== "ru") return;

    const isShown = await AsyncStorage.getItem(PROMOTION_TELEGRAM_KEY);

    if (isShown) return;

    const chance = Math.random();

    if (chance > TELEGRAM_CHANCE) return;

    console.log("ШАНС на Telegram-промо СРАБОТАЛ");

    await AsyncStorage.setItem(PROMOTION_TELEGRAM_KEY, Date.now().toString());
    showModal({
      closeOnBackdrop: false,
      onClose: () => {},
      content: <PromotionTelegram onPress={() => hideModal()} />,
    });
  };

  return { showTelegramPromotionIfNeeded };
};
