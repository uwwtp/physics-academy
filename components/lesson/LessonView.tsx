"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";
import { Hint } from "@/components/lesson/Hint";
import { LessonDemo } from "@/components/lesson/LessonDemo";
import { PracticeSet } from "@/components/lesson/PracticeSet";
import { WorkedExamples } from "@/components/lesson/WorkedExamples";
import { Equation } from "@/components/math/Equation";
import { NumericalQuiz } from "@/components/quiz/NumericalQuiz";
import { MarkedQuiz } from "@/components/quiz/MarkedQuiz";
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
  const examples = content?.examples ?? (content?.example ? [content.example] : []);
  const practice = content?.practice ?? [];
  const legacyQuestions = content?.questions ?? [];

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
              {section.demo ? <LessonDemo demo={section.demo} /> : null}
              {section.mistakes?.map((item) => (
                <div
                  key={item.mistake}
                  className="rounded-xl border border-rose-200/15 bg-rose-400/5 p-4"
                >
                  <p className="text-sm font-medium text-rose-200">Mistake</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{item.mistake}</p>
                  <p className="mt-2 text-sm font-medium text-emerald-200">Correction</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{item.correction}</p>
                </div>
              ))}
              {section.hints?.map((hint) => (
                <Hint key={hint.title} title={hint.title} body={hint.body} />
              ))}
            </article>
          ))}

          {examples.length > 0 ? <WorkedExamples examples={examples} /> : null}

          {practice.length > 0 ? <PracticeSet questions={practice} /> : null}

          {legacyQuestions.length > 0 && practice.length === 0 ? (
            <NumericalQuiz questions={legacyQuestions} />
          ) : null}

          {content.quiz && content.quiz.length > 0 ? (
            <MarkedQuiz
              questions={content.quiz}
              moduleId={course.id}
              lessonId={lesson.id}
            />
          ) : null}

          {content.summary && content.summary.length > 0 ? (
            <Card className="p-5">
              <h2 className="font-serif text-xl text-white">Summary</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                {content.summary.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </>
      ) : (
        <Card className="p-5">
          <h2 className="font-serif text-xl text-white">Lesson outline</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            This lesson is specified and sequenced. The full interactive
            exposition will follow the same pattern as Symbols and Substitution.
            Study the objectives above, then continue through the module.
          </p>
          <Link
            href="/library/algebra-foundations/symbols-and-substitution"
            className="mt-4 inline-flex text-sm text-cyan-300 hover:text-cyan-200"
          >
            Open Symbols and Substitution →
          </Link>
        </Card>
      )}

      {adjacent.next ? (
        <Card className="p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Next</p>
          <h2 className="mt-1 font-serif text-xl text-white">{adjacent.next.lesson.title}</h2>
          <p className="mt-2 text-sm text-slate-400">{adjacent.next.module.title}</p>
          <Link
            href={lessonPath(adjacent.next.module.id, adjacent.next.lesson.id)}
            className="mt-3 inline-flex text-sm text-cyan-300 hover:text-cyan-200"
          >
            Continue to the next lesson →
          </Link>
        </Card>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => completeLesson(course.id, lesson.id)}
          aria-pressed={completed}
          className="min-h-11 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
        >
          {completed ? "Lesson marked complete" : "Mark lesson complete"}
        </button>
        <div className="flex flex-wrap gap-2">
          {adjacent.previous ? (
            <Link
              href={lessonPath(adjacent.previous.module.id, adjacent.previous.lesson.id)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
              aria-label={`Previous: ${adjacent.previous.lesson.title}`}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Previous
            </Link>
          ) : null}
          {adjacent.next ? (
            <Link
              href={lessonPath(adjacent.next.module.id, adjacent.next.lesson.id)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
              aria-label={`Next: ${adjacent.next.lesson.title}`}
            >
              Next
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
