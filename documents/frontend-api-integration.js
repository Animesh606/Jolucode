// src/api/index.js - API Configuration
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

// Add token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  verifyEmail: (token) => API.post('/auth/verify-email', { token }),
};

// Profile APIs
export const profileAPI = {
  getProfile: () => API.get('/profile'),
  updateProfile: (data) => API.put('/profile', data),
  addPlatform: (platform, username) => API.post('/profile/platform', { platform, username }),
  syncPlatforms: () => API.post('/profile/sync'),
  getPlatformStats: (platform) => API.get(`/profile/platform/${platform}`),
};

// Problem APIs
export const problemAPI = {
  getProblems: (filters) => API.get('/problems', { params: filters }),
  getProblemById: (id) => API.get(`/problems/${id}`),
  submitSolution: (id, solution) => API.post(`/problems/${id}/submit`, solution),
  getSubmissions: (problemId) => API.get(`/problems/${problemId}/submissions`),
};

// Assignment APIs
export const assignmentAPI = {
  getAssignments: () => API.get('/assignments'),
  getAssignmentById: (id) => API.get(`/assignments/${id}`),
  submitAssignment: (id, submission) => API.post(`/assignments/${id}/submit`, submission),
};

// Admin APIs
export const adminAPI = {
  createProblem: (problemData) => API.post('/admin/problems', problemData),
  createAssignment: (assignmentData) => API.post('/admin/assignments', assignmentData),
  getStats: () => API.get('/admin/stats'),
  manageUsers: (action, userData) => API.post('/admin/users', { action, userData }),
};
