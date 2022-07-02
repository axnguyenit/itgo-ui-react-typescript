import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sum, unionBy } from 'lodash';
import { cartApi } from '~/api';
import { CartData, CartItem, Course } from '~/models';
import { RootState } from '../store';

// ----------------------------------------------------------------------

interface Cart {
  activeStep: number;
  cart: CartItem[];
  subtotal: number;
  total: number;
}

interface AddToCartProps {
  data: CartData;
  course: Course;
}

const initialState: Cart = {
  activeStep: 0,
  cart: [],
  subtotal: 0,
  total: 0,
};

export const getCartFromServer = createAsyncThunk('cart/getCart', async () => {
  const { cartItems } = await cartApi.get();
  return cartItems;
});

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (param: AddToCartProps) => {
    const { data, course } = param;
    const { cartItem } = await cartApi.add(data);
    return {
      _id: cartItem._id,
      cartId: cartItem.cartId,
      course,
    };
  },
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (id: string) => {
    await cartApi.removeItem(id);
    return id;
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // CHECKOUT
    getCart(state: Cart, action: PayloadAction<CartItem[]>) {
      const cart = action.payload;
      const subtotal = sum(
        cart.map(
          (cartItem) => cartItem.course.priceSale || cartItem.course.price,
        ),
      );

      state.cart = cart;
      state.subtotal = subtotal;
      state.total = subtotal;
    },

    resetCart(state: Cart) {
      state.activeStep = 0;
      state.cart = [];
      state.total = 0;
      state.subtotal = 0;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartFromServer.fulfilled, (state, { payload }) => {
        state.cart = payload;
      })
      .addCase(removeCartItem.fulfilled, (state, { payload }) => {
        const updateCart = state.cart.filter((item) => item._id !== payload);
        state.cart = updateCart;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        const course = payload;
        state.cart = unionBy([...state.cart, course], '_id');
      });
  },
});

export const selectCart = (state: RootState) => state.cart;
export const { getCart, onBackStep, onGotoStep, onNextStep, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
