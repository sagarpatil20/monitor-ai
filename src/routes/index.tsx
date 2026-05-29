import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { LiveTraces, useLiveTraces } from "@/components/dashboard/LiveTraces";
import { TokenChart } from "@/components/dashboard/TokenChart";
import { JudgePanel } from "@/components/dashboard/JudgePanel";
import { AgentsList } from "@/components/dashboard/AgentsList";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Overview - Dico Monitor" },
      { name: "description", content: "Live LLM observability and evaluation overview." },
    ],
  }),
});

function Dashboard() {
  const traces = useLiveTraces();
  const [counters, setCounters] = useState({
    requests: 84219,
    tokens: 12_482_103,
    cost: 142.83,
    pass: 0.918,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setCounters((c) => ({
        requests: c.requests + Math.floor(1 + Math.random() * 8),
        tokens: c.tokens + Math.floor(800 + Math.random() * 6000),
        cost: c.cost + Math.random() * 0.18,
        pass: Math.min(0.99, Math.max(0.85, c.pass + (Math.random() - 0.5) * 0.004)),
      }));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const spark = (seed: number) =>
    Array.from({ length: 24 }, (_, i) => Math.sin(i / 2 + seed) + Math.random() * 0.4 + 1);

  return (
    <DashboardShell
      crumb="overview / observability / llm-as-judge"
      title="Watch every prompt, score every response."
      subtitle="Open-source dashboard for tracing, evaluating and monitoring agent runs in real time."
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Requests" value={counters.requests.toLocaleString()} delta={4.2} spark={spark(1)} />
        <StatCard label="Tokens processed" value={(counters.tokens / 1_000_000).toFixed(2)} unit="M" delta={2.8} spark={spark(2)} />
        <StatCard label="Spend" value={`$${counters.cost.toFixed(2)}`} delta={-1.4} spark={spark(3)} />
        <StatCard label="Judge pass rate" value={`${(counters.pass * 100).toFixed(1)}%`} delta={0.6} spark={spark(4)} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          <TokenChart />
          <AgentsList />
        </div>
        <div className="xl:col-span-1">
          <JudgePanel />
        </div>
      </div>

      <LiveTraces traces={traces} />
    </DashboardShell>
  );
}
