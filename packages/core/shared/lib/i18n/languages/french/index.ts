const French = {
  common: {
    done: "Terminé",
    close: "Fermer",
    reset: "Réinitialiser",
    back: "Retour",
    next: "Suivant",
    retry: "Réessayer",
    complete: "Terminer",
    start: "Démarrer",
    check: "Vérifier",
    welcome: "Bienvenue",
  },

  tabs: {
    boards: "Boards",
    learning: "Leçons",
    practice: "Pratique",
    kana: "Kana",
    settings: "Paramètres",
    profile: "Profile",
  },

  practice: {
    question: "Question",

    modes: {
      mixed: { title: "Mixte", subtitle: "Tout en même temps" },
      testing: { title: "Test", subtitle: "Choisissez une réponse contre la montre" },
      drawing: { title: "Dessin", subtitle: "Dessinez les Hiragana/Katakana" },
      listening: { title: "Écoute", subtitle: "Sélectionnez la bonne réponse" },
      multipleChoice: { title: "Sélection de mot", subtitle: "Choisissez la bonne réponse" },
      matchingPairs: { title: "Paires correspondantes", subtitle: "Associez les paires de mots" },
      wordBuilding: { title: "Formation de mots", subtitle: "Formez un mot" },
      typing: { title: "Saisie", subtitle: "Tapez la syllabe" },
    },

    playAudio: "Lire l'audio",

    selectCorrectTransliteration: "Sélectionnez la translittération correcte.",
    selectHiraganaForWord: "Sélectionnez les Hiragana dans l'ordre correct.",
    selectKatakanaForWord: "Sélectionnez les Katakana dans l'ordre correct.",

    alert: {
      insufficientKanaSelected: {
        title: "Pas assez de caractères",
        subtitle:
          "Veuillez sélectionner {count} caractères Hiragana ou {count} caractères Katakana.",
      },
      insufficientBaseKanaSelected: {
        title: "Pas assez de caractères",
        subtitle:
          "Veuillez sélectionner {count} Hiragana ou Katakana de base (hors dakuten, handakuten et yōon).",
      },
      insufficientWordsAvailable: {
        title: "Pas assez de mots disponibles",
        subtitle:
          "Il y a moins de mots disponibles que requis. Veuillez sélectionner plus de syllabes Hiragana ou Katakana.",
      },
    },
  },

  kana: {
    hiragana: "Hiragana",
    katakana: "Katakana",
    romaji: "Romaji",

    basic: "De base",
    dakuon: "Dakuon",
    handakuon: "Handakuon",
    yoon: "Yōon",
  },

  selectKana: {
    words: "Mots pour la pratique",
    nothingSelected: "Rien de sélectionné",
  },

  settings: {
    logout: {
      button: "Log out",
      title: "Log out?",
      subtitle: "You will be logged out and all local data on this device will be cleared.",
    },
    displayStatistics: "Afficher les statistiques",
    hapticFeedback: "Retour haptique",
    theme: {
      title: "Thème",
      light: "Clair",
      dark: "Sombre",
      auto: "Automatique",
    },
    language: "Langue",
    termsAndConditions: "Conditions Générales d'Utilisation",
    privacyPolicy: "Politique de confidentialité",
    contactSupport: "Contacter le support",

    rateApp: {
      title: "Noter l'application",
      subtitle: "Cela nous aide vraiment beaucoup",
    },

    joinOurCommunity: {
      title: "Rejoignez notre communauté",
    },

    eraseData: {
      button: "Effacer les données",
      dataTakesUp: "Données utilisées",
      title: "Voulez-vous vraiment effacer les données ?",
      subtitle:
        "Toutes les données, y compris les paramètres et les progrès, seront supprimées. Cette action est irréversible.",
    },

    sourceCode: {
      title: "Code source",
      githubRepository: "Dépôt GitHub",
    },

    version: "Version",
  },

  result: {
    title: "Pratique terminée",
    score: "Score",

    sec: "sec",
    min: "min",

    question: "question",

    done: "Terminé",
  },

  lessonsList: {
    failedToLoadLessons: "Échec du chargement des leçons. Veuillez réessayer plus tard.",
    completed: "terminé",
  },

  lesson: {
    matchHiraganaWithTransliteration: "Associez l'Hiragana avec la translittération.",
    matchKatakanaWithTransliteration: "Associez le Katakana avec la translittération.",
    practiceEveryDay: "Pratiquez chaque jour pour renforcer vos connaissances.",
    learningComplete: "Leçon terminée !",
  },

  transliterationSystems: {
    romaji: "Rōmaji",
    transliterationSystems: "Systèmes de translittération",
    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
    polivanovSystem: "Système Polivanov",
  },

  alert: {
    exitConformation: {
      title: "Voulez-vous vraiment quitter ?",
      subtitle: "Vos progrès ne seront pas sauvegardés si vous quittez maintenant.",
    },
    newVersion: {
      title: "Une nouvelle version est disponible.",
      subtitle:
        "Cette leçon a été conçue pour une version plus récente. Veuillez mettre à jour l'application.",
    },
    cancel: "Annuler",
    ok: "OK",
    confirm: "Confirmer",
  },

  auth: {
    welcome: {
      firstStep: "Votre première étape pour apprendre le japonais !",
    },
    agreement: {
      prefix: "En continuant, vous acceptez : ",
      terms: "Conditions d’utilisation",
      privacy: "Politique de confidentialité",
    },
    continueWithGoogle: "Continuer avec Google",
    signUpWithEmail: "S’inscrire avec un e-mail",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    login: "Connexion",
    continueWithoutLogin: "Continuer sans connexion",
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

export default French;
