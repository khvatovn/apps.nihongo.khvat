import React, { ReactNode, useEffect, useRef } from "react";

import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import SecondaryButton from "@nihongo/core/shared/ui/buttons/Secondary/secondary-button";
import { createAudioPlayer, type AudioPlayer } from "expo-audio";
import { SpeakerHighIcon } from "phosphor-react-native";
import { Pressable } from "react-native";

import getSound from "@/shared/resources/sounds";

interface SoundLetterProps {
  id: string;
  width?: number;
  children?: ReactNode;
  isAutoPlay?: boolean;
}

const SoundLetter: React.FC<SoundLetterProps> = ({ id, width, children, isAutoPlay }) => {
  const { colors } = useThemeContext();
  const playerRef = useRef<AudioPlayer | null>(null);

  useEffect(() => {
    const player = createAudioPlayer(getSound(id));
    playerRef.current = player;

    if (isAutoPlay) {
      try {
        player.play();
      } catch (error) {
        console.warn("Sound autoplay skipped:", error);
      }
    }

    return () => {
      playerRef.current = null;
      try {
        player.release();
      } catch {
        console.log("player release error");
      }
    };
  }, [id, isAutoPlay]);

  const playSound = () => {
    const player = playerRef.current;
    if (!player) return;

    try {
      player.seekTo(0);
      player.play();
    } catch (error) {
      console.warn("Sound play skipped:", error);
    }
  };

  const soundIcon = <SpeakerHighIcon size={20} color={colors.BgContrast} />;

  if (children) {
    return <Pressable onPress={playSound}>{children}</Pressable>;
  }

  return (
    <SecondaryButton
      isHapticFeedback
      icon={soundIcon}
      width={width}
      isOutline
      isFullWidth={!width}
      onClick={playSound}
    />
  );
};

export default SoundLetter;
