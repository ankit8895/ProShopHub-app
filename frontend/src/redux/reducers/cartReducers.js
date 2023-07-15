import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addToCart = createAsyncThunk(
  'addToCart',
  async (productData, { getState, rejectWithValue, fulfillWithValue }) => {
    const { id, qty } = productData;

    try {
      const { data } = await axios.get(`/api/products/${id}`);

      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );

      return fulfillWithValue({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw rejectWithValue(error.response.data.message);
      } else {
        throw rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  loading: false,
  cartItems: [],
  shippingAddress: {},
  paymentMethod: '',
  error: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      state.cartItems.splice(action.payload, 1);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
