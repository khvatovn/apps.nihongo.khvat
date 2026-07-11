import { useEffect, useState } from "react";

import { ensureSelected } from "./gateway";

export const useGatewayUrl = (path: string): string | undefined => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    let active = true;

    ensureSelected()
      .then((base) => {
        if (active) setUrl(`${base}${path}`);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [path]);

  return url;
};
