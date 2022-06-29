import { PaginationParams } from '.';
import { User } from '.';

// ----------------------------------------------------------------------

export interface Application {
  _id?: string;
  id?: string;
  user?: string;
  position: string;
  cv: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export type ApplicationDetails = Application & {
  user: Partial<User>;
};

export interface ApplicationResponse {
  applications: ApplicationDetails[];
  pagination?: PaginationParams;
}
