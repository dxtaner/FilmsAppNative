import { createSlice } from '@reduxjs/toolkit';
import { searchMovieThunk } from './searchMovieThunk';

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const searchMovieSlice = createSlice({
  name: 'searchMovie',
  initialState,
  reducers: {
    clearMovies: state => {
      state.movies = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchMovieThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovieThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(searchMovieThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMovies } = searchMovieSlice.actions;
export { searchMovieThunk }; // ⚠ Burayı ekle
export default searchMovieSlice.reducer;
