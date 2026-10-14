import type { Lesson } from "@/lib/types";

export const kinematicsIntroLesson: Lesson = {
  id: "position-velocity-acceleration",
  moduleId: "kinematics",
  title: "Position, Velocity and Acceleration",
  summary:
    "Define one-dimensional motion with coordinates, derivatives, and the constant-acceleration equations.",
  durationMinutes: 35,
  objectives: [
    "Distinguish position, displacement, and distance along a line.",
    "Compute average and instantaneous velocity from x(t).",
    "Compute average and instantaneous acceleration from v(t).",
    "Apply the constant-acceleration kinematic equations to a numerical problem.",
  ],
  status: "published",
  content: {
    sections: [
      {
        heading: "Position on a line",
        paragraphs: [
          "In one dimension we choose an origin, a positive direction, and a unit of length. The position of a particle is then a single signed number x. Because the particle can move, position is a function of time: x(t).",
          "Displacement is the change in position between two instants. It is a signed quantity and does not care how many times the particle reversed direction in between. Distance travelled is the total length of the path and is never negative.",
        ],
        equations: [
          "\\Delta x = x(t_f) - x(t_i)",
          "s = \\int_{t_i}^{t_f} \\lvert v(t) \\rvert \\, dt",
        ],
        hints: [
          {
            title: "Sign convention",
            body: "If right is positive, a particle at x = -4 m is 4 metres to the left of the origin. A negative displacement means the particle ended further in the negative direction than it started, even if it moved both ways.",
          },
        ],
      },
      {
        heading: "Velocity",
        paragraphs: [
          "Average velocity over an interval is displacement divided by the time taken. It tells you the net rate of change of position, not the speedometer reading at every moment.",
          "Instantaneous velocity is the derivative of position. In a graph of x against t it is the slope of the tangent. Speed is the magnitude of velocity, so speed is never negative.",
        ],
        equations: [
          "v_{\\mathrm{avg}} = \\frac{\\Delta x}{\\Delta t} = \\frac{x(t_f) - x(t_i)}{t_f - t_i}",
          "v(t) = \\frac{dx}{dt}",
          "\\mathrm{speed} = \\lvert v \\rvert",
        ],
        hints: [
          {
            title: "Why the derivative?",
            body: "Average velocity over a shrinking interval approaches a unique limit when x(t) is differentiable. That limit is the instantaneous velocity. If x(t) has a sharp corner, the instantaneous velocity is not defined at that instant.",
          },
        ],
      },
      {
        heading: "Acceleration",
        paragraphs: [
          "Acceleration measures how velocity changes with time. Average acceleration over an interval is the change in velocity divided by the duration of the interval. Instantaneous acceleration is the derivative of velocity, which is also the second derivative of position.",
          "A particle can accelerate even while slowing down: if velocity is positive and acceleration is negative, the particle is decelerating in the positive direction. The sign of a tells you whether v is becoming more positive or more negative.",
        ],
        equations: [
          "a_{\\mathrm{avg}} = \\frac{\\Delta v}{\\Delta t} = \\frac{v(t_f) - v(t_i)}{t_f - t_i}",
          "a(t) = \\frac{dv}{dt} = \\frac{d^{2}x}{dt^{2}}",
        ],
      },
      {
        heading: "Constant acceleration",
        paragraphs: [
          "When a is constant, the derivatives become ordinary algebra. Integrating a once gives a linear velocity; integrating again gives a quadratic position. Eliminating time between those two results produces a relation that is often the fastest route to an unknown speed or distance.",
          "These three equations are valid only while the acceleration truly is constant. If a rocket burns fuel at a changing rate, or if air resistance depends on speed, you must return to the derivatives or to Newton's second law.",
        ],
        equations: [
          "v = v_0 + a t",
          "x = x_0 + v_0 t + \\tfrac{1}{2} a t^{2}",
          "v^{2} = v_0^{2} + 2 a (x - x_0)",
        ],
        hints: [
          {
            title: "Choosing an equation",
            body: "List the knowns and the unknown. If the problem never mentions time, the third equation is usually the right tool. If the final speed is unknown and you know t, start with v = v_0 + a t, then substitute into the position equation.",
          },
        ],
      },
    ],
    example: {
      title: "A car leaving a junction",
      setup:
        "A car waits at a junction, so its initial velocity is zero. When the lights change it accelerates at a constant 3.0 m/s² for 8.0 s. Take x_0 = 0 at the stop line. Find the velocity and the displacement at t = 8.0 s.",
      steps: [
        {
          text: "Identify the known quantities. The acceleration is constant, so the kinematic equations apply.",
          latex: "v_0 = 0,\\quad a = 3.0\\,\\mathrm{m\\,s^{-2}},\\quad t = 8.0\\,\\mathrm{s},\\quad x_0 = 0",
        },
        {
          text: "Velocity after 8.0 s follows from the first constant-acceleration equation.",
          latex: "v = v_0 + a t = 0 + (3.0)(8.0) = 24\\,\\mathrm{m\\,s^{-1}}",
        },
        {
          text: "Displacement follows from the quadratic position equation. The linear term vanishes because the car starts from rest.",
          latex:
            "x = x_0 + v_0 t + \\tfrac{1}{2} a t^{2} = \\tfrac{1}{2}(3.0)(8.0)^{2} = 96\\,\\mathrm{m}",
        },
        {
          text: "As a check, the time-free equation must give the same speed after 96 m of travel.",
          latex: "v^{2} = 0 + 2(3.0)(96) = 576 \\implies v = 24\\,\\mathrm{m\\,s^{-1}}",
        },
      ],
      result:
        "After 8.0 s the car is travelling at 24 m/s and has moved 96 m past the stop line.",
      resultLatex: "v = 24\\,\\mathrm{m\\,s^{-1}},\\quad x = 96\\,\\mathrm{m}",
    },
    questions: [
      {
        id: "avg-velocity",
        prompt:
          "A runner moves along a straight track from x = 12.0 m to x = 48.0 m in 8.00 s. What is the average velocity in metres per second?",
        formula: "v_{\\mathrm{avg}} = \\frac{48.0 - 12.0}{8.00}",
        answer: 4.5,
        tolerance: 0.05,
        unit: "m/s",
        explanation:
          "Average velocity is displacement over time: (48.0 − 12.0) / 8.00 = 36.0 / 8.00 = 4.50 m/s. The positive sign means the runner's net motion is in the positive direction.",
      },
      {
        id: "avg-acceleration",
        prompt:
          "A car's velocity increases uniformly from 12.0 m/s to 28.0 m/s in 4.00 s. What is the average acceleration in metres per second squared?",
        formula: "a_{\\mathrm{avg}} = \\frac{28.0 - 12.0}{4.00}",
        answer: 4,
        tolerance: 0.05,
        unit: "m/s²",
        explanation:
          "Average acceleration is the change in velocity over time: (28.0 − 12.0) / 4.00 = 16.0 / 4.00 = 4.00 m/s². Because velocity became more positive, the acceleration is positive.",
      },
      {
        id: "displacement-from-rest",
        prompt:
          "A particle starts from rest and accelerates at a constant 2.50 m/s² for 6.00 s. How far does it travel, in metres?",
        formula: "x = \\tfrac{1}{2} a t^{2} = \\tfrac{1}{2}(2.50)(6.00)^{2}",
        answer: 45,
        tolerance: 0.2,
        unit: "m",
        explanation:
          "With v_0 = 0 and x_0 = 0, the position equation reduces to x = (1/2) a t² = 0.5 × 2.50 × 36.0 = 45.0 m. You can confirm the final speed v = a t = 15.0 m/s and then use v² = 2 a x.",
      },
    ],
  },
};
