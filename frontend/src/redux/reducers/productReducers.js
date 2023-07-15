import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const listProducts = createAsyncThunk(
  'products/listProducts',
  async (allProductsInfo, { rejectWithValue, fulfillWithValue }) => {
    const { keyword = '', pageNumber = '' } = allProductsInfo;

    try {
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
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

const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    products: [],
    page: 1,
    pages: 1,
    loading: false,
    error: '',
  },
  extraReducers: (builder) => {
    builder.addCase(listProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listProducts.fulfilled, (state, action) => {
      const { products, pages, page } = action.payload;
      state.loading = false;
      state.products = products;
      state.page = page;
      state.pages = pages;
    });
    builder.addCase(listProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const productListReducer = productListSlice.reducer;

export const listProductDetails = createAsyncThunk(
  'product/listProductDetails',
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);

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
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const productDetailsReducer = productDetailsSlice.reducer;

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
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
      const { data } = await axios.delete(`/api/products/${id}`, config);

      dispatch(listProducts());

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

const productDeleteSlice = createSlice({
  name: 'productDelete',
  initialState: {
    loading: false,
    success: false,
    error: '',
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const productDeleteReducer = productDeleteSlice.reducer;

export const createProduct = createAsyncThunk(
  'product/createProduct',
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
      const { data } = await axios.post(`/api/products`, {}, config);

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

const productCreateSlice = createSlice({
  name: 'productCreate',
  initialState: {
    loading: false,
    product: {},
    success: false,
    error: '',
  },
  reducers: {
    productCreateReset: (state, action) => {
      state.loading = false;
      state.product = {};
      state.success = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.success = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const productCreateReducer = productCreateSlice.reducer;
export const productCreateActions = productCreateSlice.actions;

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (product, { getState, rejectWithValue, fulfillWithValue }) => {
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
        `/api/products/${product._id}`,
        product,
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

const productUpdateSlice = createSlice({
  name: 'productUpdate',
  initialState: {
    loading: false,
    product: {},
    success: false,
    error: '',
  },
  reducers: {
    productUpdateReset: (state, action) => {
      state.loading = false;
      state.product = {};
      state.success = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.success = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const productUpdateReducer = productUpdateSlice.reducer;
export const productUpdateActions = productUpdateSlice.actions;

export const createProductReview = createAsyncThunk(
  'product/createProductReview',
  async (productInfo, { getState, rejectWithValue, fulfillWithValue }) => {
    const { id: productId, review } = productInfo;
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
      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        review,
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

const productReviewCreateSlice = createSlice({
  name: 'productReviewCreate',
  initialState: {
    loading: false,
    success: false,
    error: '',
  },
  reducers: {
    productCreateReviewReset: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProductReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductReview.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(createProductReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const productReviewCreateReducer = productReviewCreateSlice.reducer;
export const productReviewCreateActions = productReviewCreateSlice.actions;

export const listTopProducts = createAsyncThunk(
  'products/listTopProducts',
  async (arg, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/top`);

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

const productTopRatedSlice = createSlice({
  name: 'productTopRated',
  initialState: {
    loading: false,
    products: [],
    error: '',
  },
  extraReducers: (builder) => {
    builder.addCase(listTopProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listTopProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(listTopProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : action.error.message;
    });
  },
});

export const productTopRatedReducer = productTopRatedSlice.reducer;
