// src/store/upComing/upComingSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchUpcomingMovies } from './upComingThunk';

const initialState = {
  movies: [],
  page: 1,
  loading: false,
  error: null,
};

const upComingSlice = createSlice({
  name: 'upComing',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUpcomingMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.loading = false;
        // Eğer sayfalama yapıyorsan önceki veriyi koru
        state.movies =
          action.payload.page === 1
            ? action.payload.movies
            : [...state.movies, ...action.payload.movies];
        state.page = action.payload.page;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default upComingSlice.reducer;
