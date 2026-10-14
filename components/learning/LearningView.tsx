"use client";

import Link from "next/link";
import { ModuleCard } from "@/components/courses/ModuleCard";
import { Card } from "@/components/ui/Card";
import {
  getFirstPublishedLesson,
  getLesson,
  lessonPath,
  modules,
} from "@/lib/courses";
import { useProgress } from "@/lib/progress/context";
import { moduleCompletion } from "@/lib/progress/stats";

export function LearningView() {
  const { progress } = useProgress();
  const current =
    (progress.currentLesson &&
      getLesson(progress.currentLesson.moduleId, progress.currentLesson.lessonId)) ||
    getFirstPublishedLesson();
  const inProgress = modules.filter((module) => {
    const value = moduleCompletion(progress, module.id);
    return value > 0 && value < 100;
  });
  const completed = modules.filter((module) => moduleCompletion(progress, module.id) === 100);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">My learning</p>
        <h1 className="mt-2 font-serif text-3xl text-white sm:text-4xl">Your path</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Resume the lesson you last opened, then return to any module already in
          motion.
        </p>
      </header>

      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">Continue</p>
          <h2 className="mt-1 font-serif text-2xl text-white">{current.lesson.title}</h2>
          <p className="text-sm text-slate-400">{current.module.title}</p>
        </div>
        <Link
          href={lessonPath(current.module.id, current.lesson.id)}
          className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
        >
          Continue learning
        </Link>
      </Card>

      <section>
        <h2 className="font-serif text-2xl text-white">In progress</h2>
        {inProgress.length === 0 ? (
          <p className="mt-3 text-sm text-slate-400">
            No module is mid-way yet.{" "}
            <Link href="/library/kinematics" className="text-cyan-300">
              Start kinematics
            </Link>{" "}
            or browse the{" "}
            <Link href="/library" className="text-cyan-300">
              course library
            </Link>
            .
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {inProgress.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-serif text-2xl text-white">Completed modules</h2>
        {completed.length === 0 ? (
          <p className="mt-3 text-sm text-slate-400">
            Finish every lesson in a module to see it listed here.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {completed.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
