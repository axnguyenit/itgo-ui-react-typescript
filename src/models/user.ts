import { PaginationParams } from './common';

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

export interface RegisterType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ChangePasswordType {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UsersResponse {
  users: Partial<User>[];
  pagination: PaginationParams;
}

export interface InstructorsResponse {
  instructors: Partial<User>[];
  pagination: PaginationParams;
}
