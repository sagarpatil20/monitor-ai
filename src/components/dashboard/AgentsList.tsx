const agents = [
  { name: "support-bot", model: "gpt-4o", calls: 12483, score: 0.91, cost: 18.42, trend: [4, 6, 5, 8, 7, 9, 10, 8, 11, 12] },
  { name: "research-agent", model: "claude-3.5", calls: 4218, score: 0.88, cost: 24.10, trend: [3, 5, 4, 6, 8, 7, 9, 8, 10, 9] },
  { name: "coder-v2", model: "gpt-4o", calls: 9120, score: 0.84, cost: 31.55, trend: [5, 4, 6, 7, 6, 8, 7, 9, 8, 10] },
  { name: "summarizer", model: "gemini-1.5", calls: 22014, score: 0.79, cost: 6.20, trend: [6, 7, 8, 7, 9, 8, 10, 9, 11, 10] },
  { name: "router-llm", model: "llama-3.1", calls: 38201, score: 0.96, cost: 2.14, trend: [8, 9, 8, 10, 9, 11, 10, 12, 11, 13] },
];

export function AgentsList() {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 h-12 border-b border-border">
        <h3 className="text-sm font-medium">Agents</h3>
        <span className="font-mono text-[11px] text-muted-foreground">{agents.length} active</span>
      </div>
      <div className="divide-y divide-border">
        {agents.map((a) => (
          <div key={a.name} className="px-5 py-3 grid grid-cols-12 gap-3 items-center hover:bg-accent/30 transition-colors">
            <div className="col-span-3">
              <div className="text-[13px] font-medium">{a.name}</div>
              <div className="font-mono text-[10px] text-muted-foreground">{a.model}</div>
            </div>
            <div className="col-span-2 text-[12px] font-mono tabular-nums text-muted-foreground">
              {a.calls.toLocaleString()} <span className="opacity-50">runs</span>
            </div>
            <div className="col-span-3">
              <MiniBars values={a.trend} />
            </div>
            <div className="col-span-2 text-right">
              <span className={`font-mono text-[12px] tabular-nums ${a.score >= 0.9 ? "text-success" : a.score >= 0.8 ? "text-foreground" : "text-warning"}`}>
                {a.score.toFixed(2)}
              </span>
            </div>
            <div className="col-span-2 text-right font-mono text-[12px] tabular-nums text-muted-foreground">
              ${a.cost.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniBars({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-0.5 h-7">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 bg-foreground/80 rounded-[1px]"
          style={{ height: `${(v / max) * 100}%`, opacity: 0.4 + (i / values.length) * 0.6 }}
        />
      ))}
    </div>
  );
}
