const Russian = {
  common: {
    done: "Готово",
    close: "Закрыть",
    reset: "Сбросить",
    back: "Назад",
    next: "Дальше",
    retry: "Повторить",
    complete: "Завершить",
    start: "Начать",
    check: "Проверить",
    welcome: "Добро пожаловать",
  },

  tabs: {
    boards: "Доски",
    learning: "Обучение",
    practice: "Практика",
    kana: "Кана",
    settings: "Настройки",
    profile: "Профиль",
  },

  practice: {
    question: "Вопрос",

    modes: {
      mixed: { title: "Смешанный", subtitle: "Всё сразу" },
      testing: { title: "Тестирование", subtitle: "Выбери ответ на время" },
      drawing: { title: "Рисование", subtitle: "Нарисуй хирагану / катакану" },
      listening: { title: "Аудирование", subtitle: "Выбери правильный ответ" },
      multipleChoice: { title: "Выбор слова", subtitle: "Выбери правильный ответ" },
      matchingPairs: { title: "Составление пары", subtitle: "Собери пару из слов" },
      wordBuilding: { title: "Составление слова", subtitle: "Составь слово" },
      typing: { title: "Ввод", subtitle: "Напиши слог" },
    },

    playAudio: "Воспроизвести аудио",

    selectCorrectTransliteration: "Выбери правильную транслитерацию.",
    selectHiraganaForWord: "Выбери хиригану в правильном порядке.",
    selectKatakanaForWord: "Выбери катакана в правильном порядке.",

    alert: {
      insufficientKanaSelected: {
        title: "Недостаточно символов",
        subtitle: "Выберите {count} символов хираганы или {count} символов катаканы.",
      },
      insufficientBaseKanaSelected: {
        title: "Недостаточно символов",
        subtitle:
          "Выберите {count} базовых символов хираганы или {count} базовых символов катаканы (без дакуона, хандакуона и ёона).",
      },
      insufficientWordsAvailable: {
        title: "Недостаточно доступных слов",
        subtitle:
          "Доступно слов меньше, чем необходимо. Выберите больше слогов катаканы или хираганы.",
      },
    },
  },

  kana: {
    hiragana: "Хирагана",
    katakana: "Катакана",
    romaji: "Ромадзи",

    basic: "Основное",
    dakuon: "Дакуон",
    handakuon: "Хандакуон",
    yoon: "Юон",
  },

  selectKana: {
    words: "Слов для практики",
    nothingSelected: "Ничего не выбрано",
  },

  settings: {
    logout: {
      button: "Выйти",
      title: "Выйти из аккаунта?",
      subtitle: "Вы выйдете из аккаунта, и все локальные данные на устройстве будут удалены.",
    },
    deleteAccount: {
      button: "Удалить аккаунт",
      title: "Удалить аккаунт?",
      subtitle:
        "Введите 6-значный код из письма. Действие необратимо — аккаунт и все данные будут удалены.",
      confirm: "Удалить аккаунт",
    },
    displayStatistics: "Отображать статистику",
    hapticFeedback: "Виброотклик",
    theme: {
      title: "Тема",
      light: "Светлая",
      dark: "Тёмная",
      auto: "Автоматически",
    },
    language: "Язык",
    privacyPolicy: "Политика конфиденциальности",
    termsAndConditions: "Пользовательское соглашение",
    contactSupport: "Связаться с поддержкой",

    rateApp: {
      title: "Оценить приложение",
      subtitle: "Это очень нам поможет",
    },

    joinOurCommunity: {
      title: "Вступайте в наше сообщество",
    },

    eraseData: {
      button: "Очистить данные приложения",
      dataTakesUp: "Данные занимают",
      title: "Вы уверены, что хотите стереть данные?",
      subtitle:
        "Все сохранённые данные, включая настройки и прогресс, будут удалены. Это действие необратимо.",
    },

    sourceCode: {
      title: "Исходный код",
      githubRepository: "Репозиторий GitHub",
    },

    version: "Версия",
  },

  result: {
    title: "Практика окончена",
    score: "Счёт",

    sec: "cек",
    min: "мин",

    question: "вопрос",

    done: "Закончить",
  },

  lessonsList: {
    failedToLoadLessons: "Не удалось загрузить уроки, пожалуйста, попробуйте позже.",
    completed: "пройдено",
  },

  lesson: {
    matchHiraganaWithTransliteration: "Сопоставь хирагану с транслитерацией.",
    matchKatakanaWithTransliteration: "Сопоставь катакану с транслитерацией.",
    practiceEveryDay: "Практикуйся каждый день, чтобы закрепить свои знания.",
    learningComplete: "Урок пройден!",
  },

  transliterationSystems: {
    romaji: "Ромадзи",
    transliterationSystems: "Системы транслитерации",
    hepburn: "Hepburn (Хепбёрн)",
    kunreiShiki: "Kunrei-shiki (Кунрей-сики)",
    nihonShiki: "Nihon-shiki (Нихон-сики)",
    polivanovSystem: "Система Поливанова",
  },

  alert: {
    exitConformation: {
      title: "Вы уверены, что хотите выйти?",
      subtitle: "Ваш прогресс не будет сохранён, если вы выйдете сейчас.",
    },
    newVersion: {
      title: "Вышла новая версия.",
      subtitle:
        "Этот урок создан для более новой версии приложения. Пожалуйста, обновите приложение.",
    },
    cancel: "Отмена",
    ok: "Хорошо",
    confirm: "Подтвердить",
  },

  auth: {
    welcome: {
      firstStep: "Ваш первый шаг к изучению японского языка!",
    },
    agreement: {
      prefix: "Продолжая, вы принимаете: ",
      terms: "Условия предоставления услуг",
      privacy: "Политику конфиденциальности",
    },
    continueWithGoogle: "Продолжить с Google",
    signUpWithEmail: "Зарегистрироваться с почтой",
    alreadyHaveAccount: "Уже есть учетная запись?",
    login: "Вход",
    continueWithoutLogin: "Продолжить без входа",
    fields: {
      name: "Имя",
      email: "Адрес эл. почты",
      password: "Пароль",
      newPassword: "Новый пароль",
      repeatPassword: "Повторите новый пароль",
      birthDate: "Дата рождения",
      code: "Код",
    },
    signIn: {
      title: "Вход",
      submit: "Войти",
    },
    signUp: {
      title: "Создание учётной записи",
      submit: "Создать учётную запись",
    },
    verifyEmail: {
      title: "Подтвердите почту",
      subtitle: "Введите код из письма. Мы отправили его на {{email}}",
      submit: "Далее",
      resend: "Отправить ещё код",
      resendCooldown: "Отправить ещё код ({{seconds}})",
    },
    resetPassword: {
      title: "Забыли пароль?",
      subtitle: "Введите адрес эл. почты, чтобы получить код для сброса пароля.",
      changeTitle: "Измените пароль",
      confirm: "Подтвердить",
    },
    errors: {
      nameRequired: "Введите имя",
      emailRequired: "Введите email",
      invalidEmail: "Некорректный email",
      dateRequired: "Укажите дату рождения",
      tooYoung: "Минимальный возраст — 13 лет",
      passwordMin: "Минимум 8 символов",
      passwordLetter: "Нужна хотя бы одна буква",
      passwordDigit: "Нужна хотя бы одна цифра",
      passwordRepeat: "Повторите пароль",
      passwordsMismatch: "Пароли не совпадают",
      emailTaken: "Email уже зарегистрирован",
      weakPassword: "Слишком слабый пароль",
      invalidDate: "Некорректная дата или возраст меньше 13",
      requestFailed: "Не удалось отправить запрос. Попробуйте позже.",
      somethingWrong: "Что-то пошло не так. Попробуйте позже.",
      codeRequired: "Введите код из 6 цифр",
      invalidCode: "Неверный код",
      codeExpired: "Код истёк",
      tooManyAttempts: "Слишком много попыток, попробуйте позже",
      resendCooldown: "Подождите перед повторной отправкой",
      passwordRequired: "Введите пароль",
      invalidCredentials: "Неверный email или пароль",
      emailNotVerified: "Email не подтверждён",
      useGoogleToSignIn: "Этот аккаунт входит через Google",
      invalidResetToken: "Сессия сброса истекла. Запросите код заново.",
      accountMigrating: "Идёт перенос аккаунта. Попробуйте позже.",
    },
  },
  profile: {
    signInPrompt: "Войдите в {{app}}, чтобы синхронизировать прогресс на всех устройствах.",
    signInButton: "Войти или создать аккаунт",
  },
  debug: {
    store: "Магазин",
    deviceId: "ID устройства",
    apiServers: "API-серверы",
    notificationToken: "Токен уведомлений",
    checking: "проверка…",
    pinging: "пинг…",
    unreachable: "недоступен",
    autoSelect: "Выбрать автоматически",
    addHost: "Добавить",
    removeData: "Очистить данные",
  },
  verbForm: {
    title: "Формы глагола:",
    teForm: "て форма:",
    taForm: "た форма:",
    naiForm: "ない форма:",
    dictionaryForm: "Словарная форма:",
    potentialForm: "Потенциальный залог глагола:",
    volitionalForm: "Желательное наклонение:",
    imperativeForm: "Повелительное наклонение:",
    prohibitiveForm: "Запретительное наклонение:",
    conditionalForm: "Условная форма - ば:",
    negativeConditionalForm: "Условная негативная форма - ば:",
    passiveForm: "Страдательный залог:",
    verbCausative: "Побудительный залог:",
  },
  boards: {
    title: "Доски:",
    createOwn: "Создать свою",
  },
  board: {
    searchPlaceholder: "Поиск",
    searchResults: "Поиск",
    nothingFound: "Ничего не найдено",
    sectionsTitle: "Разделы",
  },
  card: {
    examples: "Примеры:",
    open: "Открыть",
    alreadySeen: "Уже встречалось",
  },
  promotionTelegram: {
    title: "Поздравляю, вам попался счастливый баг!",
    reasonSingle:
      "В связи с тем, что в приложении стало не так много багов, намного меньше людей заходят ко мне в тг-канал, чтобы сообщить о проблемах, и намного меньше людей стали подписываться на меня",
    reasonMultiple:
      "В связи с тем, что в приложении стало не так много багов, намного меньше людей заходят к нам в тг-каналы, чтобы сообщить о проблемах, и намного меньше людей стали подписываться на нас",
    instructionTitle: "Инструкция, что вам нужно сделать:",
    stepGo: "- Перейти на {{channel}}",
    stepSubscribeSingle: "- Подписаться (я буду постить много чего интересного)",
    stepSubscribeMultiple: "- Подписаться (мы будем постить много чего интересного)",
    dontMakeMe: "Не заставляйте добавлять настоящие баги :)",
    channelSingle: "Мой телеграм-канал",
    channelMultiple: "Наши телеграм-каналы",
    fixMyself: "Я починю сам",
  },
};

export default Russian;
