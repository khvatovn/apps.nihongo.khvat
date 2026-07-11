export const getGateways = (): string[] =>
  String(process.env.NIHONGO_API_GATEWAY ?? "")
    .replace(/^\s*\[/, "")
    .replace(/\]\s*$/, "")
    .split(",")
    .map((entry) =>
      entry
        .trim()
        .replace(/^['"]|['"]$/g, "")
        .replace(/\/+$/, ""),
    )
    .filter((url) => /^https?:\/\//.test(url));
