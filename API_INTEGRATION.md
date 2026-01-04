# API Integration Guide

## Overview
This Vue.js application connects to a Laravel backend API at `http://127.0.0.1:8001` by default.

## Setup Instructions

### 1. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` to set your backend URL:

```env
VUE_APP_API_BASE_URL=http://127.0.0.1:8001
```

### 2. API Structure

All API endpoints are centralized in `src/api/config.js` and API service methods are in `src/api/service.js`.

#### Available Endpoints:

**Admin Endpoints:**
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/verify` - Verify admin token
- `POST /api/admin/change-password` - Change admin password

**Sermon Endpoints:**
- `GET /api/sermons` - Get all sermons
- `GET /api/sermons/:id` - Get sermon by ID
- `POST /api/admin/sermons` - Upload sermon (requires auth)
- `PUT /api/admin/sermons/:id` - Update sermon (requires auth)
- `DELETE /api/admin/sermons/:id` - Delete sermon (requires auth)

**Blog Endpoints:**
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get blog post by ID
- `POST /api/admin/blogs` - Create blog post (requires auth)
- `PUT /api/admin/blogs/:id` - Update blog post (requires auth)
- `DELETE /api/admin/blogs/:id` - Delete blog post (requires auth)

**Contact Endpoint:**
- `POST /api/contact` - Send contact message

**Health Check:**
- `GET /api/health` - Check backend server status

### 3. Using the API Service

Instead of making direct axios calls, use the centralized API service:

```javascript
import apiService from '@/api/service';

// Example: Admin login
try {
  const response = await apiService.adminLogin({
    username: 'admin',
    password: 'password'
  });
  console.log(response.data);
} catch (error) {
  console.error('Login failed:', error);
}

// Example: Upload sermon
try {
  const formData = new FormData();
  formData.append('title', 'Sermon Title');
  formData.append('audioFile', file);
  
  const response = await apiService.uploadSermon(formData);
  console.log('Sermon uploaded:', response.data);
} catch (error) {
  console.error('Upload failed:', error);
}
```

### 4. Components Updated

The following components now use the centralized API configuration:

- **AdminLogin.vue** - Uses `API_ENDPOINTS.ADMIN_LOGIN`
- **AdminPanel.vue** - Uses `API_ENDPOINTS.SERMON_UPLOAD`
- **TheContact.vue** - Uses `API_ENDPOINTS.CONTACT`

### 5. Laravel Backend Requirements

Your Laravel backend should have the following routes configured in `routes/api.php`:

```php
// Public routes
Route::post('/admin/login', [AdminController::class, 'login']);
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/sermons', [SermonController::class, 'index']);
Route::get('/sermons/{id}', [SermonController::class, 'show']);
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{id}', [BlogController::class, 'show']);
Route::get('/health', function() {
    return response()->json(['status' => 'ok', 'timestamp' => now()]);
});

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/admin/logout', [AdminController::class, 'logout']);
    Route::get('/admin/verify', [AdminController::class, 'verify']);
    Route::post('/admin/change-password', [AdminController::class, 'changePassword']);
    
    Route::post('/admin/sermons', [SermonController::class, 'store']);
    Route::put('/admin/sermons/{id}', [SermonController::class, 'update']);
    Route::delete('/admin/sermons/{id}', [SermonController::class, 'destroy']);
    
    Route::post('/admin/blogs', [BlogController::class, 'store']);
    Route::put('/admin/blogs/{id}', [BlogController::class, 'update']);
    Route::delete('/admin/blogs/{id}', [BlogController::class, 'destroy']);
});
```

### 6. CORS Configuration

Make sure your Laravel backend has CORS properly configured to allow requests from your Vue.js frontend:

**config/cors.php:**
```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:8080', 'http://127.0.0.1:8080'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

### 7. Testing the Connection

Test the backend connection:

```bash
# In your Vue.js project
npm run serve

# In another terminal, test the backend health endpoint
curl http://127.0.0.1:8001/api/health
```

### 8. Development vs Production

For production, update your `.env` file:

```env
VUE_APP_API_BASE_URL=https://your-production-domain.com
```

The API configuration will automatically use the correct URL based on the environment.

## Troubleshooting

### Connection Refused
- Ensure your Laravel backend is running on port 8001
- Check if `php artisan serve --port=8001` is running

### CORS Errors
- Verify CORS configuration in Laravel
- Check that the frontend URL is in the allowed origins list

### 401 Unauthorized
- Authentication token might be expired
- Implement proper token storage and refresh mechanism

### API Not Found (404)
- Verify the Laravel routes are properly defined
- Check the API endpoint URLs match between frontend and backend
