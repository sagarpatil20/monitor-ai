import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Database, Upload } from "lucide-react";

export const Route = createFileRoute("/datasets")({
  component: DatasetsPage,
  head: () => ({
    meta: [
      { title: "Datasets — rapy-eval.ai" },
      { name: "description", content: "Curate eval datasets for repeatable LLM testing." },
    ],
  }),
});

const datasets = [
  { name: "support-tickets-v3", rows: 1240, tags: ["support", "intent"], updated: "2h ago" },
  { name: "rag-pricing-qa", rows: 320, tags: ["rag", "qa"], updated: "yesterday" },
  { name: "code-review-samples", rows: 540, tags: ["code", "diff"], updated: "3d ago" },
  { name: "summarization-news", rows: 2100, tags: ["summarize"], updated: "1w ago" },
  { name: "toxicity-redteam", rows: 410, tags: ["safety", "toxicity"], updated: "1w ago" },
  { name: "router-intents", rows: 6200, tags: ["routing"], updated: "2w ago" },
];

function DatasetsPage() {
  return (
    <DashboardShell
      crumb="datasets · gold sets"
      title="Datasets"
      subtitle="Versioned ground-truth examples to test your LLMs against."
      actions={
        <button className="h-8 px-3 rounded-md border border-border bg-card text-[12px] font-mono flex items-center gap-1.5 hover:bg-accent">
          <Upload className="size-3" /> import
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {datasets.map((d) => (
          <div key={d.name} className="rounded-lg border border-border bg-card p-5 hover:border-foreground/30 transition-colors group">
            <div className="flex items-start justify-between">
              <div className="size-9 rounded-md border border-border bg-background flex items-center justify-center">
                <Database className="size-4" strokeWidth={1.5} />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">{d.updated}</span>
            </div>
            <div className="mt-4">
              <div className="text-[13px] font-medium">{d.name}</div>
              <div className="font-mono text-[11px] text-muted-foreground tabular-nums mt-0.5">
                {d.rows.toLocaleString()} rows
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {d.tags.map((t) => (
                <span key={t} className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
