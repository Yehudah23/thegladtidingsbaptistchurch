<template>
  <div class="carousel" :style="{ position: 'relative' }">
    <div class="slides">
      <div class="track" :style="trackStyle">
        <div
          v-for="(item, i) in items"
          :key="item.id || i"
          class="slide"
          :style="{ flex: `0 0 ${100 / Math.max(1, Math.min(props.slidesPerView, items.length))}%` }"
        >
          <!-- Render a sermon card for each item (compact when requested) -->
          <SermonCard :sermon="item" :compact="compact" :showFullImage="showFullImage" @play="() => emit('play', item)" @download="() => emit('download', item)" />
        </div>
      </div>
    </div>

    <!-- Prev / Next controls -->
    <button v-if="pageCount() > 1" class="prev" @click="prev" aria-label="Previous slide">‹</button>
    <button v-if="pageCount() > 1" class="next" @click="next" aria-label="Next slide">›</button>

    <!-- Indicators (pages) -->
    <div v-if="pageCount() > 1" class="indicators">
      <button
        v-for="idx in pageCount()"
        :key="idx"
        :class="{ active: idx - 1 === current }"
        @click="goTo(idx - 1)"
        :aria-label="`Go to page ${idx}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, defineProps, defineEmits, computed } from 'vue';
import SermonCard from './SermonCard.vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  autoplay: { type: Boolean, default: false },
  autoplayInterval: { type: Number, default: 5000 },
  // if >0, forces this many slides per view; if 0 (default) use responsiveBreakpoints
  slidesPerView: { type: Number, default: 0 },
  compact: { type: Boolean, default: false },
  showFullImage: { type: Boolean, default: false },
  // responsiveBreakpoints: object where keys are min-width (px) and values are slidesPerView
  responsiveBreakpoints: { type: Object, default: () => ({ 0: 1, 640: 3, 1024: 5 }) }
});

const emit = defineEmits(['play', 'download']);

const current = ref(0); // current page (not item index) when slidesPerView>1
let timer = null;

const resetTimer = () => {
  if (timer) clearInterval(timer);
  if (props.autoplay && props.items.length > 1) {
    timer = setInterval(() => {
      next();
    }, props.autoplayInterval);
  }
};

// compute slidesPerView: prefer explicit prop if >0, otherwise use responsive breakpoints
const slidesPerViewFromBreakpoints = ref(1);

function computeSlidesPerViewFromBreakpoints() {
  const w = window.innerWidth;
  // find the largest breakpoint <= w
  const keys = Object.keys(props.responsiveBreakpoints).map(k => parseInt(k, 10)).sort((a,b)=>a-b);
  let chosen = 1;
  for (const k of keys) {
    if (w >= k) chosen = props.responsiveBreakpoints[k];
  }
  slidesPerViewFromBreakpoints.value = Math.max(1, chosen || 1);
}

const currentSlidesPerView = computed(() => {
  return props.slidesPerView > 0 ? props.slidesPerView : slidesPerViewFromBreakpoints.value;
});

const effectiveSlides = () => Math.max(1, Math.min(currentSlidesPerView.value, props.items.length || 1));

const pageCount = () => Math.max(1, Math.ceil((props.items.length || 0) / effectiveSlides()));

const prev = () => {
  const pc = pageCount();
  current.value = (current.value - 1 + pc) % pc;
  resetTimer();
};

const next = () => {
  const pc = pageCount();
  current.value = (current.value + 1) % pc;
  resetTimer();
};

const goTo = (i) => {
  const pc = pageCount();
  current.value = Math.max(0, Math.min(i, pc - 1));
  resetTimer();
};

// trackStyle moves the whole track left/right; using a track ensures the slides
// keep their natural height (so SermonCard content is visible)
const trackStyle = computed(() => {
  const pc = pageCount();
  return {
    transform: `translateX(-${current.value * 100}%)`,
    transition: 'transform 0.5s ease',
    width: `${pc * 100}%`,
    display: 'flex'
  };
});

watch(() => props.items.length, () => {
  if (current.value >= pageCount()) current.value = 0;
  resetTimer();
});

onMounted(() => {
  resetTimer();
  window.addEventListener('keydown', onKey);
  // compute responsive slidesPerView initially and on resize
  computeSlidesPerViewFromBreakpoints();
  window.addEventListener('resize', computeSlidesPerViewFromBreakpoints);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  window.removeEventListener('keydown', onKey);
  window.removeEventListener('resize', computeSlidesPerViewFromBreakpoints);
});

function onKey(e) {
  if (props.items.length <= 1) return;
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
}
</script>

<style scoped>
.carousel { 
  max-width: 100%; 
  margin-left: auto; 
  margin-right: auto; 
  padding: 0 2.5rem;
  position: relative;
}
.slides { overflow: hidden; }
.track { display: flex; gap: 1rem; }
.slide { 
  position: relative; 
  flex-shrink: 0;
  box-sizing: border-box;
}
.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.95);
  color: #1e3a8a;
  border: 2px solid #e5e7eb;
  padding: 0.35rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  font-size: 1rem;
  line-height: 1;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.prev:hover, .next:hover {
  background: white;
  border-color: #1d4ed8;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.prev { left: 0.25rem; }
.next { right: 0.25rem; }
.indicators { 
  display: flex; 
  gap: 0.375rem; 
  justify-content: center; 
  margin-top: 0.75rem; 
}
.indicators button { 
  width: 0.4rem; 
  height: 0.4rem; 
  border-radius: 999px; 
  border: none; 
  background: #d1d5db; 
  cursor: pointer;
  transition: all 0.2s ease;
}
.indicators button:hover { background: #9ca3af; }
.indicators button.active { background: #1d4ed8; width: 1.25rem; }
</style>
