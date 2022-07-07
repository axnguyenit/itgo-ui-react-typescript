import { Course } from './course';
import { Payment } from './payment';

// ----------------------------------------------------------------------

export interface OrderItem {
  id?: string;
  orderId: string;
  userId: string;
  course: Partial<Course>;
  price: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface Order {
  id?: string;
  userId: string;
  total: number;
  paymentId: Payment;

  createdAt?: Date;
  updatedAt?: Date;
}
