import useSWR from 'swr';
import { API_ROUTES } from './config';
import { apiGet, apiPost } from './api';

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type AuthResponse = {
  status: string;
  user?: User;
  message?: string;
  errors?: Record<string, string>;
};

export async function login(payload: { email: string; password: string }) {
  return apiPost<AuthResponse>(API_ROUTES.login, payload);
}

export async function register(payload: { name: string; email: string; password: string; password_confirmation: string }) {
  return apiPost<AuthResponse>(API_ROUTES.register, payload);
}

export async function logout() {
  return apiPost<{ status: string }>(API_ROUTES.logout);
}

export function useAuth() {
  const { data, mutate, error, isLoading } = useSWR<{ status: string; user?: User }>(API_ROUTES.me, apiGet, {
    shouldRetryOnError: false,
  });

  return {
    user: data?.user ?? null,
    isLoading,
    error,
    refresh: () => mutate(),
  };
}
