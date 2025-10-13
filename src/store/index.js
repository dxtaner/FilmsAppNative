// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import popularReducer from './popular/popularSlice';
import topRatedReducer from './topRated/topRatedSlice';

export const store = configureStore({
  reducer: {
    popular: popularReducer,
    topRated: topRatedReducer,
  },
});
