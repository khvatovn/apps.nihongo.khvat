import React, { useEffect } from "react";

import { useModal } from "@nihongo/core/shared/contexts/modal/modal-context";
import { ConfirmationModal } from "@nihongo/core/shared/contexts/modal/presets/confirmation";
import SafeLayout from "@nihongo/core/shared/ui/layouts/safe-layout";
import LinearProgressBar from "@nihongo/core/shared/ui/progressbar/linear/linear-progress-bar";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { BackHandler, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLessonsContext } from "../../model/hooks";
import { Lesson as LessonInterface } from "../../model/types";
import { useEducationLessonContext } from "../lib/context/education-lesson-context";

import FinishScreen from "@/widgets/learning/lesson/finish-screen/finish-screen";
import InfoScreen from "@/widgets/learning/lesson/info-screen/info-screen";

interface LessonProps {
  lesson: LessonInterface;
}

const Lesson: React.FC<LessonProps> = ({ lesson }) => {
  const { completeLesson } = useLessonsContext();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const { showModal, hideModal } = useModal();

  const { init, currentScreen, screen, lessonScreens, next, retry } = useEducationLessonContext();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
      headerBackVisible: false,
    });
  }, [navigation]);

  const addMarkCompleteLessonInStore = () => completeLesson(lesson.lesson_key);

  const onComplete = () => {
    addMarkCompleteLessonInStore();
    navigation.goBack();
  };

  const onRetry = () => {
    addMarkCompleteLessonInStore();
    init(lesson.screens);
    retry();
  };

  useEffect(() => {
    init(lesson.screens);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init из контекста
  }, [lesson.screens]);

  React.useEffect(() => {
    const onBackPress = () => {
      showModal({
        closeOnBackdrop: false,
        onClose: () => {},
        content: (
          <ConfirmationModal
            title={t("alert.exitConformation.title")}
            subtitle={t("alert.exitConformation.subtitle")}
            cancelText={t("alert.cancel")}
            confirmText={t("alert.ok")}
            onConfirm={() => {
              navigation.goBack();
              hideModal();
            }}
            onCancel={hideModal}
          />
        ),
      });

      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => backHandler.remove();
  }, [hideModal, navigation, showModal, t]);

  return (
    <SafeLayout disableLeft disableRight style={styles.container}>
      <View
        style={{
          paddingLeft: insets.left + 16,
          paddingRight: insets.right + 16,
        }}
      >
        {currentScreen?.title !== "finish" && (
          <LinearProgressBar
            close={navigation.goBack}
            current={screen}
            all={lessonScreens.length - 1}
          />
        )}
      </View>

      {currentScreen && currentScreen?.title === "finish" && (
        <View
          style={[
            styles.container,
            { paddingLeft: insets.left + 16, paddingRight: insets.right + 16 },
          ]}
        >
          <FinishScreen next={onComplete} retry={onRetry} />
        </View>
      )}

      {currentScreen && currentScreen?.title !== "finish" && (
        <View style={styles.container}>
          <InfoScreen
            next={next}
            finish={onComplete}
            title={currentScreen.title}
            blocks={currentScreen.blocks}
            isLast={screen + 1 === lessonScreens.length}
            id={currentScreen.id}
            screen_order={currentScreen.screen_order}
          />
        </View>
      )}
    </SafeLayout>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
