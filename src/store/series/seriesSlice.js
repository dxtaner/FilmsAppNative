import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSeriesDetails,
  fetchSeriesCredits,
  fetchSeriesExternalIds,
  fetchSeriesImages,
  fetchSeriesKeywords,
  fetchSeriesReviews,
  fetchSeriesSimilar,
  fetchSeriesVideos,
  fetchSeriesWatchProviders,
} from './seriesThunk';

const initialState = {
  details: null,
  credits: null,
  externalIds: null,
  images: null,
  keywords: [],
  reviews: [],
  similar: [],
  videos: [],
  watchProviders: {},
  loading: false,
  error: null,
};

const seriesSlice = createSlice({
  name: 'series',
  initialState,
  reducers: {
    clearSeriesState: state => {
      state.details = null;
      state.credits = null;
      state.externalIds = null;
      state.images = null;
      state.keywords = [];
      state.reviews = [];
      state.similar = [];
      state.videos = [];
      state.watchProviders = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Details
      .addCase(fetchSeriesDetails.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSeriesDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchSeriesDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Credits
      .addCase(fetchSeriesCredits.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSeriesCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.credits = action.payload;
      })
      .addCase(fetchSeriesCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // External IDs
      .addCase(fetchSeriesExternalIds.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSeriesExternalIds.fulfilled, (state, action) => {
        state.loading = false;
        state.externalIds = action.payload;
      })
      .addCase(fetchSeriesExternalIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Images
      .addCase(fetchSeriesImages.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSeriesImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchSeriesImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Keywords
      .addCase(fetchSeriesKeywords.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSeriesKeywords.fulfilled, (state, action) => {
        state.loading = false;
        state.keywords = action.payload;
      })
      .addCase(fetchSeriesKeywords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reviews
      .addCase(fetchSeriesReviews.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSeriesReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchSeriesReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Similar
      .addCase(fetchSeriesSimilar.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSeriesSimilar.fulfilled, (state, action) => {
        state.loading = false;
        state.similar = action.payload;
      })
      .addCase(fetchSeriesSimilar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Videos
      .addCase(fetchSeriesVideos.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSeriesVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchSeriesVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Watch Providers
      .addCase(fetchSeriesWatchProviders.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSeriesWatchProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.watchProviders = action.payload;
      })
      .addCase(fetchSeriesWatchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSeriesState } = seriesSlice.actions;
export default seriesSlice.reducer;
