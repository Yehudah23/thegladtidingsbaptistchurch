# Admin Login Setup Guide

## Overview
A secure admin login page has been created that authenticates with a backend API.

## What's Changed

### 1. New Login Page Component
- **File**: `src/components/AdminLogin.vue`
- Features a professional login form with username and password fields
- Integrates with backend API for authentication
- Includes fallback credentials for development (username: `admin`, password: `admin123`)
- Shows loading state during authentication
- Displays error messages for failed login attempts

### 2. Updated Router
- **File**: `src/router.js`
- Added `/admin-login` route for the login page
- Modified navigation guard to check authentication status
- Redirects unauthenticated users to login page instead of using password prompt

### 3. Updated Admin Panel
- **File**: `src/components/AdminPanel.vue`
- Added logout button in the header
- Clears authentication tokens on logout
- Redirects to home page after logout

## How Authentication Works

### Frontend Flow:
1. User visits `/admin` route
2. Router checks if `isAdminAuthenticated` is `true` in localStorage
3. If not authenticated, redirects to `/admin-login`
4. User enters credentials on login page
5. Credentials are sent to backend API via POST request to `/api/admin/login`
6. If successful, stores `adminToken` and `isAdminAuthenticated` in localStorage
7. User is redirected to admin panel

### Backend Integration:
The login component sends a POST request to `/api/admin/login` with:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Expected response on success:
```json
{
  "success": true,
  "token": "jwt-token-here",
  "message": "Login successful"
}
```

## Setting Up the Backend

### Option 1: Use the Example Backend (Node.js/Express)

1. **Install dependencies:**
   ```bash
   npm install express bcrypt jsonwebtoken cors dotenv
   ```

2. **Create `.env` file in project root:**
   ```
   JWT_SECRET=your-super-secret-key-change-this
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD_HASH=your-bcrypt-hash-here
   PORT=5000
   ```

3. **Generate password hash:**
   ```javascript
   const bcrypt = require('bcrypt');
   bcrypt.hash('your-password', 10).then(hash => console.log(hash));
   ```

4. **Run the backend:**
   ```bash
   node backend-example.js
   ```

5. **Update frontend API URL in `AdminLogin.vue`:**
   ```javascript
   const response = await axios.post('http://localhost:5000/api/admin/login', {
     username: username.value,
     password: password.value
   });
   ```

### Option 2: Integrate with Existing Backend

Update the API endpoint in `src/components/AdminLogin.vue` (around line 35):

```javascript
const response = await axios.post('YOUR_BACKEND_URL/api/admin/login', {
  username: username.value,
  password: password.value
});
```

Your backend should:
- Accept POST requests to the login endpoint
- Validate username and password
- Return a JWT token on success
- Return error message on failure

### Option 3: Use Firebase Authentication

Replace the axios call with Firebase authentication:

```javascript
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const handleLogin = async () => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      username.value, 
      password.value
    );
    localStorage.setItem('isAdminAuthenticated', 'true');
    router.push({ name: 'Admin' });
  } catch (error) {
    errorMessage.value = 'Invalid credentials';
  }
};
```

## Development Mode

For testing without a backend, the component includes a fallback:

- **Username**: `admin`
- **Password**: `admin123`

This fallback should be **removed in production** for security.

## Security Best Practices

1. **Use HTTPS**: Always use HTTPS in production
2. **Strong Passwords**: Enforce strong password policies
3. **JWT Expiration**: Set appropriate token expiration times
4. **Secure Storage**: Consider using httpOnly cookies instead of localStorage
5. **Rate Limiting**: Implement rate limiting on login attempts
6. **Password Hashing**: Always hash passwords with bcrypt (never store plain text)
7. **Environment Variables**: Store secrets in environment variables, not in code

## Testing the Login

1. Start your Vue app:
   ```bash
   npm run serve
   ```

2. Navigate to `http://localhost:8080/admin`
3. You should be redirected to the login page
4. Enter credentials (use development fallback or connect to backend)
5. On successful login, you'll be redirected to the admin panel
6. Click logout button to test logout functionality

## API Endpoints Reference

### POST /api/admin/login
Authenticate admin user

**Request:**
```json
{
  "username": "admin",
  "password": "your-password"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

### GET /api/admin/verify (Protected)
Verify if JWT token is valid

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Token is valid",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

## Troubleshooting

### CORS Issues
If you get CORS errors, ensure your backend has CORS enabled:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
```

### Login Not Working
1. Check browser console for errors
2. Verify backend is running
3. Check API endpoint URL is correct
4. Verify backend is returning expected response format

### Token Expired
Tokens expire after 24 hours by default. User will need to login again.

## Next Steps

1. Set up your backend API
2. Configure proper environment variables
3. Test login/logout flow
4. Remove development fallback credentials
5. Implement password reset functionality (optional)
6. Add remember me functionality (optional)
7. Implement session timeout (optional)

## Files Modified

- ✅ `src/components/AdminLogin.vue` (created)
- ✅ `src/components/AdminPanel.vue` (updated with logout)
- ✅ `src/router.js` (updated with login route and auth guard)
- ✅ `backend-example.js` (created as reference)
