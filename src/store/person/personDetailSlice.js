import { createSlice } from '@reduxjs/toolkit';
import { fetchPersonDetail } from './personDetailThunk';

const initialState = {
  detail: null,
  externalIds: null,
  images: null,
  movieCredits: null,
  tvCredits: null,
  loading: false,
  error: null,
};

const personDetailSlice = createSlice({
  name: 'personDetail',
  initialState,
  reducers: {
    clearPersonDetail: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPersonDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload.detail;
        state.externalIds = action.payload.externalIds;
        state.images = action.payload.images;
        state.movieCredits = action.payload.movieCredits;
        state.tvCredits = action.payload.tvCredits;
      })
      .addCase(fetchPersonDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Bir hata oluştu';
      });
  },
});

export const { clearPersonDetail } = personDetailSlice.actions;
export default personDetailSlice.reducer;
