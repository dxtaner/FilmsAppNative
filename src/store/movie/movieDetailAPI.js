// src/store/movie/movieDetailAPI.js
const API_KEY = 'd30821539f8d65f6b806f308df58ae07';
const BASE_URL = 'https://api.themoviedb.org/3/movie';

/** Film detaylarını getir */
export const getMovieDetail = async id => {
  const res = await fetch(
    `${BASE_URL}/${id}?api_key=${API_KEY}&language=tr-TR`,
  );
  if (!res.ok) throw new Error('Film detay bilgisi alınamadı.');
  return await res.json();
};

/** Benzer filmleri getir */
export const getSimilarMovies = async id => {
  const res = await fetch(
    `${BASE_URL}/${id}/similar?api_key=${API_KEY}&language=tr-TR&page=1`,
  );
  if (!res.ok) throw new Error('Benzer filmler alınamadı.');
  const data = await res.json();
  return data.results || [];
};

/** Oyuncu ve ekip bilgilerini getir */
export const getMovieCredits = async id => {
  const res = await fetch(
    `${BASE_URL}/${id}/credits?api_key=${API_KEY}&language=tr-TR`,
  );
  if (!res.ok) throw new Error('Oyuncu bilgileri alınamadı.');
  return await res.json();
};

/** Film görsellerini getir */
export const getMovieImages = async id => {
  const res = await fetch(`${BASE_URL}/${id}/images?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Film görselleri alınamadı.');
  return await res.json();
};

/** İzleme sağlayıcılarını getir */
export const getMovieProviders = async id => {
  const res = await fetch(
    `${BASE_URL}/${id}/watch/providers?api_key=${API_KEY}`,
  );
  if (!res.ok) throw new Error('İzleme sağlayıcı bilgisi alınamadı.');
  return await res.json();
};

/** Kullanıcı yorumlarını getir */
export const getMovieReviews = async id => {
  const res = await fetch(
    `${BASE_URL}/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
  if (!res.ok) throw new Error('Yorumlar alınamadı.');
  const data = await res.json();
  return data.results || [];
};

/** Anahtar kelimeleri getir */
export const getMovieKeywords = async id => {
  const res = await fetch(`${BASE_URL}/${id}/keywords?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Anahtar kelimeler alınamadı.');
  const data = await res.json();
  return data.keywords || [];
};

/** Videoları (fragman vb.) getir */
export const getMovieVideos = async id => {
  const res = await fetch(
    `${BASE_URL}/${id}/videos?api_key=${API_KEY}&language=en-US`,
  );
  if (!res.ok) throw new Error('Videolar alınamadı.');
  const data = await res.json();
  return data.results || [];
};

export const getMovieExternalIds = async id => {
  const res = await fetch(`${BASE_URL}/${id}/external_ids?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Dış bağlantı bilgileri alınamadı.');
  return await res.json();
};
