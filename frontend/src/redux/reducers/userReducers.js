import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const login = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue, fulfillWithValue }) => {
    const { email, password } = userData;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
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

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    loading: false,
    userInfo: null,
    error: '',
  },
  reducers: {
    userLogout: (state, action) => {
      state.loading = false;
      state.userInfo = null;
      state.error = '';
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
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const userLoginReducer = userLoginSlice.reducer;
export const userLoginActions = userLoginSlice.actions;

export const register = createAsyncThunk(
  'user/register',
  async (userData, { dispatch, rejectWithValue, fulfillWithValue }) => {
    const { name, email, password } = userData;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      );

      dispatch(login({ email, password }));

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

const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    loading: false,
    userInfo: null,
    error: '',
  },
  reducers: {
    userRegisterReset: (state, action) => {
      state.loading = false;
      state.userInfo = null;
      state.error = '';
    },
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
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const userRegisterReducer = userRegisterSlice.reducer;
export const userRegisterActions = userRegisterSlice.actions;

export const getUserDetails = createAsyncThunk(
  'getUserDetails',
  async (id, { getState, rejectWithValue, fulfillWithValue }) => {
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
      const { data } = await axios.get(`/api/users/${id}`, config);

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

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    loading: false,
    user: {},
    error: '',
  },
  reducers: {
    userDetailsReset: (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = '';
    },
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
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const userDetailsReducer = userDetailsSlice.reducer;
export const userDetailsActions = userDetailsSlice.actions;

export const updateUserProfile = createAsyncThunk(
  'UpdateUserDetails',
  async (user, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
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
      const { data } = await axios.put(`/api/users/profile`, user, config);

      dispatch(login.fulfilled(data));

      localStorage.setItem('userInfo', JSON.stringify(data));
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

const userUpdateProfileSlice = createSlice({
  name: 'userUpdateProfile',
  initialState: {
    loading: false,
    userInfo: {},
    error: '',
    success: false,
  },
  reducers: {
    userUpdateProfileReset: (state, action) => {
      state.loading = false;
      state.userInfo = {};
      state.error = '';
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const userUpdateProfileReducer = userUpdateProfileSlice.reducer;
export const userUpdateProfileActions = userUpdateProfileSlice.actions;

export const listUsers = createAsyncThunk(
  'users/listUsers',
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
      const { data } = await axios.get(`/api/users`, config);

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

const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    loading: false,
    users: [],
    error: '',
  },
  reducers: {
    userListReset: (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(listUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const userListReducer = userListSlice.reducer;
export const userListActions = userListSlice.actions;

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      const { data } = await axios.delete(`/api/users/${id}`, config);

      dispatch(listUsers());

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

const userDeleteSlice = createSlice({
  name: 'userDelete',
  initialState: {
    loading: false,
    success: false,
    error: '',
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const userDeleteReducer = userDeleteSlice.reducer;

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
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
      const { data } = await axios.put(`/api/users/${user._id}`, user, config);

      dispatch(getUserDetails(data._id));

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

const userUpdateSlice = createSlice({
  name: 'userUpdate',
  initialState: {
    loading: false,
    user: {},
    success: false,
    error: '',
  },
  reducers: {
    userUpdateReset: (state, action) => {
      state.loading = false;
      state.user = {};
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const userUpdateReducer = userUpdateSlice.reducer;
export const userUpdateActions = userUpdateSlice.actions;
