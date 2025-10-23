// store/searchPerson/searchPersonThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchPersonAPI } from './searchPersonAPI';

export const fetchSearchPersonThunk = createAsyncThunk(
  'searchPerson/fetchSearchPerson',
  async query => {
    if (!query.trim()) return [];
    const data = await searchPersonAPI(query);
    return data;
  },
);
