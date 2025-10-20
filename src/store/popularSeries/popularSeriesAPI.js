import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'd30821539f8d65f6b806f308df58ae07';

export const getPopularSeries = async (page = 1) => {
  const res = await axios.get(`${BASE_URL}/tv/popular`, {
    params: {
      api_key: API_KEY,
      language: 'tr-TR',
      page,
    },
  });
  return res.data.results;
};
