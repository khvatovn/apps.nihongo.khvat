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
    boards: "보드",
    learning: "학습",
    practice: "연습",
    kana: "가나",
    settings: "설정",
    profile: "프로필",
  },

  practice: {
    question: "문제",

    modes: {
      mixed: { title: "혼합", subtitle: "모두 한꺼번에" },
      testing: { title: "테스트", subtitle: "시간 제한으로 답 선택" },
      drawing: { title: "그리기", subtitle: "히라가나 / 가타카나 그리기" },
      listening: { title: "듣기", subtitle: "올바른 답 선택" },
      multipleChoice: { title: "단어 선택", subtitle: "올바른 답 선택" },
      matchingPairs: { title: "짝 맞추기", subtitle: "단어 짝 맞추기" },
      wordBuilding: { title: "단어 만들기", subtitle: "단어 구성하기" },
      typing: { title: "입력", subtitle: "음절 입력하기" },
    },

    playAudio: "오디오 재생",

    selectCorrectTransliteration: "올바른 로마자 표기를 선택하세요.",
    selectHiraganaForWord: "올바른 순서로 히라가나를 선택하세요.",
    selectKatakanaForWord: "올바른 순서로 가타카나를 선택하세요.",

    alert: {
      insufficientKanaSelected: {
        title: "문자가 부족합니다",
        subtitle: "{count}개의 히라가나 문자 또는 {count}개의 가타카나 문자를 선택해 주세요.",
      },
      insufficientBaseKanaSelected: {
        title: "문자가 부족합니다",
        subtitle:
          "{count}개의 기본 히라가나 또는 {count}개의 기본 가타카나 문자를 선택해 주세요 (탁음, 반탁음, 요음 제외).",
      },
      insufficientWordsAvailable: {
        title: "사용 가능한 단어가 부족합니다",
        subtitle: "필요한 단어 수보다 적습니다. 히라가나 또는 가타카나 음절을 더 선택해 주세요.",
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
    yoon: "요음",
  },

  selectKana: {
    words: "연습할 단어",
    nothingSelected: "선택된 항목 없음",
  },

  settings: {
    logout: {
      button: "로그아웃",
      title: "로그아웃 하시겠습니까?",
      subtitle: "로그아웃되며 이 기기의 모든 로컬 데이터가 삭제됩니다.",
    },
    deleteAccount: {
      button: "계정 삭제",
      title: "계정을 삭제하시겠습니까?",
      subtitle:
        "이메일로 받은 6자리 코드를 입력하세요. 이 작업은 되돌릴 수 없으며 계정과 모든 데이터가 삭제됩니다.",
      confirm: "계정 삭제",
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
    privacyPolicy: "개인정보 처리방침",
    termsAndConditions: "이용약관",
    contactSupport: "고객 지원 문의",

    rateApp: {
      title: "앱 평가하기",
      subtitle: "큰 도움이 됩니다",
    },

    joinOurCommunity: {
      title: "커뮤니티에 참여하기",
    },

    eraseData: {
      button: "앱 데이터 삭제",
      dataTakesUp: "데이터 사용량",
      title: "정말 데이터를 삭제하시겠습니까?",
      subtitle: "설정과 진행 상황을 포함한 모든 데이터가 삭제됩니다. 이 작업은 되돌릴 수 없습니다.",
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
    failedToLoadLessons: "레슨을 불러오지 못했습니다. 나중에 다시 시도해 주세요.",
    completed: "완료",
  },

  lesson: {
    matchHiraganaWithTransliteration: "히라가나와 로마자를 짝지어 주세요.",
    matchKatakanaWithTransliteration: "가타카나와 로마자를 짝지어 주세요.",
    practiceEveryDay: "지식을 확실히 하기 위해 매일 연습하세요.",
    learningComplete: "레슨 완료!",
  },

  transliterationSystems: {
    romaji: "로마자",
    transliterationSystems: "로마자 표기 체계",
    hepburn: "Hepburn (헵번식)",
    kunreiShiki: "Kunrei-shiki (훈령식)",
    nihonShiki: "Nihon-shiki (일본식)",
    polivanovSystem: "Polivanov 시스템",
  },

  alert: {
    exitConformation: {
      title: "정말 나가시겠습니까?",
      subtitle: "지금 나가면 진행 상황이 저장되지 않습니다.",
    },
    newVersion: {
      title: "새 버전이 출시되었습니다.",
      subtitle: "이 레슨은 더 새로운 앱 버전용으로 제작되었습니다. 앱을 업데이트해 주세요.",
    },
    cancel: "취소",
    ok: "확인",
    confirm: "확인",
  },

  auth: {
    welcome: {
      firstStep: "일본어 학습의 첫걸음!",
    },
    agreement: {
      prefix: "계속하면 다음에 동의하는 것으로 간주됩니다: ",
      terms: "서비스 이용약관",
      privacy: "개인정보 처리방침",
    },
    continueWithGoogle: "Google로 계속하기",
    signUpWithEmail: "이메일로 가입하기",
    alreadyHaveAccount: "이미 계정이 있으신가요?",
    login: "로그인",
    continueWithoutLogin: "로그인 없이 계속하기",
    fields: {
      name: "이름",
      email: "이메일 주소",
      password: "비밀번호",
      newPassword: "새 비밀번호",
      repeatPassword: "새 비밀번호 확인",
      birthDate: "생년월일",
      code: "코드",
    },
    signIn: {
      title: "로그인",
      submit: "로그인",
    },
    signUp: {
      title: "계정 만들기",
      submit: "계정 만들기",
    },
    verifyEmail: {
      title: "이메일 인증",
      subtitle: "이메일로 받은 코드를 입력하세요. {{email}}로 보냈습니다",
      submit: "다음",
      resend: "코드 다시 보내기",
      resendCooldown: "코드 다시 보내기 ({{seconds}})",
    },
    resetPassword: {
      title: "비밀번호를 잊으셨나요?",
      subtitle: "비밀번호 재설정 코드를 받으려면 이메일 주소를 입력하세요.",
      changeTitle: "비밀번호 변경",
      confirm: "확인",
    },
    errors: {
      nameRequired: "이름을 입력하세요",
      emailRequired: "이메일을 입력하세요",
      invalidEmail: "올바르지 않은 이메일",
      dateRequired: "생년월일을 선택하세요",
      tooYoung: "최소 나이는 13세입니다",
      passwordMin: "최소 8자 이상",
      passwordLetter: "최소 한 글자의 문자가 필요합니다",
      passwordDigit: "최소 한 글자의 숫자가 필요합니다",
      passwordRepeat: "비밀번호를 다시 입력하세요",
      passwordsMismatch: "비밀번호가 일치하지 않습니다",
      emailTaken: "이미 등록된 이메일입니다",
      weakPassword: "비밀번호가 너무 약합니다",
      invalidDate: "올바르지 않은 날짜이거나 13세 미만입니다",
      requestFailed: "요청을 보내지 못했습니다. 나중에 다시 시도해 주세요.",
      somethingWrong: "문제가 발생했습니다. 나중에 다시 시도해 주세요.",
      codeRequired: "6자리 코드를 입력하세요",
      invalidCode: "올바르지 않은 코드",
      codeExpired: "코드가 만료되었습니다",
      tooManyAttempts: "시도 횟수가 너무 많습니다. 나중에 다시 시도해 주세요",
      resendCooldown: "다시 보내기 전에 잠시 기다려 주세요",
      passwordRequired: "비밀번호를 입력하세요",
      invalidCredentials: "이메일 또는 비밀번호가 올바르지 않습니다",
      emailNotVerified: "이메일이 인증되지 않았습니다",
      useGoogleToSignIn: "이 계정은 Google로 로그인합니다",
      invalidResetToken: "재설정 세션이 만료되었습니다. 코드를 다시 요청하세요.",
      accountMigrating: "계정 이전 중입니다. 나중에 다시 시도해 주세요.",
    },
  },
  profile: {
    signInPrompt: "{{app}}에 로그인하여 모든 기기에서 진행 상황을 동기화하세요.",
    signInButton: "로그인 또는 계정 만들기",
  },
  debug: {
    store: "스토어",
    deviceId: "기기 ID",
    apiServers: "API 서버",
    notificationToken: "알림 토큰",
    checking: "확인 중…",
    pinging: "핑 중…",
    unreachable: "연결 불가",
    autoSelect: "자동 선택",
    addHost: "추가",
    removeData: "데이터 삭제",
  },
  verbForm: {
    title: "동사 활용형:",
    teForm: "て 형:",
    taForm: "た 형:",
    naiForm: "ない 형:",
    dictionaryForm: "사전형:",
    potentialForm: "가능형:",
    volitionalForm: "의지형:",
    imperativeForm: "명령형:",
    prohibitiveForm: "금지형:",
    conditionalForm: "조건형 - ば:",
    negativeConditionalForm: "부정 조건형 - ば:",
    passiveForm: "수동형:",
    verbCausative: "사역형:",
  },
  boards: {
    title: "보드:",
    createOwn: "직접 만들기",
  },
  board: {
    searchPlaceholder: "검색",
    searchResults: "검색 결과",
    nothingFound: "검색 결과 없음",
    sectionsTitle: "섹션",
  },
  card: {
    examples: "예문:",
    open: "열기",
    alreadySeen: "이미 봤음",
  },
  promotionTelegram: {
    title: "축하합니다, 행운의 버그를 발견하셨네요!",
    reasonSingle:
      "앱에 버그가 많이 줄어서, 문제 제보를 위해 제 텔레그램 채널에 오는 사람이 훨씬 줄었고, 저를 구독하는 사람도 많이 줄었습니다",
    reasonMultiple:
      "앱에 버그가 많이 줄어서, 문제 제보를 위해 저희 텔레그램 채널에 오는 사람이 훨씬 줄었고, 저희를 구독하는 사람도 많이 줄었습니다",
    instructionTitle: "해야 할 일:",
    stepGo: "- {{channel}}로 이동하기",
    stepSubscribeSingle: "- 구독하기 (재미있는 내용을 많이 올릴 거예요)",
    stepSubscribeMultiple: "- 구독하기 (재미있는 내용을 많이 올릴 거예요)",
    dontMakeMe: "진짜 버그를 추가하게 만들지 마세요 :)",
    channelSingle: "제 텔레그램 채널",
    channelMultiple: "저희 텔레그램 채널",
    fixMyself: "직접 고칠게요",
  },
};

export default Korean;
