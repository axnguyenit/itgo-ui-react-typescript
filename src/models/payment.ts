import { CartItem } from './cart';
import { User } from './user';

// ----------------------------------------------------------------------

export interface Payment {
  id?: string;
  userId?: User;
  provider?: string;
  transId: string;
  message: string;
  amount: number;
  resultCode?: string;
  cart?: CartItem[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaymentURL {
  payUrl: string;
}
