import { ReactNode } from "react";

import { View } from "react-native";

import { useThemeContext } from "../../contexts/theme/theme-context";

interface WrapperProps {
  children?: ReactNode;
}

const AppWrapper: React.FC<WrapperProps> = ({ children }) => {
  const { colors } = useThemeContext();

  return <View style={{ flex: 1, backgroundColor: colors.BgPrimary }}>{children}</View>;
};

export default AppWrapper;
