// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import popularReducer from './popular/popularSlice';
import topRatedReducer from './topRated/topRatedSlice';
import movieDetailReducer from './movie/movieDetailSlice';
import personDetailReducer from './person/personDetailSlice';

export const store = configureStore({
  reducer: {
    popular: popularReducer,
    topRated: topRatedReducer,
    movieDetail: movieDetailReducer,
    personDetail: personDetailReducer,
  },
});
