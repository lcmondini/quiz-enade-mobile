import axios from 'axios';

const api = axios.create({
  // Android baseURL: 'http://192.168.0.9:3333',
  // iOS
  baseURL: 'http://localhost:3333',
});

export default api;
