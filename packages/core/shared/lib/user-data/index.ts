import { authFetch } from "@nihongo/core/shared/lib/auth";

const USER_DATA_TIMEOUT = 15_000;

export const getUserDataField = async <T>(name: string): Promise<T | null> => {
  const res = await authFetch(`/api/v2/user/data/get/${name}`, {}, { timeout: USER_DATA_TIMEOUT });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`user_data_get_failed_${res.status}`);

  return (await res.json()) as T;
};

export const getAllUserData = async <T>(): Promise<T | null> => {
  const res = await authFetch("/api/v2/user/data/get", {}, { timeout: USER_DATA_TIMEOUT });

  if (!res.ok) throw new Error(`user_data_get_all_failed_${res.status}`);

  return (await res.json()) as T;
};

export const syncUserData = async (fields: Record<string, unknown>): Promise<void> => {
  const res = await authFetch(
    "/api/v2/user/data/sync",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    },
    { timeout: USER_DATA_TIMEOUT, failover: false },
  );

  if (!res.ok) throw new Error(`user_data_sync_failed_${res.status}`);
};
