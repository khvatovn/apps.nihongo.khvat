import React, { useRef, useReducer, useState, useEffect } from "react";

import { getCanvasSize, TABLET_WIDTH } from "@nihongo/core/shared/constants/sizes";
import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import {
  dakuonFlatLettersId,
  handakuonFlatLettersId,
  ILetter,
  yoonFlatLettersId,
} from "@nihongo/core/shared/data/lettersTable";
import { Typography } from "@nihongo/core/shared/typography";
import PrimaryButton from "@nihongo/core/shared/ui/buttons/Primary/primary-button";
import SecondaryButton from "@nihongo/core/shared/ui/buttons/Secondary/secondary-button";
import { CircleIcon, FloppyDiskIcon, ScanIcon, XIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  GestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { Svg, Path } from "react-native-svg";

import { normalizeCoordinates } from "../../lib/hieroglyph-recognition/coordinates";
import Recognizer from "../../lib/hieroglyph-recognition/recognizer";
import { processDrawing } from "../../lib/hieroglyph-recognition/record";
import { kanaTemplates } from "../../lib/hieroglyph-recognition/templates";
import { useDrawSettings } from "../../model/hooks";
import ClearButtons from "../buttons/clear-buttons";
import ToggleShowBorders from "../buttons/toggle-show-borders";
import ToggleShowLetter from "../buttons/toggle-show-letter";
import ToggleStrokeWidth from "../buttons/toggle-stroke-width";

import CanvasBorder from "./canvas-border";

import Symbol from "@/entities/kana/symbol/symbol";
import { KanaAlphabet, TEST_DELAY } from "@/shared/constants/kana";
import { useFirstClickHandler } from "@/shared/helpers/firstClickHandler";

// ? Recognizer imports

enum StateColor {
  Green = "Green",
  Red = "Red",
  NotInitialized = "not_initialized",
}
interface DrawProps {
  letter: ILetter;
  kana: KanaAlphabet;

  isCheck?: boolean;

  isFullHeight?: boolean;

  isTextRecognition?: boolean;

  onCompleted?: (isErrors: boolean, pickedAnswer: ILetter) => void;
}

const getTypeById = (id: string) => {
  if (yoonFlatLettersId.includes(id)) return "kana.yoon";
  if (handakuonFlatLettersId.includes(id)) return "kana.handakuon";
  if (dakuonFlatLettersId.includes(id)) return "kana.dakuon";

  return "kana.basic";
};

const Draw: React.FC<DrawProps> = ({
  isCheck,
  letter,
  kana,
  isTextRecognition,
  isFullHeight,
  onCompleted,
}) => {
  const { width, height } = useWindowDimensions();

  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const currentPathRef = useRef<{ x: number; y: number }[]>([]);
  const pathsRef = useRef<{ x: number; y: number }[][]>([]);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const canvasSize = getCanvasSize(width, height);

  const { settings } = useDrawSettings();

  const strokeWidth = settings.lineWidth;
  const isShowLetter = settings.isShowLetter;
  const isShowBorder = settings.isShowBorder;

  const onGestureEvent = (event: GestureHandlerGestureEvent) => {
    const { x, y } = event.nativeEvent as unknown as { x: number; y: number };

    if (currentPathRef.current.length === 0) {
      currentPathRef.current = [{ x, y }];
    } else {
      const newPoint = { x, y };
      currentPathRef.current = [...currentPathRef.current, newPoint];
    }

    requestAnimationFrame(() => {
      forceUpdate();
    });
  };

  const onHandlerStateChange = (event: GestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === 5) {
      pathsRef.current = [...pathsRef.current, currentPathRef.current];
      currentPathRef.current = [];
      forceUpdate();
    }
  };

  const handleClearStepButtonClick = () => {
    if (currentPathRef.current.length > 0) {
      currentPathRef.current.pop();
    } else if (pathsRef.current.length > 0) {
      pathsRef.current.pop();
    }
    forceUpdate();
  };

  const handleClearButtonClick = () => {
    pathsRef.current = [];
    currentPathRef.current = [];
    forceUpdate();
  };

  const generatePathDAttribute = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";

    const moveToStart = (x: number, y: number) => `M ${x},${y}`;

    const quadraticCurveTo = (x1: number, y1: number, x2: number, y2: number) =>
      ` Q ${x1},${y1} ${x2},${y2}`;

    const smoothCurveTo = (x: number, y: number) => ` T ${x},${y}`;
    const getMidPoint = (point1: { x: number; y: number }, point2: { x: number; y: number }) => ({
      x: (point1.x + point2.x) / 2,
      y: (point1.y + point2.y) / 2,
    });

    let d = moveToStart(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currPoint = points[i];
      const midPoint = i > 1 ? getMidPoint(prevPoint, currPoint) : prevPoint;

      d += quadraticCurveTo(prevPoint.x, prevPoint.y, midPoint.x, midPoint.y);
    }

    const lastPoint = points[points.length - 1];
    d += smoothCurveTo(lastPoint.x, lastPoint.y);

    return d;
  };

  function shortenLines(data: number[][][]) {
    return data.map((line) => line.map((item) => item.map((point) => +point.toFixed(4))));
  }

  const [state, setState] = useState<StateColor>(StateColor.NotInitialized);

  const detectSymbol = useFirstClickHandler(() => {
    const recognizer = new Recognizer();

    if (kana === KanaAlphabet.Hiragana) {
      kanaTemplates.addHiragana(recognizer);
    }

    if (kana === KanaAlphabet.Katakana) {
      kanaTemplates.addKatakana(recognizer);
    }

    const strokes = normalizeCoordinates(pathsRef.current);
    const result = recognizer.recognize(strokes);

    const target = kana === KanaAlphabet.Hiragana ? letter.hi : letter.ka;

    const ABS_THRESHOLD = 0.15;
    const RANK_MARGIN = 0.15;

    const best = result[0];
    const targetMatch = result.find((symbol) => symbol.name[0] === target);

    const isSomeKana =
      !!best &&
      !!targetMatch &&
      targetMatch.score <= ABS_THRESHOLD &&
      targetMatch.score <= best.score * (1 + RANK_MARGIN);

    if (isSomeKana) {
      onCompleted?.(true, letter);
      setState(StateColor.Green);

      setTimeout(() => {
        setState(StateColor.NotInitialized);
        handleClearButtonClick();
      }, TEST_DELAY);
    } else {
      onCompleted?.(false, letter);
      setState(StateColor.Red);

      setTimeout(() => {
        setState(StateColor.NotInitialized);
        handleClearButtonClick();
      }, TEST_DELAY);
    }
  }, 400);

  const IS_SAVE = false;

  useEffect(() => {
    handleClearButtonClick();
  }, [letter]);

  return (
    <GestureHandlerRootView
      style={[
        { height: canvasSize + 165 },
        isFullHeight ? { flex: 1, justifyContent: "space-between" } : {},
      ]}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <View
            style={{
              borderRadius: 24,
              position: "relative",
              height: canvasSize,
              width: canvasSize,
            }}
          >
            <View
              style={{
                borderRadius: 22,
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: "100%",
                height: "100%",
                borderWidth: 1,
                borderColor: colors.BorderDefault,
              }}
            />

            {state !== StateColor.NotInitialized && (
              <View
                style={{
                  position: "absolute",
                  backgroundColor: colors.BgSecondary,
                  width: 90,
                  height: 90,
                  right: 0,
                  zIndex: 999,
                  borderWidth: 1,
                  borderColor: colors.BorderDefault,
                  borderTopRightRadius: 24,
                  borderBottomLeftRadius: 24,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                {state === StateColor.Green && <CircleIcon size={32} color={colors.TextSuccess} />}

                {state === StateColor.Green && (
                  <Text style={[{ color: colors.TextSuccess }, Typography.boldH3]}>まる</Text>
                )}

                {state === StateColor.Red && <XIcon size={32} color={colors.TextDanger} />}

                {state === StateColor.Red && (
                  <Text style={[{ color: colors.TextDanger }, Typography.boldH3]}>ばつ</Text>
                )}
              </View>
            )}

            {isShowLetter && !isCheck && (
              <View style={[styles.drawContainerImage, { width: canvasSize, height: canvasSize }]}>
                <Symbol isGray id={letter?.id} kana={kana} />
              </View>
            )}
            <Svg height={canvasSize} width={canvasSize}>
              {isShowBorder && <CanvasBorder canvasSize={canvasSize} />}
              {pathsRef.current.map((path, index) => (
                <Path
                  key={`path-${index}`}
                  d={generatePathDAttribute(path)}
                  stroke={colors.BgContrast}
                  fill={colors.transparent}
                  strokeWidth={isCheck ? 6 : strokeWidth}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ))}
              <Path
                d={generatePathDAttribute(currentPathRef.current)}
                stroke={colors.BgContrast}
                fill={colors.transparent}
                strokeWidth={isCheck ? 6 : strokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </PanGestureHandler>

        <View
          style={{
            width: "100%",
            maxWidth: width > canvasSize ? canvasSize : width - 32,
          }}
        >
          <ClearButtons clearFull={handleClearButtonClick} clearStep={handleClearStepButtonClick} />
          <View style={styles.buttonsContainer}>
            <View style={styles.actionButtons}>
              {getTypeById(letter.id) === "kana.basic" && isTextRecognition && (
                <PrimaryButton
                  isIcon
                  isHapticFeedback
                  width={50}
                  icon={<ScanIcon size={20} color={colors.BgContrast} />}
                  onClick={detectSymbol}
                  containerStyles={{
                    flexDirection: "row-reverse",
                    alignItems: "center",
                  }}
                />
              )}

              {IS_SAVE && (
                <SecondaryButton
                  width={50}
                  icon={<FloppyDiskIcon size={20} color={colors.BgWhite} />}
                  onClick={() => {
                    const points = shortenLines(
                      normalizeCoordinates(processDrawing(pathsRef.current)),
                    );

                    console.log("📦 Symbol points: ", JSON.stringify(points));
                  }}
                />
              )}

              {!isCheck && <ToggleShowBorders />}
              {!isCheck && <ToggleShowLetter />}
            </View>
            {!isCheck && <ToggleStrokeWidth />}
          </View>
        </View>

        <View
          style={{
            width: "100%",
            maxWidth: TABLET_WIDTH,
          }}
        >
          {isCheck && (
            <PrimaryButton isHapticFeedback onClick={detectSymbol} text={t("common.check")} />
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  drawContainerImage: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 16,
  },
});

export default Draw;
