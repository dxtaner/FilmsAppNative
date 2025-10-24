import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDiscoverMoviesApi } from './discoverMoviesApi';

export const fetchDiscoverMoviesThunk = createAsyncThunk(
  'discoverMovies/fetchDiscoverMovies',
  async (filters, { rejectWithValue }) => {
    try {
      const data = await fetchDiscoverMoviesApi(filters);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
