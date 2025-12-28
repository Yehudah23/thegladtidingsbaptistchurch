<!-- About.vue -->
<template>
  <section id="about" class="about-section">
    <div class="about-container">
      <!-- Section Header -->
      <div class="about-header fade-in">
        <span class="section-badge badge-animate">ABOUT US</span>
        <h2 class="about-title title-animate">
          Discover Our Church
        </h2>
        <p class="section-subtitle subtitle-animate">
          Built on faith, united in purpose, and committed to transformation
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="about-content-grid content-grid-animate">
        <!-- Image with Hover Effect -->
        <div class="image-container-animate about-image-container">
          <img
            src="@/assets/TGTBC Mission Banner Print_20251210_111814_0000.png"
            alt="Church Community"
            class="premium-image about-main-image"
          />
        </div>
        
        <!-- Content -->
        <div class="about-content-text content-text-animate">
          <h3 class="content-title">
            Our Mission & Message 
          </h3>
          <p class="content-paragraph">
            At The Glad Tidings Baptist Church, we are dedicated to Knowing Christ and Making Him Known All Over The World.
          </p>
          <p class="content-paragraph">
            Our Message is to preach Christ and Him Crucified.
          </p>
          
          <!-- Quick Stats -->
          <div class="stats-premium stats-box">
            <div class="stat-item stat-item-1">
              <div class="stat-number">40+</div>
              <div class="stat-label">Ministries</div>
            </div>
            <div class="stat-item stat-item-2">
              <div class="stat-number">1K+</div>
              <div class="stat-label">Members</div>
            </div>
            <div class="stat-item stat-item-3">
              <div class="stat-number">50+</div>
              <div class="stat-label">Years</div>
            </div>
          </div>

          <!-- Learn More Button -->
          <div class="button-container">
            <router-link to="/history" class="learn-more-button">
              📖 Learn More About Us
            </router-link>
            <router-link to="/pastors" class="pastors-button">
              👥 Meet Our Pastors
            </router-link>
          </div>
        </div>
      </div>

      <!-- Core Values Carousel -->
      <div class="values-container values-section-animate">
        <h3 class="core-values-title">
          Our Core Values
        </h3>
        
        <!-- Carousel Container -->
        <div class="carousel-container">
          <div class="carousel-wrapper">
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
                <div class="icon-box" :data-color="value.color">
                  <img v-if="value.image" :src="value.image" :alt="value.title" class="icon-image" />
                  <span v-else class="icon-emoji">{{ value.icon }}</span>
                </div>
                <h4 class="value-card-title">
                  {{ value.title }}
                </h4>
                <p class="value-card-description">
                  {{ value.description }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- Carousel Navigation -->
          <button @click="prevSlide" class="carousel-nav carousel-prev">
            ‹
          </button>
          <button @click="nextSlide" class="carousel-nav carousel-next">
            ›
          </button>
          
          <!-- Carousel Indicators -->
          <div class="carousel-indicators">
            <button 
              v-for="(value, index) in values" 
              :key="`indicator-${index}`"
              @click="goToSlide(index)"
              class="carousel-indicator"
              :class="{ 'active': index === currentSlide }"
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

const carouselTrackStyle = computed(() => ({
  display: 'flex',
  transform: `translateX(-${currentSlide.value * 100}%)`,
  transition: isTransitioning.value ? 'transform 0.5s ease-in-out' : 'none',
  gap: '2rem',
  padding: '1rem'
}));

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
/* Layout Styles */
.about-section {
  padding-top: 6rem;
  padding-bottom: 6rem;
  background-color: #f8fafc;
}

.about-container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 2rem;
  padding-right: 2rem;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.about-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* Main Content Grid */
.about-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: stretch;
  margin-bottom: 6rem;
  min-height: 500px;
}

.about-content-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.content-title {
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.content-paragraph {
  color: #475569;
  line-height: 1.8;
  font-size: 1.05rem;
}

/* Stats Box */
.stats-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.stat-item {
  padding: 1.5rem 1rem;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  border-radius: 1rem;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2563eb;
}

.stat-item-2 .stat-number {
  color: #3b82f6;
}

.stat-item-3 .stat-number {
  color: #60a5fa;
}

.stat-label {
  font-size: 0.9rem;
  color: #64748b;
}

/* Buttons */
.button-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.learn-more-button,
.pastors-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.learn-more-button {
  background-color: #2563eb;
  box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.4);
}

.pastors-button {
  background-color: #10b981;
  box-shadow: 0 8px 20px -4px rgba(16, 185, 129, 0.4);
}

/* Values Section */
.values-container {
  padding-top: 4rem;
  border-top: 2px solid #e2e8f0;
}

.core-values-title {
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  text-align: center;
  margin-bottom: 2rem;
}

/* Carousel Styles */
.carousel-container {
  position: relative;
  max-width: 100%;
  margin: 3rem auto 0;
  overflow: hidden;
}

.carousel-wrapper {
  overflow: hidden;
  border-radius: 1rem;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.95);
  border: 2px solid #e2e8f0;
  color: #1e293b;
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.carousel-prev {
  left: 1rem;
}

.carousel-next {
  right: 1rem;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.carousel-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: #cbd5e1;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicator.active {
  width: 2rem;
  background-color: #2563eb;
}

.value-card {
  min-width: 100%;
  padding: 2.5rem 2rem;
  background-color: #ffffff;
  border-radius: 1.25rem;
  box-shadow: 0 4px 20px -2px rgba(0,0,0,0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
}

.value-card-title {
  font-size: 1.25rem;
  color: #0f172a;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.value-card-description {
  color: #64748b;
  line-height: 1.6;
}

/* Animations */
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
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
  font-size: 2rem;
  background-color: rgba(37, 99, 235, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-box[data-color="37, 99, 235"] {
  background-color: rgba(37, 99, 235, 0.1);
}

.icon-box[data-color="59, 130, 246"] {
  background-color: rgba(59, 130, 246, 0.1);
}

.icon-box[data-color="96, 165, 250"] {
  background-color: rgba(96, 165, 250, 0.1);
}

.icon-box[data-color="34, 197, 94"] {
  background-color: rgba(34, 197, 94, 0.1);
}

.icon-box img {
  width: 2.5rem !important;
  height: 2.5rem !important;
  object-fit: contain !important;
  display: block !important;
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

/* About Image Styles */
.about-image-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
  overflow: hidden;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
}

.about-main-image {
  width: 100%;
  height: 100%;
  min-height: 500px;
  object-fit: contain;
  object-position: center;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  transform: translateZ(0);
  backface-visibility: hidden;
  display: block;
}

/* Responsive Styles - Apple Devices */

/* iPad Pro - 12.9" and 11" screens (1366px+) */
@media (min-width: 1366px) {
  .about-content-grid {
    grid-template-columns: 1fr 1fr;
  }

  .stats-box {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .about-title {
    font-size: 3rem;
  }
  
  .about-image-container {
    min-height: 550px;
  }
  
  .about-main-image {
    min-height: 550px;
  }
}

/* iPad Standard/Air - 10.9" screens (1024px - 1365px) */
@media (min-width: 1024px) and (max-width: 1365px) {
  .about-content-grid {
    grid-template-columns: 1fr 1fr;
  }

  .stats-box {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .about-title {
    font-size: 2.5rem;
  }
  
  .about-image-container {
    min-height: 450px;
  }
  
  .about-main-image {
    min-height: 450px;
  }
}

/* iPad Mini - 8.3" screens (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .about-content-grid {
    grid-template-columns: 1fr;
  }

  .stats-box {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .about-title {
    font-size: 2.2rem;
  }
  
  .content-title {
    font-size: 1.8rem;
  }

  .section-badge {
    font-size: 0.85rem;
  }
  
  .section-subtitle {
    font-size: 1.05rem;
  }
  
  .about-image-container {
    min-height: 400px;
    border-radius: 14px;
  }
  
  .about-main-image {
    min-height: 400px;
  }
}

/* iPhone Pro Max - 6.9" screens (520px - 767px) */
@media (min-width: 520px) and (max-width: 767px) {
  .about-content-grid {
    grid-template-columns: 1fr;
  }

  .stats-box {
    grid-template-columns: 1fr;
  }
  
  .about-title {
    font-size: 2rem;
  }
  
  .content-title {
    font-size: 1.75rem;
  }

  .section-badge {
    font-size: 0.8rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .about-image-container {
    min-height: 380px;
    border-radius: 12px;
  }
  
  .about-main-image {
    min-height: 380px;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
  
  .stat-label {
    font-size: 0.9rem;
  }
}

/* iPhone Plus - 6.7" screens (480px - 519px) */
@media (min-width: 480px) and (max-width: 519px) {
  .about-content-grid {
    grid-template-columns: 1fr;
  }

  .stats-box {
    grid-template-columns: 1fr;
  }
  
  .about-title {
    font-size: 1.9rem;
  }
  
  .content-title {
    font-size: 1.65rem;
  }

  .section-badge {
    font-size: 0.8rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .about-image-container {
    min-height: 350px;
    border-radius: 12px;
  }
  
  .about-main-image {
    min-height: 350px;
  }
  
  .stat-number {
    font-size: 1.7rem;
  }
  
  .stat-label {
    font-size: 0.85rem;
  }
}

/* iPhone Standard - 6.1" screens (430px - 479px) */
@media (min-width: 430px) and (max-width: 479px) {
  .about-content-grid {
    grid-template-columns: 1fr;
  }

  .stats-box {
    grid-template-columns: 1fr;
  }
  
  .about-title {
    font-size: 1.85rem;
  }
  
  .content-title {
    font-size: 1.6rem;
  }

  .section-badge {
    font-size: 0.8rem;
  }
  
  .section-subtitle {
    font-size: 0.98rem;
  }
  
  .about-image-container {
    min-height: 320px;
    border-radius: 10px;
  }
  
  .about-main-image {
    min-height: 320px;
  }
  
  .stat-number {
    font-size: 1.6rem;
  }
  
  .stat-label {
    font-size: 0.8rem;
  }
}

/* iPhone Small - 5.4" screens (390px - 429px) */
@media (max-width: 429px) {
  .about-content-grid {
    grid-template-columns: 1fr;
  }

  .stats-box {
    grid-template-columns: 1fr;
  }
  
  .about-title {
    font-size: 1.75rem;
  }
  
  .content-title {
    font-size: 1.5rem;
  }

  .section-badge {
    font-size: 0.75rem;
  }
  
  .section-subtitle {
    font-size: 0.95rem;
  }
  
  .about-image-container {
    min-height: 280px;
    border-radius: 8px;
  }
  
  .about-main-image {
    min-height: 280px;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .stat-label {
    font-size: 0.85rem;
  }
}

/* ===== ANDROID DEVICE BREAKPOINTS ===== */

/* Android Tablets - High Resolution (1800px - Pixel C, Galaxy Tab S) */
@media (min-width: 1800px) and (max-width: 2560px) {
  .about-content-grid {
    grid-template-columns: 1fr 1fr;
  }

  .stats-box {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .about-title {
    font-size: 3.2rem;
  }
  
  .content-title {
    font-size: 2.2rem;
  }
  
  .about-image-container {
    min-height: 600px;
  }
  
  .about-main-image {
    min-height: 600px;
  }
}

/* Android Tablets - Standard (1280px-1800px - Nexus 9, Galaxy Tab) */
@media (min-width: 1280px) and (max-width: 1799px) {
  .about-content-grid {
    grid-template-columns: 1fr 1fr;
  }

  .stats-box {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .about-title {
    font-size: 2.7rem;
  }
  
  .content-title {
    font-size: 2rem;
  }
  
  .about-image-container {
    min-height: 480px;
  }
  
  .about-main-image {
    min-height: 480px;
  }
}

/* Android Tablets - Small (800px-1279px) */
@media (min-width: 800px) and (max-width: 1279px) {
  .about-content-grid {
    grid-template-columns: 1fr;
  }

  .stats-box {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .about-title {
    font-size: 2.3rem;
  }
  
  .content-title {
    font-size: 1.85rem;
  }

  .section-badge {
    font-size: 0.88rem;
  }
  
  .section-subtitle {
    font-size: 1.08rem;
  }
  
  .about-image-container {
    min-height: 420px;
    border-radius: 14px;
  }
  
  .about-main-image {
    min-height: 420px;
  }
  
  .content-paragraph {
    font-size: 1rem;
  }
}

/* Android High-End Flagships - QHD/QHD+ (720px wide - 2560px-3120px tall) */
@media (min-width: 720px) and (max-width: 799px) {
  .about-content-grid {
    grid-template-columns: 1fr;
  }

  .stats-box {
    grid-template-columns: 1fr;
  }
  
  .about-title {
    font-size: 2.05rem;
  }
  
  .content-title {
    font-size: 1.78rem;
  }

  .section-badge {
    font-size: 0.82rem;
  }
  
  .section-subtitle {
    font-size: 1.02rem;
  }
  
  .about-image-container {
    min-height: 390px;
    border-radius: 12px;
  }
  
  .about-main-image {
    min-height: 390px;
  }
  
  .stat-number {
    font-size: 1.85rem;
  }
  
  .stat-label {
    font-size: 0.92rem;
  }
  
  .content-paragraph {
    font-size: 0.95rem;
  }
}

/* Android Mid-Range/Flagships - FHD/FHD+ (540px wide - 1920px-2400px tall) */
@media (min-width: 540px) and (max-width: 719px) {
  .about-content-grid {
    grid-template-columns: 1fr;
  }

  .stats-box {
    grid-template-columns: 1fr;
  }
  
  .about-title {
    font-size: 1.95rem;
  }
  
  .content-title {
    font-size: 1.68rem;
  }

  .section-badge {
    font-size: 0.8rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .about-image-container {
    min-height: 360px;
    border-radius: 12px;
  }
  
  .about-main-image {
    min-height: 360px;
  }
  
  .stat-number {
    font-size: 1.75rem;
  }
  
  .stat-label {
    font-size: 0.88rem;
  }
  
  .content-paragraph {
    font-size: 0.92rem;
  }
}

/* Android Small Phones/Budget - HD/HD+ (360px wide - 1280px-1600px tall) */
@media (max-width: 539px) and (min-width: 360px) {
  .about-content-grid {
    grid-template-columns: 1fr;
  }

  .stats-box {
    grid-template-columns: 1fr;
  }
  
  .about-title {
    font-size: 1.82rem;
  }
  
  .content-title {
    font-size: 1.55rem;
  }

  .section-badge {
    font-size: 0.78rem;
  }
  
  .section-subtitle {
    font-size: 0.97rem;
  }
  
  .about-image-container {
    min-height: 310px;
    border-radius: 10px;
  }
  
  .about-main-image {
    min-height: 310px;
  }
  
  .stat-number {
    font-size: 1.65rem;
  }
  
  .stat-label {
    font-size: 0.82rem;
  }
  
  .content-paragraph {
    font-size: 0.9rem;
  }
}

/* Android Foldables - Unfolded State (wide landscape ~2208px-1768px) */
@media (min-width: 1768px) and (max-width: 2208px) and (orientation: landscape) {
  .about-content-grid {
    grid-template-columns: 1fr 1fr;
  }

  .stats-box {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .about-title {
    font-size: 3rem;
  }
  
  .content-title {
    font-size: 2.1rem;
  }
  
  .about-image-container {
    min-height: 550px;
  }
  
  .about-main-image {
    min-height: 550px;
  }
}

/* Android Foldables - Folded/Cover Screen (narrow ~277px-359px) */
@media (min-width: 277px) and (max-width: 359px) {
  .about-content-grid {
    grid-template-columns: 1fr;
  }

  .stats-box {
    grid-template-columns: 1fr;
  }
  
  .about-title {
    font-size: 1.65rem;
  }
  
  .content-title {
    font-size: 1.4rem;
  }

  .section-badge {
    font-size: 0.72rem;
  }
  
  .section-subtitle {
    font-size: 0.88rem;
  }
  
  .about-image-container {
    min-height: 260px;
    border-radius: 8px;
  }
  
  .about-main-image {
    min-height: 260px;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .stat-label {
    font-size: 0.75rem;
  }
  
  .content-paragraph {
    font-size: 0.82rem;
  }
  
  .button-container {
    flex-direction: column;
  }
  
  .learn-more-button,
  .pastors-button {
    width: 100%;
    padding: 0.8rem 1.5rem;
    font-size: 0.85rem;
  }
}

</style>
