import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  loading: false,
  error: '',
};

export const listProducts = createAsyncThunk(
  'products/listProducts',
  async () => {
    return await axios.get('/api/products').then((response) => response.data);
  }
);

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(listProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(listProducts.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.response && action.error.response.data.message
          ? action.error.response.data.message
          : action.error.message;
    });
  },
});

export const productListReducer = productListSlice.reducer;
