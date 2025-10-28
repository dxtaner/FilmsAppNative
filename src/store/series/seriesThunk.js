import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './seriesAPI';

// 1️⃣ Series details
export const fetchSeriesDetails = createAsyncThunk(
  'series/fetchDetails',
  async (series_id, { rejectWithValue }) => {
    try {
      const response = await api.getSeriesDetails(series_id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// 2️⃣ Series credits
export const fetchSeriesCredits = createAsyncThunk(
  'series/fetchCredits',
  async (series_id, { rejectWithValue }) => {
    try {
      const response = await api.getSeriesCredits(series_id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// 3️⃣ Series external IDs
export const fetchSeriesExternalIds = createAsyncThunk(
  'series/fetchExternalIds',
  async (series_id, { rejectWithValue }) => {
    try {
      const response = await api.getSeriesExternalIds(series_id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// 4️⃣ Series images
export const fetchSeriesImages = createAsyncThunk(
  'series/fetchImages',
  async (series_id, { rejectWithValue }) => {
    try {
      const response = await api.getSeriesImages(series_id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// 5️⃣ Series keywords
export const fetchSeriesKeywords = createAsyncThunk(
  'series/fetchKeywords',
  async (series_id, { rejectWithValue }) => {
    try {
      const response = await api.getSeriesKeywords(series_id);
      return response.data.results || [];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// 6️⃣ Series reviews
export const fetchSeriesReviews = createAsyncThunk(
  'series/fetchReviews',
  async (series_id, { rejectWithValue }) => {
    try {
      const response = await api.getSeriesReviews(series_id);
      return response.data.results || [];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// 7️⃣ Series similar
export const fetchSeriesSimilar = createAsyncThunk(
  'series/fetchSimilar',
  async (series_id, { rejectWithValue }) => {
    try {
      const response = await api.getSeriesSimilar(series_id);
      return response.data.results || [];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// 8️⃣ Series videos
export const fetchSeriesVideos = createAsyncThunk(
  'series/fetchVideos',
  async (series_id, { rejectWithValue }) => {
    try {
      const response = await api.getSeriesVideos(series_id);
      return response.data.results || [];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// 9️⃣ Series watch providers
export const fetchSeriesWatchProviders = createAsyncThunk(
  'series/fetchWatchProviders',
  async (series_id, { rejectWithValue }) => {
    try {
      const response = await api.getSeriesWatchProviders(series_id);
      return response.data.results || {};
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
