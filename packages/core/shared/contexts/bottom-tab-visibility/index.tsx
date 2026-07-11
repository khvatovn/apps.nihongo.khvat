import React, { createContext, useContext, useState, ReactNode } from "react";

export interface BottomTabVisibilityContextType {
  isVisible: boolean;
  toggleVisibility: () => void;
  show: () => void;
  hide: () => void;
}

const BottomTabVisibilityContext = createContext<BottomTabVisibilityContextType>({
  isVisible: true,
  toggleVisibility: () => {},
  show: () => {},
  hide: () => {},
});

export const useBottomTabVisibility = () => useContext(BottomTabVisibilityContext);

interface BottomTabVisibilityProviderProps {
  children: ReactNode;
}

export const BottomTabVisibilityProvider: React.FC<BottomTabVisibilityProviderProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  return (
    <BottomTabVisibilityContext.Provider value={{ isVisible, toggleVisibility, show, hide }}>
      {children}
    </BottomTabVisibilityContext.Provider>
  );
};
