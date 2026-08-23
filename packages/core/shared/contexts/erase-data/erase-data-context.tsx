import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  ReactNode,
  FunctionComponent,
} from "react";

export type EraseSource = {
  clear: () => void | Promise<void>;
  getSize?: () => number;
};

interface EraseDataContextType {
  registerEraseSource: (source: EraseSource) => () => void;
  runEraseSources: () => Promise<void>;
  getSourcesSize: () => number;
}

const EraseDataContext = createContext<EraseDataContextType | null>(null);

interface EraseDataProviderProps {
  children: ReactNode;
}

export const EraseDataProvider: FunctionComponent<EraseDataProviderProps> = ({ children }) => {
  const sources = useRef(new Set<EraseSource>());

  const registerEraseSource = useCallback((source: EraseSource) => {
    sources.current.add(source);

    return () => {
      sources.current.delete(source);
    };
  }, []);

  const runEraseSources = useCallback(async () => {
    await Promise.all([...sources.current].map((source) => source.clear()));
  }, []);

  const getSourcesSize = useCallback(
    () => [...sources.current].reduce((sum, source) => sum + (source.getSize?.() ?? 0), 0),
    [],
  );

  const value = useMemo(
    () => ({ registerEraseSource, runEraseSources, getSourcesSize }),
    [registerEraseSource, runEraseSources, getSourcesSize],
  );

  return <EraseDataContext.Provider value={value}>{children}</EraseDataContext.Provider>;
};

export const useEraseDataContext = () => {
  const context = useContext(EraseDataContext);

  if (!context) throw new Error("EraseDataProvider is missing");

  return context;
};

export const useRegisterEraseSource = (source: EraseSource) => {
  const { registerEraseSource } = useEraseDataContext();

  const sourceRef = useRef(source);
  sourceRef.current = source;

  useEffect(
    () =>
      registerEraseSource({
        clear: () => sourceRef.current.clear(),
        getSize: () => sourceRef.current.getSize?.() ?? 0,
      }),
    [registerEraseSource],
  );
};
