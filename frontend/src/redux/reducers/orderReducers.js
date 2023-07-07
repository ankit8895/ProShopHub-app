import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  async (id, { getState }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
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
    loading: true,
    order: {},
    error: '',
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
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

export const payOrder = createAsyncThunk(
  'order/payOrder',
  async (orderInfo, { getState }) => {
    const { id, paymentResult } = orderInfo;
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    );

    return data;
  }
);

const orderPaySlice = createSlice({
  name: 'orderPay',
  initialState: {
    loading: false,
    success: false,
    error: '',
  },
  reducers: {
    payOrderReset: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(payOrder.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(payOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(payOrder.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error =
        action.error.response && action.error.response.data.message
          ? action.error.response.data.message
          : action.error.message;
    });
  },
});

export const orderPayReducer = orderPaySlice.reducer;
export const actions = orderPaySlice.actions;
