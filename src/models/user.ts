import { PaginationParams } from './common';

// ----------------------------------------------------------------------

export interface User {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  position: string;
  phoneNumber: string;
  region: string;
  address: string;
  isInstructor: boolean;
  emailVerified: boolean;
  isBanned: boolean;
  isApply: boolean;
  isAdmin: boolean;

  createdAt?: number;
  updatedAt?: number;
}

export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: Partial<User>;
  accessToken: string;
  refreshToken: string;
}

export interface MyAccount {
  user: Partial<User>;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface AccessToken {
  accessToken: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export interface UsersResponse {
  users: Partial<User>[];
  pagination: PaginationParams;
}

export interface InstructorsResponse {
  instructors: Partial<User>[];
  pagination: PaginationParams;
}
