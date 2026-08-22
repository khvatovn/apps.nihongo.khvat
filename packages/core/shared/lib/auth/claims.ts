import { getAccessToken } from "./index";

export type AccessClaims = {
  email?: string;
  region?: string;
  verified?: boolean;
  exp?: number;
};

const BASE64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// * В Hermes нет atob, а зависимость ради одного клейма не нужна — декодируем сами.
const base64UrlToBytes = (input: string): number[] => {
  const bytes: number[] = [];

  let buffer = 0;
  let bits = 0;

  for (const char of input) {
    if (char === "=") break;

    const value = BASE64_ALPHABET.indexOf(char === "-" ? "+" : char === "_" ? "/" : char);
    if (value < 0) continue;

    buffer = (buffer << 6) | value;
    bits += 6;

    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >> bits) & 0xff);
    }
  }

  return bytes;
};

const bytesToUtf8 = (bytes: number[]): string => {
  let result = "";

  for (let i = 0; i < bytes.length; i += 1) {
    const byte = bytes[i];

    let codePoint: number;
    let extra: number;

    if (byte < 0x80) {
      codePoint = byte;
      extra = 0;
    } else if (byte >= 0xc0 && byte < 0xe0) {
      codePoint = byte & 0x1f;
      extra = 1;
    } else if (byte >= 0xe0 && byte < 0xf0) {
      codePoint = byte & 0x0f;
      extra = 2;
    } else if (byte >= 0xf0) {
      codePoint = byte & 0x07;
      extra = 3;
    } else {
      continue;
    }

    for (let j = 0; j < extra; j += 1) {
      const next = bytes[i + 1 + j];
      if (next === undefined) return result;
      codePoint = (codePoint << 6) | (next & 0x3f);
    }
    i += extra;

    if (codePoint > 0xffff) {
      const offset = codePoint - 0x10000;
      result += String.fromCharCode(0xd800 + (offset >> 10), 0xdc00 + (offset & 0x3ff));
    } else {
      result += String.fromCharCode(codePoint);
    }
  }

  return result;
};

export const decodeAccessClaims = (token: string): AccessClaims | null => {
  const payload = token.split(".")[1];
  if (!payload) return null;

  try {
    return JSON.parse(bytesToUtf8(base64UrlToBytes(payload))) as AccessClaims;
  } catch {
    return null;
  }
};

export const getTokenRegion = async (): Promise<string | null> => {
  const token = await getAccessToken();
  if (!token) return null;

  return decodeAccessClaims(token)?.region ?? null;
};
