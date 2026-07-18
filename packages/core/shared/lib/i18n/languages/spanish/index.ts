const Spanish = {
  common: {
    done: "Hecho",
    close: "Cerrar",
    reset: "Restablecer",
    back: "Atrás",
    next: "Siguiente",
    retry: "Reintentar",
    complete: "Completar",
    start: "Comenzar",
    check: "Comprobar",
    welcome: "Bienvenido",
  },

  tabs: {
    boards: "Boards",
    learning: "Lecciones",
    practice: "Práctica",
    kana: "Kana",
    settings: "Configuración",
    profile: "Profile",
  },

  practice: {
    question: "Pregunta",

    modes: {
      mixed: { title: "Mezclado", subtitle: "Todo a la vez" },
      testing: { title: "Prueba", subtitle: "Elige una respuesta contra el reloj" },
      drawing: { title: "Dibujo", subtitle: "Dibuja el Hiragana/Katakana" },
      listening: { title: "Escucha", subtitle: "Selecciona la respuesta correcta" },
      multipleChoice: { title: "Selección de Palabra", subtitle: "Elige la respuesta correcta" },
      matchingPairs: { title: "Emparejar Pares", subtitle: "Empareja los pares de palabras" },
      wordBuilding: { title: "Formación de Palabras", subtitle: "Forma una palabra" },
      typing: { title: "Escritura", subtitle: "Escribe la sílaba" },
    },

    playAudio: "Reproducir Audio",

    selectCorrectTransliteration: "Selecciona la transliteración correcta.",
    selectHiraganaForWord: "Selecciona el Hiragana en el orden correcto.",
    selectKatakanaForWord: "Selecciona el Katakana en el orden correcto.",

    alert: {
      insufficientKanaSelected: {
        title: "No hay suficientes caracteres",
        subtitle: "Selecciona {count} caracteres de Hiragana o {count} de Katakana.",
      },
      insufficientBaseKanaSelected: {
        title: "No hay suficientes caracteres",
        subtitle:
          "Selecciona {count} caracteres básicos de Hiragana o Katakana (sin dakuten, handakuten ni yōon).",
      },
      insufficientWordsAvailable: {
        title: "No hay suficientes palabras disponibles",
        subtitle:
          "Hay menos palabras disponibles de las requeridas. Selecciona más sílabas de Hiragana o Katakana.",
      },
    },
  },

  kana: {
    hiragana: "Hiragana",
    katakana: "Katakana",
    romaji: "Romaji",

    basic: "Básico",
    dakuon: "Dakuon",
    handakuon: "Handakuon",
    yoon: "Yōon",
  },

  selectKana: {
    words: "Palabras para practicar",
    nothingSelected: "Nada seleccionado",
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
    displayStatistics: "Mostrar estadísticas",
    hapticFeedback: "Retroalimentación háptica",
    theme: {
      title: "Tema",
      light: "Claro",
      dark: "Oscuro",
      auto: "Automático",
    },
    language: "Idioma",
    termsAndConditions: "Términos y Condiciones",
    privacyPolicy: "Política de Privacidad",
    contactSupport: "Contactar soporte",

    rateApp: {
      title: "Valorar la aplicación",
      subtitle: "Nos ayuda mucho",
    },

    joinOurCommunity: {
      title: "Únete a nuestra comunidad",
    },

    eraseData: {
      button: "Borrar datos de la app",
      dataTakesUp: "Datos utilizados",
      title: "¿Estás seguro de que quieres borrar los datos?",
      subtitle:
        "Todos los datos, incluyendo configuraciones y progreso, serán eliminados. Esta acción no se puede deshacer.",
    },

    sourceCode: {
      title: "Código fuente",
      githubRepository: "Repositorio de GitHub",
    },

    version: "Versión",
  },

  result: {
    title: "Práctica completada",
    score: "Puntuación",

    sec: "seg",
    min: "min",

    question: "pregunta",

    done: "Hecho",
  },

  lessonsList: {
    failedToLoadLessons:
      "No se pudieron cargar las lecciones. Por favor, inténtalo de nuevo más tarde.",
    completed: "completado",
  },

  lesson: {
    matchHiraganaWithTransliteration: "Empareja el Hiragana con la transliteración.",
    matchKatakanaWithTransliteration: "Empareja el Katakana con la transliteración.",
    practiceEveryDay: "Practica diariamente para reforzar tu conocimiento.",
    learningComplete: "¡Lección completada!",
  },

  transliterationSystems: {
    romaji: "Rōmaji",
    transliterationSystems: "Sistemas de Transliteración",
    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
    polivanovSystem: "Sistema Polivanov",
  },

  alert: {
    exitConformation: {
      title: "¿Estás seguro de que quieres salir?",
      subtitle: "Tu progreso no se guardará si sales ahora.",
    },
    newVersion: {
      title: "Hay una nueva versión disponible.",
      subtitle:
        "Esta lección fue creada para una versión más reciente de la app. Por favor, actualiza la app.",
    },
    cancel: "Cancelar",
    ok: "OK",
    confirm: "Confirmar",
  },

  auth: {
    welcome: {
      firstStep: "¡Tu primer paso para aprender japonés!",
    },
    agreement: {
      prefix: "Al continuar, aceptas: ",
      terms: "Términos de servicio",
      privacy: "Política de privacidad",
    },
    continueWithGoogle: "Continuar con Google",
    signUpWithEmail: "Registrarse con correo",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    login: "Iniciar sesión",
    continueWithoutLogin: "Continuar sin iniciar sesión",
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

export default Spanish;
