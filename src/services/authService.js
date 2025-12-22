import { authAPI } from './api';

export const signUp = async (userData) => {
  try {
    const response = await authAPI.signup(userData);
    const { token, user } = response.data;

    // Store token and user data in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user_data', JSON.stringify(user));

    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Sign up failed');
  }
};

export const signIn = async (credentials) => {
  try {
    const response = await authAPI.login(credentials);
    const { token } = response.data;

    // Store token in localStorage
    localStorage.setItem('token', token);

    // Decode the JWT to get user data (basic decoding without verification)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const user = payload.payload; // Based on your backend structure: {"payload": {"username": "...", "id": ...}}

    localStorage.setItem('user_data', JSON.stringify(user));

    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.error || error.response?.data?.err || 'Sign in failed');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_data');
};

export const getStoredUser = () => {
  const userStr = localStorage.getItem('user_data');
  return userStr ? JSON.parse(userStr) : null;
};

export const getStoredToken = () => {
  return localStorage.getItem('token');
};
