import { apiFetch } from "@nihongo/core/shared/lib/api-gateway";

export const fetchRemoteConfig = async (
  language: string,
): Promise<Record<string, unknown> | null> => {
  try {
    const response = await apiFetch(`/api/conf?language=${language}`);

    if (!response.ok) return null;

    const text = await response.text();

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return null;
    }

    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return null;
    }

    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
};
