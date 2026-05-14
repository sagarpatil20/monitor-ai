import { Gavel } from "lucide-react";

const criteria = [
  { name: "Faithfulness", score: 0.92 },
  { name: "Relevance", score: 0.88 },
  { name: "Coherence", score: 0.94 },
  { name: "Toxicity", score: 0.02, invert: true },
  { name: "Hallucination", score: 0.06, invert: true },
  { name: "Helpfulness", score: 0.81 },
];

const recent = [
  { id: "tr_a91k", verdict: "PASS", reason: "Answer cites sources from RAG context. Tone matches policy.", score: 0.91 },
  { id: "tr_b2x4", verdict: "FLAG", reason: "Output contains an unsupported numeric claim about Q3 revenue.", score: 0.54 },
  { id: "tr_c7m9", verdict: "PASS", reason: "Concise, complete, follows system prompt structure.", score: 0.88 },
];

export function JudgePanel() {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 h-12 border-b border-border">
        <div className="flex items-center gap-2">
          <Gavel className="size-4" strokeWidth={1.5} />
          <h3 className="text-sm font-medium">LLM-as-Judge</h3>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">model: gpt-4o-mini</span>
      </div>
      <div className="p-5 space-y-3 border-b border-border">
        {criteria.map((c) => {
          const display = c.invert ? 1 - c.score : c.score;
          return (
            <div key={c.name}>
              <div className="flex justify-between text-[12px] mb-1.5">
                <span className="text-muted-foreground">{c.name}</span>
                <span className="font-mono tabular-nums">{c.score.toFixed(2)}</span>
              </div>
              <div className="h-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-foreground transition-all"
                  style={{ width: `${display * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-5 space-y-3">
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">recent verdicts</div>
        {recent.map((r) => (
          <div key={r.id} className="border border-border rounded-md p-3 hover:border-foreground/30 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[11px] text-muted-foreground">{r.id}</span>
              <span
                className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                  r.verdict === "PASS"
                    ? "text-success border-success/30"
                    : "text-warning border-warning/30"
                }`}
              >
                {r.verdict} · {r.score.toFixed(2)}
              </span>
            </div>
            <p className="text-[12px] text-foreground/80 leading-relaxed">{r.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
