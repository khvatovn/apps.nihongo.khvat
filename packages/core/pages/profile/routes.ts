export const PROFILE_ROUTES = {
  PROFILE: "Profile",
  SETTINGS: "Settings",

  EDIT: "PROFILE_EDIT",
  EDIT_NAME: "PROFILE_EDIT_NAME",
  EDIT_PASSWORD: "PROFILE_EDIT_PASSWORD",
} as const;

export type ProfileParamList = {
  Profile: undefined;
  Settings: undefined;

  PROFILE_EDIT: undefined;
  PROFILE_EDIT_NAME: undefined;
  PROFILE_EDIT_PASSWORD: undefined;
};
