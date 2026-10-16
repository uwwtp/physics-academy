import { Equation } from "@/components/math/Equation";
import { Card } from "@/components/ui/Card";
import type { WorkedExample } from "@/lib/types";

export function WorkedExamples({ examples }: { examples: WorkedExample[] }) {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl text-white">Worked examples</h2>
      {examples.map((example, exampleIndex) => (
        <Card key={example.title} className="p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">
            Example {exampleIndex + 1}
          </p>
          <h3 className="mt-1 font-serif text-2xl text-white">{example.title}</h3>
          <p className="mt-3 text-[15px] leading-7 text-slate-300">{example.setup}</p>
          <ol className="mt-4 space-y-4">
            {example.steps.map((step, index) => (
              <li key={`${example.title}-${index}`} className="rounded-xl bg-white/5 p-4">
                <p className="text-sm font-medium text-cyan-100">Step {index + 1}</p>
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
            <p className="text-sm text-slate-200">{example.result}</p>
            {example.resultLatex ? (
              <div className="mt-2 overflow-x-auto">
                <Equation latex={example.resultLatex} display />
              </div>
            ) : null}
          </div>
        </Card>
      ))}
    </div>
  );
}
