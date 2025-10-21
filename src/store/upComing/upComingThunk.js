// src/store/upComing/upComingThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUpcomingMovies } from './upComingAPI';

export const fetchUpcomingMovies = createAsyncThunk(
  'upComing/fetchUpcomingMovies',
  async (page = 1, { rejectWithValue }) => {
    try {
      const data = await getUpcomingMovies(page);
      return { movies: data, page };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
