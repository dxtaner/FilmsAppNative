import axios from 'axios';

const API_KEY = 'd30821539f8d65f6b806f308df58ae07';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getAccountBySession = async session_id => {
  const res = await axios.get(`${BASE_URL}/account`, {
    params: { api_key: API_KEY, session_id },
  });
  return res.data;
};

export const getAccountById = async (account_id, session_id) => {
  const res = await axios.get(`${BASE_URL}/account/${account_id}`, {
    params: { api_key: API_KEY, session_id },
  });
  return res.data;
};

export const getFavoriteMovies = async (account_id, session_id) => {
  const res = await axios.get(
    `${BASE_URL}/account/${account_id}/favorite/movies`,
    {
      params: {
        api_key: API_KEY,
        session_id,
        language: 'tr-TR',
        sort_by: 'created_at.asc',
      },
    },
  );
  return res.data.results;
};

export const getWatchlistMovies = async (account_id, session_id) => {
  const res = await axios.get(
    `${BASE_URL}/account/${account_id}/watchlist/movies`,
    {
      params: { api_key: API_KEY, session_id },
    },
  );
  return res.data.results;
};

export const getRatedMovies = async (account_id, session_id) => {
  const res = await axios.get(
    `${BASE_URL}/account/${account_id}/rated/movies`,
    {
      params: { api_key: API_KEY, session_id },
    },
  );
  return res.data.results;
};
