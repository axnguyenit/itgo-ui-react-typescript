import { PaginationParams } from '.';

export interface Application {
  _id?: string;
  id?: string;
  user: string;
  position: string;
  cv: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApplicationResponse {
  applications: Application[];
  pagination?: PaginationParams;
}
