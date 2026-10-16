"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Equation } from "@/components/math/Equation";
import { Card } from "@/components/ui/Card";
import { parseStudentNumber } from "@/lib/math/parse-number";
import { lessonKey } from "@/lib/courses";
import { useProgress } from "@/lib/progress/context";
import type { QuizQuestion } from "@/lib/types";

function isNumerical(
  question: QuizQuestion,
): question is Extract<QuizQuestion, { answer: number }> {
  return question.kind !== "multiple-choice";
}

function grade(question: QuizQuestion, raw: string): boolean {
  if (isNumerical(question)) {
    const submitted = parseStudentNumber(raw);
    return Number.isFinite(submitted) && Math.abs(submitted - question.answer) <= question.tolerance;
  }
  return raw === question.answer;
}

function topicOf(question: QuizQuestion) {
  return question.topic ?? "General";
}

function submittedLabel(question: QuizQuestion, raw: string) {
  if (!raw) return "blank";
  if (isNumerical(question)) return raw;
  return question.options.find((option) => option.id === raw)?.label ?? raw;
}

export function MarkedQuiz({
  questions,
  moduleId,
  lessonId,
}: {
  questions: QuizQuestion[];
  moduleId: string;
  lessonId: string;
}) {
  const { recordQuiz, recordLessonQuizScore, progress } = useProgress();
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [incomplete, setIncomplete] = useState(false);
  const saved = progress.quizScores?.[lessonKey(moduleId, lessonId)];

  const score = useMemo(() => {
    const correct = Object.values(results).filter(Boolean).length;
    return { correct, total: questions.length };
  }, [questions.length, results]);

  const topicBreakdown = useMemo(() => {
    const groups = new Map<string, { correct: number; total: number }>();
    for (const question of questions) {
      const topic = topicOf(question);
      const group = groups.get(topic) ?? { correct: 0, total: 0 };
      group.total += 1;
      if (results[question.id]) group.correct += 1;
      groups.set(topic, group);
    }
    return Array.from(groups.entries());
  }, [questions, results]);

  const weakTopics = topicBreakdown
    .filter(([, group]) => group.correct < group.total)
    .map(([topic, group]) => ({ topic, missed: group.total - group.correct }));

  function submit() {
    const missing = questions.some((question) => !(values[question.id] ?? "").trim());
    if (missing) {
      setIncomplete(true);
      return;
    }
    setIncomplete(false);
    const next: Record<string, boolean> = {};
    let correctCount = 0;
    for (const question of questions) {
      const raw = values[question.id] ?? "";
      const ok = grade(question, raw);
      if (ok) correctCount += 1;
      next[question.id] = ok;
      const numeric = parseStudentNumber(raw);
      recordQuiz({
        questionId: question.id,
        submitted: isNumerical(question) ? (Number.isFinite(numeric) ? numeric : raw) : raw,
        correct: ok,
      });
    }
    setResults(next);
    setSubmitted(true);
    recordLessonQuizScore(moduleId, lessonId, correctCount, questions.length);
  }

  function retry() {
    setValues({});
    setResults({});
    setSubmitted(false);
    setIncomplete(false);
  }

  if (submitted) {
    const percent = Math.round((score.correct / score.total) * 100);
    return (
      <Card className="p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Results</p>
        <h2 className="mt-1 font-serif text-2xl text-white">Marked quiz</h2>
        <p className="mt-3 font-serif text-4xl text-white" aria-live="polite">
          {score.correct} / {score.total}
          <span className="ml-3 text-lg text-slate-400">{percent}%</span>
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          {percent === 100
            ? "Every answer is within tolerance or matches the correct choice. You are ready for the next lesson."
            : "Review the topics below, then retry the quiz. Substitution errors usually come from signs, powers, or dropping units."}
        </p>
        <div className="mt-5 space-y-2">
          {topicBreakdown.map(([topic, group]) => (
            <div
              key={topic}
              className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm"
            >
              <span className="text-slate-200">{topic}</span>
              <span className={group.correct === group.total ? "text-emerald-300" : "text-amber-200"}>
                {group.correct} / {group.total}
              </span>
            </div>
          ))}
        </div>
        {weakTopics.length > 0 ? (
          <div className="mt-5 rounded-xl border border-amber-200/20 bg-amber-400/8 p-4">
            <p className="text-sm font-medium text-amber-100">Areas to improve</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
              {weakTopics.map((item) => (
                <li key={item.topic}>
                  {item.topic}: {item.missed} question{item.missed === 1 ? "" : "s"} still need work.
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <ol className="mt-6 space-y-4">
          {questions.map((question, index) => (
            <li key={question.id} className="rounded-xl border border-white/10 p-4 text-sm">
              <p className="text-slate-200">
                {index + 1}. {question.prompt}
              </p>
              <p className={`mt-2 ${results[question.id] ? "text-emerald-300" : "text-rose-300"}`}>
                {results[question.id] ? "Correct" : "Incorrect"}
                {" · you entered "}
                {submittedLabel(question, values[question.id] ?? "")}
                {isNumerical(question)
                  ? ` · expected ${question.answer}${question.unit ? ` ${question.unit}` : ""}`
                  : ` · expected “${question.options.find((option) => option.id === question.answer)?.label}”`}
              </p>
              <p className="mt-2 leading-6 text-slate-400">{question.explanation}</p>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={retry}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-cyan-200/20 px-4 py-2.5 text-sm text-cyan-100 hover:bg-white/5"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Retry quiz
        </button>
      </Card>
    );
  }

  return (
    <Card className="p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Assessment</p>
      <h2 className="mt-1 font-serif text-2xl text-white">Marked quiz</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        {questions.length} questions. Answer them all, then submit for a score
        and a topic breakdown. Numerical answers use the stated tolerance. A
        leading minus sign is allowed.
      </p>
      {saved ? (
        <p className="mt-3 text-sm text-cyan-200">
          Last saved score: {saved.correct} / {saved.total}. Submit again to replace it.
        </p>
      ) : null}
      <ol className="mt-5 space-y-5">
        {questions.map((question, index) => (
          <li key={question.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium text-slate-100" id={`${question.id}-prompt`}>
              {index + 1}. {question.prompt}
            </p>
            {question.formula ? (
              <div className="mt-2 overflow-x-auto">
                <Equation latex={question.formula} />
              </div>
            ) : null}
            {isNumerical(question) ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <input
                  value={values[question.id] ?? ""}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [question.id]: event.target.value,
                    }))
                  }
                  inputMode="text"
                  autoComplete="off"
                  aria-labelledby={`${question.id}-prompt`}
                  placeholder="Answer"
                  className="min-h-11 w-36 rounded-lg border border-cyan-100/15 bg-[#07101e] px-3 py-2 text-sm text-white outline-none ring-cyan-400/40 placeholder:text-slate-500 focus:ring-2"
                />
                {question.unit ? (
                  <span className="text-sm text-slate-400">{question.unit}</span>
                ) : null}
                <span className="text-xs text-slate-500">±{question.tolerance}</span>
              </div>
            ) : (
              <fieldset className="mt-3 space-y-2" aria-labelledby={`${question.id}-prompt`}>
                <legend className="sr-only">{question.prompt}</legend>
                {question.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex min-h-11 cursor-pointer items-start gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={values[question.id] === option.id}
                      onChange={() =>
                        setValues((current) => ({ ...current, [question.id]: option.id }))
                      }
                      className="mt-1 accent-cyan-400"
                    />
                    {option.label}
                  </label>
                ))}
              </fieldset>
            )}
          </li>
        ))}
      </ol>
      {incomplete ? (
        <p className="mt-4 text-sm text-amber-200" role="alert">
          Answer every question before submitting. Blank answers are not scored as
          guesses.
        </p>
      ) : null}
      <button
        type="button"
        onClick={submit}
        className="mt-5 min-h-11 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
      >
        Submit quiz
      </button>
    </Card>
  );
}
