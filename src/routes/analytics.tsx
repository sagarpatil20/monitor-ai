import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { TokenChart } from "@/components/dashboard/TokenChart";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
  head: () => ({
    meta: [
      { title: "Analytics - Monitor AI" },
      { name: "description", content: "Cost, latency and quality analytics for your LLM stack." },
    ],
  }),
});

const spark = (s: number) =>
  Array.from({ length: 24 }, (_, i) => Math.sin(i / 2 + s) + Math.random() * 0.4 + 1);

const breakdown = [
  { model: "gpt-4o", share: 0.42, cost: 62.40, calls: 12483 },
  { model: "claude-3.5", share: 0.21, cost: 31.10, calls: 4218 },
  { model: "gemini-1.5", share: 0.16, cost: 12.20, calls: 22014 },
  { model: "llama-3.1-70b", share: 0.14, cost: 4.14, calls: 38201 },
  { model: "mixtral-8x7b", share: 0.07, cost: 2.99, calls: 9120 },
];

function AnalyticsPage() {
  return (
    <DashboardShell
      crumb="analytics / cost / latency"
      title="Analytics"
      subtitle="Where every token, dollar and millisecond is going."
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="P50 latency" value="312" unit="ms" delta={-3.1} spark={spark(1)} />
        <StatCard label="P95 latency" value="1.4" unit="s" delta={1.8} spark={spark(2)} />
        <StatCard label="Error rate" value="0.34%" delta={-0.4} spark={spark(3)} />
        <StatCard label="Cost / 1k req" value="$1.69" delta={-2.2} spark={spark(4)} />
      </div>

      <TokenChart />

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-5 h-12 border-b border-border">
          <h3 className="text-sm font-medium">Model breakdown</h3>
          <span className="font-mono text-[11px] text-muted-foreground">last 24h</span>
        </div>
        <div className="divide-y divide-border">
          {breakdown.map((b) => (
            <div key={b.model} className="px-5 py-4 grid grid-cols-12 gap-3 items-center">
              <div className="col-span-3 font-mono text-[12px]">{b.model}</div>
              <div className="col-span-5">
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-foreground" style={{ width: `${b.share * 100}%` }} />
                </div>
              </div>
              <div className="col-span-1 text-right font-mono text-[12px] tabular-nums text-muted-foreground">
                {(b.share * 100).toFixed(0)}%
              </div>
              <div className="col-span-2 text-right font-mono text-[12px] tabular-nums text-muted-foreground">
                {b.calls.toLocaleString()} calls
              </div>
              <div className="col-span-1 text-right font-mono text-[12px] tabular-nums">
                ${b.cost.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
