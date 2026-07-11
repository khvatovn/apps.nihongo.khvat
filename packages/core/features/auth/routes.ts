export const AUTH_ROUTES = {
  WELCOME: "WelcomePage",
  PREVIEW: "AUTH_PREVIEW",
  SIGN_UP: "SIGN_UP_PAGE",
  SIGN_IN: "SIGN_IN_PAGE",
  SUBMIT_CODE: "SUBMIT_CODE",
} as const;

export type SubmitCodeParams = { email: string; region: string };

export type AuthParamList = {
  WelcomePage: undefined;
  AUTH_PREVIEW: undefined;
  SIGN_UP_PAGE: undefined;
  SIGN_IN_PAGE: undefined;
  SUBMIT_CODE: SubmitCodeParams;
};
