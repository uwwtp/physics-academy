export type LessonProgressKey = `${string}:${string}`;

export type QuizAttempt = {
  questionId: string;
  submitted: number;
  correct: boolean;
  at: string;
};

export type LearningProgress = {
  version: 1;
  displayName: string;
  currentLesson: { moduleId: string; lessonId: string } | null;
  completedLessons: LessonProgressKey[];
  quizAttempts: QuizAttempt[];
  visitDates: string[];
  lastVisitedAt: string | null;
};

export const emptyProgress = (): LearningProgress => ({
  version: 1,
  displayName: "Explorer",
  currentLesson: null,
  completedLessons: [],
  quizAttempts: [],
  visitDates: [],
  lastVisitedAt: null,
});

export type ProgressRepository = {
  load(): LearningProgress;
  save(progress: LearningProgress): void;
};
