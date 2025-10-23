import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAccountBySession,
  fetchAccountById,
  fetchFavoriteMoviesThunk,
  fetchWatchlistMoviesThunk,
  fetchRatedMoviesThunk,
} from './accountThunk';

const initialState = {
  accountInfo: null,
  favorite: [],
  watchlist: [],
  rated: [],
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearAccountState: state => {
      state.accountInfo = null;
      state.favorite = [];
      state.watchlist = [];
      state.rated = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // fetchAccountBySession
      .addCase(fetchAccountBySession.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountBySession.fulfilled, (state, action) => {
        state.loading = false;
        state.accountInfo = action.payload;
      })
      .addCase(fetchAccountBySession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchAccountById
      .addCase(fetchAccountById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountById.fulfilled, (state, action) => {
        state.loading = false;
        state.accountInfo = action.payload;
      })
      .addCase(fetchAccountById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Favorite
      .addCase(fetchFavoriteMoviesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteMoviesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.favorite = action.payload;
      })
      .addCase(fetchFavoriteMoviesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Watchlist
      .addCase(fetchWatchlistMoviesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlistMoviesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload;
      })
      .addCase(fetchWatchlistMoviesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Rated
      .addCase(fetchRatedMoviesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRatedMoviesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.rated = action.payload;
      })
      .addCase(fetchRatedMoviesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAccountState } = accountSlice.actions;
export default accountSlice.reducer;
