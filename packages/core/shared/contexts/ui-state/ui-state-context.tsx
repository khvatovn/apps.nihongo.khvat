import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
  useCallback,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { UI_STATE_PREFIX } from "../../constants/storageKeys";

type UiStateValues = Record<string, unknown>;

interface UiStateContextType {
  values: UiStateValues;
  setValue: (key: string, value: unknown) => void;
}

const UiStateContext = createContext<UiStateContextType>({
  values: {},
  setValue: () => {},
});

interface UiStateProviderProps {
  children: ReactNode;
}

export const UiStateProvider: FunctionComponent<UiStateProviderProps> = ({ children }) => {
  const [values, setValues] = useState<UiStateValues>({});

  useEffect(() => {
    const hydrate = async () => {
      try {
        const keys = (await AsyncStorage.getAllKeys()).filter((key) =>
          key.startsWith(UI_STATE_PREFIX),
        );

        const entries = await AsyncStorage.multiGet(keys);

        setValues(
          Object.fromEntries(
            entries
              .filter(([, value]) => value !== null)
              .map(([key, value]) => [key.slice(UI_STATE_PREFIX.length), JSON.parse(value!)]),
          ),
        );
      } catch (error) {
        console.error("Failed to load ui state:", error);
      }
    };

    hydrate();
  }, []);

  const setValue = useCallback((key: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }));

    AsyncStorage.setItem(UI_STATE_PREFIX + key, JSON.stringify(value)).catch((error) =>
      console.error("Failed to save ui state:", key, error),
    );
  }, []);

  return <UiStateContext.Provider value={{ values, setValue }}>{children}</UiStateContext.Provider>;
};

export function usePersistedState<T>(
  key: string | undefined,
  initial: T,
): [T, (next: T | ((prev: T) => T)) => void] {
  const { values, setValue } = useContext(UiStateContext);
  const [localValue, setLocalValue] = useState<T>(initial);

  const stored = key === undefined ? undefined : values[key];
  const value = key === undefined ? localValue : stored === undefined ? initial : (stored as T);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved = typeof next === "function" ? (next as (prev: T) => T)(value) : next;

      if (key === undefined) {
        setLocalValue(resolved);
        return;
      }

      setValue(key, resolved);
    },
    [key, value, setValue],
  );

  return [value, set];
}
