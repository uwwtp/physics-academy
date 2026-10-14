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
  tolerance: number;
  unit: string;
  significantFigures?: number;
  explanation: string;
};

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
};

export type LessonContent = {
  sections: LessonSection[];
  example: WorkedExample;
  questions: NumericalQuestion[];
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
