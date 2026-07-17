import React, { useMemo } from "react";

import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import SecondaryButton from "@nihongo/core/shared/ui/buttons/Secondary/secondary-button";
import { ModalHeader } from "@nihongo/core/shared/ui/modal-header/modal-header";
import Tag from "@nihongo/core/shared/ui/tag/tag";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ArrowLeftIcon, ArrowRightIcon, BookIcon, TagIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, ImageBackground, Linking } from "react-native";
import { ScrollView, Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RootStackParamList, ROUTES } from "@/app/routes.types";
import VerbForm from "@/features/card/verb-form/verb-form";
import YetSeen from "@/features/card/yet-seen/yet-seen";
import { useBoard } from "@/shared/contexts/board/board-context";
import Furigana from "@/shared/ui/furigana/furigana";

type BoardNavProp = StackNavigationProp<RootStackParamList, typeof ROUTES.WORD>;
type BoardRouteProp = RouteProp<RootStackParamList, typeof ROUTES.WORD>;

const SWIPE_THRESHOLD = 20;

const SWIPE_DISTANCE = 60;

const CardPage = () => {
  const navigation = useNavigation<BoardNavProp>();
  const { params } = useRoute<BoardRouteProp>();

  const { currentCard, boardId, cards, selectCard, hasNext, hasPrev, next, prev } = useBoard();

  const card = currentCard ?? params.card;

  const { colors } = useThemeContext();
  const styles = makeStyles(colors);

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const goBack = () => navigation.goBack();

  const openInDictionary = () => {
    if (!boardId) return;

    Linking.openURL(`${process.env.MEMOBOARD_API}/${boardId}/${card.index}`);
  };

  const image = card?.images?.length ? `${process.env.MEMOBOARD_API}${card?.images?.[0]}` : null;

  const swipe = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-SWIPE_THRESHOLD, SWIPE_THRESHOLD])
        .failOffsetY([-SWIPE_THRESHOLD, SWIPE_THRESHOLD])
        .runOnJS(true)
        .onEnd((event) => {
          if (Math.abs(event.translationX) < SWIPE_DISTANCE) return;

          if (event.translationX < 0) {
            if (hasNext) next();
          } else if (hasPrev) {
            prev();
          }
        }),
    [next, prev, hasNext, hasPrev],
  );

  return (
    <GestureDetector gesture={swipe}>
      <View style={styles.screen}>
        {image && (
          <ImageBackground
            source={{ uri: image }}
            style={{ width: "100%" }}
            resizeMode="cover"
            imageStyle={styles.image}
          >
            <View style={styles.overlay} />

            <ModalHeader
              left={{
                text: t("common.close"),
                onPress: goBack,
              }}
              title={card.titleWithoutFurigana}
            />

            <View
              style={{
                padding: 16,
                minHeight: 200,
              }}
            >
              <Furigana text={card.title} />
              <Text style={styles.card_subtitle}>{card.subtitleNoFurigana}</Text>

              <View style={styles.tags}>
                <Tag
                  text={card.lessonTitle}
                  icon={<BookIcon size={12} color={colors.TextPrimary} />}
                />

                {card.tags.map((tag) => (
                  <Tag
                    key={tag.label}
                    isUpperCase={tag.label === "iii" || tag.label === "ii" || tag.label === "i"}
                    text={tag.label}
                    icon={<TagIcon size={12} color={colors.TextPrimary} />}
                  />
                ))}
              </View>
            </View>
          </ImageBackground>
        )}

        {!image && (
          <ModalHeader
            left={{
              text: t("common.close"),
              onPress: goBack,
            }}
            title={card.titleWithoutFurigana}
          />
        )}

        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            {!image && (
              <View>
                <Furigana text={card.title} />
                <Text style={styles.card_subtitle}>{card.subtitleNoFurigana}</Text>
              </View>
            )}
            {!image && (
              <View style={styles.tags}>
                <Tag
                  text={card.lessonTitle}
                  icon={<BookIcon size={12} color={colors.TextPrimary} />}
                />

                {card.tags.map((tag) => (
                  <Tag
                    key={tag.label}
                    isUpperCase={tag.label === "iii" || tag.label === "ii" || tag.label === "i"}
                    text={tag.label}
                    icon={<TagIcon size={12} color={colors.TextPrimary} />}
                  />
                ))}
              </View>
            )}
            {card.examples.length > 0 && (
              <View
                style={{
                  marginTop: 12,
                  marginBottom: 12,
                  height: 1,
                  width: "100%",
                  backgroundColor: colors.BorderDefault,
                }}
              />
            )}
            {card.examples.length > 0 && (
              <View>
                <View style={styles.header}>
                  <Text style={{ ...Typography.boldDefault, color: colors.TextContrastPrimary }}>
                    {t("card.examples")}
                  </Text>
                </View>
                <View style={styles.list}>
                  {card.examples.map((example) => (
                    <View style={styles.item} key={example}>
                      <Furigana
                        text={example}
                        typography={Typography.regularDefault}
                        typographyFurigana={Typography.regularCaption}
                      />
                    </View>
                  ))}
                </View>
              </View>
            )}

            <VerbForm tags={card.tags.map((i) => i.label)} title={card.title} />

            <YetSeen title={card.title} cards={cards} openModal={selectCard} />
          </ScrollView>
        </View>

        {
          <View style={[styles.buttons, { paddingBottom: insets.bottom }]}>
            <SecondaryButton
              isHapticFeedback
              icon={
                <ArrowLeftIcon
                  color={hasPrev ? colors.TextPrimary : colors.TextSecondary}
                  size={24}
                />
              }
              isOutline
              isDisabled={!hasPrev}
              width={50}
              onClick={prev}
            />

            <SecondaryButton
              isHapticFeedback
              text={t("card.open")}
              isOutline
              isFullWidth
              isDisabled={!boardId}
              onClick={openInDictionary}
            />

            <SecondaryButton
              isHapticFeedback
              icon={
                <ArrowRightIcon
                  color={hasNext ? colors.TextPrimary : colors.TextSecondary}
                  size={24}
                />
              }
              isOutline
              isDisabled={!hasNext}
              width={50}
              onClick={next}
            />
          </View>
        }
      </View>
    </GestureDetector>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    content: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    image: {
      resizeMode: "cover",
      alignSelf: "center",
    },
    overlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    card_subtitle: {
      color: colors.TextPrimary,
      ...Typography.boldH2,

      marginTop: 8,
    },

    buttonContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",

      paddingLeft: 12,
      paddingRight: 12,
    },
    buttons: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 16,
      paddingRight: 16,
      marginTop: 16,
      gap: 16,
    },
    tags: {
      flexDirection: "row",
      marginTop: 16,
      gap: 4,
    },
    header: {
      backgroundColor: colors.BgContrast,
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 4,

      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6,
    },
    list: {
      flexDirection: "column",
      gap: 6,
    },
    item: {
      backgroundColor: colors.BgSecondary,
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 4,
    },
    itemLabel: {
      color: colors.TextSecondary,
      ...Typography.regularLabel,
    },
    itemValue: {
      color: colors.TextPrimary,
      ...Typography.regularDefault,
    },
  });

export default CardPage;
