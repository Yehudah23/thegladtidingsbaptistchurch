<!-- Header.vue -->
<template>
  <header :style="headerStyle">
    <div :style="{ maxWidth: '1400px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }">
      <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '5rem' }">
        <!-- Logo with Hover Effect -->
        <div class="logo-container" :style="{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '200px' }">
          <img src="@/assets/church_logo-removebg-preview.png" alt="Glad Tidings Baptist Church Logo" :style="{ width: '3rem', height: '3rem', objectFit: 'contain' }" />
          <div :style="{ display: 'flex', flexDirection: 'column' }">
            <span :style="{ fontSize: '2.3rem', fontWeight: '700', color: '#2563eb' }">
              The Glad Tidings
            </span>
            <span :style="{ fontSize: '1.1rem', color: '#9ca3af', fontWeight: '700', letterSpacing: '0.01em', color: 'red',paddingLeft:'-2.0rem' }">BAPTIST CHURCH</span>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav :style="{ display: 'flex', alignItems: 'center', gap: '3rem', flex: '1', justifyContent: 'center' }">
          <router-link :to="{ name: 'Home' }" :style="navLinkStyle" class="nav-link">
            Home
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#about' }" :style="navLinkStyle" class="nav-link">
            About
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#live' }" :style="navLinkStyle" class="nav-link">
            Live Stream
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#sermons' }" :style="navLinkStyle" class="nav-link">
            Messages
          </router-link>
          <router-link :to="{ name: 'Giving' }" :style="navLinkStyle" class="nav-link">
            Giving
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#contact' }" :style="navLinkStyle" class="nav-link">
            Contact
          </router-link>
        </nav>

        <!-- CTA Buttons -->
        <div :style="{ display: 'flex', alignItems: 'center', gap: '1rem' }">
          <router-link :to="{ name: 'Admin' }" :style="adminLinkStyle" class="admin-link">
            🔐 Admin
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#live' }" :style="ctaButtonStyle" class="cta-button">
            Watch Live
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" :style="{ padding: '0.5rem', borderRadius: '0.375rem', color: '#374151', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }">
          {{ isMobileMenuOpen ? '✕' : '☰' }}
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" :style="{ paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }">
        <nav :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
          <router-link :to="{ name: 'Home' }" @click="closeMobileMenu" :style="{ color: '#374151', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500' }">
            Home
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#about' }" @click="closeMobileMenu" :style="{ color: '#374151', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500' }">
            About
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#live' }" @click="closeMobileMenu" :style="{ color: '#374151', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500' }">
            Live Stream
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#sermons' }" @click="closeMobileMenu" :style="{ color: '#374151', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500' }">
            Messages
          </router-link>
          <router-link :to="{ name: 'Giving' }" @click="closeMobileMenu" :style="{ color: '#374151', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500' }">
            Giving
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#contact' }" @click="closeMobileMenu" :style="{ color: '#374151', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500' }">
            Contact
          </router-link>
          <router-link :to="{ name: 'Admin' }" @click="closeMobileMenu" :style="{ color: '#2563eb', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500' }">
            🔐 Admin
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#live' }" @click="closeMobileMenu" :style="ctaButtonStyle">
            Watch Live
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const navLinkStyle = {
  color: '#4b5563',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '0.95rem',
  position: 'relative'
};

const adminLinkStyle = {
  color: '#2563eb',
  fontSize: '0.875rem',
  fontWeight: '600',
  textDecoration: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  padding: '0.5rem 1rem',
  borderRadius: '0.5rem'
};

const ctaButtonStyle = {
  backgroundColor: '#2563eb',
  color: '#ffffff',
  padding: '0.65rem 1.5rem',
  borderRadius: '0.5rem',
  fontWeight: '600',
  boxShadow: '0 4px 15px -2px rgba(37, 99, 235, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  textDecoration: 'none',
  display: 'inline-block',
  transform: 'translateY(0)',
  border: 'none'
};

const headerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 50,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: isScrolled.value ? '#ffffff' : 'rgba(255,255,255,0.98)',
  backdropFilter: 'blur(10px)',
  boxShadow: isScrolled.value ? '0 10px 30px -5px rgba(0,0,0,0.1)' : 'none'
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<style scoped>
.logo-container {
  animation: slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link {
  position: relative;
  display: inline-block;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover {
  color: #2563eb !important;
}

.nav-link:hover::after {
  width: 100%;
}

.admin-link {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.admin-link:hover {
  background-color: rgba(37, 99, 235, 0.1);
  transform: translateY(-2px);
}

.cta-button:hover {
  background-color: #1d4ed8;
  transform: translateY(-3px);
  box-shadow: 0 12px 24px -5px rgba(37, 99, 235, 0.4);
}

.cta-button:active {
  transform: translateY(-1px);
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Desktop - Large screens */
@media (min-width: 1024px) {
  nav {
    display: flex !important;
  }
  
  button {
    display: none !important;
  }
  
  .logo-container span:first-of-type {
    font-size: 2.3rem !important;
  }
  
  .logo-container span:last-of-type {
    font-size: 1.1rem !important;
  }
}

/* Tablet - Medium screens */
@media (max-width: 1023px) and (min-width: 769px) {
  nav {
    gap: 1.5rem !important;
  }
  
  .logo-container {
    min-width: 180px !important;
  }
  
  .logo-container span:first-of-type {
    font-size: 1.8rem !important;
  }
  
  .logo-container span:last-of-type {
    font-size: 0.9rem !important;
  }
  
  .logo-container img {
    width: 2.5rem !important;
    height: 2.5rem !important;
  }
  
  button {
    display: none !important;
  }
}

/* Mobile - Small screens */
@media (max-width: 768px) {
  nav {
    display: none !important;
  }

  button {
    display: inline-block !important;
  }
  
  .logo-container {
    min-width: 150px !important;
  }
  
  .logo-container span:first-of-type {
    font-size: 1.4rem !important;
  }
  
  .logo-container span:last-of-type {
    font-size: 0.75rem !important;
  }
  
  .logo-container img {
    width: 2rem !important;
    height: 2rem !important;
  }
  
  div[style*="gap: 1rem"] {
    gap: 0.5rem !important;
  }
}

/* Extra small mobile */
@media (max-width: 480px) {
  .logo-container span:first-of-type {
    font-size: 1.1rem !important;
  }
  
  .logo-container span:last-of-type {
    font-size: 0.65rem !important;
  }
  
  .logo-container img {
    width: 1.75rem !important;
    height: 1.75rem !important;
  }
  
  .logo-container {
    min-width: 120px !important;
    gap: 0.5rem !important;
  }
}
</style>
