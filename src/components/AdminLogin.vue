<template>
  <section :style="loginSectionStyle">
    <div :style="loginContainerStyle">
      <div :style="loginCardStyle" class="login-card-animate">
        <!-- Logo -->
        <div :style="logoContainerStyle">
          <img src="@/assets/church_logo-removebg-preview.png" alt="Church Logo" :style="logoImageStyle" />
          <h2 :style="logoTextStyle">Admin Login</h2>
          <p :style="logoSubtextStyle">The Glad Tidings Baptist Church</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" :style="formStyle">
          <div :style="formGroupStyle">
            <label for="username" :style="labelStyle">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              :style="inputStyle"
              placeholder="Enter your username"
              class="form-input"
            />
          </div>

          <div :style="formGroupStyle">
            <label for="password" :style="labelStyle">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              :style="inputStyle"
              placeholder="Enter your password"
              class="form-input"
            />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" :style="errorMessageStyle" class="error-animate">
            {{ errorMessage }}
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :style="loginButtonStyle"
            :disabled="isLoading"
            class="login-button"
          >
            {{ isLoading ? 'Logging in...' : '🔐 Login' }}
          </button>
        </form>

        <!-- Footer -->
        <div :style="footerStyle">
          <p :style="footerTextStyle">
            Forgot your password? Contact the system administrator.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    // Backend API endpoint
    const response = await axios.post('http://127.0.0.1:8001/api/admin/login', {
      username: username.value,
      password: password.value
    });

    console.log('Login response:', response.data); // Debug log

    if (response.data.success || response.data.token) {
      // Store authentication token
      localStorage.setItem('adminToken', response.data.token || 'authenticated');
      localStorage.setItem('isAdminAuthenticated', 'true');
      
      // Redirect to admin panel
      router.push({ name: 'Admin' });
    } else {
      errorMessage.value = response.data.message || 'Invalid credentials';
    }
  } catch (error) {
    console.error('Login error:', error);
    console.log('Error response:', error.response?.data); // Debug log
    
    errorMessage.value = error.response?.data?.message || 'Login failed. Please check your credentials and try again.';
  } finally {
    isLoading.value = false;
  }
};

// Styles
const loginSectionStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f8fafc',
  padding: '2rem'
};

const loginContainerStyle = {
  width: '100%',
  maxWidth: '450px'
};

const loginCardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '1.5rem',
  padding: '3rem',
  boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.15)',
  border: '1px solid #e2e8f0'
};

const logoContainerStyle = {
  textAlign: 'center',
  marginBottom: '2.5rem'
};

const logoImageStyle = {
  width: '5rem',
  height: '5rem',
  objectFit: 'contain',
  marginBottom: '1rem'
};

const logoTextStyle = {
  fontSize: '2rem',
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '0.5rem'
};

const logoSubtextStyle = {
  fontSize: '0.95rem',
  color: '#64748b'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const labelStyle = {
  fontSize: '0.95rem',
  fontWeight: '600',
  color: '#0f172a'
};

const inputStyle = {
  padding: '0.875rem 1rem',
  border: '2px solid #e2e8f0',
  borderRadius: '0.75rem',
  fontSize: '1rem',
  color: '#0f172a',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxSizing: 'border-box',
  fontFamily: 'inherit'
};

const errorMessageStyle = {
  padding: '0.875rem 1rem',
  backgroundColor: '#fee2e2',
  color: '#dc2626',
  borderRadius: '0.75rem',
  fontSize: '0.9rem',
  textAlign: 'center',
  border: '1px solid #fecaca'
};

const loginButtonStyle = {
  padding: '1rem',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  border: 'none',
  borderRadius: '0.75rem',
  fontSize: '1.05rem',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.4)'
};

const footerStyle = {
  marginTop: '2rem',
  paddingTop: '1.5rem',
  borderTop: '1px solid #e2e8f0',
  textAlign: 'center'
};

const footerTextStyle = {
  fontSize: '0.875rem',
  color: '#64748b',
  margin: 0
};
</script>

<style scoped>
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.login-card-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.login-button:hover:not(:disabled) {
  background-color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 12px 30px -5px rgba(37, 99, 235, 0.5);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-animate {
  animation: shake 0.4s ease-in-out;
}

@media (max-width: 640px) {
  div[style*="loginCardStyle"] {
    padding: 2rem;
  }
}
</style>
