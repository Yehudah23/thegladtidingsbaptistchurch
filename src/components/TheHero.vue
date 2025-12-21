<!-- Hero.vue -->
<template>
  <section id="home" :style="heroSectionStyle">
    <!-- Background Carousel -->
    <div :style="backgroundCarouselStyle">
      <div 
        v-for="(bg, index) in backgrounds" 
        :key="index"
        :style="backgroundSlideStyle(index)"
        :class="['background-slide', { 'active': index === currentBgSlide }]"
      >
        <video v-if="bg.type === 'video'" autoplay loop muted playsinline class="video-background">
          <source :src="bg.src" type="video/mp4">
        </video>
        <img v-else :src="bg.src" :style="imageBackgroundStyle()" class="image-background" />
      </div>
    </div>

    <!-- Floating Animated Shapes -->
    <div :style="floatingShapesStyle">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>

    <!-- Scroll Indicator with Animation -->
    <div :style="scrollIndicatorStyle" class="scroll-indicator-animated">
      <div :style="scrollDotStyle"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Background slides data
const backgrounds = ref([
  { type: 'video', src: require('@/assets/The Glad Tidings New.mp4') },
  { type: 'image', src: '/IMG_1888.jpg' },
  { type: 'image', src: '/mission-banner.png' }
]);

// Background carousel state
const currentBgSlide = ref(0);
let bgAutoplayInterval = null;

// Auto-slide backgrounds every 4 seconds
onMounted(() => {
  bgAutoplayInterval = setInterval(() => {
    currentBgSlide.value = (currentBgSlide.value + 1) % backgrounds.value.length;
  }, 4000);
});

onUnmounted(() => {
  if (bgAutoplayInterval) {
    clearInterval(bgAutoplayInterval);
  }
});

// Background carousel styles
const backgroundCarouselStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0
};

const backgroundSlideStyle = (index) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: currentBgSlide.value === index ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
  zIndex: currentBgSlide.value === index ? 1 : 0
});

const imageBackgroundStyle = () => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'center'
});

const heroSectionStyle = {
  position: 'relative',
  minHeight: '100vh',
  paddingTop: '6rem',
  paddingBottom: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  color: 'white'
};

const floatingShapesStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 1
};

const scrollIndicatorStyle = {
  position: 'absolute',
  bottom: '2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  animation: 'bounce 2s infinite'
};

const scrollDotStyle = {
  width: '1.5rem',
  height: '2.5rem',
  border: '2px solid rgba(255,255,255,0.5)',
  borderRadius: '9999px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '0.5rem',
  position: 'relative'
};
</script>

<style scoped>
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-30px); }
  60% { transform: translateX(-50%) translateY(-15px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(30px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.4), 0 0 40px rgba(37, 99, 235, 0.2);
  }
  50% {
    box-shadow: 0 0 30px rgba(37, 99, 235, 0.6), 0 0 60px rgba(37, 99, 235, 0.3);
  }
}

@keyframes float-shape-1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(30px, -30px) rotate(90deg); }
  50% { transform: translate(0, -60px) rotate(180deg); }
  75% { transform: translate(-30px, -30px) rotate(270deg); }
}

@keyframes float-shape-2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-40px, 20px) rotate(90deg); }
  50% { transform: translate(0, 50px) rotate(180deg); }
  75% { transform: translate(40px, 20px) rotate(270deg); }
}

@keyframes float-shape-3 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(50px, -40px) rotate(90deg); }
  50% { transform: translate(0, -70px) rotate(180deg); }
  75% { transform: translate(-50px, -40px) rotate(270deg); }
}

@keyframes float-shape-4 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-50px, -50px) rotate(90deg); }
  50% { transform: translate(0, -30px) rotate(180deg); }
  75% { transform: translate(50px, -50px) rotate(270deg); }
}

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.floating-shape {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0.15;
  pointer-events: none;
}

.shape-1 {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  top: 10%;
  left: 5%;
  animation: float-shape-1 15s infinite ease-in-out;
}

.shape-2 {
  background: linear-gradient(135deg, #60a5fa, #2563eb);
  top: 60%;
  right: 10%;
  animation: float-shape-2 20s infinite ease-in-out;
}

.shape-3 {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  top: 30%;
  right: 5%;
  animation: float-shape-3 25s infinite ease-in-out;
}

.shape-4 {
  background: linear-gradient(135deg, #2563eb, #60a5fa);
  bottom: 10%;
  left: 15%;
  animation: float-shape-4 18s infinite ease-in-out;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulse 3s ease-in-out infinite;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-weight: 500;
}

.fade-in-heading {
  animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}

.fade-in-title {
  animation: fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
}

.fade-in-subtitle {
  animation: fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

.cta-buttons-animated {
  animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

.stats-container-animated {
  animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

.premium-button {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.primary-btn:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.3);
}

.secondary-btn:hover {
  background-color: rgba(255,255,255,0.25);
  border-color: rgba(255,255,255,0.6);
  transform: translateY(-6px);
  box-shadow: 0 20px 40px -8px rgba(255, 255, 255, 0.2);
}

.primary-btn:active {
  transform: translateY(-2px);
}

.secondary-btn:active {
  transform: translateY(-2px);
}

.stat-card {
  position: relative;
  animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card-1 {
  animation-delay: 0.5s;
}

.stat-card-2 {
  animation-delay: 0.6s;
}

.stat-card-3 {
  animation-delay: 0.7s;
}

.stat-glow {
  position: absolute;
  inset: 0;
  border-radius: 1.25rem;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%);
  opacity: 0;
  animation: glow 3s ease-in-out infinite;
  pointer-events: none;
}

.stat-card:hover {
  transform: translateY(-8px);
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Stats Carousel Styles */
.stats-track.transitioning {
  transition: transform 0.5s ease-in-out;
}

.stat-nav:hover,
.stat-next:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.stat-nav:active,
.stat-next:active {
  transform: translateY(-50%) scale(0.95);
}

.stat-indicator:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

.scroll-indicator-animated {
  animation: pulse 2s ease-in-out infinite;
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  div[style*="statsContainerStyle"] {
    grid-template-columns: 1fr;
  }

  div[style*="ctaContainerStyle"] {
    flex-direction: column;
  }

  .premium-button {
    width: 100%;
    justify-content: center;
  }

  .floating-shape {
    opacity: 0.08;
  }
}
</style>
