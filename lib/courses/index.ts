import { modules } from "@/lib/courses/catalog";
import { subjects } from "@/lib/subjects";
import type { Lesson, Module, SubjectId } from "@/lib/types";

export { modules } from "@/lib/courses/catalog";
export { kinematicsIntroLesson } from "@/lib/courses/kinematics-lesson";

export function getModule(moduleId: string): Module | undefined {
  return modules.find((entry) => entry.id === moduleId);
}

export function getLesson(
  moduleId: string,
  lessonId: string,
): { module: Module; lesson: Lesson } | undefined {
  const course = getModule(moduleId);
  if (!course) return undefined;
  const lesson = course.lessons.find((entry) => entry.id === lessonId);
  if (!lesson) return undefined;
  return { module: course, lesson };
}

export function getModulesBySubject(subject: SubjectId) {
  return modules.filter((entry) => entry.subject === subject);
}

export function getFirstPublishedLesson() {
  for (const course of modules) {
    const lesson = course.lessons.find((entry) => entry.status === "published");
    if (lesson) return { module: course, lesson };
  }
  const fallback = modules[0];
  return { module: fallback, lesson: fallback.lessons[0] };
}

export function getAdjacentLessons(moduleId: string, lessonId: string) {
  const course = getModule(moduleId);
  if (!course) return { previous: null, next: null, moduleIndex: -1, lessonIndex: -1 };
  const lessonIndex = course.lessons.findIndex((entry) => entry.id === lessonId);
  const moduleIndex = modules.findIndex((entry) => entry.id === moduleId);
  const previousInModule = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextInModule =
    lessonIndex >= 0 && lessonIndex < course.lessons.length - 1
      ? course.lessons[lessonIndex + 1]
      : null;

  const previousModule = moduleIndex > 0 ? modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : null;

  return {
    previous: previousInModule
      ? { module: course, lesson: previousInModule }
      : previousModule
        ? {
            module: previousModule,
            lesson: previousModule.lessons[previousModule.lessons.length - 1],
          }
        : null,
    next: nextInModule
      ? { module: course, lesson: nextInModule }
      : nextModule
        ? { module: nextModule, lesson: nextModule.lessons[0] }
        : null,
    moduleIndex,
    lessonIndex,
  };
}

export function countLessons() {
  return modules.reduce((sum, module) => sum + module.lessons.length, 0);
}

export function countPublishedLessons() {
  return modules.reduce(
    (sum, module) =>
      sum + module.lessons.filter((lesson) => lesson.status === "published").length,
    0,
  );
}

export function subjectLabel(id: SubjectId) {
  return subjects.find((subject) => subject.id === id)?.title ?? id;
}

export function lessonPath(moduleId: string, lessonId: string) {
  return `/library/${moduleId}/${lessonId}`;
}

export function modulePath(moduleId: string) {
  return `/library/${moduleId}`;
}

export function lessonKey(moduleId: string, lessonId: string) {
  return `${moduleId}:${lessonId}` as const;
}
