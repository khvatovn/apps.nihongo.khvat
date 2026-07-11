import {
  API_GATEWAY_CUSTOM,
  API_GATEWAY_LAST_GOOD,
} from "@nihongo/core/shared/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { getGateways } from "./gateways";
import { ping, selectFastest } from "./select";

const REQUEST_TIMEOUT = 60_000;

let current: string | null = null;
let selection: Promise<string> | null = null;
let customGateways: string[] = [];
let customGatewaysLoading: Promise<void> | null = null;

const loadCustomGateways = (): Promise<void> =>
  (customGatewaysLoading ??= AsyncStorage.getItem(API_GATEWAY_CUSTOM)
    .then((raw) => {
      customGateways = raw ? (JSON.parse(raw) as string[]) : [];
    })
    .catch(() => {
      customGateways = [];
    }));

const saveCustomGateways = (): Promise<void> =>
  AsyncStorage.setItem(API_GATEWAY_CUSTOM, JSON.stringify(customGateways));

const normalizeUrl = (url: string): string => {
  const trimmed = url.trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
};

export const getAllGateways = (): string[] => [...new Set([...getGateways(), ...customGateways])];

export const addCustomGateway = async (url: string): Promise<string[]> => {
  await loadCustomGateways();

  const normalized = normalizeUrl(url);
  if (!normalized) throw new Error("empty url");

  if (!getAllGateways().includes(normalized)) {
    customGateways = [...customGateways, normalized];
    await saveCustomGateways();
  }

  return getAllGateways();
};

export const removeCustomGateway = async (url: string): Promise<string[]> => {
  await loadCustomGateways();

  customGateways = customGateways.filter((gateway) => gateway !== url);
  await saveCustomGateways();

  if (current === url) current = null;

  return getAllGateways();
};

const setCurrent = (url: string): string => {
  current = url;
  AsyncStorage.setItem(API_GATEWAY_LAST_GOOD, url).catch(() => {});
  return url;
};

const reselect = (exclude?: string): Promise<string> =>
  (selection ??= (async () => {
    await loadCustomGateways();
    return setCurrent(await selectFastest(getAllGateways(), exclude));
  })().finally(() => {
    selection = null;
  }));

const readLastGood = async (): Promise<string | null> => {
  await loadCustomGateways();
  const lastGood = await AsyncStorage.getItem(API_GATEWAY_LAST_GOOD);
  return lastGood && getAllGateways().includes(lastGood) ? lastGood : null;
};

export const ensureSelected = async (): Promise<string> => {
  if (current) return current;

  const lastGood = await readLastGood();
  if (current) return current;
  if (lastGood) return (current = lastGood);

  return reselect();
};

export const getCurrentGateway = (): string | null => current;

export const forceSelect = async (url: string): Promise<boolean> => {
  try {
    await ping(url);
    setCurrent(url);
    return true;
  } catch {
    return false;
  }
};

export const autoSelect = (): Promise<string> => {
  current = null;
  return reselect();
};

export const refreshSelection = (): Promise<string> => reselect();

const invalidate = (deadUrl: string): Promise<string> => {
  if (current === deadUrl) current = null;
  return reselect(deadUrl);
};

const isIdempotent = (method: string = "GET"): boolean =>
  ["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase());

type ApiFetchOptions = { timeout?: number };

const request = async (
  url: string,
  init: RequestInit | undefined,
  timeout: number,
): Promise<Response> => {
  const controller = new AbortController();
  const abort = () => controller.abort();
  const timer = setTimeout(abort, timeout);

  if (init?.signal?.aborted) abort();
  init?.signal?.addEventListener("abort", abort, { once: true });

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
    init?.signal?.removeEventListener("abort", abort);
  }
};

export const apiFetch = async (
  path: string,
  init?: RequestInit,
  options?: ApiFetchOptions,
): Promise<Response> => {
  const timeout = options?.timeout ?? REQUEST_TIMEOUT;
  const base = await ensureSelected();

  try {
    const response = await request(`${base}${path}`, init, timeout);
    const shouldFailover = response.status >= 500 && isIdempotent(init?.method);
    if (!shouldFailover) return response;
  } catch (error) {
    if (init?.signal?.aborted) throw error;
  }

  const fallback = await invalidate(base);
  return request(`${fallback}${path}`, init, timeout);
};
