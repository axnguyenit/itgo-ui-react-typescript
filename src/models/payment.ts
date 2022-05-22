import { User } from './user';

export interface Payment {
  _id?: string;
  id?: string;
  userId?: User;
  provider?: string;
  transId: string;
  message: string;
  amount: number;

  createdAt?: Date;
  updatedAt?: Date;
}
