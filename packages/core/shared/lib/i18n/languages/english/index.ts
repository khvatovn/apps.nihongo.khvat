const English = {
  common: {
    done: "Done",
    close: "Close",
    reset: "Reset",
    back: "Back",
    next: "Next",
    retry: "Retry",
    complete: "Complete",
    start: "Start",
    check: "Check",
    welcome: "Welcome",
  },

  tabs: {
    learning: "Lessons",
    practice: "Practice",
    kana: "Kana",
    settings: "Settings",
    profile: "Profile",
  },

  practice: {
    question: "Question",

    modes: {
      mixed: { title: "Mixed", subtitle: "All at once" },
      testing: { title: "Test", subtitle: "Choose an answer against the clock" },
      drawing: { title: "Drawing", subtitle: "Draw the Hiragana/Katakana" },
      listening: { title: "Listening", subtitle: "Select the correct answer" },
      multipleChoice: { title: "Word Selection", subtitle: "Choose the correct answer" },
      matchingPairs: { title: "Matching Pairs", subtitle: "Match word pairs" },
      wordBuilding: { title: "Word Building", subtitle: "Form a word" },
      typing: { title: "Typing", subtitle: "Type the syllable" },
    },

    playAudio: "Play Audio",

    selectCorrectTransliteration: "Select the correct transliteration.",
    selectHiraganaForWord: "Select the Hiragana in the correct order.",
    selectKatakanaForWord: "Select the Katakana in the correct order.",

    alert: {
      insufficientKanaSelected: {
        title: "Not Enough Characters",
        subtitle: "Please select {count} Hiragana characters or {count} Katakana characters.",
      },
      insufficientBaseKanaSelected: {
        title: "Not Enough Characters",
        subtitle:
          "Please select {count} basic Hiragana or {count} basic Katakana characters (excluding dakuten, handakuten, and yōon).",
      },
      insufficientWordsAvailable: {
        title: "Not Enough Words Available",
        subtitle:
          "There are fewer available words than required. Please select more Hiragana or Katakana syllables.",
      },
    },
  },

  kana: {
    hiragana: "Hiragana",
    katakana: "Katakana",
    romaji: "Romaji",

    basic: "Basic",
    dakuon: "Dakuon",
    handakuon: "Handakuon",
    yoon: "Yoon",
  },

  selectKana: {
    words: "Words for practice",
    nothingSelected: "Nothing selected",
  },

  settings: {
    logout: {
      button: "Log out",
      title: "Log out?",
      subtitle: "You will be logged out and all local data on this device will be cleared.",
    },
    displayStatistics: "Show statistics",
    hapticFeedback: "Haptic feedback",
    theme: {
      title: "Theme",
      light: "Light",
      dark: "Dark",
      auto: "Automatic",
    },
    language: "Language",
    termsAndConditions: "Terms & Conditions",
    privacyPolicy: "Privacy Policy",
    contactSupport: "Contact support",

    rateApp: {
      title: "Rate the app",
      subtitle: "It really helps us a lot",
    },

    joinOurCommunity: {
      title: "Join our community",
    },

    eraseData: {
      button: "Clear app data",
      dataTakesUp: "Data used",
      title: "Are you sure you want to erase data?",
      subtitle:
        "All data including settings and progress will be deleted. This action cannot be undone.",
    },

    sourceCode: {
      title: "Source code",
      githubRepository: "GitHub Repository",
    },

    version: "Version",
  },

  result: {
    title: "Practice Complete",
    score: "Score",

    sec: "sec",
    min: "min",

    question: "question",

    done: "Done",
  },

  lessonsList: {
    completed: "completed",
    failedToLoadLessons: "Failed to load lessons, please try again later.",
  },

  lesson: {
    matchHiraganaWithTransliteration: "Match Hiragana with transliteration.",
    matchKatakanaWithTransliteration: "Match Katakana with transliteration.",
    practiceEveryDay: "Practice daily to reinforce your knowledge.",
    learningComplete: "Lesson completed!",
  },

  transliterationSystems: {
    romaji: "Romaji",
    transliterationSystems: "Transliteration Systems",
    hepburn: "Hepburn",
    kunreiShiki: "Kunrei-shiki",
    nihonShiki: "Nihon-shiki",
    polivanovSystem: "Polivanov System",
  },

  alert: {
    exitConformation: {
      title: "Are you sure you want to exit?",
      subtitle: "Your progress will not be saved if you exit now.",
    },
    newVersion: {
      title: "A new version is available.",
      subtitle: "This lesson was made for a newer app version. Please update the app.",
    },
    cancel: "Cancel",
    ok: "OK",
    confirm: "Confirm",
  },

  auth: {
    welcome: {
      firstStep: "Your first step to learning Japanese!",
    },
    agreement: {
      prefix: "By continuing, you accept: ",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
    },
    continueWithGoogle: "Continue with Google",
    signUpWithEmail: "Sign up with email",
    alreadyHaveAccount: "Already have an account?",
    login: "Log in",
    continueWithoutLogin: "Continue without signing in",
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

export default English;
