import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Property APIs
export const getProperties = () => api.get('/properties');
export const getFeaturedProperties = () => api.get('/properties/featured');
export const getPropertyById = (id) => api.get(`/properties/${id}`);

// Agent APIs
export const getAgents = () => api.get('/agents');
export const getAgentById = (id) => api.get(`/agents/${id}`);

// Contact APIs
export const submitContact = (data) => api.post('/contact', data);

export default api;