import React, {
  createContext,
  useCallback,
  useContext,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
  ReactNode,
  FunctionComponent,
} from "react";

import { removeFurigana } from "@nihongo/core/shared/lib/furigana/remove-furigana";
import { replaceKanjiWithFurigana } from "@nihongo/core/shared/lib/furigana/replace-kanji-with-furigana";
import { useTranslation } from "react-i18next";
import { useWindowDimensions } from "react-native";

import { BoardLesson, Card, getCards } from "@/shared/api/get-cards";

export interface BoardSection {
  title: string;
  data: Card[][];
}

interface BoardContextType {
  boardId: string | null;
  isLoading: boolean;
  loadBoard: (id: string) => Promise<void>;

  sections: BoardSection[];
  cards: Card[];
  hasQuery: boolean;

  query: string;
  setQuery: (query: string) => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  currentCard: Card | null;
  selectCard: (card: Card) => void;
  next: () => void;
  prev: () => void;
  hasNext: boolean;
  hasPrev: boolean;

  registerScrollToSection: (handler: (sectionIndex: number) => void) => void;
  scrollToSection: (sectionIndex: number) => void;
}

const BoardContext = createContext<BoardContextType | null>(null);

// const CARDS_IN_ROW = 3;

const chunk = (cards: Card[], size: number): Card[][] =>
  cards.reduce<Card[][]>((result, card, index) => {
    if (index % size === 0) {
      result.push([]);
    }

    result[result.length - 1].push(card);
    return result;
  }, []);

// * Все варианты написания одной строки: как есть (来(く)る), только кандзи (来る), только чтение (くる)
const spellings = (text: string) => [text, removeFurigana(text), replaceKanjiWithFurigana(text)];

// * Одна строка на карточку, по которой идёт поиск: title/subtitle в трёх написаниях,
// * теги, примеры и все формы глагола
const buildHaystack = (card: Card) =>
  [
    ...spellings(card.title),
    ...spellings(card.subtitle),
    ...card.tags.map((tag) => tag.label),
    ...card.examples,
    ...card.verbForms.flatMap((form) => spellings(form.value)),
  ]
    .join(" ")
    .toLowerCase();

interface BoardProviderProps {
  children: ReactNode;
}

export const BoardProvider: FunctionComponent<BoardProviderProps> = ({ children }) => {
  const { t } = useTranslation();

  const { width } = useWindowDimensions();

  const [lessons, setLessons] = useState<BoardLesson[]>([]);
  const [boardId, setBoardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [currentCardId, setCurrentCardId] = useState<string | null>(null);

  const deferredQuery = useDeferredValue(query);
  const search = deferredQuery.trim().toLowerCase();

  const loadBoard = useCallback(async (id: string) => {
    setIsLoading(true);
    setBoardId(id);

    try {
      setLessons(await getCards(id));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const haystacks = useMemo(() => {
    const map = new Map<string, string>();

    for (const lesson of lessons) {
      for (const card of lesson.cards) {
        map.set(card.id, buildHaystack(card));
      }
    }

    return map;
  }, [lessons]);

  const filteredLessons = useMemo(() => {
    if (!search) return lessons;

    return lessons
      .map((lesson) => ({
        ...lesson,
        cards: lesson.cards.filter((card) => haystacks.get(card.id)?.includes(search)),
      }))
      .filter((lesson) => lesson.cards.length > 0);
  }, [lessons, haystacks, search]);

  const cards = useMemo(() => filteredLessons.flatMap((lesson) => lesson.cards), [filteredLessons]);

  const sections = useMemo(() => {
    if (search) {
      return cards.length > 0
        ? [{ title: t("board.searchResults"), data: chunk(cards, Math.round(width / 120)) }]
        : [];
    }

    return filteredLessons.map((lesson) => ({
      title: lesson.title,
      data: chunk(lesson.cards, Math.round(width / 120)),
    }));
  }, [search, filteredLessons, cards, t, width]);

  const cardsRef = useRef<Card[]>(cards);
  cardsRef.current = cards;

  const currentIndex = useMemo(
    () => cards.findIndex((card) => card.id === currentCardId),
    [cards, currentCardId],
  );

  const selectCard = useCallback((card: Card) => setCurrentCardId(card.id), []);

  const step = useCallback((offset: number) => {
    setCurrentCardId((id) => {
      const list = cardsRef.current;
      const index = list.findIndex((card) => card.id === id);
      const target = index + offset;

      return index === -1 || target < 0 || target > list.length - 1 ? id : list[target].id;
    });
  }, []);

  const next = useCallback(() => step(1), [step]);
  const prev = useCallback(() => step(-1), [step]);

  const scrollHandlerRef = useRef<(sectionIndex: number) => void>(() => {});

  const registerScrollToSection = useCallback((handler: (sectionIndex: number) => void) => {
    scrollHandlerRef.current = handler;
  }, []);

  const scrollToSection = useCallback(
    (sectionIndex: number) => scrollHandlerRef.current(sectionIndex),
    [],
  );

  const openSearch = useCallback(() => setIsSearchOpen(true), []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setQuery("");
  }, []);

  const value = useMemo(
    () => ({
      boardId,
      isLoading,
      loadBoard,

      sections,
      cards,
      hasQuery: search.length > 0,

      query,
      setQuery,
      isSearchOpen,
      openSearch,
      closeSearch,

      currentCard: currentIndex === -1 ? null : cards[currentIndex],
      selectCard,
      next,
      prev,
      hasPrev: currentIndex > 0,
      hasNext: currentIndex !== -1 && currentIndex < cards.length - 1,

      registerScrollToSection,
      scrollToSection,
    }),
    [
      boardId,
      isLoading,
      loadBoard,
      sections,
      cards,
      search,
      query,
      isSearchOpen,
      openSearch,
      closeSearch,
      currentIndex,
      selectCard,
      next,
      prev,
      registerScrollToSection,
      scrollToSection,
    ],
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};

export const useBoard = () => {
  const context = useContext(BoardContext);

  if (!context) throw new Error("useBoard must be used within BoardProvider");

  return context;
};
