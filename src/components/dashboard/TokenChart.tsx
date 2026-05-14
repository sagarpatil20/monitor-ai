import { useEffect, useState } from "react";

interface Point { t: number; in: number; out: number }

function genSeries(n: number): Point[] {
  return Array.from({ length: n }, (_, i) => ({
    t: i,
    in: 1200 + Math.random() * 1800 + Math.sin(i / 3) * 400,
    out: 600 + Math.random() * 900 + Math.cos(i / 4) * 200,
  }));
}

export function TokenChart() {
  const [data, setData] = useState<Point[]>(() => genSeries(48));

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const next = prev.slice(1);
        const last = prev[prev.length - 1];
        next.push({
          t: last.t + 1,
          in: 1200 + Math.random() * 1800 + Math.sin(last.t / 3) * 400,
          out: 600 + Math.random() * 900 + Math.cos(last.t / 4) * 200,
        });
        return next;
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const W = 800, H = 220, P = 24;
  const max = Math.max(...data.map((d) => d.in + d.out));
  const xs = (i: number) => P + (i / (data.length - 1)) * (W - P * 2);
  const ys = (v: number) => H - P - (v / max) * (H - P * 2);

  const buildPath = (key: "in" | "out") => {
    return data.map((d, i) => `${i === 0 ? "M" : "L"} ${xs(i)} ${ys(d[key])}`).join(" ");
  };
  const buildArea = (key: "in" | "out") => {
    return (
      buildPath(key) +
      ` L ${xs(data.length - 1)} ${H - P} L ${xs(0)} ${H - P} Z`
    );
  };

  const totalIn = data.reduce((a, d) => a + d.in, 0);
  const totalOut = data.reduce((a, d) => a + d.out, 0);

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 h-12 border-b border-border">
        <div>
          <h3 className="text-sm font-medium">Token throughput</h3>
          <p className="font-mono text-[11px] text-muted-foreground">tokens / minute · live</p>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <Legend label="input" color="oklch(0.6 0 0)" value={Math.round(totalIn).toLocaleString()} />
          <Legend label="output" color="oklch(0.985 0 0)" value={Math.round(totalOut).toLocaleString()} />
        </div>
      </div>
      <div className="p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gIn" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.6 0 0)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="oklch(0.6 0 0)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gOut" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.985 0 0)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="oklch(0.985 0 0)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((p) => (
            <line key={p} x1={P} x2={W - P} y1={P + p * (H - P * 2)} y2={P + p * (H - P * 2)}
              stroke="oklch(1 0 0 / 6%)" strokeDasharray="2 4" />
          ))}
          <path d={buildArea("in")} fill="url(#gIn)" />
          <path d={buildPath("in")} fill="none" stroke="oklch(0.6 0 0)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          <path d={buildArea("out")} fill="url(#gOut)" />
          <path d={buildPath("out")} fill="none" stroke="oklch(0.985 0 0)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}

function Legend({ label, color, value }: { label: string; color: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="block w-3 h-px" style={{ background: color }} />
      <span className="text-muted-foreground">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
