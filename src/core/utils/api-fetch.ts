export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

const ERROR_MESSAGES: Record<number, string> = {
  400: 'Invalid data',
  401: 'Please login again',
  403: 'You do not have permission to access this data',
  404: 'Data not found',
  409: 'Duplicate data',
  422: 'Invalid data, please check again',
  429: 'Too many requests, please wait',
  500: 'Server error, please try again later',
  503: 'System is under maintenance',
  504: 'Gateway timeout',
};

export async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let serverMessage: string | undefined;
    try {
      const body = await response.json();
      serverMessage = body?.message || body?.error?.msg || body?.msg;
    } catch {
      // ignore parse error
    }
    const message = serverMessage || ERROR_MESSAGES[response.status] || `HTTP ${response.status}`;
    throw new HttpError(response.status, message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
