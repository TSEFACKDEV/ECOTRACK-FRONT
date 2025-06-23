export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  tel?: string;
  role: Role;
  isActive: boolean;
  resetToken?: string | null;
  resetExpires?: Date | null;
  createdAt: string;
  updatedAt: string;
}

export enum Role {
  ADMIN = "ADMIN",
  CITOYEN = "CITOYEN",
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}