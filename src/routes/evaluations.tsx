import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Play } from "lucide-react";

export const Route = createFileRoute("/evaluations")({
  component: EvalsPage,
  head: () => ({
    meta: [
      { title: "Evaluations - Monitor AI" },
      { name: "description", content: "Run and compare LLM evaluations." },
    ],
  }),
});

const runs = [
  { id: "ev_8a21", name: "support-bot · faithfulness", model: "gpt-4o", samples: 240, pass: 0.94, dur: "1m 12s", at: "2m ago" },
  { id: "ev_8a20", name: "coder-v2 · code-correctness", model: "claude-3.5", samples: 180, pass: 0.81, dur: "3m 04s", at: "14m ago" },
  { id: "ev_8a1e", name: "summarizer · rouge-l", model: "gemini-1.5", samples: 500, pass: 0.76, dur: "2m 41s", at: "1h ago" },
  { id: "ev_8a1d", name: "router-llm · accuracy", model: "llama-3.1", samples: 1000, pass: 0.97, dur: "5m 22s", at: "3h ago" },
  { id: "ev_8a1a", name: "research-agent · hallucination", model: "gpt-4o", samples: 320, pass: 0.88, dur: "4m 10s", at: "6h ago" },
];

function EvalsPage() {
  return (
    <DashboardShell
      crumb="evaluations / runs"
      title="Evaluations"
      subtitle="Batch evals against datasets, scored by your LLM judge."
      actions={
        <button className="h-8 px-3 rounded-md bg-foreground text-background text-[12px] font-medium flex items-center gap-1.5 hover:opacity-90">
          <Play className="size-3" /> New run
        </button>
      }
    >
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-border font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <div className="col-span-1">id</div>
          <div className="col-span-4">run</div>
          <div className="col-span-2">model</div>
          <div className="col-span-1 text-right">samples</div>
          <div className="col-span-2 text-right">pass rate</div>
          <div className="col-span-1 text-right">duration</div>
          <div className="col-span-1 text-right">when</div>
        </div>
        <div className="divide-y divide-border">
          {runs.map((r) => (
            <div key={r.id} className="grid grid-cols-12 gap-3 px-5 py-3.5 text-[12px] items-center hover:bg-accent/30">
              <div className="col-span-1 font-mono text-[11px] text-muted-foreground">{r.id}</div>
              <div className="col-span-4 text-[13px]">{r.name}</div>
              <div className="col-span-2 font-mono text-muted-foreground">{r.model}</div>
              <div className="col-span-1 text-right font-mono tabular-nums text-muted-foreground">{r.samples}</div>
              <div className="col-span-2 text-right">
                <div className="flex items-center gap-2 justify-end">
                  <div className="w-20 h-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-foreground" style={{ width: `${r.pass * 100}%` }} />
                  </div>
                  <span className={`font-mono tabular-nums ${r.pass >= 0.9 ? "text-success" : r.pass >= 0.8 ? "text-foreground" : "text-warning"}`}>
                    {(r.pass * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="col-span-1 text-right font-mono tabular-nums text-muted-foreground">{r.dur}</div>
              <div className="col-span-1 text-right font-mono text-muted-foreground">{r.at}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
