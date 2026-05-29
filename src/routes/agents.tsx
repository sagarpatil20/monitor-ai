import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AgentsList } from "@/components/dashboard/AgentsList";
import { StatCard } from "@/components/dashboard/StatCard";

export const Route = createFileRoute("/agents")({
  component: AgentsPage,
  head: () => ({
    meta: [
      { title: "Agents - Monitor AI" },
      { name: "description", content: "All AI agents tracked by Monitor AI." },
    ],
  }),
});

const spark = (s: number) =>
  Array.from({ length: 24 }, (_, i) => Math.sin(i / 2 + s) + Math.random() * 0.4 + 1);

function AgentsPage() {
  return (
    <DashboardShell
      crumb="agents / registry"
      title="Agents"
      subtitle="Every deployed agent, scored and monitored continuously."
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total agents" value="14" delta={2.1} spark={spark(1)} />
        <StatCard label="Active 24h" value="9" delta={0.8} spark={spark(2)} />
        <StatCard label="Avg score" value="0.87" delta={1.2} spark={spark(3)} />
        <StatCard label="Failing" value="2" delta={-12.5} spark={spark(4)} />
      </div>
      <AgentsList />
    </DashboardShell>
  );
}
