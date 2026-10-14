"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { Equation } from "@/components/math/Equation";
import { Card } from "@/components/ui/Card";
import { useProgress } from "@/lib/progress/context";
import type { NumericalQuestion } from "@/lib/types";

function isCorrect(submitted: number, question: NumericalQuestion) {
  return Math.abs(submitted - question.answer) <= question.tolerance;
}

export function NumericalQuiz({ questions }: { questions: NumericalQuestion[] }) {
  const { recordQuiz } = useProgress();
  const [values, setValues] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [checked, setChecked] = useState(false);

  const score = useMemo(() => {
    const entries = Object.values(results);
    if (entries.length === 0) return null;
    return {
      correct: entries.filter(Boolean).length,
      total: questions.length,
    };
  }, [questions.length, results]);

  function checkAnswers() {
    const next: Record<string, boolean> = {};
    for (const question of questions) {
      const raw = values[question.id];
      const submitted = Number.parseFloat(raw ?? "");
      const correct = Number.isFinite(submitted) && isCorrect(submitted, question);
      next[question.id] = correct;
      recordQuiz({
        questionId: question.id,
        submitted: Number.isFinite(submitted) ? submitted : Number.NaN,
        correct,
      });
    }
    setResults(next);
    setChecked(true);
  }

  function retry() {
    setValues({});
    setResults({});
    setChecked(false);
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Practice</p>
          <h2 className="mt-1 font-serif text-2xl text-white">Numerical questions</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Enter a number. Answers are accepted within the stated tolerance, so
            ordinary rounding will not fail a correct method.
          </p>
        </div>
        {score ? (
          <p className="rounded-full bg-white/5 px-3 py-1 text-sm text-cyan-100 ring-1 ring-white/10">
            {score.correct} / {score.total} correct
          </p>
        ) : null}
      </div>
      <ol className="space-y-5">
        {questions.map((question, index) => {
          const outcome = results[question.id];
          return (
            <li key={question.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-slate-100">
                {index + 1}. {question.prompt}
              </p>
              {question.formula ? (
                <div className="mt-2 text-sm">
                  <Equation latex={question.formula} />
                </div>
              ) : null}
              <p className="mt-2 text-xs text-slate-500">
                Tolerance ±{question.tolerance} {question.unit}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <input
                  value={values[question.id] ?? ""}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [question.id]: event.target.value,
                    }))
                  }
                  inputMode="decimal"
                  disabled={checked}
                  placeholder="Answer"
                  className="w-36 rounded-lg border border-cyan-100/15 bg-[#07101e] px-3 py-2 text-sm text-white outline-none ring-cyan-400/40 placeholder:text-slate-500 focus:ring-2 disabled:opacity-70"
                />
                <span className="text-sm text-slate-400">{question.unit}</span>
                {checked ? (
                  outcome ? (
                    <span className="inline-flex items-center gap-1 text-sm text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-sm text-rose-300">
                      <XCircle className="h-4 w-4" /> Expected {question.answer}{" "}
                      {question.unit}
                    </span>
                  )
                ) : null}
              </div>
              {checked ? (
                <p className="mt-3 text-sm leading-6 text-slate-300">{question.explanation}</p>
              ) : null}
            </li>
          );
        })}
      </ol>
      <div className="mt-5 flex flex-wrap gap-3">
        {!checked ? (
          <button
            type="button"
            onClick={checkAnswers}
            className="rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Check answers
          </button>
        ) : (
          <button
            type="button"
            onClick={retry}
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/20 px-4 py-2.5 text-sm text-cyan-100 hover:bg-white/5"
          >
            <RotateCcw className="h-4 w-4" />
            Retry
          </button>
        )}
      </div>
    </Card>
  );
}
