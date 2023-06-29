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
