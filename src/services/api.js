import axios from 'axios';

const api = axios.create({
  // Android baseURL: 'http://69.171.5.174:3333',
  // iOS
  baseURL: 'http://localhost:3333',
});

export default api;
