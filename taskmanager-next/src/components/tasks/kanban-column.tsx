"use client";

import { ReactNode } from 'react';
import { DraggableProvided } from '@hello-pangea/dnd';
import clsx from 'clsx';

export function KanbanColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">{title}</h3>
        <span className="text-xs text-muted">cards</span>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

type KanbanCardProps = {
  task: { title: string; assignee?: string; priority?: string };
  provided?: DraggableProvided;
  className?: string;
};

export function KanbanCard({ task, provided, className }: KanbanCardProps) {
  return (
    <div
      ref={provided?.innerRef}
      className={clsx('rounded-2xl border border-white/5 bg-surface/80 p-4 shadow-glow transition hover:-translate-y-0.5', className)}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
    >
      <p className="text-sm font-semibold">{task.title}</p>
      <div className="mt-2 flex items-center justify-between text-xs text-muted">
        <span>{task.assignee ?? 'Unassigned'}</span>
        {task.priority && (
          <span className="rounded-full border border-white/20 px-2 py-0.5 text-[0.65rem] uppercase tracking-wide">
            {task.priority}
          </span>
        )}
      </div>
    </div>
  );
}
