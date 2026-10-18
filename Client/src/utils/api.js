/** Backend origin from env (no trailing slash). Empty = same-origin / Vite proxy. */
export const API_ORIGIN = (
  import.meta.env.VITE_REACT_APP_BACKEND_URL || ''
).replace(/\/$/, '');

/** Build a full API URL, e.g. apiUrl('/api/jobs') */
export function apiUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_ORIGIN}${normalized}`;
}
