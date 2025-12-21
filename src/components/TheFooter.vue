<!-- Footer.vue -->
<template>
  <footer :style="footerStyle">
    <div :style="containerStyle">
      <!-- Main Footer Content -->
      <div :style="gridStyle" class="footer-grid-animate">
        <!-- About Section -->
        <div class="footer-section footer-section-1" :style="{ animation: 'slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both' }">
          <div :style="logoStyle" class="footer-logo">
            <img src="@/assets/church_logo-removebg-preview.png" alt="Glad Tidings Baptist Church Logo" :style="{ width: '3rem', height: '3rem', objectFit: 'contain' }" />
            <span :style="{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }">The Glad Tidings</span>
          </div>
          <p :style="aboutTextStyle">
            <strong>Mission statement: </strong> <span> Knowing Christ and Making Him Known All Over The World</span> <br> <strong>Our Message:</strong> <span>We preach Christ and Him Crucified</span>
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-section footer-section-2" :style="{ animation: 'slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both' }">
          <h4 :style="columnTitleStyle">Quick Links</h4>
          <ul :style="linkListStyle">
            <li>
              <button @click="scrollToSection('home')" :style="linkStyle" class="footer-link">
                Home
              </button>
            </li>
            <li>
              <button @click="scrollToSection('about')" :style="linkStyle" class="footer-link">
                About Us
              </button>
            </li>
            <li>
              <button @click="scrollToSection('sermons')" :style="linkStyle" class="footer-link">
                Messages
              </button>
            </li>
            <li>
              <button @click="scrollToSection('contact')" :style="linkStyle" class="footer-link">
                Contact
              </button>
            </li>
          </ul>
        </div>

        <!-- Service Times -->
        <div class="footer-section footer-section-3" :style="{ animation: 'slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both' }">
          <h4 :style="columnTitleStyle">Service Times</h4>
          <ul :style="serviceListStyle">
            <li><strong>Sunday:</strong>  <span>1st Sunday of every month</span>  8:00 AM <br>
            <span>1st service </span> 7:30am-9:00am <br>
          <span>Sunday School</span> 9:30am-10:30am  <br>
        <span>Insight with the pastor </span> 10:30am-11:00am <br>
      <span>2nd service </span> 11:00am-1:00pm</li>
            <li><strong>Tuesday:</strong> 4:30 PM</li>
            <li><strong>Wednesday Prayer:</strong> 4:30 PM</li>
            <li><strong>Saturday Youth:</strong> 4:00 PM</li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer-section footer-section-4" :style="{ animation: 'slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both' }">
          <h4 :style="columnTitleStyle">Contact</h4>
          <ul :style="contactListStyle">
            <li :style="{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }">
              <span>📍</span>
              <span>  Papa Araromi,Randa Area,P.O Box952,Ogbomoso, Oyo State, Nigeria</span>
            </li>
            <li :style="{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }">
              <span>📱</span>
              <span> "(+234) 08033797256, (+234) 08158891331", </span>
            </li>
            <li :style="{ display: 'flex', gap: '0.75rem' }">
              <span>📧</span>
              <span>info@thegladtidingsbaptist.org</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div :style="{ borderTop: '1px solid rgba(255,255,255,0.15)', marginTop: '3rem', paddingTop: '3rem' }"></div>

      <!-- Bottom Section -->
      <div :style="bottomSectionStyle" class="footer-bottom-animate">
        <!-- Copyright -->
        <p :style="copyrightStyle">
          © {{ currentYear }} The Glad Tidings Baptist Church. Made with 
          <span style="color: #ec4899; margin: '0 0.25rem'">❤️</span>
           for spreading the Gospel.
        </p>

        <!-- Social Links -->
        <div :style="socialLinksStyle" class="footer-social-links">
          <a
            v-for="(social, index) in socialMedia"
            :key="index"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            :title="social.name"
            :style="socialButtonStyle"
            class="footer-social-btn"
          >
            <img v-if="social.image" :src="social.image" :alt="social.name" :style="{ width: '1.5rem', height: '1.5rem', objectFit: 'contain' }" />
            <span v-else style="font-size: 1.25rem">{{ social.icon }}</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, ref } from 'vue';

const currentYear = computed(() => new Date().getFullYear());

const socialMedia = ref([
  {
    name: "Facebook",
    icon: "f",
    url: "https://web.facebook.com/TGTBCOgbomoso",
    color: "#1e40af"
  },
  {
    name: "Instagram",
    icon: "📷",
    image:require('@/assets/Screenshot_from_2025-12-07_12-00-48-removebg-preview (1).png'),
    url: "https://instagram.com",
    color: "#3b82f6"
  },
  {
    name: "YouTube",
    icon: "▶",
    url: "http://youtube.com/@tgtbcogbomoso",
    color: "#ef4444"
  },
  {
    name: "Whatsapp",
    icon: "💬",
    image: require('@/assets/Screenshot_from_2025-12-07_12-00-06-removebg-preview.png'),
    url: "https://whatsapp.com/channel/0029VbBEE7F1Hsq0COokRC39",
    color: "#000000"
  },
]);

const footerStyle = {
  backgroundColor: '#0f172a',
  color: '#ffffff',
  paddingTop: '3rem',
  paddingBottom: '2rem',
  marginTop: '4rem'
};

const containerStyle = {
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '2rem',
  paddingRight: '2rem'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '3rem',
  marginBottom: '2rem'
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginBottom: '1rem'
};

const aboutTextStyle = {
  color: 'rgba(255,255,255,0.7)',
  fontSize: '0.95rem',
  lineHeight: '1.6'
};

const columnTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: '700',
  marginBottom: '1rem',
  color: '#ffffff'
};

const linkListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  listStyle: 'none',
  padding: '0',
  margin: '0'
};

const linkStyle = {
  color: 'rgba(255,255,255,0.7)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fontSize: '0.95rem',
  padding: '0',
  textAlign: 'left'
};

const serviceListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  listStyle: 'none',
  padding: '0',
  margin: '0',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '0.95rem'
};

const contactListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
  listStyle: 'none',
  padding: '0',
  margin: '0',
  color: 'rgba(255,255,255,0.7)',
  fontSize: '0.95rem'
};

const bottomSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center'
};

const copyrightStyle = {
  fontSize: '0.9rem',
  color: 'rgba(255,255,255,0.6)',
  margin: '0'
};

const socialLinksStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center'
};

const socialButtonStyle = {
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '0.75rem',
  backgroundColor: 'rgba(37, 99, 235, 0.2)',
  border: '1px solid rgba(37, 99, 235, 0.3)',
  color: '#2563eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '700'
};

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
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

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.footer-logo {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-logo:hover {
  transform: translateY(-4px);
}

.footer-link {
  position: relative;
  display: inline-block;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-link:hover {
  color: #60a5fa !important;
}

.footer-link:hover::after {
  width: 100%;
}

.footer-social-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-social-btn:hover {
  background-color: rgba(37, 99, 235, 0.3) !important;
  border-color: #2563eb !important;
  transform: translateY(-6px) scale(1.1);
  box-shadow: 0 12px 24px -5px rgba(37, 99, 235, 0.3);
}

.footer-social-btn:active {
  transform: translateY(-2px) scale(1.05);
}

.footer-bottom-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

.footer-grid-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-section {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 768px) {
  div[style*="gridStyle"] {
    grid-template-columns: 1fr;
  }

  div[style*="bottomSectionStyle"] {
    flex-direction: column;
  }
}
</style>
