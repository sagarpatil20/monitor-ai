import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { LiveTraces, useLiveTraces } from "@/components/dashboard/LiveTraces";
import { TokenChart } from "@/components/dashboard/TokenChart";

export const Route = createFileRoute("/traces")({
  component: TracesPage,
  head: () => ({
    meta: [
      { title: "Live Traces - Monitor AI" },
      { name: "description", content: "Real-time agent and LLM call traces." },
    ],
  }),
});

function TracesPage() {
  const traces = useLiveTraces(12);
  return (
    <DashboardShell
      crumb="traces / live stream"
      title="Live traces"
      subtitle="Every prompt, response, and tool call as it happens."
    >
      <TokenChart />
      <LiveTraces traces={traces} />
    </DashboardShell>
  );
}
