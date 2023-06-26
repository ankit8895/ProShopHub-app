import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('user/login', async (userData) => {
  const { email, password } = userData;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.post(
    '/api/users/login',
    { email, password },
    config
  );

  return data;
});

const initialState = {
  loading: false,
  userInfo: null,
  error: '',
};

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    userLogout: (state, action) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.response && action.error.response.data.message
          ? action.error.response.data.message
          : action.error.message;
    });
  },
});

export const userLoginReducer = userLoginSlice.reducer;
