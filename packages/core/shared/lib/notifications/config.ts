const appName = process.env.APP_NAME ?? "App";

export const notificationsConfig = {
  appName,
  channels: {
    default: {
      id: process.env.NOTIFICATION_CHANNEL_DEFAULT_ID ?? "default",
      name: process.env.NOTIFICATION_CHANNEL_DEFAULT_NAME ?? `Notifications ${appName}`,
    },
    push: {
      id: process.env.NOTIFICATION_CHANNEL_PUSH_ID ?? "push",
      name: process.env.NOTIFICATION_CHANNEL_PUSH_NAME ?? `Notification ${appName}`,
    },
  },
} as const;
