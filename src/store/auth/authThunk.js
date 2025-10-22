import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAuthenticationToken,
  createSessionToken,
  authenticateUser,
} from './authAPI';

// 1️⃣ Request token al
export const fetchAuthToken = createAsyncThunk(
  'auth/fetchAuthToken',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAuthenticationToken();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.status_message || error.message,
      );
    }
  },
);

// 2️⃣ Kullanıcıyı doğrula
export const validateLogin = createAsyncThunk(
  'auth/validateLogin',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await createSessionToken(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.status_message || error.message,
      );
    }
  },
);

// 3️⃣ Session oluştur
export const createUserSession = createAsyncThunk(
  'auth/createUserSession',
  async (request_token, { rejectWithValue }) => {
    try {
      const data = await authenticateUser(request_token);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.status_message || error.message,
      );
    }
  },
);
