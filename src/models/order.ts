import { PaginationParams } from '.';
import { Course } from './course';
import { Payment } from './payment';

// ----------------------------------------------------------------------

export interface OrderItem {
  _id?: string;
  id?: string;
  orderId: string;
  userId: string;
  course: Partial<Course>;
  price: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface Order {
  _id?: string;
  id?: string;
  userId: string;
  total: number;
  paymentId: Payment;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderResponse {
  orders: OrderItem[];
  pagination?: PaginationParams;
}
