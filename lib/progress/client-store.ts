"use client";

import { getFirstPublishedLesson } from "@/lib/courses";
import { progressRepository } from "@/lib/progress/local-store";
import { recordVisit } from "@/lib/progress/stats";
import { emptyProgress, type LearningProgress } from "@/lib/progress/types";

const listeners = new Set<() => void>();
const serverSnapshot = emptyProgress();
let snapshot: LearningProgress = serverSnapshot;
let didHydrate = false;

function emit() {
  for (const listener of listeners) listener();
}

function withDefaultCurrent(progress: LearningProgress): LearningProgress {
  if (progress.currentLesson) return progress;
  const first = getFirstPublishedLesson();
  return {
    ...progress,
    currentLesson: { moduleId: first.module.id, lessonId: first.lesson.id },
  };
}

function hydrate() {
  if (didHydrate || typeof window === "undefined") return;
  didHydrate = true;
  try {
    snapshot = withDefaultCurrent(recordVisit(progressRepository.load()));
  } catch {
    snapshot = withDefaultCurrent(emptyProgress());
  }
  progressRepository.save(snapshot);
}

export function subscribeProgress(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getProgressSnapshot() {
  return snapshot;
}

export function getServerProgressSnapshot() {
  return serverSnapshot;
}

export function updateProgress(updater: (current: LearningProgress) => LearningProgress) {
  hydrate();
  snapshot = updater(snapshot);
  progressRepository.save(snapshot);
  emit();
}
