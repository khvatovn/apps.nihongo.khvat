import { apiFetch } from "@nihongo/core/shared/lib/api-gateway";

// * Ответы auth-эндпоинтов (docs/auth/auth_api.md). Поля опциональны — на ошибках их нет.
export type AuthResponseBody = {
  access_token?: string;
  refresh_token?: string;
  region?: string;
  error?: string;
};

// * Единый результат: экраны ветвятся по ok/status, как и раньше, но без дублирования fetch.
export type ApiResult<T = AuthResponseBody> = {
  ok: boolean;
  status: number;
  body: T;
};

const postJson = async (path: string, payload: unknown): Promise<ApiResult> => {
  const res = await apiFetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}) as AuthResponseBody);
  return { ok: res.ok, status: res.status, body };
};

export const signInWithEmail = (email: string, password: string) =>
  postJson("/api/v2/auth/sign-in", { email, password });

export type SignUpPayload = {
  email: string;
  password: string;
  name: string;
  date_of_birth: string;
};

export const signUpWithEmail = (payload: SignUpPayload) =>
  postJson("/api/v2/auth/sign-up", payload);

export const verifyEmail = (email: string, code: string, region: string) =>
  postJson("/api/v2/auth/verify-email", { email, code, region });

export const resendVerification = (email: string, region: string) =>
  postJson("/api/v2/auth/resend-verification", { email, region });

export const oauthGoogle = (idToken: string) =>
  postJson("/api/v2/auth/oauth/google", { id_token: idToken });
