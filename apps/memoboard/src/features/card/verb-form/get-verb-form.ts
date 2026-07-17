import { getWithFurigana, StoreFurigana } from "@nihongo/core/shared/lib/furigana/store-furigana";
import { replaceKana, KanaIndex } from "@nihongo/core/shared/lib/kana/replaceKana";
import { getVerbGroup, VerbGroup } from "@nihongo/core/shared/lib/verb/group";

const verbEnd = "ます";

const getVerb = (title: string) => {
  const verbs = title.split(/[ 【】、]/).filter((item) => item.includes(verbEnd));
  return verbs[0];
};

const ifExceptions = (exceptions: string[], values: string[], verb: string) => {
  if (exceptions.includes(verb)) return values[exceptions.indexOf(verb)];

  return null;
};

const toDictionaryForm = (title: string, verbGroup: VerbGroup) => {
  const verb = getVerb(title);

  const exceptions = ifExceptions(["来ます"], ["来(く)る"], verb);
  if (exceptions !== null) return exceptions;

  if (verbGroup === VerbGroup.III) {
    if (verb.includes("します")) return verb.replace("します", "する");
    if (verb.includes("きます")) return verb.replace("きます", "くる");
  }

  if (verbGroup === VerbGroup.II) return verb.replace("ます", "る");

  if (verbGroup === VerbGroup.I) {
    const verbWithoutMasu = verb.replace("ます", "");
    return replaceKana(verbWithoutMasu, KanaIndex.I, KanaIndex.U);
  }

  return null;
};

const teForm = (title: string, verbGroup: VerbGroup) => {
  const verb = getVerb(title);

  const exceptions = ifExceptions(["行きます", "来ます"], ["行って", "来て"], verb);
  if (exceptions !== null) return exceptions;

  if (verbGroup === VerbGroup.III) {
    if (verb.includes("きます")) return verb.replace("きます", "きて");
    if (verb.includes("します")) return verb.replace("します", "して");
  }

  if (verbGroup === VerbGroup.II) return verb.replace("ます", "て");

  if (verbGroup === VerbGroup.I) {
    const verbWithoutMasu = verb.replace("ます", "");

    const lastChar = verbWithoutMasu.at(-1);

    if (lastChar === "い" || lastChar === "ち" || lastChar === "り")
      return verbWithoutMasu.slice(0, -1) + "って";
    if (lastChar === "み" || lastChar === "び" || lastChar === "に")
      return verbWithoutMasu.slice(0, -1) + "んで";
    if (lastChar === "き") return verbWithoutMasu.slice(0, -1) + "いて";
    if (lastChar === "ぎ") return verbWithoutMasu.slice(0, -1) + "いで";
    if (lastChar === "し") return verbWithoutMasu + "て";
  }

  return null;
};

const beAbleToForm = (title: string, verbGroup: VerbGroup) => {
  const verb = getVerb(title);

  const exceptions = ifExceptions(
    ["します", "来ます", "わかります"],
    ["できる", "来(こ)られます", "わかります"],
    verb,
  );

  if (exceptions !== null) return exceptions;

  if (verbGroup === VerbGroup.III) {
    if (verb.includes("きます")) return verb.replace("きます", "こられます");
    if (verb.includes("します")) return verb.replace("します", "できます");
  }

  if (verbGroup === VerbGroup.II) return verb.replace("ます", "られます");

  if (verbGroup === VerbGroup.I) {
    const verbWithoutMasu = verb.replace("ます", "");
    return replaceKana(verbWithoutMasu, KanaIndex.I, KanaIndex.E) + "ます";
  }

  return null;
};

const subjunctiveMoodForm = (title: string, verbGroup: VerbGroup) => {
  const verb = getVerb(title);

  const exceptions = ifExceptions(["来ます"], ["来(こ)よう"], verb);
  if (exceptions !== null) return exceptions;

  if (verbGroup === VerbGroup.III) {
    if (verb.includes("きます")) return verb.replace("きます", "こよう");
    if (verb.includes("します")) return verb.replace("します", "しよう");
  }

  if (verbGroup === VerbGroup.II) return verb.replace("ます", "よう");

  if (verbGroup === VerbGroup.I) {
    const verbWithoutMasu = verb.replace("ます", "");
    return replaceKana(verbWithoutMasu, KanaIndex.I, KanaIndex.O) + "う";
  }

  return null;
};

const imperativeMoodForm = (title: string, verbGroup: VerbGroup) => {
  const verb = getVerb(title);

  const exceptions = ifExceptions(
    ["来ます", "くれます", "ある", "できる", "わか"],
    ["来(こ)い", "くれ", "ある", "できる", "わか"],
    verb,
  );

  if (exceptions !== null) return exceptions;

  if (verbGroup === VerbGroup.III) {
    if (verb.includes("します")) return verb.replace("します", "しろ");
  }

  if (verbGroup === VerbGroup.II) {
    return verb.replace("ます", "ろ");
  }

  if (verbGroup === VerbGroup.I) {
    const verbWithoutMasu = verb.replace("ます", "");
    return replaceKana(verbWithoutMasu, KanaIndex.I, KanaIndex.E);
  }

  return null;
};

const toConditionalForm = (title: string, verbGroup: VerbGroup) => {
  const verb = getVerb(title);

  const exceptions = ifExceptions(["来ます"], ["来(く)れば"], verb);

  if (exceptions !== null) return exceptions;

  if (verbGroup === VerbGroup.III) {
    if (verb.includes("します")) return verb.replace("します", " すれば");
  }

  if (verbGroup === VerbGroup.II) {
    return verb.replace("ます", "れば");
  }

  if (verbGroup === VerbGroup.I) {
    const verbWithoutMasu = verb.replace("ます", "");
    return replaceKana(verbWithoutMasu, KanaIndex.I, KanaIndex.E) + "ば";
  }

  return null;
};

function toNegativeHypotheticalConditionalForm(str: string) {
  return str.replace(/ない$/, "なければ");
}

const passiveVoiceForm = (title: string, verbGroup: VerbGroup) => {
  const verb = getVerb(title);

  const exceptions = ifExceptions(["来ます"], ["来(こ)られます"], verb);
  if (exceptions !== null) return exceptions;

  if (verbGroup === VerbGroup.III) {
    if (verb.includes("します")) return verb.replace("します", "られます");
  }

  if (verbGroup === VerbGroup.II) {
    return verb.replace("ます", "られます");
  }

  if (verbGroup === VerbGroup.I) {
    const verbWithoutMasu = verb.replace("ます", "");
    return replaceKana(verbWithoutMasu, KanaIndex.I, KanaIndex.A) + "れます";
  }

  return null;
};

const naiForm = (title: string, verbGroup: VerbGroup) => {
  const verbs = title.split(/[ 【】、]/).filter((item) => item.includes(verbEnd));
  const verb = verbs[0];

  const exceptions = ifExceptions(["来ます", "あらない"], ["来(こ)ない", "ない"], verb);
  if (exceptions !== null) return exceptions;

  if (verbGroup === VerbGroup.III) {
    if (verb.includes("きます")) return verb.replace("きます", "こない");
    if (verb.includes("します")) return verb.replace("します", "しない");
  }

  if (verbGroup === VerbGroup.II) return verb.replace("ます", "ない");

  if (verbGroup === VerbGroup.I) {
    const verbWithoutMasu = verb.replace("ます", "");
    const lastChar = verbWithoutMasu.at(-1);

    if (lastChar === "い") return verbWithoutMasu.slice(0, -1) + "わない";

    return replaceKana(verbWithoutMasu, KanaIndex.I, KanaIndex.A) + "ない";
  }

  return null;
};

const toCausativeVerb = (title: string, verbGroup: VerbGroup) => {
  const verb = getVerb(title);

  const exceptions = ifExceptions(["来ます"], ["来(こ)させます"], verb);
  if (exceptions !== null) return exceptions;

  if (verbGroup === VerbGroup.III) {
    if (verb.includes("します")) return verb.replace("します", "させます");
  }

  if (verbGroup === VerbGroup.II) {
    return verb.replace("ます", "させます");
  }

  if (verbGroup === VerbGroup.I) {
    const verbWithoutMasu = verb.replace("ます", "");
    return replaceKana(verbWithoutMasu, KanaIndex.I, KanaIndex.A) + "せます";
  }

  return null;
};

const getVerbForm = ({
  tags,
  title,
}: {
  tags: string[];
  title: string;
}): { label: string; value: string }[] => {
  const verbGroup = getVerbGroup(tags);

  if (verbGroup === null) return [];

  const furigana = StoreFurigana();
  const wf = getWithFurigana(title, furigana);

  const verbDictionaryForm = wf((title) => toDictionaryForm(title, verbGroup));
  const verbTeForm = wf((title) => teForm(title, verbGroup));
  const verbNaiForm = wf((title) => naiForm(title, verbGroup));
  const verbTaForm = verbTeForm.replace(/て$/, "た").replace(/で$/, "だ");
  const verbBeAbleToForm = wf((title) => beAbleToForm(title, verbGroup));
  const verbSubjunctiveMoodForm = wf((title) => subjunctiveMoodForm(title, verbGroup));
  const verbImperativeMoodForm = wf((title) => imperativeMoodForm(title, verbGroup));
  const verbHypotheticalConditionalForm = wf((title) => toConditionalForm(title, verbGroup));
  const prohibitiveForm = verbDictionaryForm + "な";
  const negativeConditionalForm = toNegativeHypotheticalConditionalForm(verbNaiForm);
  const verbPassiveVoiceForm = wf((title) => passiveVoiceForm(title, verbGroup));
  const verbCausativeForm = wf((title) => toCausativeVerb(title, verbGroup));

  return [
    { label: "verbForm.teForm", value: verbTeForm },
    { label: "verbForm.taForm", value: verbTaForm },
    { label: "verbForm.naiForm", value: verbNaiForm },
    { label: "verbForm.dictionaryForm", value: verbDictionaryForm },
    { label: "verbForm.potentialForm", value: verbBeAbleToForm },
    { label: "verbForm.volitionalForm", value: verbSubjunctiveMoodForm },
    { label: "verbForm.imperativeForm", value: verbImperativeMoodForm },
    { label: "verbForm.prohibitiveForm", value: prohibitiveForm },
    { label: "verbForm.conditionalForm", value: verbHypotheticalConditionalForm },
    { label: "verbForm.negativeConditionalForm", value: negativeConditionalForm },
    { label: "verbForm.passiveForm", value: verbPassiveVoiceForm },
    { label: "verbForm.verbCausative", value: verbCausativeForm },
  ];
};

export default getVerbForm;
