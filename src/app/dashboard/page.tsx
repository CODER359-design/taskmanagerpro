"use client";

import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/stat-card';
import { Card } from '@/components/ui/card';
import { DonutChart } from '@/components/charts/donut';
import { Reveal } from '@/components/motion/reveal';
import { useDashboard } from '@/lib/hooks';

const summaryOrder: Record<string, string> = {
  todo: 'Open tasks',
  in_progress: 'In progress',
  review: 'Review',
  done: 'Completed',
};

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();
  const summary = data?.taskSummary ?? [];
  const stats = Object.keys(summaryOrder).map((key) => {
    const entry = summary.find((item) => item.status === key);
    return {
      label: summaryOrder[key],
      value: entry ? String(entry.total) : '0',
    };
  });

  const recentTasks = data?.recentTasks ?? [];
  const donutData = stats.map((item) => Number(item.value) || 0);

  return (
    <AppShell
      title="Team Pulse"
      subtitle="Momentum for modern squads"
      actions={<Button disabled>New Project</Button>}
    >
      <section className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 80}>
            <StatCard label={stat.label} value={stat.value} />
          </Reveal>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent tasks</h2>
            {isLoading && <span className="text-xs uppercase tracking-[0.3em] text-muted">loading…</span>}
          </div>
          <div className="mt-4 space-y-4">
            {recentTasks.map((task, index) => (
              <Reveal key={task.id} delay={index * 120} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted">{task.project_name ?? 'Project'}</p>
                </div>
                <span className="text-sm text-accent capitalize">{task.status}</span>
              </Reveal>
            ))}
            {!recentTasks.length && !isLoading && <p className="text-sm text-muted">No activity yet.</p>}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Focus mix</h2>
          <div className="mt-6 flex justify-center">
            <DonutChart data={donutData.some(Boolean) ? donutData : [1]} />
          </div>
        </Card>
      </section>
    </AppShell>
  );
}
