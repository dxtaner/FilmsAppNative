import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAuthToken,
  validateLogin,
  createUserSession,
} from './authThunk.js';

const initialState = {
  requestToken: null,
  sessionId: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: state => {
      state.requestToken = null;
      state.sessionId = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    // ✅ fetchAuthToken
    builder
      .addCase(fetchAuthToken.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthToken.fulfilled, (state, action) => {
        state.loading = false;
        state.requestToken = action.payload.request_token;
      })
      .addCase(fetchAuthToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ validateLogin
    builder
      .addCase(validateLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.requestToken = action.payload.request_token;
      })
      .addCase(validateLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ createUserSession
    builder
      .addCase(createUserSession.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionId = action.payload.session_id;
      })
      .addCase(createUserSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
