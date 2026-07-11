import "dotenv/config";

const IS_DEV = process.env.APP_VARIANT === "development";

const name = IS_DEV ? `${process.env.APP_NAME} (Dev)` : process.env.APP_NAME;

// * Redirect-схема для Google OAuth = reversed client id.
// * 268156862431-xxxx.apps.googleusercontent.com -> com.googleusercontent.apps.268156862431-xxxx
// * Схема намеренно отличается от deep-link навигации, чтобы не конфликтовать intent-filter.
// * ВАЖНО: плагин react-native-app-auth вырезает схему через redirectUrls[0].split('://')[0],
// * поэтому отдаём ему URL с ДВОЙНЫМ слешем (иначе в манифест попадёт вся строка как схема).
// * Рантайм-redirect в googleAuth.ts — каноничный одинарный слеш (:/), матчинг идёт по схеме.
const androidClientId = process.env.GOOGLE_OAUTH_ANDROID_CLIENT_ID;
const iosClientId = process.env.GOOGLE_OAUTH_IOS_CLIENT_ID;

const oauthRedirectUrls = [
  androidClientId &&
    `com.googleusercontent.apps.${androidClientId.split(".")[0]}://oauth2redirect/google`,
  iosClientId && `com.googleusercontent.apps.${iosClientId.split(".")[0]}://oauth2redirect/google`,
].filter(Boolean);

const config = {
  name: name,
  slug: "kana-master",
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
      projectId: "0c96ff0c-f16f-48ba-ac2f-b768df7666c3",
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
    url: "https://u.expo.dev/0c96ff0c-f16f-48ba-ac2f-b768df7666c3",
  },
};

export default config;
