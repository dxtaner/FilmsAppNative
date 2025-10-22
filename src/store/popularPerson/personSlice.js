import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularPersonsThunk } from './personThunk';

const initialState = {
  popularPersons: [],
  loading: false,
  error: null,
};

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPopularPersonsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularPersonsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.popularPersons = action.payload;
      })
      .addCase(fetchPopularPersonsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Bir hata oluştu';
      });
  },
});

export default personSlice.reducer;
