const PortugueseBR = {
  common: {
    save: "Salvar",
    done: "Concluído",
    close: "Fechar",
    reset: "Redefinir",
    back: "Voltar",
    next: "Próximo",
    retry: "Tentar novamente",
    complete: "Concluir",
    start: "Começar",
    check: "Verificar",
    welcome: "Bem-vindo",
  },

  tabs: {
    boards: "Quadros",
    learning: "Aulas",
    practice: "Prática",
    kana: "Kana",
    settings: "Configurações",
    profile: "Perfil",
  },

  practice: {
    question: "Pergunta",

    modes: {
      mixed: { title: "Misto", subtitle: "Tudo de uma vez" },
      testing: { title: "Teste", subtitle: "Escolha uma resposta contra o tempo" },
      drawing: { title: "Desenho", subtitle: "Desenhe o Hiragana/Katakana" },
      listening: { title: "Audição", subtitle: "Selecione a resposta correta" },
      multipleChoice: { title: "Seleção de palavra", subtitle: "Escolha a resposta correta" },
      matchingPairs: { title: "Emparelhar pares", subtitle: "Combine pares de palavras" },
      wordBuilding: { title: "Construção de palavra", subtitle: "Forme uma palavra" },
      typing: { title: "Digitação", subtitle: "Digite a sílaba" },
    },

    playAudio: "Reproduzir áudio",

    selectCorrectTransliteration: "Selecione a transliteração correta.",
    selectHiraganaForWord: "Selecione o Hiragana na ordem correta.",
    selectKatakanaForWord: "Selecione o Katakana na ordem correta.",

    alert: {
      insufficientKanaSelected: {
        title: "Caracteres insuficientes",
        subtitle: "Selecione {count} caracteres de Hiragana ou {count} caracteres de Katakana.",
      },
      insufficientBaseKanaSelected: {
        title: "Caracteres insuficientes",
        subtitle:
          "Selecione {count} caracteres básicos de Hiragana ou {count} caracteres básicos de Katakana (excluindo dakuten, handakuten e yōon).",
      },
      insufficientWordsAvailable: {
        title: "Palavras insuficientes disponíveis",
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
    yoon: "Yoon",
  },

  selectKana: {
    words: "Palavras para prática",
    nothingSelected: "Nada selecionado",
  },

  settings: {
    logout: {
      button: "Sair",
      title: "Sair da conta?",
      subtitle: "Você será desconectado e todos os dados locais neste dispositivo serão apagados.",
    },
    deleteAccount: {
      button: "Remover conta",
      title: "Excluir conta?",
      subtitle:
        "Digite o código de 6 dígitos que enviamos para o seu e-mail. Esta ação é permanente e não pode ser desfeita.",
      confirm: "Excluir conta",
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
      subtitle: "Isso realmente nos ajuda muito",
    },

    joinOurCommunity: {
      title: "Junte-se à nossa comunidade",
    },

    eraseData: {
      button: "Limpar dados do aplicativo",
      dataTakesUp: "Dados usados",
      title: "Tem certeza de que deseja apagar os dados?",
      subtitle:
        "Todos os dados, incluindo configurações e progresso, serão excluídos. Esta ação não pode ser desfeita.",
    },

    sourceCode: {
      title: "Código-fonte",
      githubRepository: "Repositório no GitHub",
    },

    version: "Versão",
  },

  result: {
    title: "Prática concluída",
    score: "Pontuação",

    sec: "seg",
    min: "min",

    question: "pergunta",

    done: "Concluir",
  },

  lessonsList: {
    completed: "concluído",
    failedToLoadLessons: "Falha ao carregar as aulas, por favor, tente novamente mais tarde.",
  },

  lesson: {
    matchHiraganaWithTransliteration: "Combine Hiragana com a transliteração.",
    matchKatakanaWithTransliteration: "Combine Katakana com a transliteração.",
    practiceEveryDay: "Pratique todos os dias para reforçar seus conhecimentos.",
    learningComplete: "Aula concluída!",
  },

  transliterationSystems: {
    romaji: "Romaji",
    transliterationSystems: "Sistemas de transliteração",
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
      title: "Uma nova versão está disponível.",
      subtitle:
        "Esta aula foi feita para uma versão mais recente do aplicativo. Por favor, atualize o aplicativo.",
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
      terms: "Termos de Serviço",
      privacy: "Política de Privacidade",
    },
    continueWithGoogle: "Continuar com o Google",
    signUpWithEmail: "Cadastrar-se com e-mail",
    alreadyHaveAccount: "Já tem uma conta?",
    login: "Entrar",
    continueWithoutLogin: "Continuar sem entrar",
    fields: {
      newName: "Novo nome",
      oldPassword: "Senha atual",
      name: "Nome",
      email: "Endereço de e-mail",
      password: "Senha",
      newPassword: "Nova senha",
      repeatPassword: "Digite novamente a nova senha",
      birthDate: "Data de nascimento",
      code: "Código",
    },
    signIn: {
      title: "Entrar",
      submit: "Entrar",
    },
    signUp: {
      title: "Criar uma conta",
      submit: "Criar conta",
    },
    verifyEmail: {
      title: "Verifique seu e-mail",
      subtitle: "Digite o código do e-mail. Enviamos para {{email}}",
      submit: "Próximo",
      resend: "Enviar outro código",
      resendCooldown: "Enviar outro código ({{seconds}})",
    },
    resetPassword: {
      title: "Esqueceu a senha?",
      subtitle: "Digite seu endereço de e-mail para receber um código para redefinir sua senha.",
      changeTitle: "Altere sua senha",
      confirm: "Confirmar",
    },
    errors: {
      incorrectOldPassword: "Senha atual incorreta",
      nameTooLong: "O nome deve ter no máximo 16 caracteres",
      nameRequired: "Digite seu nome",
      emailRequired: "Digite seu e-mail",
      invalidEmail: "E-mail inválido",
      dateRequired: "Selecione sua data de nascimento",
      tooYoung: "Idade mínima é 13 anos",
      passwordMin: "Pelo menos 8 caracteres",
      passwordLetter: "Adicione pelo menos uma letra",
      passwordDigit: "Adicione pelo menos um dígito",
      passwordRepeat: "Repita a senha",
      passwordsMismatch: "As senhas não coincidem",
      emailTaken: "E-mail já registrado",
      weakPassword: "Senha muito fraca",
      invalidDate: "Data inválida ou idade abaixo de 13",
      requestFailed: "Não foi possível enviar a solicitação. Tente novamente mais tarde.",
      somethingWrong: "Algo deu errado. Tente novamente mais tarde.",
      codeRequired: "Digite o código de 6 dígitos",
      invalidCode: "Código inválido",
      codeExpired: "O código expirou",
      tooManyAttempts: "Muitas tentativas, tente mais tarde",
      resendCooldown: "Aguarde antes de solicitar um novo código",
      passwordRequired: "Digite sua senha",
      invalidCredentials: "E-mail ou senha inválidos",
      emailNotVerified: "E-mail não verificado",
      useGoogleToSignIn: "Esta conta usa login com Google",
      invalidResetToken: "Sessão de redefinição expirada. Solicite um novo código.",
      accountMigrating: "A conta está sendo transferida. Tente novamente mais tarde.",
    },
  },
  profile: {
    avatar: {
      title: "Foto do perfil",
      takePhoto: "Tirar foto",
      chooseFromLibrary: "Escolher da galeria",
      remove: "Remover foto",
      errors: {
        cameraPermission: "Sem acesso à câmera. Permita nas configurações do dispositivo.",
        fileTooLarge: "A imagem é muito grande. Máximo de 5 MB.",
        invalidImage: "Formato não suportado. Use JPEG, PNG ou WebP.",
        storageUnavailable: "O armazenamento está temporariamente indisponível. Tente novamente.",
        failed: "Não foi possível atualizar a foto. Tente mais tarde.",
      },
    },
    edit: {
      title: "Editar perfil",
      name: "Nome",
      password: "Senha",
      changeName: "Alterar nome",
      changePassword: "Alterar senha",
    },
    signInPrompt: "Entre no {{app}} para sincronizar seu progresso em todos os dispositivos.",
    signInButton: "Entrar ou criar uma conta",
  },
  debug: {
    store: "Loja",
    deviceId: "ID do dispositivo",
    apiServers: "Servidores de API",
    notificationToken: "Token de notificação",
    checking: "Verificando…",
    pinging: "Pingando…",
    unreachable: "Indisponível",
    autoSelect: "Selecionar automaticamente",
    addHost: "Adicionar",
    removeData: "Remover dados",
  },
  verbForm: {
    title: "Formas do verbo:",
    teForm: "Forma て:",
    taForm: "Forma た:",
    naiForm: "Forma ない:",
    dictionaryForm: "Forma de dicionário:",
    potentialForm: "Forma potencial:",
    volitionalForm: "Modo volitivo:",
    imperativeForm: "Modo imperativo:",
    prohibitiveForm: "Modo proibitivo:",
    conditionalForm: "Forma condicional - ば:",
    negativeConditionalForm: "Forma condicional negativa - ば:",
    passiveForm: "Voz passiva:",
    verbCausative: "Forma causativa:",
  },
  boards: {
    title: "Quadros:",
    createOwn: "Criar o seu",
    myBoards: "Meus quadros",
    publicBoards: "Quadros públicos",
    newBoard: "Novo quadro",
    namePlaceholder: "Nome do quadro",
    isPublic: "Quadro público",
    settingsTitle: "Configurações do quadro",
    editors: "Editores",
    noEditors: "Nenhum editor",
    createInvite: "Criar link de convite",
    inviteUntil: "Link de uso único, válido até {{date}}",
    shareLink: "Compartilhar link",
    revoke: "Revogar",
    remove: "Remover",
    deleteBoard: "Excluir quadro",
    deleteTitle: "Excluir este quadro?",
    deleteSubtitle: "O quadro e todos os seus cartões serão excluídos permanentemente.",
    inviteLimit: "Convites ativos demais",
  },
  board: {
    searchPlaceholder: "Pesquisar",
    searchResults: "Pesquisa",
    nothingFound: "Nada encontrado",
    sectionsTitle: "Seções",
  },
  card: {
    examples: "Exemplos:",
    open: "Abrir",
    alreadySeen: "Já visto",
    kanjiOrder: "Ordem dos traços:",
    kanjiLevel: "Nível:",
    kanjiDescription: "Descrição:",
    kanjiRadicals: "Radicais:",
    kanjiElements: "Elementos:",
    edit: "Editar",
    save: "Salvar",
    titlePlaceholder: "Título",
    subtitlePlaceholder: "Tradução",
    examplePlaceholder: "Exemplo",
    saveError: "Não foi possível salvar o cartão",
  },
  promotionTelegram: {
    title: "Parabéns, você encontrou um bug da sorte!",
    reasonSingle:
      "Como não há tantos bugs no aplicativo mais, muito menos pessoas visitam meu canal do Telegram para relatar problemas, e muito menos pessoas se inscrevem em mim",
    reasonMultiple:
      "Como não há tantos bugs no aplicativo mais, muito menos pessoas visitam nossos canais do Telegram para relatar problemas, e muito menos pessoas se inscrevem em nós",
    instructionTitle: "Aqui está o que você precisa fazer:",
    stepGo: "- Vá para {{channel}}",
    stepSubscribeSingle: "- Inscreva-se (vou postar muitas coisas interessantes)",
    stepSubscribeMultiple: "- Inscreva-se (vamos postar muitas coisas interessantes)",
    dontMakeMe: "Não me faça adicionar bugs reais :)",
    channelSingle: "Meu canal do Telegram",
    channelMultiple: "Nossos canais do Telegram",
    fixMyself: "Eu mesmo conserto",
  },
};

export default PortugueseBR;
