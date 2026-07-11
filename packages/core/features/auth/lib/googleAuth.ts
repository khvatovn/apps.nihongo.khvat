import { Platform } from "react-native";
import { authorize, AuthConfiguration } from "react-native-app-auth";

// * Client id по платформам (см. apps/*/.env). Не секрет — зашит в сборку.
const ANDROID_CLIENT_ID = process.env.GOOGLE_OAUTH_ANDROID_CLIENT_ID ?? "";
const IOS_CLIENT_ID = process.env.GOOGLE_OAUTH_IOS_CLIENT_ID ?? "";

// * react-native-app-auth требует client id своей платформы: на Android — Android client,
// * на iOS — iOS client. Web client id тут не подходит.
const getClientId = (): string => (Platform.OS === "ios" ? IOS_CLIENT_ID : ANDROID_CLIENT_ID);

// * Redirect = reversed client id (та же схема, что прописана в app.config.js плагином).
const buildConfig = (clientId: string): AuthConfiguration => ({
  issuer: "https://accounts.google.com",
  clientId,
  redirectUrl: `com.googleusercontent.apps.${clientId.split(".")[0]}:/oauth2redirect/google`,
  scopes: ["openid", "email", "profile"],
  usePKCE: true,
});

// * Открывает нативный Google-флоу (Custom Tab / ASWebAuthenticationSession) и возвращает
// * id_token для POST /api/v2/auth/oauth/google. Бросает "User cancelled flow" при отмене.
export const googleSignIn = async (): Promise<string> => {
  const clientId = getClientId();
  if (!clientId) throw new Error("google_client_id_missing");

  const result = await authorize(buildConfig(clientId));
  if (!result.idToken) throw new Error("google_no_id_token");

  return result.idToken;
};
