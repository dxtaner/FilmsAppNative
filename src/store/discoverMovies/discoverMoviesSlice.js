import { createSlice } from '@reduxjs/toolkit';
import { fetchDiscoverMoviesThunk } from './discoverMoviesThunk';

const initialState = {
  moviesData: null,
  loading: false,
  error: null,
};

const discoverMoviesSlice = createSlice({
  name: 'discoverMovies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDiscoverMoviesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscoverMoviesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesData = action.payload;
      })
      .addCase(fetchDiscoverMoviesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Bir hata oluştu.';
      });
  },
});

export default discoverMoviesSlice.reducer;
