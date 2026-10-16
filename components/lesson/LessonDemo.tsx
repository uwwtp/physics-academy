import { BalanceScale } from "@/components/lesson/demos/BalanceScale";
import { EquationChecker } from "@/components/lesson/demos/EquationChecker";
import { ExpressionEvaluator } from "@/components/lesson/demos/ExpressionEvaluator";
import { FormulaSubstitutionLab } from "@/components/lesson/demos/FormulaSubstitutionLab";
import { ParabolaExplorer } from "@/components/lesson/demos/ParabolaExplorer";
import { ProjectileMotion } from "@/components/lesson/demos/ProjectileMotion";
import type { InteractiveDemoId } from "@/lib/types";

export function LessonDemo({ demo }: { demo: InteractiveDemoId }) {
  if (demo === "expression-evaluator") return <ExpressionEvaluator />;
  if (demo === "formula-substitution") return <FormulaSubstitutionLab />;
  if (demo === "balance-scale") return <BalanceScale />;
  if (demo === "equation-checker") return <EquationChecker />;
  if (demo === "parabola-explorer") return <ParabolaExplorer />;
  if (demo === "projectile-motion") return <ProjectileMotion />;
  return null;
}
