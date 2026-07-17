import React, { useEffect, useState } from "react";

import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { Typography } from "@nihongo/core/shared/typography";
import PageTitle from "@nihongo/core/shared/ui/page-title/page-title";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from "react-native";

import { RootStackParamList, ROUTES } from "@/app/routes.types";

interface Board {
  id: string;
  title: string;
}

interface Boards {
  myBoards: Board[];
  publicBoards: Board[];
}

type BoardsNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.WELCOME>;

const BoardsPage: React.FC = () => {
  const navigation = useNavigation<BoardsNavigationProp>();

  const [boards, setBoards] = useState<Boards>({ myBoards: [], publicBoards: [] });

  const getBoards = async () => {
    const response = await fetch(`${process.env.MEMOBOARD_API}/api/boards`);

    const body = await response.json();

    if (response.status === 200) {
      setBoards(body);
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  const { colors } = useThemeContext();

  const styles = makeStyles(colors);

  const { t } = useTranslation();

  const goToBoards = (id: string, name: string) => {
    navigation.navigate(ROUTES.BOARD, { id, name });
  };

  return (
    <View style={styles.container}>
      <PageTitle isSaveArea>{t("boards.title")}</PageTitle>

      <ScrollView contentContainerStyle={styles.scroll}>
        {boards.myBoards.map((board) => (
          <Pressable
            onPress={() => goToBoards(board.id, board.title)}
            style={styles.board}
            key={board.id}
          >
            <Text style={styles.boardTitle}>{board.title}</Text>
          </Pressable>
        ))}

        {boards.publicBoards.map((board) => (
          <Pressable
            onPress={() => goToBoards(board.id, board.title)}
            style={styles.board}
            key={board.id}
          >
            <Text style={styles.boardTitle}>{board.title}</Text>
          </Pressable>
        ))}

        <Pressable
          style={styles.board}
          onPress={() => {
            Linking.openURL(`${process.env.MEMOBOARD_API}/`);
          }}
        >
          <Text style={styles.boardTitle}>{t("boards.createOwn")}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BgPrimary,
    },
    scroll: {
      gap: 16,
      paddingBottom: 32,
      paddingHorizontal: 16,
    },
    title: {
      ...Typography.boldH3,

      color: colors.TextPrimary,
    },
    board: {
      backgroundColor: colors.BgSecondary,
      padding: 12,
      borderRadius: 12,
    },
    boardTitle: {
      color: colors.TextPrimary,

      ...Typography.regularLabel,
    },
  });

export default BoardsPage;
