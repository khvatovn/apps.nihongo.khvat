import React from "react";

import { ColorsType, useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import { usePersistedState } from "@nihongo/core/shared/contexts/ui-state/ui-state-context";
import { Typography } from "@nihongo/core/shared/typography";
import Section from "@nihongo/core/shared/ui/section";
import { SelectionIcon, SelectionSlashIcon } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Pressable } from "react-native";

import { Card, removeFurigana } from "@/shared/api/get-cards";
import Furigana from "@/shared/ui/furigana/furigana";

interface ExamplesProps {
  card: Card;
}

const Examples: React.FC<ExamplesProps> = ({ card }) => {
  const { colors } = useThemeContext();
  const styles = makeStyles(colors);

  const { t } = useTranslation();

  const [showFurigana, isShowFurigana] = usePersistedState(
    "memoboard.card.examples.furigana",
    true,
  );

  const examplesFurigana = card.examples.every((item) => item !== removeFurigana(item));

  return (
    <View>
      {card.examples.length > 0 && (
        <Section
          title={t("card.examples")}
          stateKey="memoboard.card.examples.show"
          buttons={[
            examplesFurigana ? (
              <Pressable key={"eye_btn"} onPress={() => isShowFurigana((prev) => !prev)}>
                {showFurigana ? (
                  <SelectionSlashIcon color={colors.TextContrastPrimary} />
                ) : (
                  <SelectionIcon color={colors.TextContrastPrimary} />
                )}
              </Pressable>
            ) : (
              <></>
            ),
          ]}
        >
          <View style={styles.list}>
            {card.examples.map((example) => (
              <View style={styles.item} key={example}>
                <Furigana
                  text={showFurigana ? example : removeFurigana(example)}
                  typography={Typography.regularDefault}
                  typographyFurigana={Typography.regularCaption}
                />
              </View>
            ))}
          </View>
        </Section>
      )}
    </View>
  );
};

const makeStyles = (colors: ColorsType) =>
  StyleSheet.create({
    list: {
      flexDirection: "column",
      gap: 6,
    },
    item: {
      backgroundColor: colors.BgSecondary,
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 4,
    },
  });

export default Examples;
