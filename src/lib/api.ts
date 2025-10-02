// src/lib/api.ts
export const API_BASE =
  (import.meta.env.VITE_API_URL as string)?.replace(/\/+$/, '') ||
  'https://web-restaurant-backend-rexh.onrender.com';

export async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const url = `${API_BASE}${path}`;
  let res: Response;

  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (e: any) {
    // Most common: CORS blocked or offline
    throw new Error(`Network/CORS error talking to ${url}. ${e?.message ?? ''}`.trim());
  }

  const ct = res.headers.get('content-type') || '';
  const payload = ct.includes('application/json')
    ? await res.json().catch(() => ({}))
    : await res.text();

  if (!res.ok) {
    const msg = typeof payload === 'string'
      ? payload
      : payload?.message || payload?.error || res.statusText;
    throw new Error(`HTTP ${res.status} — ${msg}`);
  }

  return payload as T;
}
