import "dotenv/config";

const IS_DEV = process.env.APP_VARIANT === "development";

const name = IS_DEV ? `${process.env.APP_NAME} (Dev)` : process.env.APP_NAME;

const androidClientId = process.env.GOOGLE_OAUTH_ANDROID_CLIENT_ID;
const iosClientId = process.env.GOOGLE_OAUTH_IOS_CLIENT_ID;

const oauthRedirectUrls = [
  androidClientId &&
    `com.googleusercontent.apps.${androidClientId.split(".")[0]}://oauth2redirect/google`,
  iosClientId && `com.googleusercontent.apps.${iosClientId.split(".")[0]}://oauth2redirect/google`,
].filter(Boolean);

const config = {
  name: name,
  slug: "memoboard",
  version: process.env.VERSION,
  orientation: "default",
  githubUrl: process.env.GITHUB_LINK,
  icon: "./src/shared/assets/icon.png",
  userInterfaceStyle: "automatic",
  assetBundlePatterns: ["**/*"],
  ios: {
    appStoreUrl: process.env.APP_STORE_URL,
    supportsTablet: process.env.SUPPORT_TABLET === "true",
    userInterfaceStyle: "automatic",
    bundleIdentifier: process.env.IOS_BUNDLE_ID,
    buildNumber: process.env.BUILD_NUMBER,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/shared/assets/adaptive-icon.png",
      backgroundColor: "#1F1F1F",
    },
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON_PATH,
    package: process.env.ANDROID_PACKAGE,
    versionCode: parseInt(process.env.BUILD_NUMBER),
    blockedPermissions: ["android.permission.RECORD_AUDIO"],
    version: process.env.VERSION,
  },
  web: {
    favicon: "./src/shared/assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },
  owner: "nikkhvat",
  plugins: [
    [
      "expo-build-properties",
      {
        android: {
          newArchEnabled: true,
          edgeToEdgeEnabled: true,
        },
        ios: {
          newArchEnabled: true,
        },
      },
    ],
    "expo-font",
    "expo-audio",
    [
      "expo-splash-screen",
      {
        image: "./src/shared/assets/splash.png",
        backgroundColor: "#FFFFFF",
        dark: {
          image: "./src/shared/assets/splash-dark.png",
          backgroundColor: "#1F1F1F",
        },
        imageWidth: 200,
      },
    ],
    [
      "expo-notifications",
      {
        icon: "./src/shared/assets/notification-icon.png",
        color: "#1E1E1E",
      },
    ],
    "expo-asset",
    [
      "react-native-app-auth",
      {
        redirectUrls: oauthRedirectUrls,
      },
    ],
  ],
  runtimeVersion: {
    policy: "appVersion",
  },
  updates: {
    url: `https://u.expo.dev/${process.env.EAS_PROJECT_ID}`,
  },
};

export default config;
