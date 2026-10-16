import {
  emptyProgress,
  type LearningProgress,
  type ProgressRepository,
} from "@/lib/progress/types";

export const PROGRESS_STORAGE_KEY = "physics-academy.progress.v1";

function isBrowser() {
  return typeof window !== "undefined";
}

function isProgress(value: unknown): value is LearningProgress {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<LearningProgress>;
  return (
    record.version === 1 &&
    typeof record.displayName === "string" &&
    Array.isArray(record.completedLessons) &&
    Array.isArray(record.quizAttempts) &&
    Array.isArray(record.visitDates)
  );
}

function normalizeProgress(value: LearningProgress): LearningProgress {
  return {
    ...emptyProgress(),
    ...value,
    quizScores: value.quizScores ?? {},
    quizAttempts: value.quizAttempts.map((attempt) => ({
      ...attempt,
      submitted:
        typeof attempt.submitted === "number" && !Number.isFinite(attempt.submitted)
          ? ""
          : (attempt.submitted ?? ""),
    })),
  };
}

export const localProgressRepository: ProgressRepository = {
  load() {
    if (!isBrowser()) return emptyProgress();
    try {
      const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!raw) return emptyProgress();
      const parsed: unknown = JSON.parse(raw);
      return isProgress(parsed) ? normalizeProgress(parsed) : emptyProgress();
    } catch {
      return emptyProgress();
    }
  },
  save(progress) {
    if (!isBrowser()) return;
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  },
};

/**
 * Swap this export for a Supabase-backed repository later.
 * Authentication is intentionally not wired in this prototype.
 */
export const progressRepository: ProgressRepository = localProgressRepository;
