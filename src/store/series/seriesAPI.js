import axios from 'axios';

const API_KEY = 'd30821539f8d65f6b806f308df58ae07';
const BASE_URL = 'https://api.themoviedb.org/3';

const seriesAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'tr-TR',
  },
});

// TV Series endpoints
export const getSeriesDetails = series_id => seriesAPI.get(`/tv/${series_id}`);

export const getSeriesCredits = series_id =>
  seriesAPI.get(`/tv/${series_id}/credits`);

export const getSeriesExternalIds = series_id =>
  seriesAPI.get(`/tv/${series_id}/external_ids`);

export const getSeriesImages = series_id =>
  seriesAPI.get(`/tv/${series_id}/images`);

export const getSeriesKeywords = series_id =>
  seriesAPI.get(`/tv/${series_id}/keywords`);

export const getSeriesReviews = series_id =>
  seriesAPI.get(`/tv/${series_id}/reviews`);

export const getSeriesSimilar = series_id =>
  seriesAPI.get(`/tv/${series_id}/similar`);

export const getSeriesVideos = series_id =>
  seriesAPI.get(`/tv/${series_id}/videos`);

export const getSeriesWatchProviders = series_id =>
  seriesAPI.get(`/tv/${series_id}/watch/providers`);
