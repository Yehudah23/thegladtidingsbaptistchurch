// API Helper Functions
// Centralized API request handlers with error handling

import axios from 'axios';
import { API_ENDPOINTS } from './config';

// Create axios instance with default config
const apiClient = axios.create({
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor - add auth token if available
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token to requests if needed
    // const token = sessionStorage.getItem('adminToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      
      switch (status) {
        case 401:
          console.error('Unauthorized access - redirecting to login');
          // Handle unauthorized access
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('No response from server. Please check your connection.');
    } else {
      // Error setting up request
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API Service Methods
export const apiService = {
  // Admin methods
  async adminLogin(credentials) {
    return apiClient.post(API_ENDPOINTS.ADMIN_LOGIN, credentials);
  },

  async adminLogout() {
    return apiClient.post(API_ENDPOINTS.ADMIN_LOGOUT);
  },

  async verifyAdmin() {
    return apiClient.get(API_ENDPOINTS.ADMIN_VERIFY);
  },

  async changePassword(passwordData) {
    return apiClient.post(API_ENDPOINTS.ADMIN_CHANGE_PASSWORD, passwordData);
  },

  // Sermon methods
  async getSermons(params = {}) {
    return apiClient.get(API_ENDPOINTS.SERMONS, { params });
  },

  async getSermonById(id) {
    return apiClient.get(API_ENDPOINTS.SERMON_BY_ID(id));
  },

  async uploadSermon(formData) {
    return apiClient.post(API_ENDPOINTS.SERMON_UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  async updateSermon(id, data) {
    return apiClient.put(API_ENDPOINTS.SERMON_UPDATE(id), data);
  },

  async deleteSermon(id) {
    return apiClient.delete(API_ENDPOINTS.SERMON_DELETE(id));
  },

  // Blog methods
  async getBlogs(params = {}) {
    return apiClient.get(API_ENDPOINTS.BLOGS, { params });
  },

  async getBlogById(id) {
    return apiClient.get(API_ENDPOINTS.BLOG_BY_ID(id));
  },

  async createBlog(blogData) {
    return apiClient.post(API_ENDPOINTS.BLOG_CREATE, blogData);
  },

  async updateBlog(id, blogData) {
    return apiClient.put(API_ENDPOINTS.BLOG_UPDATE(id), blogData);
  },

  async deleteBlog(id) {
    return apiClient.delete(API_ENDPOINTS.BLOG_DELETE(id));
  },

  // Contact method
  async sendContactMessage(contactData) {
    return apiClient.post(API_ENDPOINTS.CONTACT, contactData);
  },

  // Health check
  async checkHealth() {
    return apiClient.get(API_ENDPOINTS.HEALTH);
  }
};

export default apiService;
