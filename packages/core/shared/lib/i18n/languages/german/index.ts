const German = {
  common: {
    done: "Fertig",
    close: "Schließen",
    reset: "Zurücksetzen",
    back: "Zurück",
    next: "Weiter",
    retry: "Erneut versuchen",
    complete: "Abschließen",
    start: "Starten",
    check: "Prüfen",
    welcome: "Willkommen",
  },

  tabs: {
    boards: "Boards",
    learning: "Lernen",
    practice: "Üben",
    kana: "Kana",
    settings: "Einstellungen",
    profile: "Profil",
  },

  practice: {
    question: "Frage",

    modes: {
      mixed: { title: "Gemischt", subtitle: "Alles auf einmal" },
      testing: { title: "Test", subtitle: "Antwort gegen die Zeit wählen" },
      drawing: { title: "Zeichnen", subtitle: "Hiragana / Katakana zeichnen" },
      listening: { title: "Hörverstehen", subtitle: "Die richtige Antwort wählen" },
      multipleChoice: { title: "Wortauswahl", subtitle: "Die richtige Antwort wählen" },
      matchingPairs: { title: "Paare bilden", subtitle: "Wortpaare zusammenstellen" },
      wordBuilding: { title: "Wortbildung", subtitle: "Ein Wort bilden" },
      typing: { title: "Eingabe", subtitle: "Die Silbe schreiben" },
    },

    playAudio: "Audio abspielen",

    selectCorrectTransliteration: "Wähle die richtige Transliteration.",
    selectHiraganaForWord: "Wähle die Hiragana in der richtigen Reihenfolge.",
    selectKatakanaForWord: "Wähle die Katakana in der richtigen Reihenfolge.",

    alert: {
      insufficientKanaSelected: {
        title: "Nicht genug Zeichen",
        subtitle: "Bitte wähle {count} Hiragana-Zeichen oder {count} Katakana-Zeichen aus.",
      },
      insufficientBaseKanaSelected: {
        title: "Nicht genug Zeichen",
        subtitle:
          "Bitte wähle {count} grundlegende Hiragana- oder {count} grundlegende Katakana-Zeichen aus (ohne Dakuten, Handakuten und Yōon).",
      },
      insufficientWordsAvailable: {
        title: "Nicht genug verfügbare Wörter",
        subtitle:
          "Es sind weniger Wörter verfügbar als benötigt. Bitte wähle mehr Hiragana- oder Katakana-Silben aus.",
      },
    },
  },

  kana: {
    hiragana: "Hiragana",
    katakana: "Katakana",
    romaji: "Romaji",

    basic: "Grundformen",
    dakuon: "Dakuon",
    handakuon: "Handakuon",
    yoon: "Yōon",
  },

  selectKana: {
    words: "Wörter zum Üben",
    nothingSelected: "Nichts ausgewählt",
  },

  settings: {
    logout: {
      button: "Abmelden",
      title: "Abmelden?",
      subtitle: "Du wirst abgemeldet und alle lokalen Daten auf diesem Gerät werden gelöscht.",
    },
    deleteAccount: {
      button: "Konto löschen",
      title: "Konto löschen?",
      subtitle:
        "Gib den 6-stelligen Code aus der E-Mail ein. Diese Aktion ist unwiderruflich – Konto und alle Daten werden gelöscht.",
      confirm: "Konto löschen",
    },
    displayStatistics: "Statistiken anzeigen",
    hapticFeedback: "Haptisches Feedback",
    theme: {
      title: "Design",
      light: "Hell",
      dark: "Dunkel",
      auto: "Automatisch",
    },
    language: "Sprache",
    termsAndConditions: "Nutzungsbedingungen",
    privacyPolicy: "Datenschutzerklärung",
    contactSupport: "Support kontaktieren",

    rateApp: {
      title: "App bewerten",
      subtitle: "Das hilft uns wirklich sehr",
    },

    joinOurCommunity: {
      title: "Tritt unserer Community bei",
    },

    eraseData: {
      button: "App-Daten löschen",
      dataTakesUp: "Daten belegen",
      title: "Bist du sicher, dass du die Daten löschen möchtest?",
      subtitle:
        "Alle gespeicherten Daten, einschließlich Einstellungen und Fortschritt, werden gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.",
    },

    sourceCode: {
      title: "Quellcode",
      githubRepository: "GitHub-Repository",
    },

    version: "Version",
  },

  result: {
    title: "Übung beendet",
    score: "Punktzahl",

    sec: "Sek",
    min: "Min",

    question: "Frage",

    done: "Fertig",
  },

  lessonsList: {
    completed: "abgeschlossen",
    failedToLoadLessons: "Lektionen konnten nicht geladen werden, bitte versuche es später erneut.",
  },

  lesson: {
    matchHiraganaWithTransliteration: "Ordne Hiragana der Transliteration zu.",
    matchKatakanaWithTransliteration: "Ordne Katakana der Transliteration zu.",
    practiceEveryDay: "Übe jeden Tag, um dein Wissen zu festigen.",
    learningComplete: "Lektion abgeschlossen!",
  },

  transliterationSystems: {
    romaji: "Romaji",
    transliterationSystems: "Transliterationssysteme",
    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
    polivanovSystem: "Polivanov-System",
  },

  alert: {
    exitConformation: {
      title: "Bist du sicher, dass du beenden möchtest?",
      subtitle: "Dein Fortschritt wird nicht gespeichert, wenn du jetzt beendest.",
    },
    newVersion: {
      title: "Eine neue Version ist verfügbar.",
      subtitle:
        "Diese Lektion wurde für eine neuere App-Version erstellt. Bitte aktualisiere die App.",
    },
    cancel: "Abbrechen",
    ok: "OK",
    confirm: "Bestätigen",
  },

  auth: {
    welcome: {
      firstStep: "Dein erster Schritt zum Japanischlernen!",
    },
    agreement: {
      prefix: "Indem du fortfährst, akzeptierst du: ",
      terms: "Nutzungsbedingungen",
      privacy: "Datenschutzerklärung",
    },
    continueWithGoogle: "Mit Google fortfahren",
    signUpWithEmail: "Mit E-Mail registrieren",
    alreadyHaveAccount: "Hast du bereits ein Konto?",
    login: "Anmelden",
    continueWithoutLogin: "Ohne Anmeldung fortfahren",
    fields: {
      name: "Name",
      email: "E-Mail-Adresse",
      password: "Passwort",
      newPassword: "Neues Passwort",
      repeatPassword: "Neues Passwort wiederholen",
      birthDate: "Geburtsdatum",
      code: "Code",
    },
    signIn: {
      title: "Anmelden",
      submit: "Anmelden",
    },
    signUp: {
      title: "Konto erstellen",
      submit: "Konto erstellen",
    },
    verifyEmail: {
      title: "E-Mail bestätigen",
      subtitle: "Gib den Code aus der E-Mail ein. Wir haben ihn an {{email}} gesendet",
      submit: "Weiter",
      resend: "Neuen Code senden",
      resendCooldown: "Neuen Code senden ({{seconds}})",
    },
    resetPassword: {
      title: "Passwort vergessen?",
      subtitle:
        "Gib deine E-Mail-Adresse ein, um einen Code zum Zurücksetzen des Passworts zu erhalten.",
      changeTitle: "Passwort ändern",
      confirm: "Bestätigen",
    },
    errors: {
      nameRequired: "Gib deinen Namen ein",
      emailRequired: "Gib deine E-Mail ein",
      invalidEmail: "Ungültige E-Mail",
      dateRequired: "Gib dein Geburtsdatum an",
      tooYoung: "Mindestalter ist 13 Jahre",
      passwordMin: "Mindestens 8 Zeichen",
      passwordLetter: "Mindestens ein Buchstabe erforderlich",
      passwordDigit: "Mindestens eine Ziffer erforderlich",
      passwordRepeat: "Passwort wiederholen",
      passwordsMismatch: "Passwörter stimmen nicht überein",
      emailTaken: "E-Mail bereits registriert",
      weakPassword: "Passwort ist zu schwach",
      invalidDate: "Ungültiges Datum oder Alter unter 13",
      requestFailed: "Anfrage konnte nicht gesendet werden. Bitte versuche es später erneut.",
      somethingWrong: "Etwas ist schiefgelaufen. Bitte versuche es später erneut.",
      codeRequired: "Gib den 6-stelligen Code ein",
      invalidCode: "Ungültiger Code",
      codeExpired: "Code ist abgelaufen",
      tooManyAttempts: "Zu viele Versuche, bitte versuche es später",
      resendCooldown: "Bitte warte, bevor du einen neuen Code anforderst",
      passwordRequired: "Gib dein Passwort ein",
      invalidCredentials: "Ungültige E-Mail oder Passwort",
      emailNotVerified: "E-Mail ist nicht bestätigt",
      useGoogleToSignIn: "Dieses Konto verwendet die Google-Anmeldung",
      invalidResetToken: "Zurücksetzungs-Sitzung abgelaufen. Fordere einen neuen Code an.",
      accountMigrating: "Konto wird übertragen. Bitte versuche es später erneut.",
    },
  },
  profile: {
    signInPrompt:
      "Melde dich bei {{app}} an, um deinen Fortschritt auf allen Geräten zu synchronisieren.",
    signInButton: "Anmelden oder Konto erstellen",
  },
  debug: {
    store: "Store",
    deviceId: "Geräte-ID",
    apiServers: "API-Server",
    notificationToken: "Benachrichtigungs-Token",
    checking: "prüfe…",
    pinging: "pinge…",
    unreachable: "nicht erreichbar",
    autoSelect: "Automatisch auswählen",
    addHost: "Hinzufügen",
    removeData: "Daten löschen",
  },
  verbForm: {
    title: "Verbformen:",
    teForm: "て-Form:",
    taForm: "た-Form:",
    naiForm: "ない-Form:",
    dictionaryForm: "Wörterbuchform:",
    potentialForm: "Potenzialform:",
    volitionalForm: "Volitivform:",
    imperativeForm: "Imperativ:",
    prohibitiveForm: "Prohibitivform:",
    conditionalForm: "Konditionalform - ば:",
    negativeConditionalForm: "Negative Konditionalform - ば:",
    passiveForm: "Passiv:",
    verbCausative: "Kausativform:",
  },
  boards: {
    title: "Boards:",
    createOwn: "Eigenes erstellen",
  },
  board: {
    searchPlaceholder: "Suche",
    searchResults: "Suchergebnisse",
    nothingFound: "Nichts gefunden",
    sectionsTitle: "Abschnitte",
  },
  card: {
    examples: "Beispiele:",
    open: "Öffnen",
    alreadySeen: "Bereits gesehen",
  },
  promotionTelegram: {
    title: "Glückwunsch, du hast einen Glücksbug gefunden!",
    reasonSingle:
      "Da es in der App nicht mehr so viele Bugs gibt, schauen viel weniger Leute in meinen Telegram-Kanal, um Probleme zu melden, und viel weniger Leute abonnieren mich",
    reasonMultiple:
      "Da es in der App nicht mehr so viele Bugs gibt, schauen viel weniger Leute in unsere Telegram-Kanäle, um Probleme zu melden, und viel weniger Leute abonnieren uns",
    instructionTitle: "So gehst du vor:",
    stepGo: "- Gehe zu {{channel}}",
    stepSubscribeSingle: "- Abonnieren (ich poste viel Interessantes)",
    stepSubscribeMultiple: "- Abonnieren (wir posten viel Interessantes)",
    dontMakeMe: "Zwing mich nicht, echte Bugs einzubauen :)",
    channelSingle: "Mein Telegram-Kanal",
    channelMultiple: "Unsere Telegram-Kanäle",
    fixMyself: "Ich repariere es selbst",
  },
};

export default German;
