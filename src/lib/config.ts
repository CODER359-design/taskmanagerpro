export const API_BASE_URL = 'https://taskmanagerpro.fwh.is';

export const API_ROUTES = {
  login: `${API_BASE_URL}/api/auth/login`,
  register: `${API_BASE_URL}/api/auth/register`,
  me: `${API_BASE_URL}/api/auth/me`,
  logout: `${API_BASE_URL}/api/auth/logout`,
  projects: `${API_BASE_URL}/api/projects`,
  tasks: `${API_BASE_URL}/api/tasks`,
  dashboard: `${API_BASE_URL}/api/dashboard`,
  reorderTasks: `${API_BASE_URL}/api/tasks/reorder`,
};

export const BRAND = {
  name: 'TaskManager Pro',
  slogan: 'Momentum for modern teams',
};
