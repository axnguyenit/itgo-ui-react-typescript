import { Course } from './course';

// ----------------------------------------------------------------------

export interface Cart {
  _id: string;
  userId: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem {
  _id: string;
  cartId: string;
  course: Partial<Course>;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartResponse {
  cart: Cart;
  cartItems: CartItem[];
}

export interface AddToCartResponse {
  cartItem: {
    cartId: string;
    course: string;
    _id: string;

    createdAt: Date;
    updatedAt: Date;
  };
  msg: string;
}
