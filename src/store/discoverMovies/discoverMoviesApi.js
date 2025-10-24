import axios from 'axios';

const TMDB_API_KEY = 'd30821539f8d65f6b806f308df58ae07';
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

export const fetchDiscoverMoviesApi = async filters => {
  try {
    const params = {
      api_key: TMDB_API_KEY,
      language: filters.language || 'tr-TR',
      include_adult: filters.include_adult || false,
      include_video: filters.include_video || false,
      page: filters.page || 1,
      sort_by: filters.sort_by || 'popularity.desc',
      primary_release_year: filters.primary_release_year || undefined,
      'vote_average.gte': filters['vote_average.gte'] || undefined,
      'vote_average.lte': filters['vote_average.lte'] || undefined,
      'vote_count.gte': filters['vote_count.gte'] || undefined,
      'vote_count.lte': filters['vote_count.lte'] || undefined,
      with_genres:
        filters.with_genres.length > 0
          ? filters.with_genres.join(',')
          : undefined,
      without_genres:
        filters.without_genres.length > 0
          ? filters.without_genres.join(',')
          : undefined,
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Discover Movies API Error:', error);
    throw error.response?.data?.status_message || error.message;
  }
};
