import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Props {
  label: string;
  value: string;
  delta?: number;
  unit?: string;
  spark?: number[];
  children?: ReactNode;
}

export function StatCard({ label, value, delta, unit, spark, children }: Props) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="relative rounded-lg border border-border bg-card p-5 overflow-hidden group hover:border-foreground/20 transition-colors">
      <div className="flex items-start justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
        {delta !== undefined && (
          <span
            className={`flex items-center gap-0.5 text-[11px] font-mono ${
              positive ? "text-success" : "text-destructive"
            }`}
          >
            {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-tight tabular-nums">{value}</span>
        {unit && <span className="font-mono text-xs text-muted-foreground">{unit}</span>}
      </div>
      {spark && <Sparkline values={spark} />}
      {children}
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const w = 100;
  const h = 28;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 w-full h-7" preserveAspectRatio="none">
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-foreground/70"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
