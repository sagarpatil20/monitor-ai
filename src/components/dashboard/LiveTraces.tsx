import { useEffect, useState } from "react";

export interface Trace {
  id: string;
  agent: string;
  model: string;
  task: string;
  tokensIn: number;
  tokensOut: number;
  latency: number;
  score: number;
  status: "ok" | "warn" | "fail" | "running";
  ts: string;
}

const AGENTS = ["support-bot", "research-agent", "coder-v2", "summarizer", "router-llm"];
const MODELS = ["gpt-4o", "claude-3.5", "gemini-1.5", "llama-3.1-70b", "mixtral-8x7b"];
const TASKS = [
  "summarize ticket #4821",
  "classify intent",
  "draft reply",
  "extract entities",
  "compose follow-up",
  "RAG: pricing docs",
  "translate de→en",
  "code review patch.diff",
];

function rid() {
  return "tr_" + Math.random().toString(36).slice(2, 10);
}

function makeTrace(): Trace {
  const status = (["ok", "ok", "ok", "ok", "warn", "fail", "running"] as const)[Math.floor(Math.random() * 7)];
  const score = status === "fail" ? Math.random() * 0.5 : 0.6 + Math.random() * 0.4;
  return {
    id: rid(),
    agent: AGENTS[Math.floor(Math.random() * AGENTS.length)],
    model: MODELS[Math.floor(Math.random() * MODELS.length)],
    task: TASKS[Math.floor(Math.random() * TASKS.length)],
    tokensIn: Math.floor(120 + Math.random() * 3800),
    tokensOut: Math.floor(80 + Math.random() * 1600),
    latency: Math.floor(200 + Math.random() * 3200),
    score,
    status,
    ts: new Date().toLocaleTimeString("en-GB", { hour12: false }),
  };
}

export function useLiveTraces(initial = 9) {
  const [traces, setTraces] = useState<Trace[]>(() =>
    Array.from({ length: initial }, makeTrace)
  );
  useEffect(() => {
    const id = setInterval(() => {
      setTraces((prev) => [makeTrace(), ...prev].slice(0, 14));
    }, 1800);
    return () => clearInterval(id);
  }, []);
  return traces;
}

const statusStyles: Record<Trace["status"], string> = {
  ok: "text-success border-success/30 bg-success/5",
  warn: "text-warning border-warning/30 bg-warning/5",
  fail: "text-destructive border-destructive/30 bg-destructive/5",
  running: "text-foreground border-foreground/30 bg-foreground/5",
};

export function LiveTraces({ traces }: { traces: Trace[] }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 h-12 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-success pulse-dot" />
          <h3 className="text-sm font-medium">Live traces</h3>
          <span className="font-mono text-[11px] text-muted-foreground">streaming</span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">{traces.length} active</span>
      </div>
      <div className="grid grid-cols-12 gap-3 px-5 py-2.5 border-b border-border font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <div className="col-span-1">time</div>
        <div className="col-span-2">agent</div>
        <div className="col-span-2">model</div>
        <div className="col-span-3">task</div>
        <div className="col-span-2 text-right">tokens (in/out)</div>
        <div className="col-span-1 text-right">ms</div>
        <div className="col-span-1 text-right">judge</div>
      </div>
      <div className="divide-y divide-border max-h-[460px] overflow-hidden">
        {traces.map((t, i) => (
          <div
            key={t.id}
            className={`grid grid-cols-12 gap-3 px-5 py-3 text-[12px] items-center ${i === 0 ? "ticker" : ""}`}
          >
            <div className="col-span-1 font-mono text-muted-foreground text-[11px]">{t.ts}</div>
            <div className="col-span-2 truncate">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[11px] font-mono ${statusStyles[t.status]}`}>
                <span className="size-1 rounded-full bg-current" />
                {t.agent}
              </span>
            </div>
            <div className="col-span-2 font-mono text-muted-foreground truncate">{t.model}</div>
            <div className="col-span-3 truncate text-foreground/90">{t.task}</div>
            <div className="col-span-2 text-right font-mono tabular-nums text-muted-foreground">
              {t.tokensIn.toLocaleString()} <span className="opacity-40">/</span>{" "}
              <span className="text-foreground">{t.tokensOut.toLocaleString()}</span>
            </div>
            <div className="col-span-1 text-right font-mono tabular-nums text-muted-foreground">{t.latency}</div>
            <div className="col-span-1 text-right">
              <ScorePill score={t.score} status={t.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScorePill({ score, status }: { score: number; status: Trace["status"] }) {
  if (status === "running") {
    return <span className="font-mono text-[11px] text-muted-foreground">…</span>;
  }
  const color =
    score >= 0.8 ? "text-success" : score >= 0.6 ? "text-warning" : "text-destructive";
  return <span className={`font-mono text-[11px] tabular-nums ${color}`}>{score.toFixed(2)}</span>;
}
