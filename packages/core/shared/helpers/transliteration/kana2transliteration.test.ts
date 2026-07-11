import { describe, it, expect } from "vitest";

import { kana2transliteration } from "./kana2transliteration";

// Hepburn
describe("Hepburn (Modified Hepburn)", () => {
  it("1. гласные: あいうえお → aiueo", () => {
    expect(kana2transliteration("あいうえお", "hepburn")).toBe("aiueo");
  });

  it("2. ка-ряд: かきくけこ → kakikukeko", () => {
    expect(kana2transliteration("かきくけこ", "hepburn")).toBe("kakikukeko");
  });

  it("3. простое слово: さくら → sakura", () => {
    expect(kana2transliteration("さくら", "hepburn")).toBe("sakura");
  });

  it("4. し→shi: すし → sushi", () => {
    expect(kana2transliteration("すし", "hepburn")).toBe("sushi");
  });

  it("5. ち→chi: ちず → chizu", () => {
    expect(kana2transliteration("ちず", "hepburn")).toBe("chizu");
  });

  it("6. つ→tsu: つき → tsuki", () => {
    expect(kana2transliteration("つき", "hepburn")).toBe("tsuki");
  });

  it("7. ふ→fu: ふじさん → fujisan", () => {
    expect(kana2transliteration("ふじさん", "hepburn")).toBe("fujisan");
  });

  it("8. じ→ji: じかん → jikan", () => {
    expect(kana2transliteration("じかん", "hepburn")).toBe("jikan");
  });

  it("9. しゃ→sha: しゃしん → shashin", () => {
    expect(kana2transliteration("しゃしん", "hepburn")).toBe("shashin");
  });

  it("10. ちゃ→cha: おちゃ → ocha", () => {
    expect(kana2transliteration("おちゃ", "hepburn")).toBe("ocha");
  });

  it("11. しょ→sho + долгая: しょうゆ → shōyu", () => {
    expect(kana2transliteration("しょうゆ", "hepburn")).toBe("shōyu");
  });

  it("12. きょ→kyo + долгая: きょうと → kyōto", () => {
    expect(kana2transliteration("きょうと", "hepburn")).toBe("kyōto");
  });

  it("13. じゃ→ja: じてんしゃ → jitensha", () => {
    expect(kana2transliteration("じてんしゃ", "hepburn")).toBe("jitensha");
  });

  it("14. おう→ō: とうきょう → tōkyō", () => {
    expect(kana2transliteration("とうきょう", "hepburn")).toBe("tōkyō");
  });

  it("15. おお→ō: おおさか → ōsaka", () => {
    expect(kana2transliteration("おおさか", "hepburn")).toBe("ōsaka");
  });

  it("16. ちゅう→chū: ちゅうごく → chūgoku", () => {
    expect(kana2transliteration("ちゅうごく", "hepburn")).toBe("chūgoku");
  });

  it("17. じゅう→jū + どう→dō: じゅうどう → jūdō", () => {
    expect(kana2transliteration("じゅうどう", "hepburn")).toBe("jūdō");
  });

  it("18. えい не стягивается: せんせい → sensei", () => {
    expect(kana2transliteration("せんせい", "hepburn")).toBe("sensei");
  });

  it("19. いい не стягивается: おにいさん → oniisan", () => {
    expect(kana2transliteration("おにいさん", "hepburn")).toBe("oniisan");
  });

  it("20. っぽ: にっぽん → nippon", () => {
    expect(kana2transliteration("にっぽん", "hepburn")).toBe("nippon");
  });

  it("21. っこ: がっこう → gakkō", () => {
    expect(kana2transliteration("がっこう", "hepburn")).toBe("gakkō");
  });

  it("22. っし→sshi: ざっし → zasshi", () => {
    expect(kana2transliteration("ざっし", "hepburn")).toBe("zasshi");
  });

  it("23. っち→tchi: まっちゃ → matcha", () => {
    expect(kana2transliteration("まっちゃ", "hepburn")).toBe("matcha");
  });

  it("24. って: きって → kitte", () => {
    expect(kana2transliteration("きって", "hepburn")).toBe("kitte");
  });

  it("25. ん перед гласной → n': きんえん → kin'en", () => {
    expect(kana2transliteration("きんえん", "hepburn")).toBe("kin'en");
  });

  it("26. ん перед y → n': しんよう → shin'yō", () => {
    expect(kana2transliteration("しんよう", "hepburn")).toBe("shin'yō");
  });

  it("27. ん перед согласной: しんかんせん → shinkansen", () => {
    expect(kana2transliteration("しんかんせん", "hepburn")).toBe("shinkansen");
  });

  it("28. Катакана + ー: コンピューター → konpyūtā", () => {
    expect(kana2transliteration("コンピューター", "hepburn")).toBe("konpyūtā");
  });

  it("29. Расширенная кана ファ: ファイル → fairu", () => {
    expect(kana2transliteration("ファイル", "hepburn")).toBe("fairu");
  });

  it("30. Расширенная кана ティ + ー: パーティー → pātī", () => {
    expect(kana2transliteration("パーティー", "hepburn")).toBe("pātī");
  });
});

// Kunrei-shiki
describe("Kunrei-shiki", () => {
  it("1. гласные: あいうえお → aiueo", () => {
    expect(kana2transliteration("あいうえお", "kunreiShiki")).toBe("aiueo");
  });

  it("2. ка-ряд: かきくけこ → kakikukeko", () => {
    expect(kana2transliteration("かきくけこ", "kunreiShiki")).toBe("kakikukeko");
  });

  it("3. простое слово: さくら → sakura", () => {
    expect(kana2transliteration("さくら", "kunreiShiki")).toBe("sakura");
  });

  it("4. し→si: すし → susi", () => {
    expect(kana2transliteration("すし", "kunreiShiki")).toBe("susi");
  });

  it("5. ち→ti: ちず → tizu", () => {
    expect(kana2transliteration("ちず", "kunreiShiki")).toBe("tizu");
  });

  it("6. つ→tu: つき → tuki", () => {
    expect(kana2transliteration("つき", "kunreiShiki")).toBe("tuki");
  });

  it("7. ふ→hu: ふじさん → huzisan", () => {
    expect(kana2transliteration("ふじさん", "kunreiShiki")).toBe("huzisan");
  });

  it("8. じ→zi: じかん → zikan", () => {
    expect(kana2transliteration("じかん", "kunreiShiki")).toBe("zikan");
  });

  it("9. しゃ→sya: しゃしん → syasin", () => {
    expect(kana2transliteration("しゃしん", "kunreiShiki")).toBe("syasin");
  });

  it("10. ちゃ→tya: おちゃ → otya", () => {
    expect(kana2transliteration("おちゃ", "kunreiShiki")).toBe("otya");
  });

  it("11. しょ→syo: しょうゆ → syôyu", () => {
    expect(kana2transliteration("しょうゆ", "kunreiShiki")).toBe("syôyu");
  });

  it("12. きょ→kyo: きょうと → kyôto", () => {
    expect(kana2transliteration("きょうと", "kunreiShiki")).toBe("kyôto");
  });

  it("13. じゃ→zya: じてんしゃ → zitensya", () => {
    expect(kana2transliteration("じてんしゃ", "kunreiShiki")).toBe("zitensya");
  });

  it("14. おう→ô: とうきょう → tôkyô", () => {
    expect(kana2transliteration("とうきょう", "kunreiShiki")).toBe("tôkyô");
  });

  it("15. おお→ô: おおさか → ôsaka", () => {
    expect(kana2transliteration("おおさか", "kunreiShiki")).toBe("ôsaka");
  });

  it("16. ちゅう→tyû: ちゅうごく → tyûgoku", () => {
    expect(kana2transliteration("ちゅうごく", "kunreiShiki")).toBe("tyûgoku");
  });

  it("17. じゅう→zyû + どう→dô: じゅうどう → zyûdô", () => {
    expect(kana2transliteration("じゅうどう", "kunreiShiki")).toBe("zyûdô");
  });

  it("18. えい не стягивается: せんせい → sensei", () => {
    expect(kana2transliteration("せんせい", "kunreiShiki")).toBe("sensei");
  });

  it("19. いい не стягивается: おにいさん → oniisan", () => {
    expect(kana2transliteration("おにいさん", "kunreiShiki")).toBe("oniisan");
  });

  it("20. っぽ: にっぽん → nippon", () => {
    expect(kana2transliteration("にっぽん", "kunreiShiki")).toBe("nippon");
  });

  it("21. っこ: がっこう → gakkô", () => {
    expect(kana2transliteration("がっこう", "kunreiShiki")).toBe("gakkô");
  });

  it("22. っし→ssi: ざっし → zassi", () => {
    expect(kana2transliteration("ざっし", "kunreiShiki")).toBe("zassi");
  });

  it("23. っち→tti: まっちゃ → mattya", () => {
    expect(kana2transliteration("まっちゃ", "kunreiShiki")).toBe("mattya");
  });

  it("24. って: きって → kitte", () => {
    expect(kana2transliteration("きって", "kunreiShiki")).toBe("kitte");
  });

  it("25. ん перед гласной → n': きんえん → kin'en", () => {
    expect(kana2transliteration("きんえん", "kunreiShiki")).toBe("kin'en");
  });

  it("26. ん перед y → n': しんよう → sin'yô", () => {
    expect(kana2transliteration("しんよう", "kunreiShiki")).toBe("sin'yô");
  });

  it("27. ん перед согласной: しんかんせん → sinkansen", () => {
    expect(kana2transliteration("しんかんせん", "kunreiShiki")).toBe("sinkansen");
  });

  it("28. ぢ→zi (как じ): ちぢむ → tizimu", () => {
    expect(kana2transliteration("ちぢむ", "kunreiShiki")).toBe("tizimu");
  });

  it("29. づ→zu (как ず): つづく → tuzuku", () => {
    expect(kana2transliteration("つづく", "kunreiShiki")).toBe("tuzuku");
  });

  it("30. Катакана + ー: コンピューター → konpyûtâ", () => {
    expect(kana2transliteration("コンピューター", "kunreiShiki")).toBe("konpyûtâ");
  });
});

// Nihon-shiki
describe("Nihon-shiki", () => {
  it("1. гласные: あいうえお → aiueo", () => {
    expect(kana2transliteration("あいうえお", "nihonShiki")).toBe("aiueo");
  });

  it("2. ка-ряд: かきくけこ → kakikukeko", () => {
    expect(kana2transliteration("かきくけこ", "nihonShiki")).toBe("kakikukeko");
  });

  it("3. простое слово: さくら → sakura", () => {
    expect(kana2transliteration("さくら", "nihonShiki")).toBe("sakura");
  });

  it("4. し→si: すし → susi", () => {
    expect(kana2transliteration("すし", "nihonShiki")).toBe("susi");
  });

  it("5. ち→ti: ちず → tizu", () => {
    expect(kana2transliteration("ちず", "nihonShiki")).toBe("tizu");
  });

  it("6. つ→tu: つき → tuki", () => {
    expect(kana2transliteration("つき", "nihonShiki")).toBe("tuki");
  });

  it("7. ふ→hu: ふじさん → huzisan", () => {
    expect(kana2transliteration("ふじさん", "nihonShiki")).toBe("huzisan");
  });

  it("8. じ→zi: じかん → zikan", () => {
    expect(kana2transliteration("じかん", "nihonShiki")).toBe("zikan");
  });

  it("9. しゃ→sya: しゃしん → syasin", () => {
    expect(kana2transliteration("しゃしん", "nihonShiki")).toBe("syasin");
  });

  it("10. ちゃ→tya: おちゃ → otya", () => {
    expect(kana2transliteration("おちゃ", "nihonShiki")).toBe("otya");
  });

  it("11. しょ→syo: しょうゆ → syôyu", () => {
    expect(kana2transliteration("しょうゆ", "nihonShiki")).toBe("syôyu");
  });

  it("12. きょ→kyo: きょうと → kyôto", () => {
    expect(kana2transliteration("きょうと", "nihonShiki")).toBe("kyôto");
  });

  it("13. ぢ→di (НЕ zi): ちぢむ → tidimu", () => {
    expect(kana2transliteration("ちぢむ", "nihonShiki")).toBe("tidimu");
  });

  it("14. づ→du (НЕ zu): つづく → tuduku", () => {
    expect(kana2transliteration("つづく", "nihonShiki")).toBe("tuduku");
  });

  it("15. ぢゃ→dya: みかづき → mikaduki", () => {
    expect(kana2transliteration("みかづき", "nihonShiki")).toBe("mikaduki");
  });

  it("16. を→wo: を → wo", () => {
    expect(kana2transliteration("を", "nihonShiki")).toBe("wo");
  });

  it("17. ゐ→wi: ゐ → wi", () => {
    expect(kana2transliteration("ゐ", "nihonShiki")).toBe("wi");
  });

  it("18. ゑ→we: ゑ → we", () => {
    expect(kana2transliteration("ゑ", "nihonShiki")).toBe("we");
  });

  it("19. おう→ô: とうきょう → tôkyô", () => {
    expect(kana2transliteration("とうきょう", "nihonShiki")).toBe("tôkyô");
  });

  it("20. おお→ô: おおさか → ôsaka", () => {
    expect(kana2transliteration("おおさか", "nihonShiki")).toBe("ôsaka");
  });

  it("21. ちゅう→tyû: ちゅうごく → tyûgoku", () => {
    expect(kana2transliteration("ちゅうごく", "nihonShiki")).toBe("tyûgoku");
  });

  it("22. じゅう→zyû + どう→dô: じゅうどう → zyûdô", () => {
    expect(kana2transliteration("じゅうどう", "nihonShiki")).toBe("zyûdô");
  });

  it("23. えい не стягивается: せんせい → sensei", () => {
    expect(kana2transliteration("せんせい", "nihonShiki")).toBe("sensei");
  });

  it("24. っこ: がっこう → gakkô", () => {
    expect(kana2transliteration("がっこう", "nihonShiki")).toBe("gakkô");
  });

  it("25. っし→ssi: ざっし → zassi", () => {
    expect(kana2transliteration("ざっし", "nihonShiki")).toBe("zassi");
  });

  it("26. っち→tti: まっちゃ → mattya", () => {
    expect(kana2transliteration("まっちゃ", "nihonShiki")).toBe("mattya");
  });

  it("27. ん перед гласной → n': きんえん → kin'en", () => {
    expect(kana2transliteration("きんえん", "nihonShiki")).toBe("kin'en");
  });

  it("28. ん перед y → n': しんよう → sin'yô", () => {
    expect(kana2transliteration("しんよう", "nihonShiki")).toBe("sin'yô");
  });

  it("29. ん перед согласной: しんかんせん → sinkansen", () => {
    expect(kana2transliteration("しんかんせん", "nihonShiki")).toBe("sinkansen");
  });

  it("30. Катакана + ー: コンピューター → konpyûtâ", () => {
    expect(kana2transliteration("コンピューター", "nihonShiki")).toBe("konpyûtâ");
  });
});

// Polivanov System
describe("Polivanov", () => {
  it("1. гласные: あいうえお → аиуэо", () => {
    expect(kana2transliteration("あいうえお", "polivanovSystem")).toBe("аиуэо");
  });

  it("2. ка-ряд: かきくけこ → какикукэко", () => {
    expect(kana2transliteration("かきくけこ", "polivanovSystem")).toBe("какикукэко");
  });

  it("3. простое слово: さくら → сакура", () => {
    expect(kana2transliteration("さくら", "polivanovSystem")).toBe("сакура");
  });

  it("4. し→си: すし → суси", () => {
    expect(kana2transliteration("すし", "polivanovSystem")).toBe("суси");
  });

  it("5. ち→ти: ちず → тидзу", () => {
    expect(kana2transliteration("ちず", "polivanovSystem")).toBe("тидзу");
  });

  it("6. つ→цу: つき → цуки", () => {
    expect(kana2transliteration("つき", "polivanovSystem")).toBe("цуки");
  });

  it("7. ふ→фу: ふじさん → фудзисан", () => {
    expect(kana2transliteration("ふじさん", "polivanovSystem")).toBe("фудзисан");
  });

  it("8. じ→дзи: じかん → дзикан", () => {
    expect(kana2transliteration("じかん", "polivanovSystem")).toBe("дзикан");
  });

  it("9. しゃ→ся: しゃしん → сясин", () => {
    expect(kana2transliteration("しゃしん", "polivanovSystem")).toBe("сясин");
  });

  it("10. ちゃ→тя: おちゃ → отя", () => {
    expect(kana2transliteration("おちゃ", "polivanovSystem")).toBe("отя");
  });

  it("11. しょ→сё: しょうゆ → сёую", () => {
    expect(kana2transliteration("しょうゆ", "polivanovSystem")).toBe("сёую");
  });

  it("12. きょ→кё: きょうと → кёуто", () => {
    expect(kana2transliteration("きょうと", "polivanovSystem")).toBe("кёуто");
  });

  it("13. じゃ→дзя: じてんしゃ → дзитэнся", () => {
    expect(kana2transliteration("じてんしゃ", "polivanovSystem")).toBe("дзитэнся");
  });

  it("14. りょ→рё: りょかん → рёкан", () => {
    expect(kana2transliteration("りょかん", "polivanovSystem")).toBe("рёкан");
  });

  it("15. え→э, せ→сэ: せんせい → сэнсэи", () => {
    expect(kana2transliteration("せんせい", "polivanovSystem")).toBe("сэнсэи");
  });

  it("16. で→дэ, しゃ→ся: でんしゃ → дэнся", () => {
    expect(kana2transliteration("でんしゃ", "polivanovSystem")).toBe("дэнся");
  });

  it("17. け→кэ: けっこん → кэккон", () => {
    expect(kana2transliteration("けっこん", "polivanovSystem")).toBe("кэккон");
  });

  it("18. おう→оу: とうきょう → тоукёу", () => {
    expect(kana2transliteration("とうきょう", "polivanovSystem")).toBe("тоукёу");
  });

  it("19. おお→оо: おおさか → оосака", () => {
    expect(kana2transliteration("おおさか", "polivanovSystem")).toBe("оосака");
  });

  it("20. うう→уу: ちゅうごく → тюугоку", () => {
    expect(kana2transliteration("ちゅうごく", "polivanovSystem")).toBe("тюугоку");
  });

  it("21. っぽ: にっぽん → ниппон", () => {
    expect(kana2transliteration("にっぽん", "polivanovSystem")).toBe("ниппон");
  });

  it("22. っこ: がっこう → гаккоу", () => {
    expect(kana2transliteration("がっこう", "polivanovSystem")).toBe("гаккоу");
  });

  it("23. っし→сси: ざっし → дзасси", () => {
    expect(kana2transliteration("ざっし", "polivanovSystem")).toBe("дзасси");
  });

  it("24. って→ттэ: きって → киттэ", () => {
    expect(kana2transliteration("きって", "polivanovSystem")).toBe("киттэ");
  });

  it("25. ん перед гласной → нъ: きんえん → кинъэн", () => {
    expect(kana2transliteration("きんえん", "polivanovSystem")).toBe("кинъэн");
  });

  it("26. ん перед п → м: しんぱい → симпаи", () => {
    expect(kana2transliteration("しんぱい", "polivanovSystem")).toBe("симпаи");
  });

  it("27. ん перед б → м: しんぶん → симбун", () => {
    expect(kana2transliteration("しんぶん", "polivanovSystem")).toBe("симбун");
  });

  it("28. ん перед согласной: おんがく → онгаку", () => {
    expect(kana2transliteration("おんがく", "polivanovSystem")).toBe("онгаку");
  });

  it("29. Катакана ー (удвоение): コーヒー → коохии", () => {
    expect(kana2transliteration("コーヒー", "polivanovSystem")).toBe("коохии");
  });

  it("30. Катакана базовая: テレビ → тэрэби", () => {
    expect(kana2transliteration("テレビ", "polivanovSystem")).toBe("тэрэби");
  });
});
