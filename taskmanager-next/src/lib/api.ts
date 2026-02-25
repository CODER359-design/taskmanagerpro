type RequestOptions = RequestInit & {
  json?: Record<string, unknown>;
};

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { json, headers, ...rest } = options;
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(headers ?? {}),
    },
    body: json ? JSON.stringify(json) : options.body,
    ...rest,
  });

  const contentType = response.headers.get('Content-Type') ?? '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(data?.message || 'Request failed');
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }

  return data as T;
}

export function apiGet<T = unknown>(url: string) {
  return request<T>(url, { method: 'GET' });
}

export function apiPost<T = unknown>(url: string, json?: Record<string, unknown>) {
  return request<T>(url, { method: 'POST', json });
}

export function apiDelete<T = unknown>(url: string, json?: Record<string, unknown>) {
  return request<T>(url, { method: 'DELETE', json });
}
