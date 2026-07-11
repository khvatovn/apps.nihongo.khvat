const PING_TIMEOUT = 4_000;

type PingBody = { ok?: boolean; region?: string };

const requestPing = async (base: string): Promise<PingBody> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PING_TIMEOUT);

  try {
    const response = await fetch(`${base}/api/ping`, { signal: controller.signal });
    if (!response.ok) throw new Error(`ping ${base}: HTTP ${response.status}`);

    const body = (await response.json()) as PingBody;
    if (body?.ok !== true) throw new Error(`ping ${base}: not ok`);

    return body;
  } finally {
    clearTimeout(timer);
  }
};

export const ping = async (base: string): Promise<string> => {
  await requestPing(base);
  return base;
};

export type ProbeResult = { ok: true; region: string; ms: number } | { ok: false };

export const probeGateway = async (base: string): Promise<ProbeResult> => {
  const start = Date.now();

  try {
    const { region } = await requestPing(base);
    return { ok: true, region: region ?? "—", ms: Date.now() - start };
  } catch {
    return { ok: false };
  }
};

export const selectFastest = (urls: string[], exclude?: string): Promise<string> => {
  const candidates = urls.filter((url) => url !== exclude);
  return Promise.any((candidates.length > 0 ? candidates : urls).map(ping));
};
