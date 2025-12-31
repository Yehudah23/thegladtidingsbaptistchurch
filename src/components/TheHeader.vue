<!-- Header.vue -->
<template>
  <header :style="headerStyle">
    <div :style="{ maxWidth: '1400px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }">
      <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '5rem' }">
        <!-- Logo with Hover Effect -->
        <div class="logo-container" :style="{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '200px' }">
          <img src="@/assets/church_logo-removebg-preview.png" alt="Glad Tidings Baptist Church Logo" :style="{ width: '3rem', height: '3rem', objectFit: 'contain' }" class="logo-image" />
          <div :style="{ display: 'flex', flexDirection: 'column' }">
            <span :style="{ fontSize: '2.3rem', fontWeight: '700', color: '#2563eb' }" class="church-name-main">
              The Glad Tidings
            </span>
            <span :style="{ fontSize: '1.1rem', color: '#9ca3af', fontWeight: '700', letterSpacing: '0.01em', color: 'red',paddingLeft:'-2.0rem' }" class="church-name-sub">BAPTIST CHURCH</span>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav :style="{ display: 'flex', alignItems: 'center', gap: '3rem', flex: '1', justifyContent: 'center' }" class="desktop-nav">
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
          <router-link :to="{ name: 'Blog' }" :style="navLinkStyle" class="nav-link">
            Blog
          </router-link>
          <router-link :to="{ name: 'Giving' }" :style="navLinkStyle" class="nav-link">
            Giving
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#contact' }" :style="navLinkStyle" class="nav-link">
            Contact
          </router-link>
        </nav>

        <!-- CTA Buttons -->
        <div :style="{ display: 'flex', alignItems: 'center', gap: '1rem' }" class="desktop-cta">
          <router-link :to="{ name: 'Home', hash: '#live' }" :style="ctaButtonStyle" class="cta-button">
            Watch Live
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" :style="{ padding: '0.5rem', borderRadius: '0.375rem', color: '#374151', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }" class="mobile-menu-btn">
          {{ isMobileMenuOpen ? '✕' : '☰' }}
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" :style="{ paddingTop: '1rem', paddingBottom: '1rem', borderTop: '1px solid #e5e7eb' }" class="mobile-menu">
        <nav :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
          <router-link :to="{ name: 'Home' }" @click="closeMobileMenu" :style="{ color: '#374151', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500', padding: '0.5rem', borderRadius: '0.5rem' }" class="mobile-nav-link">
            Home
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#about' }" @click="closeMobileMenu" :style="{ color: '#374151', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500', padding: '0.5rem', borderRadius: '0.5rem' }" class="mobile-nav-link">
            About
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#live' }" @click="closeMobileMenu" :style="{ color: '#374151', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500', padding: '0.5rem', borderRadius: '0.5rem' }" class="mobile-nav-link">
            Live Stream
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#sermons' }" @click="closeMobileMenu" :style="{ color: '#374151', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500', padding: '0.5rem', borderRadius: '0.5rem' }" class="mobile-nav-link">
            Messages
          </router-link>
          <router-link :to="{ name: 'Blog' }" @click="closeMobileMenu" :style="{ color: '#374151', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500', padding: '0.5rem', borderRadius: '0.5rem' }" class="mobile-nav-link">
            Blog
          </router-link>
          <router-link :to="{ name: 'Giving' }" @click="closeMobileMenu" :style="{ color: '#374151', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500', padding: '0.5rem', borderRadius: '0.5rem' }" class="mobile-nav-link">
            Giving
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#contact' }" @click="closeMobileMenu" :style="{ color: '#374151', transition: 'color 0.3s ease', textAlign: 'left', textDecoration: 'none', fontWeight: '500', padding: '0.5rem', borderRadius: '0.5rem' }" class="mobile-nav-link">
            Contact
          </router-link>
          <router-link :to="{ name: 'Home', hash: '#live' }" @click="closeMobileMenu" :style="{ ...ctaButtonStyle, width: '100%', textAlign: 'center' }" class="mobile-cta">
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.logo-container {
  animation: slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-image {
  animation: pulse 3s ease-in-out infinite;
}

.church-name-main {
  background: linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa, #3b82f6, #2563eb);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite, fadeInUp 0.8s ease-out;
  display: inline-block;
}

.church-name-sub {
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
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
  .desktop-nav {
    display: flex !important;
  }
  
  .mobile-menu-btn {
    display: none !important;
  }
  
  .desktop-cta {
    display: flex !important;
  }
  
  .mobile-menu {
    display: none !important;
  }
  
  .logo-container span:first-of-type {
    font-size: 2.3rem !important;
  }
  
  .logo-container span:last-of-type {
    font-size: 1.1rem !important;
  }
}

/* iPad Pro - 12.9" and 11" screens (1366px width) */
@media (min-width: 1366px) {
  .desktop-nav {
    gap: 3rem !important;
    display: flex !important;
  }
  
  .mobile-menu-btn {
    display: none !important;
  }
  
  .desktop-cta {
    display: flex !important;
  }
  
  .mobile-menu {
    display: none !important;
  }
}

/* iPad Standard/Air - 10.9" screens (1024px - 1365px) */
@media (min-width: 1024px) and (max-width: 1365px) {
  .desktop-nav {
    gap: 3rem !important;
    display: flex !important;
  }
  
  .mobile-menu-btn {
    display: none !important;
  }
  
  .desktop-cta {
    display: flex !important;
  }
  
  .mobile-menu {
    display: none !important;
  }
  
  .nav-link {
    font-size: 1rem !important;
  }
  
  .admin-link {
    font-size: 0.9rem !important;
  }
  
  .cta-button {
    font-size: 1rem !important;
  }
}

/* iPad Mini - 8.3" screens (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .desktop-nav {
    gap: 3rem !important;
    display: flex !important;
  }
  
  .mobile-menu-btn {
    display: none !important;
  }
  
  .desktop-cta {
    display: flex !important;
  }
  
  .mobile-menu {
    display: none !important;
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
  
  .nav-link {
    font-size: 0.85rem !important;
  }
  
  .admin-link {
    font-size: 0.8rem !important;
    padding: 0.4rem 0.8rem !important;
  }
  
  .cta-button {
    padding: 0.5rem 1.2rem !important;
    font-size: 0.85rem !important;
  }
}

/* iPhone Pro Max - 6.9" screens (520px - 767px) */
@media (min-width: 520px) and (max-width: 767px) {
  .desktop-nav {
    display: none !important;
  }

  .mobile-menu-btn {
    display: inline-block !important;
  }
  
  .desktop-cta {
    display: none !important;
  }
  
  .mobile-menu {
    display: block !important;
  }
  
  .logo-container {
    min-width: 160px !important;
  }
  
  .logo-container span:first-of-type {
    font-size: 1.6rem !important;
  }
  
  .logo-container span:last-of-type {
    font-size: 0.8rem !important;
  }
  
  .logo-container img {
    width: 2.2rem !important;
    height: 2.2rem !important;
  }
  
  .mobile-nav-link {
    font-size: 1rem !important;
    padding: 0.75rem !important;
  }
  
  .mobile-cta {
    font-size: 1rem !important;
    padding: 0.75rem 1.5rem !important;
  }
}

/* iPhone Plus - 6.7" screens (480px - 519px) */
@media (min-width: 480px) and (max-width: 519px) {
  .desktop-nav {
    display: none !important;
  }

  .mobile-menu-btn {
    display: inline-block !important;
  }
  
  .desktop-cta {
    display: none !important;
  }
  
  .mobile-menu {
    display: block !important;
  }
  
  .logo-container {
    min-width: 145px !important;
  }
  
  .logo-container span:first-of-type {
    font-size: 1.3rem !important;
  }
  
  .logo-container span:last-of-type {
    font-size: 0.7rem !important;
  }
  
  .logo-container img {
    width: 2rem !important;
    height: 2rem !important;
  }
  
  .mobile-nav-link {
    font-size: 0.95rem !important;
    padding: 0.65rem !important;
  }
  
  .mobile-cta {
    font-size: 0.95rem !important;
    padding: 0.65rem 1.2rem !important;
  }
}

/* iPhone Standard - 6.1" screens (430px - 479px) */
@media (min-width: 430px) and (max-width: 479px) {
  .desktop-nav {
    display: none !important;
  }

  .mobile-menu-btn {
    display: inline-block !important;
  }
  
  .desktop-cta {
    display: none !important;
  }
  
  .mobile-menu {
    display: block !important;
  }
  
  .logo-container {
    min-width: 140px !important;
  }
  
  .logo-container span:first-of-type {
    font-size: 1.2rem !important;
  }
  
  .logo-container span:last-of-type {
    font-size: 0.65rem !important;
  }
  
  .logo-container img {
    width: 1.9rem !important;
    height: 1.9rem !important;
  }
  
  .mobile-nav-link {
    font-size: 0.9rem !important;
    padding: 0.6rem !important;
  }
  
  .mobile-cta {
    font-size: 0.9rem !important;
    padding: 0.6rem 1.1rem !important;
  }
}

/* iPhone Small - 5.4" screens (390px - 429px) */
@media (max-width: 429px) {
  .desktop-nav {
    display: none !important;
  }

  .mobile-menu-btn {
    display: inline-block !important;
  }
  
  .desktop-cta {
    display: none !important;
  }
  
  .mobile-menu {
    display: block !important;
  }
  
  .logo-container {
    min-width: 125px !important;
    gap: 0.45rem !important;
  }
  
  .logo-container span:first-of-type {
    font-size: 1rem !important;
  }
  
  .logo-container span:last-of-type {
    font-size: 0.6rem !important;
  }
  
  .logo-container img {
    width: 1.75rem !important;
    height: 1.75rem !important;
  }
  
  .mobile-nav-link {
    font-size: 0.85rem !important;
    padding: 0.55rem !important;
  }
  
  .mobile-cta {
    font-size: 0.85rem !important;
    padding: 0.5rem 1rem !important;
  }
}

/* ===== ANDROID DEVICE BREAKPOINTS ===== */

/* Android Tablets - High Resolution (1800px - Pixel C, Galaxy Tab S) */
@media (min-width: 1800px) and (max-width: 2560px) {
  .desktop-nav {
    gap: 3.5rem !important;
    display: flex !important;
  }
  
  .mobile-menu-btn {
    display: none !important;
  }
  
  .desktop-cta {
    display: flex !important;
  }
  
  .mobile-menu {
    display: none !important;
  }
  
  .nav-link {
    font-size: 1.1rem !important;
  }
}

/* Android Tablets - Standard (1280px-1800px - Nexus 9, Galaxy Tab) */
@media (min-width: 1280px) and (max-width: 1799px) {
  .desktop-nav {
    gap: 2.5rem !important;
    display: flex !important;
  }
  
  .mobile-menu-btn {
    display: none !important;
  }
  
  .desktop-cta {
    display: flex !important;
  }
  
  .mobile-menu {
    display: none !important;
  }
  
  .logo-container {
    min-width: 190px !important;
  }
  
  .nav-link {
    font-size: 1rem !important;
  }
  
  .admin-link {
    font-size: 0.9rem !important;
  }
  
  .cta-button {
    font-size: 1rem !important;
  }
}

/* Android Tablets - Small (800px-1279px) */
@media (min-width: 800px) and (max-width: 1279px) {
  .desktop-nav {
    gap: 1.8rem !important;
    display: flex !important;
  }
  
  .mobile-menu-btn {
    display: none !important;
  }
  
  .desktop-cta {
    display: flex !important;
  }
  
  .mobile-menu {
    display: none !important;
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
  
  .nav-link {
    font-size: 0.88rem !important;
  }
  
  .admin-link {
    font-size: 0.8rem !important;
    padding: 0.4rem 0.85rem !important;
  }
  
  .cta-button {
    padding: 0.5rem 1.2rem !important;
    font-size: 0.88rem !important;
  }
}

/* Android High-End Flagships - QHD/QHD+ (1440px wide, 720px when vertical - 2560px-3120px tall) */
@media (min-width: 720px) and (max-width: 799px) {
  .desktop-nav {
    display: none !important;
  }

  .mobile-menu-btn {
    display: inline-block !important;
  }
  
  .desktop-cta {
    display: none !important;
  }
  
  .mobile-menu {
    display: block !important;
  }
  
  .logo-container {
    min-width: 165px !important;
  }
  
  .logo-container span:first-of-type {
    font-size: 1.65rem !important;
  }
  
  .logo-container span:last-of-type {
    font-size: 0.82rem !important;
  }
  
  .logo-container img {
    width: 2.3rem !important;
    height: 2.3rem !important;
  }
  
  .mobile-nav-link {
    font-size: 1.02rem !important;
    padding: 0.78rem !important;
  }
  
  .mobile-cta {
    font-size: 1.02rem !important;
    padding: 0.78rem 1.55rem !important;
  }
}

/* Android Mid-Range/Flagships - FHD/FHD+ (1080px wide, 540px when vertical - 1920px-2400px tall) */
@media (min-width: 540px) and (max-width: 719px) {
  .desktop-nav {
    display: none !important;
  }

  .mobile-menu-btn {
    display: inline-block !important;
  }
  
  .desktop-cta {
    display: none !important;
  }
  
  .mobile-menu {
    display: block !important;
  }
  
  .logo-container {
    min-width: 155px !important;
  }
  
  .logo-container span:first-of-type {
    font-size: 1.5rem !important;
  }
  
  .logo-container span:last-of-type {
    font-size: 0.78rem !important;
  }
  
  .logo-container img {
    width: 2.15rem !important;
    height: 2.15rem !important;
  }
  
  .mobile-nav-link {
    font-size: 0.98rem !important;
    padding: 0.7rem !important;
  }
  
  .mobile-cta {
    font-size: 0.98rem !important;
    padding: 0.7rem 1.4rem !important;
  }
}

/* Android Small Phones/Budget - HD/HD+ (720px wide, 360px when vertical - 1280px-1600px tall) */
@media (max-width: 539px) {
  .desktop-nav {
    display: none !important;
  }

  .mobile-menu-btn {
    display: inline-block !important;
  }
  
  .desktop-cta {
    display: none !important;
  }
  
  .mobile-menu {
    display: block !important;
  }
  
  .logo-container {
    min-width: 130px !important;
    gap: 0.5rem !important;
  }
  
  .logo-container span:first-of-type {
    font-size: 1.15rem !important;
  }
  
  .logo-container span:last-of-type {
    font-size: 0.65rem !important;
  }
  
  .logo-container img {
    width: 1.85rem !important;
    height: 1.85rem !important;
  }
  
  .mobile-nav-link {
    font-size: 0.88rem !important;
    padding: 0.6rem !important;
  }
  
  .mobile-cta {
    font-size: 0.88rem !important;
    padding: 0.6rem 1.15rem !important;
  }
}

/* Android Foldables - Unfolded State (wide aspect ratio ~2208px-1768px or similar) */
@media (min-width: 1768px) and (max-width: 2208px) and (orientation: landscape) {
  .desktop-nav {
    gap: 3rem !important;
    display: flex !important;
  }
  
  .mobile-menu-btn {
    display: none !important;
  }
  
  .desktop-cta {
    display: flex !important;
  }
  
  .mobile-menu {
    display: none !important;
  }
  
  .nav-link {
    font-size: 1.05rem !important;
  }
}

/* Android Foldables - Folded State (narrow aspect ratio ~1344px-2772px) */
@media (min-width: 277px) and (max-width: 420px) and (max-height: 900px) {
  .desktop-nav {
    display: none !important;
  }

  .mobile-menu-btn {
    display: inline-block !important;
  }
  
  .desktop-cta {
    display: none !important;
  }
  
  .mobile-menu {
    display: block !important;
  }
  
  .logo-container {
    min-width: 115px !important;
    gap: 0.4rem !important;
  }
  
  .logo-container span:first-of-type {
    font-size: 0.95rem !important;
  }
  
  .logo-container span:last-of-type {
    font-size: 0.58rem !important;
  }
  
  .logo-container img {
    width: 1.65rem !important;
    height: 1.65rem !important;
  }
  
  .mobile-nav-link {
    font-size: 0.82rem !important;
    padding: 0.5rem !important;
  }
  
  .mobile-cta {
    font-size: 0.82rem !important;
    padding: 0.5rem 0.95rem !important;
  }
}
</style>

