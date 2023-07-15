import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order, { getState, rejectWithValue, fulfillWithValue }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      const { data } = await axios.post(`/api/orders`, order, config);

      return fulfillWithValue(data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw rejectWithValue(error.response.data.message);
      } else {
        throw rejectWithValue(error.message);
      }
    }
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
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const orderCreateReducer = orderCreateSlice.reducer;

export const getOrderDetails = createAsyncThunk(
  'order/orderDetails',
  async (id, { getState, rejectWithValue, fulfillWithValue }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      const { data } = await axios.get(`/api/orders/${id}`, config);

      return fulfillWithValue(data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw rejectWithValue(error.response.data.message);
      } else {
        throw rejectWithValue(error.message);
      }
    }
  }
);

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {
    loading: true,
    order: {},
    error: '',
  },
  reducers: {
    orderDetailsReset: (state, action) => {
      state.loading = true;
      state.order = {};
      state.error = '';
    },
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
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const orderDetailsReducer = orderDetailsSlice.reducer;
export const orderDetailsActions = orderDetailsSlice.actions;

export const payOrder = createAsyncThunk(
  'order/payOrder',
  async (orderInfo, { getState, rejectWithValue, fulfillWithValue }) => {
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

    try {
      const { data } = await axios.put(
        `/api/orders/${id}/pay`,
        paymentResult,
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw rejectWithValue(error.response.data.message);
      } else {
        throw rejectWithValue(error.message);
      }
    }
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
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const orderPayReducer = orderPaySlice.reducer;
export const orderPayActions = orderPaySlice.actions;

export const deliverOrder = createAsyncThunk(
  'order/deliverOrder',
  async (order, { getState, rejectWithValue, fulfillWithValue }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        config
      );

      return fulfillWithValue(data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw rejectWithValue(error.response.data.message);
      } else {
        throw rejectWithValue(error.message);
      }
    }
  }
);

const orderDeliverSlice = createSlice({
  name: 'orderDeliver',
  initialState: {
    loading: false,
    success: false,
    error: '',
  },
  reducers: {
    orderDeliverReset: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deliverOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deliverOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deliverOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const orderDeliverReducer = orderDeliverSlice.reducer;
export const orderDeliverActions = orderDeliverSlice.actions;

export const listMyOrders = createAsyncThunk(
  'allOrders/listMyOrders',
  async (arg, { getState, rejectWithValue, fulfillWithValue }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      const { data } = await axios.get(`/api/orders/myorders`, config);

      return fulfillWithValue(data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw rejectWithValue(error.response.data.message);
      } else {
        throw rejectWithValue(error.message);
      }
    }
  }
);

const orderListMySlice = createSlice({
  name: 'orderListMy',
  initialState: {
    loading: false,
    orders: [],
    error: '',
  },
  reducers: {
    orderListMyReset: (state, action) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listMyOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listMyOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(listMyOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const orderListMyReducer = orderListMySlice.reducer;
export const orderListMyActions = orderListMySlice.actions;

export const listOrders = createAsyncThunk(
  'allOrders/listOrders',
  async (arg, { getState, rejectWithValue, fulfillWithValue }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      const { data } = await axios.get(`/api/orders`, config);

      return fulfillWithValue(data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw rejectWithValue(error.response.data.message);
      } else {
        throw rejectWithValue(error.message);
      }
    }
  }
);

const orderListSlice = createSlice({
  name: 'orderList',
  initialState: {
    loading: false,
    orders: [],
    error: '',
  },
  extraReducers: (builder) => {
    builder.addCase(listOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(listOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const orderListReducer = orderListSlice.reducer;
