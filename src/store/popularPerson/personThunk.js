import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularPersons } from './personAPI';

export const fetchPopularPersonsThunk = createAsyncThunk(
  'person/fetchPopularPersons',
  async (page = 1, { rejectWithValue }) => {
    try {
      const results = await getPopularPersons(page);
      return results;
    } catch (error) {
      console.error('fetchPopularPersonsThunk error:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
