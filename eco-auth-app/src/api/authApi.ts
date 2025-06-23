import axios from 'axios';
import { toast } from 'react-hot-toast';
import { User } from '../features/auth/authTypes';

const API_URL = 'http://127.0.0.1:5000/eco/auth';

export const registerUser = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  tel?: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    toast.error('Registration failed. Please try again.');
    throw error;
  }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    toast.error('Login failed. Please check your credentials.');
    throw error;
  }
};