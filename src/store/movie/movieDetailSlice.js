// src/store/movie/movieDetailSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchMovieDetail } from './movieDetailThunk';

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState: {
    movie: null,
    similar: [],
    credits: null,
    images: null,
    providers: null,
    reviews: [],
    keywords: [],
    videos: [],
    externalIds: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearMovieDetail: state => {
      state.movie = null;
      state.similar = [];
      state.credits = null;
      state.images = null;
      state.providers = null;
      state.reviews = [];
      state.keywords = [];
      state.videos = [];
      state.externalIds = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovieDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload.movie;
        state.similar = action.payload.similar;
        state.credits = action.payload.credits;
        state.images = action.payload.images;
        state.providers = action.payload.providers;
        state.reviews = action.payload.reviews;
        state.keywords = action.payload.keywords;
        state.videos = action.payload.videos;
        state.externalIds = action.payload.externalIds;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMovieDetail } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;
