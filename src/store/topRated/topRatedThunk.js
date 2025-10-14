// src/store/topRated/topRatedThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTopRatedMovies } from './topRatedAPI.js';

export const getTopMovies = createAsyncThunk(
  'movies/getTopMovies',
  async (_, { getState }) => {
    try {
      const state = getState();
      const currentPage = state.topRated.currentPage;
      const response = await getTopRatedMovies(currentPage);
      return response;
    } catch (error) {
      console.error('En yüksek puanlı filmler getirilirken hata:', error);
      throw error;
    }
  },
);
