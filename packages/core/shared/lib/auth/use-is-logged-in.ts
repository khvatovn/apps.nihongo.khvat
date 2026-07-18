import { useEffect, useState } from "react";

import { getAccessToken } from "./index";

// * Залогинен ли пользователь в аккаунт (есть токен). Локальная проверка, без сети.
// * null — ещё не определили (первый рендер): вызывающий может не рендерить ничего до ответа.
export const useIsLoggedIn = (): boolean | null => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    getAccessToken().then((token) => {
      if (active) setLoggedIn(Boolean(token));
    });

    return () => {
      active = false;
    };
  }, []);

  return loggedIn;
};
