import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAccountBySession,
  getAccountById,
  getFavoriteMovies,
  getWatchlistMovies,
  getRatedMovies,
} from './accountAPI';

// Fetch account by session
export const fetchAccountBySession = createAsyncThunk(
  'account/fetchAccountBySession',
  async ({ session_id }, { rejectWithValue }) => {
    try {
      return await getAccountBySession(session_id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.status_message || err.message);
    }
  },
);

// Fetch account by ID
export const fetchAccountById = createAsyncThunk(
  'account/fetchAccountById',
  async ({ account_id, session_id }, { rejectWithValue }) => {
    try {
      return await getAccountById(account_id, session_id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.status_message || err.message);
    }
  },
);

// Fetch favorite movies
export const fetchFavoriteMoviesThunk = createAsyncThunk(
  'account/fetchFavoriteMovies',
  async ({ account_id, session_id }, { rejectWithValue }) => {
    try {
      return await getFavoriteMovies(account_id, session_id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.status_message || err.message);
    }
  },
);

// Fetch watchlist movies
export const fetchWatchlistMoviesThunk = createAsyncThunk(
  'account/fetchWatchlistMovies',
  async ({ account_id, session_id }, { rejectWithValue }) => {
    try {
      return await getWatchlistMovies(account_id, session_id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.status_message || err.message);
    }
  },
);

// Fetch rated movies
export const fetchRatedMoviesThunk = createAsyncThunk(
  'account/fetchRatedMovies',
  async ({ account_id, session_id }, { rejectWithValue }) => {
    try {
      return await getRatedMovies(account_id, session_id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.status_message || err.message);
    }
  },
);
