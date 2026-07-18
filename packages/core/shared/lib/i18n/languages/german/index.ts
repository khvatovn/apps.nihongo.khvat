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
    check: "Überprüfen",
    welcome: "Willkommen",
  },

  tabs: {
    boards: "Boards",
    learning: "Lektionen",
    practice: "Übung",
    kana: "Kana",
    settings: "Einstellungen",
    profile: "Profile",
  },

  practice: {
    question: "Frage",

    modes: {
      mixed: { title: "Mixte", subtitle: "Tout en même temps" },
      testing: { title: "Test", subtitle: "Wähle die Antwort gegen die Zeit" },
      drawing: { title: "Zeichnen", subtitle: "Zeichne Hiragana/Katakana" },
      listening: { title: "Hören", subtitle: "Wähle die richtige Antwort" },
      multipleChoice: { title: "Wortauswahl", subtitle: "Wähle die richtige Antwort" },
      matchingPairs: { title: "Paare zuordnen", subtitle: "Wörterpaare zuordnen" },
      wordBuilding: { title: "Wortbildung", subtitle: "Bilde ein Wort" },
      typing: { title: "Tippen", subtitle: "Schreibe die Silbe" },
    },

    playAudio: "Audio abspielen",

    selectCorrectTransliteration: "Wähle die richtige Transliteration.",
    selectHiraganaForWord: "Wähle die Hiragana in der richtigen Reihenfolge.",
    selectKatakanaForWord: "Wähle die Katakana in der richtigen Reihenfolge.",

    alert: {
      insufficientKanaSelected: {
        title: "Nicht genug Zeichen",
        subtitle: "Bitte wähle {count} Hiragana- oder {count} Katakana-Zeichen aus.",
      },
      insufficientBaseKanaSelected: {
        title: "Nicht genug Zeichen",
        subtitle:
          "Bitte wähle {count} grundlegende Hiragana- oder Katakana-Zeichen (ohne Dakuten, Handakuten und Yōon) aus.",
      },
      insufficientWordsAvailable: {
        title: "Nicht genug Wörter verfügbar",
        subtitle:
          "Es sind weniger Wörter verfügbar als benötigt. Bitte wähle mehr Hiragana- oder Katakana-Silben aus.",
      },
    },
  },

  kana: {
    hiragana: "Hiragana",
    katakana: "Katakana",
    romaji: "Rōmaji",

    basic: "Grundlegend",
    dakuon: "Dakuten",
    handakuon: "Handakuten",
    yoon: "Yōon",
  },

  selectKana: {
    words: "Wörter für die Übung",
    nothingSelected: "Nichts ausgewählt",
  },

  settings: {
    logout: {
      button: "Log out",
      title: "Log out?",
      subtitle: "You will be logged out and all local data on this device will be cleared.",
    },
    deleteAccount: {
      button: "Remove account",
      title: "Delete account?",
      subtitle:
        "Enter the 6-digit code we sent to your email. This action is permanent and cannot be undone.",
      confirm: "Delete account",
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
    termsAndConditions: "Allgemeine Geschäftsbedingungen",
    privacyPolicy: "Datenschutzrichtlinie",
    contactSupport: "Support kontaktieren",

    rateApp: {
      title: "App bewerten",
      subtitle: "Das hilft uns sehr",
    },

    joinOurCommunity: {
      title: "Tritt unserer Community bei",
    },

    eraseData: {
      button: "App-Daten löschen",
      dataTakesUp: "Verwendeter Speicherplatz",
      title: "Möchtest du die Daten wirklich löschen?",
      subtitle:
        "Alle Daten inklusive Einstellungen und Fortschritte werden gelöscht. Dieser Vorgang kann nicht rückgängig gemacht werden.",
    },

    sourceCode: {
      title: "Quellcode",
      githubRepository: "GitHub-Repository",
    },

    version: "Version",
  },

  result: {
    title: "Übung abgeschlossen",
    score: "Punktzahl",

    sec: "Sek.",
    min: "Min.",

    question: "Frage",

    done: "Fertig",
  },

  lessonsList: {
    failedToLoadLessons:
      "Lektionen konnten nicht geladen werden. Bitte versuchen Sie es später erneut.",
    completed: "abgeschlossen",
  },

  lesson: {
    matchHiraganaWithTransliteration: "Ordne Hiragana der Transliteration zu.",
    matchKatakanaWithTransliteration: "Ordne Katakana der Transliteration zu.",
    practiceEveryDay: "Übe täglich, um dein Wissen zu festigen.",
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
      title: "Möchtest du wirklich beenden?",
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
      privacy: "Datenschutzrichtlinie",
    },
    continueWithGoogle: "Mit Google fortfahren",
    signUpWithEmail: "Mit E-Mail registrieren",
    alreadyHaveAccount: "Du hast bereits ein Konto?",
    login: "Anmelden",
    continueWithoutLogin: "Ohne Anmeldung fortfahren",
    fields: {
      name: "Name",
      email: "Email address",
      password: "Password",
      newPassword: "New password",
      repeatPassword: "Retype new password",
      birthDate: "Date of birth",
      code: "Code",
    },
    signIn: {
      title: "Sign in",
      submit: "Log in",
    },
    signUp: {
      title: "Create an account",
      submit: "Create account",
    },
    verifyEmail: {
      title: "Verify your email",
      subtitle: "Enter the code from the email. We sent it to {{email}}",
      submit: "Next",
      resend: "Send another code",
      resendCooldown: "Send another code ({{seconds}})",
    },
    resetPassword: {
      title: "Forgot password?",
      subtitle: "Enter your email address to receive a code to reset your password.",
      changeTitle: "Change your password",
      confirm: "Confirm",
    },
    errors: {
      nameRequired: "Enter your name",
      emailRequired: "Enter your email",
      invalidEmail: "Invalid email",
      dateRequired: "Select your date of birth",
      tooYoung: "Minimum age is 13",
      passwordMin: "At least 8 characters",
      passwordLetter: "Add at least one letter",
      passwordDigit: "Add at least one digit",
      passwordRepeat: "Repeat the password",
      passwordsMismatch: "Passwords do not match",
      emailTaken: "Email already registered",
      weakPassword: "Password is too weak",
      invalidDate: "Invalid date or age under 13",
      requestFailed: "Couldn't send the request. Please try again later.",
      somethingWrong: "Something went wrong. Please try again later.",
      codeRequired: "Enter the 6-digit code",
      invalidCode: "Invalid code",
      codeExpired: "The code has expired",
      tooManyAttempts: "Too many attempts, please try later",
      resendCooldown: "Please wait before requesting a new code",
      passwordRequired: "Enter your password",
      invalidCredentials: "Invalid email or password",
      emailNotVerified: "Email is not verified",
      useGoogleToSignIn: "This account uses Google sign-in",
      invalidResetToken: "Reset session expired. Request a new code.",
      accountMigrating: "Account is being transferred. Please try again later.",
    },
  },
  profile: {
    signInPrompt: "Sign in to {{app}} to sync your progress across devices.",
    signInButton: "Sign in or create an account",
  },
  debug: {
    store: "Store",
    deviceId: "Device ID",
    apiServers: "API Servers",
    notificationToken: "Notification Token",
    checking: "Checking…",
    pinging: "Pinging…",
    unreachable: "Unavailable",
    autoSelect: "Auto-select",
    addHost: "Add",
    removeData: "Remove data",
  },
  verbForm: {
    title: "Verb forms:",
    teForm: "て form:",
    taForm: "た form:",
    naiForm: "ない form:",
    dictionaryForm: "Dictionary form:",
    potentialForm: "Potential form:",
    volitionalForm: "Volitional mood:",
    imperativeForm: "Imperative mood:",
    prohibitiveForm: "Prohibitive mood:",
    conditionalForm: "Conditional form - ば:",
    negativeConditionalForm: "Negative conditional form - ば:",
    passiveForm: "Passive voice:",
    verbCausative: "Causative form:",
  },
  boards: {
    title: "Boards:",
    createOwn: "Create own",
  },
  board: {
    searchPlaceholder: "Search",
    searchResults: "Search",
    nothingFound: "Nothing found",
    sectionsTitle: "Sections",
  },
  card: {
    examples: "Examples:",
    open: "Open",
    alreadySeen: "Already seen",
  },
  promotionTelegram: {
    title: "Congratulations, you've found a lucky bug!",
    reasonSingle:
      "Since there aren't that many bugs in the app anymore, far fewer people visit my Telegram channel to report issues, and far fewer people subscribe to me",
    reasonMultiple:
      "Since there aren't that many bugs in the app anymore, far fewer people visit our Telegram channels to report issues, and far fewer people subscribe to us",
    instructionTitle: "Here's what you need to do:",
    stepGo: "- Go to {{channel}}",
    stepSubscribeSingle: "- Subscribe (I'll be posting lots of interesting stuff)",
    stepSubscribeMultiple: "- Subscribe (we'll be posting lots of interesting stuff)",
    dontMakeMe: "Don't make me add real bugs :)",
    channelSingle: "My Telegram channel",
    channelMultiple: "Our Telegram channels",
    fixMyself: "I'll fix it myself",
  },
};

export default German;
