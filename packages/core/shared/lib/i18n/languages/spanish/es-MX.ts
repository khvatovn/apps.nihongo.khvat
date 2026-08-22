const SpanishMX = {
  common: {
    save: "Guardar",
    done: "Listo",
    close: "Cerrar",
    reset: "Restablecer",
    back: "Atrás",
    next: "Siguiente",
    retry: "Reintentar",
    complete: "Completar",
    start: "Iniciar",
    check: "Verificar",
    welcome: "Bienvenido",
  },

  tabs: {
    boards: "Tableros",
    learning: "Lecciones",
    practice: "Práctica",
    kana: "Kana",
    settings: "Configuración",
    profile: "Perfil",
  },

  practice: {
    question: "Pregunta",

    modes: {
      mixed: { title: "Mixto", subtitle: "Todo a la vez" },
      testing: { title: "Prueba", subtitle: "Elige una respuesta contra el tiempo" },
      drawing: { title: "Dibujo", subtitle: "Dibuja el hiragana / katakana" },
      listening: { title: "Audición", subtitle: "Selecciona la respuesta correcta" },
      multipleChoice: { title: "Selección de palabra", subtitle: "Elige la respuesta correcta" },
      matchingPairs: { title: "Emparejar", subtitle: "Empareja pares de palabras" },
      wordBuilding: { title: "Formar palabra", subtitle: "Forma una palabra" },
      typing: { title: "Escritura", subtitle: "Escribe la sílaba" },
    },

    playAudio: "Reproducir audio",

    selectCorrectTransliteration: "Selecciona la transliteración correcta.",
    selectHiraganaForWord: "Selecciona el hiragana en el orden correcto.",
    selectKatakanaForWord: "Selecciona el katakana en el orden correcto.",

    alert: {
      insufficientKanaSelected: {
        title: "No hay suficientes caracteres",
        subtitle:
          "Por favor selecciona {count} caracteres de hiragana o {count} caracteres de katakana.",
      },
      insufficientBaseKanaSelected: {
        title: "No hay suficientes caracteres",
        subtitle:
          "Por favor selecciona {count} caracteres básicos de hiragana o {count} caracteres básicos de katakana (sin dakuon, handakuon ni yōon).",
      },
      insufficientWordsAvailable: {
        title: "No hay suficientes palabras disponibles",
        subtitle:
          "Hay menos palabras disponibles de las necesarias. Selecciona más sílabas de hiragana o katakana.",
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
    yoon: "Yoon",
  },

  selectKana: {
    words: "Palabras para practicar",
    nothingSelected: "Nada seleccionado",
  },

  settings: {
    logout: {
      button: "Cerrar sesión",
      title: "¿Cerrar sesión?",
      subtitle: "Se cerrará la sesión y se eliminarán todos los datos locales de este dispositivo.",
    },
    deleteAccount: {
      button: "Eliminar cuenta",
      title: "¿Eliminar cuenta?",
      subtitle:
        "Ingresa el código de 6 dígitos que te enviamos por correo. Esta acción es permanente e irreversible.",
      confirm: "Eliminar cuenta",
    },
    displayStatistics: "Mostrar estadísticas",
    hapticFeedback: "Vibración",
    theme: {
      title: "Tema",
      light: "Claro",
      dark: "Oscuro",
      auto: "Automático",
    },
    language: "Idioma",
    termsAndConditions: "Términos y condiciones",
    privacyPolicy: "Política de privacidad",
    contactSupport: "Contactar soporte",

    rateApp: {
      title: "Calificar la aplicación",
      subtitle: "Nos ayuda mucho",
    },

    joinOurCommunity: {
      title: "Únete a nuestra comunidad",
    },

    eraseData: {
      button: "Borrar datos de la aplicación",
      dataTakesUp: "Los datos ocupan",
      title: "¿Estás seguro de que quieres borrar los datos?",
      subtitle:
        "Se eliminarán todos los datos, incluidos la configuración y el progreso. Esta acción no se puede deshacer.",
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

    done: "Listo",
  },

  lessonsList: {
    failedToLoadLessons:
      "No se pudieron cargar las lecciones, por favor intenta de nuevo más tarde.",
    completed: "completado",
  },

  lesson: {
    matchHiraganaWithTransliteration: "Empareja el hiragana con la transliteración.",
    matchKatakanaWithTransliteration: "Empareja el katakana con la transliteración.",
    practiceEveryDay: "Practica todos los días para reforzar tus conocimientos.",
    learningComplete: "¡Lección completada!",
  },

  transliterationSystems: {
    romaji: "Romaji",
    transliterationSystems: "Sistemas de transliteración",
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
        "Esta lección está hecha para una versión más reciente de la aplicación. Por favor actualiza la aplicación.",
    },
    cancel: "Cancelar",
    ok: "Aceptar",
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
    signUpWithEmail: "Registrarse con correo electrónico",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    login: "Iniciar sesión",
    continueWithoutLogin: "Continuar sin iniciar sesión",
    fields: {
      newName: "Nuevo nombre",
      oldPassword: "Contraseña actual",
      name: "Nombre",
      email: "Correo electrónico",
      password: "Contraseña",
      newPassword: "Nueva contraseña",
      repeatPassword: "Repite la nueva contraseña",
      birthDate: "Fecha de nacimiento",
      code: "Código",
    },
    signIn: {
      title: "Iniciar sesión",
      submit: "Iniciar sesión",
    },
    signUp: {
      title: "Crear una cuenta",
      submit: "Crear cuenta",
    },
    verifyEmail: {
      title: "Verifica tu correo electrónico",
      subtitle: "Ingresa el código del correo. Lo enviamos a {{email}}",
      submit: "Siguiente",
      resend: "Enviar otro código",
      resendCooldown: "Enviar otro código ({{seconds}})",
    },
    resetPassword: {
      title: "¿Olvidaste la contraseña?",
      subtitle: "Ingresa tu correo electrónico para recibir un código y restablecer tu contraseña.",
      changeTitle: "Cambia tu contraseña",
      confirm: "Confirmar",
    },
    errors: {
      incorrectOldPassword: "La contraseña actual es incorrecta",
      nameTooLong: "El nombre no puede superar los 16 caracteres",
      nameRequired: "Ingresa tu nombre",
      emailRequired: "Ingresa tu correo electrónico",
      invalidEmail: "Correo electrónico no válido",
      dateRequired: "Selecciona tu fecha de nacimiento",
      tooYoung: "La edad mínima es 13 años",
      passwordMin: "Al menos 8 caracteres",
      passwordLetter: "Agrega al menos una letra",
      passwordDigit: "Agrega al menos un dígito",
      passwordRepeat: "Repite la contraseña",
      passwordsMismatch: "Las contraseñas no coinciden",
      emailTaken: "El correo electrónico ya está registrado",
      weakPassword: "La contraseña es demasiado débil",
      invalidDate: "Fecha no válida o edad menor de 13",
      requestFailed: "No se pudo enviar la solicitud. Intenta de nuevo más tarde.",
      somethingWrong: "Algo salió mal. Intenta de nuevo más tarde.",
      codeRequired: "Ingresa el código de 6 dígitos",
      invalidCode: "Código no válido",
      codeExpired: "El código ha expirado",
      tooManyAttempts: "Demasiados intentos, intenta más tarde",
      resendCooldown: "Espera antes de solicitar un nuevo código",
      passwordRequired: "Ingresa tu contraseña",
      invalidCredentials: "Correo electrónico o contraseña incorrectos",
      emailNotVerified: "El correo electrónico no está verificado",
      useGoogleToSignIn: "Esta cuenta usa inicio de sesión con Google",
      invalidResetToken: "La sesión de restablecimiento ha expirado. Solicita un nuevo código.",
      accountMigrating: "La cuenta se está transfiriendo. Intenta de nuevo más tarde.",
    },
  },
  profile: {
    avatar: {
      title: "Foto de perfil",
      takePhoto: "Tomar una foto",
      chooseFromLibrary: "Elegir de la galería",
      remove: "Eliminar foto",
      errors: {
        cameraPermission: "Sin acceso a la cámara. Permítelo en la configuración del dispositivo.",
        fileTooLarge: "La imagen es demasiado grande. Máximo 5 MB.",
        invalidImage: "Formato no compatible. Usa JPEG, PNG o WebP.",
        storageUnavailable:
          "El almacenamiento no está disponible temporalmente. Inténtalo de nuevo.",
        failed: "No se pudo actualizar la foto. Inténtalo más tarde.",
      },
    },
    edit: {
      title: "Editar perfil",
      name: "Nombre",
      password: "Contraseña",
      changeName: "Cambiar nombre",
      changePassword: "Cambiar contraseña",
    },
    signInPrompt:
      "Inicia sesión en {{app}} para sincronizar tu progreso en todos los dispositivos.",
    signInButton: "Iniciar sesión o crear una cuenta",
  },
  debug: {
    store: "Tienda",
    deviceId: "ID del dispositivo",
    apiServers: "Servidores API",
    notificationToken: "Token de notificaciones",
    checking: "comprobando…",
    pinging: "haciendo ping…",
    unreachable: "no disponible",
    autoSelect: "Seleccionar automáticamente",
    addHost: "Agregar",
    removeData: "Eliminar datos",
  },
  verbForm: {
    title: "Formas del verbo:",
    teForm: "Forma て:",
    taForm: "Forma た:",
    naiForm: "Forma ない:",
    dictionaryForm: "Forma de diccionario:",
    potentialForm: "Forma potencial:",
    volitionalForm: "Modo volitivo:",
    imperativeForm: "Modo imperativo:",
    prohibitiveForm: "Modo prohibitivo:",
    conditionalForm: "Forma condicional - ば:",
    negativeConditionalForm: "Forma condicional negativa - ば:",
    passiveForm: "Voz pasiva:",
    verbCausative: "Forma causativa:",
  },
  boards: {
    title: "Tableros:",
    createOwn: "Crear propio",
    myBoards: "Mis tableros",
    publicBoards: "Tableros públicos",
    newBoard: "Nuevo tablero",
    namePlaceholder: "Nombre del tablero",
    isPublic: "Tablero público",
    settingsTitle: "Ajustes del tablero",
    editors: "Editores",
    noEditors: "Sin editores",
    createInvite: "Crear enlace de invitación",
    inviteUntil: "Enlace de un solo uso, válido hasta {{date}}",
    shareLink: "Compartir enlace",
    revoke: "Revocar",
    remove: "Quitar",
    deleteBoard: "Eliminar tablero",
    deleteTitle: "¿Eliminar este tablero?",
    deleteSubtitle: "El tablero y todas sus tarjetas se eliminarán definitivamente.",
    inviteLimit: "Demasiadas invitaciones activas",
  },
  board: {
    searchPlaceholder: "Buscar",
    searchResults: "Búsqueda",
    nothingFound: "No se encontró nada",
    sectionsTitle: "Secciones",
  },
  card: {
    examples: "Ejemplos:",
    open: "Abrir",
    alreadySeen: "Ya visto",
    kanjiOrder: "Orden de trazos:",
    kanjiLevel: "Nivel:",
    kanjiDescription: "Descripción:",
    kanjiRadicals: "Radicales:",
    kanjiElements: "Elementos:",
    edit: "Editar",
    save: "Guardar",
    titlePlaceholder: "Título",
    subtitlePlaceholder: "Traducción",
    examplePlaceholder: "Ejemplo",
    saveError: "No se pudo guardar la tarjeta",
  },
  promotionTelegram: {
    title: "¡Felicidades, encontraste un bug de la suerte!",
    reasonSingle:
      "Como ya no hay tantos bugs en la aplicación, mucha menos gente visita mi canal de Telegram para reportar problemas, y mucha menos gente se suscribe a mí",
    reasonMultiple:
      "Como ya no hay tantos bugs en la aplicación, mucha menos gente visita nuestros canales de Telegram para reportar problemas, y mucha menos gente se suscribe a nosotros",
    instructionTitle: "Esto es lo que necesitas hacer:",
    stepGo: "- Ir a {{channel}}",
    stepSubscribeSingle: "- Suscribirte (publicaré muchas cosas interesantes)",
    stepSubscribeMultiple: "- Suscribirte (publicaremos muchas cosas interesantes)",
    dontMakeMe: "No me obligues a agregar bugs reales :)",
    channelSingle: "Mi canal de Telegram",
    channelMultiple: "Nuestros canales de Telegram",
    fixMyself: "Yo lo arreglo",
  },
};

export default SpanishMX;
