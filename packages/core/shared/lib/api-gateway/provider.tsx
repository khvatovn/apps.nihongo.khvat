import React, { ReactNode, useEffect } from "react";

import { AppState } from "react-native";

import { ensureSelected, refreshSelection } from "./gateway";

export const ApiGatewayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    ensureSelected().catch(() => {});
    refreshSelection().catch(() => {});

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") refreshSelection().catch(() => {});
    });

    return () => subscription.remove();
  }, []);

  return <>{children}</>;
};
