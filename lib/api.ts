import type { ApiProject, ApiMarketplaceTool, PaginatedResponse } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new ApiError(text || `HTTP ${res.status}`, res.status);
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json() as Promise<T>;
  }
  return res.text() as unknown as T;
}

function buildUrl(path: string, params?: Record<string, string | number | undefined>): string {
  const url = new URL(path, API_BASE);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

/**
 * Wraps a fetch-based API call with graceful fallback.
 * When the backend is unreachable, returns the provided fallback value
 * instead of throwing — so the UI degrades gracefully rather than crashing.
 */
async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    // Only silence network errors (backend not running)
    if (err instanceof TypeError && err.message === "Failed to fetch") {
      // Backend not running — graceful degradation
      console.debug("[api] Backend unreachable, using fallback data");
      return fallback;
    }
    // Re-throw real API errors (4xx, 5xx) so pages can handle them
    throw err;
  }
}

export const api = {
  async get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
    return handleResponse<T>(
      await fetch(buildUrl(path, params), { credentials: "include" })
    );
  },

  /** GET with fallback — returns fallback when backend is down */
  async getSafe<T>(path: string, fallback: T, params?: Record<string, string | number | undefined>): Promise<T> {
    return safeFetch(() => api.get<T>(path, params), fallback);
  },

  async post<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(buildUrl(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(res);
  },

  /** POST with fallback */
  async postSafe<T>(path: string, body: unknown, fallback: T): Promise<T> {
    return safeFetch(() => api.post<T>(path, body), fallback);
  },

  async put<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(buildUrl(path), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(res);
  },

  async del<T>(path: string): Promise<T> {
    const res = await fetch(buildUrl(path), {
      method: "DELETE",
      credentials: "include",
    });
    return handleResponse<T>(res);
  },

  async *stream(path: string, body: unknown): AsyncGenerator<string> {
    const res = await fetch(buildUrl(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!res.ok || !res.body) {
      const text = await res.text();
      throw new ApiError(text || `HTTP ${res.status}`, res.status);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield decoder.decode(value, { stream: true });
      }
    } finally {
      reader.releaseLock();
    }
  },
};

export { ApiError };
