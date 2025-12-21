<template>
  <main class="home">
    <TheHero />
    <TheAbout />
    <TheLivestream />
    <TheSermon />
    <TheContact />
  </main>
</template>

<script setup>
import TheHero from './TheHero.vue'
import TheAbout from './TheAbout.vue'
import TheLivestream from './TheLivestream.vue'
import TheSermon from './TheSermon.vue'
import TheContact from './TheContact.vue'
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  background-color: #f3f4f6;
}
.home section {
  margin: 0 auto;
  width: 100%;
}
@media (max-width: 768px) {
  .home {
    gap: 4rem;
  }
}
</style>
