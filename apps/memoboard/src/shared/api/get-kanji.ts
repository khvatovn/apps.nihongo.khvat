export interface Kanji {
  kanji: string;
  description: string | null;
  level: string | null;
  radicals: string[] | null;
  elements: string[] | null;
}

const cache = new Map<string, Promise<Kanji>>();

export const getKanji = (kanji: string): Promise<Kanji> => {
  const cached = cache.get(kanji);

  if (cached) return cached;

  const request = fetch(`${process.env.MEMOBOARD_API}/api/kanji/${encodeURIComponent(kanji)}`).then(
    async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      return (await response.json()) as Kanji;
    },
  );

  cache.set(kanji, request);

  request.catch(() => cache.delete(kanji));

  return request;
};
