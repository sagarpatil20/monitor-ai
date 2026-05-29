const agents = [
  { name: "support-bot", model: "gpt-4o", author: "Sagar Patil", status: "built", calls: 12483, score: 0.91, cost: 18.42, trend: [4, 6, 5, 8, 7, 9, 10, 8, 11, 12] },
  { name: "research-agent", model: "claude-3.5", author: "Elena R.", status: "built", calls: 4218, score: 0.88, cost: 24.10, trend: [3, 5, 4, 6, 8, 7, 9, 8, 10, 9] },
  { name: "coder-v2", model: "gpt-4o", author: "Arjun Mehta", status: "built", calls: 9120, score: 0.84, cost: 31.55, trend: [5, 4, 6, 7, 6, 8, 7, 9, 8, 10] },
  { name: "summarizer", model: "gemini-1.5", author: "Sarah T.", status: "built", calls: 22014, score: 0.79, cost: 6.20, trend: [6, 7, 8, 7, 9, 8, 10, 9, 11, 10] },
  { name: "router-llm", model: "llama-3.1", author: "Devin K.", status: "built", calls: 38201, score: 0.96, cost: 2.14, trend: [8, 9, 8, 10, 9, 11, 10, 12, 11, 13] },
  { name: "legal-analyzer", model: "claude-3.5", author: "Sagar Patil", status: "not-built", calls: 0, score: 0, cost: 0.00, trend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "leads-enricher", model: "gpt-4o", author: "Elena R.", status: "not-built", calls: 0, score: 0, cost: 0.00, trend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "invoice-extractor", model: "gpt-4o", author: "Arjun Mehta", status: "built", calls: 1402, score: 0.92, cost: 4.80, trend: [2, 3, 2, 4, 3, 5, 4, 5, 6, 5] },
  { name: "sentiment-classifier", model: "llama-3.1", author: "Sarah T.", status: "not-built", calls: 0, score: 0, cost: 0.00, trend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "translation-engine", model: "gemini-1.5", author: "Devin K.", status: "built", calls: 42100, score: 0.89, cost: 5.12, trend: [7, 8, 9, 9, 10, 11, 11, 12, 13, 14] },
  { name: "document-qa", model: "claude-3.5", author: "Sagar Patil", status: "built", calls: 5120, score: 0.93, cost: 12.30, trend: [3, 4, 5, 4, 6, 5, 7, 6, 8, 9] },
  { name: "sql-generator", model: "gpt-4o", author: "Arjun Mehta", status: "not-built", calls: 0, score: 0, cost: 0.00, trend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "ticket-classifier", model: "llama-3.1", author: "Elena R.", status: "built", calls: 9841, score: 0.72, cost: 0.85, trend: [5, 4, 3, 4, 2, 3, 1, 2, 1, 2] },
  { name: "anomaly-detector", model: "claude-3.5", author: "Devin K.", status: "not-built", calls: 0, score: 0, cost: 0.00, trend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
];

export function AgentsList() {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 h-12 border-b border-border">
        <h3 className="text-sm font-medium">Agents Registry</h3>
        <span className="font-mono text-[11px] text-muted-foreground">
          {agents.filter(a => a.status === "built").length} built · {agents.filter(a => a.status === "not-built").length} draft
        </span>
      </div>

      {/* Table Headers */}
      <div className="px-5 py-2 grid grid-cols-12 gap-3 border-b border-border bg-muted/20 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
        <div className="col-span-3">Agent / Model</div>
        <div className="col-span-2">Author</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1 text-right">Runs</div>
        <div className="col-span-2 text-center">Trend</div>
        <div className="col-span-1 text-right">Score</div>
        <div className="col-span-1 text-right">Spend</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border">
        {agents.map((a) => (
          <div key={a.name} className="px-5 py-3 grid grid-cols-12 gap-3 items-center hover:bg-accent/30 transition-colors">
            <div className="col-span-3">
              <div className="text-[13px] font-medium">{a.name}</div>
              <div className="font-mono text-[10px] text-muted-foreground">{a.model}</div>
            </div>
            
            <div className="col-span-2 flex items-center gap-1.5 overflow-hidden">
              <div className="size-5 rounded-full bg-accent text-[9px] flex items-center justify-center font-bold text-muted-foreground shrink-0 select-none">
                {a.author.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="text-[12px] truncate text-muted-foreground">{a.author}</span>
            </div>

            <div className="col-span-2">
              {a.status === "built" ? (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-success/10 text-success border border-success/20">
                  <span className="size-1 rounded-full bg-success animate-pulse" />
                  Built & Deployed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-warning/10 text-warning border border-warning/20">
                  <span className="size-1 rounded-full bg-warning" />
                  Not Built
                </span>
              )}
            </div>

            <div className="col-span-1 text-right text-[12px] font-mono tabular-nums text-muted-foreground">
              {a.status === "built" ? a.calls.toLocaleString() : "-"}
            </div>

            <div className="col-span-2">
              {a.status === "built" ? (
                <MiniBars values={a.trend} />
              ) : (
                <div className="h-7 flex items-center justify-center text-muted-foreground/30 font-mono text-[10px]">-</div>
              )}
            </div>

            <div className="col-span-1 text-right">
              {a.status === "built" ? (
                <span className={`font-mono text-[12px] tabular-nums ${a.score >= 0.9 ? "text-success" : a.score >= 0.8 ? "text-foreground" : "text-warning"}`}>
                  {a.score.toFixed(2)}
                </span>
              ) : (
                <span className="font-mono text-[12px] text-muted-foreground/30">-</span>
              )}
            </div>

            <div className="col-span-1 text-right font-mono text-[12px] tabular-nums text-muted-foreground">
              {a.status === "built" ? `$${a.cost.toFixed(2)}` : "$0.00"}
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
    <div className="flex items-end gap-0.5 h-7 justify-center">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 bg-foreground/80 rounded-[1px] max-w-[4px]"
          style={{ height: `${(v / max) * 100}%`, opacity: 0.4 + (i / values.length) * 0.6 }}
        />
      ))}
    </div>
  );
}
