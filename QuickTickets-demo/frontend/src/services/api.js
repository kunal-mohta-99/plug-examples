import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventsAPI = {
  getAll: () => api.get('/events'),
  getById: (id) => api.get(`/events/${id}`),
};

export const bookingAPI = {
  create: (data) => api.post('/booking', data),
};

export const paymentAPI = {
  process: (data) => api.post('/payment', data),
};

export const authAPI = {
  login: (data) => api.post('/login', data),
};

export default api;
