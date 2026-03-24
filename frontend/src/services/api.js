// src/services/api.js
const API_URL = 'http://localhost:5000/api'; // Ajuste se seu backend estiver em outra porta

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
  const config = {
    ...options,
    credentials: 'include', // Essencial para HTTP-only cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
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
    const data = await apiFetch(`/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });

    return normalizeGoal(data.goal);
  },

  async delete(id) {
    return apiFetch(`/goals/${id}`, {
      method: 'DELETE'
    });
  }
};

// USER
export const userService = {
  async updateProfile(name, email) {
    const data = await apiFetch('/user/profile', {
      method: 'PUT',
      body: JSON.stringify({ name, email })
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
  }
};

// STATS
export const statsService = {
  async get(period = 'month') {
    const data = await apiFetch(`/goals/stats/all?period=${period}`);
    return data.stats;
  }
};