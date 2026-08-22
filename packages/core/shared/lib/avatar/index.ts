import { useEffect, useState } from "react";

import { getTokenRegion } from "@nihongo/core/shared/lib/auth/claims";

// * NIHONGO_AVATAR_HOSTS=['ru=https://...', 'my=https://...'] — тот же скобочный формат,
// * что у NIHONGO_API_GATEWAY. Ключ — регион из клейма токена.
const parseHosts = (raw: string): Record<string, string> =>
  raw
    .replace(/^\s*\[/, "")
    .replace(/\]\s*$/, "")
    .split(",")
    .reduce<Record<string, string>>((hosts, entry) => {
      const pair = entry.trim().replace(/^['"]|['"]$/g, "");
      const separator = pair.indexOf("=");
      if (separator <= 0) return hosts;

      const region = pair.slice(0, separator).trim();
      const host = pair
        .slice(separator + 1)
        .trim()
        .replace(/\/+$/, "");

      if (!region || !/^https?:\/\//.test(host)) return hosts;

      return { ...hosts, [region]: host };
    }, {});

let hosts: Record<string, string> | null = null;

export const getAvatarHosts = (): Record<string, string> =>
  (hosts ??= parseHosts(String(process.env.NIHONGO_AVATAR_HOSTS ?? "")));

const isAbsolute = (url: string): boolean => /^https?:\/\//.test(url);

export const resolveAvatarUrl = (
  avatarUrl?: string | null,
  region?: string | null,
): string | null => {
  if (!avatarUrl) return null;
  if (isAbsolute(avatarUrl)) return avatarUrl;

  const host = region ? getAvatarHosts()[region] : undefined;
  if (!host) {
    console.warn(
      `[avatar] нет хоста для региона ${JSON.stringify(region)}; ` +
        `известны: ${JSON.stringify(Object.keys(getAvatarHosts()))}`,
    );
    return null;
  }

  return `${host}${avatarUrl.startsWith("/") ? "" : "/"}${avatarUrl}`;
};

export const useAvatarUri = (avatarUrl?: string | null): string | null => {
  const [uri, setUri] = useState<string | null>(() =>
    avatarUrl && isAbsolute(avatarUrl) ? avatarUrl : null,
  );

  useEffect(() => {
    if (!avatarUrl) {
      setUri(null);
      return undefined;
    }

    if (isAbsolute(avatarUrl)) {
      setUri(avatarUrl);
      return undefined;
    }

    let active = true;

    getTokenRegion().then((region) => {
      if (active) setUri(resolveAvatarUrl(avatarUrl, region));
    });

    return () => {
      active = false;
    };
  }, [avatarUrl]);

  return uri;
};
