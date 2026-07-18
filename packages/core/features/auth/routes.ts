export const AUTH_ROUTES = {
  WELCOME: "WelcomePage",
  PREVIEW: "AUTH_PREVIEW",
  SIGN_UP: "SIGN_UP_PAGE",
  SIGN_IN: "SIGN_IN_PAGE",
  SUBMIT_CODE: "SUBMIT_CODE",

  RESET_PASSWORD_ASK_EMAIL: "RESET_PASSWORD_ASK_EMAIL",
  RESET_PASSWORD_SUBMIT_CODE: "RESET_PASSWORD_SUBMIT_CODE",
  RESET_PASSWORD_CONFIRM: "RESET_PASSWORD_CONFIRM",
} as const;

export type SubmitCodeParams = { email: string; region: string };

// * Экран смены пароля: email+region нужны для запроса, resetToken выдан на шаге verify-code.
export type ResetPasswordConfirmParams = {
  email: string;
  region: string;
  resetToken: string;
};

export type AuthParamList = {
  WelcomePage: undefined;
  AUTH_PREVIEW: undefined;
  SIGN_UP_PAGE: undefined;
  SIGN_IN_PAGE: undefined;
  SUBMIT_CODE: SubmitCodeParams;

  RESET_PASSWORD_ASK_EMAIL: undefined;
  RESET_PASSWORD_SUBMIT_CODE: SubmitCodeParams;
  RESET_PASSWORD_CONFIRM: ResetPasswordConfirmParams;
};
