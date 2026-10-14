import type { Lesson } from "@/lib/types";

export const symbolsLesson: Lesson = {
  id: "symbols-and-substitution", moduleId: "algebra-foundations",
  title: "Symbols and Substitution",
  summary: "Read formulae, substitute values with units, and calculate physical quantities confidently.",
  durationMinutes: 35,
  objectives: ["Explain what variables, constants, and units represent.", "Substitute values using brackets and the correct order of operations.", "Rearrange a simple formula before substituting.", "Check answers using units and sensible estimates."],
  status: "published",
  content: {
    sections: [
      { heading: "1. A formula is a sentence written in symbols", paragraphs: ["In physics, a letter stands for a measurable quantity. In distance = speed × time, we write d = vt. The letters are not mysterious: d is distance, v is speed, and t is elapsed time.", "A variable can change from one problem to the next. A constant has a fixed value in the situation being modelled. Always check what each symbol means: the same letter can mean different things in different topics."], equations: ["d = vt", "\\underbrace{d}_{\\text{distance (m)}}=\\underbrace{v}_{\\text{speed (m/s)}}\\underbrace{t}_{\\text{time (s)}}"], hints: [{title:"What does the equals sign mean?",body:"The expressions on both sides represent the same quantity. A formula describes a relationship, not merely a command to calculate."}] },
      { heading: "2. Substitute: replace letters with numbers", paragraphs: ["Suppose a cyclist travels at 6 metres per second for 8 seconds. Write the original formula, insert the numbers in place of the letters, and then evaluate.", "Keep brackets around negative numbers and around whole expressions. For example, if x = −3, then x² = (−3)² = 9, not −9."], equations: ["d=vt=(6\\ \\mathrm{m/s})(8\\ \\mathrm{s})=48\\ \\mathrm{m}", "x^2\\big|_{x=-3}=(-3)^2=9"], hints:[{title:"Why brackets?",body:"They preserve the sign and the order of operations. Squaring −3 requires squaring the entire number: (−3) × (−3)."}] },
      { heading: "3. Rearrange first when the unknown changes", paragraphs: ["If you know distance and time but need speed, isolate v before inserting values. Dividing both sides of d = vt by t gives v = d/t (provided t is not zero).", "For a 150 m journey lasting 25 s, v = 150/25 = 6 m/s. Rearranging with letters first makes mistakes easier to spot."], equations:["d=vt\\quad\\Rightarrow\\quad v=\\frac{d}{t}","v=\\frac{150\\ \\mathrm{m}}{25\\ \\mathrm{s}}=6\\ \\mathrm{m/s}"] },
      { heading: "4. Units are a built-in error check", paragraphs: ["Multiplying metres per second by seconds cancels seconds and leaves metres. Dividing metres by seconds gives metres per second.", "If you calculate a distance and end up with m/s, revisit your formula. Convert units before substituting: 2 minutes = 120 seconds. Then 3 m/s × 120 s = 360 m.", "Check the magnitude too: at about 3 metres each second for 120 seconds, a few hundred metres is plausible."], equations:["\\frac{\\mathrm{m}}{\\mathrm{s}}\\times\\mathrm{s}=\\mathrm{m}","2\\ \\mathrm{min}=120\\ \\mathrm{s}"] },
      { heading: "5. Avoid three common traps", paragraphs:["Do not confuse 3x with 3 + x: 3x means 3 multiplied by x.","Use the order of operations: powers first, then multiplication and division, then addition and subtraction. Thus 2 + 3 × 4 = 14, not 20.","Use consistent units. In v = d/t, dividing metres by minutes produces m/min, not m/s. Convert if the question asks for m/s."] }
    ],
    example: { title:"A runner's journey", setup:"A runner covers 1,200 m in 5 minutes. Calculate average speed in metres per second.", steps:[{text:"Identify the unknown and choose the relationship.",latex:"v=\\frac{d}{t}"},{text:"Convert minutes to seconds before substituting.",latex:"t=5\\times60=300\\ \\mathrm{s}"},{text:"Insert values, keeping their units.",latex:"v=\\frac{1200\\ \\mathrm{m}}{300\\ \\mathrm{s}}"},{text:"Divide and check the resulting unit.",latex:"v=4\\ \\mathrm{m/s}"}], result:"The runner's average speed is 4 m/s. Check: 4 × 300 = 1,200 m.",resultLatex:"\\boxed{v=4\\ \\mathrm{m/s}}" },
    questions:[
      {id:"symbols-1",prompt:"A car moves at 12 m/s for 5 s. How far does it travel?",formula:"d=vt",answer:60,tolerance:0.01,unit:"m",explanation:"d = 12 × 5 = 60 m."},
      {id:"symbols-2",prompt:"A ball travels 84 m in 7 s. Find its average speed.",formula:"v=d/t",answer:12,tolerance:0.01,unit:"m/s",explanation:"v = 84 ÷ 7 = 12 m/s."},
      {id:"symbols-3",prompt:"Evaluate x² + 2x when x = −3.",formula:"x^2+2x",answer:3,tolerance:0.01,unit:"",explanation:"(−3)² + 2(−3) = 9 − 6 = 3."},
      {id:"symbols-4",prompt:"A cyclist rides at 4 m/s for 2 minutes. Find distance in metres.",formula:"d=vt",answer:480,tolerance:0.01,unit:"m",explanation:"2 min = 120 s, so d = 4 × 120 = 480 m."},
      {id:"symbols-5",prompt:"Using F = ma, find force for mass 3 kg and acceleration 2.5 m/s².",formula:"F=ma",answer:7.5,tolerance:0.01,unit:"N",explanation:"F = 3 × 2.5 = 7.5 N (kg·m/s²)."}
    ]
  }
};
