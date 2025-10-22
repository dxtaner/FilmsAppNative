import axios from 'axios';

const API_KEY = 'd30821539f8d65f6b806f308df58ae07';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularPersons = async (page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/person/popular?api_key=${API_KEY}&language=tr-TR&page=${page}`,
  );
  return response.data.results;
};
