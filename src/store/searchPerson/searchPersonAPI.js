// store/searchPerson/searchPersonAPI.js

const API_KEY = 'd30821539f8d65f6b806f308df58ae07';
const BASE_URL = 'https://api.themoviedb.org/3/search/person';

export const searchPersonAPI = async query => {
  try {
    const response = await fetch(
      `${BASE_URL}?api_key=${API_KEY}&language=tr-TR&query=${encodeURIComponent(
        query,
      )}`,
    );
    if (!response.ok) {
      throw new Error('TMDB arama isteği başarısız oldu');
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    throw error;
  }
};
