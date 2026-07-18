const Korean = {
  common: {
    done: "완료",
    close: "닫기",
    reset: "초기화",
    back: "뒤로",
    next: "다음",
    retry: "다시 시도",
    complete: "완료",
    start: "시작",
    check: "확인",
    welcome: "환영합니다",
  },

  tabs: {
    boards: "Boards",
    learning: "레슨",
    practice: "연습",
    kana: "가나",
    settings: "설정",
    profile: "Profile",
  },

  practice: {
    question: "문제",

    modes: {
      mixed: { title: "혼합", subtitle: "한 번에 모두" },
      testing: { title: "테스트", subtitle: "제한 시간 내에 정답 선택" },
      drawing: { title: "그리기", subtitle: "히라가나/가타카나 쓰기" },
      listening: { title: "듣기", subtitle: "정답 선택" },
      multipleChoice: { title: "단어 선택", subtitle: "정답 고르기" },
      matchingPairs: { title: "짝 맞추기", subtitle: "단어 쌍 맞추기" },
      wordBuilding: { title: "단어 만들기", subtitle: "단어 구성하기" },
      typing: { title: "타이핑", subtitle: "음절 입력하기" },
    },

    playAudio: "오디오 재생",

    selectCorrectTransliteration: "올바른 로마자 표기를 선택하세요.",
    selectHiraganaForWord: "정확한 순서로 히라가나를 선택하세요.",
    selectKatakanaForWord: "정확한 순서로 가타카나를 선택하세요.",

    alert: {
      insufficientKanaSelected: {
        title: "문자가 부족합니다",
        subtitle: "{count}개의 히라가나 또는 {count}개의 가타카나를 선택하세요.",
      },
      insufficientBaseKanaSelected: {
        title: "문자가 부족합니다",
        subtitle: "{count}개의 기본 히라가나 또는 가타카나(탁음, 반탁음, 요온 제외)를 선택하세요.",
      },
      insufficientWordsAvailable: {
        title: "단어 수 부족",
        subtitle: "사용 가능한 단어가 부족합니다. 더 많은 음절을 선택하세요.",
      },
    },
  },

  kana: {
    hiragana: "히라가나",
    katakana: "가타카나",
    romaji: "로마자",

    basic: "기본",
    dakuon: "탁음",
    handakuon: "반탁음",
    yoon: "요온",
  },

  selectKana: {
    words: "연습용 단어",
    nothingSelected: "선택된 항목 없음",
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
    displayStatistics: "통계 표시",
    hapticFeedback: "햅틱 피드백",
    theme: {
      title: "테마",
      light: "라이트",
      dark: "다크",
      auto: "자동",
    },
    language: "언어",
    termsAndConditions: "이용 약관",
    privacyPolicy: "개인정보처리방침",
    contactSupport: "고객 지원 문의",

    rateApp: {
      title: "앱 평가하기",
      subtitle: "저희에게 큰 도움이 됩니다",
    },

    joinOurCommunity: {
      title: "커뮤니티 참여하기",
    },

    eraseData: {
      button: "앱 데이터 삭제",
      dataTakesUp: "사용된 데이터",
      title: "정말 데이터를 삭제하시겠습니까?",
      subtitle:
        "설정 및 진행 상황을 포함한 모든 데이터가 삭제됩니다. 이 작업은 되돌릴 수 없습니다.",
    },

    sourceCode: {
      title: "소스 코드",
      githubRepository: "GitHub 저장소",
    },

    version: "버전",
  },

  result: {
    title: "연습 완료",
    score: "점수",

    sec: "초",
    min: "분",

    question: "문제",

    done: "완료",
  },

  lessonsList: {
    failedToLoadLessons: "수업을 불러올 수 없습니다. 나중에 다시 시도해주세요.",
    completed: "완료됨",
  },

  lesson: {
    matchHiraganaWithTransliteration: "히라가나와 로마자 표기를 연결하세요.",
    matchKatakanaWithTransliteration: "가타카나와 로마자 표기를 연결하세요.",
    practiceEveryDay: "매일 연습하여 지식을 강화하세요.",
    learningComplete: "레슨 완료!",
  },

  transliterationSystems: {
    romaji: "로마자",
    transliterationSystems: "로마자 표기법",
    hepburn: "헵번식",
    kunreiShiki: "훈레이식",
    nihonShiki: "일본식",
    polivanovSystem: "폴리바노프 표기법",
  },

  alert: {
    exitConformation: {
      title: "정말 종료하시겠습니까?",
      subtitle: "지금 종료하면 진행 상황이 저장되지 않습니다.",
    },
    newVersion: {
      title: "새 버전이 출시되었습니다.",
      subtitle: "이 레슨은 최신 앱 버전을 기준으로 제작되었습니다. 앱을 업데이트하세요.",
    },
    cancel: "취소",
    ok: "확인",
    confirm: "확인",
  },

  auth: {
    welcome: {
      firstStep: "일본어 학습의 첫걸음입니다!",
    },
    agreement: {
      prefix: "계속 진행하면 다음에 동의하는 것입니다: ",
      terms: "이용 약관",
      privacy: "개인정보 처리방침",
    },
    continueWithGoogle: "Google로 계속",
    signUpWithEmail: "이메일로 가입",
    alreadyHaveAccount: "이미 계정이 있나요?",
    login: "로그인",
    continueWithoutLogin: "로그인 없이 계속",
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

export default Korean;
