"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";
import { Hint } from "@/components/lesson/Hint";
import { Equation } from "@/components/math/Equation";
import { NumericalQuiz } from "@/components/quiz/NumericalQuiz";
import { Card } from "@/components/ui/Card";
import { getAdjacentLessons, lessonPath, modulePath } from "@/lib/courses";
import { formatMinutes } from "@/lib/format";
import { useProgress } from "@/lib/progress/context";
import type { Lesson, Module } from "@/lib/types";

export function LessonView({
  module: course,
  lesson,
}: {
  module: Module;
  lesson: Lesson;
}) {
  const { completeLesson, setCurrentLesson, progress } = useProgress();
  const adjacent = getAdjacentLessons(course.id, lesson.id);
  const completed = progress.completedLessons.includes(`${course.id}:${lesson.id}`);

  useEffect(() => {
    setCurrentLesson(course.id, lesson.id);
  }, [course.id, lesson.id, setCurrentLesson]);

  const content = lesson.content;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href={modulePath(course.id)}
        className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
      >
        <ArrowLeft className="h-4 w-4" />
        {course.title}
      </Link>
      <header>
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Lesson</p>
        <h1 className="mt-2 font-serif text-3xl text-white sm:text-4xl">{lesson.title}</h1>
        <p className="mt-3 text-slate-400">{lesson.summary}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-cyan-300" />
            {formatMinutes(lesson.durationMinutes)}
          </span>
          {completed ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-300">
              <Check className="h-4 w-4" />
              Completed
            </span>
          ) : null}
        </div>
      </header>

      <Card className="p-5">
        <h2 className="font-serif text-xl text-white">Learning objectives</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
          {lesson.objectives.map((objective) => (
            <li key={objective} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
              {objective}
            </li>
          ))}
        </ul>
      </Card>

      {content ? (
        <>
          {content.sections.map((section) => (
            <article key={section.heading} className="space-y-3">
              <h2 className="font-serif text-2xl text-white">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-7 text-slate-300">
                  {paragraph}
                </p>
              ))}
              {section.equations?.map((latex) => (
                <div
                  key={latex}
                  className="overflow-x-auto rounded-xl border border-cyan-100/10 bg-[#07101e] px-4 py-1"
                >
                  <Equation latex={latex} display />
                </div>
              ))}
              {section.hints?.map((hint) => (
                <Hint key={hint.title} title={hint.title} body={hint.body} />
              ))}
            </article>
          ))}

          <Card className="p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
              Worked example
            </p>
            <h2 className="mt-1 font-serif text-2xl text-white">{content.example.title}</h2>
            <p className="mt-3 text-[15px] leading-7 text-slate-300">{content.example.setup}</p>
            <ol className="mt-4 space-y-4">
              {content.example.steps.map((step, index) => (
                <li key={step.text} className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm font-medium text-cyan-100">
                    Step {index + 1}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{step.text}</p>
                  {step.latex ? (
                    <div className="mt-2 overflow-x-auto">
                      <Equation latex={step.latex} display />
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
            <div className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-400/8 p-4">
              <p className="text-sm text-slate-200">{content.example.result}</p>
              {content.example.resultLatex ? (
                <div className="mt-2">
                  <Equation latex={content.example.resultLatex} display />
                </div>
              ) : null}
            </div>
          </Card>

          <NumericalQuiz questions={content.questions} />
        </>
      ) : (
        <Card className="p-5">
          <h2 className="font-serif text-xl text-white">Lesson outline</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            This lesson is specified and sequenced. The full interactive
            exposition, worked example, and quiz will follow the same pattern as
            Position, Velocity and Acceleration. Study the objectives above, then
            continue through the module.
          </p>
          <Link
            href="/library/kinematics/position-velocity-acceleration"
            className="mt-4 inline-flex text-sm text-cyan-300 hover:text-cyan-200"
          >
            Open the published kinematics lesson →
          </Link>
        </Card>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => completeLesson(course.id, lesson.id)}
          className="rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
        >
          {completed ? "Completed" : "Mark lesson complete"}
        </button>
        <div className="flex flex-wrap gap-2">
          {adjacent.previous ? (
            <Link
              href={lessonPath(adjacent.previous.module.id, adjacent.previous.lesson.id)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Link>
          ) : null}
          {adjacent.next ? (
            <Link
              href={lessonPath(adjacent.next.module.id, adjacent.next.lesson.id)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
