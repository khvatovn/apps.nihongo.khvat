import { memoboardFetch } from "@/shared/api/memoboard-fetch";

export interface BoardMeta {
  id: string;
  title: string;
  public: boolean;
  isOwner: boolean;
  isEditor: boolean;
}

export interface EditorInfo {
  id: string;
  email: string;
}

export interface InviteInfo {
  id: string;
  createdAt: string;
  expiresAt: string;
}

export interface CreatedInvite extends InviteInfo {
  token: string;
  url: string;
}

export const getBoardMeta = async (id: string): Promise<BoardMeta> => {
  const response = await memoboardFetch(`/api/board/${id}/meta`);

  if (!response.ok) {
    throw new Error(`Failed to load board meta: ${response.status}`);
  }

  return response.json();
};

export const updateBoardMeta = async (id: string, title: string, isPublic: boolean) => {
  const response = await memoboardFetch(`/api/board/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, public: isPublic }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update board: ${response.status}`);
  }
};

export const deleteBoard = async (id: string) => {
  const response = await memoboardFetch(`/api/board/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(`Failed to delete board: ${response.status}`);
  }
};

export const getEditors = async (id: string): Promise<EditorInfo[]> => {
  const response = await memoboardFetch(`/api/board/${id}/editors`);

  if (!response.ok) {
    throw new Error(`Failed to load editors: ${response.status}`);
  }

  return (await response.json()) ?? [];
};

export const removeEditor = async (id: string, userId: string) => {
  const response = await memoboardFetch(`/api/board/${id}/editors/${userId}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(`Failed to remove editor: ${response.status}`);
  }
};

export const getInvites = async (id: string): Promise<InviteInfo[]> => {
  const response = await memoboardFetch(`/api/board/${id}/invites`);

  if (!response.ok) {
    throw new Error(`Failed to load invites: ${response.status}`);
  }

  return (await response.json()) ?? [];
};

export const createInvite = async (id: string): Promise<CreatedInvite> => {
  const response = await memoboardFetch(`/api/board/${id}/invites`, { method: "POST" });

  if (!response.ok) {
    throw new Error(`Failed to create invite: ${response.status}`);
  }

  return response.json();
};

export const revokeInvite = async (id: string, inviteId: string) => {
  const response = await memoboardFetch(`/api/board/${id}/invites/${inviteId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to revoke invite: ${response.status}`);
  }
};
