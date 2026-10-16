export type SubjectId =
  | "mathematics"
  | "classical-physics"
  | "special-relativity"
  | "general-relativity"
  | "quantum-mechanics"
  | "quantum-field-theory";

export type Difficulty = "beginner" | "intermediate" | "advanced" | "university";

export type LessonStatus = "published" | "outlined";

export type NumericalQuestion = {
  id: string;
  prompt: string;
  formula?: string;
  answer: number;
  /** When set (length ≥ 2), every listed value must be entered; order does not matter. */
  answers?: number[];
  tolerance: number;
  unit: string;
  significantFigures?: number;
  explanation: string;
  topic?: string;
  hints?: { title: string; body: string }[];
};

export type MultipleChoiceOption = {
  id: string;
  label: string;
};

export type QuizQuestion =
  | (NumericalQuestion & { kind?: "numerical" })
  | {
      id: string;
      kind: "multiple-choice";
      prompt: string;
      formula?: string;
      options: MultipleChoiceOption[];
      answer: string;
      explanation: string;
      topic: string;
    };

export type InteractiveDemoId =
  | "expression-evaluator"
  | "formula-substitution"
  | "balance-scale"
  | "equation-checker"
  | "parabola-explorer"
  | "projectile-motion";

export type WorkedExample = {
  title: string;
  setup: string;
  steps: { text: string; latex?: string }[];
  result: string;
  resultLatex?: string;
};

export type LessonSection = {
  heading: string;
  paragraphs: string[];
  equations?: string[];
  hints?: { title: string; body: string }[];
  demo?: InteractiveDemoId;
  mistakes?: { mistake: string; correction: string }[];
};

export type LessonContent = {
  sections: LessonSection[];
  example?: WorkedExample;
  examples?: WorkedExample[];
  questions?: NumericalQuestion[];
  practice?: NumericalQuestion[];
  quiz?: QuizQuestion[];
  summary?: string[];
};

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  summary: string;
  durationMinutes: number;
  objectives: string[];
  status: LessonStatus;
  content?: LessonContent;
};

export type Module = {
  id: string;
  order: number;
  subject: SubjectId;
  title: string;
  tagline: string;
  description: string;
  level: Difficulty;
  durationHours: number;
  prerequisites: string[];
  objectives: string[];
  lessons: Lesson[];
};

export type Subject = {
  id: SubjectId;
  title: string;
  description: string;
};
