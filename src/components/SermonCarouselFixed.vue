<template>
  <div class="carousel" :style="{ position: 'relative' }">
    <div class="slides" :style="{ overflow: 'hidden' }">
      <div
        v-for="(item, i) in items"
        :key="item.id || i"
        class="slide"
        :style="slideStyle(i)"
      >
        <!-- Render a sermon card for each item -->
        <SermonCard :sermon="item" @play="() => emit('play', item)" @download="() => emit('download', item)" />
      </div>
    </div>

    <!-- Prev / Next controls -->
    <button v-if="items.length > 1" class="prev" @click="prev" aria-label="Previous slide">‹</button>
    <button v-if="items.length > 1" class="next" @click="next" aria-label="Next slide">›</button>

    <!-- Indicators -->
    <div v-if="items.length > 1" class="indicators">
      <button
        v-for="(item, idx) in items"
        :key="idx"
        :class="{ active: idx === current }"
        @click="goTo(idx)"
        :aria-label="`Go to slide ${idx + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, defineProps, defineEmits } from 'vue';
import SermonCard from './SermonCard.vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  autoplay: { type: Boolean, default: false },
  autoplayInterval: { type: Number, default: 5000 }
});

const emit = defineEmits(['play', 'download']);

const current = ref(0);
let timer = null;

const resetTimer = () => {
  if (timer) clearInterval(timer);
  if (props.autoplay && props.items.length > 1) {
    timer = setInterval(() => {
      next();
    }, props.autoplayInterval);
  }
};

const prev = () => {
  current.value = (current.value - 1 + props.items.length) % props.items.length;
  resetTimer();
};

const next = () => {
  current.value = (current.value + 1) % props.items.length;
  resetTimer();
};

const goTo = (i) => {
  current.value = i;
  resetTimer();
};

const slideStyle = (i) => {
  const offset = (i - current.value) * 100;
  return {
    transform: `translateX(${offset}%)`,
    transition: 'transform 0.5s ease',
    width: '100%'
  };
};

watch(() => props.items.length, () => {
  if (current.value >= props.items.length) current.value = 0;
  resetTimer();
});

onMounted(() => {
  resetTimer();
  window.addEventListener('keydown', onKey);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  window.removeEventListener('keydown', onKey);
});

function onKey(e) {
  if (props.items.length <= 1) return;
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
}
</script>

<style scoped>
.carousel { max-width: 48rem; margin-left: auto; margin-right: auto; }
.slides { position: relative; height: auto; }
.slide { position: absolute; top: 0; left: 0; width: 100%; }
.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.6);
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
}
.prev { left: 0.5rem; }
.next { right: 0.5rem; }
.indicators { display: flex; gap: 0.5rem; justify-content: center; margin-top: 0.75rem; }
.indicators button { width: 0.75rem; height: 0.75rem; border-radius: 999px; border: none; background: #e5e7eb; cursor: pointer; }
.indicators button.active { background: #1d4ed8; }
</style>
