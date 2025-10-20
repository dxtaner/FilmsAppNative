import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTopSeries } from './topSeriesAPI.js';

export const fetchTopSeries = createAsyncThunk(
  'topSeries/fetchTopSeries',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getTopSeries();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
