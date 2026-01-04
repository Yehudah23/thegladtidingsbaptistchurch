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
        <video 
          v-if="bg.type === 'video'" 
          :ref="el => setVideoRef(el, index)"
          :loop="bg.src !== whatsappVideo"
          :muted="bg.src !== whatsappVideo"
          playsinline 
          class="video-background"
          @ended="onVideoEnded(index, bg)"
        >
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
import { ref, onMounted, onUnmounted, watch } from 'vue';
import whatsappVideo from '@/assets/WhatsApp Video 2026-01-04 at 11.43.24.mp4';

// Background slides data
const backgrounds = ref([
  { type: 'video', src: whatsappVideo },           // Plays with sound, waits until finished
  { type: 'video', src: '/church-video.mp4' },     // Loops silently, 4 seconds
  { type: 'image', src: '/church-image.jpg' },     // Shows for 4 seconds
  { type: 'image', src: '/mission-banner.png' },   // Shows for 4 seconds
  { type: 'image', src: '/english-display.jpg' },  // Shows for 4 seconds
  { type: 'image', src: '/yoruba-display.jpg' }    // Shows for 4 seconds
]);

// Background carousel state
const currentBgSlide = ref(0);
let bgAutoplayInterval = null;
const videoRefs = ref([]);
const waitingForVideo = ref(false);

// Set video ref
const setVideoRef = (el, index) => {
  if (el) {
    videoRefs.value[index] = el;
  }
};

// Play video when slide becomes active
const playCurrentVideo = () => {
  const currentBg = backgrounds.value[currentBgSlide.value];
  if (currentBg.type === 'video') {
    const videoEl = videoRefs.value[currentBgSlide.value];
    if (videoEl) {
      videoEl.currentTime = 0;
      
      // Ensure volume is up for WhatsApp video
      if (currentBg.src === whatsappVideo) {
        videoEl.muted = false;
        videoEl.volume = 1.0;
        waitingForVideo.value = true;
      }
      
      videoEl.play().catch(err => {
        console.log('Video autoplay blocked, user interaction needed:', err);
      });
    }
  }
};

// Handle video ended event (only for WhatsApp video)
const onVideoEnded = (index, bg) => {
  if (index === currentBgSlide.value && bg.src === whatsappVideo) {
    waitingForVideo.value = false;
    // Move to next slide after WhatsApp video ends
    currentBgSlide.value = (currentBgSlide.value + 1) % backgrounds.value.length;
  }
};

// Auto-slide backgrounds every 4 seconds (except when waiting for WhatsApp video)
const startInterval = () => {
  if (bgAutoplayInterval) {
    clearInterval(bgAutoplayInterval);
  }
  
  bgAutoplayInterval = setInterval(() => {
    // Check if current slide is WhatsApp video
    const currentBg = backgrounds.value[currentBgSlide.value];
    if (currentBg.type === 'video' && currentBg.src === whatsappVideo) {
      // Don't advance, wait for video to end
      return;
    }
    
    if (!waitingForVideo.value) {
      currentBgSlide.value = (currentBgSlide.value + 1) % backgrounds.value.length;
    }
  }, 4000);
};

// Watch for slide changes and play videos
watch(currentBgSlide, () => {
  playCurrentVideo();
});

onMounted(() => {
  // Start playing first slide
  setTimeout(() => {
    playCurrentVideo();
  }, 100);
  
  startInterval();
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
  zIndex: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const backgroundSlideStyle = (index) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: currentBgSlide.value === index ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
  zIndex: currentBgSlide.value === index ? 1 : 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const imageBackgroundStyle = () => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'center',
  backgroundColor: '#000000'
});

const heroSectionStyle = {
  position: 'relative',
  width: '100%',
  maxWidth: '100vw',
  height: '85vh',
  maxHeight: '85vh',
  paddingTop: '0',
  paddingBottom: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  color: 'white',
  backgroundColor: '#000000'
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  object-fit: contain;
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

/* Responsive Styles - Apple Devices */

/* iPad Pro - 12.9" and 11" screens (1366px+) */
@media (min-width: 1366px) {
  .hero-title {
    font-size: 3.5rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.4rem !important;
  }
  
  section[id="home"] {
    min-height: 80vh !important;
  }
}

/* iPad Standard/Air - 10.9" screens (1024px - 1365px) */
@media (min-width: 1024px) and (max-width: 1365px) {
  .hero-title {
    font-size: 3rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.2rem !important;
  }
  
  section[id="home"] {
    min-height: 75vh !important;
  }
}

/* iPad Mini - 8.3" screens (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .hero-title {
    font-size: 2.5rem !important;
  }

  .hero-subtitle {
    font-size: 1.1rem !important;
  }

  div[style*="statsContainerStyle"] {
    grid-template-columns: 1fr 1fr;
  }

  div[style*="ctaContainerStyle"] {
    flex-direction: row;
  }

  .premium-button {
    width: auto;
    justify-content: center;
  }

  .floating-shape {
    opacity: 0.08;
  }
  
  section[id="home"] {
    min-height: 350px !important;
    height: auto !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  
  .video-background,
  .image-background {
    object-fit: contain !important;
    width: 100% !important;
    height: auto !important;
  }
}

/* iPhone Pro Max - 6.9" screens (520px - 767px) */
@media (min-width: 520px) and (max-width: 767px) {
  .hero-title {
    font-size: 2.3rem !important;
  }

  .hero-subtitle {
    font-size: 1.05rem !important;
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
  
  section[id="home"] {
    min-height: 450px !important;
    height: auto !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  
  .video-background,
  .image-background {
    object-fit: contain !important;
    width: 100% !important;
    height: auto !important;
  }
}

/* iPhone Plus - 6.7" screens (480px - 519px) */
@media (min-width: 480px) and (max-width: 519px) {
  .hero-title {
    font-size: 2.1rem !important;
  }

  .hero-subtitle {
    font-size: 1.02rem !important;
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
  
  section[id="home"] {
    min-height: 450px !important;
    height: auto !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  
  .video-background,
  .image-background {
    object-fit: contain !important;
    width: 100% !important;
    height: auto !important;
  }
}

/* iPhone Standard - 6.1" screens (430px - 479px) */
@media (min-width: 430px) and (max-width: 479px) {
  .hero-title {
    font-size: 2rem !important;
  }

  .hero-subtitle {
    font-size: 1rem !important;
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
  
  section[id="home"] {
    min-height: 400px !important;
    height: auto !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  
  .video-background,
  .image-background {
    object-fit: contain !important;
    width: 100% !important;
    height: auto !important;
  }
}

/* iPhone Small - 5.4" screens (390px - 429px) */
@media (max-width: 429px) {
  .hero-title {
    font-size: 1.8rem !important;
  }
  
  .hero-subtitle {
    font-size: 0.95rem !important;
  }
  
  .floating-shape {
    display: none;
  }
  
  section[id="home"] {
    min-height: 400px !important;
    height: auto !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  
  .video-background,
  .image-background {
    object-fit: contain !important;
    width: 100% !important;
    height: auto !important;
  }
}

/* ===== ANDROID DEVICE BREAKPOINTS ===== */

/* Android Tablets - High Resolution (1800px - Pixel C, Galaxy Tab S) */
@media (min-width: 1800px) and (max-width: 2560px) {
  .hero-title {
    font-size: 3.8rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.5rem !important;
  }
  
  section[id="home"] {
    min-height: 85vh !important;
  }
  
  .premium-button {
    font-size: 1.1rem !important;
    padding: 1rem 2.5rem !important;
  }
}

/* Android Tablets - Standard (1280px-1800px - Nexus 9, Galaxy Tab) */
@media (min-width: 1280px) and (max-width: 1799px) {
  .hero-title {
    font-size: 3.2rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.3rem !important;
  }
  
  section[id="home"] {
    min-height: 75vh !important;
  }
  
  div[style*="statsContainerStyle"] {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Android Tablets - Small (800px-1279px) */
@media (min-width: 800px) and (max-width: 1279px) {
  .hero-title {
    font-size: 2.6rem !important;
  }

  .hero-subtitle {
    font-size: 1.15rem !important;
  }

  div[style*="statsContainerStyle"] {
    grid-template-columns: 1fr 1fr;
  }

  div[style*="ctaContainerStyle"] {
    flex-direction: row;
  }

  .premium-button {
    width: auto;
    justify-content: center;
    font-size: 0.95rem !important;
  }

  .floating-shape {
    opacity: 0.08;
  }
  
  section[id="home"] {
    min-height: 500px !important;
    height: auto !important;
  }
  
  .video-background,
  .image-background {
    object-fit: contain !important;
    width: 100% !important;
    height: auto !important;
  }
}

/* Android High-End Flagships - QHD/QHD+ (720px wide - 2560px-3120px tall) */
@media (min-width: 720px) and (max-width: 799px) {
  .hero-title {
    font-size: 2.35rem !important;
  }

  .hero-subtitle {
    font-size: 1.08rem !important;
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
    font-size: 0.95rem !important;
  }

  .floating-shape {
    opacity: 0.08;
  }
  
  section[id="home"] {
    min-height: 450px !important;
    height: auto !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  
  .video-background,
  .image-background {
    object-fit: contain !important;
    width: 100% !important;
    height: auto !important;
  }
}

/* Android Mid-Range/Flagships - FHD/FHD+ (540px wide - 1920px-2400px tall) */
@media (min-width: 540px) and (max-width: 719px) {
  .hero-title {
    font-size: 2.15rem !important;
  }

  .hero-subtitle {
    font-size: 1.03rem !important;
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
    font-size: 0.92rem !important;
  }

  .floating-shape {
    opacity: 0.08;
  }
  
  section[id="home"] {
    min-height: 400px !important;
    height: auto !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  
  .video-background,
  .image-background {
    object-fit: contain !important;
    width: 100% !important;
    height: auto !important;
  }
}

/* Android Small Phones/Budget - HD/HD+ (360px wide - 1280px-1600px tall) */
@media (max-width: 539px) and (min-width: 360px) {
  .hero-title {
    font-size: 1.9rem !important;
  }

  .hero-subtitle {
    font-size: 0.98rem !important;
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
    font-size: 0.88rem !important;
    padding: 0.75rem 1.5rem !important;
  }

  .floating-shape {
    display: none;
  }
  
  section[id="home"] {
    min-height: 400px !important;
    height: auto !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  
  .video-background,
  .image-background {
    object-fit: contain !important;
    width: 100% !important;
    height: auto !important;
  }
}

/* Android Foldables - Unfolded State (wide landscape ~2208px-1768px) */
@media (min-width: 1768px) and (max-width: 2208px) and (orientation: landscape) {
  .hero-title {
    font-size: 3.5rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.4rem !important;
  }
  
  section[id="home"] {
    min-height: 80vh !important;
  }
  
  div[style*="statsContainerStyle"] {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Android Foldables - Folded/Cover Screen (narrow ~277px-420px) */
@media (min-width: 277px) and (max-width: 359px) {
  .hero-title {
    font-size: 1.65rem !important;
  }
  
  .hero-subtitle {
    font-size: 0.88rem !important;
  }
  
  .floating-shape {
    display: none;
  }
  
  section[id="home"] {
    min-height: 48vh !important;
    padding-top: 2.8rem !important;
    padding-bottom: 1.5rem !important;
  }
  
  .video-background,
  .image-background {
    object-fit: cover !important;
    height: 48vh !important;
  }
  
  .premium-button {
    width: 100%;
    font-size: 0.82rem !important;
    padding: 0.65rem 1.2rem !important;
  }
}
</style>

