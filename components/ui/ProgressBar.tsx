export function ProgressBar({
  value,
  label,
}: {
  value: number;
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
          <span>{label}</span>
          <span className="font-mono text-cyan-200">{clamped}%</span>
        </div>
      ) : null}
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-linear-to-r from-cyan-400 to-blue-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
