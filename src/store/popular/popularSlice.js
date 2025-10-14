import { createSlice } from '@reduxjs/toolkit';
import { getPopular } from './popularThunk';

const initialState = {
  items: [],
  currentPage: 1,
  loading: false,
  error: null,
};

const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {
    resetPopular: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getPopular.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopular.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.results) {
          state.items = [...state.items, ...action.payload.results];
          state.currentPage += 1;
        }
      })
      .addCase(getPopular.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetPopular } = popularSlice.actions;
export default popularSlice.reducer;
