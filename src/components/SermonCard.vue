<template>
  <div :style="cardWrapperStyle">
    <template v-if="!compact">
      <!-- Image removed per user request. Series badge displayed inline. -->
      <div :style="{ padding: '1.5rem 1.5rem 0.75rem' }">
        <span :style="{ backgroundColor: '#1d4ed8', color: '#ffffff', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }">{{ sermon.series }}</span>
        <h5 :style="{ color: '#1e3a8a', fontSize: '1.25rem', marginTop: '0.5rem' }">{{ sermon.title }}</h5>
        <div :style="{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }">
          <span>📅</span> <span>{{ sermon.date }}</span> <span>•</span> <span>{{ sermon.duration }}</span>
        </div>
        <p :style="{ marginTop: '0.5rem', color: '#6b7280' }">{{ sermon.speaker }}</p>
      </div>
      <div :style="{ padding: '1.5rem' }">
        <p :style="{ color: '#4b5563', marginBottom: '1rem' }">{{ sermon.description }}</p>
        <div :style="{ display: 'flex', gap: '0.5rem' }">
          <button @click="handlePlay" :style="{ flex: 1, padding: '0.5rem', backgroundColor: '#1d4ed8', color: '#ffffff', borderRadius: '0.5rem', fontWeight: '600', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', transition: 'all 0.3s ease', transform: 'translateY(0)', cursor: 'pointer' }">
            <span>▶</span> Play
          </button>
          <button @click="handleDownload" :style="{ flex: 1, padding: '0.5rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', color: '#374151', fontWeight: '600', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', transition: 'all 0.3s ease', transform: 'translateY(0)', cursor: 'pointer' }">
            <span>⬇</span> Download
          </button>
        </div>
      </div>
    </template>

    <template v-else>
      <!-- Compact card without image -->
      <div :style="{ position: 'relative', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }" class="compact-card">
        <div class="compact-title">{{ sermon.title }}</div>
        <div class="compact-sub">{{ sermon.speaker }}</div>
        <button @click="handlePlay" class="compact-play">▶</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, computed } from 'vue';

const props = defineProps({
  sermon: {
    type: Object,
    required: true
  },
  compact: { type: Boolean, default: false }
  , showFullImage: { type: Boolean, default: false }
});

const emit = defineEmits(['play', 'download']);

const handlePlay = () => {
  emit('play', props.sermon.title);
};

const handleDownload = () => {
  emit('download', props.sermon.title);
};

const cardWrapperStyle = computed(() => ({
  overflow: 'hidden',
  borderRadius: '0.5rem',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
  transition: 'box-shadow 0.3s ease'
}));
</script>

<style scoped>
div:hover {
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
}
button:hover {
  background-color: #1e40af;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
}
button:last-child:hover {
  border-color: #1d4ed8;
  color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
}

.compact-title { font-weight: 600; font-size: 0.875rem; line-height: 1.2; color: #1e3a8a; margin-bottom: 0.25rem; }
.compact-sub { font-size: 0.75rem; color: #6b7280; }
.compact-play {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background: #1d4ed8;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.75rem;
  transition: opacity 0.2s ease;
}
.compact-card { transition: transform 0.15s ease, box-shadow 0.15s ease; cursor: pointer; }
.compact-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
</style>
