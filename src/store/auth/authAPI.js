import axios from 'axios';

const API_KEY = 'd30821539f8d65f6b806f308df58ae07';
const BASE_URL = 'https://api.themoviedb.org/3';

/** 1️⃣ Yeni request token al */
export const getAuthenticationToken = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/authentication/token/new`, {
      params: { api_key: API_KEY },
    });
    return res.data; // { success, expires_at, request_token }
  } catch (error) {
    console.error(
      'Authentication token alınamadı:',
      error.response?.data || error,
    );
    throw error;
  }
};

/** 2️⃣ Kullanıcı giriş bilgileri ile request_token doğrula */
export const createSessionToken = async ({
  username,
  password,
  request_token,
}) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/authentication/token/validate_with_login`,
      { username, password, request_token },
      { params: { api_key: API_KEY } },
    );
    return res.data; // { success, request_token }
  } catch (error) {
    console.error('Token doğrulama hatası:', error.response?.data || error);
    throw error;
  }
};

/** 3️⃣ Doğrulanmış request_token ile session oluştur */
export const authenticateUser = async ({ request_token }) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/authentication/session/new`,
      { request_token }, // ✅ burada doğru body formatı
      { params: { api_key: API_KEY } },
    );
    console.log('✅ Session başarıyla oluşturuldu.');
    return res.data; // { success, session_id }
  } catch (error) {
    console.error('Session oluşturma hatası:', error.response?.data || error);
    throw error;
  }
};
