import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPersonDetail,
  getPersonExternalIds,
  getPersonImages,
  getPersonMovieCredits,
  getPersonTvCredits,
} from './personDetailAPI';

export const fetchPersonDetail = createAsyncThunk(
  'personDetail/fetchPersonDetail',
  async (personId, { rejectWithValue }) => {
    try {
      const detail = await getPersonDetail(personId);
      const externalIds = await getPersonExternalIds(personId);
      const images = await getPersonImages(personId);
      const movieCredits = await getPersonMovieCredits(personId);
      const tvCredits = await getPersonTvCredits(personId);

      return { detail, externalIds, images, movieCredits, tvCredits };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.status_message || error.message,
      );
    }
  },
);
