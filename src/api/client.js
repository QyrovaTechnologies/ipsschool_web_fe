import axios from 'axios';

const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  (isLocalhost ? 'http://localhost:5000/api' : 'https://ipsschool-be.onrender.com/api');

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

export const getStaff = async (params = {}) => {
  const queryParams = typeof params === 'string' ? (params !== 'All' ? { department: params } : {}) : params;
  const res = await api.get('/staff', { params: queryParams });
  return res.data;
};

export const createStaff = async (formData) => {
  const res = await api.post('/staff', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const getResults = async (params = {}) => {
  const res = await api.get('/results', { params });
  return res.data;
};

export const createResult = async (formData) => {
  const res = await api.post('/results', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const getGallery = async (params = {}) => {
  const queryParams = typeof params === 'string' ? (params !== 'All' ? { category: params } : {}) : params;
  const res = await api.get('/gallery', { params: queryParams });
  return res.data;
};

export const getGalleryByPosition = async (positionKey, params = {}) => {
  const res = await api.get(`/gallery/position/${positionKey}`, { params });
  return res.data;
};

export const getGalleryByPlacement = getGalleryByPosition;

export const createGallery = async (formData) => {
  const res = await api.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export default api;