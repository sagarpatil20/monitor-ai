import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AgentsList } from "@/components/dashboard/AgentsList";
import { StatCard } from "@/components/dashboard/StatCard";

export const Route = createFileRoute("/agents")({
  component: AgentsPage,
  head: () => ({
    meta: [
      { title: "Agents - Dico Monitor" },
      { name: "description", content: "All AI agents tracked by Dico Monitor." },
    ],
  }),
});

const spark = (s: number) =>
  Array.from({ length: 24 }, (_, i) => Math.sin(i / 2 + s) + Math.random() * 0.4 + 1);

function AgentsPage() {
  return (
    <DashboardShell
      crumb="agents / registry"
      title="Agents Registry"
      subtitle="A central directory of all company AI agents—both built and in-development—including creator tracking and run costs."
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total agents" value="14" delta={4.2} spark={spark(1)} />
        <StatCard label="Built & Deployed" value="9" delta={5.5} spark={spark(2)} />
        <StatCard label="Not Built (In Dev)" value="5" delta={-1.8} spark={spark(3)} />
        <StatCard label="Total spend" value="$105.48" delta={8.3} spark={spark(4)} />
      </div>
      <AgentsList />
    </DashboardShell>
  );
}
