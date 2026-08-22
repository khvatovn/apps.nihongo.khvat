import { ACCESS_TOKEN, REFRESH_TOKEN } from "@nihongo/core/shared/constants/storageKeys";
import { apiFetch, ApiFetchOptions } from "@nihongo/core/shared/lib/api-gateway";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { File as FileSystemFile } from "expo-file-system";

export const getAccessToken = () => AsyncStorage.getItem(ACCESS_TOKEN);
export const getRefreshToken = () => AsyncStorage.getItem(REFRESH_TOKEN);

export const saveTokens = (access: string, refresh: string) =>
  AsyncStorage.multiSet([
    [ACCESS_TOKEN, access],
    [REFRESH_TOKEN, refresh],
  ]);

export const clearTokens = () => AsyncStorage.multiRemove([ACCESS_TOKEN, REFRESH_TOKEN]);

let refreshing: Promise<string | null> | null = null;

export const refreshAccessToken = (): Promise<string | null> => {
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

export const authFetch = async (
  path: string,
  init: RequestInit = {},
  options?: ApiFetchOptions,
): Promise<Response> => {
  const token = await getAccessToken();
  const res = await apiFetch(path, withAuth(init, token), options);

  if (res.status !== 401) return res;

  const body = await res
    .clone()
    .json()
    .catch(() => ({}) as { error?: string });
  if (body.error !== "token_expired") {
    return res;
  }

  const newToken = await refreshAccessToken();
  if (!newToken) return res;

  return apiFetch(path, withAuth(init, newToken), options);
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

export type AccountActionResult = { ok: boolean; status: number; error?: string };

const readError = async (res: Response): Promise<string | undefined> => {
  if (res.status === 204) return undefined;
  const body = await res.json().catch(() => ({}) as { error?: string });
  return body.error;
};

export const requestAccountDeletion = async (): Promise<AccountActionResult> => {
  const res = await authFetch("/api/v2/auth/account/request-deletion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return { ok: res.ok, status: res.status, error: await readError(res) };
};

export const deleteAccount = async (code: string): Promise<AccountActionResult> => {
  const res = await authFetch("/api/v2/auth/account", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  const error = await readError(res);
  return { ok: res.ok || error === "user_not_found", status: res.status, error };
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

export type UpdateProfileResult = AccountActionResult & { profile?: Profile };

const PROFILE_WRITE_TIMEOUT = 15_000;
const AVATAR_UPLOAD_TIMEOUT = 30_000;

export const updateProfile = async (
  fields: {
    name?: string;
    avatar_url?: string;
  },
  signal?: AbortSignal,
): Promise<UpdateProfileResult> => {
  const res = await authFetch(
    "/api/v2/profile",
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
      signal,
    },
    { timeout: PROFILE_WRITE_TIMEOUT, failover: false },
  );

  const { data } = await readResponseBody(res);

  if (!res.ok) {
    return { ok: false, status: res.status, error: data.error };
  }

  return { ok: true, status: res.status, profile: data as Profile };
};

const readResponseBody = async (
  res: Response,
): Promise<{ raw: string; data: Partial<Profile> & { error?: string } }> => {
  const raw = await res.text().catch(() => "");

  try {
    return { raw, data: JSON.parse(raw) };
  } catch {
    return { raw, data: {} };
  }
};

export type AvatarFile = { uri: string; name: string; type: string };

export const uploadAvatar = async (
  file: AvatarFile,
  signal?: AbortSignal,
): Promise<UpdateProfileResult> => {
  const form = new FormData();

  const source = new FileSystemFile(file.uri);
  form.append("file", source as unknown as Blob);

  const res = await authFetch(
    "/api/v2/profile/avatar",
    { method: "POST", body: form, signal },
    { timeout: AVATAR_UPLOAD_TIMEOUT, failover: false },
  );

  const { data } = await readResponseBody(res);

  if (!res.ok) return { ok: false, status: res.status, error: data.error };

  return { ok: true, status: res.status, profile: data as Profile };
};

export const removeAvatar = (signal?: AbortSignal): Promise<UpdateProfileResult> =>
  updateProfile({ avatar_url: "" }, signal);

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
): Promise<AccountActionResult> => {
  const res = await authFetch("/api/v2/auth/password/change", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
  });

  return { ok: res.ok, status: res.status, error: await readError(res) };
};
