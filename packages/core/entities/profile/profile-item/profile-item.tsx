import React from "react";

import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import { UserIcon } from "phosphor-react-native";
import { View, Text, StyleSheet, Image } from "react-native";

interface ProfileItemProps {
  avatar?: string | null;
  name: string;
  email: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ avatar, name, email }) => {
  const { colors } = useThemeContext();

  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatarImage} />
        ) : (
          <UserIcon size={32} color={colors.BgContrast} />
        )}
      </View>

      <View style={styles.desc}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

export default ProfileItem;

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 16,
    },
    avatar: {
      width: 64,
      height: 64,

      backgroundColor: colors.BgLightGray,
      borderRadius: 64,

      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    avatarImage: {
      width: 64,
      height: 64,
    },
    desc: {
      flexDirection: "column",
      justifyContent: "center",
    },
    name: {
      ...Typography.boldH3,

      color: colors.TextPrimary,
    },
    email: {
      ...Typography.regularDefault,

      color: colors.TextSecondary,
    },
  });
