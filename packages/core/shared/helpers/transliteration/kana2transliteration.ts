type Transliteration = "hepburn" | "kunreiShiki" | "nihonShiki" | "polivanovSystem";

// ---------------------------------------------------------------------------
// 1. Katakana → Hiragana normalization (ー and unknown chars kept as-is)
// ---------------------------------------------------------------------------
function normalizeToHiragana(input: string): string {
  let result = "";
  for (const ch of input) {
    const code = ch.charCodeAt(0);
    // Standard katakana ァ(0x30A1)–ヶ(0x30F6) → ぁ(0x3041)–ゖ(0x3096)
    if (code >= 0x30a1 && code <= 0x30f6) {
      result += String.fromCharCode(code - 0x60);
    } else {
      result += ch; // keep ー (0x30FC) and everything else as-is
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// 2. Mapping tables for each transliteration system
// ---------------------------------------------------------------------------
// Each table maps hiragana sequences → romanized string.
// Two-char sequences (yōon, extended kana) take priority over one-char.
// Special tokens: っ, ん, ー are handled separately in the main logic.

type KanaTable = Record<string, string>;

function buildTable(system: Transliteration): KanaTable {
  // ---- Shared across all Latin systems ----
  const vowels: KanaTable = { あ: "a", い: "i", う: "u", え: "e", お: "o" };
  const kaRow: KanaTable = { か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko" };
  const saRowBase: KanaTable = { さ: "sa", す: "su", せ: "se", そ: "so" };
  const taRowBase: KanaTable = { た: "ta", て: "te", と: "to" };
  const naRow: KanaTable = { な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no" };
  const haRowBase: KanaTable = { は: "ha", ひ: "hi", へ: "he", ほ: "ho" };
  const maRow: KanaTable = { ま: "ma", み: "mi", む: "mu", め: "me", も: "mo" };
  const yaRow: KanaTable = { や: "ya", ゆ: "yu", よ: "yo" };
  const raRow: KanaTable = { ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro" };
  const waBase: KanaTable = { わ: "wa" };
  const gaRow: KanaTable = { が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go" };
  const zaRowBase: KanaTable = { ざ: "za", ず: "zu", ぜ: "ze", ぞ: "zo" };
  const daRowBase: KanaTable = { だ: "da", で: "de", ど: "do" };
  const baRow: KanaTable = { ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo" };
  const paRow: KanaTable = { ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po" };

  // ---- Yōon shared base (same in all Latin systems) ----
  const yoonShared: KanaTable = {
    きゃ: "kya",
    きゅ: "kyu",
    きょ: "kyo",
    にゃ: "nya",
    にゅ: "nyu",
    にょ: "nyo",
    ひゃ: "hya",
    ひゅ: "hyu",
    ひょ: "hyo",
    みゃ: "mya",
    みゅ: "myu",
    みょ: "myo",
    りゃ: "rya",
    りゅ: "ryu",
    りょ: "ryo",
    ぎゃ: "gya",
    ぎゅ: "gyu",
    ぎょ: "gyo",
    びゃ: "bya",
    びゅ: "byu",
    びょ: "byo",
    ぴゃ: "pya",
    ぴゅ: "pyu",
    ぴょ: "pyo",
  };

  // ---- Small standalone kana (rare, but handle them) ----
  const smallVowels: KanaTable = { ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o" };

  if (system === "hepburn") {
    return {
      ...vowels,
      ...kaRow,
      ...saRowBase,
      ...taRowBase,
      ...naRow,
      ...haRowBase,
      ...maRow,
      ...yaRow,
      ...raRow,
      ...waBase,
      ...gaRow,
      ...zaRowBase,
      ...daRowBase,
      ...baRow,
      ...paRow,
      ...yoonShared,
      ...smallVowels,
      // Hepburn-specific consonants
      し: "shi",
      ち: "chi",
      つ: "tsu",
      ふ: "fu",
      じ: "ji",
      ぢ: "ji",
      づ: "zu",
      // Hepburn yōon
      しゃ: "sha",
      しゅ: "shu",
      しょ: "sho",
      ちゃ: "cha",
      ちゅ: "chu",
      ちょ: "cho",
      じゃ: "ja",
      じゅ: "ju",
      じょ: "jo",
      ぢゃ: "ja",
      ぢゅ: "ju",
      ぢょ: "jo",
      // Wa-row & archaic
      を: "o",
      ゐ: "i",
      ゑ: "e",
      // Extended katakana (after normalization to hiragana)
      ふぁ: "fa",
      ふぃ: "fi",
      ふぇ: "fe",
      ふぉ: "fo",
      てぃ: "ti",
      とぅ: "tu",
      でぃ: "di",
      でゅ: "dyu",
      うぃ: "wi",
      うぇ: "we",
      うぉ: "wo",
      // ゔ = ヴ normalized
      ゔぁ: "va",
      ゔぃ: "vi",
      ゔ: "vu",
      ゔぇ: "ve",
      ゔぉ: "vo",
    };
  }

  if (system === "kunreiShiki") {
    return {
      ...vowels,
      ...kaRow,
      ...saRowBase,
      ...taRowBase,
      ...naRow,
      ...haRowBase,
      ...maRow,
      ...yaRow,
      ...raRow,
      ...waBase,
      ...gaRow,
      ...zaRowBase,
      ...daRowBase,
      ...baRow,
      ...paRow,
      ...yoonShared,
      ...smallVowels,
      // Kunrei-specific consonants
      し: "si",
      ち: "ti",
      つ: "tu",
      ふ: "hu",
      じ: "zi",
      ぢ: "zi",
      づ: "zu",
      // Kunrei yōon
      しゃ: "sya",
      しゅ: "syu",
      しょ: "syo",
      ちゃ: "tya",
      ちゅ: "tyu",
      ちょ: "tyo",
      じゃ: "zya",
      じゅ: "zyu",
      じょ: "zyo",
      ぢゃ: "zya",
      ぢゅ: "zyu",
      ぢょ: "zyo",
      // Wa-row & archaic
      を: "o",
      ゐ: "i",
      ゑ: "e",
      // Extended katakana
      ふぁ: "fa",
      ふぃ: "fi",
      ふぇ: "fe",
      ふぉ: "fo",
      てぃ: "ti",
      とぅ: "tu",
      ゔぁ: "va",
      ゔぃ: "vi",
      ゔ: "vu",
      ゔぇ: "ve",
      ゔぉ: "vo",
    };
  }

  if (system === "nihonShiki") {
    return {
      ...vowels,
      ...kaRow,
      ...saRowBase,
      ...taRowBase,
      ...naRow,
      ...haRowBase,
      ...maRow,
      ...yaRow,
      ...raRow,
      ...waBase,
      ...gaRow,
      ...zaRowBase,
      ...daRowBase,
      ...baRow,
      ...paRow,
      ...yoonShared,
      ...smallVowels,
      // Nihon-specific consonants (same as Kunrei for most)
      し: "si",
      ち: "ti",
      つ: "tu",
      ふ: "hu",
      じ: "zi",
      // KEY DIFFERENCE from Kunrei: ぢ→di, づ→du
      ぢ: "di",
      づ: "du",
      // Nihon yōon
      しゃ: "sya",
      しゅ: "syu",
      しょ: "syo",
      ちゃ: "tya",
      ちゅ: "tyu",
      ちょ: "tyo",
      じゃ: "zya",
      じゅ: "zyu",
      じょ: "zyo",
      ぢゃ: "dya",
      ぢゅ: "dyu",
      ぢょ: "dyo",
      // KEY DIFFERENCE: を→wo, ゐ→wi, ゑ→we
      を: "wo",
      ゐ: "wi",
      ゑ: "we",
      // Extended katakana
      ふぁ: "fa",
      ふぃ: "fi",
      ふぇ: "fe",
      ふぉ: "fo",
      てぃ: "ti",
      とぅ: "tu",
      ゔぁ: "va",
      ゔぃ: "vi",
      ゔ: "vu",
      ゔぇ: "ve",
      ゔぉ: "vo",
    };
  }

  // ---- Polivanov (Cyrillic) ----
  return {
    // Vowels
    あ: "а",
    い: "и",
    う: "у",
    え: "э",
    お: "о",
    ぁ: "а",
    ぃ: "и",
    ぅ: "у",
    ぇ: "э",
    ぉ: "о",
    // Ka-row
    か: "ка",
    き: "ки",
    く: "ку",
    け: "кэ",
    こ: "ко",
    // Sa-row
    さ: "са",
    し: "си",
    す: "су",
    せ: "сэ",
    そ: "со",
    // Ta-row
    た: "та",
    ち: "ти",
    つ: "цу",
    て: "тэ",
    と: "то",
    // Na-row
    な: "на",
    に: "ни",
    ぬ: "ну",
    ね: "нэ",
    の: "но",
    // Ha-row
    は: "ха",
    ひ: "хи",
    ふ: "фу",
    へ: "хэ",
    ほ: "хо",
    // Ma-row
    ま: "ма",
    み: "ми",
    む: "му",
    め: "мэ",
    も: "мо",
    // Ya-row
    や: "я",
    ゆ: "ю",
    よ: "ё",
    // Ra-row
    ら: "ра",
    り: "ри",
    る: "ру",
    れ: "рэ",
    ろ: "ро",
    // Wa-row
    わ: "ва",
    を: "о",
    // Archaic
    ゐ: "и",
    ゑ: "э",
    // Ga-row
    が: "га",
    ぎ: "ги",
    ぐ: "гу",
    げ: "гэ",
    ご: "го",
    // Za-row
    ざ: "дза",
    じ: "дзи",
    ず: "дзу",
    ぜ: "дзэ",
    ぞ: "дзо",
    // Da-row
    だ: "да",
    ぢ: "дзи",
    づ: "дзу",
    で: "дэ",
    ど: "до",
    // Ba-row
    ば: "ба",
    び: "би",
    ぶ: "бу",
    べ: "бэ",
    ぼ: "бо",
    // Pa-row
    ぱ: "па",
    ぴ: "пи",
    ぷ: "пу",
    ぺ: "пэ",
    ぽ: "по",
    // Yōon
    きゃ: "кя",
    きゅ: "кю",
    きょ: "кё",
    しゃ: "ся",
    しゅ: "сю",
    しょ: "сё",
    ちゃ: "тя",
    ちゅ: "тю",
    ちょ: "тё",
    にゃ: "ня",
    にゅ: "ню",
    にょ: "нё",
    ひゃ: "хя",
    ひゅ: "хю",
    ひょ: "хё",
    みゃ: "мя",
    みゅ: "мю",
    みょ: "мё",
    りゃ: "ря",
    りゅ: "рю",
    りょ: "рё",
    ぎゃ: "гя",
    ぎゅ: "гю",
    ぎょ: "гё",
    じゃ: "дзя",
    じゅ: "дзю",
    じょ: "дзё",
    ぢゃ: "дзя",
    ぢゅ: "дзю",
    ぢょ: "дзё",
    びゃ: "бя",
    びゅ: "бю",
    びょ: "бё",
    ぴゃ: "пя",
    ぴゅ: "пю",
    ぴょ: "пё",
    // Extended katakana (normalized to hiragana)
    ふぁ: "фа",
    ふぃ: "фи",
    ふぇ: "фэ",
    ふぉ: "фо",
    てぃ: "ти",
    とぅ: "ту",
    ゔぁ: "ва",
    ゔぃ: "ви",
    ゔ: "ву",
    ゔぇ: "вэ",
    ゔぉ: "во",
  };
}

// ---------------------------------------------------------------------------
// 3. Tokenizer — splits normalized hiragana string into an array of tokens
// ---------------------------------------------------------------------------
// Token types:
//   { type: "mora", romaji: string, lastVowel: string }
//   { type: "sokuon" }   — っ
//   { type: "n" }         — ん
//   { type: "chouon" }    — ー
//   { type: "unknown", char: string }

interface MoraToken {
  type: "mora";
  romaji: string;
  lastVowel: string;
}
interface SokuonToken {
  type: "sokuon";
}
interface NToken {
  type: "n";
}
interface ChouonToken {
  type: "chouon";
}
interface UnknownToken {
  type: "unknown";
  char: string;
}
type Token = MoraToken | SokuonToken | NToken | ChouonToken | UnknownToken;

const LATIN_VOWELS = "aiueo";
const CYRILLIC_VOWEL_TO_BASE: Record<string, string> = {
  а: "a",
  и: "i",
  у: "u",
  э: "e",
  о: "o",
  я: "a",
  ю: "u",
  ё: "o",
};

function getLastVowel(romaji: string, system: Transliteration): string {
  if (system === "polivanovSystem") {
    for (let i = romaji.length - 1; i >= 0; i--) {
      const base = CYRILLIC_VOWEL_TO_BASE[romaji[i]];
      if (base) return base;
    }
    return "";
  }
  for (let i = romaji.length - 1; i >= 0; i--) {
    if (LATIN_VOWELS.includes(romaji[i])) return romaji[i];
  }
  return "";
}

function tokenize(normalized: string, table: KanaTable, system: Transliteration): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < normalized.length) {
    const ch = normalized[i];

    // Special single characters
    if (ch === "っ") {
      tokens.push({ type: "sokuon" });
      i++;
      continue;
    }
    if (ch === "ん") {
      tokens.push({ type: "n" });
      i++;
      continue;
    }
    if (ch === "ー") {
      tokens.push({ type: "chouon" });
      i++;
      continue;
    }

    // Try 2-char match (yōon / extended kana)
    if (i + 1 < normalized.length) {
      const two = normalized.substring(i, i + 2);
      if (table[two] !== undefined) {
        const romaji = table[two];
        tokens.push({ type: "mora", romaji, lastVowel: getLastVowel(romaji, system) });
        i += 2;
        continue;
      }
    }

    // Try 1-char match
    if (table[ch] !== undefined) {
      const romaji = table[ch];
      tokens.push({ type: "mora", romaji, lastVowel: getLastVowel(romaji, system) });
      i++;
      continue;
    }

    // Unknown character — pass through
    tokens.push({ type: "unknown", char: ch });
    i++;
  }

  return tokens;
}

// ---------------------------------------------------------------------------
// 4. Assemble romanized string from tokens
// ---------------------------------------------------------------------------

// Get the first consonant(s) from a romanized mora for sokuon doubling
function getSokuonPrefix(nextRomaji: string, system: Transliteration): string {
  if (system === "hepburn") {
    // Special Hepburn rule: before "ch" → prepend "t" (e.g. っち → tchi)
    if (nextRomaji.startsWith("ch")) return "t";
  }
  // Default: double the first character (consonant)
  // Works for Latin (k, s, t, p, etc.) and Cyrillic (к, с, т, п, etc.)
  return nextRomaji[0];
}

// Resolve ん based on what follows
function resolveN(system: Transliteration, nextToken: Token | undefined): string {
  const nextRomaji = nextToken?.type === "mora" ? nextToken.romaji : undefined;

  if (system === "polivanovSystem") {
    if (!nextRomaji) return "н"; // end of string or before non-mora
    const first = nextRomaji[0];
    // Before б, п, м → м
    if (first === "б" || first === "п" || first === "м") return "м";
    // Before Cyrillic vowels (а, и, у, э, о) → нъ
    if (CYRILLIC_VOWEL_TO_BASE[first] && !"яюё".includes(first)) return "нъ";
    // Everything else → н
    return "н";
  }

  // Latin systems: n' before vowels and y
  if (!nextRomaji) return "n";
  const first = nextRomaji[0];
  if (LATIN_VOWELS.includes(first) || first === "y") return "n'";
  return "n";
}

// Map base vowel (a/i/u/e/o) to the long-vowel representation for ー
function chouonVowel(baseVowel: string, system: Transliteration): string {
  if (system === "polivanovSystem") {
    const map: Record<string, string> = { a: "а", i: "и", u: "у", e: "э", o: "о" };
    return map[baseVowel] ?? "";
  }
  return baseVowel; // plain Latin vowel; contraction handled later
}

function assemble(tokens: Token[], system: Transliteration): string {
  const parts: string[] = [];
  // Track the last vowel (base: a/i/u/e/o) for ー processing
  let lastVowel = "";

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];

    if (tok.type === "mora") {
      parts.push(tok.romaji);
      lastVowel = tok.lastVowel;
      continue;
    }

    if (tok.type === "sokuon") {
      // Find the next mora token to get its romanization
      const next = findNextMora(tokens, i + 1);
      if (next) {
        parts.push(getSokuonPrefix(next.romaji, system));
      }
      // lastVowel stays the same (sokuon doesn't change it)
      continue;
    }

    if (tok.type === "n") {
      const nextTok = tokens[i + 1];
      parts.push(resolveN(system, nextTok));
      // lastVowel stays the same
      continue;
    }

    if (tok.type === "chouon") {
      if (!lastVowel) continue;
      if (system === "polivanovSystem") {
        // Polivanov: just repeat the plain Cyrillic vowel
        parts.push(chouonVowel(lastVowel, system));
      } else {
        // Latin systems: replace the last vowel in the previous part
        // with its macron/circumflex version (handles ī, ē too)
        const accentMap =
          system === "hepburn"
            ? { a: "ā", i: "ī", u: "ū", e: "ē", o: "ō" }
            : { a: "â", i: "î", u: "û", e: "ê", o: "ô" };
        const accented = accentMap[lastVowel as keyof typeof accentMap];
        if (accented && parts.length > 0) {
          const last = parts[parts.length - 1];
          const idx = last.lastIndexOf(lastVowel);
          if (idx !== -1) {
            parts[parts.length - 1] = last.substring(0, idx) + accented + last.substring(idx + 1);
          }
        }
      }
      // lastVowel stays the same (extending the same vowel)
      continue;
    }

    if (tok.type === "unknown") {
      parts.push(tok.char);
      continue;
    }
  }

  return parts.join("");
}

function findNextMora(tokens: Token[], from: number): MoraToken | undefined {
  for (let i = from; i < tokens.length; i++) {
    if (tokens[i].type === "mora") return tokens[i] as MoraToken;
    if (tokens[i].type !== "sokuon") break; // stop if we hit anything else
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// 5. Long vowel contraction (Hepburn: macron, Kunrei/Nihon: circumflex)
//    Only for aa→ā, uu→ū, oo→ō, ou→ō. NOT ii, NOT ei.
// ---------------------------------------------------------------------------

function applyLongVowels(text: string, system: Transliteration): string {
  if (system === "polivanovSystem") return text; // no contraction

  const useMacron = system === "hepburn";
  const map: Record<string, string> = useMacron
    ? { ou: "ō", oo: "ō", uu: "ū", aa: "ā" }
    : { ou: "ô", oo: "ô", uu: "û", aa: "â" };

  let result = "";
  let i = 0;
  while (i < text.length) {
    if (i + 1 < text.length) {
      const pair = text[i] + text[i + 1];
      if (map[pair]) {
        result += map[pair];
        i += 2;
        continue;
      }
    }
    result += text[i];
    i++;
  }
  return result;
}

// ---------------------------------------------------------------------------
// 6. Main entry point
// ---------------------------------------------------------------------------

export const kana2transliteration = (kana: string, system: Transliteration): string => {
  const normalized = normalizeToHiragana(kana);
  const table = buildTable(system);
  const tokens = tokenize(normalized, table, system);
  const raw = assemble(tokens, system);
  return applyLongVowels(raw, system);
};
