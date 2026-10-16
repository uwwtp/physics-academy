import { countLessons, modules } from "@/lib/courses";
import type { LearningProgress } from "@/lib/progress/types";

export function computeStreak(visitDates: string[], today: string) {
  const unique = Array.from(new Set(visitDates)).sort();
  if (!today || unique.length === 0) return 0;

  const latest = unique[unique.length - 1];
  const yesterday = new Date(Date.parse(`${today}T12:00:00Z`) - 86_400_000)
    .toISOString()
    .slice(0, 10);
  if (latest !== today && latest !== yesterday) return 0;

  let streak = 1;
  for (let i = unique.length - 1; i > 0; i -= 1) {
    const current = Date.parse(`${unique[i]}T12:00:00Z`);
    const previous = Date.parse(`${unique[i - 1]}T12:00:00Z`);
    if (current - previous === 86_400_000) {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
}

export function quizAccuracy(progress: LearningProgress) {
  if (progress.quizAttempts.length === 0) return null;
  const correct = progress.quizAttempts.filter((attempt) => attempt.correct).length;
  return Math.round((correct / progress.quizAttempts.length) * 100);
}

export function masteryScore(progress: LearningProgress) {
  const total = countLessons();
  const completion = total === 0 ? 0 : progress.completedLessons.length / total;
  const accuracy = quizAccuracy(progress);
  const quizComponent = accuracy === null ? 0.55 : accuracy / 100;
  return Math.round((0.7 * completion + 0.3 * quizComponent) * 100);
}

export function moduleCompletion(progress: LearningProgress, moduleId: string) {
  const course = modules.find((entry) => entry.id === moduleId);
  if (!course || course.lessons.length === 0) return 0;
  const done = course.lessons.filter((lesson) =>
    progress.completedLessons.includes(`${moduleId}:${lesson.id}`),
  ).length;
  return Math.round((done / course.lessons.length) * 100);
}

export function overallCompletion(progress: LearningProgress) {
  const total = countLessons();
  if (total === 0) return 0;
  return Math.round((progress.completedLessons.length / total) * 100);
}

export function safeIsoTimestamp(value?: Date | string | null): string {
  if (typeof value === "string") {
    const parsed = new Date(value);
    if (Number.isFinite(parsed.getTime())) return parsed.toISOString();
  }
  if (value instanceof Date && Number.isFinite(value.getTime())) {
    return value.toISOString();
  }
  const now = new Date();
  if (Number.isFinite(now.getTime())) return now.toISOString();
  return "1970-01-01T00:00:00.000Z";
}

export function recordVisit(
  progress: LearningProgress,
  now?: Date | string | null,
): LearningProgress {
  const iso = safeIsoTimestamp(now);
  const today = iso.slice(0, 10);
  const visitDates = progress.visitDates.includes(today)
    ? progress.visitDates
    : [...progress.visitDates, today];
  return {
    ...progress,
    visitDates,
    lastVisitedAt: iso,
  };
}
