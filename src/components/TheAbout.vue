<!-- About.vue -->
<template>
  <section id="about" :style="sectionStyle">
    <div :style="containerStyle">
      <!-- Section Header -->
      <div :style="headerStyle" class="about-header fade-in">
        <span :style="badgeStyle" class="badge-animate">ABOUT US</span>
        <h2 :style="titleStyle" class="title-animate">
          Discover Our Church
        </h2>
        <p :style="subtitleStyle" class="subtitle-animate">
          Built on faith, united in purpose, and committed to transformation
        </p>
      </div>

      <!-- Main Content Grid -->
      <div :style="gridStyle" class="content-grid-animate">
        <!-- Image with Hover Effect -->
        <div :style="{ display: 'flex', alignItems: 'stretch', height: '100%' }" class="image-container-animate">
          <img
            src="@/assets/TGTBC Mission Banner Print_20251210_111814_0000.png"
            alt="Church Community"
            :style="imageStyle"
            class="premium-image"
          />
        </div>
        
        <!-- Content -->
        <div :style="{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }" class="content-text-animate">
          <h3 :style="contentTitleStyle" class="content-title">
            Our Mission & Message 
          </h3>
          <p :style="paragraphStyle">
            At The Glad Tidings Baptist Church, we are dedicated to Knowing Christ and Making Him Known All Over The World.
          </p>
          <p :style="paragraphStyle">
            Our Message is to preach Christ and Him Crucified.
          </p>
          
          <!-- Quick Stats -->
          <div :style="statsBoxStyle" class="stats-premium">
            <div :style="statStyle" class="stat-item stat-item-1">
              <div :style="{ fontSize: '1.5rem', fontWeight: '800', color: '#2563eb' }">40+</div>
              <div :style="{ fontSize: '0.9rem', color: '#64748b' }">Ministries</div>
            </div>
            <div :style="statStyle" class="stat-item stat-item-2">
              <div :style="{ fontSize: '1.5rem', fontWeight: '800', color: '#3b82f6' }">1K+</div>
              <div :style="{ fontSize: '0.9rem', color: '#64748b' }">Members</div>
            </div>
            <div :style="statStyle" class="stat-item stat-item-3">
              <div :style="{ fontSize: '1.5rem', fontWeight: '800', color: '#60a5fa' }">50+</div>
              <div :style="{ fontSize: '0.9rem', color: '#64748b' }">Years</div>
            </div>
          </div>

          <!-- Learn More Button -->
          <div :style="learnMoreContainerStyle">
            <router-link to="/history" :style="learnMoreButtonStyle" class="learn-more-button">
              📖 Learn More About Us
            </router-link>
            <router-link to="/pastors" :style="pastorsButtonStyle" class="pastors-button">
              👥 Meet Our Pastors
            </router-link>
          </div>
        </div>
      </div>

      <!-- Core Values Carousel -->
      <div :style="valuesContainerStyle" class="values-section-animate">
        <h3 class="core-values-title">
          Our Core Values
        </h3>
        
        <!-- Carousel Container -->
        <div :style="carouselContainerStyle">
          <div :style="carouselWrapperStyle">
            <div 
              :style="carouselTrackStyle" 
              class="carousel-track"
              :class="{ 'transitioning': isTransitioning }"
            >
              <div 
                v-for="(value, index) in displayValues" 
                :key="`value-${index}`" 
                class="value-card carousel-card" 
                :class="`value-card-${index % values.length}`"
              >
                <div class="value-card-glow"></div>
                <div :style="iconBoxStyle(value.color)" class="icon-box">
                  <img v-if="value.image" :src="value.image" :alt="value.title" :style="{ width: '2.5rem', height: '2.5rem', objectFit: 'contain' }" />
                  <span v-else>{{ value.icon }}</span>
                </div>
                <h4 :style="{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem', fontWeight: '700' }">
                  {{ value.title }}
                </h4>
                <p :style="{ color: '#64748b', lineHeight: '1.6' }">
                  {{ value.description }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- Carousel Navigation -->
          <button @click="prevSlide" :style="navButtonStyle('left')" class="carousel-nav carousel-prev">
            ‹
          </button>
          <button @click="nextSlide" :style="navButtonStyle('right')" class="carousel-next">
            ›
          </button>
          
          <!-- Carousel Indicators -->
          <div :style="indicatorsStyle">
            <button 
              v-for="(value, index) in values" 
              :key="`indicator-${index}`"
              @click="goToSlide(index)"
              :style="indicatorStyle(index === currentSlide)"
              class="carousel-indicator"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Carousel state
const currentSlide = ref(0);
const isTransitioning = ref(false);
let autoplayInterval = null;

// Auto-slide every 2 seconds
onMounted(() => {
  autoplayInterval = setInterval(() => {
    nextSlide();
  }, 2000);
});

onUnmounted(() => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
});

const nextSlide = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  currentSlide.value = (currentSlide.value + 1) % values.value.length;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const prevSlide = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  currentSlide.value = currentSlide.value === 0 ? values.value.length - 1 : currentSlide.value - 1;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
};

const goToSlide = (index) => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  currentSlide.value = index;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
  
  // Reset autoplay timer
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, 2000);
  }
};

// Create array with duplicates for smooth infinite scroll
const displayValues = computed(() => {
  return [...values.value, ...values.value.slice(0, 1)];
});

const sectionStyle = {
  paddingTop: '6rem',
  paddingBottom: '6rem',
  backgroundColor: '#f8fafc'
};

const containerStyle = {
  maxWidth: '1200px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '2rem',
  paddingRight: '2rem'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '4rem'
};

const badgeStyle = {
  display: 'inline-block',
  fontSize: '0.75rem',
  fontWeight: '800',
  letterSpacing: '0.1em',
  color: '#2563eb',
  backgroundColor: 'rgba(37, 99, 235, 0.1)',
  padding: '0.5rem 1rem',
  borderRadius: '9999px',
  marginBottom: '1rem'
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '1rem'
};

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#64748b',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
  lineHeight: '1.6'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '3rem',
  alignItems: 'center',
  marginBottom: '6rem'
};

const imageStyle = {
  borderRadius: '1.5rem',
  boxShadow: '0 20px 60px -5px rgba(0,0,0,0.15)',
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'center',
  imageRendering: 'crisp-edges',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const contentTitleStyle = {
  fontSize: '2rem',
  fontWeight: '800',
  color: '#0f172a'
};

const paragraphStyle = {
  color: '#475569',
  fontSize: '1.09rem',
  lineHeight: '1.8'
};

const statsBoxStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1.5rem',
  padding: '2rem',
  backgroundColor: '#ffffff',
  borderRadius: '1rem',
  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.08)'
};

const statStyle = {
  textAlign: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const learnMoreContainerStyle = {
  marginTop: '2rem',
  textAlign: 'center',
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  justifyContent: 'center'
};

const learnMoreButtonStyle = {
  display: 'inline-block',
  padding: '1rem 2.5rem',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  fontSize: '1.1rem',
  fontWeight: '700',
  borderRadius: '0.75rem',
  textDecoration: 'none',
  boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.4)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const pastorsButtonStyle = {
  display: 'inline-block',
  padding: '1rem 2.5rem',
  backgroundColor: '#10b981',
  color: '#ffffff',
  fontSize: '1.1rem',
  fontWeight: '700',
  borderRadius: '0.75rem',
  textDecoration: 'none',
  boxShadow: '0 8px 20px -4px rgba(16, 185, 129, 0.4)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const valuesContainerStyle = {
  paddingTop: '4rem',
  borderTop: '2px solid #e2e8f0'
};

// Carousel Styles
const carouselContainerStyle = {
  position: 'relative',
  maxWidth: '100%',
  margin: '3rem auto 0',
  overflow: 'hidden'
};

const carouselWrapperStyle = {
  overflow: 'hidden',
  borderRadius: '1rem'
};

const carouselTrackStyle = computed(() => ({
  display: 'flex',
  transform: `translateX(-${currentSlide.value * 100}%)`,
  transition: isTransitioning.value ? 'transform 0.5s ease-in-out' : 'none',
  gap: '2rem',
  padding: '1rem'
}));

const navButtonStyle = (position) => ({
  position: 'absolute',
  top: '50%',
  [position]: '1rem',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(37, 99, 235, 0.9)',
  color: '#ffffff',
  border: 'none',
  borderRadius: '50%',
  width: '3rem',
  height: '3rem',
  fontSize: '2rem',
  fontWeight: '700',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.3s ease',
  zIndex: 10,
  lineHeight: 1
});

const indicatorsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '0.75rem',
  marginTop: '2rem'
};

const indicatorStyle = (isActive) => ({
  width: isActive ? '2rem' : '0.75rem',
  height: '0.75rem',
  borderRadius: '9999px',
  backgroundColor: isActive ? '#2563eb' : '#cbd5e1',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
});

// const valuesGridStyle = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//   gap: '2rem'
// };

// const valueCardStyle = {
//   padding: '2.5rem 2rem',
//   backgroundColor: '#ffffff',
//   borderRadius: '1.25rem',
//   boxShadow: '0 4px 20px -2px rgba(0,0,0,0.08)',
//   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//   textAlign: 'center',
//   border: '1px solid #e2e8f0',
//   position: 'relative',
//   overflow: 'hidden'
// };

const iconBoxStyle = (color) => ({
  width: '4rem',
  height: '4rem',
  borderRadius: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '1rem',
  fontSize: '2rem',
  backgroundColor: `rgba(${color}, 0.1)`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
});

const values = ref([
  {
    title: "Faith & Prayer",
    description: "Grounded in prayer and trusting God for all things",
    icon: "🙏",
    color: "37, 99, 235"
  },
  {
    title: "Biblical Teaching",
    description: "Committed to God's Word and biblical truth",
    icon: "📖",
    color: "59, 130, 246"
  },
  {
    title: "Community",
    description: "Building meaningful relationships and caring for others",
    icon: "🤝",
    image: require('@/assets/png-clipart-cooperative-bank-台南市新楼储蓄互助社-organization-logo-symbol-congregation-of-the-mission-saving-hand-thumbnail-removebg-preview.png'),
    color: "96, 165, 250"
  },
  {
    title: "Service & Impact",
    description: "Making a difference in our community and world",
    icon: "❤️",
    color: "34, 197, 94"
  },
]);
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

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

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.3), 0 0 40px rgba(37, 99, 235, 0.1);
  }
  50% {
    box-shadow: 0 0 30px rgba(37, 99, 235, 0.5), 0 0 60px rgba(37, 99, 235, 0.2);
  }
}

.about-header {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.badge-animate {
  animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
}

.title-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

.subtitle-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
}

.content-grid-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

.image-container-animate {
  animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

.content-text-animate {
  animation: slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

.premium-image {
  border-radius: 1.5rem;
}

.premium-image:hover {
  transform: scale(1.03);
  box-shadow: 0 30px 80px -10px rgba(37, 99, 235, 0.2);
}

.content-title {
  animation: slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
}

.stats-premium {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.7s both;
}

.stat-item {
  position: relative;
}

.stat-item-1 {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s both;
}

.stat-item-2 {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both;
}

.stat-item-3 {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1s both;
}

.stat-item:hover {
  transform: translateY(-4px);
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(59, 130, 246, 0.05));
}

.values-section-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

.values-grid-animate {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
}

.value-card {
  animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.value-card-0 {
  animation-delay: 0.7s;
}

.value-card-1 {
  animation-delay: 0.8s;
}

.value-card-2 {
  animation-delay: 0.9s;
}

.value-card-3 {
  animation-delay: 1s;
}

.value-card-glow {
  position: absolute;
  inset: 0;
  border-radius: 1.25rem;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%);
  opacity: 0;
  animation: glow 3s ease-in-out infinite;
  pointer-events: none;
}

.value-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px -5px rgba(0,0,0,0.15);
  border-color: rgba(37, 99, 235, 0.3);
}

/* Carousel Styles */
.carousel-card {
  min-width: 100%;
  flex-shrink: 0;
}

.carousel-track.transitioning {
  transition: transform 0.5s ease-in-out;
}

.carousel-nav:hover,
.carousel-next:hover {
  background-color: rgba(37, 99, 235, 1);
  transform: translateY(-50%) scale(1.1);
}

.carousel-nav:active,
.carousel-next:active {
  transform: translateY(-50%) scale(0.95);
}

.carousel-indicator:hover {
  background-color: #60a5fa;
}

.value-card:hover .icon-box {
  transform: scale(1.15) rotate(5deg);
}

.icon-box {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.learn-more-button:hover {
  background-color: #1d4ed8;
  transform: translateY(-3px);
  box-shadow: 0 12px 30px -5px rgba(37, 99, 235, 0.5);
}

.learn-more-button:active {
  transform: translateY(-1px);
}

.pastors-button:hover {
  background-color: #059669;
  transform: translateY(-3px);
  box-shadow: 0 12px 30px -5px rgba(16, 185, 129, 0.5);
}

.pastors-button:active {
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  div[style*="gridStyle"] {
    grid-template-columns: 1fr;
  }

  div[style*="statsBoxStyle"] {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  div[style*="titleStyle"] {
    font-size: 1.875rem;
  }

  div[style*="valuesGridStyle"] {
    grid-template-columns: 1fr;
  }

  div[style*="statsBoxStyle"] {
    grid-template-columns: 1fr;
  }
}
</style>
