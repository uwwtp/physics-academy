"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";

const tasks = [
  {prompt:"If x = 4, calculate 3x + 2.", answer:14, hints:["3x means 3 times x.","Replace x with 4: 3 × 4 + 2."]},
  {prompt:"If x = −2, calculate x² + 5.", answer:9, hints:["Put brackets around the negative number.","(−2)² = 4, then add 5."]},
  {prompt:"A runner covers 90 m in 15 s. Find speed in m/s.", answer:6, hints:["Rearrange d = vt to v = d/t.","Divide 90 by 15."]},
];
export function SubstitutionLab() {
  const [index,setIndex]=useState(0);
  const [input,setInput]=useState("");
  const [hint,setHint]=useState(0);
  const [checked,setChecked]=useState(false);
  const task=tasks[index];
  const correct=input.trim()!=="" && Number.isFinite(Number(input)) && Math.abs(Number(input)-task.answer)<0.001;
  function next(){setIndex((index+1)%tasks.length);setInput("");setHint(0);setChecked(false);}
  return <Card className="p-5 sm:p-6">
    <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Interactive exercise · {index+1} of {tasks.length}</p>
    <h2 className="mt-2 font-serif text-2xl text-white">Try it yourself</h2>
    <p className="mt-3 text-slate-300">{task.prompt}</p>
    <div className="mt-4 flex flex-wrap gap-3">
      <input aria-label="Your answer" type="number" value={input} onChange={e=>{setInput(e.target.value);setChecked(false);}} className="w-36 rounded-lg border border-white/20 bg-[#07101e] px-3 py-2 text-white" placeholder="Your answer" />
      <button onClick={()=>setChecked(true)} className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950">Check answer</button>
      <button onClick={()=>setHint(Math.min(2,hint+1))} className="rounded-lg border border-white/20 px-4 py-2 text-cyan-200">Show hint</button>
    </div>
    {hint>0 && <p className="mt-3 text-sm text-amber-200">Hint {hint}: {task.hints[hint-1]}</p>}
    {checked && <p role="status" className={`mt-3 text-sm ${correct?"text-emerald-300":"text-rose-300"}`}>{correct?"Correct! Well done.":"Not quite. Check the units and order of operations, or reveal a hint."}</p>}
    {checked && correct && <button onClick={next} className="mt-4 rounded-lg border border-cyan-300/40 px-4 py-2 text-cyan-200">Next exercise →</button>}
    <p className="mt-3 text-xs text-slate-500">Practice is ungraded. Complete the marked quiz below to test your understanding.</p>
  </Card>;
}
