import { User } from '.';

// ----------------------------------------------------------------------

export interface Application {
  id?: string;
  user?: Partial<User>;
  position: string;
  cv: string;

  createdAt?: Date;
  updatedAt?: Date;
}
