import type { Subject, SubjectId } from "@/lib/types";

export const subjects: Subject[] = [
  {
    id: "mathematics",
    title: "Mathematics",
    description: "The language of physics: algebra, calculus, and linear structure.",
  },
  {
    id: "classical-physics",
    title: "Classical Physics",
    description: "Motion, forces, energy, waves, and electromagnetism.",
  },
  {
    id: "special-relativity",
    title: "Special Relativity",
    description: "Spacetime, Lorentz transformations, and relativistic dynamics.",
  },
  {
    id: "general-relativity",
    title: "General Relativity",
    description: "Gravity as geometry, curvature, and Einstein's field equations.",
  },
  {
    id: "quantum-mechanics",
    title: "Quantum Mechanics",
    description: "Wavefunctions, operators, and the quantum description of matter.",
  },
  {
    id: "quantum-field-theory",
    title: "Quantum Field Theory",
    description: "Fields, particles, and the Standard Model's interaction picture.",
  },
];

export const subjectOrder: SubjectId[] = subjects.map((subject) => subject.id);

export function getSubject(id: SubjectId) {
  const subject = subjects.find((entry) => entry.id === id);
  if (!subject) {
    throw new Error(`Unknown subject: ${id}`);
  }
  return subject;
}
