const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function getToken() {
  return localStorage.getItem('token');
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Greška na serveru');
  }

  return data;
}

export const api = {
  register: (body) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request('/api/auth/me'),
  getMatches: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/api/matches${query ? `?${query}` : ''}`);
  },
  savePrediction: (matchId, payload) =>
    request(`/api/predictions/${matchId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  getMyPredictions: () => request('/api/predictions/me'),
  getUserPredictions: (userId) => request(`/api/predictions/user/${userId}`),
  getLeaderboard: () => request('/api/leaderboard'),
  getStandings: () => request('/api/standings'),
};
