import type { Lesson } from "@/lib/types";

export const algebraQuadraticLesson: Lesson = {
  id: "quadratic-equations",
  moduleId: "algebra-foundations",
  title: "Quadratic Equations",
  summary:
    "Recognise x², read a parabola, and solve ax² + bx + c = 0 by factorising, square roots, completing the square, and the quadratic formula — then check, count roots, and apply the same algebra to projectile height.",
  durationMinutes: 70,
  objectives: [
    "Explain what makes an equation quadratic, and why a must not be zero.",
    "Square positive and negative numbers, and interpret x² on a graph.",
    "Read roots, vertex and axis of symmetry from y = ax² + bx + c.",
    "Solve by factorisation, by square roots, and by completing the square.",
    "Use the quadratic formula and the discriminant to find how many real roots exist.",
    "Check candidate roots by substitution, and model a simple projectile with a quadratic in time.",
  ],
  status: "published",
  content: {
    sections: [
      {
        heading: "What makes an equation quadratic",
        paragraphs: [
          "A linear equation involves x but never x multiplied by itself: 2x + 3 = 11. A quadratic equation has an x² term. The standard written form is ax² + bx + c = 0, where a, b and c are known numbers and a is not zero.",
          "The letter a is the coefficient of x², b of x, and c of the constant term (the term with no x). In 3x² − 5x + 2 = 0 we have a = 3, b = −5 and c = 2. Missing terms still count: x² − 9 = 0 is quadratic with a = 1, b = 0 and c = −9. 4x² = 0 is quadratic with b = 0 and c = 0.",
          "If a really is zero, the x² term vanishes and you are left with bx + c = 0, which is linear (or even simpler if b is zero too). The methods in this lesson, including the quadratic formula, assume a ≠ 0. The parabola explorer later lets you drag a through zero so you can see the curve flatten into a straight line.",
          "A quadratic equation has three possible real-root counts, and you should expect all three: two distinct real solutions, one repeated real solution (the same number counted twice, where the parabola just kisses the axis), or no real solutions at all. Linear equations in the previous lesson had exactly one solution. The extra freedom comes from x²: both 3 and −3 square to 9, so x² = 9 has two honest answers, while x² = −9 has none.",
        ],
        equations: [
          "ax^{2} + bx + c = 0 \\quad (a \\neq 0)",
          "3x^{2} - 5x + 2 = 0",
          "x^{2} - 9 = 0",
        ],
        hints: [
          {
            title: "Spot the highest power",
            body: "Look for the highest power of the unknown that actually appears. Power 1 is linear. Power 2 is quadratic. Power 3 would be cubic — not this lesson.",
          },
        ],
      },
      {
        heading: "Squaring numbers and understanding x²",
        paragraphs: [
          "Squaring a number means multiplying it by itself. 5² = 5 × 5 = 25. (−5)² = (−5) × (−5) = 25 as well, because a negative times a negative is positive. The square of every real number is zero or positive. You cannot square a real number and get −4.",
          "The notation x² is not “x times 2.” It is x × x. If x = 3 then x² = 9; if x = −3 then x² = 9; if x = 0 then x² = 0. That last fact matters: the graph of y = x² touches the origin and never goes below the x-axis.",
          "Because 4² and (−4)² are the same, the equation x² = 16 has two real solutions: x = 4 and x = −4. We write x = ±4, which is short for “plus or minus.” The square-root button on a calculator usually returns the non-negative root only. When you solve an equation you must restore the ± yourself unless a physical story discards one sign (a negative time of flight, for example).",
          "Powers stay attached to one factor: (−3)² is 9, but −3² is −9 because the minus applies after the square unless brackets say otherwise. Write brackets whenever the thing being squared might be negative.",
        ],
        equations: [
          "5^{2} = 25, \\quad (-5)^{2} = 25",
          "x^{2} = 16 \\implies x = \\pm 4",
          "(-3)^{2} = 9, \\quad -3^{2} = -9",
        ],
      },
      {
        heading: "Parabolas and how quadratic equations relate to graphs",
        paragraphs: [
          "The graph of y = ax² + bx + c is a parabola: a smooth U-shape. If a is positive the bowl opens upward (a valley). If a is negative the bowl opens downward (a hill). Larger |a| makes a skinnier bowl; smaller |a| makes a wider one.",
          "The solutions of ax² + bx + c = 0 are the x-values where the curve meets the x-axis, because that is where y = 0. Those meeting points are called roots or zeros. A parabola may cross twice, kiss the axis once at its turning point, or miss the axis entirely.",
          "The turning point is the vertex. Its x-coordinate is always x = −b / (2a). That vertical line is the axis of symmetry: the left half of the curve is a mirror of the right half. The y-coordinate of the vertex is the maximum height if a < 0, or the minimum height if a > 0.",
          "Drag a, b and c below. Watch the gold dots (roots) appear, merge, or vanish. Watch the blue dashed axis slide when you change b. Set a exactly to 0: the quadratic dies and you are graphing a straight line. The quadratic formula does not apply to that line.",
        ],
        equations: [
          "y = ax^{2} + bx + c",
          "x_{\\text{vertex}} = -\\frac{b}{2a}",
        ],
        demo: "parabola-explorer",
      },
      {
        heading: "Solving by factorisation",
        paragraphs: [
          "If two numbers multiply to zero, at least one of them is zero. That is the zero-product property: if PQ = 0 then P = 0 or Q = 0 (or both). Factorisation turns a quadratic into a product of two linear brackets so we can use that property.",
          "For x² − 5x + 6 = 0 we look for two numbers that multiply to 6 and add to −5: they are −2 and −3. So (x − 2)(x − 3) = 0. Then x − 2 = 0 or x − 3 = 0, giving x = 2 and x = 3.",
          "When the leading coefficient is not 1, the hunt is a little longer. For 2x² + x − 6 = 0, numbers that multiply to 2 × (−6) = −12 and add to 1 are 4 and −3. Split the middle term: 2x² + 4x − 3x − 6 = 2x(x + 2) − 3(x + 2) = (2x − 3)(x + 2). Roots: x = 3/2 and x = −2.",
          "Factorisation is fast when the numbers are friendly integers. It is not a duty: if the brackets refuse to appear after a fair try, move on to completing the square or the formula. Both always work for real coefficients.",
        ],
        equations: [
          "(x-2)(x-3) = 0 \\implies x = 2 \\text{ or } x = 3",
          "(2x-3)(x+2) = 0 \\implies x = \\tfrac{3}{2} \\text{ or } x = -2",
        ],
      },
      {
        heading: "Solving by square roots",
        paragraphs: [
          "When there is no x term (b = 0), the equation is a square set equal to a number. Isolate the square, then take square roots of both sides and include ±.",
          "From x² − 9 = 0 we get x² = 9, so x = ±3. From 2x² = 18 we get x² = 9, again x = ±3. From (x − 1)² = 16 we get x − 1 = ±4, so x = 5 or x = −3.",
          "If the isolated square equals a negative number, there are no real solutions. x² = −4 has none, because no real square is negative. (Complex numbers exist later; this course stays on the real line for now.)",
          "If the isolated square equals zero, there is exactly one real solution (a repeated root). (x + 4)² = 0 gives x = −4 only. On the graph the vertex sits on the x-axis.",
        ],
        equations: [
          "x^{2} = 9 \\implies x = \\pm 3",
          "(x-1)^{2} = 16 \\implies x = 5 \\text{ or } x = -3",
        ],
      },
      {
        heading: "Completing the square",
        paragraphs: [
          "Completing the square rewrites ax² + bx + c as a squared bracket plus a leftover constant. That puts the equation into square-root form even when a middle x term is present.",
          "The key identity is (x + p)² = x² + 2px + p². So to complete x² + 6x, notice that 6 is twice 3, and 3² = 9. Add and subtract 9: x² + 6x = (x + 3)² − 9.",
          "Worked on an equation: x² + 6x + 5 = 0. Subtract 5: x² + 6x = −5. Half of the coefficient of x is 3; square it to get 9. Add 9 to both sides so the left becomes a perfect square: x² + 6x + 9 = 4, which is (x + 3)² = 4. Then x + 3 = 2 or x + 3 = −2, so x = −1 or x = −5.",
          "If a is not 1, factor a out of the x terms first, complete the square inside, then expand or divide through. Completing the square also produces the vertex form y = a(x − h)² + k, where (h, k) is the vertex — the same point the explorer plots.",
        ],
        equations: [
          "x^{2} + 6x = (x+3)^{2} - 9",
          "x^{2} + 6x + 5 = 0 \\implies (x+3)^{2} = 4",
        ],
      },
      {
        heading: "The quadratic formula",
        paragraphs: [
          "Completing the square on the general equation ax² + bx + c = 0, with a ≠ 0, produces a formula you can memorise. Divide through by a, move the constant, add (b/2a)² to both sides, then take square roots. The leftover under the square root is D = b² − 4ac, the discriminant.",
          "The working is: x² + (b/a)x = −c/a, then (x + b/(2a))² = (b² − 4ac)/(4a²), then x + b/(2a) = ±√D / (2a), which rearranges to x = (−b ± √D) / (2a). Use this whenever a ≠ 0. If a = 0 the division by 2a is illegal.",
          "Every quadratic in this lesson is solved by substituting a, b and c, computing D, and simplifying. If D is a perfect square the roots are tidy. If not, leave them in surd form or round only at the end. If D is negative, stop: there are no real roots to report.",
          "Write the signs of b and of 4ac slowly. The most common formula error is dropping the minus in −b when b is already negative: −(−3) is +3.",
        ],
        equations: [
          "x^{2} + \\frac{b}{a}x = -\\frac{c}{a}",
          "\\left(x + \\frac{b}{2a}\\right)^{2} = \\frac{b^{2}-4ac}{4a^{2}}",
          "x = \\frac{-b \\pm \\sqrt{b^{2}-4ac}}{2a}",
          "D = b^{2} - 4ac",
        ],
      },
      {
        heading: "The discriminant and the number of real roots",
        paragraphs: [
          "The discriminant D = b² − 4ac is the number under the square root. It decides how many real roots exist before you bother finding them. Learn the three cases as a set: they are the whole story for real numbers.",
          "D > 0: two distinct real roots. The parabola crosses the x-axis at two different places. D = 0: one repeated real root. Both formula branches give the same number, x = −b/(2a), and the parabola touches the axis once at the vertex — not two different solutions. D < 0: no real roots. The parabola misses the x-axis, and you must not take √D on the real number line.",
          "Example: x² − 4x + 3 has D = 16 − 12 = 4 > 0, two distinct roots 1 and 3. x² + 4x + 4 has D = 16 − 16 = 0, one repeated root x = −2. x² + x + 1 has D = 1 − 4 = −3 < 0, no real roots.",
          "The sign of a does not change the count of roots; it only flips the bowl. A hill that stays above the axis (a < 0 and D < 0) and a valley that stays above the axis (a > 0 and D < 0) both have no real roots. Use the explorer buttons “Two real roots”, “One repeated root” and “No real roots” to see each case.",
        ],
        equations: [
          "D > 0:\\ 2 \\text{ real roots}",
          "D = 0:\\ 1 \\text{ real root}",
          "D < 0:\\ 0 \\text{ real roots}",
        ],
      },
      {
        heading: "Checking solutions by substitution",
        paragraphs: [
          "A root is genuine only if it makes the original left-hand side equal the right-hand side. Substitute each candidate separately. For x² − 5x + 6 = 0 and x = 2: 4 − 10 + 6 = 0. For x = 3: 9 − 15 + 6 = 0. Both work. For a random guess x = 1: 1 − 5 + 6 = 2 ≠ 0, so 1 is not a root.",
          "Checking also catches lost minus signs and dropped factors of 2a. If the formula produced 2 and −0.5, plug both back. If only one works, the arithmetic on the other failed; do not invent a story that “quadratics sometimes have fake roots.” Real roots that satisfy the equation always work when substituted.",
          "If you discarded a negative time in a physics problem, still check the kept root in the original height equation. The discarded root often corresponds to an earlier moment the model says the projectile was at ground level — mathematically true, physically before launch.",
        ],
        equations: [
          "x=2:\\quad 2^{2}-5(2)+6=0",
          "x=3:\\quad 3^{2}-5(3)+6=0",
        ],
      },
      {
        heading: "Projectile motion: height is a quadratic in time",
        paragraphs: [
          "Near Earth, if we take upward as positive and a constant gravitational acceleration g = 9.81 m/s² downward, the vertical position of a projectile is y(t) = y₀ + u t − ½ g t². That is a quadratic in t with a = −½g (negative, so a hill), b = u and c = y₀.",
          "Maximum height occurs at the vertex, when vertical velocity has fallen to zero: t_peak = u / g if u > 0 (thrown upward). If you drop the object, u ≤ 0 and the peak is at t = 0 — you are already at the highest point.",
          "The projectile meets the ground when y(t) = 0. Solve −½ g t² + u t + y₀ = 0. One algebraic root may be negative (before launch). Keep the first t ≥ 0. For a drop from rest, u = 0 and t = √(2 y₀ / g). If y₀ = 0 and u ≤ 0 there is no flight: the object is already on the ground.",
          "The demonstration uses metres and seconds with g = 9.81 m/s². The cyan curve is height against time, not a camera shot of a sideways arc, and it is cut off at the ground. The mathematical parabola would continue into y < 0; a real stone cannot. Real thrown balls also move horizontally; isolating the vertical quadratic is how physicists find hang time and peak height.",
        ],
        equations: [
          "y = y_{0} + ut - \\tfrac{1}{2}gt^{2}",
          "t_{\\text{peak}} = \\frac{u}{g}\\quad (u>0)",
        ],
        demo: "projectile-motion",
      },
      {
        heading: "Common mistakes",
        paragraphs: [
          "These slips appear the first time someone meets x². Catch them on paper before they become habits.",
        ],
        mistakes: [
          {
            mistake: "Treating x² as 2x, so x² = 9 becomes 2x = 9.",
            correction: "x² means x multiplied by x. From x² = 9 take square roots: x = ±3.",
          },
          {
            mistake: "Writing √16 = ±4 on a calculator line, then also writing ± again.",
            correction: "The principal square root √16 is 4. The equation x² = 16 has two solutions x = ±4.",
          },
          {
            mistake: "Forgetting ± after taking square roots of both sides.",
            correction: "Every positive number has two real square roots. Include both unless a physical constraint rejects one.",
          },
          {
            mistake: "Using the quadratic formula when a = 0.",
            correction: "If a = 0 the equation is not quadratic. Solve the remaining linear equation, or notice that 0 = c is either always true or never true.",
          },
          {
            mistake: "Dropping the sign of b in −b, especially when b is already negative.",
            correction: "If b = −3 then −b = 3. Compute −b and 2a as separate numbers before dividing.",
          },
          {
            mistake: "Reporting two times of flight without checking which are physically possible.",
            correction: "Keep t ≥ 0 after launch. Substitute the kept time back into y(t) and confirm y = 0.",
          },
        ],
      },
    ],
    examples: [
      {
        title: "Recognising a quadratic",
        setup: "Classify 5x − 2 = 0, x² − 4 = 0 and 2x³ + x = 1.",
        steps: [
          {
            text: "5x − 2 = 0 has highest power 1, so it is linear. One solution: x = 2/5.",
          },
          {
            text: "x² − 4 = 0 has an x² term and no higher power. It is quadratic, with a = 1, b = 0, c = −4.",
            latex: "x^{2} - 4 = 0",
          },
          {
            text: "2x³ + x = 1 contains x cubed, so it is cubic, not quadratic.",
          },
        ],
        result: "Only x² − 4 = 0 is quadratic.",
        resultLatex: "x^{2}-4=0",
      },
      {
        title: "Squaring positives and negatives",
        setup: "Evaluate 6², (−6)² and −6², then solve x² = 36.",
        steps: [
          {
            text: "6² = 36 and (−6)² = 36. The square does not care about the sign of the number being squared.",
            latex: "6^{2} = (-6)^{2} = 36",
          },
          {
            text: "Without brackets, −6² means −(6²) = −36.",
          },
          {
            text: "From x² = 36, x = 6 or x = −6.",
            latex: "x = \\pm 6",
          },
        ],
        result: "x = 6 and x = −6 both square to 36.",
        resultLatex: "x = \\pm 6",
      },
      {
        title: "Reading a parabola",
        setup: "For y = x² − 4x + 3, find the axis of symmetry, the vertex, and the roots.",
        steps: [
          {
            text: "Here a = 1, b = −4, c = 3. The axis is x = −b/(2a) = 4/2 = 2.",
            latex: "x = -\\frac{b}{2a} = 2",
          },
          {
            text: "The vertex y-value is 2² − 4(2) + 3 = −1, so the vertex is (2, −1).",
          },
          {
            text: "Factor: (x − 1)(x − 3) = 0, so the curve crosses at x = 1 and x = 3, symmetric about x = 2.",
            latex: "(x-1)(x-3)=0",
          },
        ],
        result: "Axis x = 2, vertex (2, −1), roots 1 and 3.",
        resultLatex: "x=1,\\ x=3",
      },
      {
        title: "Factorisation with a = 1",
        setup: "Solve x² − 5x + 6 = 0 by factorising.",
        steps: [
          {
            text: "Find two numbers that multiply to 6 and add to −5: −2 and −3.",
          },
          {
            text: "Write the product of brackets and set it to zero.",
            latex: "(x-2)(x-3)=0",
          },
          {
            text: "Zero-product property: x = 2 or x = 3.",
          },
          {
            text: "Check: 4 − 10 + 6 = 0 and 9 − 15 + 6 = 0.",
          },
        ],
        result: "x = 2 and x = 3.",
        resultLatex: "x=2 \\text{ or } x=3",
      },
      {
        title: "Factorisation with a ≠ 1",
        setup: "Solve 2x² + x − 6 = 0 by factorising.",
        steps: [
          {
            text: "Numbers multiplying to 2 × (−6) = −12 and adding to 1 are 4 and −3.",
          },
          {
            text: "Split the middle term and factor by grouping.",
            latex: "2x^{2}+4x-3x-6=(2x-3)(x+2)",
          },
          {
            text: "Set each factor to zero: 2x − 3 = 0 or x + 2 = 0.",
            latex: "x=\\tfrac{3}{2}\\quad\\text{or}\\quad x=-2",
          },
        ],
        result: "x = 3/2 and x = −2.",
        resultLatex: "x=\\tfrac{3}{2}\\text{ or }x=-2",
      },
      {
        title: "Square roots both sides",
        setup: "Solve (x + 1)² = 9.",
        steps: [
          {
            text: "Take square roots of both sides and include ±.",
            latex: "x+1 = \\pm 3",
          },
          {
            text: "First branch: x + 1 = 3 so x = 2.",
          },
          {
            text: "Second branch: x + 1 = −3 so x = −4.",
          },
          {
            text: "Check: (2 + 1)² = 9 and (−4 + 1)² = 9.",
          },
        ],
        result: "x = 2 and x = −4.",
        resultLatex: "x=2\\text{ or }x=-4",
      },
      {
        title: "Completing the square",
        setup: "Solve x² + 6x + 5 = 0 by completing the square.",
        steps: [
          {
            text: "Keep the x terms on the left. Subtract 5 from both sides.",
            latex: "x^{2} + 6x = -5",
          },
          {
            text: "Take half of the coefficient of x: half of 6 is 3. Square that number: 3² = 9.",
          },
          {
            text: "Add 9 to both sides so the left-hand side becomes a perfect square.",
            latex: "x^{2} + 6x + 9 = -5 + 9",
          },
          {
            text: "Rewrite the left as a square and simplify the right.",
            latex: "(x+3)^{2} = 4",
          },
          {
            text: "Take square roots of both sides, including both signs.",
            latex: "x+3 = \\pm 2",
          },
          {
            text: "First branch: x + 3 = 2, so x = −1. Second branch: x + 3 = −2, so x = −5.",
            latex: "x=-1\\text{ or }x=-5",
          },
          {
            text: "Check: (−1)² + 6(−1) + 5 = 1 − 6 + 5 = 0, and (−5)² + 6(−5) + 5 = 25 − 30 + 5 = 0.",
          },
        ],
        result: "x = −1 and x = −5.",
        resultLatex: "x=-1\\text{ or }x=-5",
      },
      {
        title: "Quadratic formula",
        setup: "Solve 2x² − 3x − 2 = 0 using the quadratic formula.",
        steps: [
          {
            text: "Write the formula, which requires a ≠ 0.",
            latex: "x = \\frac{-b \\pm \\sqrt{b^{2}-4ac}}{2a}",
          },
          {
            text: "Read the coefficients: a = 2, b = −3, c = −2. Then −b = −(−3) = 3 and 2a = 4.",
          },
          {
            text: "Compute the discriminant term by term: b² = (−3)² = 9, and 4ac = 4(2)(−2) = −16, so D = 9 − (−16) = 25.",
            latex: "D = b^{2}-4ac = 25",
          },
          {
            text: "D > 0, so there will be two distinct real roots. √D = 5.",
          },
          {
            text: "Substitute into the formula.",
            latex: "x = \\frac{3 \\pm 5}{4}",
          },
          {
            text: "Plus branch: (3 + 5)/4 = 8/4 = 2. Minus branch: (3 − 5)/4 = (−2)/4 = −1/2.",
            latex: "x=2\\text{ or }x=-\\tfrac{1}{2}",
          },
          {
            text: "Check: 2(2)² − 3(2) − 2 = 8 − 6 − 2 = 0, and 2(1/4) − 3(−1/2) − 2 = 1/2 + 3/2 − 2 = 0.",
          },
        ],
        result: "x = 2 and x = −1/2.",
        resultLatex: "x=2\\text{ or }x=-\\tfrac{1}{2}",
      },
      {
        title: "Discriminant and a substitution check",
        setup: "How many real roots does x² + 2x + 5 = 0 have? Confirm that x = 1 is not a root of x² − 5x + 6 = 0.",
        steps: [
          {
            text: "D = 4 − 20 = −16, which is negative, so there are no real roots.",
            latex: "D=-16",
          },
          {
            text: "For the second equation, substitute x = 1: 1 − 5 + 6 = 2, which is not 0.",
          },
          {
            text: "The genuine roots of x² − 5x + 6 = 0 are 2 and 3, already checked in an earlier example.",
          },
        ],
        result: "Zero real roots for x² + 2x + 5 = 0; x = 1 fails the substitution check.",
        resultLatex: "D<0",
      },
      {
        title: "Projectile from rest",
        setup: "A stone is dropped from rest (u = 0) from y₀ = 19.62 m. Take g = 9.81 m/s². When does it meet the ground, and what is the greatest height?",
        steps: [
          {
            text: "Height: y = 19.62 − ½(9.81)t² = 19.62 − 4.905 t².",
            latex: "y = 19.62 - 4.905 t^{2}",
          },
          {
            text: "Ground: y = 0 ⇒ t² = 19.62 / 4.905 = 4 ⇒ t = 2 s (keep the positive time).",
          },
          {
            text: "Because u = 0 the stone is not thrown up, so the maximum height is the starting height 19.62 m at t = 0.",
          },
          {
            text: "Check: y(2) = 19.62 − 4.905 × 4 = 19.62 − 19.62 = 0.",
          },
        ],
        result: "Lands at t = 2.0 s. Peak height is 19.62 m at release.",
        resultLatex: "t=2\\,\\mathrm{s}",
      },
    ],
    practice: [
      {
        id: "qd-square",
        prompt: "Evaluate 8².",
        formula: "8^{2}",
        answer: 64,
        tolerance: 0.05,
        unit: "",
        topic: "Squaring",
        hints: [
          { title: "Meaning of the superscript", body: "8² means 8 × 8, not 8 × 2." },
          { title: "Arithmetic", body: "8 × 8 = 64." },
        ],
        explanation: "8² = 64. Squaring is multiplying a number by itself.",
      },
      {
        id: "qd-neg-square",
        prompt: "Evaluate (−7)². Include the brackets as written.",
        formula: "(-7)^{2}",
        answer: 49,
        tolerance: 0.05,
        unit: "",
        topic: "Squaring",
        hints: [
          { title: "Sign rule", body: "A negative times a negative is positive." },
          { title: "Arithmetic", body: "(−7) × (−7) = 49. This is not −49." },
        ],
        explanation: "(−7)² = 49. Contrast −7² = −49, where the minus is outside the square.",
      },
      {
        id: "qd-coeff-a",
        prompt: "In 4x² − 7x + 2 = 0, what is the coefficient a of x²?",
        formula: "4x^{2}-7x+2=0",
        answer: 4,
        tolerance: 0.05,
        unit: "",
        topic: "Quadratic form",
        hints: [
          { title: "Standard form", body: "Write ax² + bx + c = 0 and match coefficients." },
          { title: "Read a", body: "The number in front of x² is 4." },
        ],
        explanation: "a = 4, b = −7, c = 2. The equation is quadratic because a ≠ 0.",
      },
      {
        id: "qd-both-roots",
        prompt:
          "Solve x² − 5x + 6 = 0. Enter both real roots, one in each box (either order).",
        formula: "x^{2}-5x+6=0",
        answer: 2,
        answers: [2, 3],
        tolerance: 0.05,
        unit: "",
        topic: "Factorisation",
        hints: [
          {
            title: "Factor",
            body: "Find numbers that multiply to 6 and add to −5: −2 and −3, giving (x − 2)(x − 3) = 0.",
          },
          {
            title: "Both solutions",
            body: "Each bracket can be zero, so x = 2 and x = 3. You must enter both numbers; one root alone is not a complete solution.",
          },
        ],
        explanation:
          "(x − 2)(x − 3) = 0, so both x = 2 and x = 3 are solutions. A quadratic with D > 0 has two distinct real roots; listing only one of them is incomplete.",
      },
      {
        id: "qd-product",
        prompt: "For x² − 5x + 6 = 0, what is the product of the two roots?",
        formula: "x^{2}-5x+6=0",
        answer: 6,
        tolerance: 0.05,
        unit: "",
        topic: "Factorisation",
        hints: [
          { title: "Roots you know", body: "The roots are 2 and 3." },
          { title: "Multiply", body: "2 × 3 = 6, which also equals c/a for a monic quadratic." },
        ],
        explanation: "Product of roots = 2 × 3 = 6. In general the product is c/a.",
      },
      {
        id: "qd-pm",
        prompt: "Solve x² = 49. Enter the positive root.",
        formula: "x^{2}=49",
        answer: 7,
        tolerance: 0.05,
        unit: "",
        topic: "Square roots",
        hints: [
          { title: "Two signs", body: "x = ±7 because both 7 and −7 square to 49." },
          { title: "Positive one", body: "The question asks only for the positive root." },
        ],
        explanation: "x = ±7. The positive root is 7. Always restore ± after taking square roots of x².",
      },
      {
        id: "qd-complete",
        prompt:
          "Complete the square for x² + 6x + 5 = 0. After writing (x + 3)² = k, what is k?",
        formula: "(x+3)^{2} = k",
        answer: 4,
        tolerance: 0.05,
        unit: "",
        topic: "Completing the square",
        hints: [
          { title: "Move the 5", body: "x² + 6x = −5." },
          { title: "Add 9", body: "Half of 6 is 3, 3² = 9, so (x + 3)² = −5 + 9 = 4." },
        ],
        explanation: "(x + 3)² = 4. Then x + 3 = ±2, recovering x = −1 and x = −5.",
      },
      {
        id: "qd-disc",
        prompt: "Compute the discriminant D = b² − 4ac of x² − 4x + 3 = 0.",
        formula: "D=b^{2}-4ac",
        answer: 4,
        tolerance: 0.05,
        unit: "",
        topic: "Discriminant",
        hints: [
          { title: "Coefficients", body: "a = 1, b = −4, c = 3." },
          { title: "Arithmetic", body: "D = 16 − 12 = 4." },
        ],
        explanation: "D = 16 − 12 = 4 > 0, so there are two distinct real roots (1 and 3).",
      },
      {
        id: "qd-count",
        prompt: "How many real roots does x² + 2x + 5 = 0 have? Enter 0, 1 or 2.",
        formula: "x^{2}+2x+5=0",
        answer: 0,
        tolerance: 0.05,
        unit: "",
        topic: "Discriminant",
        hints: [
          { title: "Compute D", body: "D = 4 − 20 = −16." },
          { title: "Interpret", body: "A negative discriminant means no real roots." },
        ],
        explanation:
          "D = −16 < 0, so there are 0 real roots. Compare: D > 0 gives two distinct real roots, D = 0 gives one repeated real root, and D < 0 gives none.",
      },
      {
        id: "qd-formula-pos",
        prompt: "Solve 2x² − 3x − 2 = 0. Enter the positive root.",
        formula: "2x^{2}-3x-2=0",
        answer: 2,
        tolerance: 0.05,
        unit: "",
        topic: "Quadratic formula",
        hints: [
          { title: "Formula", body: "a = 2, b = −3, c = −2. D = 9 + 16 = 25." },
          { title: "Branches", body: "x = [3 ± 5]/4, giving 2 and −1/2. Keep the positive value." },
        ],
        explanation: "x = 2 or x = −1/2. The positive root is 2. Check: 2(4) − 3(2) − 2 = 0.",
      },
      {
        id: "qd-vertex",
        prompt: "For y = x² − 4x + 3, what is the x-coordinate of the vertex?",
        formula: "x=-\\frac{b}{2a}",
        answer: 2,
        tolerance: 0.05,
        unit: "",
        topic: "Parabolas",
        hints: [
          { title: "Axis formula", body: "x_vertex = −b/(2a) with a = 1, b = −4." },
          { title: "Arithmetic", body: "x = 4/2 = 2. This is also halfway between the roots 1 and 3." },
        ],
        explanation: "The axis of symmetry is x = 2, which is the vertex x-coordinate.",
      },
      {
        id: "qd-flight",
        prompt:
          "A stone is dropped from rest from 19.62 m. Take g = 9.81 m/s². After how many seconds does it reach the ground?",
        formula: "y=19.62-\\tfrac{1}{2}(9.81)t^{2}",
        answer: 2,
        tolerance: 0.05,
        unit: "s",
        topic: "Projectile motion",
        hints: [
          { title: "Set y = 0", body: "0 = 19.62 − 4.905 t², so t² = 4." },
          { title: "Positive time", body: "t = 2 s (discard t = −2, which is before release)." },
        ],
        explanation:
          "t = √(2 y₀ / g) = √(39.24 / 9.81) = 2.0 s. Check: 4.905 × 4 = 19.62, so y(2) = 0.",
      },
    ],
    quiz: [
      {
        id: "qq-what",
        kind: "multiple-choice",
        prompt: "Which of these is a quadratic equation in x?",
        options: [
          { id: "a", label: "3x + 1 = 0" },
          { id: "b", label: "x² − 5x + 6 = 0" },
          { id: "c", label: "x³ = 8" },
          { id: "d", label: "2^x = 8" },
        ],
        answer: "b",
        topic: "Quadratic form",
        explanation:
          "A quadratic has highest power 2 on the unknown. x² − 5x + 6 = 0 matches ax² + bx + c = 0 with a ≠ 0.",
      },
      {
        id: "qq-a-zero",
        kind: "multiple-choice",
        prompt: "What happens if a = 0 in ax² + bx + c = 0?",
        options: [
          { id: "a", label: "There are always two real roots" },
          { id: "b", label: "The quadratic formula still applies unchanged" },
          { id: "c", label: "The equation is no longer quadratic; it becomes linear or constant" },
          { id: "d", label: "The parabola becomes a circle" },
        ],
        answer: "c",
        topic: "Quadratic form",
        explanation:
          "The x² term vanishes. You are left with bx + c = 0 (linear) or a statement about c alone. Divide-by-2a in the formula would be illegal.",
      },
      {
        id: "qq-square",
        prompt: "Evaluate (−5)².",
        formula: "(-5)^{2}",
        answer: 25,
        tolerance: 0.05,
        unit: "",
        topic: "Squaring",
        explanation: "(−5) × (−5) = 25. The square of a negative real number is positive.",
      },
      {
        id: "qq-open",
        kind: "multiple-choice",
        prompt: "If a < 0 in y = ax² + bx + c, the parabola",
        options: [
          { id: "a", label: "opens upward (a valley)" },
          { id: "b", label: "opens downward (a hill)" },
          { id: "c", label: "is a straight line" },
          { id: "d", label: "cannot have a vertex" },
        ],
        answer: "b",
        topic: "Parabolas",
        explanation:
          "Negative a makes a downward hill. Projectile height uses a = −½g < 0, which is why there is a maximum height.",
      },
      {
        id: "qq-factor",
        prompt: "Solve x² − 9x + 20 = 0. Enter the larger root.",
        formula: "x^{2}-9x+20=0",
        answer: 5,
        tolerance: 0.05,
        unit: "",
        topic: "Factorisation",
        explanation: "(x − 4)(x − 5) = 0, so x = 4 or x = 5. The larger root is 5. Check: 25 − 45 + 20 = 0.",
      },
      {
        id: "qq-sqrt",
        prompt: "Solve (x − 2)² = 16. Enter the smaller root.",
        formula: "(x-2)^{2}=16",
        answer: -2,
        tolerance: 0.05,
        unit: "",
        topic: "Square roots",
        explanation: "x − 2 = ±4, so x = 6 or x = −2. The smaller root is −2.",
      },
      {
        id: "qq-complete",
        prompt: "Completing the square, x² + 8x = (x + p)² − q. What is p?",
        formula: "x^{2}+8x=(x+p)^{2}-q",
        answer: 4,
        tolerance: 0.05,
        unit: "",
        topic: "Completing the square",
        explanation: "Half of 8 is 4, so p = 4 and q = 16: x² + 8x = (x + 4)² − 16.",
      },
      {
        id: "qq-formula",
        prompt: "Using the quadratic formula, solve x² − x − 6 = 0. Enter the positive root.",
        formula: "x^{2}-x-6=0",
        answer: 3,
        tolerance: 0.05,
        unit: "",
        topic: "Quadratic formula",
        explanation: "D = 1 + 24 = 25, x = [1 ± 5]/2, so x = 3 or x = −2. The positive root is 3.",
      },
      {
        id: "qq-disc",
        kind: "multiple-choice",
        prompt: "If the discriminant of a quadratic is zero, the graph",
        options: [
          { id: "a", label: "crosses the x-axis twice" },
          { id: "b", label: "misses the x-axis" },
          { id: "c", label: "touches the x-axis once, at the vertex" },
          { id: "d", label: "becomes a horizontal line" },
        ],
        answer: "c",
        topic: "Discriminant",
        explanation:
          "D = 0 means a repeated real root at x = −b/(2a), which is the vertex. The parabola is tangent to the axis.",
      },
      {
        id: "qq-check",
        kind: "multiple-choice",
        prompt: "Which substitution shows that x = −1 solves x² − 5x − 6 = 0?",
        options: [
          { id: "a", label: "1 − 5 − 6 = −10" },
          { id: "b", label: "(−1)² − 5(−1) − 6 = 1 + 5 − 6 = 0" },
          { id: "c", label: "−1 − 5 − 6 = −12" },
          { id: "d", label: "x² = 6" },
        ],
        answer: "b",
        topic: "Checking",
        explanation:
          "Replace every x by −1, including the square: 1 + 5 − 6 = 0. Option a squares +1 instead of −1.",
      },
      {
        id: "qq-count",
        prompt: "How many distinct real roots does x² + 6x + 9 = 0 have?",
        formula: "x^{2}+6x+9=0",
        answer: 1,
        tolerance: 0.05,
        unit: "",
        topic: "Discriminant",
        explanation: "D = 36 − 36 = 0, or (x + 3)² = 0, so the only root is x = −3 (repeated, not two distinct roots).",
      },
      {
        id: "qq-physics",
        prompt:
          "A ball is thrown straight up from the ground at 14 m/s. Take g = 9.8 m/s². What is the maximum height in metres?",
        formula: "h=\\frac{u^{2}}{2g}",
        answer: 10,
        tolerance: 0.15,
        unit: "m",
        topic: "Projectile motion",
        explanation:
          "Peak at t = u/g when y₀ = 0: h = u²/(2g) = 196 / 19.6 = 10 m. The quadratic y = 14t − 4.9 t² has vertex 10 m above the ground.",
      },
    ],
    summary: [
      "A quadratic equation has the form ax² + bx + c = 0 with a ≠ 0. If a = 0 the graph is no longer a parabola.",
      "x² is x times x; squares of real numbers are never negative, so x² = k has two, one, or zero real solutions according as k is positive, zero, or negative.",
      "The graph is a parabola. Roots are x-intercepts; the vertex sits on the axis x = −b/(2a).",
      "Solve by factorising when brackets are obvious, by square roots when b = 0 or a square is isolated, by completing the square, or by the quadratic formula.",
      "The discriminant D = b² − 4ac counts real roots: two, one, or none. Always substitute answers back.",
      "Vertical projectile motion is the same quadratic with a = −½g. Keep physically allowed times t ≥ 0.",
    ],
  },
};
