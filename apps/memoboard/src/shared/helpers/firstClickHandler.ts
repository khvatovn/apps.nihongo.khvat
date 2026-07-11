import { useRef, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFirstClickHandler<T extends (...args: any[]) => void>(
  action: T,
  lockTimeMs: number = 300,
): T {
  const lockedRef = useRef(false);

  return useCallback(
    (...args: Parameters<T>) => {
      if (lockedRef.current) return;
      lockedRef.current = true;

      action(...args);

      setTimeout(() => {
        lockedRef.current = false;
      }, lockTimeMs);
    },
    [action, lockTimeMs],
  ) as T;
}
