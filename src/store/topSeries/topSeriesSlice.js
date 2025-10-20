import { createSlice } from '@reduxjs/toolkit';
import { fetchTopSeries } from './topSeriesThunk';

const initialState = {
  series: [],
  loading: false,
  error: null,
};

const topSeriesSlice = createSlice({
  name: 'topSeries',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTopSeries.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.series = action.payload;
      })
      .addCase(fetchTopSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Bir hata oluştu';
      });
  },
});

export default topSeriesSlice.reducer;
