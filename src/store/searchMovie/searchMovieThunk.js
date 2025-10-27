import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchMovieAPI } from './searchMovieAPI';

export const searchMovieThunk = createAsyncThunk(
  'searchMovie/fetchMovies',
  async (query, thunkAPI) => {
    try {
      const movies = await searchMovieAPI(query);
      return movies;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
