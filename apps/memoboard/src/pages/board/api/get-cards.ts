export function removeFurigana(text: string) {
  return text.replace(/\([^)]+\)/g, "");
}

export function replaceKanjiWithFurigana(text: string) {
  return text.replace(/([一-龯]+)\(([^)]+)\)/g, "$2");
}

interface ResponseLesson {
  t: string; // * Title
  g: string[]; // * Tags
  c: {
    id: string; // * Unique card id
    t: string; // * Title
    s: string; // * Subtitle
    g: string; // * Tags
    e: string[] | null; // * Examples
    i: string[] | null; // * Images
  }[]; // * Cards
}

export interface CardTag {
  label: string;
  color: {
    color: string;
    background: string;
    borderColor: string;
  };
}

export interface Card {
  id: string;
  title: string;
  subtitle: string;
  tags: CardTag[];
  examples: string[];
  index: number;

  images: string[] | null;

  // Lesson info
  lessonTitle: string;
  lessonId: number;

  // Additional fields
  titleWithoutFurigana: string;
  titleWithFurigana: string;

  subtitleNoFurigana: string;
  subtitleFurigana: string;
}

export interface BoardLesson {
  title: string;
  id: number;
  cards: Card[];
}

function decodeBitset(base64: string, tagsDictionary: string[]): string[] {
  if (!base64) {
    return [];
  }

  const bitset = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const tags: string[] = [];

  for (let i = 0; i < tagsDictionary.length && i < 56; i++) {
    const byteIdx = Math.floor(i / 8);
    const bitIdx = i % 8;
    if (bitset[byteIdx] & (1 << bitIdx)) {
      tags.push(tagsDictionary[i]);
    }
  }

  return tags;
}

const colors = {
  magenta: {
    color: "var(--magenta-color)",
    background: "var(--magenta-background)",
    borderColor: "var(--magenta-borderColor)",
  },
  red: {
    color: "var(--red-color)",
    background: "var(--red-background)",
    borderColor: "var(--red-borderColor)",
  },
  volcano: {
    color: "var(--volcano-color)",
    background: "var(--volcano-background)",
    borderColor: "var(--volcano-borderColor)",
  },
  orange: {
    color: "var(--orange-color)",
    background: "var(--orange-background)",
    borderColor: "var(--orange-borderColor)",
  },
  gold: {
    color: "var(--gold-color)",
    background: "var(--gold-background)",
    borderColor: "var(--gold-borderColor)",
  },
  lime: {
    color: "var(--lime-color)",
    background: "var(--lime-background)",
    borderColor: "var(--lime-borderColor)",
  },
  green: {
    color: "var(--green-color)",
    background: "var(--green-background)",
    borderColor: "var(--green-borderColor)",
  },
  cyan: {
    color: "var(--cyan-color)",
    background: "var(--cyan-background)",
    borderColor: "var(--cyan-borderColor)",
  },
  blue: {
    color: "var(--blue-color)",
    background: "var(--blue-background)",
    borderColor: "var(--blue-borderColor)",
  },
  geekblue: {
    color: "var(--geekblue-color)",
    background: "var(--geekblue-background)",
    borderColor: "var(--geekblue-borderColor)",
  },
  purple: {
    color: "var(--purple-color)",
    background: "var(--purple-background)",
    borderColor: "var(--purple-borderColor)",
  },
};

const savedColors: { [key: string]: string } = {
  i: "gold",
  ii: "gold",
  iii: "gold",

  な: "cyan",
  い: "cyan",

  "прил.": "blue",
  глагол: "magenta",
};

const getColors = () => {
  const keys = Object.keys(colors);

  let lastKey = keys[keys.length - 1];

  const getNewColor = () => {
    const oldKey = lastKey;

    if (lastKey === keys[keys.length - 1]) {
      lastKey = keys[0];
    } else {
      lastKey = keys[keys.indexOf(lastKey) + 1];
    }

    return { color: colors[oldKey as "magenta"], key: oldKey };
  };

  return (name: string) => {
    name = name.toLowerCase();

    if (savedColors?.[name]) {
      return colors[savedColors?.[name] as "magenta"];
    } else {
      const newColor = getNewColor();

      savedColors[name] = newColor.key;
      return newColor.color;
    }
  };
};
const colorUtil = getColors();

const count = () => {
  let counter = 0;

  return () => {
    const oldCount = counter;
    counter++;

    return oldCount;
  };
};

export const getCards = async (id: string): Promise<BoardLesson[]> => {
  const response = await fetch(`${process.env.MEMOBOARD_API}/api/board/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  const lessons: ResponseLesson[] = await response.json();
  const index = count();

  return lessons.map((lesson, i) => ({
    title: lesson.t,
    id: i,
    cards: lesson.c.map((card) => ({
      id: card.id,
      title: card.t,
      subtitle: card.s,
      tags: decodeBitset(card.g, lesson.g).map((item) => ({
        label: item.toLowerCase(),
        color: colorUtil(item),
      })),
      examples: card.e || [],
      index: index(),

      lessonTitle: lesson.t,
      lessonId: i,

      images: card.i,

      titleWithoutFurigana: removeFurigana(card.t),
      titleWithFurigana: replaceKanjiWithFurigana(card.t),

      subtitleNoFurigana: removeFurigana(card.s),
      subtitleFurigana: replaceKanjiWithFurigana(card.s),
    })),
  }));
};
