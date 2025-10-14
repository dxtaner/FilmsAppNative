// src/store/movie/movieDetailThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMovieDetail,
  getSimilarMovies,
  getMovieCredits,
  getMovieImages,
  getMovieProviders,
  getMovieReviews,
  getMovieKeywords,
  getMovieVideos,
  getMovieExternalIds,
} from './movieDetailAPI';

export const fetchMovieDetail = createAsyncThunk(
  'movieDetail/fetchMovieDetail',
  async (id, { rejectWithValue }) => {
    try {
      const [
        movie,
        similar,
        credits,
        images,
        providers,
        reviews,
        keywords,
        videos,
        externalIds,
      ] = await Promise.all([
        getMovieDetail(id),
        getSimilarMovies(id),
        getMovieCredits(id),
        getMovieImages(id),
        getMovieProviders(id),
        getMovieReviews(id),
        getMovieKeywords(id),
        getMovieVideos(id),
        getMovieExternalIds(id),
      ]);

      return {
        movie,
        similar,
        credits,
        images,
        providers,
        reviews,
        keywords,
        videos,
        externalIds,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
