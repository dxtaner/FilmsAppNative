import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularSeries } from './popularSeriesAPI';

export const fetchPopularSeries = createAsyncThunk(
  'popularSeries/fetchPopularSeries',
  async (page = 1, { rejectWithValue }) => {
    try {
      const data = await getPopularSeries(page);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
