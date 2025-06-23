import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout as logoutAction,
} from '../store/slices/authSlice';
import type { LoginCredentials, RegisterCredentials } from '../types/AuthTypes';
import { login, register, logout } from '../utils/api';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      dispatch(loginStart());
      const response = await login(credentials);
      dispatch(loginSuccess(response));
      return response;
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err?.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      throw err;
    }
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    try {
      dispatch(registerStart());
      const response = await register(credentials);
      dispatch(registerSuccess(response));
      return response;
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err?.message || 'Registration failed';
      dispatch(registerFailure(errorMessage));
      throw err;
    }
  };

  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};