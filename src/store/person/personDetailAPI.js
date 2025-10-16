import axios from 'axios';

const API_KEY = 'd30821539f8d65f6b806f308df58ae07';
const BASE_URL = 'https://api.themoviedb.org/3/person';

export const getPersonDetail = async personId => {
  const { data } = await axios.get(
    `${BASE_URL}/${personId}?api_key=${API_KEY}&language=tr-TR`,
  );
  return data;
};

export const getPersonExternalIds = async personId => {
  const { data } = await axios.get(
    `${BASE_URL}/${personId}/external_ids?api_key=${API_KEY}`,
  );
  return data;
};

export const getPersonImages = async personId => {
  const { data } = await axios.get(
    `${BASE_URL}/${personId}/images?api_key=${API_KEY}`,
  );
  return data;
};

export const getPersonMovieCredits = async personId => {
  const { data } = await axios.get(
    `${BASE_URL}/${personId}/movie_credits?api_key=${API_KEY}&language=tr-TR`,
  );
  return data;
};

export const getPersonTvCredits = async personId => {
  const { data } = await axios.get(
    `${BASE_URL}/${personId}/tv_credits?api_key=${API_KEY}&language=tr-TR`,
  );
  return data;
};
