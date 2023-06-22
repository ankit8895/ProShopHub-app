import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productListReducer } from './reducers/productReducers';
const preloadedState = {};

export const store = configureStore({
  reducer: {
    productList: productListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
  preloadedState,
});

export default store;
