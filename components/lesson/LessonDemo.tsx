import { ExpressionEvaluator } from "@/components/lesson/demos/ExpressionEvaluator";
import { FormulaSubstitutionLab } from "@/components/lesson/demos/FormulaSubstitutionLab";
import type { InteractiveDemoId } from "@/lib/types";

export function LessonDemo({ demo }: { demo: InteractiveDemoId }) {
  if (demo === "expression-evaluator") return <ExpressionEvaluator />;
  if (demo === "formula-substitution") return <FormulaSubstitutionLab />;
  return null;
}
