import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { JudgePanel } from "@/components/dashboard/JudgePanel";

export const Route = createFileRoute("/judge")({
  component: JudgePage,
  head: () => ({
    meta: [
      { title: "Judge - Monitor AI" },
      { name: "description", content: "Configure your LLM-as-judge evaluator." },
    ],
  }),
});

const rubric = [
  { name: "Faithfulness", desc: "Does the answer stay grounded in retrieved context?" },
  { name: "Relevance", desc: "Does it directly address the user's question?" },
  { name: "Coherence", desc: "Is the response well-structured and readable?" },
  { name: "Toxicity", desc: "Flag harmful, biased or unsafe language." },
  { name: "Hallucination", desc: "Detect unsupported factual claims." },
  { name: "Helpfulness", desc: "Does it accomplish the user's goal?" },
];

function JudgePage() {
  return (
    <DashboardShell
      crumb="judge / llm-as-a-judge"
      title="LLM as the judge."
      subtitle="A second model scores every response against your rubric - automatic, deterministic, free."
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-lg border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-5 h-12 border-b border-border">
            <h3 className="text-sm font-medium">Rubric</h3>
            <button className="font-mono text-[11px] text-muted-foreground hover:text-foreground">+ add criterion</button>
          </div>
          <div className="divide-y divide-border">
            {rubric.map((r) => (
              <div key={r.name} className="px-5 py-4 flex items-start gap-4">
                <div className="size-8 rounded-md border border-border bg-background flex items-center justify-center font-mono text-[11px] text-muted-foreground">
                  0-1
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium">{r.name}</div>
                  <div className="text-[12px] text-muted-foreground mt-0.5">{r.desc}</div>
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">enabled</span>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-border">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">judge prompt</div>
            <pre className="font-mono text-[11px] text-foreground/80 leading-relaxed bg-background border border-border rounded-md p-3 overflow-x-auto">
{`You are an impartial judge. Score the assistant's
response on each criterion from 0.0 to 1.0.
Return strict JSON: { "scores": {...}, "reason": "..." }`}
            </pre>
          </div>
        </div>
        <JudgePanel />
      </div>
    </DashboardShell>
  );
}
