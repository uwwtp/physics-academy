"use client";

import { useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { Hint } from "@/components/lesson/Hint";
import { Equation } from "@/components/math/Equation";
import { Card } from "@/components/ui/Card";
import { parseStudentNumber } from "@/lib/math/parse-number";
import { rootsMatch } from "@/lib/math/quadratic";
import { useProgress } from "@/lib/progress/context";
import type { NumericalQuestion } from "@/lib/types";

function expectedList(question: NumericalQuestion) {
  return question.answers && question.answers.length > 1 ? question.answers : [question.answer];
}

function isMultiRoot(question: NumericalQuestion) {
  return Boolean(question.answers && question.answers.length > 1);
}

function expectedLabel(question: NumericalQuestion) {
  const values = expectedList(question);
  const joined = values.join(" and ");
  return question.unit ? `${joined} ${question.unit}` : joined;
}

function matches(question: NumericalQuestion, fields: string[]) {
  const expected = expectedList(question);
  const submitted = fields.map((field) => parseStudentNumber(field));
  if (expected.length === 1) {
    return Number.isFinite(submitted[0]) && Math.abs(submitted[0] - expected[0]) <= question.tolerance;
  }
  return rootsMatch(submitted, expected, question.tolerance);
}

export function PracticeSet({ questions }: { questions: NumericalQuestion[] }) {
  const { recordQuiz } = useProgress();
  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [correct, setCorrect] = useState<Record<string, boolean>>({});

  const done = questions.filter((question) => checked[question.id]).length;

  function fieldKey(id: string, index: number) {
    return index === 0 ? id : `${id}::${index}`;
  }

  function fieldsFor(question: NumericalQuestion) {
    return expectedList(question).map((_, index) => values[fieldKey(question.id, index)] ?? "");
  }

  function checkOne(question: NumericalQuestion) {
    const fields = fieldsFor(question);
    const ok = matches(question, fields);
    const first = parseStudentNumber(fields[0] ?? "");
    setChecked((current) => ({ ...current, [question.id]: true }));
    setCorrect((current) => ({ ...current, [question.id]: ok }));
    recordQuiz({
      questionId: question.id,
      submitted: Number.isFinite(first) ? first : Number.NaN,
      correct: ok,
    });
  }

  function retryOne(question: NumericalQuestion) {
    setValues((current) => {
      const next = { ...current };
      expectedList(question).forEach((_, index) => {
        delete next[fieldKey(question.id, index)];
      });
      return next;
    });
    setChecked((current) => {
      const next = { ...current };
      delete next[question.id];
      return next;
    });
    setCorrect((current) => {
      const next = { ...current };
      delete next[question.id];
      return next;
    });
  }

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Practice</p>
          <h2 className="mt-1 font-serif text-2xl text-white">Guided exercises</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Open a hint if you stall, then check each question. Numerical answers
            are accepted within the stated tolerance.
          </p>
        </div>
        <p className="rounded-full bg-white/5 px-3 py-1 text-sm text-cyan-100 ring-1 ring-white/10">
          {done} / {questions.length} checked
        </p>
      </div>
      <ol className="space-y-5">
        {questions.map((question, index) => {
          const isChecked = Boolean(checked[question.id]);
          const isCorrect = Boolean(correct[question.id]);
          const multi = isMultiRoot(question);
          return (
            <li key={question.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-slate-100">
                {index + 1}. {question.prompt}
              </p>
              {question.formula ? (
                <div className="mt-2 overflow-x-auto">
                  <Equation latex={question.formula} />
                </div>
              ) : null}
              <p className="mt-2 text-xs text-slate-500">
                Tolerance ±{question.tolerance}
                {question.unit ? ` ${question.unit}` : ""}
                {multi ? " · both roots required" : ""}
              </p>
              {question.hints?.map((hint) => (
                <div key={hint.title} className="mt-3">
                  <Hint title={hint.title} body={hint.body} />
                </div>
              ))}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {expectedList(question).map((_, slot) => (
                  <input
                    key={fieldKey(question.id, slot)}
                    value={values[fieldKey(question.id, slot)] ?? ""}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        [fieldKey(question.id, slot)]: event.target.value,
                      }))
                    }
                    inputMode="text"
                    autoComplete="off"
                    aria-label={
                      multi
                        ? `Root ${slot + 1} of question ${index + 1}`
                        : `Answer to question ${index + 1}`
                    }
                    disabled={isChecked}
                    placeholder={multi ? `Root ${slot + 1}` : "Answer"}
                    className="min-h-11 w-36 rounded-lg border border-cyan-100/15 bg-[#07101e] px-3 py-2 text-sm text-white outline-none ring-cyan-400/40 placeholder:text-slate-500 focus:ring-2 disabled:opacity-70"
                  />
                ))}
                {question.unit ? (
                  <span className="text-sm text-slate-400">{question.unit}</span>
                ) : null}
                {!isChecked ? (
                  <button
                    type="button"
                    onClick={() => checkOne(question)}
                    className="min-h-11 rounded-lg bg-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
                  >
                    Check
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => retryOne(question)}
                    className="inline-flex items-center gap-1 rounded-lg border border-cyan-200/20 px-3 py-2 text-sm text-cyan-100 hover:bg-white/5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Retry
                  </button>
                )}
                {isChecked ? (
                  isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-sm text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-sm text-rose-300">
                      <XCircle className="h-4 w-4" /> Expected {expectedLabel(question)}
                    </span>
                  )
                ) : null}
              </div>
              {isChecked ? (
                <p className="mt-3 text-sm leading-6 text-slate-300">{question.explanation}</p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
