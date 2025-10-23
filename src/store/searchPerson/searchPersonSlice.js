// store/searchPerson/searchPersonSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchPersonThunk } from './searchPersonThunks';

const initialState = {
  searchResults: [],
  loading: false,
  error: null,
};

const searchPersonSlice = createSlice({
  name: 'searchPerson',
  initialState,
  reducers: {
    clearSearchResults: state => {
      state.searchResults = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchPersonThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchPersonThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchPersonThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSearchResults } = searchPersonSlice.actions;
export default searchPersonSlice.reducer;
