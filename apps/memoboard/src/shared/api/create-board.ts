import { memoboardFetch } from "@/shared/api/memoboard-fetch";

export const createBoard = async (title: string, isPublic: boolean): Promise<string> => {
  const response = await memoboardFetch("/api/board/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content: "" }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create board: ${response.status}`);
  }

  const { id } = await response.json();

  if (isPublic) {
    await memoboardFetch("/api/board", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, content: "", public: true }),
    });
  }

  return id;
};
