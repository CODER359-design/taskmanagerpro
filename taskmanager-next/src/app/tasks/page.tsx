"use client";

import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { KanbanColumn, KanbanCard } from '@/components/tasks/kanban-column';
import { useTasks } from '@/lib/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { apiPost } from '@/lib/api';
import { API_ROUTES } from '@/lib/config';

const statusConfig = [
  { id: 'todo', title: 'To do' },
  { id: 'in_progress', title: 'In progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

type ColumnState = {
  id: string;
  title: string;
  tasks: {
    id: number;
    title: string;
    status: string;
    assignee_name?: string;
    priority?: string;
  }[];
};

export default function TasksPage() {
  const { data, isLoading, mutate } = useTasks();
  const [columns, setColumns] = useState<ColumnState[]>(() => statusConfig.map((col) => ({ ...col, tasks: [] })));

  const tasks = data?.data ?? [];

  useEffect(() => {
    setColumns(
      statusConfig.map((col) => ({
        ...col,
        tasks: tasks.filter((task) => task.status === col.id),
      }))
    );
  }, [tasks]);

  const orderPayload = useMemo(() => {
    return columns.flatMap((column) =>
      column.tasks.map((task, index) => ({
        id: task.id,
        position: index,
        status: column.id,
      }))
    );
  }, [columns]);

  const persistOrder = useCallback(
    async (payload: typeof orderPayload) => {
      try {
        await apiPost(API_ROUTES.reorderTasks, { order: payload });
        mutate();
      } catch (error) {
        console.error('Failed to reorder tasks', error);
      }
    },
    [mutate]
  );

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;
      if (!destination) {
        return;
      }
      if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return;
      }

      setColumns((prev) => {
        const updated = prev.map((col) => ({ ...col, tasks: [...col.tasks] }));
        const sourceColumn = updated.find((col) => col.id === source.droppableId);
        const destColumn = updated.find((col) => col.id === destination.droppableId);
        if (!sourceColumn || !destColumn) {
          return prev;
        }

        const [moved] = sourceColumn.tasks.splice(source.index, 1);
        if (!moved) {
          return prev;
        }

        const nextTask = { ...moved, status: destColumn.id };
        destColumn.tasks.splice(destination.index, 0, nextTask);

        const payload = updated.flatMap((column) =>
          column.tasks.map((task, index) => ({ id: task.id, position: index, status: column.id }))
        );
        persistOrder(payload);
        return updated;
      });
    },
    [persistOrder]
  );

  return (
    <AppShell
      title="Sprint Board"
      subtitle="Flow state dashboard"
      actions={<Button disabled>New Task</Button>}
    >
      {isLoading && <p className="text-sm uppercase tracking-[0.3em] text-muted">Loading…</p>}
      <DragDropContext onDragEnd={handleDragEnd}>
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <KanbanColumn title={column.title}>
                    {column.tasks.map((task, index) => (
                      <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                        {(dragProvided) => <KanbanCard task={task} provided={dragProvided} />}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </KanbanColumn>
                </div>
              )}
            </Droppable>
          ))}
        </section>
      </DragDropContext>
    </AppShell>
  );
}
