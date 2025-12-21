// BACKEND EXAMPLE - This is a sample backend API implementation
// You can use this with Express.js, Node.js, or any backend framework

/*
 * SETUP INSTRUCTIONS:
 * 1. Install required packages:
 *    npm install express bcrypt jsonwebtoken cors dotenv
 * 
 * 2. Create a .env file with:
 *    JWT_SECRET=your-secret-key-here
 *    ADMIN_USERNAME=admin
 *    ADMIN_PASSWORD_HASH=your-hashed-password
 * 
 * 3. Generate password hash:
 *    const bcrypt = require('bcrypt');
 *    const hash = await bcrypt.hash('your-password', 10);
 *    console.log(hash);
 * 
 * 4. Run the server:
 *    node backend-example.js
 */

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample admin credentials (in production, store in database)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  // This is bcrypt hash for 'admin123' - replace with your own
  passwordHash: process.env.ADMIN_PASSWORD_HASH || '$2b$10$8Kx8mKLqJ9ZJxYZQxz5Q5OqJZxKyQz5Q5OqJZxKyQz5Q5OqJZxKyQ'
};

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Admin Login Endpoint
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Check username
    if (username !== ADMIN_CREDENTIALS.username) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, ADMIN_CREDENTIALS.passwordHash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send success response
    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        username: username,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
};

// Example: Protected endpoint to upload sermon
app.post('/api/admin/sermons', authenticateToken, (req, res) => {
  // Your sermon upload logic here
  res.json({
    success: true,
    message: 'Sermon uploaded successfully',
    sermon: req.body
  });
});

// Example: Protected endpoint to delete sermon
app.delete('/api/admin/sermons/:id', authenticateToken, (req, res) => {
  // Your sermon delete logic here
  res.json({
    success: true,
    message: 'Sermon deleted successfully',
    sermonId: req.params.id
  });
});

// Verify token endpoint
app.get('/api/admin/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    user: req.user
  });
});

// Change password endpoint
app.post('/api/admin/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, ADMIN_CREDENTIALS.passwordHash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    
    // In production, update this in your database
    console.log('New password hash:', newPasswordHash);
    console.log('Update this in your database or .env file');

    res.json({
      success: true,
      message: 'Password changed successfully. Please update your .env file with the new hash.',
      newHash: newPasswordHash
    });

  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Login endpoint: http://localhost:${PORT}/api/admin/login`);
});

// Utility function to generate password hash (run this separately to get hash)
async function generatePasswordHash(password) {
  const hash = await bcrypt.hash(password, 10);
  console.log('Password hash:', hash);
  return hash;
}

// Uncomment to generate a hash for a password
// generatePasswordHash('admin123').then(() => process.exit());

module.exports = app;
