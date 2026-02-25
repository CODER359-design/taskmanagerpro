import useSWR, { SWRConfiguration } from 'swr';
import { apiGet } from './api';
import { API_ROUTES } from './config';

export type SummaryItem = {
  status: string;
  total: number | string;
};

export type TaskItem = {
  id: number;
  title: string;
  status: string;
  priority?: string;
  assignee_name?: string;
  project_name?: string;
  position?: number;
};

type DashboardResponse = {
  status: string;
  projects: any[];
  taskSummary: SummaryItem[];
  recentTasks: TaskItem[];
};

type CollectionResponse<T> = {
  data: T[];
};

export function useDashboard(options?: SWRConfiguration<DashboardResponse>) {
  return useSWR<DashboardResponse>(
    API_ROUTES.dashboard,
    (url) => apiGet<DashboardResponse>(url),
    options
  );
}

export function useProjects(options?: SWRConfiguration<CollectionResponse<any>>) {
  return useSWR<CollectionResponse<any>>(
    API_ROUTES.projects,
    (url) => apiGet<CollectionResponse<any>>(url),
    options
  );
}

export function useTasks(projectId?: number, options?: SWRConfiguration<CollectionResponse<TaskItem>>) {
  const key = projectId ? `${API_ROUTES.tasks}?project_id=${projectId}` : API_ROUTES.tasks;
  return useSWR<CollectionResponse<TaskItem>>(
    key,
    (url) => apiGet<CollectionResponse<TaskItem>>(url),
    options
  );
}
