import { memoboardFetch } from "@/shared/api/memoboard-fetch";

export interface CardPatch {
  title?: string;
  subtitle?: string;
  comments?: string[];
}

export const updateCard = async (boardId: string, cardId: string, patch: CardPatch) => {
  const response = await memoboardFetch(`/api/board/${boardId}/card/${cardId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });

  if (!response.ok) {
    throw new Error(`Failed to update card: ${response.status}`);
  }
};
