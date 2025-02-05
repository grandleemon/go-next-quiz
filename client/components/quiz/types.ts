export interface QuizAnswer {
  title: string;
  id: number;
}

export interface QuizQuestion {
  title: string;
  answers: QuizAnswer[]
  id: number;
}

export interface QuizType {
  id: number;
  expiresAt: Date;
  questions: QuizQuestion[]
}