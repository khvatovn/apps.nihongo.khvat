import { ACCESS_TOKEN, REFRESH_TOKEN } from "@nihongo/core/shared/constants/storageKeys";
import { apiFetch } from "@nihongo/core/shared/lib/api-gateway";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAccessToken = () => AsyncStorage.getItem(ACCESS_TOKEN);
export const getRefreshToken = () => AsyncStorage.getItem(REFRESH_TOKEN);

export const saveTokens = (access: string, refresh: string) =>
  AsyncStorage.multiSet([
    [ACCESS_TOKEN, access],
    [REFRESH_TOKEN, refresh],
  ]);

export const clearTokens = () => AsyncStorage.multiRemove([ACCESS_TOKEN, REFRESH_TOKEN]);

let refreshing: Promise<string | null> | null = null;

const doRefresh = (): Promise<string | null> => {
  if (refreshing) return refreshing;

  refreshing = (async () => {
    try {
      const refresh = await getRefreshToken();
      if (!refresh) return null;

      const res = await apiFetch("/api/v2/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refresh }),
      });

      if (!res.ok) {
        await clearTokens();
        return null;
      }

      const data = await res.json();
      await saveTokens(data.access_token, data.refresh_token);
      return data.access_token as string;
    } catch {
      return null;
    } finally {
      refreshing = null;
    }
  })();

  return refreshing;
};

const withAuth = (init: RequestInit, token: string | null): RequestInit => ({
  ...init,
  headers: {
    ...(init.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

export const authFetch = async (path: string, init: RequestInit = {}): Promise<Response> => {
  const token = await getAccessToken();
  const res = await apiFetch(path, withAuth(init, token));

  if (res.status !== 401) return res;

  const body = await res
    .clone()
    .json()
    .catch(() => ({}) as { error?: string });
  if (body.error !== "token_expired") return res;

  const newToken = await doRefresh();
  if (!newToken) return res;

  return apiFetch(path, withAuth(init, newToken));
};

export const logout = async (): Promise<void> => {
  const refresh = await getRefreshToken();
  try {
    if (refresh) {
      await authFetch("/api/v2/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refresh }),
      });
    }
  } catch {
    console.log("error auth/logout");
  } finally {
    await clearTokens();
  }
};

export type Profile = {
  name: string;
  email: string;
  avatar_url: string;
};

export const getProfile = async (): Promise<Profile | null> => {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const res = await authFetch("/api/v2/profile");
    if (!res.ok) return null;
    return (await res.json()) as Profile;
  } catch {
    return null;
  }
};
