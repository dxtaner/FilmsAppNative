export const searchMovieAPI = async query => {
  const API_KEY = 'd30821539f8d65f6b806f308df58ae07';
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
};
