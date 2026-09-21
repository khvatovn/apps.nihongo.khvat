import { setAudioModeAsync } from "expo-audio";

setAudioModeAsync({
  playsInSilentMode: true,
  interruptionMode: "mixWithOthers",
  shouldPlayInBackground: false,
}).catch((error) => {
  console.error("Failed to configure audio mode:", error);
});
