// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import popularReducer from './popular/popularSlice';
import topRatedReducer from './topRated/topRatedSlice';
import movieDetailReducer from './movie/movieDetailSlice';
import personDetailReducer from './person/personDetailSlice';
import upComingReducer from './upComing/upComingSlice';
import popularSeriesReducer from './popularSeries/popularSeriesSlice';
import topSeriesReducer from './topSeries/topSeriesSlice';
import authReducer from './auth/authSlice';
import accountReducer from './account/accountSlice';
import personReducer from './popularPerson/personSlice';
import searchPersonReducer from './searchPerson/searchPersonSlice';
import discoverMoviesReducer from './discoverMovies/discoverMoviesSlice';
import searchMovieReducer from './searchMovie/searchMovieSlice';
import seriesReducer from './series/seriesSlice';

export const store = configureStore({
  reducer: {
    popular: popularReducer,
    topRated: topRatedReducer,
    movieDetail: movieDetailReducer,
    personDetail: personDetailReducer,
    upComing: upComingReducer,
    popularSeries: popularSeriesReducer,
    topSeries: topSeriesReducer,
    auth: authReducer,
    account: accountReducer,
    person: personReducer,
    searchPerson: searchPersonReducer,
    discoverMovies: discoverMoviesReducer,
    searchMovie: searchMovieReducer,
    series: seriesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
