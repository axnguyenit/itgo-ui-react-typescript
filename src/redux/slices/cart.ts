// import { cartApi } from '@/api';
// import { useAppDispatch } from '@/hooks';
import { CartItem } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sum, unionBy } from 'lodash';
import { RootState } from '../store';

interface Cart {
  activeStep: number;
  cart: Partial<CartItem>[];
  subtotal: number;
  total: number;
  discount: number;
}

const initialState: Cart = {
  activeStep: 0,
  cart: [],
  subtotal: 0,
  total: 0,
  discount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // CHECKOUT
    getCart(state: Cart, action: PayloadAction<CartItem[]>) {
      const cart = action.payload;

      const subtotal = sum(
        cart.map(
          (cartItem) => cartItem.course.priceSale || cartItem.course.price
        )
      );
      const discount = cart.length === 0 ? 0 : state.discount;

      state.cart = cart;
      state.discount = discount;
      state.subtotal = subtotal;
      state.total = subtotal - discount;
    },

    addToCart: (state: Cart, action: PayloadAction<CartItem>) => {
      const course = action.payload;
      state.cart = unionBy([...state.cart, course], '_id');
    },

    setCart(state: Cart, action: PayloadAction<CartItem[]>) {
      state.cart = action.payload;
    },

    deleteCart(state: Cart, action: PayloadAction<string>) {
      const updateCart = state.cart.filter(
        (item) => item._id !== action.payload
      );
      state.cart = updateCart;
    },

    resetCart(state: Cart) {
      state.activeStep = 0;
      state.cart = [];
      state.total = 0;
      state.subtotal = 0;
      state.discount = 0;
    },

    onBackStep(state: Cart) {
      state.activeStep -= 1;
    },

    onNextStep(state: Cart) {
      state.activeStep += 1;
    },

    onGotoStep(state: Cart, action: PayloadAction<number>) {
      const goToStep = action.payload;
      state.activeStep = goToStep;
    },

    applyDiscount(state: Cart, action: PayloadAction<number>) {
      const discount = action.payload;
      state.discount = discount;
      state.total = state.subtotal - discount;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const {
  addToCart,
  getCart,
  applyDiscount,
  deleteCart,
  onBackStep,
  onGotoStep,
  onNextStep,
  resetCart,
  setCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// eslint-disable-next-line react-hooks/rules-of-hooks
// const dispatch = useAppDispatch();

// export async function getCartFromServer() {
//   try {
//     const response = await cartApi.get();
//     dispatch(setCart(response.cartItems));
//   } catch (error) {
//     console.error(error);
//   }
// }
