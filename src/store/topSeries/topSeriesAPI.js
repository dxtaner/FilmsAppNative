import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'd30821539f8d65f6b806f308df58ae07';

export const getTopSeries = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
      params: {
        api_key: API_KEY,
        language: 'tr-TR',
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('TopSeries API Error:', error);
    throw error;
  }
};
