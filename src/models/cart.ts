import { Course } from './course';

// ----------------------------------------------------------------------

export interface Cart {
  id: string;
  userId: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem {
  id: string;
  cartId: string;
  course: Course;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface AddToCartResponse {
  cartItem: {
    cartId: string;
    course: string;
    id: string;

    createdAt: Date;
    updatedAt: Date;
  };
  msg: string;
}
