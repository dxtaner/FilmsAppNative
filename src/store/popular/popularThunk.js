// src/store/popular/popularThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularMovies } from './popularAPI';

// Async thunk: popüler filmleri API'den sayfa bazlı çekiyoruz
export const getPopular = createAsyncThunk(
  'popular/getPopularMovies',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const currentPage = state.popular.currentPage || 1;
      const data = await getPopularMovies(currentPage);
      return data; // API'den dönen tüm response (page, results, total_pages...)
    } catch (error) {
      // API hatasını Redux state içine geçirelim
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
