import axios from 'axios';
import type { AuthResponse, RegisterCredentials, LoginCredentials } from '../types/AuthTypes';



const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/eco',
  headers: {
    'Content-Type': 'application/json',
  },
});
// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.assign('/login');
    }
    return Promise.reject(error);
  }
);

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await api.post('auth/register', credentials);
  return response.data;
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post('auth/login', credentials);
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export default api;