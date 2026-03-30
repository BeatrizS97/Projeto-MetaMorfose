// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

if (import.meta.env.PROD && API_URL.startsWith('http://')) {
  throw new Error('VITE_API_URL deve usar HTTPS em produção.');
}

let csrfTokenCache = null;

const CSRF_EXEMPT_URLS = new Set([
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/csrf-token',
]);

const shouldAttachCsrf = (method, url) => {
  const normalizedMethod = (method || 'GET').toUpperCase();
  const isMutatingMethod = normalizedMethod === 'POST' || normalizedMethod === 'PUT' || normalizedMethod === 'PATCH' || normalizedMethod === 'DELETE';
  return isMutatingMethod && !CSRF_EXEMPT_URLS.has(url);
};

const ensureCsrfToken = async () => {
  if (csrfTokenCache) {
    return csrfTokenCache;
  }

  const response = await fetch(`${API_URL}/auth/csrf-token`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Não foi possível obter token CSRF');
  }

  const data = await response.json();
  csrfTokenCache = data?.csrfToken || null;
  return csrfTokenCache;
};

const normalizeGoal = (goal) => {
  if (!goal) return goal;

  const goalId = goal.id ?? goal._id;

  return {
    ...goal,
    id: goalId != null ? String(goalId) : undefined,
  };
};

// Função auxiliar para requisições com cookies
const apiFetch = async (url, options = {}) => {
  const method = (options.method || 'GET').toUpperCase();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (shouldAttachCsrf(method, url)) {
    const csrfToken = await ensureCsrfToken();
    if (csrfToken) {
      headers['x-csrf-token'] = csrfToken;
    }
  }

  const config = {
    ...options,
    credentials: 'include', // Essencial para HTTP-only cookies
    method,
    headers,
  };

  const response = await fetch(`${API_URL}${url}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }));

    // Back-end pode retornar { error } ou { errors: [{ msg }] } em validações.
    const validationMessage = Array.isArray(errorData.errors) && errorData.errors.length > 0
      ? errorData.errors[0]?.msg
      : null;

    throw new Error(errorData.error || validationMessage || 'Erro na requisição');
  }

  return response.json();
};

// AUTH
export const authService = {
  async register(email, password, name) {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, consentLGPD: 'true' })
    });

    return data.user;
  },

  async login(email, password) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    return data.user;
  },

  async verify() {
    const data = await apiFetch('/auth/verify'); // Sem headers, só credentials
    return data.user;
  },

  async logout() {
    csrfTokenCache = null;
    return apiFetch('/auth/logout', {
      method: 'POST'
    });
  },

  async forgotPassword(email) {
    return apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }
};

// GOALS
export const goalsService = {
  async getAll(category) {
    const url = category ? `/goals?category=${category}` : '/goals';
    const data = await apiFetch(url);
    return (data.goals || []).map(normalizeGoal);
  },

  async create(goalData) {
    const data = await apiFetch('/goals', {
      method: 'POST',
      body: JSON.stringify(goalData)
    });

    return normalizeGoal(data.goal);
  },

  async update(id, updates) {
    const data = await apiFetch(`/goals?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    return normalizeGoal(data.goal);
  },

  async delete(id) {
    return apiFetch(`/goals?id=${id}`, {
      method: 'DELETE'
    });
  }
};

// USER
export const userService = {
  async updateProfile(name, email, avatar) {
    const data = await apiFetch('/user/profile', {
      method: 'PUT',
      body: JSON.stringify({ name, email, avatar })
    });

    return data.user;
  },

  async changePassword(currentPassword, newPassword) {
    return apiFetch('/user/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword })
    });
  },

  async deleteAccount(password) {
    return apiFetch('/user/account', {
      method: 'DELETE',
      body: JSON.stringify({ password })
    });
  },

  async exportData(password) {
    const data = await apiFetch('/user/export', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    return data.data;
  }
};

// STATS
export const statsService = {
  async get(period = 'month') {
    const data = await apiFetch(`/goals/stats/all?period=${period}`);
    return data.stats;
  }
};