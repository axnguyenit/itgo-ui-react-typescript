import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const getCartFromServer = createAsyncThunk(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const { cartItems } = await cartApi.get();
      return cartItems;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (params: AddToCartProps, { rejectWithValue }) => {
    try {
      const { data, course } = params;
      const { cartItem } = await cartApi.add(data);
      const { cartId, id } = cartItem;

      return { id, cartId, course };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (id: string) => {
    await cartApi.removeItem(id);
    return id;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // CHECKOUT
    getCart(state: Cart, action: PayloadAction<CartItem[]>) {
      const cart = action.payload;

      const subtotal = cart.reduce(
        (total, cartItem) =>
          total +
          (cartItem.course.priceSale ? cartItem.course.priceSale : cartItem.course.price),
        0
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
        const updateCart = state.cart.filter((item) => item.id !== payload);
        state.cart = updateCart;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        const course = payload;
        state.cart = [...state.cart, course];
      });
  },
});

export const selectCart = (state: RootState) => state.cart;
export const { getCart, onBackStep, onGotoStep, onNextStep, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
