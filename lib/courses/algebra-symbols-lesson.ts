import type { Lesson } from "@/lib/types";

export const algebraSymbolsLesson: Lesson = {
  id: "symbols-and-substitution",
  moduleId: "algebra-foundations",
  title: "Symbols and Substitution",
  summary:
    "Treat letters as named quantities with units. Evaluate expressions, substitute into formulae, and keep signs, powers and units under control.",
  durationMinutes: 50,
  objectives: [
    "Name variables, constants and coefficients in a physics formula.",
    "Evaluate a numerical expression after substituting values, including negatives and powers.",
    "Substitute into a formula only after writing the formula, then attach SI units.",
    "Avoid the common mistakes of dropping brackets, mixing units, and treating juxtaposition as addition.",
  ],
  status: "published",
  content: {
    sections: [
      {
        heading: "Letters stand for quantities",
        paragraphs: [
          "Start with something ordinary. Suppose cinema tickets cost £8 each. If you buy n tickets, the total is 8 × n pounds. The letter n is not a secret code. It is a blank with a name: “however many tickets you buy.” If n = 3 the total is £24. If n = 10 the total is £80. Same sentence, different numbers.",
          "Physics uses the same idea. When we write v for speed we are saying “whatever this speed happens to be, I will call it v.” The letter holds a place for a number, and in physics that number usually comes with a unit such as metres per second.",
          "That is why one formula can describe a bicycle and a spacecraft. The letters do not care which object you chose. They care about the relationship among the quantities: if you go faster for the same time, you cover more ground.",
          "A formula is therefore a reusable sentence. “Distance equals speed multiplied by time” is written d = vt once, then used whenever those three ideas appear together. You fill in the blanks only when you have a specific journey in front of you.",
        ],
        equations: ["d = v t"],
        hints: [
          {
            title: "Why not just use numbers?",
            body: "Numbers describe one situation. Letters describe the pattern that every situation of that type shares. Once the pattern is written, you plug in the numbers for the case in front of you.",
          },
        ],
      },
      {
        heading: "Variables, constants and coefficients",
        paragraphs: [
          "Three words will follow you through the whole course. Learn them with examples, not as slogans.",
          "A variable is a quantity whose value can change. In 8n, n is the variable: 1 ticket, 2 tickets, 40 tickets. In motion, position x and time t are typical variables because a moving object does not stay at one place or one instant.",
          "A constant is a quantity we treat as fixed in the problem we are doing. Ticket price £8 was a constant in the cinema example. Near Earth’s surface we often treat g = 9.81 m/s² as a constant: every object in that problem feels the same gravitational field. Some constants really never change, such as the speed of light c. Others are only constant for this question.",
          "A coefficient is the factor multiplying a variable. In 4t the coefficient of t is 4, meaning “four lots of t.” In (1/2)mv² the 1/2 is just a numerical coefficient — a number sitting in front — and m is also multiplying v². You do not need the history of that 1/2 yet; you only need to see that it multiplies the rest.",
          "When two letters sit next to each other, that is juxtaposition, and it means multiplication. vt means v times t, not “v plus t” and not a two-digit number. If you need addition you must write a plus sign. This single habit prevents a large fraction of early algebra mistakes.",
        ],
        equations: [
          "4t = 4 \\times t",
          "\\tfrac{1}{2} m v^{2} = \\tfrac{1}{2} \\times m \\times v \\times v",
        ],
      },
      {
        heading: "Expressions, substitution and order of operations",
        paragraphs: [
          "An expression is a recipe for a number. 3x + 2 says: take x, multiply by 3, then add 2. You can cook that recipe for any x. An equation is a claim that two recipes give the same result: F = ma says the net force equals mass times acceleration. You evaluate an expression. You solve an equation. This lesson is about evaluation: putting numbers in.",
          "Substitution means replacing a letter by a number (and, in physics, its unit). Write the recipe first. Then put the number where the letter was. Brackets around a negative number stop the sign from wandering: 3x at x = −4 is 3(−4), not 3 − 4.",
          "Then follow one fixed order, the same order you will use for the rest of physics: brackets first, then powers, then multiplication and division from left to right, then addition and subtraction from left to right. If you add before you multiply, 3x + 2 at x = 5 becomes 3(7) = 21, which is the wrong recipe.",
          "Do not mix the jobs. First write the formula with letters. Then substitute. Then calculate. If you start multiplying while some letters still sit in the formula, it is easy to pair the wrong quantities. The live demonstration below is there so you can feel substitution rather than only read about it.",
        ],
        equations: [
          "3x + 2 \\quad \\text{at} \\quad x = 5 \\implies 3(5)+2 = 17",
        ],
        demo: "expression-evaluator",
        hints: [
          {
            title: "Brackets protect signs",
            body: "Substituting x = −4 into 3x should look like 3(−4), which is −12. Writing 3−4 = −1 is a different calculation: you have accidentally added instead of multiplied.",
          },
        ],
      },
      {
        heading: "Negative numbers and powers",
        paragraphs: [
          "A negative sign is a direction, not a stain. Choose “right” as positive. Then v = −6 m/s means six metres per second to the left. The 6 is the size; the minus sign is the direction. Thermometers do the same: −4 °C is four degrees below the zero you chose, not “an impossible temperature.”",
          "Multiplying two negatives gives a positive because you have reversed direction twice: left of left is right again. So (−4) × (−3) = 12, while 2 × (−4) = −8.",
          "A power tells you how many copies to multiply. x² means x times x. It is not 2x. For x = 5, x² = 25 while 2x = 10. When the base is negative, brackets decide the meaning: (−3)² = (−3)×(−3) = 9, but −3² means “minus (three squared)” = −9. The power sticks to 3 first; the lonely minus sign is applied afterwards.",
          "Even powers of a real number are never negative. Square anything on the number line and you land on zero or above. That is why a later formula for kinetic energy, ½mv², cannot come out negative: v² is at least zero, and mass is positive. You will meet that formula in the quiz as a substitution exercise, not as a new physics topic.",
        ],
        equations: [
          "(-3)^{2} = 9, \\qquad -3^{2} = -9",
          "x^{2} \\ge 0 \\quad \\text{for every real } x",
        ],
      },
      {
        heading: "Units travel with the numbers",
        paragraphs: [
          "A physics quantity is not a bare number. The 4 in “4 seconds” and the 4 in “4 kilometres” are the same digit and completely different ideas. Write the unit next to every value you substitute so the formula knows what it is looking at.",
          "When you multiply and divide, units multiply and divide with the numbers. Mass in kilograms times acceleration in metres per second squared produces newtons, because that is how the newton is defined: 1 N = 1 kg·m/s². If the units come out as metres, you have found a length. If they come out as a mash of seconds and kilograms, something in the substitution is wrong.",
          "Never add quantities with different units. 3 m + 2 s is not a length and not a time. You may only add like with like: metres with metres, seconds with seconds.",
          "A reliable habit: convert everything to one SI unit first (metres, not centimetres mixed with metres), write the formula, substitute with units, then calculate. The second demonstration lets you change mass and acceleration and watch F = ma, including the awkward cases a = 0 and a negative.",
        ],
        equations: [
          "F = m a",
          "1\\,\\mathrm{N} = 1\\,\\mathrm{kg\\,m\\,s^{-2}}",
        ],
        demo: "formula-substitution",
      },
      {
        heading: "Common mistakes",
        paragraphs: [
          "The errors below appear in almost every first algebra-for-physics class. Read them now so you can catch them in your own working.",
        ],
        mistakes: [
          {
            mistake: "Treating vt as a two-digit number or as v + t.",
            correction: "Juxtaposition is multiplication. vt = v × t.",
          },
          {
            mistake: "Substituting x = −2 into 3x as 3 − 2.",
            correction: "Write 3(−2) = −6. The operation is multiplication, not subtraction.",
          },
          {
            mistake: "Computing x² at x = −4 as −16.",
            correction: "(−4)² = (−4)×(−4) = 16. The square of a real number is not negative.",
          },
          {
            mistake: "Dropping units, or mixing metres with centimetres inside one formula.",
            correction: "Convert to a single SI unit first, then substitute, then keep the resulting unit.",
          },
          {
            mistake: "Evaluating ½mv² as (½m v)² or as ½m²v.",
            correction: "Only v is squared. Compute v² first, then multiply by m, then by ½.",
          },
        ],
      },
    ],
    examples: [
      {
        title: "Naming the parts of v = u + at",
        setup:
          "You will meet this formula later in motion. You do not need to understand acceleration yet. For now, only practise naming the letters. A later module writes v = u + at. Identify the variables, the implied operation between a and t, and the coefficient of t.",
        steps: [
          {
            text: "v, u, a and t are all variables: they can take different values in different problems. In words they are often called final velocity, initial velocity, acceleration and time. Treat those names as labels, not as extra mathematics.",
          },
          {
            text: "The term at is a product. There is no extra symbol because juxtaposition means multiplication.",
            latex: "a t = a \\times t",
          },
          {
            text: "The coefficient of t is the acceleration a. If a particular problem had a = 3.0 m/s², then at would become 3.0 t with a numerical coefficient.",
          },
        ],
        result: "v and u are velocities; a is the coefficient of t; at is a product, not a sum.",
        resultLatex: "v = u + a t",
      },
      {
        title: "Evaluating a linear expression",
        setup: "Evaluate 3x + 2 when x = 5.",
        steps: [
          {
            text: "Write the expression, then replace x by 5. Brackets make the substitution visible.",
            latex: "3x + 2 = 3(5) + 2",
          },
          {
            text: "Multiply first, then add.",
            latex: "3(5) + 2 = 15 + 2 = 17",
          },
        ],
        result: "The value of the expression is 17. It is a pure number because the original expression carried no unit.",
        resultLatex: "3(5)+2 = 17",
      },
      {
        title: "Distance from a constant speed",
        setup: "A runner moves at a constant v = 12 m/s for t = 4.0 s. Find the distance d from d = vt.",
        steps: [
          {
            text: "Write the formula before touching the numbers.",
            latex: "d = v t",
          },
          {
            text: "Substitute the values with units.",
            latex: "d = (12\\,\\mathrm{m\\,s^{-1}})(4.0\\,\\mathrm{s})",
          },
          {
            text: "Multiply the numbers and cancel seconds.",
            latex: "d = 48\\,\\mathrm{m}",
          },
        ],
        result: "The runner covers 48 m. The unit check (m/s)×s = m confirms that the substitution produced a length.",
        resultLatex: "d = 48\\,\\mathrm{m}",
      },
      {
        title: "A negative substitution",
        setup: "Evaluate 2x when x = −4.",
        steps: [
          {
            text: "Replace x by −4 inside brackets so the sign stays attached to the 4.",
            latex: "2x = 2(-4)",
          },
          {
            text: "Multiplication of a positive by a negative is negative.",
            latex: "2(-4) = -8",
          },
        ],
        result: "The value is −8. Writing 2 − 4 = −2 would have been a different, incorrect operation.",
        resultLatex: "2(-4) = -8",
      },
      {
        title: "Squaring a negative number",
        setup: "Evaluate x² when x = −3, and compare it with −3².",
        steps: [
          {
            text: "x² means x times x. With x = −3 both factors are negative.",
            latex: "x^{2} = (-3)(-3) = 9",
          },
          {
            text: "The expression −3² is not the same: the power applies to 3, then the minus sign is applied.",
            latex: "-3^{2} = -(3 \\times 3) = -9",
          },
        ],
        result: "If a formula contains x², substitute the sign with the number inside the square. (−3)² is 9, not −9.",
        resultLatex: "(-3)^{2} = 9",
      },
      {
        title: "Force from mass and acceleration",
        setup:
          "A cart of mass m = 2.5 kg accelerates at a = 3.0 m/s². Find the net force from F = ma.",
        steps: [
          {
            text: "Write the formula.",
            latex: "F = m a",
          },
          {
            text: "Substitute, keeping units.",
            latex: "F = (2.5\\,\\mathrm{kg})(3.0\\,\\mathrm{m\\,s^{-2}})",
          },
          {
            text: "Multiply. The combination kg·m/s² is the newton.",
            latex: "F = 7.5\\,\\mathrm{N}",
          },
        ],
        result: "The net force is 7.5 N in the direction of the chosen positive acceleration.",
        resultLatex: "F = 7.5\\,\\mathrm{N}",
      },
    ],
    practice: [
      {
        id: "prac-linear",
        prompt: "Evaluate 5x − 3 when x = 4.",
        formula: "5x - 3",
        answer: 17,
        tolerance: 0.05,
        unit: "",
        topic: "Substitution",
        hints: [
          {
            title: "Where to start",
            body: "Copy the expression and replace only the letter x. Leave the 5 and the − 3 where they are.",
          },
          {
            title: "Order of operations",
            body: "You should have 5(4) − 3. Multiply 5 × 4 first, then subtract 3 from that product.",
          },
        ],
        explanation: "5(4) − 3 = 20 − 3 = 17. Multiplication comes before subtraction.",
      },
      {
        id: "prac-two-letters",
        prompt: "Evaluate 2a + b when a = 3 and b = −5.",
        formula: "2a + b",
        answer: 1,
        tolerance: 0.05,
        unit: "",
        topic: "Negative numbers",
        hints: [
          {
            title: "Two substitutions",
            body: "Replace a by 3 and b by −5 at the same time: 2(3) + (−5). Keep the minus glued to the 5.",
          },
          {
            title: "Adding a negative",
            body: "2 × 3 = 6, then 6 + (−5) is the same as 6 − 5.",
          },
        ],
        explanation: "2(3) + (−5) = 6 − 5 = 1.",
      },
      {
        id: "prac-distance",
        prompt: "Using d = vt, find d in metres when v = 12 m/s and t = 4.0 s.",
        formula: "d = v t",
        answer: 48,
        tolerance: 0.2,
        unit: "m",
        topic: "Units",
        hints: [
          {
            title: "Write the formula first",
            body: "Start from d = v t. Both numbers already use seconds, so no unit conversion is needed.",
          },
          {
            title: "Cancel the seconds",
            body: "12 × 4.0 = 48, and (m/s) × s leaves metres.",
          },
        ],
        explanation: "d = (12 m/s)(4.0 s) = 48 m.",
      },
      {
        id: "prac-square-positive",
        prompt: "Evaluate 3x² when x = 2. Only x is squared.",
        formula: "3x^{2}",
        answer: 12,
        tolerance: 0.05,
        unit: "",
        topic: "Powers",
        hints: [
          {
            title: "What is squared?",
            body: "In 3x² only x is squared. The 3 sits outside, waiting to multiply afterwards.",
          },
          {
            title: "Power before coefficient",
            body: "x² = 2 × 2 = 4, then 3 × 4. Do not compute (3x)²; that would square the 3 as well.",
          },
        ],
        explanation: "3(2)² = 3 × 4 = 12. Squaring 3x would have given 36, which is a different expression.",
      },
      {
        id: "prac-square-negative",
        prompt: "Evaluate x² when x = −4.",
        formula: "x^{2}",
        answer: 16,
        tolerance: 0.05,
        unit: "",
        topic: "Powers",
        hints: [
          {
            title: "Write the brackets",
            body: "x² means x times x, so substitute as (−4) × (−4), not as −4².",
          },
          {
            title: "Two negatives",
            body: "A negative times a negative is positive: 4 × 4 with a plus sign, so 16.",
          },
        ],
        explanation: "(−4)² = (−4)(−4) = 16. The square of a real number is not negative.",
      },
      {
        id: "prac-force",
        prompt: "Using F = ma, find F in newtons when m = 4.0 kg and a = 2.5 m/s².",
        formula: "F = m a",
        answer: 10,
        tolerance: 0.1,
        unit: "N",
        topic: "Units",
        hints: [
          {
            title: "Letters first",
            body: "Write F = m a, then put 4.0 kg and 2.5 m/s² into those letters.",
          },
          {
            title: "The newton",
            body: "4.0 × 2.5 = 10. The unit kg·m/s² is written N, the newton.",
          },
        ],
        explanation: "F = (4.0 kg)(2.5 m/s²) = 10 N.",
      },
      {
        id: "prac-brackets",
        prompt: "Evaluate −2(x + 3) when x = 5.",
        formula: "-2(x+3)",
        answer: -16,
        tolerance: 0.05,
        unit: "",
        topic: "Order of operations",
        hints: [
          {
            title: "Brackets first",
            body: "Do the inside of the brackets before multiplying by −2. x + 3 at x = 5 is 8.",
          },
          {
            title: "Then multiply",
            body: "−2 × 8 = −16. Distributing gives the same: −2x − 6 = −10 − 6 = −16.",
          },
        ],
        explanation: "−2(5 + 3) = −2(8) = −16. Distributed: −2(5) − 2(3) = −10 − 6 = −16.",
      },
      {
        id: "prac-density",
        prompt: "Density is ρ = m/V. Find ρ in kg/m³ when m = 9.0 kg and V = 3.0 m³.",
        formula: "\\rho = \\frac{m}{V}",
        answer: 3,
        tolerance: 0.05,
        unit: "kg/m³",
        topic: "Substitution",
        hints: [
          {
            title: "What the formula says",
            body: "ρ = m / V means “mass divided by volume.” Put 9.0 on top and 3.0 on the bottom.",
          },
          {
            title: "Division of units",
            body: "9.0 ÷ 3.0 = 3, and kg / m³ is the SI unit of density.",
          },
        ],
        explanation: "ρ = 9.0 kg / 3.0 m³ = 3.0 kg/m³.",
      },
    ],
    quiz: [
      {
        id: "quiz-coefficient",
        kind: "multiple-choice",
        prompt: "In the term 7t, what is the 7?",
        options: [
          { id: "a", label: "A variable" },
          { id: "b", label: "A coefficient" },
          { id: "c", label: "An exponent" },
          { id: "d", label: "A unit" },
        ],
        answer: "b",
        topic: "Vocabulary",
        explanation:
          "7 multiplies the variable t, so it is a coefficient. t is the variable. An exponent would sit as a superscript.",
      },
      {
        id: "quiz-variable",
        kind: "multiple-choice",
        prompt: "Which statement best describes a variable in a physics formula?",
        options: [
          { id: "a", label: "A letter whose value can change from one situation to another" },
          { id: "b", label: "A number that never changes in the universe" },
          { id: "c", label: "A unit such as metres or seconds" },
          { id: "d", label: "A decoration with no meaning" },
        ],
        answer: "a",
        topic: "Vocabulary",
        explanation:
          "Variables name quantities that take different values in different problems, or as time passes. Constants are the quantities we hold fixed.",
      },
      {
        id: "quiz-juxtaposition",
        kind: "multiple-choice",
        prompt: "What does the writing vt mean?",
        options: [
          { id: "a", label: "v plus t" },
          { id: "b", label: "The two-digit number formed by v and t" },
          { id: "c", label: "v multiplied by t" },
          { id: "d", label: "v divided by t" },
        ],
        answer: "c",
        topic: "Vocabulary",
        explanation: "Juxtaposition of two letters means multiplication: vt = v × t.",
      },
      {
        id: "quiz-linear",
        prompt: "Evaluate 4x + 1 when x = 6.",
        formula: "4x + 1",
        answer: 25,
        tolerance: 0.05,
        unit: "",
        topic: "Substitution",
        explanation: "4(6) + 1 = 24 + 1 = 25.",
      },
      {
        id: "quiz-power-coeff",
        prompt: "Evaluate 2x² when x = 3. Only x is squared.",
        formula: "2x^{2}",
        answer: 18,
        tolerance: 0.05,
        unit: "",
        topic: "Powers",
        explanation: "2(3)² = 2 × 9 = 18. (2x)² would have been 36.",
      },
      {
        id: "quiz-neg-square",
        prompt: "Evaluate x² when x = −5.",
        formula: "x^{2}",
        answer: 25,
        tolerance: 0.05,
        unit: "",
        topic: "Powers",
        explanation: "(−5)² = (−5)(−5) = 25.",
      },
      {
        id: "quiz-neg-product",
        kind: "multiple-choice",
        prompt: "You substitute x = −2 into 3x. Which working is correct?",
        options: [
          { id: "a", label: "3 − 2 = 1" },
          { id: "b", label: "3(−2) = −6" },
          { id: "c", label: "3 − (−2) = 5" },
          { id: "d", label: "32, because the digits sit next to each other" },
        ],
        answer: "b",
        topic: "Negative numbers",
        explanation: "3x is a product. Substituting a negative value requires a bracket: 3(−2) = −6.",
      },
      {
        id: "quiz-speed",
        prompt: "Using v = d/t, find v in metres per second when d = 100 m and t = 8.0 s.",
        formula: "v = \\frac{d}{t}",
        answer: 12.5,
        tolerance: 0.1,
        unit: "m/s",
        topic: "Units",
        explanation: "v = 100 m / 8.0 s = 12.5 m/s.",
      },
      {
        id: "quiz-kinetic",
        prompt:
          "A later energy formula is K = ½mv². Here ½ means 0.5 and only v is squared. Find K in joules when m = 2.0 kg and v = 4.0 m/s.",
        formula: "K = \\tfrac{1}{2} m v^{2}",
        answer: 16,
        tolerance: 0.15,
        unit: "J",
        topic: "Powers",
        explanation:
          "v² = 16 m²/s², then (2.0 kg)(16) = 32, then half of 32 is 16 J. One joule is 1 kg·m²/s².",
      },
      {
        id: "quiz-process",
        kind: "multiple-choice",
        prompt: "What is the safest order of work for a numerical physics problem?",
        options: [
          { id: "a", label: "Insert numbers immediately, then guess the unit at the end" },
          { id: "b", label: "Write the formula with letters, substitute values with units, then calculate" },
          { id: "c", label: "Calculate with mixed centimetres and metres, then convert if the answer looks large" },
          { id: "d", label: "Skip the formula and scale a memorised example by eye" },
        ],
        answer: "b",
        topic: "Order of operations",
        explanation:
          "Letters first, then substitution with units, then arithmetic. That order keeps operations and units honest.",
      },
    ],
    summary: [
      "A letter in physics names a quantity: a number and a unit.",
      "Variables change; constants are held fixed; coefficients multiply variables.",
      "Substitution replaces a letter by a number in brackets, then ordinary arithmetic applies.",
      "Powers bind before minus signs: (−3)² is 9, while −3² is −9.",
      "Units multiply and divide with the numbers; never add mismatched units.",
    ],
  },
};
