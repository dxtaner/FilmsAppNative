// src/store/topRated/topRatedSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getTopMovies } from './topRatedThunk';

const initialState = {
  items: [],
  currentPage: 1,
  loading: false,
  error: null,
  totalPages: null,
};

const topRatedSlice = createSlice({
  name: 'topRated',
  initialState,
  reducers: {
    resetTopRated: () => initialState,
    setTopRatedPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTopMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopMovies.fulfilled, (state, action) => {
        state.loading = false;
        // thunk'tan gelen payload bazen { results: [], page, total_pages } veya doğrudan []
        const payload = action.payload;
        const results = payload?.results ?? payload ?? [];
        const page = payload?.page ?? state.currentPage;
        const totalPages = payload?.total_pages ?? state.totalPages;

        // Yeni sayfa ise ekle, değilse replace (ilk yükleme)
        if (page && page > 1) {
          state.items = [...state.items, ...results];
        } else {
          state.items = results;
        }

        state.currentPage = (page || state.currentPage) + 1;
        state.totalPages = totalPages ?? state.totalPages;
      })
      .addCase(getTopMovies.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || 'Bir hata oluştu';
      });
  },
});

export const { resetTopRated, setTopRatedPage } = topRatedSlice.actions;
export default topRatedSlice.reducer;
