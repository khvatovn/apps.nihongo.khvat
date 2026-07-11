import { Chapter } from "../types";

import { dumpCh } from "./ch";
import { dumpDe } from "./de";
import { dumpEn } from "./en";
import { dumpEs } from "./es";
import { dumpFr } from "./fr";
import { dumpId } from "./id";
import { dumpIt } from "./it";
import { dumpKo } from "./ko";
import { dumpPt } from "./pt";
import { dumpRu } from "./ru";

const dumps: Record<string, { data: Chapter[] }> = {
  en: dumpEn as unknown as { data: Chapter[] },
  ru: dumpRu as unknown as { data: Chapter[] },
  de: dumpDe as unknown as { data: Chapter[] },
  fr: dumpFr as unknown as { data: Chapter[] },
  es: dumpEs as unknown as { data: Chapter[] },
  it: dumpIt as unknown as { data: Chapter[] },
  pt: dumpPt as unknown as { data: Chapter[] },
  ko: dumpKo as unknown as { data: Chapter[] },
  ch: dumpCh as unknown as { data: Chapter[] },
  id: dumpId as unknown as { data: Chapter[] },
};

export function getDump(lang: string): unknown[] | null {
  return dumps[lang]?.data ?? null;
}
