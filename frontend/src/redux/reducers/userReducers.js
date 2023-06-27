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

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    loading: false,
    userInfo: null,
    error: '',
  },
  reducers: {
    userLogout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
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
export const actions = userLoginSlice.actions;

export const register = createAsyncThunk(
  'user/register',
  async (userData, { dispatch }) => {
    const { name, email, password } = userData;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch(login({ email, password }));

    return data;
  }
);

const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    loading: false,
    userInfo: null,
    error: '',
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.response && action.error.response.data.message
          ? action.error.response.data.message
          : action.error.message;
    });
  },
});

export const userRegisterReducer = userRegisterSlice.reducer;

export const getUserDetails = createAsyncThunk(
  'user/register',
  async (id, { getState }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    return data;
  }
);

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    loading: false,
    user: {},
    error: '',
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.response && action.error.response.data.message
          ? action.error.response.data.message
          : action.error.message;
    });
  },
});

export const userDetailsReducer = userDetailsSlice.reducer;
