import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const preloadedState = {};

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
  preloadedState,
});

export default store;
