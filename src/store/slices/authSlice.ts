import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type { User, AuthResponse } from '../../types/authTypes';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<AuthResponse>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      localStorage.setItem('token', action.payload.data.token);
      localStorage.setItem('user', JSON.stringify(action.payload.data.user));
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<AuthResponse>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      localStorage.setItem('token', action.payload.data.token);
      localStorage.setItem('user', JSON.stringify(action.payload.data.user));
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;