import { apiFetch } from "@nihongo/core/shared/lib/api-gateway";

// * Ответы auth-эндпоинтов (docs/auth/auth_api.md). Поля опциональны — на ошибках их нет.
export type AuthResponseBody = {
  access_token?: string;
  refresh_token?: string;
  region?: string;
  reset_token?: string;
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

// * Сброс пароля (docs/auth/reset_password.md). region приходит с forgot и прокидывается дальше.
// * forgot всегда 200 { region } — анти-энумерация (не раскрываем, есть ли такой email).
export const requestPasswordReset = (email: string) =>
  postJson("/api/v2/auth/password/forgot", { email });

// * Проверяет код и выдаёт одноразовый reset_token (TTL 10 мин).
export const verifyResetCode = (email: string, code: string, region: string) =>
  postJson("/api/v2/auth/password/verify-code", { email, code, region });

// * Повторная отправка кода (cooldown 45с на сервере) → 204.
export const resendResetCode = (email: string, region: string) =>
  postJson("/api/v2/auth/password/resend", { email, region });

// * Меняет пароль по reset_token и авто-логинит: 200 { access_token, refresh_token }.
export const resetPassword = (
  email: string,
  region: string,
  resetToken: string,
  newPassword: string,
) =>
  postJson("/api/v2/auth/password/reset", {
    email,
    region,
    reset_token: resetToken,
    new_password: newPassword,
  });
