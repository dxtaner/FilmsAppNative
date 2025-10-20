import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularSeries } from './popularSeriesThunk';

const popularSeriesSlice = createSlice({
  name: 'popularSeries',
  initialState: {
    series: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPopularSeries.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.series = action.payload;
      })
      .addCase(fetchPopularSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default popularSeriesSlice.reducer;
