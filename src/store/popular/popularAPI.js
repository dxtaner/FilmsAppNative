// src/store/popular/popularAPI.js
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'd30821539f8d65f6b806f308df58ae07';

export async function getPopularMovies(page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'tr-TR',
        page,
      },
    });
    return response.data; // { page, results, total_pages, total_results }
  } catch (error) {
    console.error('Popüler filmler alınırken hata:', error.message);
    throw error;
  }
}
