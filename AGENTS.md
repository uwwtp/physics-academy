<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Physics Academy

Physics Academy is a Next.js App Router site (TypeScript, Tailwind CSS) that teaches mathematics and physics from absolute beginner through advanced university level. Live site: https://physics-academy-chi.vercel.app/ — repository: https://github.com/uwwtp/physics-academy.

Work in this repository. Do not create a new Next.js app. Do not configure Supabase or authentication until asked. Do not commit, push, or deploy unless the user explicitly approves.

The quality benchmark for every new lesson is **Symbols and Substitution** (`/library/algebra-foundations/symbols-and-substitution`). Match its depth, tone, interactivity, and polish. Do not fill the curriculum with empty headings or placeholder copy.

## Educational vision

Assume students may start with little mathematics. Teach in accessible language first, then connect to physics. The long-term path is:

1. Mathematical foundations — algebra, equations, functions, graphs, trigonometry, calculus
2. Classical mechanics — motion, forces, energy, momentum, rotation
3. Waves and oscillations
4. Electricity and magnetism
5. Thermodynamics and statistical mechanics
6. Optics
7. Special and general relativity
8. Quantum mechanics
9. Quantum field theory
10. Advanced mathematical physics

Build on the existing catalog in `lib/courses/catalog.ts`. Do not replace the structure unless necessary. Complete **one published lesson at a time**.

## Lesson quality

Every published lesson must include:

- Clear learning objectives
- Substantial teaching in beginner-friendly prose (not one-sentence captions)
- Explanations of symbols and terminology
- Multiple fully worked examples with steps
- Derivations where they help understanding
- Interactive practice with answer checking and reasonable numerical tolerance
- Progressive hints (at least two per practice item)
- Visual or interactive demonstrations
- Common mistakes and corrections
- A marked quiz with explanations, score, topic breakdown, and areas to improve
- A summary and an obvious next-lesson path

Never ship an empty lesson shell. Outlined lessons may remain sequenced until they are fully authored.

A complete lesson target (as in Symbols and Substitution):

- At least five or six substantial teaching sections
- At least six worked examples
- At least eight practice questions with hints
- At least two interactive demonstrations
- A ten-question marked quiz with a results screen

## Interactive learning

Reuse existing components before inventing new ones:

- `LessonView`, `WorkedExamples`, `PracticeSet`, `MarkedQuiz`, `Hint`, `Equation`
- Demos via `InteractiveDemoId` and `components/lesson/LessonDemo.tsx`
- Progress via `lib/progress` (localStorage today; swap the repository later)

Interactions must be mathematically correct. Handle negatives, zero, decimals, Unicode minus signs (`parseStudentNumber`), and empty quiz submissions. Prefer React state. Use lucide-react for icons and KaTeX for mathematics.

## Design

Preserve the navy/cyan scientific aesthetic, serif headings, cards, and sidebar navigation. Keep the layout responsive. Equations must remain readable (horizontal scroll if needed). Favour understanding over decoration. Touch targets should be at least 44px where students tap. Label controls for accessibility (`htmlFor`, `aria-*`, `role="math"`).

## Data and progress

Course content lives in typed modules under `lib/courses/`. Lesson pages are `app/library/[moduleId]/[lessonId]`. Progress is local and must survive revisiting a lesson (current lesson, completion, last quiz score). Do not add secrets or `.env` credentials.

## Engineering workflow

- TypeScript, existing file conventions, `@/` imports
- Dynamic `params` are Promises; `generateStaticParams` should be async; do not name variables `module`
- Avoid `new Date()` during prerender of Client Components; use stored timestamps or `safeIsoTimestamp` in event handlers
- After implementing a lesson: run ESLint, TypeScript, and `npm run build`, then fix failures
- Do not push or deploy until the user has tested locally and approved
- Report: what was implemented, files changed, what was tested, whether the production build passed, and what remains

## Next.js 16

Read `node_modules/next/dist/docs/` before relying on old Next.js APIs. Keep the managed Next.js block at the top of this file.
