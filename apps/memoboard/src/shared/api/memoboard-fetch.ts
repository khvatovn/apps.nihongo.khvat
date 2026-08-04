import { getAccessToken, refreshAccessToken } from "@nihongo/core/shared/lib/auth";

const withAuth = (init: RequestInit, token: string | null): RequestInit => ({
  ...init,
  headers: {
    ...(init.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

export const memoboardFetch = async (path: string, init: RequestInit = {}): Promise<Response> => {
  const url = `${process.env.MEMOBOARD_API}${path}`;

  const token = await getAccessToken();
  const res = await fetch(url, withAuth(init, token));

  if (res.status !== 401) return res;

  const body = await res
    .clone()
    .json()
    .catch(() => ({}) as { error?: string });
  if (body.error !== "token_expired") return res;

  const newToken = await refreshAccessToken();
  if (!newToken) return res;

  return fetch(url, withAuth(init, newToken));
};
