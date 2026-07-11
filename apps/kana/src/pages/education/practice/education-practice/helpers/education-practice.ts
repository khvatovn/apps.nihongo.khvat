import { PracticeQuestion, PracticeResultData } from "../lib/types/questions";

import { TEST_DELAY } from "@/shared/constants/kana";

class QuestionsEducationPractice {
  questions: PracticeQuestion[];

  isLocked: boolean = false;

  currentQuestionIndex: number;
  currentQuestion: PracticeQuestion | null;

  isFreeze: boolean;

  questionStartTime: number;
  questionsTime: PracticeResultData["questionsTime"];

  constructor() {
    this.questions = [];

    this.currentQuestionIndex = 0;
    this.currentQuestion = null;

    this.isFreeze = false;

    this.questionStartTime = 0;
    this.questionsTime = [];
  }

  setFreezeTrue() {
    this.isFreeze = true;
  }

  setFreezeFalse() {
    this.isFreeze = false;
  }

  updateCurrentQuestion() {
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  next({
    data,
    finishCallback,
    nextCallback,
  }: {
    data: {
      isCorrectAnswer: boolean;
    };
    finishCallback?: (data: PracticeResultData) => void;
    nextCallback?: () => void;
  }) {
    const now = Date.now();
    const duration = now - this.questionStartTime - TEST_DELAY;

    this.questionsTime.push({
      index: this.currentQuestionIndex,
      ms: duration,
      isCorrectAnswer: data.isCorrectAnswer,
    });

    this.questionStartTime = Date.now();

    if (this.currentQuestionIndex + 1 < this.questions.length) {
      this.currentQuestionIndex = this.currentQuestionIndex + 1;
      this.updateCurrentQuestion();
      nextCallback?.();
    } else {
      finishCallback?.({
        questionsTime: this.questionsTime,
        questions: this.questions,
      });
    }
  }

  setQuestions(questions: PracticeQuestion[]) {
    this.questions = questions;
    this.updateCurrentQuestion();

    this.questionStartTime = Date.now();
    this.questionsTime = [];
  }

  reset() {
    this.questions = [];

    this.currentQuestionIndex = 0;
    this.currentQuestion = null;

    this.questionStartTime = 0;
    this.questionsTime = [];

    this.isLocked = false;
  }
}

export default QuestionsEducationPractice;
