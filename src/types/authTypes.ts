export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  tel?: string;
  role: 'ADMIN' | 'CITOYEN';
  isActive: boolean;
  resetToken?: string | null;
  resetExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  meta: {
    status: number;
    message: string;
  };
  data: {
    user: User;
    token: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  tel?: string;
}