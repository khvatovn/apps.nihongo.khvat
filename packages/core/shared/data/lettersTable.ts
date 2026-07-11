export interface ILetter {
  readonly ka: string;
  readonly hi: string;
  readonly id: string;
  // transliterations
  // - Romaji
  // -     Hepburn
  // -     Kunrei-shiki
  // -     Nihon-shiki
  // - Polivanov system
  readonly transliterations: string[];
}

export const base: ILetter[][] = [
  [
    {
      id: "a151eeeb-2537-463c-ae23-d484d1bcb835",
      ka: "ア",
      hi: "あ",
      transliterations: ["A", "A", "A", "А"],
    },
    {
      id: "11017078-148a-4a44-b3f7-21d1df02d981",
      ka: "イ",
      hi: "い",
      transliterations: ["I", "I", "I", "И"],
    },
    {
      id: "bcbd90e2-fabc-4dcc-8022-02e5b650c822",
      ka: "ウ",
      hi: "う",
      transliterations: ["U", "U", "U", "У"],
    },
    {
      id: "70680d73-c9f9-4b4e-aac4-c82caa49668c",
      ka: "エ",
      hi: "え",
      transliterations: ["E", "E", "E", "Э"],
    },
    {
      id: "e430643d-5624-432e-b53e-974447baad22",
      ka: "オ",
      hi: "お",
      transliterations: ["O", "O", "O", "О"],
    },
  ],
  [
    {
      id: "22350aba-d254-48ba-811a-9d1448761042",
      ka: "カ",
      hi: "か",
      transliterations: ["KA", "KA", "KA", "КА"],
    },
    {
      id: "a1d45e3b-a1c9-4409-8d39-725a0a35899d",
      ka: "キ",
      hi: "き",
      transliterations: ["KI", "KI", "KI", "КИ"],
    },
    {
      id: "51cd83e5-6167-4bcc-a3e6-6b246f2ca2d1",
      ka: "ク",
      hi: "く",
      transliterations: ["KU", "KU", "KU", "КУ"],
    },
    {
      id: "9a84b07b-696a-4abd-83f2-70ff8ec66a66",
      ka: "ケ",
      hi: "け",
      transliterations: ["KE", "KE", "KE", "КЭ"],
    },
    {
      id: "8a2655c3-4553-4f58-83db-069439b11154",
      ka: "コ",
      hi: "こ",
      transliterations: ["KO", "KO", "KO", "КО"],
    },
  ],
  [
    {
      id: "5bc17c31-0c79-45dd-be5c-41cf67a5baf0",
      ka: "サ",
      hi: "さ",
      transliterations: ["SA", "SA", "SA", "СА"],
    },
    {
      id: "0d44c671-edf2-4c9d-b62d-e3f5ae8ea7b2",
      ka: "シ",
      hi: "し",
      transliterations: ["SHI", "SI", "SI", "СИ"],
    },
    {
      id: "c495772d-7048-4423-a993-60ce5ce325a2",
      ka: "ス",
      hi: "す",
      transliterations: ["SU", "SU", "SU", "СУ"],
    },
    {
      id: "0106956a-9090-4599-93a2-0be363bcf7bf",
      ka: "セ",
      hi: "せ",
      transliterations: ["SE", "SE", "SE", "СЭ"],
    },
    {
      id: "3108807a-1d5e-47b3-9f06-514bc8096102",
      ka: "ソ",
      hi: "そ",
      transliterations: ["SO", "SO", "SO", "СО"],
    },
  ],
  [
    {
      id: "36b4894e-19d1-4efe-961d-d9dbc6284757",
      ka: "タ",
      hi: "た",
      transliterations: ["TA", "TA", "TA", "ТА"],
    },
    {
      id: "f17698db-0da4-4c09-ba3b-9d10e3c7aa4d",
      ka: "チ",
      hi: "ち",
      transliterations: ["CHI", "TI", "TI", "ТИ"],
    },
    {
      id: "08123485-a3d0-461e-8af3-bf6708b74d90",
      ka: "ツ",
      hi: "つ",
      transliterations: ["TSU", "TU", "TU", "ЦУ"],
    },
    {
      id: "45870b67-8005-4ee1-a79c-a239289ef9b6",
      ka: "テ",
      hi: "て",
      transliterations: ["TE", "TE", "TE", "ТЭ"],
    },
    {
      id: "bfd720a3-aaaa-4ce1-a88b-ce4866b0351f",
      ka: "ト",
      hi: "と",
      transliterations: ["TO", "TO", "TO", "ТО"],
    },
  ],
  [
    {
      id: "426cc9fd-4eeb-4914-9484-e87f922365fe",
      ka: "ナ",
      hi: "な",
      transliterations: ["NA", "NA", "NA", "НА"],
    },
    {
      id: "16c7e660-5f2f-44bb-82aa-72722e944126",
      ka: "ニ",
      hi: "に",
      transliterations: ["NI", "NI", "NI", "НИ"],
    },
    {
      id: "6a1e5aa1-6978-4f46-bd78-1310607d9018",
      ka: "ヌ",
      hi: "ぬ",
      transliterations: ["NU", "NU", "NU", "НУ"],
    },
    {
      id: "78f412ca-a2fc-4319-9444-288363407b45",
      ka: "ネ",
      hi: "ね",
      transliterations: ["NE", "NE", "NE", "НЭ"],
    },
    {
      id: "8b140c48-5818-4a3b-b8fe-0ddc49852778",
      ka: "ノ",
      hi: "の",
      transliterations: ["NO", "NO", "NO", "НО"],
    },
  ],
  [
    {
      id: "98db662b-5ca1-47cd-9026-735c762c76f6",
      ka: "ハ",
      hi: "は",
      transliterations: ["HA", "HA", "HA", "ХА"],
    },
    {
      id: "458fcd0d-1f08-4222-99c7-e17000999ccf",
      ka: "ヒ",
      hi: "ひ",
      transliterations: ["HI", "HI", "HI", "ХИ"],
    },
    {
      id: "6ee7807e-278a-4652-8445-f3062e026891",
      ka: "フ",
      hi: "ふ",
      transliterations: ["FU", "HU", "HU", "ФУ"],
    },
    {
      id: "1014abd7-deb5-4c6b-a1dc-27543817c9fe",
      ka: "ヘ",
      hi: "へ",
      transliterations: ["HE", "HE", "HE", "ХЭ"],
    },
    {
      id: "d80bf13e-66cd-4cf9-93e7-09cb2f435ead",
      ka: "ホ",
      hi: "ほ",
      transliterations: ["HO", "HO", "HO", "ХО"],
    },
  ],
  [
    {
      id: "827078b5-74f9-499b-a523-0fea2020a5af",
      ka: "マ",
      hi: "ま",
      transliterations: ["MA", "MA", "MA", "МА"],
    },
    {
      id: "b131b9f3-d6fd-48e6-b0cc-32831ea4b3f9",
      ka: "ミ",
      hi: "み",
      transliterations: ["MI", "MI", "MI", "МИ"],
    },
    {
      id: "4d81e8f2-0e6b-475f-bd08-c6b03d20ae69",
      ka: "ム",
      hi: "む",
      transliterations: ["MU", "MU", "MU", "МУ"],
    },
    {
      id: "3037e1df-8072-4273-abf1-664b500613af",
      ka: "メ",
      hi: "め",
      transliterations: ["ME", "ME", "ME", "МЭ"],
    },
    {
      id: "54a8b634-b713-4652-957e-fffa3b3319cc",
      ka: "モ",
      hi: "も",
      transliterations: ["MO", "MO", "MO", "МО"],
    },
  ],
  [
    {
      id: "9e4e7b1b-2b3c-467d-8c24-be83a4ae5a89",
      ka: "ヤ",
      hi: "や",
      transliterations: ["YA", "YA", "YA", "Я"],
    },
    {
      id: "e3c281bb-31aa-4fab-8b83-1daca7c6bdd5",
      ka: "ユ",
      hi: "ゆ",
      transliterations: ["YU", "YU", "YU", "Ю"],
    },
    {
      id: "5b7da1eb-3e8c-418f-bcb5-ea8551c77706",
      ka: "ヨ",
      hi: "よ",
      transliterations: ["YO", "YO", "YO", "Ё"],
    },
  ],
  [
    {
      id: "859472d4-50b2-4574-adcf-65b301aa916e",
      ka: "ラ",
      hi: "ら",
      transliterations: ["RA", "RA", "RA", "РА"],
    },
    {
      id: "6e0e6570-0e60-46e4-8735-40ad423daec2",
      ka: "リ",
      hi: "り",
      transliterations: ["RI", "RI", "RI", "РИ"],
    },
    {
      id: "1a43007b-1cfb-49a0-baea-02fe8d7cd78a",
      ka: "ル",
      hi: "る",
      transliterations: ["RU", "RU", "RU", "РУ"],
    },
    {
      id: "e53fdab4-2d04-452d-a635-d2ac728c6a32",
      ka: "レ",
      hi: "れ",
      transliterations: ["RE", "RE", "RE", "РЭ"],
    },
    {
      id: "6ba2a0b0-d443-4323-a382-c8144cd996d3",
      ka: "ロ",
      hi: "ろ",
      transliterations: ["RO", "RO", "RO", "РО"],
    },
  ],
  [
    {
      id: "a53d8501-373d-4944-a76b-657f672162f9",
      ka: "ワ",
      hi: "わ",
      transliterations: ["WA", "WA", "WA", "ВА"],
    },
    {
      id: "858b53e1-af17-45d5-8fc2-330121eab5c4",
      ka: "ヲ",
      hi: "を",
      transliterations: ["WO", "WO", "WO", "ВО"],
    },
  ],
  [
    {
      id: "2a481d17-0d7c-492a-85fc-cab60e9fb6df",
      ka: "ン",
      hi: "ん",
      transliterations: ["N", "N", "N", "Н"],
    },
  ],
];

export const dakuon: ILetter[][] = [
  [
    {
      id: "2dc3667e-c4cb-4d04-adc8-f3c5603d6b3d",
      ka: "ガ",
      hi: "が",
      transliterations: ["GA", "GA", "GA", "ГА"],
    },
    {
      id: "e6131a96-35f2-48ae-a2ee-53d7bde93a8b",
      ka: "ギ",
      hi: "ぎ",
      transliterations: ["GI", "GI", "GI", "ГИ"],
    },
    {
      id: "b7dde579-94e7-4b7f-bf21-0b4e7f825aa9",
      ka: "グ",
      hi: "ぐ",
      transliterations: ["GU", "GU", "GU", "ГУ"],
    },
    {
      id: "9a32b896-4743-4b55-ac7c-196212dbd2b0",
      ka: "ゲ",
      hi: "げ",
      transliterations: ["GE", "GE", "GE", "ГЭ"],
    },
    {
      id: "c2166cbb-af44-426f-aed2-0b56c51de6b3",
      ka: "ゴ",
      hi: "ご",
      transliterations: ["GO", "GO", "GO", "ГО"],
    },
  ],
  [
    {
      id: "cb29ec69-5f4b-4e0a-b109-ae7c294517ac",
      ka: "ザ",
      hi: "ざ",
      transliterations: ["ZA", "ZA", "ZA", "ЗА"],
    },
    {
      id: "dbdaff4f-4797-4241-8a76-7c300dadb795",
      ka: "ジ",
      hi: "じ",
      transliterations: ["JI", "ZI", "ZI", "ДЗИ"],
    },
    {
      id: "9e920fe4-fc1a-492b-9000-a75c34830e0f",
      ka: "ズ",
      hi: "ず",
      transliterations: ["ZU", "ZU", "ZU", "ДЗУ"],
    },
    {
      id: "b0bc3b9f-587c-4ab4-8a03-a6c7df2fe225",
      ka: "ゼ",
      hi: "ぜ",
      transliterations: ["ZE", "ZE", "ZE", "ДЗЭ"],
    },
    {
      id: "a6269b58-d808-48be-a8d9-edfcb03a8a7c",
      ka: "ゾ",
      hi: "ぞ",
      transliterations: ["ZO", "ZO", "ZO", "ДЗО"],
    },
  ],
  [
    {
      id: "9b41239e-9b08-41ae-b794-9bcd19d7f488",
      ka: "ダ",
      hi: "だ",
      transliterations: ["DA", "DA", "DA", "ДА"],
    },
    {
      id: "fcf5368d-40e1-4de6-b564-b3ab430541e4",
      ka: "ヂ",
      hi: "ぢ",
      transliterations: ["JI", "ZI", "ZI", "ДЗИ"],
    },
    {
      id: "942585bb-b0ed-4712-9fd0-e4e9c91d63bd",
      ka: "ヅ",
      hi: "づ",
      transliterations: ["ZU", "ZU", "ZU", "ДЗУ"],
    },
    {
      id: "7a0ba7ce-ee51-4d94-91ea-82e19d8d3268",
      ka: "デ",
      hi: "で",
      transliterations: ["DE", "DE", "DE", "ДЭ"],
    },
    {
      id: "a9d9d96f-485c-4352-a845-2c9ea0cccc08",
      ka: "ド",
      hi: "ど",
      transliterations: ["DO", "DO", "DO", "ДО"],
    },
  ],
  [
    {
      id: "364900be-ce05-410d-81f5-b5c6ca75b477",
      ka: "バ",
      hi: "ば",
      transliterations: ["BA", "BA", "BA", "БА"],
    },
    {
      id: "15725fac-4910-4e36-bdbb-c4f6f890d7dd",
      ka: "ビ",
      hi: "び",
      transliterations: ["BI", "BI", "BI", "БИ"],
    },
    {
      id: "ad5fe49a-65dd-4016-ad02-ca824b6ac476",
      ka: "ブ",
      hi: "ぶ",
      transliterations: ["BU", "BU", "BU", "БУ"],
    },
    {
      id: "f8f32a3f-a6cf-443c-a7d5-9201f1d50b6f",
      ka: "ベ",
      hi: "べ",
      transliterations: ["BE", "BE", "BE", "БЭ"],
    },
    {
      id: "b1ee6b66-8c09-4cf7-a7ee-12ed24d4fb9b",
      ka: "ボ",
      hi: "ぼ",
      transliterations: ["BO", "BO", "BO", "БО"],
    },
  ],
];

export const handakuon: ILetter[][] = [
  [
    {
      id: "29586e2f-2cdf-4f5a-ab03-43cdc7de5bee",
      ka: "パ",
      hi: "ぱ",
      transliterations: ["PA", "PA", "PA", "ПА"],
    },
    {
      id: "aa3a1a5c-3654-46e3-826f-aaf4f8d0538b",
      ka: "ピ",
      hi: "ぴ",
      transliterations: ["PI", "PI", "PI", "ПИ"],
    },
    {
      id: "70bd9d94-d6d5-4572-9b4e-290c2effbec4",
      ka: "プ",
      hi: "ぷ",
      transliterations: ["PU", "PU", "PU", "ПУ"],
    },
    {
      id: "cb95fb95-60c8-4324-a716-a9a1013f9214",
      ka: "ペ",
      hi: "ぺ",
      transliterations: ["PE", "PE", "PE", "ПЭ"],
    },
    {
      id: "dded7c42-3b0c-4e89-9b03-1ad95d40fa9d",
      ka: "ポ",
      hi: "ぽ",
      transliterations: ["PO", "PO", "PO", "ПО"],
    },
  ],
];

export const yoon: ILetter[][] = [
  [
    {
      id: "d1a354dd-03db-4143-8883-bfd21f0c63bf",
      ka: "キャ",
      hi: "きゃ",
      transliterations: ["KYA", "KYA", "KYA", "КЯ"],
    },
    {
      id: "4f2017b1-ae1d-4630-ba8a-4ce5d55b556f",
      ka: "キュ",
      hi: "きゅ",
      transliterations: ["KYU", "KYU", "KYU", "КЮ"],
    },
    {
      id: "578f764c-1bdc-4ad6-a89b-daecde53d680",
      ka: "キョ",
      hi: "きょ",
      transliterations: ["KYO", "KYO", "KYO", "КЁ"],
    },
  ],
  [
    {
      id: "01bc1499-155f-46b7-bbf4-a64d973de743",
      ka: "シャ",
      hi: "しゃ",
      transliterations: ["SHA", "SHA", "SHA", "СЯ"],
    },
    {
      id: "fa4fb436-a0fc-413d-abbf-27e5f8d0b941",
      ka: "シュ",
      hi: "しゅ",
      transliterations: ["SHU", "SHU", "SHU", "СЮ"],
    },
    {
      id: "e69b7da1-daaf-4dfc-81b7-0693f48ad97d",
      ka: "ショ",
      hi: "しょ",
      transliterations: ["SHO", "SHO", "SHO", "СЁ"],
    },
  ],
  [
    {
      id: "57dd1702-6b32-473b-aac6-bafd6344b59c",
      ka: "チャ",
      hi: "ちゃ",
      transliterations: ["CHA", "CHA", "CHA", "ТЯ"],
    },
    {
      id: "78245c5d-c44b-461d-8734-18a1ead49b93",
      ka: "チュ",
      hi: "ちゅ",
      transliterations: ["CHU", "CHU", "CHU", "ТЮ"],
    },
    {
      id: "3ea7d433-fd0a-42f1-a049-e51f8c890fab",
      ka: "チョ",
      hi: "ちょ",
      transliterations: ["CHO", "CHO", "CHO", "ТЁ"],
    },
  ],
  [
    {
      id: "f50bbf46-cbd3-4652-b32d-a7ea63d71073",
      ka: "ニャ",
      hi: "にゃ",
      transliterations: ["NYA", "NYA", "NYA", "НЯ"],
    },
    {
      id: "a8684a65-29d7-468d-bf54-16a1a5c1dc57",
      ka: "ニュ",
      hi: "にゅ",
      transliterations: ["NYU", "NYU", "NYU", "НЮ"],
    },
    {
      id: "108f5fcc-b005-451f-8004-7ca2e0c295c3",
      ka: "ニョ",
      hi: "にょ",
      transliterations: ["NYO", "NYO", "NYO", "НЁ"],
    },
  ],
  [
    {
      id: "d765162e-6fb9-4213-bc8c-928a77f6db6e",
      ka: "ヒャ",
      hi: "ひゃ",
      transliterations: ["HYA", "HYA", "HYA", "ХЯ"],
    },
    {
      id: "16699951-c484-42e4-889a-8170e46c36cd",
      ka: "ヒュ",
      hi: "ひゅ",
      transliterations: ["HYU", "HYU", "HYU", "ХЮ"],
    },
    {
      id: "6334c6a8-3b58-411a-9698-476078765d85",
      ka: "ヒョ",
      hi: "ひょ",
      transliterations: ["HYO", "HYO", "HYO", "ХЁ"],
    },
  ],
  [
    {
      id: "1c2c7c7f-1058-4665-9c5c-db5371ecc80c",
      ka: "ミャ",
      hi: "みゃ",
      transliterations: ["MYA", "MYA", "MYA", "МЯ"],
    },
    {
      id: "32c07e97-0d48-457b-b9ea-c235ea5f0805",
      ka: "ミュ",
      hi: "みゅ",
      transliterations: ["MYU", "MYU", "MYU", "МЮ"],
    },
    {
      id: "3d4e3138-74d7-48c7-8275-fcd18ff4d470",
      ka: "ミョ",
      hi: "みょ",
      transliterations: ["MYO", "MYO", "MYO", "МЁ"],
    },
  ],
  [
    {
      id: "3342a4aa-9f35-46f1-9e6b-490897f5f9c0",
      ka: "リャ",
      hi: "りゃ",
      transliterations: ["RYA", "RYA", "RYA", "РЯ"],
    },
    {
      id: "74fe5cce-74ab-4335-8c6c-49e5906711be",
      ka: "リュ",
      hi: "りゅ",
      transliterations: ["RYU", "RYU", "RYU", "РЮ"],
    },
    {
      id: "3aa9f1c6-21d3-419f-ad97-fda28085a281",
      ka: "リョ",
      hi: "りょ",
      transliterations: ["RYO", "RYO", "RYO", "РЁ"],
    },
  ],
  [
    {
      id: "94cb6083-8132-426b-8388-36199c7fd9a3",
      ka: "ギャ",
      hi: "ぎゃ",
      transliterations: ["GYA", "GYA", "GYA", "ГЯ"],
    },
    {
      id: "0b0ff0f8-509d-45ed-8847-ea3ea4f415a5",
      ka: "ギュ",
      hi: "ぎゅ",
      transliterations: ["GYU", "GYU", "GYU", "ГЮ"],
    },
    {
      id: "3d03b236-004b-4077-8a47-518840cfc8aa",
      ka: "ギョ",
      hi: "ぎょ",
      transliterations: ["GYO", "GYO", "GYO", "ГЁ"],
    },
  ],
  [
    {
      id: "d0cc30d4-a773-4520-bc91-0d0b15433230",
      ka: "ジャ",
      hi: "じゃ",
      transliterations: ["JA", "JA", "JA", "ДЗЯ"],
    },
    {
      id: "f357d6b0-aa4f-4693-8b29-fb0aeec31870",
      ka: "ジュ",
      hi: "じゅ",
      transliterations: ["JU", "JU", "JU", "ДЗЮ"],
    },
    {
      id: "2da51f90-28ec-4eb3-be27-aceb72d1a851",
      ka: "ジョ",
      hi: "じょ",
      transliterations: ["JO", "JO", "JO", "ДЗЁ"],
    },
  ],
  [
    {
      id: "65bc1325-2759-478b-b091-52875971d270",
      ka: "ヂャ",
      hi: "ぢゃ",
      transliterations: ["JA", "JA", "JA", "ДЗЯ"],
    },
    {
      id: "3500260f-59ec-4483-b58c-7e78004d7303",
      ka: "ヂュ",
      hi: "ぢゅ",
      transliterations: ["JU", "JU", "JU", "ДЗЮ"],
    },
    {
      id: "22b50fcf-c8cc-4ed2-90d6-04ce2af2e7ac",
      ka: "ヂョ",
      hi: "ぢょ",
      transliterations: ["JO", "JO", "JO", "ДЗЁ"],
    },
  ],
  [
    {
      id: "f4e5e435-69a8-48ca-8366-e46481581dc4",
      ka: "ビャ",
      hi: "びゃ",
      transliterations: ["BYA", "BYA", "BYA", "БЯ"],
    },
    {
      id: "5b38a9ea-62cd-4341-8ecc-bb02c7affd67",
      ka: "ビュ",
      hi: "びゅ",
      transliterations: ["BYU", "BYU", "BYU", "БЮ"],
    },
    {
      id: "74876afc-d65c-42cf-9589-0db573fb752e",
      ka: "ビョ",
      hi: "びょ",
      transliterations: ["BYO", "BYO", "BYO", "БЁ"],
    },
  ],
  [
    {
      id: "8be1debc-5346-4979-bfde-913a90ab0122",
      ka: "ピャ",
      hi: "ぴゃ",
      transliterations: ["PYA", "PYA", "PYA", "ПЯ"],
    },
    {
      id: "ce908138-f0b0-4fee-9cfa-78a6f2a6cb3a",
      ka: "ピュ",
      hi: "ぴゅ",
      transliterations: ["PYU", "PYU", "PYU", "ПЮ"],
    },
    {
      id: "45435756-de47-4f76-89b7-17d27aee49c7",
      ka: "ピョ",
      hi: "ぴょ",
      transliterations: ["PYO", "PYO", "PYO", "ПЁ"],
    },
  ],
];

export const lettersTableBase = Object.fromEntries(base.flat().map((item) => [item.id, item]));
export const lettersTableDakuon = Object.fromEntries(dakuon.flat().map((item) => [item.id, item]));
export const lettersTableHandakuon = Object.fromEntries(
  handakuon.flat().map((item) => [item.id, item]),
);
export const lettersTableYoon = Object.fromEntries(yoon.flat().map((item) => [item.id, item]));

export const lettersTableById = {
  ...lettersTableBase,
  ...lettersTableDakuon,
  ...lettersTableHandakuon,
  ...lettersTableYoon,
};

export const baseFlatLettersId = base.flat(1).map((item) => item.id);
export const dakuonFlatLettersId: string[] = dakuon.flat(1).map((item) => item.id);
export const handakuonFlatLettersId: string[] = handakuon.flat(1).map((item) => item.id);
export const yoonFlatLettersId: string[] = yoon.flat(1).map((item) => item.id);

export const lettersMap = new Map<string, ILetter>();

export function initTransliterationMap(): void {
  base.flat().forEach((letter) => {
    lettersMap.set(letter.id, letter);
  });
  dakuon.flat().forEach((letter) => {
    lettersMap.set(letter.id, letter);
  });
  handakuon.flat().forEach((letter) => {
    lettersMap.set(letter.id, letter);
  });
  yoon.flat().forEach((letter) => {
    lettersMap.set(letter.id, letter);
  });
}

function buildLookupMap(): Map<string, ILetter> {
  const map = new Map<string, ILetter>();

  const allGroups = [yoon, handakuon, dakuon, base];

  for (const group of allGroups) {
    for (const row of group) {
      for (const letter of row) {
        if (!map.has(letter.ka)) map.set(letter.ka, letter);
        if (!map.has(letter.hi)) map.set(letter.hi, letter);
      }
    }
  }

  return map;
}

export const lookupMap = buildLookupMap();
