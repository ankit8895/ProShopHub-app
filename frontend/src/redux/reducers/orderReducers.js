import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions } from './cartReducers';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order, { getState }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    return data;
  }
);

const orderCreateSlice = createSlice({
  name: 'orderCreate',
  initialState: {
    loading: false,
    success: false,
    order: {},
    error: '',
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    });
    builder.addCase(createOrder, (state, action) => {
      state.loading = false;
      state.error =
        action.error.response && action.error.response.data.message
          ? action.error.response.data.message
          : action.error.message;
    });
  },
});

export const orderCreateReducer = orderCreateSlice.reducer;

export const getOrderDetails = createAsyncThunk(
  'order/orderDetails',
  async (order, { getState }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    return data;
  }
);

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {
    loading: false,
    orderItems: [],
    shippingAddress: {},
    error: '',
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      const { orderItems, shippingAddress } = action.payload;
      state.loading = false;
      state.orderItems = orderItems;
      state.shippingAddress = shippingAddress;
    });
    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.response && action.error.response.data.message
          ? action.error.response.data.message
          : action.error.message;
    });
  },
});

export const orderDetailsReducer = orderDetailsSlice.reducer;
