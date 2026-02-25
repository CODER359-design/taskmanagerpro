"use client";

import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useProjects } from '@/lib/hooks';

export default function ProjectsPage() {
  const { data, isLoading } = useProjects();
  const projects = data?.data ?? [];

  return (
    <AppShell title="Projects" subtitle="Strategic overview" actions={<Button disabled>New Project</Button>}>
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">In flight</h2>
          {isLoading && <p className="text-sm text-muted">Loading…</p>}
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.3em] text-muted">
                <th className="pb-3">Name</th>
                <th className="pb-3">Owner</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Progress</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr key={project.id} className="text-base">
                  <td className="py-4 font-semibold">{project.name}</td>
                  <td className="py-4 text-muted">{project.owner_name ?? '—'}</td>
                  <td className="py-4">
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-wide text-muted">
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4 text-muted">{project.progress ?? '—'}</td>
                  <td className="py-4 text-right">
                    <Button size="sm" variant="ghost" disabled>
                      Open
                    </Button>
                  </td>
                </tr>
              ))}
              {!projects.length && !isLoading && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-muted">
                    No projects yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
