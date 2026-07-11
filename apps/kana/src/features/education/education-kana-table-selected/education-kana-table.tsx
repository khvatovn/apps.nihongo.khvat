import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useHaptic } from "@nihongo/core/shared/contexts/haptic/haptic-context";
import { useThemeContext } from "@nihongo/core/shared/contexts/theme/theme-context";
import {
  base,
  dakuon,
  handakuon,
  yoon,
  ILetter,
  yoonFlatLettersId,
  handakuonFlatLettersId,
  dakuonFlatLettersId,
  baseFlatLettersId,
} from "@nihongo/core/shared/data/lettersTable";
import useGetRomaji from "@nihongo/core/shared/lib/i18n/hooks/useKey";
import { ChecksIcon, MinusIcon, PlusIcon, XIcon } from "phosphor-react-native";
import { View, StyleSheet, useWindowDimensions, FlatList } from "react-native";

import { DefaultCell } from "@/entities/kana/cell/dafault-cell/dafault-cell";
import { PlusCell } from "@/entities/kana/cell/plus-cell/plus-cell";
import { useKanaContext } from "@/pages/kana/kana-table-choice-letters-page/model/hooks";
import { Alphabet, KanaAlphabet, KanaSection, LETTERS_COUNT } from "@/shared/constants/kana";
import getKana from "@/shared/helpers/getKanaKey";

interface EducationKanaTableProps {
  kana: KanaAlphabet.Hiragana | KanaAlphabet.Katakana;
  alphabetType: Alphabet;
  last?: boolean;
}
interface RowData {
  key: string;
  rowIndex: number;
  activeInRow: boolean;
  items: {
    isActive: boolean;
    letter: ILetter;
    title: string;
    subtitle: string;
  }[];
}

const getKanaSectionKey = (alphabetType: Alphabet, kana: KanaAlphabet): KanaSection => {
  const map = {
    base: { hiragana: KanaSection.BasicHiragana, katakana: KanaSection.BasicKatakana },
    dakuon: { hiragana: KanaSection.DakuonHiragana, katakana: KanaSection.DakuonKatakana },
    handakuon: { hiragana: KanaSection.HandakuonHiragana, katakana: KanaSection.HandakuonKatakana },
    yoon: { hiragana: KanaSection.YoonHiragana, katakana: KanaSection.YoonKatakana },
  };
  return map[alphabetType][kana];
};

const getKanaData = (alphabetType: Alphabet): ILetter[][] => {
  return {
    base,
    dakuon,
    handakuon,
    yoon,
  }[alphabetType];
};

const normalizeRow = (row: ILetter[]): (ILetter | null)[] => {
  if (row[0]?.hi === "や") return [row[0], null, row[1], null, row[2]];
  if (row[0]?.hi === "わ") return [row[0], null, null, null, row[1]];
  if (row[0]?.hi === "ん") return [null, null, row[0], null, null];
  return row;
};

const EducationKanaTableSelected: React.FC<EducationKanaTableProps> = ({
  kana,
  alphabetType,
  last,
}) => {
  const { width, height } = useWindowDimensions();
  const { colors } = useThemeContext();
  const { getRomaji } = useGetRomaji();
  const { triggerHaptic } = useHaptic();

  const isTablet = width > 750;

  const { selected: selectedFromStorage, fill } = useKanaContext();
  const selectedLetters = selectedFromStorage[alphabetType][kana];

  const allIds =
    alphabetType === "base"
      ? baseFlatLettersId
      : alphabetType === "dakuon"
        ? dakuonFlatLettersId
        : alphabetType === "handakuon"
          ? handakuonFlatLettersId
          : yoonFlatLettersId;

  const data = useMemo(() => getKanaData(alphabetType), [alphabetType]);

  const selectedRef = useRef<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(() => new Set());

  const setSelectedWithRef = (updater: (prev: Set<string>) => Set<string>) => {
    setSelected((prev) => {
      const next = updater(prev);
      selectedRef.current = next;
      return next;
    });
  };

  useEffect(() => {
    const initial = new Set(selectedLetters);
    setSelected(initial);
    selectedRef.current = initial;

    return () => {
      const sectionKey = getKanaSectionKey(alphabetType, kana);
      fill([...selectedRef.current], sectionKey);
    };
  }, [kana, alphabetType, selectedLetters, fill]);

  const letters = useMemo(() => {
    if (!data) return [];

    return data.map((row) => {
      const normalized = normalizeRow(row);
      const items = normalized.map((item) => ({
        active: !item ? true : item ? selected.has(item.id) : false,
        data: item,
      }));
      const activeInRow = items.every((item) => item.active);
      return { items, activeInRow };
    });
  }, [data, selected]);

  const isKanaSelected = (): boolean => {
    const section = getKanaSectionKey(alphabetType, kana);
    return selectedFromStorage[alphabetType][kana].length === LETTERS_COUNT[section];
  };

  const onPlus = useCallback(
    (target: "row" | "cell", index: number, alphabet: Alphabet) => {
      const data = getKanaData(alphabet);
      const letters =
        target === "row"
          ? (normalizeRow(data[index]).filter(Boolean) as ILetter[])
          : data.flatMap((row) => {
              const normalized = normalizeRow(row);
              return normalized[index] ? [normalized[index]] : [];
            });

      const allSelected = letters.every((l) => selected.has(l.id));

      letters.forEach((item) => {
        setSelectedWithRef((prev) => {
          const next = new Set(prev);
          if (allSelected) {
            if (next.has(item.id)) next.delete(item.id);
          } else {
            if (!next.has(item.id)) next.add(item.id);
          }
          return next;
        });
      });
    },
    [selected],
  );

  const onSelectAll = useCallback(() => {
    setSelectedWithRef((_) => new Set(allIds));
  }, [allIds]);

  const clearAll = useCallback(() => {
    setSelectedWithRef((_) => new Set());
  }, []);

  const isSelected = isKanaSelected();

  const DATA: RowData[] = letters.map((row, rowIndex) => ({
    key: `${rowIndex}`,
    rowIndex,
    activeInRow: row.activeInRow,
    items: row.items.map((item) => ({
      isActive: item.active,
      letter: item.data!,
      title: item.data ? getKana(item.data, kana) : "",
      subtitle: item.data ? getRomaji(item.data)?.toUpperCase() : "",
    })),
  }));

  const chooseAllIcon = isSelected ? (
    <XIcon size={20} color={colors.BgContrast} />
  ) : (
    <ChecksIcon size={20} color={colors.BgContrast} />
  );

  return (
    <View
      style={[
        styles.container,
        { borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.BorderDefault },
      ]}
    >
      <View style={styles.rowButtons}>
        {alphabetType !== "handakuon" && (
          <PlusCell
            screenWidth={width}
            screenHeight={height}
            isTablet={isTablet}
            onPress={() => {
              triggerHaptic();

              if (allIds.length === selected.size) {
                clearAll();
              } else {
                onSelectAll();
              }
            }}
            colors={colors}
            active={isSelected}
            isStartOfLine={chooseAllIcon}
          />
        )}

        {alphabetType !== "handakuon" &&
          letters[0]?.items.map((_, cellIndex) => (
            <PlusCell
              screenWidth={width}
              screenHeight={height}
              isTablet={isTablet}
              isLong={alphabetType === "yoon"}
              key={`plus-${cellIndex}`}
              onPress={() => {
                triggerHaptic();
                onPlus("cell", cellIndex, alphabetType);
              }}
              colors={colors}
              active={letters.every((r) => r.items[cellIndex]?.active)}
              isStartOfLine={
                letters.every((r) => r.items[cellIndex]?.active) ? (
                  <MinusIcon size={20} color={colors.BgContrast} />
                ) : (
                  <PlusIcon size={20} color={colors.BgContrast} />
                )
              }
            />
          ))}
      </View>

      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={styles.rowButtons} key={item.key}>
            <PlusCell
              screenWidth={width}
              screenHeight={height}
              isTablet={isTablet}
              onPress={() => {
                triggerHaptic();
                onPlus("row", item.rowIndex, alphabetType);
              }}
              colors={colors}
              active={item.activeInRow}
              isStartOfLine={
                item.activeInRow ? (
                  <MinusIcon size={20} color={colors.BgContrast} />
                ) : (
                  <PlusIcon size={20} color={colors.BgContrast} />
                )
              }
            />

            {item.items.map((cell, i) => (
              <DefaultCell
                screenWidth={width}
                screenHeight={height}
                isTablet={isTablet}
                key={`${item.rowIndex}-${i}`}
                onPress={() => {
                  if (!cell.letter) return;

                  triggerHaptic();

                  setSelectedWithRef((prev) => {
                    const next = new Set(prev);
                    if (next.has(cell.letter.id)) next.delete(cell.letter.id);
                    else next.add(cell.letter.id);
                    return next;
                  });
                }}
                isLong={alphabetType === "yoon"}
                active={selected.has(cell.letter?.id)}
                colors={colors}
                id={cell.letter?.id}
                title={cell.title}
                subtitle={cell.subtitle}
              />
            ))}
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default EducationKanaTableSelected;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16,
    marginBottom: 30,
    paddingBottom: 30,
  },
  rowButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 9,
    marginTop: 10,
  },
});
