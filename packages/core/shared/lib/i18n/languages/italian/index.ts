const Italian = {
  common: {
    done: "Fatto",
    close: "Chiudi",
    reset: "Reimposta",
    back: "Indietro",
    next: "Avanti",
    retry: "Riprova",
    complete: "Completa",
    start: "Inizia",
    check: "Controlla",
    welcome: "Benvenuto",
  },

  tabs: {
    learning: "Lezioni",
    practice: "Pratica",
    kana: "Kana",
    settings: "Impostazioni",
    profile: "Profile",
  },

  practice: {
    question: "Domanda",

    modes: {
      mixed: { title: "Misto", subtitle: "Tutto insieme" },
      testing: { title: "Test", subtitle: "Scegli una risposta contro il tempo" },
      drawing: { title: "Disegno", subtitle: "Disegna l'Hiragana/Katakana" },
      listening: { title: "Ascolto", subtitle: "Seleziona la risposta corretta" },
      multipleChoice: { title: "Scelta multipla", subtitle: "Scegli la risposta corretta" },
      matchingPairs: { title: "Coppie", subtitle: "Abbina le coppie di parole" },
      wordBuilding: { title: "Costruzione di parole", subtitle: "Forma una parola" },
      typing: { title: "Digitazione", subtitle: "Digita la sillaba" },
    },

    playAudio: "Riproduci audio",

    selectCorrectTransliteration: "Seleziona la traslitterazione corretta.",
    selectHiraganaForWord: "Seleziona l'Hiragana nell'ordine corretto.",
    selectKatakanaForWord: "Seleziona il Katakana nell'ordine corretto.",

    alert: {
      insufficientKanaSelected: {
        title: "Caratteri insufficienti",
        subtitle: "Seleziona {count} caratteri di Hiragana o {count} caratteri di Katakana.",
      },
      insufficientBaseKanaSelected: {
        title: "Caratteri insufficienti",
        subtitle:
          "Seleziona {count} caratteri di Hiragana o Katakana di base (escludendo dakuten, handakuten e yōon).",
      },
      insufficientWordsAvailable: {
        title: "Parole insufficienti disponibili",
        subtitle:
          "Ci sono meno parole disponibili di quelle richieste. Seleziona più sillabe di Hiragana o Katakana.",
      },
    },
  },

  kana: {
    hiragana: "Hiragana",
    katakana: "Katakana",
    romaji: "Romaji",

    basic: "Base",
    dakuon: "Dakuon",
    handakuon: "Handakuon",
    yoon: "Yōon",
  },

  selectKana: {
    words: "Parole per la pratica",
    nothingSelected: "Nessuna selezione",
  },

  settings: {
    logout: {
      button: "Log out",
      title: "Log out?",
      subtitle: "You will be logged out and all local data on this device will be cleared.",
    },
    displayStatistics: "Mostra statistiche",
    hapticFeedback: "Feedback aptico",
    theme: {
      title: "Tema",
      light: "Chiaro",
      dark: "Scuro",
      auto: "Automatico",
    },
    language: "Lingua",
    termsAndConditions: "Termini e Condizioni",
    privacyPolicy: "Informativa sulla privacy",
    contactSupport: "Contatta il supporto",

    rateApp: {
      title: "Valuta l'app",
      subtitle: "Ci aiuta davvero molto",
    },

    joinOurCommunity: {
      title: "Unisciti alla nostra community",
    },

    eraseData: {
      button: "Cancella i dati",
      dataTakesUp: "Dati utilizzati",
      title: "Sei sicuro di voler cancellare i dati?",
      subtitle:
        "Tutti i dati, comprese le impostazioni e i progressi, verranno eliminati. Questa azione è irreversibile.",
    },

    sourceCode: {
      title: "Codice sorgente",
      githubRepository: "Repository GitHub",
    },

    version: "Versione",
  },

  result: {
    title: "Pratica completata",
    score: "Punteggio",

    sec: "sec",
    min: "min",

    question: "domanda",

    done: "Fatto",
  },

  lessonsList: {
    failedToLoadLessons: "Impossibile caricare le lezioni. Riprova più tardi.",
    completed: "completato",
  },

  lesson: {
    matchHiraganaWithTransliteration: "Abbina l'Hiragana alla traslitterazione.",
    matchKatakanaWithTransliteration: "Abbina il Katakana alla traslitterazione.",
    practiceEveryDay: "Pratica ogni giorno per rafforzare le tue conoscenze.",
    learningComplete: "Lezione completata!",
  },

  transliterationSystems: {
    romaji: "Rōmaji",
    transliterationSystems: "Sistemi di traslitterazione",
    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
    polivanovSystem: "Sistema Polivanov",
  },

  alert: {
    exitConformation: {
      title: "Sei sicuro di voler uscire?",
      subtitle: "I tuoi progressi non verranno salvati se esci ora.",
    },
    newVersion: {
      title: "È disponibile una nuova versione.",
      subtitle:
        "Questa lezione è stata creata per una versione più recente dell'app. Aggiorna l'applicazione.",
    },
    cancel: "Annulla",
    ok: "OK",
    confirm: "Conferma",
  },

  auth: {
    welcome: {
      firstStep: "Il tuo primo passo per imparare il giapponese!",
    },
    agreement: {
      prefix: "Continuando, accetti: ",
      terms: "Condizioni di servizio",
      privacy: "Informativa sulla privacy",
    },
    continueWithGoogle: "Continua con Google",
    signUpWithEmail: "Registrati con email",
    alreadyHaveAccount: "Hai già un account?",
    login: "Accedi",
    continueWithoutLogin: "Continua senza accedere",
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
};

export default Italian;
