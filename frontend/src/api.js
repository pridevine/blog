const API_BASE = import.meta.env.VITE_API_BASE || '';

async function request(path, opts = {}) {
  const res = await fetch(API_BASE + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  const text = await res.text();
  let body;
  try { body = text ? JSON.parse(text) : null; } catch(e) { body = text; }
  if (!res.ok) {
    const err = new Error(body?.error || res.statusText || 'Request failed');
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

export const api = {
  getMe: () => request('/api/me'),
  getDashboard: () => request('/api/me/dashboard'),
  getPosts: () => request('/api/posts'),
  getPost: (id) => request(`/api/posts/${id}`),
  createPost: (data) => request('/api/posts', { method: 'POST', body: JSON.stringify(data) }),
  updatePost: (id, data) => request(`/api/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePost: (id) => request(`/api/posts/${id}`, { method: 'DELETE' }),
  likePost: (id) => request(`/api/posts/${id}/like`, { method: 'POST' }),
  unlikePost: (id) => request(`/api/posts/${id}/unlike`, { method: 'POST' }),
  getComments: (id) => request(`/api/posts/${id}/comments`),
  addComment: (id, content) => request(`/api/posts/${id}/comments`, { method: 'POST', body: JSON.stringify({ content }) }),
  logout: () => request('/auth/logout', { method: 'POST' })
};
