import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const listProducts = createAsyncThunk(
  'products/listProducts',
  async () => {
    const { data } = await axios.get('/api/products');

    return data;
  }
);

const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    products: [],
    loading: false,
    error: '',
  },
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

export const listProductDetails = createAsyncThunk(
  'product/listProductDetails',
  async (id) => {
    return await axios
      .get(`/api/products/${id}`)
      .then((response) => response.data);
  }
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: {
    loading: false,
    product: {
      reviews: [],
    },
    error: '',
  },
  extraReducers: (builder) => {
    builder.addCase(listProductDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(listProductDetails, (state, action) => {
      state.loading = false;
      state.error =
        action.error.response && action.error.response.data.message
          ? action.error.response.data.message
          : action.error.message;
    });
  },
});

export const productDetailsReducer = productDetailsSlice.reducer;
