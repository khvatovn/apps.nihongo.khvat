const Chinese = {
  common: {
    done: "完成",
    close: "关闭",
    reset: "重置",
    back: "返回",
    next: "下一步",
    retry: "重试",
    complete: "完成",
    start: "开始",
    check: "检查",
    welcome: "欢迎",
  },

  tabs: {
    boards: "Boards",
    learning: "课程",
    practice: "练习",
    kana: "假名",
    settings: "设置",
    profile: "Profile",
  },

  practice: {
    question: "问题",

    modes: {
      mixed: { title: "混合", subtitle: "全部一起" },
      testing: { title: "测试", subtitle: "限时选择正确答案" },
      drawing: { title: "书写", subtitle: "书写平假名/片假名" },
      listening: { title: "听力", subtitle: "选择正确的答案" },
      multipleChoice: { title: "单词选择", subtitle: "选择正确的答案" },
      matchingPairs: { title: "配对练习", subtitle: "匹配单词对" },
      wordBuilding: { title: "单词拼写", subtitle: "拼写单词" },
      typing: { title: "打字", subtitle: "输入音节" },
    },

    playAudio: "播放音频",

    selectCorrectTransliteration: "选择正确的罗马音。",
    selectHiraganaForWord: "按正确顺序选择平假名。",
    selectKatakanaForWord: "按正确顺序选择片假名。",

    alert: {
      insufficientKanaSelected: {
        title: "字符数量不足",
        subtitle: "请选择 {count} 个平假名或 {count} 个片假名。",
      },
      insufficientBaseKanaSelected: {
        title: "字符数量不足",
        subtitle:
          "请选择 {count} 个基础平假名或 {count} 个基础片假名（不包括浊音、半浊音和拗音）。",
      },
      insufficientWordsAvailable: {
        title: "单词数量不足",
        subtitle: "可用单词数量不足。请选择更多的平假名或片假名音节。",
      },
    },
  },

  kana: {
    hiragana: "平假名",
    katakana: "片假名",
    romaji: "罗马字",

    basic: "基础",
    dakuon: "浊音",
    handakuon: "半浊音",
    yoon: "拗音",
  },

  selectKana: {
    words: "用于练习的单词",
    nothingSelected: "未选择任何内容",
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
    displayStatistics: "显示统计数据",
    hapticFeedback: "触觉反馈",
    theme: {
      title: "主题",
      light: "浅色",
      dark: "深色",
      auto: "自动",
    },
    language: "语言",
    termsAndConditions: "服务条款",
    privacyPolicy: "隐私政策",
    contactSupport: "联系客服",

    rateApp: {
      title: "评价应用",
      subtitle: "这对我们很有帮助",
    },

    joinOurCommunity: {
      title: "加入我们的社区",
    },

    eraseData: {
      button: "清除应用数据",
      dataTakesUp: "数据占用",
      title: "确定要清除数据吗？",
      subtitle: "所有数据，包括设置和进度，都将被删除。此操作不可恢复。",
    },

    sourceCode: {
      title: "源代码",
      githubRepository: "GitHub 仓库",
    },

    version: "版本",
  },

  result: {
    title: "练习完成",
    score: "得分",

    sec: "秒",
    min: "分钟",

    question: "问题",

    done: "完成",
  },

  lessonsList: {
    failedToLoadLessons: "无法加载课程，请稍后再试。",
    completed: "已完成",
  },

  lesson: {
    matchHiraganaWithTransliteration: "将平假名与罗马音匹配。",
    matchKatakanaWithTransliteration: "将片假名与罗马音匹配。",
    practiceEveryDay: "每天练习以巩固知识。",
    learningComplete: "课程完成！",
  },

  transliterationSystems: {
    romaji: "罗马字",
    transliterationSystems: "转写系统",
    hepburn: "赫本式",
    kunreiShiki: "训令式",
    nihonShiki: "日本式",
    polivanovSystem: "波利瓦诺夫系统",
  },

  alert: {
    exitConformation: {
      title: "确定要退出吗？",
      subtitle: "如果现在退出，您的进度将不会保存。",
    },
    newVersion: {
      title: "有新版本可用。",
      subtitle: "此课程需要更新后的应用版本。请更新应用程序。",
    },
    cancel: "取消",
    ok: "确定",
    confirm: "确认",
  },

  auth: {
    welcome: {
      firstStep: "您学习日语的第一步！",
    },
    agreement: {
      prefix: "继续即表示您同意：",
      terms: "服务条款",
      privacy: "隐私政策",
    },
    continueWithGoogle: "使用 Google 继续",
    signUpWithEmail: "使用邮箱注册",
    alreadyHaveAccount: "已有账号？",
    login: "登录",
    continueWithoutLogin: "不登录继续",
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

export default Chinese;
