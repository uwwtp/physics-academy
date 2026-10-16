export type LessonProgressKey = `${string}:${string}`;

export type QuizAttempt = {
  questionId: string;
  submitted: number | string;
  correct: boolean;
  at: string;
};

export type LessonQuizScore = {
  correct: number;
  total: number;
  at: string;
};

export type LearningProgress = {
  version: 1;
  displayName: string;
  currentLesson: { moduleId: string; lessonId: string } | null;
  completedLessons: LessonProgressKey[];
  quizAttempts: QuizAttempt[];
  quizScores: Record<string, LessonQuizScore>;
  visitDates: string[];
  lastVisitedAt: string | null;
};

export const emptyProgress = (): LearningProgress => ({
  version: 1,
  displayName: "Explorer",
  currentLesson: null,
  completedLessons: [],
  quizAttempts: [],
  quizScores: {},
  visitDates: [],
  lastVisitedAt: null,
});

export type ProgressRepository = {
  load(): LearningProgress;
  save(progress: LearningProgress): void;
};
