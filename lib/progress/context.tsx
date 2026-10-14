"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { getFirstPublishedLesson, lessonKey } from "@/lib/courses";
import {
  getProgressSnapshot,
  getServerProgressSnapshot,
  subscribeProgress,
  updateProgress,
} from "@/lib/progress/client-store";
import { recordVisit } from "@/lib/progress/stats";
import { emptyProgress, type LearningProgress, type QuizAttempt } from "@/lib/progress/types";

type ProgressContextValue = {
  progress: LearningProgress;
  ready: boolean;
  setDisplayName: (name: string) => void;
  setCurrentLesson: (moduleId: string, lessonId: string) => void;
  completeLesson: (moduleId: string, lessonId: string) => void;
  recordQuiz: (attempt: Omit<QuizAttempt, "at">) => void;
  resetProgress: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const progress = useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getServerProgressSnapshot,
  );
  const ready = progress.lastVisitedAt !== null;

  const setDisplayName = useCallback((name: string) => {
    updateProgress((current) => ({ ...current, displayName: name.trim() || "Explorer" }));
  }, []);

  const setCurrentLesson = useCallback((moduleId: string, lessonId: string) => {
    updateProgress((current) => {
      if (
        current.currentLesson?.moduleId === moduleId &&
        current.currentLesson.lessonId === lessonId
      ) {
        return current;
      }
      return { ...current, currentLesson: { moduleId, lessonId } };
    });
  }, []);

  const completeLesson = useCallback((moduleId: string, lessonId: string) => {
    const key = lessonKey(moduleId, lessonId);
    updateProgress((current) => ({
      ...current,
      currentLesson: { moduleId, lessonId },
      completedLessons: current.completedLessons.includes(key)
        ? current.completedLessons
        : [...current.completedLessons, key],
    }));
  }, []);

  const recordQuiz = useCallback((attempt: Omit<QuizAttempt, "at">) => {
    updateProgress((current) => ({
      ...current,
      quizAttempts: [...current.quizAttempts, { ...attempt, at: new Date().toISOString() }],
    }));
  }, []);

  const resetProgress = useCallback(() => {
    updateProgress((current) => {
      const first = getFirstPublishedLesson();
      return recordVisit({
        ...emptyProgress(),
        displayName: current.displayName,
        currentLesson: { moduleId: first.module.id, lessonId: first.lesson.id },
      });
    });
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      ready,
      setDisplayName,
      setCurrentLesson,
      completeLesson,
      recordQuiz,
      resetProgress,
    }),
    [
      completeLesson,
      progress,
      ready,
      recordQuiz,
      resetProgress,
      setCurrentLesson,
      setDisplayName,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return value;
}
