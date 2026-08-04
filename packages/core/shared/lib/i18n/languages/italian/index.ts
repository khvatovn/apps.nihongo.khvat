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
    boards: "Bacheche",
    learning: "Lezioni",
    practice: "Pratica",
    kana: "Kana",
    settings: "Impostazioni",
    profile: "Profilo",
  },

  practice: {
    question: "Domanda",

    modes: {
      mixed: { title: "Misto", subtitle: "Tutto insieme" },
      testing: { title: "Test", subtitle: "Scegli una risposta a tempo" },
      drawing: { title: "Disegno", subtitle: "Disegna l'hiragana / katakana" },
      listening: { title: "Ascolto", subtitle: "Seleziona la risposta corretta" },
      multipleChoice: { title: "Selezione della parola", subtitle: "Scegli la risposta corretta" },
      matchingPairs: { title: "Abbinamento di coppie", subtitle: "Abbina le coppie di parole" },
      wordBuilding: { title: "Costruzione di parole", subtitle: "Forma una parola" },
      typing: { title: "Digitazione", subtitle: "Scrivi la sillaba" },
    },

    playAudio: "Riproduci audio",

    selectCorrectTransliteration: "Seleziona la traslitterazione corretta.",
    selectHiraganaForWord: "Seleziona l'hiragana nell'ordine corretto.",
    selectKatakanaForWord: "Seleziona il katakana nell'ordine corretto.",

    alert: {
      insufficientKanaSelected: {
        title: "Caratteri insufficienti",
        subtitle: "Seleziona {count} caratteri hiragana o {count} caratteri katakana.",
      },
      insufficientBaseKanaSelected: {
        title: "Caratteri insufficienti",
        subtitle:
          "Seleziona {count} caratteri base di hiragana o {count} caratteri base di katakana (esclusi dakuten, handakuten e yōon).",
      },
      insufficientWordsAvailable: {
        title: "Parole insufficienti",
        subtitle:
          "Ci sono meno parole disponibili di quelle richieste. Seleziona più sillabe di hiragana o katakana.",
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
    yoon: "Yoon",
  },

  selectKana: {
    words: "Parole per la pratica",
    nothingSelected: "Niente selezionato",
  },

  settings: {
    logout: {
      button: "Esci",
      title: "Vuoi uscire dall'account?",
      subtitle:
        "Verrai disconnesso e tutti i dati locali su questo dispositivo verranno eliminati.",
    },
    deleteAccount: {
      button: "Elimina account",
      title: "Eliminare l'account?",
      subtitle:
        "Inserisci il codice a 6 cifre che ti abbiamo inviato via email. Questa azione è permanente e irreversibile.",
      confirm: "Elimina account",
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
    privacyPolicy: "Informativa sulla privacy",
    termsAndConditions: "Termini e condizioni",
    contactSupport: "Contatta il supporto",

    rateApp: {
      title: "Valuta l'app",
      subtitle: "Ci aiuta davvero tanto",
    },

    joinOurCommunity: {
      title: "Unisciti alla nostra community",
    },

    eraseData: {
      button: "Cancella dati dell'app",
      dataTakesUp: "Dati utilizzati",
      title: "Sei sicuro di voler cancellare i dati?",
      subtitle:
        "Tutti i dati salvati, comprese impostazioni e progressi, verranno eliminati. Questa azione è irreversibile.",
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

    done: "Fine",
  },

  lessonsList: {
    failedToLoadLessons: "Impossibile caricare le lezioni, riprova più tardi.",
    completed: "completato",
  },

  lesson: {
    matchHiraganaWithTransliteration: "Abbina l'hiragana alla traslitterazione.",
    matchKatakanaWithTransliteration: "Abbina il katakana alla traslitterazione.",
    practiceEveryDay: "Pratica ogni giorno per consolidare le tue conoscenze.",
    learningComplete: "Lezione completata!",
  },

  transliterationSystems: {
    romaji: "Romaji",
    transliterationSystems: "Sistemi di traslitterazione",
    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
    polivanovSystem: "Sistema Polivanov",
  },

  alert: {
    exitConformation: {
      title: "Sei sicuro di voler uscire?",
      subtitle: "I tuoi progressi non verranno salvati se esci adesso.",
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
      firstStep: "Il tuo primo passo verso lo studio del giapponese!",
    },
    agreement: {
      prefix: "Continuando, accetti: ",
      terms: "Termini di servizio",
      privacy: "Informativa sulla privacy",
    },
    continueWithGoogle: "Continua con Google",
    signUpWithEmail: "Registrati con email",
    alreadyHaveAccount: "Hai già un account?",
    login: "Accedi",
    continueWithoutLogin: "Continua senza accedere",
    fields: {
      name: "Nome",
      email: "Indirizzo email",
      password: "Password",
      newPassword: "Nuova password",
      repeatPassword: "Ripeti la nuova password",
      birthDate: "Data di nascita",
      code: "Codice",
    },
    signIn: {
      title: "Accesso",
      submit: "Accedi",
    },
    signUp: {
      title: "Crea un account",
      submit: "Crea account",
    },
    verifyEmail: {
      title: "Verifica la tua email",
      subtitle: "Inserisci il codice ricevuto via email. L'abbiamo inviato a {{email}}",
      submit: "Avanti",
      resend: "Invia un altro codice",
      resendCooldown: "Invia un altro codice ({{seconds}})",
    },
    resetPassword: {
      title: "Password dimenticata?",
      subtitle:
        "Inserisci il tuo indirizzo email per ricevere un codice di reimpostazione della password.",
      changeTitle: "Cambia la password",
      confirm: "Conferma",
    },
    errors: {
      nameRequired: "Inserisci il nome",
      emailRequired: "Inserisci l'email",
      invalidEmail: "Email non valida",
      dateRequired: "Seleziona la data di nascita",
      tooYoung: "Età minima 13 anni",
      passwordMin: "Almeno 8 caratteri",
      passwordLetter: "Aggiungi almeno una lettera",
      passwordDigit: "Aggiungi almeno una cifra",
      passwordRepeat: "Ripeti la password",
      passwordsMismatch: "Le password non coincidono",
      emailTaken: "Email già registrata",
      weakPassword: "Password troppo debole",
      invalidDate: "Data non valida o età inferiore a 13 anni",
      requestFailed: "Impossibile inviare la richiesta. Riprova più tardi.",
      somethingWrong: "Qualcosa è andato storto. Riprova più tardi.",
      codeRequired: "Inserisci il codice a 6 cifre",
      invalidCode: "Codice non valido",
      codeExpired: "Il codice è scaduto",
      tooManyAttempts: "Troppi tentativi, riprova più tardi",
      resendCooldown: "Attendi prima di richiedere un nuovo codice",
      passwordRequired: "Inserisci la password",
      invalidCredentials: "Email o password non validi",
      emailNotVerified: "Email non verificata",
      useGoogleToSignIn: "Questo account usa l'accesso con Google",
      invalidResetToken: "Sessione di reimpostazione scaduta. Richiedi un nuovo codice.",
      accountMigrating: "Account in fase di trasferimento. Riprova più tardi.",
    },
  },
  profile: {
    signInPrompt: "Accedi a {{app}} per sincronizzare i progressi su tutti i dispositivi.",
    signInButton: "Accedi o crea un account",
  },
  debug: {
    store: "Store",
    deviceId: "ID dispositivo",
    apiServers: "Server API",
    notificationToken: "Token notifiche",
    checking: "controllo…",
    pinging: "ping…",
    unreachable: "non raggiungibile",
    autoSelect: "Seleziona automaticamente",
    addHost: "Aggiungi",
    removeData: "Cancella dati",
  },
  verbForm: {
    title: "Forme del verbo:",
    teForm: "Forma て:",
    taForm: "Forma た:",
    naiForm: "Forma ない:",
    dictionaryForm: "Forma del dizionario:",
    potentialForm: "Forma potenziale:",
    volitionalForm: "Forma volitiva:",
    imperativeForm: "Forma imperativa:",
    prohibitiveForm: "Forma proibitiva:",
    conditionalForm: "Forma condizionale - ば:",
    negativeConditionalForm: "Forma condizionale negativa - ば:",
    passiveForm: "Forma passiva:",
    verbCausative: "Forma causativa:",
  },
  boards: {
    title: "Bacheche:",
    createOwn: "Crea la tua",
    myBoards: "Le mie bacheche",
    publicBoards: "Bacheche pubbliche",
    newBoard: "Nuova bacheca",
    namePlaceholder: "Nome della bacheca",
    isPublic: "Bacheca pubblica",
    settingsTitle: "Impostazioni bacheca",
    editors: "Editori",
    noEditors: "Nessun editore",
    createInvite: "Crea link di invito",
    inviteUntil: "Link monouso, valido fino al {{date}}",
    shareLink: "Condividi link",
    revoke: "Revoca",
    remove: "Rimuovi",
    deleteBoard: "Elimina bacheca",
    deleteTitle: "Eliminare questa bacheca?",
    deleteSubtitle: "La bacheca e tutte le sue carte saranno eliminate definitivamente.",
    inviteLimit: "Troppi inviti attivi",
  },
  board: {
    searchPlaceholder: "Cerca",
    searchResults: "Ricerca",
    nothingFound: "Nessun risultato",
    sectionsTitle: "Sezioni",
  },
  card: {
    examples: "Esempi:",
    open: "Apri",
    alreadySeen: "Già visto",
    kanjiOrder: "Ordine dei tratti:",
    kanjiLevel: "Livello:",
    kanjiDescription: "Descrizione:",
    kanjiRadicals: "Radicali:",
    kanjiElements: "Elementi:",
  },
  promotionTelegram: {
    title: "Congratulazioni, hai trovato un bug fortunato!",
    reasonSingle:
      "Dato che nell'app non ci sono più così tanti bug, molte meno persone vengono sul mio canale Telegram per segnalare problemi e molte meno persone si iscrivono",
    reasonMultiple:
      "Dato che nell'app non ci sono più così tanti bug, molte meno persone vengono sui nostri canali Telegram per segnalare problemi e molte meno persone si iscrivono",
    instructionTitle: "Ecco cosa devi fare:",
    stepGo: "- Vai su {{channel}}",
    stepSubscribeSingle: "- Iscriviti (pubblicherò un sacco di cose interessanti)",
    stepSubscribeMultiple: "- Iscriviti (pubblicheremo un sacco di cose interessanti)",
    dontMakeMe: "Non farmi aggiungere veri bug :)",
    channelSingle: "Il mio canale Telegram",
    channelMultiple: "I nostri canali Telegram",
    fixMyself: "Lo sistemo da solo",
  },
};

export default Italian;
