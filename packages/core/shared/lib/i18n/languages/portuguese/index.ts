const Portuguese = {
  common: {
    done: "Pronto",
    close: "Fechar",
    reset: "Redefinir",
    back: "Voltar",
    next: "Próximo",
    retry: "Tentar novamente",
    complete: "Concluir",
    start: "Iniciar",
    check: "Verificar",
    welcome: "Bem-vindo",
  },

  tabs: {
    learning: "Lições",
    practice: "Prática",
    kana: "Kana",
    settings: "Configurações",
    profile: "Profile",
  },

  practice: {
    question: "Pergunta",

    modes: {
      mixed: { title: "Misto", subtitle: "Tudo de uma vez" },
      testing: { title: "Teste", subtitle: "Escolha a resposta contra o tempo" },
      drawing: { title: "Desenho", subtitle: "Desenhe o Hiragana/Katakana" },
      listening: { title: "Audição", subtitle: "Selecione a resposta correta" },
      multipleChoice: { title: "Seleção de Palavras", subtitle: "Escolha a resposta correta" },
      matchingPairs: { title: "Combinar Pares", subtitle: "Associe os pares de palavras" },
      wordBuilding: { title: "Formação de Palavras", subtitle: "Forme uma palavra" },
      typing: { title: "Digitação", subtitle: "Digite a sílaba" },
    },

    playAudio: "Reproduzir Áudio",

    selectCorrectTransliteration: "Selecione a transliteração correta.",
    selectHiraganaForWord: "Selecione o Hiragana na ordem correta.",
    selectKatakanaForWord: "Selecione o Katakana na ordem correta.",

    alert: {
      insufficientKanaSelected: {
        title: "Caracteres Insuficientes",
        subtitle: "Por favor, selecione {count} caracteres de Hiragana ou {count} de Katakana.",
      },
      insufficientBaseKanaSelected: {
        title: "Caracteres Insuficientes",
        subtitle:
          "Por favor, selecione {count} caracteres básicos de Hiragana ou Katakana (excluindo dakuten, handakuten e yōon).",
      },
      insufficientWordsAvailable: {
        title: "Palavras Insuficientes Disponíveis",
        subtitle:
          "Há menos palavras disponíveis do que o necessário. Selecione mais sílabas de Hiragana ou Katakana.",
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
    words: "Palavras para prática",
    nothingSelected: "Nada selecionado",
  },

  settings: {
    logout: {
      button: "Log out",
      title: "Log out?",
      subtitle: "You will be logged out and all local data on this device will be cleared.",
    },
    displayStatistics: "Mostrar estatísticas",
    hapticFeedback: "Feedback tátil",
    theme: {
      title: "Tema",
      light: "Claro",
      dark: "Escuro",
      auto: "Automático",
    },
    language: "Idioma",
    termsAndConditions: "Termos e Condições",
    privacyPolicy: "Política de Privacidade",
    contactSupport: "Contatar suporte",

    rateApp: {
      title: "Avaliar o aplicativo",
      subtitle: "Isso nos ajuda muito",
    },

    joinOurCommunity: {
      title: "Junte-se à nossa comunidade",
    },

    eraseData: {
      button: "Limpar dados do aplicativo",
      dataTakesUp: "Dados utilizados",
      title: "Tem certeza de que deseja apagar os dados?",
      subtitle:
        "Todos os dados, incluindo configurações e progresso, serão apagados. Esta ação não pode ser desfeita.",
    },

    sourceCode: {
      title: "Código-fonte",
      githubRepository: "Repositório no GitHub",
    },

    version: "Versão",
  },

  result: {
    title: "Prática Concluída",
    score: "Pontuação",

    sec: "seg",
    min: "min",

    question: "pergunta",

    done: "Concluído",
  },

  lessonsList: {
    failedToLoadLessons: "Falha ao carregar as lições. Por favor, tente novamente mais tarde.",
    completed: "concluído",
  },

  lesson: {
    matchHiraganaWithTransliteration: "Associe o Hiragana com a transliteração.",
    matchKatakanaWithTransliteration: "Associe o Katakana com a transliteração.",
    practiceEveryDay: "Pratique diariamente para reforçar seu conhecimento.",
    learningComplete: "Lição concluída!",
  },

  transliterationSystems: {
    romaji: "Rōmaji",
    transliterationSystems: "Sistemas de Transliteração",
    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
    polivanovSystem: "Sistema Polivanov",
  },

  alert: {
    exitConformation: {
      title: "Tem certeza de que deseja sair?",
      subtitle: "Seu progresso não será salvo se você sair agora.",
    },
    newVersion: {
      title: "Nova versão disponível.",
      subtitle:
        "Esta lição foi criada para uma versão mais recente do aplicativo. Atualize o aplicativo.",
    },
    cancel: "Cancelar",
    ok: "OK",
    confirm: "Confirmar",
  },

  auth: {
    welcome: {
      firstStep: "Seu primeiro passo para aprender japonês!",
    },
    agreement: {
      prefix: "Ao continuar, você aceita: ",
      terms: "Termos de serviço",
      privacy: "Política de privacidade",
    },
    continueWithGoogle: "Continuar com Google",
    signUpWithEmail: "Cadastrar com e-mail",
    alreadyHaveAccount: "Já tem uma conta?",
    login: "Entrar",
    continueWithoutLogin: "Continuar sem entrar",
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

export default Portuguese;
