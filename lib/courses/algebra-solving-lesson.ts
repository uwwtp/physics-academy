import type { Lesson } from "@/lib/types";

export const algebraSolvingLesson: Lesson = {
  id: "solving-equations",
  moduleId: "algebra-foundations",
  title: "Solving Linear Equations",
  summary:
    "Keep both sides of an equation in balance. Undo operations in reverse order, including brackets, two sides, fractions and negatives, then check by substitution.",
  durationMinutes: 55,
  objectives: [
    "Explain why the same operation must be applied to both sides of an equation.",
    "Solve one-step and two-step linear equations, including brackets.",
    "Collect like terms when the unknown appears on both sides.",
    "Handle fractions and negative coefficients without losing the sign.",
    "Check a candidate solution by substituting back, and rearrange a simple physics formula.",
  ],
  status: "published",
  content: {
    sections: [
      {
        heading: "An equation is a balanced sentence",
        paragraphs: [
          "An expression is a recipe: 2x + 3. An equation is a claim that two recipes give the same number: 2x + 3 = 11. The equals sign is not a button that means “work this out.” It is a balance. Whatever sits on the left must weigh the same as whatever sits on the right.",
          "If a shopping bag and a 2 kg weight together match an 8 kg weight, the bag must be 6 kg. You may add a tin of beans to both pans, or take a weight off both pans. The beam stays level because both sides changed in the same way. That is the whole method of solving equations.",
          "The unknown is the bag. We give it a letter, usually x, and write a sentence such as x + 2 = 8. Solving means finding the number that makes the sentence true. For that example the number is 6, because 6 + 2 really is 8.",
          "A linear equation in x is one where x is not squared, not under a root, and not in a denominator that itself contains x. Every equation in this lesson is linear: there will be exactly one solution, and we will find it by undoing.",
        ],
        equations: ["x + 2 = 8", "6 + 2 = 8"],
        demo: "balance-scale",
        hints: [
          {
            title: "Why both sides?",
            body: "If you subtract 2 from the left of x + 2 = 8 but leave the right alone, you have written x = 8, which is a different, false claim. Subtract 2 from both sides and you get the true sentence x = 6.",
          },
        ],
      },
      {
        heading: "Inverse operations and one-step equations",
        paragraphs: [
          "Every everyday operation has an inverse: a move that undoes it. Addition is undone by subtraction. Subtraction is undone by addition. Multiplication is undone by division. Division is undone by multiplication. To isolate x you apply the inverse of whatever is attached to it — and you apply it to both sides.",
          "If x + 7 = 12, the 7 is added to x. Subtract 7 from both sides: x = 5. If 4x = 20, x is multiplied by 4. Divide both sides by 4: x = 5. If x / 3 = 8, x is divided by 3. Multiply both sides by 3: x = 24.",
          "A reliable habit: name the operation that is “glued” to x, write its inverse, then do that inverse on the left and on the right in the same breath. Do not skip the right-hand side. The scale only stays level if both pans change.",
        ],
        equations: [
          "x + 7 = 12 \\implies x = 12 - 7 = 5",
          "4x = 20 \\implies x = 20 / 4 = 5",
        ],
      },
      {
        heading: "Two-step equations",
        paragraphs: [
          "Often two things are glued to x at once. In 2x + 3 = 11, x is multiplied by 2 and then 3 is added. Inverse operations run in reverse order: peel off the last thing that happened first. Undo the +3, then undo the ×2.",
          "Subtract 3 from both sides: 2x = 8. Then divide both sides by 2: x = 4. If you divide by 2 first you would have to divide the 3 as well, which is possible but messier. The reverse-order habit keeps the arithmetic tidy.",
          "The same pattern covers 5 − x = 1 after you remember that −x is (−1)x. Subtract 5: −x = −4. Multiply (or divide) both sides by −1: x = 4. A minus in front of x is a coefficient, not a decoration.",
        ],
        equations: [
          "2x + 3 = 11",
          "2x = 8",
          "x = 4",
        ],
      },
      {
        heading: "Brackets",
        paragraphs: [
          "Brackets pack a sum so that a coefficient multiplies the whole pack. 3(x + 2) means 3 lots of (x + 2), which expands to 3x + 6. You may expand first, then solve as a two-step equation. You may also divide both sides by 3 first and unwrap the brackets afterwards. Both routes are legal; pick the one with friendlier numbers.",
          "For 3(x + 2) = 18, dividing both sides by 3 gives x + 2 = 6, then x = 4. Expanding first gives 3x + 6 = 18, then 3x = 12, then x = 4. Same answer, as it must be.",
          "A minus outside brackets flips every sign inside: −(x − 4) = −x + 4. Write the signs slowly. Most bracket mistakes are lost minus signs, not lost 3s.",
        ],
        equations: [
          "3(x+2) = 3x + 6",
          "3(x+2) = 18 \\implies x+2 = 6 \\implies x = 4",
        ],
      },
      {
        heading: "The unknown on both sides",
        paragraphs: [
          "Sometimes x appears on the left and on the right: 5x = 2x + 12. The two sides are still a balance. Collect the bags onto one pan and the numbered weights onto the other.",
          "Subtract 2x from both sides: 3x = 12. Then divide by 3: x = 4. You could have subtracted 5x instead, landing on 0 = −3x + 12, which solves to the same x after a little more sign work. Moving the smaller pile of bags usually keeps the coefficient of x positive, which is kinder on the next line.",
          "Never cancel an x from both sides unless it is a common factor of every term. Cancelling x in 5x = 2x + 12 as if it were 5 = 2 + 12 is nonsense: you have thrown away the unknown you were trying to find.",
        ],
        equations: [
          "5x = 2x + 12",
          "3x = 12",
          "x = 4",
        ],
      },
      {
        heading: "Fractions and negative numbers",
        paragraphs: [
          "A fraction glued to x is a division. For x/2 + 1 = 5, subtract 1 first: x/2 = 4. Multiply both sides by 2: x = 8. If the fraction is in front, as in (1/3)x = 6, multiply both sides by 3 immediately.",
          "A negative coefficient means “the opposite of some number of x.” For −3x + 4 = 13, subtract 4: −3x = 9. Divide by −3, and remember that a positive divided by a negative is negative: x = −3.",
          "Dividing or multiplying both sides by a negative reverses no inequality here, because we are still working with equals. Equals does not flip. (Later, when you meet inequalities, a negative multiplier will reverse the inequality sign. Not today.)",
        ],
        equations: [
          "\\frac{x}{2} + 1 = 5 \\implies x = 8",
          "-3x + 4 = 13 \\implies x = -3",
        ],
      },
      {
        heading: "Checking by substitution, then physics formulae",
        paragraphs: [
          "A solution is not finished until it has been put back. Take 2x + 3 = 11 and the candidate x = 4. Left-hand side: 2(4) + 3 = 11. Right-hand side: 11. They match, so the candidate is genuine. If they do not match, an arithmetic slip happened on the way; do not invent a story about extra solutions.",
          "The live checker below lets you feel that only one trial value works. Linear equations of this type have a single root. Guessing is slow; inverse operations are the method. Checking is the safety catch.",
          "Physics formulae are equations with extra letters. To find one letter, treat the others as known numbers and undo. From v = u + a t, subtract u: v − u = a t. Divide by a: t = (v − u)/a. Then substitute the given values, with units. You already practised substitution; solving is the new move that isolates the letter you want.",
        ],
        equations: [
          "t = \\frac{v - u}{a}",
        ],
        demo: "equation-checker",
      },
      {
        heading: "Common mistakes",
        paragraphs: [
          "These slips appear whenever someone first meets a two-step equation. Catch them on paper before they become habits.",
        ],
        mistakes: [
          {
            mistake: "Subtracting from one side only, then declaring the answer.",
            correction: "Every inverse must be applied to the left and the right. The scale stays level only then.",
          },
          {
            mistake: "Dividing 2x + 3 = 11 by 2 to get x + 3 = 5.5.",
            correction: "The 3 must be divided as well, or — cleaner — subtract 3 first, then divide.",
          },
          {
            mistake: "Expanding 3(x + 2) as 3x + 2.",
            correction: "The 3 multiplies every term in the bracket: 3x + 6.",
          },
          {
            mistake: "From 5x = 2x + 12, “cancelling x” to 5 = 2 + 12.",
            correction: "Subtract 2x from both sides: 3x = 12. The unknown must stay until it is isolated.",
          },
          {
            mistake: "Dividing −3x = 9 by 3 and dropping the minus, writing x = 3.",
            correction: "Divide by −3, or divide by 3 and then multiply by −1. The solution is x = −3.",
          },
        ],
      },
    ],
    examples: [
      {
        title: "One-step addition",
        setup: "Solve x + 7 = 12.",
        steps: [
          {
            text: "The 7 is added to x. Subtract 7 from both sides so the scale stays level.",
            latex: "x + 7 - 7 = 12 - 7",
          },
          {
            text: "The left simplifies to x.",
            latex: "x = 5",
          },
          {
            text: "Check: 5 + 7 = 12, which matches the right-hand side.",
          },
        ],
        result: "x = 5 is the unique solution.",
        resultLatex: "x = 5",
      },
      {
        title: "One-step multiplication",
        setup: "Solve 4x = 20.",
        steps: [
          {
            text: "x is multiplied by 4. Divide both sides by 4.",
            latex: "\\frac{4x}{4} = \\frac{20}{4}",
          },
          {
            text: "The 4 cancels on the left.",
            latex: "x = 5",
          },
        ],
        result: "x = 5. Check: 4 × 5 = 20.",
        resultLatex: "x = 5",
      },
      {
        title: "Two-step equation",
        setup: "Solve 2x + 3 = 11.",
        steps: [
          {
            text: "Undo the addition first. Subtract 3 from both sides.",
            latex: "2x = 8",
          },
          {
            text: "Undo the multiplication. Divide both sides by 2.",
            latex: "x = 4",
          },
          {
            text: "Check by substitution: 2(4) + 3 = 8 + 3 = 11.",
          },
        ],
        result: "x = 4.",
        resultLatex: "x = 4",
      },
      {
        title: "Brackets",
        setup: "Solve 3(x + 2) = 18.",
        steps: [
          {
            text: "Divide both sides by 3 to unwrap the bracket in one move.",
            latex: "x + 2 = 6",
          },
          {
            text: "Subtract 2 from both sides.",
            latex: "x = 4",
          },
          {
            text: "The expanding route agrees: 3x + 6 = 18, 3x = 12, x = 4.",
          },
        ],
        result: "x = 4. Check: 3(4 + 2) = 3 × 6 = 18.",
        resultLatex: "x = 4",
      },
      {
        title: "Unknown on both sides",
        setup: "Solve 5x = 2x + 12.",
        steps: [
          {
            text: "Subtract 2x from both sides so that all bags sit on the left.",
            latex: "3x = 12",
          },
          {
            text: "Divide both sides by 3.",
            latex: "x = 4",
          },
          {
            text: "Check: left 5 × 4 = 20; right 2 × 4 + 12 = 20.",
          },
        ],
        result: "x = 4.",
        resultLatex: "x = 4",
      },
      {
        title: "A fraction",
        setup: "Solve x/2 + 1 = 5.",
        steps: [
          {
            text: "Subtract 1 from both sides.",
            latex: "\\frac{x}{2} = 4",
          },
          {
            text: "Multiply both sides by 2, the inverse of dividing by 2.",
            latex: "x = 8",
          },
        ],
        result: "x = 8. Check: 8/2 + 1 = 4 + 1 = 5.",
        resultLatex: "x = 8",
      },
      {
        title: "A negative coefficient",
        setup: "Solve −3x + 4 = 13.",
        steps: [
          {
            text: "Subtract 4 from both sides.",
            latex: "-3x = 9",
          },
          {
            text: "Divide both sides by −3. A positive over a negative is negative.",
            latex: "x = -3",
          },
          {
            text: "Check: −3(−3) + 4 = 9 + 4 = 13.",
          },
        ],
        result: "x = −3.",
        resultLatex: "x = -3",
      },
      {
        title: "Rearranging a motion formula",
        setup:
          "A vehicle speeds up from u = 8.0 m/s to v = 20.0 m/s at a constant a = 3.0 m/s². Find the time t from v = u + a t.",
        steps: [
          {
            text: "Treat u, v and a as known. Subtract u from both sides to begin isolating t.",
            latex: "v - u = a t",
          },
          {
            text: "Divide both sides by a.",
            latex: "t = \\frac{v - u}{a}",
          },
          {
            text: "Substitute the values with units.",
            latex: "t = \\frac{20.0 - 8.0}{3.0} = \\frac{12.0}{3.0} = 4.0\\,\\mathrm{s}",
          },
        ],
        result: "The vehicle takes 4.0 s. Check: 8.0 + (3.0)(4.0) = 8.0 + 12.0 = 20.0 m/s.",
        resultLatex: "t = 4.0\\,\\mathrm{s}",
      },
    ],
    practice: [
      {
        id: "lin-add",
        prompt: "Solve x + 9 = 15.",
        formula: "x + 9 = 15",
        answer: 6,
        tolerance: 0.05,
        unit: "",
        topic: "One-step",
        hints: [
          { title: "Name the inverse", body: "9 is added to x. Subtract 9 from both sides." },
          { title: "Do both sides", body: "x + 9 − 9 = 15 − 9." },
        ],
        explanation: "x = 15 − 9 = 6. Check: 6 + 9 = 15.",
      },
      {
        id: "lin-sub",
        prompt: "Solve x − 4 = 7.",
        formula: "x - 4 = 7",
        answer: 11,
        tolerance: 0.05,
        unit: "",
        topic: "One-step",
        hints: [
          { title: "Inverse of subtract", body: "4 has been taken from x. Add 4 to both sides." },
          { title: "Arithmetic", body: "x = 7 + 4." },
        ],
        explanation: "x = 7 + 4 = 11. Check: 11 − 4 = 7.",
      },
      {
        id: "lin-mul",
        prompt: "Solve 5x = 35.",
        formula: "5x = 35",
        answer: 7,
        tolerance: 0.05,
        unit: "",
        topic: "One-step",
        hints: [
          { title: "Inverse of multiply", body: "x is multiplied by 5. Divide both sides by 5." },
          { title: "Arithmetic", body: "35 ÷ 5 = 7." },
        ],
        explanation: "x = 35 / 5 = 7. Check: 5 × 7 = 35.",
      },
      {
        id: "lin-div",
        prompt: "Solve x / 4 = 6.",
        formula: "\\frac{x}{4} = 6",
        answer: 24,
        tolerance: 0.05,
        unit: "",
        topic: "Fractions",
        hints: [
          { title: "Inverse of divide", body: "x has been divided by 4. Multiply both sides by 4." },
          { title: "Arithmetic", body: "x = 6 × 4." },
        ],
        explanation: "x = 6 × 4 = 24. Check: 24 / 4 = 6.",
      },
      {
        id: "lin-two-step",
        prompt: "Solve 2x + 5 = 17.",
        formula: "2x + 5 = 17",
        answer: 6,
        tolerance: 0.05,
        unit: "",
        topic: "Two-step",
        hints: [
          { title: "Last operation first", body: "Subtract 5 from both sides before touching the 2." },
          { title: "Then divide", body: "2x = 12, so x = 12 / 2." },
        ],
        explanation: "2x = 12, x = 6. Check: 2(6) + 5 = 17.",
      },
      {
        id: "lin-brackets",
        prompt: "Solve 3(x − 1) = 12.",
        formula: "3(x-1) = 12",
        answer: 5,
        tolerance: 0.05,
        unit: "",
        topic: "Brackets",
        hints: [
          { title: "Unwrap", body: "Divide both sides by 3, or expand to 3x − 3 = 12." },
          { title: "Finish", body: "x − 1 = 4, so x = 5." },
        ],
        explanation: "x − 1 = 4, x = 5. Check: 3(5 − 1) = 3 × 4 = 12.",
      },
      {
        id: "lin-both-sides",
        prompt: "Solve 4x + 2 = 2x + 10.",
        formula: "4x + 2 = 2x + 10",
        answer: 4,
        tolerance: 0.05,
        unit: "",
        topic: "Both sides",
        hints: [
          { title: "Collect bags", body: "Subtract 2x from both sides so x remains only on the left." },
          { title: "Then numbers", body: "2x + 2 = 10, so 2x = 8, x = 4." },
        ],
        explanation: "2x + 2 = 10, 2x = 8, x = 4. Check: left 16 + 2 = 18; right 8 + 10 = 18.",
      },
      {
        id: "lin-negative",
        prompt: "Solve −2x = 10.",
        formula: "-2x = 10",
        answer: -5,
        tolerance: 0.05,
        unit: "",
        topic: "Negatives",
        hints: [
          { title: "Divide by the coefficient", body: "The coefficient of x is −2, not 2. Divide both sides by −2." },
          { title: "Signs", body: "A positive divided by a negative is negative: 10 / (−2) = −5." },
        ],
        explanation: "x = 10 / (−2) = −5. Check: −2 × (−5) = 10.",
      },
      {
        id: "lin-fraction-two",
        prompt: "Solve (x + 4) / 2 = 5.",
        formula: "\\frac{x+4}{2} = 5",
        answer: 6,
        tolerance: 0.05,
        unit: "",
        topic: "Fractions",
        hints: [
          { title: "Clear the denominator", body: "Multiply both sides by 2 first: x + 4 = 10." },
          { title: "Then subtract", body: "x = 10 − 4." },
        ],
        explanation: "x + 4 = 10, x = 6. Check: (6 + 4) / 2 = 5.",
      },
      {
        id: "lin-physics",
        prompt: "Using F = m a, find a in m/s² when F = 12 N and m = 3.0 kg.",
        formula: "F = m a",
        answer: 4,
        tolerance: 0.05,
        unit: "m/s²",
        topic: "Physics formulae",
        hints: [
          { title: "Isolate a", body: "Divide both sides by m: a = F / m." },
          { title: "Substitute", body: "a = 12 / 3.0. The unit N/kg is m/s²." },
        ],
        explanation: "a = F/m = 12 N / 3.0 kg = 4.0 m/s². Check: 3.0 × 4.0 = 12 N.",
      },
    ],
    quiz: [
      {
        id: "q-equals",
        kind: "multiple-choice",
        prompt: "What does the equals sign in an equation mean?",
        options: [
          { id: "a", label: "Work out the left-hand side, then stop" },
          { id: "b", label: "The two sides have the same value" },
          { id: "c", label: "The left-hand side is always larger" },
          { id: "d", label: "Ignore the right-hand side" },
        ],
        answer: "b",
        topic: "Meaning of equals",
        explanation: "Equals asserts that both sides are the same number. That is why legal steps change both sides together.",
      },
      {
        id: "q-inverse",
        kind: "multiple-choice",
        prompt: "What is the inverse operation of adding 6?",
        options: [
          { id: "a", label: "Add 6 again" },
          { id: "b", label: "Multiply by 6" },
          { id: "c", label: "Subtract 6" },
          { id: "d", label: "Divide by 6" },
        ],
        answer: "c",
        topic: "Inverse operations",
        explanation: "Addition and subtraction undo each other. To undo +6, subtract 6 from both sides.",
      },
      {
        id: "q-one-step",
        prompt: "Solve x − 8 = 3.",
        formula: "x - 8 = 3",
        answer: 11,
        tolerance: 0.05,
        unit: "",
        topic: "One-step",
        explanation: "Add 8 to both sides: x = 11. Check: 11 − 8 = 3.",
      },
      {
        id: "q-two-step",
        prompt: "Solve 3x + 1 = 16.",
        formula: "3x + 1 = 16",
        answer: 5,
        tolerance: 0.05,
        unit: "",
        topic: "Two-step",
        explanation: "3x = 15, x = 5. Check: 3(5) + 1 = 16.",
      },
      {
        id: "q-brackets",
        prompt: "Solve 2(x + 3) = 14.",
        formula: "2(x+3) = 14",
        answer: 4,
        tolerance: 0.05,
        unit: "",
        topic: "Brackets",
        explanation: "x + 3 = 7, x = 4. Check: 2(4 + 3) = 14.",
      },
      {
        id: "q-both",
        prompt: "Solve 6x = 2x + 20.",
        formula: "6x = 2x + 20",
        answer: 5,
        tolerance: 0.05,
        unit: "",
        topic: "Both sides",
        explanation: "4x = 20, x = 5. Check: left 30; right 10 + 20 = 30.",
      },
      {
        id: "q-frac",
        prompt: "Solve x/3 + 2 = 6.",
        formula: "\\frac{x}{3} + 2 = 6",
        answer: 12,
        tolerance: 0.05,
        unit: "",
        topic: "Fractions",
        explanation: "x/3 = 4, x = 12. Check: 12/3 + 2 = 6.",
      },
      {
        id: "q-neg",
        prompt: "Solve −4x + 6 = 18.",
        formula: "-4x + 6 = 18",
        answer: -3,
        tolerance: 0.05,
        unit: "",
        topic: "Negatives",
        explanation: "−4x = 12, x = 12/(−4) = −3. Check: −4(−3) + 6 = 12 + 6 = 18.",
      },
      {
        id: "q-check",
        kind: "multiple-choice",
        prompt: "Which substitution shows that x = 4 solves 2x + 1 = 9?",
        options: [
          { id: "a", label: "2 + 1 = 9" },
          { id: "b", label: "2(4) + 1 = 8 + 1 = 9" },
          { id: "c", label: "2(4) + 1 = 9 + 1 = 10" },
          { id: "d", label: "x = 9 − 2" },
        ],
        answer: "b",
        topic: "Checking",
        explanation: "Replace x by 4 in the left-hand side only, then compare with 9. 8 + 1 matches.",
      },
      {
        id: "q-physics",
        prompt: "Using v = d / t, find v in m/s when d = 100 m and t = 5.0 s.",
        formula: "v = \\frac{d}{t}",
        answer: 20,
        tolerance: 0.1,
        unit: "m/s",
        topic: "Physics formulae",
        explanation: "v = 100 / 5.0 = 20 m/s. The division is already the solved form for v.",
      },
    ],
    summary: [
      "An equation asserts that two sides are equal; legal steps change both sides the same way.",
      "Undo operations in reverse order: peel additions and subtractions, then multiplications and divisions.",
      "Expand or divide to clear brackets; collect x terms when the unknown appears twice.",
      "Negative coefficients and fractions are ordinary inverses with extra care over signs.",
      "Always substitute the answer back, and use the same moves to isolate a letter in a physics formula.",
    ],
  },
};
