

import axios from 'axios';
import { API_ENDPOINTS } from './config';

const apiClient = axios.create({
  timeout: 30000, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});


apiClient.interceptors.request.use(
  (config) => {
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {

      const status = error.response.status;
      
      switch (status) {
        case 401:
          console.error('Unauthorized access - redirecting to login');
          
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
      
      console.error('No response from server. Please check your connection.');
    } else {
      
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export const apiService = {
 
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

  
  async sendContactMessage(contactData) {
    return apiClient.post(API_ENDPOINTS.CONTACT, contactData);
  },

  
  async checkHealth() {
    return apiClient.get(API_ENDPOINTS.HEALTH);
  }
};

export default apiService;
