// API Configuration
// Centralized API configuration for all backend calls

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://127.0.0.1:8001';

export const API_ENDPOINTS = {
  // Admin endpoints
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_LOGOUT: `${API_BASE_URL}/api/admin/logout`,
  ADMIN_VERIFY: `${API_BASE_URL}/api/admin/verify`,
  ADMIN_CHANGE_PASSWORD: `${API_BASE_URL}/api/admin/change-password`,
  
  // Sermon endpoints
  SERMONS: `${API_BASE_URL}/api/sermons`,
  SERMON_BY_ID: (id) => `${API_BASE_URL}/api/sermons/${id}`,
  SERMON_UPLOAD: `${API_BASE_URL}/api/admin/sermons`,
  SERMON_DELETE: (id) => `${API_BASE_URL}/api/admin/sermons/${id}`,
  SERMON_UPDATE: (id) => `${API_BASE_URL}/api/admin/sermons/${id}`,
  
  // Blog endpoints
  BLOGS: `${API_BASE_URL}/api/blogs`,
  BLOG_BY_ID: (id) => `${API_BASE_URL}/api/blogs/${id}`,
  BLOG_CREATE: `${API_BASE_URL}/api/admin/blogs`,
  BLOG_UPDATE: (id) => `${API_BASE_URL}/api/admin/blogs/${id}`,
  BLOG_DELETE: (id) => `${API_BASE_URL}/api/admin/blogs/${id}`,
  
  // Contact endpoint
  CONTACT: `${API_BASE_URL}/api/contact`,
  
  // Livestream/Comments endpoints
  YOUTUBE_COMMENTS: `${API_BASE_URL}/api/youtube/comments`,
  FACEBOOK_COMMENTS: `${API_BASE_URL}/api/facebook/comments`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
