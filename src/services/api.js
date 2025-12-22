import axios from 'axios';

const API_URL = "http://127.0.0.1:5000"; // Your Flask URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/sign-in', credentials),
  signup: (userData) => api.post('/auth/sign-up', userData),
  verify: () => api.post('/verify-token'), // specific logic if you have this route
};

export const postsAPI = {
  getAll: (params) => api.get('/api/posts', { params }), // supports ?page=1&limit=10
  create: (postData) => api.post('/api/posts', postData),
  getOne: (id) => api.get(`/api/posts/${id}`),
  delete: (id) => api.delete(`/api/posts/${id}`),
  like: (id, config) => {
    if (config?.method === 'DELETE') {
      return api.delete(`/api/posts/${id}/like`);
    }
    return api.post(`/api/posts/${id}/like`);
  },
  suggestTags: (content) => api.post('/api/posts/suggest-tags', { content }),
};

export default api;